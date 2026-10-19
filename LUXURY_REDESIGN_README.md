# OneTime Labs — Luxury Monochrome Redesign

## Completed
- Homepage completely rebuilt around the approved luxury concept.
- User-provided navy monogram applied to the homepage and shared brand assets.
- Approved concept artwork repurposed into hero and editorial imagery; original assets remain available.
- A site-wide monochrome visual override (`app/luxury-system.css`) applies to common forms, inputs, buttons, headers, tables and cards while preserving existing handlers and route logic.
- Existing application routes, database/API calls, environment variable names, and integrations were not intentionally changed.

## Important caveat
The specialized pages have extensive page-specific styling (36 separate CSS files). The shared design layer gives them a consistent baseline, but **not every specialized form, admin dashboard, and app interface has been individually rewritten or visually regression-tested**. A full one-to-one visual conversion needs page-by-page QA after this first pass. No production deployment was performed.

## Run locally
1. `npm ci`
2. Configure your existing environment variables locally (do not commit .env files).
3. `npm run dev`
4. Inspect responsive views and critical workflows before deployment.

## Security
This delivery excludes `.env`, `.env.local`, build outputs and dependency directories. It never includes live API keys as part of the visual changes.
