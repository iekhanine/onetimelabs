# OneTime Labs — visual quality audit and corrective pass

## Root causes in previous handoff
1. `globals.css` (warm / orange), `company-store.css` (blue corporate), and `luxury-system.css` (last-loaded unscoped overrides) competed. The old layer used broad `button`, `input`, `div[class*=card]`, and `table` selectors and modified interactive applications, producing inconsistent control appearance.
2. The homepage hero and approach JPGs were cropped from a full-page concept **including rendered text**. CSS overlaid live headings over baked text.
3. The featured solution JPG/WebP assets were bright colored product illustrations unrelated to the monochrome visual direction. Background cover cropping on already-short images exacerbated the problem.
4. Multiple bespoke tools and tenant templates need independent visual QA; blindly changing their internal CSS would damage usability or tenant branding.

## Corrections
- Removed the universal `luxury-system.css` override entirely.
- Established `brand-system.css` with a constrained corporate-page scope and shared neutral palette; removed many conflicting blue store-theme literal colors from the existing corporate stylesheet.
- Cropped out the pre-rendered words in the concept photo assets; created clean, 1920×1080 monochrome WebP imagery plus consistent 1200×900 editorial card artwork. All `img` elements preserve aspect ratio with `object-fit:cover`.
- Updated homepage to use only these clean assets; kept real HTML for all headings and action links.
- Preserved working APIs, forms, auth, product interfaces, teleprompter controls, and client demos.

## Known limitations
- The original hero/approach imagery were screenshot-derived. Enlarging them does not recreate the detail of a native hi-res photograph. Replace with clean original photography for best desktop/retina fidelity.
- This pass harmonizes the corporate brand shell but is not a verified bespoke redesign of every application/workspace. Full interactive visual QA across routes is still necessary.
- Run `npm ci && npm run build` locally with appropriate environment variables; no production site was altered.
