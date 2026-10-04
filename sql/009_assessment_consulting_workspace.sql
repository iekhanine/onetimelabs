-- OneTime Labs Assess: consultant workspace fields
alter table public.otl_assessment_submissions
  add column if not exists consultation_notes jsonb not null default '{}'::jsonb,
  add column if not exists consultation_summary text,
  add column if not exists implementation_plan_notes text,
  add column if not exists is_test boolean not null default false;

-- Keep the table private to browser roles; the Next.js API uses the server secret/service role.
revoke all on table public.otl_assessment_submissions from anon, authenticated;
grant select, insert, update on table public.otl_assessment_submissions to service_role;
