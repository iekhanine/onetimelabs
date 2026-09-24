# OneTime Labs marketing note rotation

The rotating marketing copy now appears on the main OneTime Labs homepage (`/`), directly above **CHOOSE A SERVICE AREA**.

It is intentionally rendered as a handwritten note rather than a conventional marketing card. The note holds on screen, slowly fades out, then the next line fades in. Copy is clamped to two lines maximum.

## Source data

`data/marketing-rotation.json`

The JSON is generated from the `Website Rotation` worksheet in the OneTime Labs rotating marketing workbook. The workbook remains the editable campaign source of truth.

## Segments

The homepage can still be targeted by query string, for example:

- `/?segment=trades`
- `/?segment=retail`
- `/?segment=warehouse`
- `/?segment=hospitality`
- `/?segment=auto`

Common aliases such as `plumbing`, `hvac`, `restaurant`, `bar`, `salon`, and `barber` are also recognized.

## Behavior

- approximately 7.2-second hold
- approximately 1.75-second fade between messages
- weighted selection
- avoids immediate repetition using `sessionStorage`
- honors `prefers-reduced-motion`
- two displayed lines maximum
- no campaign metadata or IDs shown to visitors

## Typography

The marketing note uses a handwriting-oriented system font stack beginning with `Segoe Print`, followed by handwriting fallbacks. No external font download is required, keeping local and Vercel builds self-contained.
