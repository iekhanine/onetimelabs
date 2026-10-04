-- Run this if otl_assessment_submissions already exists and the admin inbox
-- reports: permission denied for table otl_assessment_submissions

alter table public.otl_assessment_submissions enable row level security;

-- No browser role gets direct table access.
revoke all on table public.otl_assessment_submissions from anon, authenticated;

-- Assessment API routes run on the server using the Supabase secret/service role.
grant select, insert, update on table public.otl_assessment_submissions to service_role;
