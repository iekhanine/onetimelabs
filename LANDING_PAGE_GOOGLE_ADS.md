# Google / local search landing page

New route: `/local` (https://www.onetimelabs.net/local)

Files added:
- `app/local/page.tsx`
- `app/local/LocalLeadForm.tsx`
- `app/local/local.module.css`

This page uses the existing site logo, SiteFooter, and `/api/project-inquiry` endpoint; it requires no new database tables or API keys beyond the site's existing Resend configuration.

Recommended Google Ads final URL: `https://www.onetimelabs.net/local?utm_source=google&utm_medium=cpc&utm_campaign=local_business`

The form automatically includes the full landing-page URL (and any UTM parameters) in the inquiry email's Source field. Test that inquiries reach inquiry@onetimelabs.net before turning on ads. The dashboard in the hero is illustrative, not a claim that it is a live client dashboard.

Google Ads headline suggestion: `Racine Small Business Tech Help`
Description suggestion: `Websites, booking, inventory & automation for local businesses. Tell us what you need.`

Deployment:
1. Merge/copy added files into existing repo, maintaining paths.
2. npm install / npm ci and npm run build in your local environment.
3. Push to Vercel as normal.
4. Visit /local on phone and desktop; submit a test inquiry; verify email delivery.

Note: A compile/runtime test has not been completed in this packaging environment, which does not have the project's dependencies installed.
