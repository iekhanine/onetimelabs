"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Minus,
  Music2,
  Plus,
  RotateCcw,
} from "lucide-react";


// ==========================================================
// METRONOME 001 — CONFIGURATION
// ==========================================================

const MIN_BPM = 30;
const MAX_BPM = 240;

const PRESETS = [
  60,
  80,
  100,
  120,
  140,
  160,
];

const TIME_SIGNATURES = [
  {
    label: "2/4",
    beats: 2,
  },
  {
    label: "3/4",
    beats: 3,
  },
  {
    label: "4/4",
    beats: 4,
  },
  {
    label: "6/8",
    beats: 6,
  },
];


// ==========================================================
// METRONOME 002 — AUDIO CLICK
// ==========================================================

function playClick(
  context: AudioContext,
  accented: boolean,
) {
  const oscillator =
    context.createOscillator();

  const gain =
    context.createGain();

  oscillator.type = "square";

  oscillator.frequency.value =
    accented
      ? 1200
      : 850;

  gain.gain.setValueAtTime(
    accented
      ? 0.22
      : 0.13,
    context.currentTime,
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    context.currentTime + 0.045,
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(
    context.currentTime + 0.05,
  );
}


// ==========================================================
// METRONOME 003 — COMPONENT
// ==========================================================

export default function MetronomePanel() {
  const [
    bpm,
    setBpm,
  ] = useState(120);

  const [
    running,
    setRunning,
  ] = useState(false);

  const [
    beatsPerMeasure,
    setBeatsPerMeasure,
  ] = useState(4);

  const [
    signatureLabel,
    setSignatureLabel,
  ] = useState("4/4");

  const [
    currentBeat,
    setCurrentBeat,
  ] = useState(0);

  const [
    tapTimes,
    setTapTimes,
  ] = useState<number[]>([]);

  const audioRef =
    useRef<AudioContext | null>(null);

  const timerRef =
    useRef<number | null>(null);

  const beatRef =
    useRef(0);

  const bpmRef =
    useRef(bpm);

  const beatsRef =
    useRef(beatsPerMeasure);


  // ========================================================
  // METRONOME 004 — LIVE VALUE REFS
  // ========================================================

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    beatsRef.current =
      beatsPerMeasure;

    beatRef.current = 0;
    setCurrentBeat(0);
  }, [beatsPerMeasure]);


  // ========================================================
  // METRONOME 005 — BPM CONTROL
  // ========================================================

  const updateBpm =
    useCallback(
      (next: number) => {
        const clamped =
          Math.min(
            MAX_BPM,
            Math.max(
              MIN_BPM,
              Math.round(next),
            ),
          );

        setBpm(clamped);
      },
      [],
    );


  // ========================================================
  // METRONOME 006 — CLOCK ENGINE
  // ========================================================

  const stopClock =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );

        timerRef.current = null;
      }

      setRunning(false);
      beatRef.current = 0;
      setCurrentBeat(0);
    }, []);

  const startClock =
    useCallback(async () => {
      if (timerRef.current !== null) {
        return;
      }

      if (!audioRef.current) {
        audioRef.current =
          new AudioContext();
      }

      if (
        audioRef.current.state ===
        "suspended"
      ) {
        await audioRef.current.resume();
      }

      setRunning(true);

      const tick = () => {
        const context =
          audioRef.current;

        if (!context) {
          return;
        }

        const beat =
          beatRef.current;

        playClick(
          context,
          beat === 0,
        );

        setCurrentBeat(beat);

        beatRef.current =
          (beat + 1) %
          beatsRef.current;

        const delay =
          60000 /
          bpmRef.current;

        timerRef.current =
          window.setTimeout(
            tick,
            delay,
          );
      };

      tick();
    }, []);


  // ========================================================
  // METRONOME 007 — TAP TEMPO
  // ========================================================

  const tapTempo =
    useCallback(() => {
      const now =
        performance.now();

      const recent = [
        ...tapTimes,
        now,
      ].filter(
        (time) =>
          now - time <= 3000,
      ).slice(-6);

      setTapTimes(recent);

      if (recent.length < 2) {
        return;
      }

      const intervals =
        recent
          .slice(1)
          .map(
            (time, index) =>
              time -
              recent[index],
          );

      const average =
        intervals.reduce(
          (sum, interval) =>
            sum + interval,
          0,
        ) /
        intervals.length;

      updateBpm(
        60000 / average,
      );
    },
    [
      tapTimes,
      updateBpm,
    ],
  );


  // ========================================================
  // METRONOME 008 — CLEANUP
  // ========================================================

  useEffect(
    () => {
      return () => {
        if (
          timerRef.current !== null
        ) {
          window.clearTimeout(
            timerRef.current,
          );
        }

        audioRef.current?.close();
      };
    },
    [],
  );


  // ========================================================
  // METRONOME 009 — RENDER
  // ========================================================

  return (
    <main className="metronome-shell">
      <section className="metronome-panel">

        <header className="metronome-header">
          <div>
            <span>
              ONETIME LABS // UTILITY MODULE
            </span>

            <h1>
              <Music2 size={19} />
              METRONOME
            </h1>

            <p>
              Precision tempo reference with
              audible and visual beat indication.
            </p>
          </div>

          <a href="/">
            <ArrowLeft size={13} />
            PRODUCT DECK
          </a>
        </header>


        {/* ==================================================
            DISPLAY 010 — BPM READOUT
            ================================================== */}

        <section className="tempo-display">
          <div className="tempo-status">
            <span>STATUS</span>

            <strong>
              {running
                ? "RUNNING"
                : "STANDBY"}
            </strong>
          </div>

          <div className="tempo-number">
            <strong>
              {bpm}
            </strong>

            <span>BPM</span>
          </div>

          <div className="tempo-signature">
            <span>METER</span>

            <strong>
              {signatureLabel}
            </strong>
          </div>
        </section>


        {/* ==================================================
            BEAT 011 — VISUAL INDICATORS
            ================================================== */}

        <section className="beat-bank">
          {Array.from({
            length: beatsPerMeasure,
          }).map(
            (_, index) => (
              <div
                key={index}
                className={
                  running &&
                  currentBeat === index
                    ? index === 0
                      ? "beat-lamp beat-lamp--active beat-lamp--accent"
                      : "beat-lamp beat-lamp--active"
                    : "beat-lamp"
                }
              >
                <i />

                <span>
                  {index + 1}
                </span>
              </div>
            ),
          )}
        </section>


        {/* ==================================================
            CONTROLS 012 — TEMPO
            ================================================== */}

        <section className="control-bay">
          <div className="control-label">
            TEMPO CONTROL
          </div>

          <div className="tempo-controls">
            <button
              type="button"
              className="hardware-button square"
              onClick={
                () =>
                  updateBpm(
                    bpm - 1,
                  )
              }
            >
              <Minus size={18} />
            </button>

            <input
              aria-label="Tempo"
              type="range"
              min={MIN_BPM}
              max={MAX_BPM}
              value={bpm}
              onChange={
                (event) =>
                  updateBpm(
                    Number(
                      event.target.value,
                    ),
                  )
              }
            />

            <button
              type="button"
              className="hardware-button square"
              onClick={
                () =>
                  updateBpm(
                    bpm + 1,
                  )
              }
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="preset-bank">
            {PRESETS.map(
              (preset) => (
                <button
                  key={preset}
                  type="button"
                  className={
                    bpm === preset
                      ? "preset-button preset-button--active"
                      : "preset-button"
                  }
                  onClick={
                    () =>
                      updateBpm(
                        preset,
                      )
                  }
                >
                  {preset}
                </button>
              ),
            )}
          </div>
        </section>


        {/* ==================================================
            METER 013 — TIME SIGNATURE
            ================================================== */}

        <section className="control-bay">
          <div className="control-label">
            METER SELECT
          </div>

          <div className="meter-bank">
            {TIME_SIGNATURES.map(
              (signature) => (
                <button
                  key={signature.label}
                  type="button"
                  className={
                    signatureLabel ===
                    signature.label
                      ? "meter-button meter-button--active"
                      : "meter-button"
                  }
                  onClick={() => {
                    setSignatureLabel(
                      signature.label,
                    );

                    setBeatsPerMeasure(
                      signature.beats,
                    );
                  }}
                >
                  {signature.label}
                </button>
              ),
            )}
          </div>
        </section>


        {/* ==================================================
            TRANSPORT 014 — TAP / START / RESET
            ================================================== */}

        <section className="transport-bank">
          <button
            type="button"
            className="hardware-button"
            onClick={tapTempo}
          >
            TAP TEMPO
          </button>

          <button
            type="button"
            className={
              running
                ? "hardware-button transport transport--stop"
                : "hardware-button transport transport--start"
            }
            onClick={
              running
                ? stopClock
                : startClock
            }
          >
            {running
              ? "STOP"
              : "START"}
          </button>

          <button
            type="button"
            className="hardware-button"
            onClick={() => {
              stopClock();
              updateBpm(120);
              setSignatureLabel("4/4");
              setBeatsPerMeasure(4);
              setTapTimes([]);
            }}
          >
            <RotateCcw size={12} />
            RESET
          </button>
        </section>


        {/* ==================================================
            FOOTNOTE 015 — LOCAL PROCESSING
            ================================================== */}

        <p className="metronome-note">
          LOCAL AUDIO ENGINE // NO EXTERNAL AUDIO
          FILES OR NETWORK CONNECTION REQUIRED
        </p>
      </section>
    </main>
  );
}
