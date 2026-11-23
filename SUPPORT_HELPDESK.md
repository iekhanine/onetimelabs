# OneTime Labs — Help Desk

## Locations

- Public support request: `https://www.onetimelabs.net/support`
- Customer ticket: emailed private token link `/support/t/<token>`
- Admin: `https://www.onetimelabs.net/login` → Field Operations → **Help desk**

## Features

- Public tickets from individuals, existing business clients, and prospective clients, with optional organization field, category, device, urgency, and remote-assistance preference
- Issue tracking with ticket number, private email tracking link (90-day expiration), secure customer replies, statuses, priorities and owner-only internal notes
- Customer email confirmation and reply notifications, private owner notifications at `support@onetimelabs.net`
- Owner-only queue with filters, requester details, conversation, remote support notes and billable/non-billable time entries, including an optional local timer
- Splashtop SOS attended support instructions only. The customer must deliberately run the official SOS app and communicate its temporary 9-digit code in an agreed channel; no automatic remote access, unattended agent, third-party API connection or stored session code

## Security model

Five `public.otl_support_*` tables in the OneTime Labs Supabase project; RLS enabled with direct `anon` and `authenticated` grants revoked. Privileged database credentials are server-side only. The admin API uses `isFieldOwner()`, which checks the designated Discord account with the signed session cookie. Customer tickets are accessible through a cryptographically random bearer token whose HMAC hash is stored in Supabase. Ticket numbers and customer email addresses are **not** authentication. Customers are emailed a link only after the support ticket is created; the link is never returned on the public confirmation page. All customer routes are `no-store`; internal/private messages and billable time never appear in customer APIs.

The public create endpoint includes a honeypot, a minimum-description check, a basic per-origin hourly submission limit and a minimum completion interval. This is not comprehensive abuse protection. Consider managed CAPTCHA / bot protection and central rate limiting before broad promotion.

## Dependencies

- `RESEND_API_KEY` and a verified sending domain for `support@onetimelabs.net`
- An email inbox or forwarding rule for `support@onetimelabs.net` to receive notifications
- Existing OneTime Labs Supabase service key and URL
- Existing owner-only Discord OAuth login credentials
- Active Splashtop SOS technician subscription, independently obtained and configured by OneTime Labs for remote sessions

## Operational testing

1. Visit `/support` on a phone, open a ticket with a reachable test email. Confirm the confirmation page shows a ticket number, and that a private ticket email arrives.
2. Open the emailed link, reply, and confirm your reply appears in the owner-only ticket queue.
3. Sign in through `/login` as the designated Discord owner. Use the Help Desk navigation item, change status/priority, send a reply, add internal notes, and log work time.
4. Verify that the client sees the public reply but never sees internal notes, time entries, or session notes.
5. Test Splashtop separately using the official SOS download and consent flow. Never test against an unsuspecting customer's computer.
6. Test invalid token and unauthenticated admin API requests to confirm rejection.

## Not included in this initial release

- Full customer account registration or separate company workspaces (both individual and business requesters use the same public form and private emailed links)
- Screenshots or other file attachments
- Automatic Splashtop API session creation, technician session auditing, or direct in-browser remote control
- SLA timers, billing integration, automated invoices or multiple technician accounts
- An end-to-end test of real email deliverability or a real remote-control session

Keep credentials and access codes out of ticket descriptions. Do not use the ticketing system as emergency incident response.
