# Teleprompter Operator Application Redesign

## Purpose
The teleprompter control page has been rebuilt as an operator application rather than a marketing/landing page.

## Layout
- Compact application header
- Always-visible transport bar directly below it
- Three-pane desktop workspace:
  - Script editor
  - Output monitor
  - Settings inspector
- Dedicated `/teleprompter/display` route remains the clean hardware output

## Top transport controls
The primary controls are available before the editor/settings:
- Open Display
- Start / Pause
- Restart
- Jump backward / forward
- Scroll mode
- Live speed control or target duration
- Horizontal hardware mirror
- Present Here
- Status, elapsed time, remaining time

## Operator-oriented changes
- Removed hero section
- Removed marketing copy and feature cards
- Removed promotional footer
- Removed orange campaign-style palette
- Replaced with neutral graphite application chrome and restrained blue state/action accents
- Added hardware-display connection heartbeat/status
- Kept script import/export/local save
- Kept Auto, Timed, Voice, and Manual modes
- Kept typography, cue, mirror, stage-direction, contrast, and countdown controls
- Operator preview now has its own scroll viewport

## Hardware output
`/teleprompter/display` is still intentionally minimal and contains only the prompt surface, cue geometry and countdown required for the display itself.

## Validation
The updated TSX passes TypeScript's standalone syntactic transpilation check. A full Next.js build still requires project dependencies (`node_modules`) to be installed.
