# OneTime Labs — Real Photography Edition

This version replaces the five artificial homepage compositions with **four real Pexels photographs**. Photos are served from the Pexels image CDN initially, so the site can render without bundled image downloads. For production stability, download them locally using `scripts/download-homepage-photos.ps1` and follow its printed instructions.

| Placement | Photographer | Source |
|---|---|---|
| Hero / About | Marcel Köhler | https://www.pexels.com/photo/modern-office-building-at-twilight-in-black-and-white-30694552/ |
| Business Solutions | Ayşegül Aytören | https://www.pexels.com/photo/interior-of-a-modern-office-building-11875897/ |
| OneTime Software | ἐμμανυελ  | https://www.pexels.com/photo/illuminated-room-in-office-building-at-night-12837026/ |
| Enterprise / Approach | Burak The Weekender | https://www.pexels.com/photo/modern-office-interior-with-black-chairs-28506813/ |

Free-use images: https://www.pexels.com/license/ . Review the license before publication. These photos are illustrative; do not represent them as OneTime Labs offices or client work.

## Manual replacement

Download the photograph and save as the corresponding file in `public/homepage/photos/`, then edit `app/page.tsx` (three image URLs) and `app/home.module.css` (two background-image URLs) to use `/homepage/photos/<filename>.jpg`. Alternatively run the included PowerShell script on Windows which downloads the images and can optionally rewrite image paths.

**No production deployment has been made.** Specialized app screenshots and assets outside the homepage are not replaced.
