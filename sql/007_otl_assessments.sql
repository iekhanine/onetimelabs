-- OneTime Labs Assess: stores anonymous assessment results and optional consultation leads.
-- Run this in the same Supabase project used by onetimelabs.net.

create extension if not exists pgcrypto;

create table if not exists public.otl_assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  edit_token uuid not null default gen_random_uuid(),
  assessment_type text not null check (assessment_type in ('vendor-migration', 'itam')),
  assessment_title text not null,
  score integer not null check (score between 0 and 100),
  rating text not null,
  category_scores jsonb not null default '{}'::jsonb,
  critical_flags jsonb not null default '[]'::jsonb,
  answers jsonb not null default '[]'::jsonb,

  contact_requested boolean not null default false,
  contact_name text,
  contact_email text,
  contact_company text,
  contact_phone text,
  contact_notes text,

  consultation_status text not null default 'assessment-only'
    check (consultation_status in ('assessment-only', 'new', 'reviewed', 'contacted', 'closed')),
  consultation_notes jsonb not null default '{}'::jsonb,
  consultation_summary text,
  implementation_plan_notes text,
  is_test boolean not null default false,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists otl_assessment_submissions_created_idx
  on public.otl_assessment_submissions (created_at desc);

create index if not exists otl_assessment_submissions_leads_idx
  on public.otl_assessment_submissions (contact_requested, consultation_status, created_at desc);

alter table public.otl_assessment_submissions enable row level security;

-- Keep direct browser access closed. Only the server-side secret/service role
-- can read or modify assessment submissions.
revoke all on table public.otl_assessment_submissions from anon, authenticated;
grant select, insert, update on table public.otl_assessment_submissions to service_role;

-- No public RLS policies are intentionally created.
-- Public submissions and admin reads go through server-side route handlers using the service/secret key.

comment on table public.otl_assessment_submissions is
  'OneTime Labs Assess submissions. Stores scores anonymously until a visitor optionally requests consultation.';
