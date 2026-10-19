# Teleprompter mixed recording

The operator console now records microphone + loaded background music inside the browser using Web Audio and MediaRecorder.

## Workflow
1. Load a music file in the Music deck.
2. Use headphones so the music does not bleed acoustically into the microphone.
3. Click Record and allow microphone access.
4. Click Start to run the teleprompter. If Link is enabled, the music follows Start/Pause/Restart.
5. Click Stop in the Record control. The mixed recording downloads automatically.

## Notes
- The microphone is sent to the recording mix but is not monitored back to the speakers/headphones, avoiding delayed self-monitoring/feedback.
- The music is routed both to the recording mix and to the normal browser audio output.
- In Chromium/Edge the output is normally WebM/Opus. If the browser supports MP4 audio recording it may save as M4A instead.
- The music file remains local to the browser; no upload is required.
