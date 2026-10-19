# Teleprompter pacing update

## What changed

- Replaced raw pixel-speed controls with speaking pace in words per minute (WPM).
- Presets: Slow 110 WPM, Normal 135 WPM, Fast 160 WPM.
- Fine control: 80–200 WPM in 5-WPM steps.
- The app converts WPM into pixel motion from the actual rendered script height, so font size, line spacing, reading width, display size, and line wrapping are accounted for automatically.
- Added a fractional scroll accumulator so speeds below roughly one pixel per animation frame do not get rounded away by the browser.
- Auto scrolling now finishes when the final rendered line reaches the cue line instead of continuing through the trailing spacer.
- Existing locally saved scripts are preserved. Legacy pixel-speed state is ignored and replaced by the new 135 WPM default.
- The visible Auto mode label is now WPM.

## Preset rationale

Current commercial teleprompter guidance generally centers natural delivery around roughly 120–160 WPM. The presets intentionally include a slower 110 WPM option for emotional, technical, or deliberate delivery, a 135 WPM conversational default, and a 160 WPM faster presenter/broadcast pace.

## Sources reviewed

- Teleprompter.com — Words Per Minute scrolling and natural 120–160 WPM guidance
- Teleprompter.com — natural conversational delivery around 125–150 WPM
- PromptSmart Studio help — 150 WPM used for rundown timing estimates
- BIGVU — 160 WPM default and WPM-based teleprompter controls
