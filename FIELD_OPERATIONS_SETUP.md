# OneTime Labs — Private Field Operations

Private, unlinked workspace: `https://www.onetimelabs.net/login`. No site navigation or sitemap entry.

## Activation (required)

Create a Discord OAuth2 application dedicated to OneTime Labs (or add the callback to an existing application). Under OAuth2 redirect URIs register exactly:

`https://www.onetimelabs.net/api/field/auth/callback`

Set these **Vercel project environment variables** for production and preview:
- `DISCORD_CLIENT_ID`: Discord application's client ID.
- `DISCORD_CLIENT_SECRET`: Discord application's client secret (sensitive).
- `OTL_FIELD_OWNER_DISCORD_ID`: the single numeric Discord user ID authorized to access the dashboard.
- `OTL_FIELD_SESSION_SECRET`: generated strong random signing secret (already configured).
- `OTL_FIELD_ORIGIN`: `https://www.onetimelabs.net` (already configured).

The route **fails closed** with no admin login when any required credential is absent. Do not put these credentials in Git or expose them in `NEXT_PUBLIC_*` variables. Redeploy after setting environment variables.

## Operator workflow

1. Visit `/login`, authorize the Discord account, and open the private `/field` dashboard.
2. Create a site with the company and location name.
3. Open the playbook and complete sections in the left rail. Record devices with category, manufacturer, model, serial, asset tag, location, custodian, condition and notes.
4. The progress indicator tracks answered questions plus up to five device entries. Use **Save progress** to persist updates.
5. Under Review & publish, generate a seven-day assessor link. Share it privately; possession grants edit access to that single draft until submission, expiry or revocation. Do not post it publicly.
6. The assessor saves progress and submits. The submission locks. A notification is sent to `inquiry@onetimelabs.net` when Resend is configured, without confidential content in email.
7. The owner marks the visit in review, approved, or rejected, adds reviewer notes and exports the full internal report. **Print / Save as PDF** uses the browser's print-to-PDF workflow.
8. Once approved, generate a 14-day public overview link. It includes only the site name, visit date, brief summary, recommendations, and next steps; it intentionally excludes serials, personnel, private notes and infrastructure details.
9. Revoke shared links from the review screen as needed.

## Security notes

The `public.otl_field_assessments` and `public.otl_field_access` tables have row level security enabled, no grants for anonymous/authenticated API users, and are used only by the privileged server-side client. Owner session is an HMAC-signed HTTP-only secure cookie checked on every admin API call; OAuth state is verified. Shared access links are random bearer capabilities with database-stored hashes, expiration and revocation. Keep links private. The frontend deliberately doesn't use the Supabase service key.

Do not record passwords, API keys, private tokens or unnecessary personal data in assessment notes.

## Current limitations

- The field logbook requires connectivity; it is not an offline-first app.
- No direct camera/photo upload or file attachment feature yet; use evidence references in the documentation checklist.
- PDF is generated via the browser print/save-to-PDF interface rather than a server-side binary export.
- Email submission notification requires the existing Resend configuration.
- There is no granular multi-user identity system; assessor links are possession-based, scoped to one site and time-limited.
