-- Run in Supabase SQL Editor. All project data is private to the authenticated owner.
create table if not exists public.itam_workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 150),
  organization text not null default '',
  description text not null default '',
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists itam_workspaces_owner on public.itam_workspaces(owner_id, updated_at desc);
alter table public.itam_workspaces enable row level security;
create policy "owners select itam workspaces" on public.itam_workspaces for select to authenticated using (owner_id = (select auth.uid()));
create policy "owners create itam workspaces" on public.itam_workspaces for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "owners update itam workspaces" on public.itam_workspaces for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "owners delete itam workspaces" on public.itam_workspaces for delete to authenticated using (owner_id = (select auth.uid()));
-- Security note: never place privileged credentials in this table or public notes.
