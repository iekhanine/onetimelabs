# OneTime Labs audience split rebuild

## What changed

- `/` is now a neutral OneTime Labs landing page with two large paths: **Small Business** and **Enterprise**.
- `/small-business` is a new problem-first landing page focused on:
  - websites and online services
  - internal business tools and trackers
  - spreadsheet consolidation
  - reporting and dashboards
  - process automation
  - custom software
- `/enterprise` contains the previous enterprise-focused homepage content.
- The global header no longer labels all of OneTime Labs as "Enterprise Consulting".
- The primary navigation now exposes Small Business and Enterprise directly.
- The footer has been broadened to represent both sides of the company.
- The contact form now includes separate small-business and enterprise inquiry topics.
- Small Business CTAs preselect the small-business consultation topic.
- Global metadata and the sitemap now include both audience paths.

## Verification

The changed TypeScript/TSX files were syntax-transpiled successfully with TypeScript.
A full `next build` could not be completed in the build sandbox because the environment could not resolve `registry.npmjs.org` while installing dependencies (`EAI_AGAIN`). No application build error was reached.

On your machine:

```bash
npm install
npm run dev
```

Then test:

- http://localhost:3000/
- http://localhost:3000/small-business
- http://localhost:3000/enterprise
- http://localhost:3000/contact?topic=small-business
