# OneTime Labs Assess — setup

The assessment feature adds:

- `/assess` — assessment landing page
- `/assess/vendor-migration` — Vendor Migration Risk Assessment
- `/assess/itam` — ITAM Maturity Assessment
- `/admin/assessments` — authenticated assessment inbox
- `/api/assessments` — storage, contact request, email notification, and admin API

## 1. Create the Supabase table

Run:

`sql/007_otl_assessments.sql`

The table has RLS enabled and intentionally has no public policies. Browser clients do not write directly to the table; the server route uses the Supabase service role key.

## 2. Required environment variables

The site already uses Supabase. The assessment API expects:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (recommended) **or** `SUPABASE_SERVICE_ROLE_KEY` (legacy)

For the admin inbox, add a comma-separated list of authorized Google-account emails:

- `OTL_ADMIN_EMAILS=you@example.com,other-admin@example.com`

The API also recognizes an existing `admin_users` table if your Supabase project already uses one.

## 3. Email notifications

If `RESEND_API_KEY` is configured, completed assessments generate an email notification. Consultation requests generate a second email with the visitor's contact information and send the visitor a confirmation email.

Optional overrides:

- `ASSESSMENT_NOTIFICATION_EMAIL` — defaults to `inquiry@onetimelabs.net`
- `ASSESSMENT_FROM_EMAIL` — defaults to `OneTime Labs <inquiry@onetimelabs.net>`

The From address/domain must be verified in Resend.

If Resend is not configured, assessments still save to the admin inbox; email failures do not discard submissions.

## 4. Admin authentication

`/admin/assessments` uses the same Supabase Google OAuth flow already used elsewhere in this project. Make sure your Supabase Google provider and allowed redirect URLs include your production domain.

## 5. Lead flow

1. Visitor completes all 25 questions.
2. Score and category results display immediately with no contact gate.
3. Assessment is saved anonymously.
4. Visitor can optionally request a free consultation and implementation plan.
5. Contact information is attached to the same assessment using a per-submission edit token.
6. The admin inbox shows both anonymous completions and consultation leads, with statuses for new, reviewed, contacted, and closed.

## Troubleshooting: permission denied for otl_assessment_submissions

If the admin inbox reports `permission denied for table otl_assessment_submissions`, run:

`sql/008_otl_assessment_permissions.sql`

Also verify that the server-only Vercel environment variable is a Supabase **Secret key** (`sb_secret_...`) or the legacy **service_role** key. Do not put a publishable/anon key in the server secret variable.

The admin page itself is reachable so signed-out admins can see the Google sign-in button, but assessment data is returned only after the API verifies both the Supabase user session and the email allowlist/admin table.

## 6. Consultation workspace upgrade

Run:

`sql/009_assessment_consulting_workspace.sql`

This adds private admin-only fields for per-question consultation notes, the meeting summary, implementation-plan notes, and test-record labeling.

The Assessment Inbox now automatically builds a consultant interview guide from each client's answers. Every assessment question has question-specific guidance covering:

- follow-up questions to ask on the call
- what a strong/mature answer should look like
- evidence and artifacts to request
- consultant notes explaining what to validate
- client-facing talking points
- a private text area for recording the client's answer and your notes

The guide is automatically sorted by priority: critical gaps, high-risk/low-maturity responses, partial controls, then validation items.

Authorized admins can use **Create test assessment** in `/admin/assessments` to insert a clearly labeled sample Vendor Migration lead. The test record does not send notification email.
