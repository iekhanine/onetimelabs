# OneTime Labs Teleprompter — Product Benchmark & Build Notes

## Benchmark reviewed (October 2026)

The implementation was benchmarked against current commercial and browser teleprompter products, especially:

- PromptSmart Pro — voice-follow / speech-paced prompting, mirror support, narrowed reading width, remote control, document import.
  https://apps.apple.com/us/app/promptsmart-pro-teleprompter/id894811756
- Teleprompter Premium+ — voice scrolling, cue markers, mirroring, bracketed stage-direction filtering, countdown, elapsed/remaining time, remote control and meeting-oriented workflows.
  https://www.teleprompterpremium.app/
- Teleprompter.com — cross-device remote control, mirrored playback, keyboard/Bluetooth control, script management and business/team workflows.
  https://www.teleprompter.com/
- BIGVU — browser teleprompter + webcam workflow, speed/text-position controls and business video use cases.
  https://bigvu.tv/tools/webcam-recorder
- TelePrompt Pro — auto/timed/manual modes, smooth browser scrolling, mirror support, keyboard/remote mappings, timer/progress and offline/browser-first operation.
  https://onlinetp.com/

## OTL design goal

Keep the production-grade prompting features while removing account creation, subscriptions, cloud script storage and unrelated video-editing features.

## Implemented

- New public route: `/teleprompter`
- Added `/teleprompter` to sitemap
- Added the free Teleprompter to `/creator-tools`
- Local-only script storage via `localStorage`
- No account requirement
- Auto-scroll mode with adjustable fixed speed
- Timed mode that dynamically paces the script to a target duration
- Required-WPM calculation for timed delivery
- Voice-follow mode using browser speech recognition where supported
- Manual mode for keyboard / HID clickers / foot pedals
- Horizontal and vertical mirror modes
- Adjustable font size, line height and reading width
- Left or centered text alignment
- Adjustable cue-line position
- Optional dimming of `[stage directions]`
- High-contrast display mode
- 0 / 3 / 5 / 10 second countdown
- Elapsed and remaining time
- Progress indicator
- Screen wake lock during playback where supported
- Full presentation view
- Dedicated second-window presenter display
- BroadcastChannel synchronization between operator and presenter windows
- Operator-side play/pause, restart and jump controls while second display is open
- Keyboard controls: Space, arrows, PgUp/PgDn, +/-, M, F, Home
- Local TXT export
- Local import: TXT, Markdown, RTF, HTML and Word `.docx`
- `.docx` extraction is performed in-browser; the document is not uploaded
- Responsive desktop/tablet/mobile UI

## Validation note

The supplied project archive did not contain `node_modules`, so the full `next build` command could not run in the sandbox (`next: not found`). TypeScript parse/static checks were run against the changed TSX files; the only reported errors were the expected unresolved Next/React/Lucide modules caused by the absent dependencies. No additional syntax errors were reported.

To validate in the normal project environment:

```bash
npm ci
npm run build
```

No new npm dependency was added for the teleprompter.
