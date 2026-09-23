# OneTime Labs — Next.js build/lint cleanup

Fixed the build errors reported from `next build`:

- Replaced internal `<a>` navigation with `next/link` across Arcade, Custom Development Contact, Mail Parser, Toolkits, Metrology, Network, and both Metronome panels.
- Removed the unused `useMemo` import from `ArcadeGamePanel`.
- Reworked A220 flashcard/matching callbacks with stable `useCallback` dependencies and removed the unused-expression state update.
- Removed the unused `walkMime` helper and fixed `prefer-const` issues in `app/lib/emailParser.ts`.
- Replaced raw JSX contractions with typographic apostrophes in the custom-development inquiry page.
- Fixed the JSX `// PORT` text node in the Network toolkit.
- Replaced the product screenshot `<img>` with `next/image`.

Validation performed in the repair environment:

- All changed TypeScript/TSX files pass a TypeScript syntax-transpile check.
- AST scan found no remaining internal `<a href="/...">` navigation in `app/`.
- AST scan found no raw apostrophe JSX text that would trigger `react/no-unescaped-entities`.
- Naive import-usage scan found no unused imports in `app/`.

A complete `next build` could not be executed in the repair container because npm dependency installation did not complete in the sandbox. Run `npm run build` locally after copying these files into the repository.
