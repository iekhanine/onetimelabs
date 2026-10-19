# Teleprompter hardware display

The teleprompter now uses two distinct routes:

- `/teleprompter` — operator console: script editing, imports, pacing, typography, mirroring, cue position, and transport controls.
- `/teleprompter/display` — clean output: full-screen prompt surface intended for a second monitor, tablet, HDMI display, or beam-splitter teleprompter hardware.

## Typical hardware workflow

1. Open `/teleprompter` on the operator laptop.
2. Paste or import the script and configure typography/pacing.
3. Enable **Mirror H** when the display is being reflected in standard beam-splitter glass.
4. Click **Open hardware display**.
5. Move that window to the display connected to the teleprompter hardware.
6. Press **F** in the hardware display window for browser fullscreen.
7. Start/pause/restart/advance from the operator console. The pages stay synchronized with `BroadcastChannel` and local browser state.

The hardware route intentionally omits site navigation, editor UI, transport controls, and status chrome so only prompting content appears on the glass.
