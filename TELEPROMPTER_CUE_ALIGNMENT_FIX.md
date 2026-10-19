# Teleprompter cue alignment fix

Fixed the initial script/cue-line alignment.

## Cause
The leading spacer used a percentage height inside an auto-height scrolling element. That percentage was not reliably resolved against the teleprompter viewport, so the script could begin at the physical top while the cue line remained lower in the display.

## Fix
- The presentation surface is now a size container.
- Cue position is expressed in container-query height units (`cqh`), so it tracks the actual presentation surface rather than the browser window or the script's content height.
- The leading spacer subtracts half of the current text line box, placing the center of the first line directly on the orange cue line at `scrollTop = 0`.
- The tail spacer uses the same viewport-relative geometry so the final line can reach the cue line.
- The operator preview and `/teleprompter/display` use the same alignment math.

Changed files:
- `app/teleprompter/TeleprompterClient.tsx`
- `app/teleprompter/teleprompter.module.css`
