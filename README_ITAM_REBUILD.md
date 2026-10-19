# OneTime Labs — ITAM-first Website Rebuild

## Status

This package is a modified copy of the **existing Next.js 16 project supplied by the user**, not a replacement static landing page. No live site was changed or deployed.

- Homepage: `/` (replaced content and design)
- Full ITAM services page: `/services/itam` (new)
- Enterprise experience: `/experience` (rewritten with explicit prior-employment context)
- Contact form: `/contact?topic=itam` (new ITAM category, handled by existing API endpoint)
- Existing reusable ITAM toolkit: `/itam` (**preserved**)
- Existing business, vendor migration, managed print, software, and other routes (**preserved**)

## EDIT THE TAGLINE — VERY EASY TO FIND

Open **`lib/itam-site-copy.ts`**, at the top of the file:

```ts
// SECTION 001 — COMPANY TAGLINE (EDIT HERE)
export const companyTagline = "";
```

Set any string to display the tagline in the hero, or leave `""` to show no tagline. This is intentionally empty by default.

The same file contains the homepage headline, ITAM services, outcomes, work process, founder experience, and secondary service offerings. Search for `SECTION 002`, `SECTION 003`, etc. to find blocks. All main copy is centralized, so you don't have to edit JSX for marketing wording.

## Main changes

1. ITAM now leads: HAM, SAM, CMDB and source-of-truth governance, reconciliation, audit controls, operations, and automation.
2. A new premium, responsive homepage in `app/page.tsx` and `app/home.module.css`; designed around clear service language rather than generic marketing slogans.
3. New `/services/itam` detail page describing typical work, what changes, and existing-platform vs new-system options.
4. Four prior-career statistics, with nearby source/assignment labels and a clear distinction between prior work and OneTime Labs delivery.
5. Founder’s experience page clarifies employer/assignment: Allied Digital → Daimler Truck, HPE → Bank of America, contractor assignment → SC Johnson. These are not OneTime Labs clients or endorsement claims.
6. Warehouse/retail/general asset inventory remains offered, alongside vendor migrations, managed print, other business solutions and software.
7. Updated site navigation, footers, SEO titles, description, and sitemap.
8. Existing `/itam` checklist and other features remain intact.
9. PCCR removed from general product marketing, since it was a personal purpose-built tool, not a principal commercial offering.
10. `preview/index.html` is a **static visual copy** of the redesigned homepage so you can open it without npm. It is a preview, not the actual Next.js application. The real site is in `app/page.tsx`.

## Build locally (Windows PowerShell)

```powershell
# from the unzipped project root
npm ci
npm run build
npm run dev
```

Then visit `http://localhost:3000` and `http://localhost:3000/services/itam`.

To view the static preview immediately, open `preview/index.html` in your browser. It references CSS and the logo from within this package.

**QA performed here:** Syntax parse of every modified TSX/TS file, CSS syntax validation, file/reference inspection, and heuristic secret scan. A full npm build and browser screenshot were **not possible** in this environment: the npm registry was unreachable and headless Chromium did not complete. Run `npm ci` and `npm run build` on your machine before deployment. No build success is claimed.

## Credential safety

- The ZIP excludes `node_modules`, `.next`, `.git`, `.env`, and private key files.
- Never put secrets or service-role keys into the Next.js client bundle.
- Existing server-side API routes and environment requirements are retained. This website redesign should not require changing your keys.

## Professional proof accuracy

Metrics and named-company experience derive from the founder's resume, **not OneTime Labs client results**. Prior roles/assignments:

- Allied Digital supporting Daimler Truck: 25,000+ assets, ~98% inventory accuracy, $250,000+ of unused license value recovered.
- Hewlett-Packard Enterprise supporting Bank of America: 40,000+ print devices, 1,200+ deployments across 15+ countries.
- SC Johnson: enterprise print/lifecycle/migration work through contract assignment.

Do not repurpose these names for a client-logo section, or imply vendor partnership, customer relationship, or endorsement.

## Research sources

See `RESEARCH_ITAM_COMPETITORS.md` for the comparison and original URLs used to guide the rewrite.
