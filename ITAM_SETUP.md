# OneTime Labs ITAM Field Guide (`/itam`)

Public, vendor-neutral IT Asset Management implementation playbook with private, account-owned Google OAuth workspaces.

## Install
1. Copy `app/itam/` into your existing OneTime Labs Next.js source tree.
2. Open your **existing** Supabase SQL Editor and run `supabase/itam_workspaces.sql` once. The schema has row-level security policies restricted to each authenticated owner.
3. Reuse your existing Supabase environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or ANON_KEY). Do not put service role credentials in client-side code.
4. Ensure Google is enabled in Supabase Authentication > Providers, and that your OAuth redirect configuration includes `https://onetimelabs.net/auth/callback` (and local callback for development). The existing `app/auth/callback/route.ts` already supports `?next=/itam`.
5. Deploy. The new public route is `https://onetimelabs.net/itam`.
6. Optionally add `/itam` to the site header navigation or home-projects list. The page works without a menu entry.

## Feature inventory
- Public, browser-accessible 30-day five-phase technical plan
- 40+ operational checklist actions with deliverables and interview questions
- Per-task status and notes (not started / in progress / blocked / complete)
- Multiple named private workspaces, each owned by the authenticated user
- Google OAuth login and sign-out using existing Supabase integration
- Manual save with visible unsaved-changes state
- Documentation register with OTLES or external document URLs, template suggestions, and notes
- Discovery question bank, KPI definitions, and 30-day operating roadmap
- Portable JSON export for backup or future integration
- Responsive design using existing OneTime Labs header, footer and brand

## Data / security
The page itself is public. Workspaces and notes are stored in `itam_workspaces` under Supabase RLS; users only access their own data. Do not store secrets, credentials, personal employee records, or sensitive infrastructure details in notes. References to OTLES use links, not an unverified automatic sync. A future OTLES API connector should use server-to-server authorization and explicit access checks; merely pasting an OTLES URL does not grant permission to access that document.

## Operational decisions
- This release intentionally requires clicking **Save changes**, not silent autosave.
- Anonymous checklist interactions are temporary and not persisted across reloads.
- The existing `/assess/itam` maturity assessment is unchanged and linked in the footer of the new page.
- Linking to OTLES is implemented as a persistent document reference. Automatic bidirectional document synchronization is not implemented because no authenticated OTLES API contract was provided.
