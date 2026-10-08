"use client";

import Link from "next/link";
import {
  AlignCenter,
  AlignLeft,
  ArrowDown,
  ArrowUp,
  BookOpenText,
  ChevronLeft,
  Clock3,
  Download,
  Expand,
  Eye,
  FileUp,
  FlipHorizontal2,
  FlipVertical2,
  Gauge,
  Keyboard,
  Maximize2,
  Mic,
  MonitorUp,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Repeat2,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Type,
  Volume2,
  X,
} from "lucide-react";
import {
  ChangeEvent,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./teleprompter.module.css";

type ScrollMode = "auto" | "timed" | "voice" | "manual";
type TextAlign = "left" | "center";

type PrompterSettings = {
  wpm: number;
  fontSize: number;
  lineHeight: number;
  width: number;
  cuePosition: number;
  mirrorH: boolean;
  mirrorV: boolean;
  align: TextAlign;
  countdown: number;
  mode: ScrollMode;
  targetSeconds: number;
  stageDirections: boolean;
  highContrast: boolean;
};

type SyncSnapshot = {
  script: string;
  settings: PrompterSettings;
  running: boolean;
  countdown: number | null;
};

type ChannelMessage =
  | { type: "sync"; payload: SyncSnapshot }
  | { type: "command"; command: "restart" | "scrollUp" | "scrollDown" | "toggle" }
  | { type: "displayStatus"; status: "ready" | "heartbeat" | "closed" };

const STORAGE_KEY = "otl.teleprompter.v1";
const CHANNEL_NAME = "otl-teleprompter";

const DEFAULT_SCRIPT = `Paste your script here, or import a file.\n\nUse [brackets] for stage directions. They can be visually de-emphasized in presentation mode.\n\nPress Start Teleprompter when you're ready.`;

const DEFAULT_SETTINGS: PrompterSettings = {
  wpm: 135,
  fontSize: 58,
  lineHeight: 1.5,
  width: 820,
  cuePosition: 42,
  mirrorH: false,
  mirrorV: false,
  align: "center",
  countdown: 3,
  mode: "auto",
  targetSeconds: 120,
  stageDirections: true,
  highContrast: false,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const total = Math.round(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function normalizeWords(value: string) {
  return value
    .replace(/\[[^\]]+\]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9'’]+/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function stripRtf(input: string) {
  return input
    .replace(/\\par[d]?/g, "\n")
    .replace(/\\tab/g, "\t")
    .replace(/\\'[0-9a-fA-F]{2}/g, "")
    .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function inflateRaw(bytes: Uint8Array) {
  if (!("DecompressionStream" in window)) {
    throw new Error("This browser cannot decompress Word files locally.");
  }
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const stream = new Blob([copy.buffer]).stream().pipeThrough(new DecompressionStream("deflate-raw" as CompressionFormat));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function readDocx(arrayBuffer: ArrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i -= 1) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("Could not read this .docx file.");

  const entryCount = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder("utf-8");

  for (let i = 0; i < entryCount; i += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const fileNameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));

    if (name === "word/document.xml") {
      if (view.getUint32(localOffset, true) !== 0x04034b50) {
        throw new Error("The Word document has an unexpected structure.");
      }
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = bytes.slice(dataStart, dataStart + compressedSize);
      const xmlBytes = method === 0 ? compressed : method === 8 ? await inflateRaw(compressed) : null;
      if (!xmlBytes) throw new Error("This Word compression format is not supported.");

      const xml = decoder.decode(xmlBytes);
      const doc = new DOMParser().parseFromString(xml, "application/xml");
      const paragraphs = Array.from(doc.getElementsByTagNameNS("*", "p"));
      const text = paragraphs
        .map((paragraph) =>
          Array.from(paragraph.getElementsByTagNameNS("*", "t"))
            .map((node) => node.textContent ?? "")
            .join("")
        )
        .join("\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      if (!text) throw new Error("No readable text was found in this Word document.");
      return text;
    }

    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  throw new Error("Could not find the document text inside this .docx file.");
}

function ScriptText({ script, dimDirections }: { script: string; dimDirections: boolean }) {
  const pieces = script.split(/(\[[^\]]+\])/g);
  return (
    <>
      {pieces.map((piece, index) =>
        dimDirections && /^\[[^\]]+\]$/.test(piece) ? (
          <span className={styles.stageDirection} key={`${piece}-${index}`}>
            {piece}
          </span>
        ) : (
          piece
        )
      )}
    </>
  );
}

export function TeleprompterClient({ displayMode = false }: { displayMode?: boolean } = {}) {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [settings, setSettings] = useState<PrompterSettings>(DEFAULT_SETTINGS);
  const [running, setRunning] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [displayOnly, setDisplayOnly] = useState(displayMode);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "unsupported" | "error">("idle");
  const [importError, setImportError] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [displayConnected, setDisplayConnected] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.18);
  const [musicLoop, setMusicLoop] = useState(true);
  const [musicLinked, setMusicLinked] = useState(true);
  const [musicFading, setMusicFading] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const previewViewportRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const lastUiUpdateRef = useRef(0);
  const scrollPositionRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const suppressBroadcastRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const lastVoiceIndexRef = useRef(0);
  const voiceShouldRunRef = useRef(false);
  const displayHeartbeatTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUrlRef = useRef<string | null>(null);
  const musicFadeTimerRef = useRef<number | null>(null);

  const words = useMemo(() => normalizeWords(script), [script]);
  const wordCount = words.length;
  const targetWpm = settings.targetSeconds > 0 ? Math.round(wordCount / (settings.targetSeconds / 60)) : 0;
  const estimatedSeconds = Math.max(1, Math.round((wordCount / Math.max(1, settings.wpm)) * 60));
  const modeLabel = settings.mode === "auto" ? "WPM" : settings.mode.toUpperCase();

  const snapshot = useMemo<SyncSnapshot>(
    () => ({ script, settings, running, countdown }),
    [script, settings, running, countdown]
  );

  const broadcast = useCallback((message: ChannelMessage) => {
    channelRef.current?.postMessage(message);
  }, []);

  const scrollByRemoteAware = useCallback(
    (delta: number, command?: "scrollUp" | "scrollDown") => {
      const viewport = viewportRef.current ?? previewViewportRef.current;
      if (viewport) viewport.scrollBy({ top: delta, behavior: "smooth" });
      if (command) broadcast({ type: "command", command });
    },
    [broadcast]
  );

  const restart = useCallback(
    (send = true) => {
      const viewport = viewportRef.current;
      if (viewport) viewport.scrollTo({ top: 0, behavior: "smooth" });
      previewViewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      setProgress(0);
      setElapsed(0);
      scrollPositionRef.current = 0;
      startTimeRef.current = performance.now();
      lastVoiceIndexRef.current = 0;
      if (musicLinked && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (send) broadcast({ type: "command", command: "restart" });
    },
    [broadcast, musicLinked]
  );

  const stopVoiceRecognition = useCallback(() => {
    voiceShouldRunRef.current = false;
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // Browser speech APIs can throw when stop() races an end event.
    }
    recognitionRef.current = null;
    if (voiceStatus === "listening") setVoiceStatus("idle");
  }, [voiceStatus]);

  const startVoiceRecognition = useCallback(() => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceStatus("unsupported");
      return false;
    }

    stopVoiceRecognition();
    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += ` ${event.results[i][0]?.transcript ?? ""}`;
      }
      const spoken = normalizeWords(transcript);
      if (spoken.length < 2 || words.length < 2) return;

      let found = -1;
      for (let phraseLength = Math.min(6, spoken.length); phraseLength >= 2 && found < 0; phraseLength -= 1) {
        const phrase = spoken.slice(-phraseLength);
        const searchStart = Math.max(0, lastVoiceIndexRef.current - 30);
        for (let i = searchStart; i <= words.length - phraseLength; i += 1) {
          let matches = true;
          for (let j = 0; j < phraseLength; j += 1) {
            if (words[i + j] !== phrase[j]) {
              matches = false;
              break;
            }
          }
          if (matches) {
            found = i + phraseLength - 1;
            break;
          }
        }
      }

      if (found >= 0) {
        lastVoiceIndexRef.current = found;
        const viewport = viewportRef.current;
        if (viewport) {
          const max = Math.max(1, viewport.scrollHeight - viewport.clientHeight);
          const target = (found / Math.max(1, words.length - 1)) * max;
          viewport.scrollTo({ top: clamp(target, 0, max), behavior: "smooth" });
        }
      }
    };
    recognition.onerror = () => setVoiceStatus("error");
    recognition.onend = () => {
      if (voiceShouldRunRef.current) {
        try {
          recognition.start();
          setVoiceStatus("listening");
        } catch {
          setVoiceStatus("error");
        }
      } else {
        setVoiceStatus("idle");
      }
    };

    recognitionRef.current = recognition;
    voiceShouldRunRef.current = true;
    try {
      recognition.start();
      setVoiceStatus("listening");
      return true;
    } catch {
      setVoiceStatus("error");
      return false;
    }
  }, [running, settings.mode, stopVoiceRecognition, words]);

  const beginPlayback = useCallback(
    (withCountdown = true) => {
      if (running) {
        setRunning(false);
        return;
      }
      if (withCountdown && settings.countdown > 0) {
        setCountdown(settings.countdown);
        return;
      }
      startTimeRef.current = performance.now() - elapsed * 1000;
      setRunning(true);
    },
    [broadcast, elapsed, running, settings.countdown]
  );

  const updateSetting = useCallback(<K extends keyof PrompterSettings>(key: K, value: PrompterSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  }, []);

  useEffect(() => {
    setDisplayOnly(displayMode || new URLSearchParams(window.location.search).get("display") === "1");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<SyncSnapshot> & {
          settings?: Partial<PrompterSettings> & { speed?: number };
        };
        if (typeof parsed.script === "string") setScript(parsed.script);
        if (parsed.settings) {
          const { speed: _legacyPixelSpeed, ...savedSettings } = parsed.settings;
          setSettings((current) => ({
            ...current,
            ...savedSettings,
            wpm: typeof parsed.settings?.wpm === "number" ? clamp(parsed.settings.wpm, 80, 200) : current.wpm,
          }));
        }
      } catch {
        // Ignore malformed local browser state and use defaults.
      }
    }
    setHydrated(true);
  }, [displayMode]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ script, settings }));
  }, [hydrated, script, settings]);

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event: MessageEvent<ChannelMessage>) => {
      const message = event.data;
      if (message?.type === "sync") {
        suppressBroadcastRef.current = true;
        setScript(message.payload.script);
        setSettings(message.payload.settings);
        setRunning(message.payload.running);
        setCountdown(message.payload.countdown ?? null);
      }
      if (message?.type === "command") {
        if (message.command === "restart") restart(false);
        if (message.command === "scrollUp") scrollByRemoteAware(-220);
        if (message.command === "scrollDown") scrollByRemoteAware(220);
        if (message.command === "toggle") setRunning((value) => !value);
      }
      if (message?.type === "displayStatus" && !displayOnly) {
        if (message.status === "closed") {
          setDisplayConnected(false);
        } else {
          setDisplayConnected(true);
          if (displayHeartbeatTimeoutRef.current) window.clearTimeout(displayHeartbeatTimeoutRef.current);
          displayHeartbeatTimeoutRef.current = window.setTimeout(() => setDisplayConnected(false), 4000);
        }
      }
    };
    return () => {
      channel.close();
      channelRef.current = null;
      if (displayHeartbeatTimeoutRef.current) window.clearTimeout(displayHeartbeatTimeoutRef.current);
    };
  }, [displayOnly, restart, scrollByRemoteAware]);

  useEffect(() => {
    if (!displayOnly || !hydrated) return;
    const announce = () => channelRef.current?.postMessage({ type: "displayStatus", status: "heartbeat" } satisfies ChannelMessage);
    channelRef.current?.postMessage({ type: "displayStatus", status: "ready" } satisfies ChannelMessage);
    const interval = window.setInterval(announce, 1500);
    const onBeforeUnload = () => channelRef.current?.postMessage({ type: "displayStatus", status: "closed" } satisfies ChannelMessage);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeunload", onBeforeUnload);
      channelRef.current?.postMessage({ type: "displayStatus", status: "closed" } satisfies ChannelMessage);
    };
  }, [displayOnly, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (suppressBroadcastRef.current) {
      suppressBroadcastRef.current = false;
      return;
    }
    broadcast({ type: "sync", payload: snapshot });
  }, [broadcast, hydrated, snapshot]);

  useEffect(() => {
    if (displayOnly) return;
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      startTimeRef.current = performance.now() - elapsed * 1000;
      setRunning(true);
      return;
    }
    const timer = window.setTimeout(() => setCountdown((value) => (value === null ? null : value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [broadcast, countdown, displayOnly, elapsed]);

  useEffect(() => {
    if (!running || settings.mode !== "voice" || (!presenting && !displayOnly)) {
      stopVoiceRecognition();
      return;
    }
    startVoiceRecognition();
    return () => stopVoiceRecognition();
  }, [running, settings.mode, presenting, displayOnly]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastFrameRef.current = null;
      lastUiUpdateRef.current = 0;
      return;
    }

    const tick = (now: number) => {
      const viewport = viewportRef.current ?? previewViewportRef.current;
      if (!viewport) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsedNow = (now - startTimeRef.current) / 1000;

      const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const promptText = viewport.querySelector<HTMLElement>("[data-prompt-text]");
      const linePixels = settings.fontSize * settings.lineHeight;
      // At scrollTop 0 the first line is centered on the cue line. Finish when
      // the final rendered line reaches that same cue position.
      const scriptDistance = promptText
        ? clamp(promptText.scrollHeight - linePixels, 0, maxScroll)
        : maxScroll;

      if (settings.mode === "auto" || settings.mode === "timed") {
        const last = lastFrameRef.current ?? now;
        const delta = Math.min(50, now - last);
        lastFrameRef.current = now;

        // Preserve fractional movement. Some browsers round DOM scrollTop writes,
        // which makes sub-1px/frame speeds appear frozen around <60 px/s at 60 Hz.
        if (Math.abs(viewport.scrollTop - scrollPositionRef.current) > 3) {
          scrollPositionRef.current = viewport.scrollTop;
        }

        let pixelsPerSecond = 0;
        if (settings.mode === "auto") {
          const speakingSeconds = Math.max(1, (wordCount / Math.max(1, settings.wpm)) * 60);
          pixelsPerSecond = scriptDistance / speakingSeconds;
        } else {
          const remainingTime = Math.max(1, settings.targetSeconds - (now - startTimeRef.current) / 1000);
          const remainingPixels = Math.max(0, scriptDistance - scrollPositionRef.current);
          pixelsPerSecond = remainingPixels / remainingTime;
        }

        scrollPositionRef.current = clamp(
          scrollPositionRef.current + (pixelsPerSecond * delta) / 1000,
          0,
          scriptDistance
        );
        viewport.scrollTop = scrollPositionRef.current;
      }

      const nextProgress = scriptDistance > 0 ? viewport.scrollTop / scriptDistance : 0;

      // The DOM scroll itself stays at animation-frame speed. React only needs to
      // repaint clocks/progress a few times per second; rendering the whole script
      // at 60fps wastes work and can make long prompts stutter.
      if (now - lastUiUpdateRef.current >= 100) {
        lastUiUpdateRef.current = now;
        setElapsed(elapsedNow);
        setProgress(clamp(nextProgress, 0, 1));
      }

      if (scriptDistance > 0 && viewport.scrollTop >= scriptDistance - 1 && settings.mode !== "voice") {
        setElapsed(elapsedNow);
        setProgress(1);
        setRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, settings.mode, settings.wpm, settings.targetSeconds, settings.fontSize, settings.lineHeight, wordCount]);

  useEffect(() => {
    if (!running || !("wakeLock" in navigator)) return;
    let wakeLock: any;
    (navigator as any).wakeLock
      .request("screen")
      .then((lock: any) => {
        wakeLock = lock;
      })
      .catch(() => undefined);
    return () => wakeLock?.release?.();
  }, [running]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditing = target?.tagName === "TEXTAREA" || target?.tagName === "INPUT" || target?.isContentEditable;
      if (isEditing && !displayOnly && !presenting) return;

      if (event.code === "Space") {
        event.preventDefault();
        beginPlayback(false);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (settings.mode === "manual") scrollByRemoteAware(-90, "scrollUp");
        else updateSetting("wpm", clamp(settings.wpm + 5, 80, 200));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (settings.mode === "manual") scrollByRemoteAware(90, "scrollDown");
        else updateSetting("wpm", clamp(settings.wpm - 5, 80, 200));
      } else if (event.key === "PageUp") {
        event.preventDefault();
        scrollByRemoteAware(-320, "scrollUp");
      } else if (event.key === "PageDown") {
        event.preventDefault();
        scrollByRemoteAware(320, "scrollDown");
      } else if (event.key === "+" || event.key === "=") {
        updateSetting("fontSize", clamp(settings.fontSize + 2, 24, 120));
      } else if (event.key === "-" || event.key === "_") {
        updateSetting("fontSize", clamp(settings.fontSize - 2, 24, 120));
      } else if (event.key.toLowerCase() === "m") {
        updateSetting("mirrorH", !settings.mirrorH);
      } else if (event.key.toLowerCase() === "f") {
        document.documentElement.requestFullscreen?.().catch(() => undefined);
      } else if (event.key === "Home") {
        event.preventDefault();
        restart();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [beginPlayback, displayOnly, presenting, restart, scrollByRemoteAware, settings, updateSetting]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = musicVolume;
    audio.loop = musicLoop;
  }, [musicLoop, musicVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicLinked || !musicName) return;
    if (running) {
      audio.play().catch(() => undefined);
    } else if (!musicFading) {
      audio.pause();
    }
  }, [musicFading, musicLinked, musicName, running]);

  useEffect(() => () => {
    if (musicFadeTimerRef.current) window.clearInterval(musicFadeTimerRef.current);
    audioRef.current?.pause();
    if (musicUrlRef.current) URL.revokeObjectURL(musicUrlRef.current);
  }, []);

  const remainingSeconds = useMemo(() => {
    if (progress >= 1) return 0;
    if (settings.mode === "timed") return Math.max(0, settings.targetSeconds - elapsed);
    if (settings.mode === "voice") return Math.max(0, estimatedSeconds * (1 - progress));
    const viewport = viewportRef.current;
    if (!viewport || settings.wpm <= 0) return estimatedSeconds;
    return Math.max(0, estimatedSeconds * (1 - progress));
  }, [elapsed, estimatedSeconds, progress, settings.mode, settings.wpm, settings.targetSeconds]);

  const handleMusicImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (musicFadeTimerRef.current) {
      window.clearInterval(musicFadeTimerRef.current);
      musicFadeTimerRef.current = null;
    }
    setMusicFading(false);

    audioRef.current?.pause();
    if (musicUrlRef.current) URL.revokeObjectURL(musicUrlRef.current);

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.preload = "metadata";
    audio.loop = musicLoop;
    audio.volume = musicVolume;
    audio.onplay = () => setMusicPlaying(true);
    audio.onpause = () => setMusicPlaying(false);
    audio.onended = () => setMusicPlaying(false);
    audioRef.current = audio;
    musicUrlRef.current = url;
    setMusicName(file.name);
    event.target.value = "";
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // Browser autoplay policies can block playback until the next user gesture.
      }
    } else {
      audio.pause();
    }
  };

  const fadeOutMusic = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused || musicFading) return;
    if (musicFadeTimerRef.current) window.clearInterval(musicFadeTimerRef.current);

    setMusicFading(true);
    const startVolume = audio.volume;
    const steps = 20;
    let step = 0;
    musicFadeTimerRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, startVolume * (1 - step / steps));
      if (step >= steps) {
        if (musicFadeTimerRef.current) window.clearInterval(musicFadeTimerRef.current);
        musicFadeTimerRef.current = null;
        audio.pause();
        audio.currentTime = 0;
        audio.volume = musicVolume;
        setMusicFading(false);
      }
    }, 60);
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImportError("");
    try {
      const extension = file.name.split(".").pop()?.toLowerCase();
      let text = "";
      if (extension === "docx") {
        text = await readDocx(await file.arrayBuffer());
      } else {
        text = await file.text();
        if (extension === "rtf") text = stripRtf(text);
        if (extension === "html" || extension === "htm") {
          text = new DOMParser().parseFromString(text, "text/html").body.textContent ?? "";
        }
      }
      setScript(text.trim());
      restart();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Could not import that file.");
    } finally {
      event.target.value = "";
    }
  };

  const downloadScript = () => {
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "teleprompter-script.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const saveNow = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ script, settings }));
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1300);
  };

  const openDisplay = () => {
    saveNow();
    const displayWindow = window.open("/teleprompter/display", "otl-teleprompter-display", "popup=yes,width=1200,height=800");
    if (displayWindow) {
      window.setTimeout(() => broadcast({ type: "sync", payload: snapshot }), 500);
      displayWindow.focus();
    }
  };

  const enterPresentation = () => {
    setPresenting(true);
    window.setTimeout(() => viewportRef.current?.focus(), 0);
  };

  const exitPresentation = () => {
    setRunning(false);
    setPresenting(false);
    stopVoiceRecognition();
  };

  const prompterStyle = {
    "--prompt-size": `${settings.fontSize}px`,
    "--prompt-line": settings.lineHeight,
    "--prompt-line-px": `${settings.fontSize * settings.lineHeight}px`,
    "--prompt-width": `${settings.width}px`,
    "--cue-offset": `${settings.cuePosition}cqh`,
    "--mirror-x": settings.mirrorH ? -1 : 1,
    "--mirror-y": settings.mirrorV ? -1 : 1,
  } as CSSProperties;

  // Render as a plain helper, not a nested React component.
  // A nested component gets a new identity on every TeleprompterClient render; because
  // elapsed/progress update during playback, that remounted the scroll viewport every
  // animation frame and reset scrollTop, producing a visible "shake" instead of scrolling.
  const renderPresentation = ({ embedded = false, hardware = false }: { embedded?: boolean; hardware?: boolean } = {}) => (
    <section
      className={`${styles.presentation} ${embedded ? styles.presentationEmbedded : ""} ${settings.highContrast ? styles.presentationHighContrast : ""}`}
      style={prompterStyle}
      aria-label="Teleprompter presentation"
    >
      {!embedded && !hardware && (
        <div className={styles.presentationTopbar}>
          <div>
            <span className={styles.liveDot} data-running={running} />
            <strong>{running ? "RUNNING" : "READY"}</strong>
            <span>{modeLabel}</span>
          </div>
          <div>
            <span>{formatClock(elapsed)} elapsed</span>
            <span>{formatClock(remainingSeconds)} remaining</span>
            {!displayOnly && (
              <button onClick={exitPresentation} type="button" aria-label="Exit teleprompter">
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.cueBand} aria-hidden="true" />
      <div className={styles.cueLine} aria-hidden="true">
        <span />
      </div>

      <div className={styles.promptViewport} ref={embedded ? previewViewportRef : viewportRef} tabIndex={embedded ? -1 : 0}>
        <div className={styles.promptContent}>
          <div className={styles.promptLead} />
          <div
            className={styles.promptText}
            data-prompt-text
            style={{ textAlign: settings.align }}
          >
            <ScriptText script={script} dimDirections={settings.stageDirections} />
          </div>
          <div className={styles.promptTail} />
        </div>
      </div>

      {!embedded && countdown !== null && (
        <div className={styles.countdownOverlay}>
          <span>{countdown === 0 ? "GO" : countdown}</span>
        </div>
      )}

      {!embedded && !hardware && (
        <div className={styles.presentationDock}>
          <button type="button" onClick={() => restart()} title="Restart (Home)">
            <RotateCcw size={18} />
          </button>
          <button type="button" onClick={() => scrollByRemoteAware(-220, "scrollUp")} title="Scroll up (Page Up)">
            <ArrowUp size={18} />
          </button>
          <button className={styles.primaryRound} type="button" onClick={() => beginPlayback(false)} title="Play / pause (Space)">
            {running ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button type="button" onClick={() => scrollByRemoteAware(220, "scrollDown")} title="Scroll down (Page Down)">
            <ArrowDown size={18} />
          </button>
          <button type="button" onClick={() => document.documentElement.requestFullscreen?.().catch(() => undefined)} title="Fullscreen (F)">
            <Maximize2 size={18} />
          </button>
          <div className={styles.dockProgress}>
            <span style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}
    </section>
  );

  if (!hydrated) {
    return <div className={styles.loading}>Loading teleprompter…</div>;
  }

  if (displayOnly) {
    return <div className={`${styles.displayOnly} ${styles.hardwareDisplay}`}>{renderPresentation({ hardware: true })}</div>;
  }

  if (presenting) {
    return <div className={styles.displayOnly}>{renderPresentation()}</div>;
  }

  return (
    <main className={styles.page}>
      <header className={styles.appHeader}>
        <Link className={styles.appBrand} href="/">
          <img src="/brand/otl-mark.png" alt="" />
          <strong>Teleprompter</strong>
        </Link>
        <div className={styles.headerState}>
          <span className={styles.connectionDot} data-connected={displayConnected} />
          <span>{displayConnected ? "Display connected" : "Display not connected"}</span>
          <span className={styles.headerDivider} />
          <span>{wordCount.toLocaleString()} words</span>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => setShowHelp(true)} title="Keyboard shortcuts"><Keyboard size={15} /> Shortcuts</button>
          <Link href="/creator-tools"><ChevronLeft size={15} /> Tools</Link>
        </div>
      </header>

      <section className={styles.transportBar} aria-label="Teleprompter transport controls">
        <div className={styles.launchControls}>
          <button className={styles.openDisplayButton} type="button" onClick={openDisplay}>
            <MonitorUp size={17} /> Open Display
          </button>
          <button className={styles.playButton} type="button" onClick={() => beginPlayback(true)}>
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? "Pause" : "Start"}
          </button>
          <button className={styles.iconButton} type="button" onClick={() => restart()} title="Restart"><RotateCcw size={17} /></button>
          <button className={styles.iconButton} type="button" onClick={() => scrollByRemoteAware(-220, "scrollUp")} title="Jump back"><ArrowUp size={17} /></button>
          <button className={styles.iconButton} type="button" onClick={() => scrollByRemoteAware(220, "scrollDown")} title="Jump forward"><ArrowDown size={17} /></button>
        </div>

        <div className={styles.musicDeck} aria-label="Background music controls">
          <label className={styles.musicLoadButton} title={musicName || "Load background music"}>
            <Music2 size={15} />
            <span>{musicName ? "Replace" : "Music"}</span>
            <input type="file" accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg" onChange={handleMusicImport} />
          </label>
          <button className={styles.musicIconButton} type="button" onClick={toggleMusic} disabled={!musicName} title={musicPlaying ? "Pause music" : "Play music"}>
            {musicPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <label className={styles.musicVolume} title={`Music volume ${Math.round(musicVolume * 100)}%`}>
            <Volume2 size={14} />
            <input type="range" min={0} max={0.5} step={0.01} value={musicVolume} onChange={(event) => setMusicVolume(Number(event.target.value))} disabled={!musicName} />
            <span>{Math.round(musicVolume * 100)}%</span>
          </label>
          <button className={`${styles.musicTextButton} ${musicLoop ? styles.musicActive : ""}`} type="button" onClick={() => setMusicLoop((value) => !value)} disabled={!musicName} title="Loop music">
            <Repeat2 size={14} /> Loop
          </button>
          <button className={`${styles.musicTextButton} ${musicLinked ? styles.musicActive : ""}`} type="button" onClick={() => setMusicLinked((value) => !value)} disabled={!musicName} title="Start and pause music with teleprompter playback">
            Link
          </button>
          <button className={styles.musicTextButton} type="button" onClick={fadeOutMusic} disabled={!musicPlaying || musicFading} title="Fade music out">
            {musicFading ? "Fading…" : "Fade"}
          </button>
        </div>

        <div className={styles.quickControls}>
          <label className={styles.compactField}>
            <span>Mode</span>
            <select value={settings.mode} onChange={(event) => updateSetting("mode", event.target.value as ScrollMode)}>
              <option value="auto">WPM</option>
              <option value="timed">Timed</option>
              <option value="voice">Voice</option>
              <option value="manual">Manual</option>
            </select>
          </label>

          {settings.mode === "auto" && (
            <div className={styles.paceField}>
              <span>Pace</span>
              <div className={styles.pacePresets} aria-label="Speaking pace presets">
                <button className={settings.wpm === 110 ? styles.pacePresetActive : ""} type="button" onClick={() => updateSetting("wpm", 110)}>Slow</button>
                <button className={settings.wpm === 135 ? styles.pacePresetActive : ""} type="button" onClick={() => updateSetting("wpm", 135)}>Normal</button>
                <button className={settings.wpm === 160 ? styles.pacePresetActive : ""} type="button" onClick={() => updateSetting("wpm", 160)}>Fast</button>
              </div>
              <label className={styles.wpmInput}>
                <input type="number" min={80} max={200} step={5} value={settings.wpm} onChange={(event) => updateSetting("wpm", clamp(Number(event.target.value) || 135, 80, 200))} />
                <span>WPM</span>
              </label>
            </div>
          )}

          {settings.mode === "timed" && (
            <label className={styles.compactField}>
              <span>Duration</span>
              <input type="number" min={15} max={7200} step={15} value={settings.targetSeconds} onChange={(event) => updateSetting("targetSeconds", clamp(Number(event.target.value) || 15, 15, 7200))} />
            </label>
          )}

          <button className={`${styles.toolToggle} ${settings.mirrorH ? styles.toolToggleActive : ""}`} type="button" onClick={() => updateSetting("mirrorH", !settings.mirrorH)} title="Mirror horizontally for beam-splitter glass">
            <FlipHorizontal2 size={16} /> Mirror
          </button>
          <button className={styles.toolToggle} type="button" onClick={enterPresentation} title="Run the prompter in this window">
            <Expand size={16} /> Present Here
          </button>
        </div>

        <div className={styles.transportReadout}>
          <div><span>Status</span><strong>{countdown !== null ? `${countdown}` : running ? "RUN" : "READY"}</strong></div>
          <div><span>Elapsed</span><strong>{formatClock(elapsed)}</strong></div>
          <div><span>Remain</span><strong>{formatClock(remainingSeconds)}</strong></div>
        </div>
      </section>

      <section className={styles.appWorkspace}>
        <section className={`${styles.pane} ${styles.scriptPane}`}>
          <div className={styles.paneHeader}>
            <div className={styles.paneTitle}>Script</div>
            <div className={styles.paneActions}>
              <label className={styles.fileButton}>
                <FileUp size={14} /> Import
                <input type="file" accept=".txt,.md,.rtf,.html,.htm,.docx,text/plain,text/markdown,application/rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleImport} />
              </label>
              <button type="button" onClick={downloadScript}><Download size={14} /> Export</button>
              <button type="button" onClick={saveNow}><Save size={14} /> {savedFlash ? "Saved" : "Save"}</button>
            </div>
          </div>
          <textarea
            className={styles.editor}
            value={script}
            onChange={(event) => setScript(event.target.value)}
            spellCheck
            aria-label="Teleprompter script"
          />
          <div className={styles.paneStatus}>
            <span>{wordCount.toLocaleString()} words</span>
            <span>~{formatClock(estimatedSeconds)} @ {settings.wpm} WPM</span>
            <span>Local autosave</span>
          </div>
          {importError && <div className={styles.errorBanner}>{importError}</div>}
        </section>

        <section className={`${styles.pane} ${styles.monitorPane}`}>
          <div className={styles.paneHeader}>
            <div className={styles.paneTitle}>Monitor</div>
            <div className={styles.monitorState}>
              <span className={styles.connectionDot} data-connected={displayConnected} />
              {displayConnected ? "Live output" : "Preview"}
            </div>
          </div>
          <div className={styles.monitorCanvas}>
            {renderPresentation({ embedded: true })}
          </div>
          <div className={styles.paneStatus}>
            <span>{modeLabel}</span>
            <span>{settings.fontSize}px</span>
            <span>Cue {settings.cuePosition}%</span>
            <span>{settings.mirrorH ? "Mirrored" : "Normal"}</span>
          </div>
        </section>

        <aside className={`${styles.pane} ${styles.inspectorPane}`}>
          <div className={styles.paneHeader}>
            <div className={styles.paneTitle}>Settings</div>
            <Settings2 size={15} />
          </div>
          <div className={styles.inspectorScroll}>
            <ControlSection title="Scroll" icon={<Gauge size={15} />}>
              <div className={styles.segmentedFour}>
                {(["auto", "timed", "voice", "manual"] as ScrollMode[]).map((value) => (
                  <button key={value} className={settings.mode === value ? styles.segmentActive : ""} type="button" onClick={() => updateSetting("mode", value)}>{value === "auto" ? "WPM" : value}</button>
                ))}
              </div>
              {settings.mode === "auto" && (
                <>
                  <div className={styles.segmentedThree}>
                    <button className={settings.wpm === 110 ? styles.segmentActive : ""} type="button" onClick={() => updateSetting("wpm", 110)}>Slow</button>
                    <button className={settings.wpm === 135 ? styles.segmentActive : ""} type="button" onClick={() => updateSetting("wpm", 135)}>Normal</button>
                    <button className={settings.wpm === 160 ? styles.segmentActive : ""} type="button" onClick={() => updateSetting("wpm", 160)}>Fast</button>
                  </div>
                  <RangeControl label="Fine pace" value={settings.wpm} min={80} max={200} step={5} onChange={(value) => updateSetting("wpm", value)} suffix=" WPM" />
                </>
              )}
              {settings.mode === "timed" && (
                <div className={styles.settingRow}>
                  <label><span>Duration</span><input type="number" min={15} max={7200} step={15} value={settings.targetSeconds} onChange={(event) => updateSetting("targetSeconds", clamp(Number(event.target.value) || 15, 15, 7200))} /></label>
                  <div className={styles.metric}><span>Required</span><strong>{targetWpm} WPM</strong></div>
                </div>
              )}
              {settings.mode === "voice" && (
                <div className={styles.voiceState} data-status={voiceStatus}><Mic size={14} /><span>{voiceStatus === "unsupported" ? "Speech recognition unavailable" : voiceStatus === "error" ? "Microphone unavailable" : voiceStatus === "listening" ? "Listening" : "Voice follow ready"}</span></div>
              )}
            </ControlSection>

            <ControlSection title="Text" icon={<Type size={15} />}>
              <div className={styles.settingRow}>
                <label><span>Size</span><input type="number" min={24} max={120} value={settings.fontSize} onChange={(event) => updateSetting("fontSize", clamp(Number(event.target.value), 24, 120))} /></label>
                <label><span>Line</span><input type="number" min={1.1} max={2.2} step={0.05} value={settings.lineHeight} onChange={(event) => updateSetting("lineHeight", clamp(Number(event.target.value), 1.1, 2.2))} /></label>
              </div>
              <RangeControl label="Width" value={settings.width} min={420} max={1200} step={20} onChange={(value) => updateSetting("width", value)} suffix=" px" />
              <div className={styles.segmentedTwo}>
                <button className={settings.align === "left" ? styles.segmentActive : ""} onClick={() => updateSetting("align", "left")} type="button"><AlignLeft size={14} /> Left</button>
                <button className={settings.align === "center" ? styles.segmentActive : ""} onClick={() => updateSetting("align", "center")} type="button"><AlignCenter size={14} /> Center</button>
              </div>
            </ControlSection>

            <ControlSection title="Display" icon={<Eye size={15} />}>
              <RangeControl label="Cue position" value={settings.cuePosition} min={22} max={68} step={1} onChange={(value) => updateSetting("cuePosition", value)} suffix="%" />
              <div className={styles.toggleList}>
                <Toggle active={settings.mirrorH} onClick={() => updateSetting("mirrorH", !settings.mirrorH)} icon={<FlipHorizontal2 size={14} />} label="Horizontal mirror" />
                <Toggle active={settings.mirrorV} onClick={() => updateSetting("mirrorV", !settings.mirrorV)} icon={<FlipVertical2 size={14} />} label="Vertical mirror" />
                <Toggle active={settings.stageDirections} onClick={() => updateSetting("stageDirections", !settings.stageDirections)} icon={<BookOpenText size={14} />} label="Dim [stage directions]" />
                <Toggle active={settings.highContrast} onClick={() => updateSetting("highContrast", !settings.highContrast)} icon={<Eye size={14} />} label="High contrast" />
              </div>
            </ControlSection>

            <ControlSection title="Countdown" icon={<TimerReset size={15} />}>
              <div className={styles.segmentedFour}>
                {[0, 3, 5, 10].map((value) => (
                  <button className={settings.countdown === value ? styles.segmentActive : ""} key={value} onClick={() => updateSetting("countdown", value)} type="button">{value === 0 ? "Off" : `${value}s`}</button>
                ))}
              </div>
            </ControlSection>
          </div>
        </aside>
      </section>

      {showHelp && (
        <div className={styles.modalBackdrop} onClick={() => setShowHelp(false)} role="presentation">
          <div className={styles.modal} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
            <div className={styles.modalHeader}><div><Keyboard size={18} /><strong>Keyboard controls</strong></div><button type="button" onClick={() => setShowHelp(false)}><X size={18} /></button></div>
            <div className={styles.shortcutList}>
              <Shortcut keys="Space" action="Play / pause" />
              <Shortcut keys="↑ / ↓" action="Adjust pace or manual scroll" />
              <Shortcut keys="PgUp / PgDn" action="Jump backward / forward" />
              <Shortcut keys="+ / -" action="Text size" />
              <Shortcut keys="M" action="Horizontal mirror" />
              <Shortcut keys="F" action="Fullscreen" />
              <Shortcut keys="Home" action="Restart" />
            </div>
          </div>
        </div>
      )}
    </main>
  );

}

function ControlSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.controlSection}>
      <div className={styles.controlTitle}>{icon}<strong>{title}</strong></div>
      {children}
    </section>
  );
}

function RangeControl({ label, value, min, max, step, onChange, suffix = "" }: { label?: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; suffix?: string }) {
  return (
    <label className={styles.rangeControl}>
      <div><span>{label ?? "Value"}</span><strong>{value}{suffix}</strong></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Toggle({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return <button type="button" className={active ? styles.toggleActive : ""} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function Shortcut({ keys, action }: { keys: string; action: string }) {
  return <div><kbd>{keys}</kbd><span>{action}</span></div>;
}
