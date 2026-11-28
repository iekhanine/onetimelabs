
create schema display;
create schema display_private;
revoke all on schema display,display_private from public,anon,authenticated;
grant usage on schema display,display_private to service_role;
create table display.workspaces(id uuid primary key default gen_random_uuid(),slug text unique not null check(slug ~ '^[a-z0-9][a-z0-9-]{1,39}$' and slug not in ('admin','api','login','settings','pair')),created_at timestamptz default now());
create table display.members(workspace_id uuid references display.workspaces on delete cascade,user_id uuid references auth.users on delete cascade,role text not null check(role in ('owner','editor','viewer')),primary key(workspace_id,user_id));
create table display.screens(id uuid primary key default gen_random_uuid(),workspace_id uuid not null references display.workspaces on delete cascade,slug text not null check(slug ~ '^[a-z0-9][a-z0-9-]{0,39}$'),name text not null default 'My display',unique(workspace_id,slug));
create table display.module_definitions(key text primary key,label text not null,version int not null default 1);
insert into display.module_definitions(key,label) values ('clock','Clock & date'),('calendar','Calendar'),('tasks','To-do list'),('notes','Sticky notes');
create table display.module_instances(id uuid primary key default gen_random_uuid(),screen_id uuid not null references display.screens on delete cascade,module_key text not null references display.module_definitions(key),position int not null default 0,config jsonb not null default '{}',unique(screen_id,module_key));
create table display.tasks(id uuid primary key default gen_random_uuid(),screen_id uuid not null references display.screens on delete cascade,title text not null check(length(title) between 1 and 300),done boolean not null default false,created_at timestamptz not null default now());
create table display_private.privacy(screen_id uuid primary key references display.screens on delete cascade,pin_hash text,locked boolean not null default false,unlocked_until timestamptz,failed int not null default 0,blocked_until timestamptz);
create table display_private.devices(id uuid primary key default gen_random_uuid(),screen_id uuid not null references display.screens on delete cascade,token_hash text unique not null,created_at timestamptz default now(),revoked_at timestamptz);
alter table display.workspaces enable row level security; grant select,insert,update,delete on display.workspaces to service_role;
alter table display.members enable row level security; grant select,insert,update,delete on display.members to service_role;
alter table display.screens enable row level security; grant select,insert,update,delete on display.screens to service_role;
alter table display.module_definitions enable row level security; grant select,insert,update,delete on display.module_definitions to service_role;
alter table display.module_instances enable row level security; grant select,insert,update,delete on display.module_instances to service_role;
alter table display.tasks enable row level security; grant select,insert,update,delete on display.tasks to service_role;
alter table display_private.privacy enable row level security; grant select,insert,update,delete on display_private.privacy to service_role;
alter table display_private.devices enable row level security; grant select,insert,update,delete on display_private.devices to service_role;
create function public.otl_display_v1(actor uuid,device text,ws text,screen text,op text,p jsonb default '{}') returns jsonb language plpgsql security invoker set search_path='' as $$
declare wid uuid; sid uuid; pr display_private.privacy%rowtype; member_role text; locked_now boolean; token text; mins int; k text; 
begin
 if actor is not null and op='bootstrap' and ws='ivan' and screen='default' then
  insert into display.workspaces(slug) values(ws) on conflict do nothing;
  select id into wid from display.workspaces where slug=ws for update;
  if not exists(select 1 from display.members where workspace_id=wid) then insert into display.members values(wid,actor,'owner'); end if;
  if exists(select 1 from display.members where workspace_id=wid and user_id=actor and role='owner') then
   insert into display.screens(workspace_id,slug,name) values(wid,screen,'My display') on conflict do nothing returning id into sid;
   if sid is not null then
    insert into display.module_instances(screen_id,module_key,position) values(sid,'clock',0),(sid,'calendar',1),(sid,'tasks',2);
    insert into display_private.privacy(screen_id) values(sid);
   end if;
  end if;
 end if;
 select s.id,s.workspace_id into sid,wid from display.screens s join display.workspaces w on w.id=s.workspace_id where w.slug=ws and s.slug=screen;
 if sid is null then return jsonb_build_object('error','Display not found'); end if;
 select role into member_role from display.members where workspace_id=wid and user_id=actor;
 if member_role is null and (device is null or not exists(select 1 from display_private.devices where screen_id=sid and token_hash=encode(extensions.digest(device,'sha256'),'hex') and revoked_at is null)) then return jsonb_build_object('error','Access denied'); end if;
 select * into pr from display_private.privacy where screen_id=sid for update;
 locked_now:=pr.pin_hash is not null and (pr.locked or (pr.unlocked_until is not null and pr.unlocked_until<=now()));
 if op='pair' and member_role='owner' then
  token:=encode(extensions.gen_random_bytes(32),'hex');
  insert into display_private.devices(screen_id,token_hash) values(sid,encode(extensions.digest(token,'sha256'),'hex'));
  return jsonb_build_object('token',token);
 elsif op='revoke' and member_role='owner' then
  update display_private.devices set revoked_at=now() where screen_id=sid and revoked_at is null;
 elsif op='reset' and member_role='owner' then
  update display_private.privacy set pin_hash=null,locked=false,unlocked_until=null,failed=0,blocked_until=null where screen_id=sid;
 elsif op='set_pin' and pr.pin_hash is null and (p->>'pin') ~ '^[0-9]{4,6}$' and member_role is distinct from 'viewer' then
  update display_private.privacy set pin_hash=extensions.crypt(p->>'pin',extensions.gen_salt('bf',10)),locked=true,unlocked_until=null where screen_id=sid;
 elsif op='lock' and pr.pin_hash is not null then
  update display_private.privacy set locked=true,unlocked_until=null where screen_id=sid;
 elsif op='unlock' and pr.pin_hash is not null then
  if pr.blocked_until>now() then return jsonb_build_object('error','Too many attempts. Try again in five minutes.'); end if;
  if coalesce(p->>'pin','') !~ '^[0-9]{4,6}$' or extensions.crypt(p->>'pin',pr.pin_hash)<>pr.pin_hash then
   update display_private.privacy set failed=case when failed>=4 then 0 else failed+1 end,blocked_until=case when failed>=4 then now()+interval '5 minutes' else null end where screen_id=sid;
   return jsonb_build_object('error','Incorrect PIN');
  end if;
  mins:=coalesce((p->>'minutes')::int,-1);
  if mins not in (0,5,10,30,60,240,480) then return jsonb_build_object('error','Invalid duration'); end if;
  update display_private.privacy set locked=false,unlocked_until=case when mins=0 then null else now()+make_interval(mins=>mins) end,failed=0,blocked_until=null where screen_id=sid;
 elsif op not in ('read','bootstrap') then
  if locked_now or member_role='viewer' then return jsonb_build_object('error','Display locked or read only'); end if;
  if op='add_task' and length(trim(p->>'title')) between 1 and 300 then insert into display.tasks(screen_id,title) values(sid,trim(p->>'title'));
  elsif op='toggle_task' then update display.tasks set done=not done where screen_id=sid and id=(p->>'id')::uuid;
  elsif op='delete_task' then delete from display.tasks where screen_id=sid and id=(p->>'id')::uuid;
  elsif op='add_module' then insert into display.module_instances(screen_id,module_key,position) select sid,key,coalesce((select max(position)+1 from display.module_instances where screen_id=sid),0) from display.module_definitions where key=p->>'key' on conflict do nothing;
  elsif op='remove_module' then delete from display.module_instances where screen_id=sid and module_key=p->>'key';
  elsif op='note' then update display.module_instances set config=jsonb_build_object('text',left(coalesce(p->>'text',''),3000)) where screen_id=sid and module_key='notes';
  else return jsonb_build_object('error','Invalid operation'); end if;
 end if;
 select * into pr from display_private.privacy where screen_id=sid;
 locked_now:=pr.pin_hash is not null and (pr.locked or (pr.unlocked_until is not null and pr.unlocked_until<=now()));
 return jsonb_build_object('locked',locked_now,'hasPin',pr.pin_hash is not null,'until',pr.unlocked_until,'owner',coalesce(member_role='owner',false),'modules',case when locked_now then '[]'::jsonb else coalesce((select jsonb_agg(jsonb_build_object('key',module_key,'config',config) order by position) from display.module_instances where screen_id=sid),'[]') end,'tasks',case when locked_now then '[]'::jsonb else coalesce((select jsonb_agg(jsonb_build_object('id',id,'title',title,'done',done) order by created_at) from display.tasks where screen_id=sid),'[]') end);
end $$;
revoke all on function public.otl_display_v1(uuid,text,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.otl_display_v1(uuid,text,text,text,text,jsonb) to service_role;
