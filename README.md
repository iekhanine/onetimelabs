# OneTime Labs Website — Video-First Redesign

Full replacement build for `onetimelabs.net`.

## Public portfolio

Flagship products:
- OneTime Menu (TVM)
- OTLES
- ROFFLE

Secondary product:
- Tasks

Licensing is intentionally not marketed as a standalone public product in this build.

## Design direction

The homepage is product footage first rather than a corporate marketing layout.

- Compact studio intro instead of a giant hero
- TVM, OTLES, and ROFFLE showcase videos are the primary homepage visuals
- Short product copy around the actual product footage
- Individual product pages contain the administration walkthrough videos
- Tasks remains a smaller utility product section
- Warmer, independent-studio visual language instead of conventional SaaS cards

## Video files

Included in `public/videos/`:

- `tvm-showcase.mp4`
- `tvm-admin.mp4`
- `otles-showcase.mp4`
- `otles-admin.mp4`
- `roffle-showcase.mp4`
- `roffle-admin.mp4`

The videos autoplay muted, loop, and use `playsInline` so they behave like moving product screenshots.

## Screenshot / poster files

Included in `public/screenshots/`:

- `tvm.png`
- `tvm-display.png`
- `otles.png`
- `roffle.png`
- `tasks.svg`

The PNG screenshots are used as video posters/fallback imagery.

## Main routes

- `/`
- `/products/tvm`
- `/products/otles`
- `/products/roffle`
- `/products/tasks`
- `/contact`
- `/privacy`
- `/terms`

## Run locally

```powershell
npm install
npm run dev
```

Production check:

```powershell
npm run build
```

## Deployment

The project remains a normal Next.js/Vercel app. No environment variables are required for the marketing site itself.

## Contact form / Resend

The public contact flow is handled by:

- `components/InquiryForm.tsx`
- `app/contact/page.tsx`
- `app/api/project-inquiry/route.ts`

Product `Ask about it` links open `/contact` with the relevant product preselected.

Required server-side environment variable:

```env
RESEND_API_KEY=re_...
```

Keep it in `.env.local` for local development and in the Vercel production environment. Do not prefix it with `NEXT_PUBLIC_`.

Email delivery:

- All website form submissions -> `inquiry@onetimelabs.net`
- Product support remains visibly listed as `support@onetimelabs.net` for direct email support.
- The visitor's address is set as `Reply-To`.
