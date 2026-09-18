"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./a220.module.css";

type AcronymItem = { acronym: string; meaning: string };
type AcronymSection = { title: string; items: AcronymItem[] };
type StudyCard = AcronymItem & { section: string; id: string };
type Mode = "reference" | "flashcards" | "quiz" | "drills" | "match" | "speed" | "systems" | "progress";
type Confidence = "got" | "kinda" | "nope";
type CardStats = { seen: number; attempts: number; correct: number; missed: number; confidence?: Confidence };
type ProgressData = {
  sessions: number;
  answered: number;
  correct: number;
  bestSpeed: number;
  cards: Record<string, CardStats>;
};
type QuizKind = "meaning" | "acronym" | "category" | "truefalse";
type QuizQuestion = {
  card: StudyCard;
  prompt: string;
  detail?: string;
  options: string[];
  correct: string;
};

const STORAGE_KEY = "otl-a220-study-progress-v2";

const sections: AcronymSection[] = [
  { title: "Aircraft General", items: [
    { acronym: "CTP", meaning: "Control Tuning Panel" },
    { acronym: "FCP", meaning: "Flight Control Panel" },
    { acronym: "ISI", meaning: "Integrated Standby Instrument" },
    { acronym: "MKP", meaning: "Multifunction Keyboard Panel" },
    { acronym: "CCP", meaning: "Cursor Control Panel" },
    { acronym: "ACP", meaning: "Audio Control Panel" },
    { acronym: "RSP", meaning: "Reversionary Switch Panel" },
    { acronym: "TQA", meaning: "Throttle Quadrant Assembly" },
    { acronym: "FSCL", meaning: "Flight Spoiler Control Lever" },
    { acronym: "IMS", meaning: "Information Management System" },
  ]},
  { title: "Air Management", items: [
    { acronym: "IAMS", meaning: "Integrated Air Management System" },
    { acronym: "BALODS", meaning: "Bleed Air Leak and Overheat Detection System" },
    { acronym: "IASC", meaning: "Integrated Air System Controllers" },
  ]},
  { title: "Bleed", items: [
    { acronym: "IPCV", meaning: "Intermediate Pressure Check Valve" },
    { acronym: "HPV", meaning: "High Pressure Valve" },
    { acronym: "PRSOV", meaning: "Pressure Regulating Shutoff Valve (Bleed Valve)" },
    { acronym: "FAV", meaning: "Fan Air Valve" },
    { acronym: "BTS", meaning: "Bleed Temp Sensor" },
    { acronym: "HPGC", meaning: "High Pressure Ground Connection" },
  ]},
  { title: "Air Conditioning", items: [
    { acronym: "LPGC", meaning: "Low Pressure Ground Connection" },
    { acronym: "RABV", meaning: "Ram Air Regulating Valve" },
    { acronym: "TCV", meaning: "Temp Control Valve" },
    { acronym: "FCV", meaning: "Flow Control Valve" },
    { acronym: "TAV", meaning: "Trim Air Valve" },
    { acronym: "TAPRV", meaning: "Trim Air Pressure Regulating Valve" },
    { acronym: "TASOV", meaning: "Trim Air Shutoff Valve" },
    { acronym: "ERAV", meaning: "Emergency Ram Air Valve" },
  ]},
  { title: "Auto Flight", items: [
    { acronym: "AFCS", meaning: "Automatic Flight Control System" },
    { acronym: "PFCC", meaning: "Primary Flight Control Computer" },
    { acronym: "FMA", meaning: "Flight Mode Annunciator" },
    { acronym: "EDM", meaning: "Emergency Descent Mode" },
  ]},
  { title: "APU", items: [
    { acronym: "ECU", meaning: "Electronic Control Unit" },
    { acronym: "FCU", meaning: "Fuel Control Unit" },
    { acronym: "AOHE", meaning: "Air/Oil Heat Exchanger" },
  ]},
  { title: "Communications", items: [
    { acronym: "RIU", meaning: "Radio Interface Unit" },
    { acronym: "SDU", meaning: "Satellite Data Unit" },
  ]},
  { title: "Electrical", items: [
    { acronym: "FBWPC", meaning: "Fly-By-Wire Power Converter" },
    { acronym: "EPC", meaning: "Electrical Power Center" },
    { acronym: "BPCU", meaning: "Bus Power Control Unit" },
    { acronym: "EMPC", meaning: "Emergency Power Control" },
    { acronym: "VFG", meaning: "Variable Frequency Generator" },
    { acronym: "PMG", meaning: "Permanent Magnet Generator" },
    { acronym: "GCU", meaning: "Generator Control Unit" },
    { acronym: "OPU", meaning: "Overvoltage Protection Unit" },
    { acronym: "AGCU", meaning: "APU Generator Control Unit" },
    { acronym: "RGC", meaning: "RAT Generator Control" },
    { acronym: "CDC", meaning: "Control and Distribution Cabinet" },
    { acronym: "SSPC", meaning: "Solid State Power Controller" },
  ]},
  { title: "Fire and Overheat", items: [{ acronym: "FDEX", meaning: "Fire Detection and Extinguishing System" }] },
  { title: "Flight Controls", items: [
    { acronym: "IIM", meaning: "Inceptor Interface Module" },
    { acronym: "PFCC", meaning: "Primary Flight Control Computer" },
    { acronym: "REU", meaning: "Remote Electronics Unit" },
    { acronym: "AFCU", meaning: "Alternate Flight Control Unit" },
    { acronym: "MCE", meaning: "Horizontal Stab Motor Control Electronics" },
    { acronym: "PCU", meaning: "Power Control Unit" },
    { acronym: "SFECU", meaning: "Slat/Flap Electronic Control Unit" },
    { acronym: "PDU", meaning: "Power Drive Unit" },
  ]},
  { title: "Fuel", items: [
    { acronym: "FQC", meaning: "Fuel Quantity Computer" },
    { acronym: "FTIS", meaning: "Fuel Tank Inerting System" },
  ]},
  { title: "Landing Gear", items: [
    { acronym: "LGSCU", meaning: "Landing Gear and Steering Control Unit" },
    { acronym: "BDCU", meaning: "Brake Data Concentrator Unit" },
    { acronym: "EMCU", meaning: "Electric Motor Control Unit" },
    { acronym: "BCS", meaning: "Brake Control System" },
    { acronym: "EMA", meaning: "Electric Motor Actuator" },
  ]},
  { title: "Lighting", items: [{ acronym: "EPSU", meaning: "Emergency Power Supply Unit" }] },
  { title: "Engine", items: [
    { acronym: "FDGS", meaning: "Fan Drive Gear System" },
    { acronym: "EEC", meaning: "Electronic Engine Control" },
    { acronym: "PHMU", meaning: "Prognostics and Health Management Unit" },
    { acronym: "ACC", meaning: "Turbine Active Clearance Control" },
    { acronym: "IFPC", meaning: "Integrated Fuel Pump and Control" },
    { acronym: "OCM", meaning: "Oil Control Module" },
  ]},
  { title: "Water and Waste", items: [
    { acronym: "CMS", meaning: "Cabin Management System" },
    { acronym: "WWSC", meaning: "Water and Waste System Controller" },
  ]},
];

const allCards: StudyCard[] = sections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title, id: `${section.title}::${item.acronym}` }))
);

const acronymCounts = allCards.reduce<Record<string, number>>((acc, card) => {
  acc[card.acronym] = (acc[card.acronym] ?? 0) + 1;
  return acc;
}, {});

const categoryCards = allCards.filter((card) => acronymCounts[card.acronym] === 1);

const blankProgress: ProgressData = { sessions: 0, answered: 0, correct: 0, bestSpeed: 0, cards: {} };

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[()\-/,.'’]/g, " ").replace(/\s+/g, " ").trim();
}

function cardPool(sectionName: string) {
  return sectionName === "All Systems" ? allCards : allCards.filter((card) => card.section === sectionName);
}

function pickDistractors(values: string[], correct: string, count = 3) {
  const unique = Array.from(new Set(values.filter((value) => value !== correct)));
  return shuffled(unique).slice(0, count);
}

function buildQuizQuestion(card: StudyCard, kind: QuizKind): QuizQuestion {
  if (kind === "acronym") {
    const options = shuffled([card.acronym, ...pickDistractors(allCards.map((c) => c.acronym), card.acronym)]);
    return { card, prompt: card.meaning, detail: "Which acronym matches this definition?", options, correct: card.acronym };
  }
  if (kind === "category") {
    const options = shuffled([card.section, ...pickDistractors(sections.map((s) => s.title), card.section)]);
    return { card, prompt: card.acronym, detail: `Which system contains ${card.meaning}?`, options, correct: card.section };
  }
  if (kind === "truefalse") {
    const isTrue = Math.random() >= 0.5;
    const wrong = shuffled(allCards.filter((c) => c.meaning !== card.meaning))[0];
    const shownMeaning = isTrue ? card.meaning : wrong.meaning;
    return {
      card,
      prompt: `${card.acronym} = ${shownMeaning}`,
      detail: "Is this pairing correct?",
      options: ["True", "False"],
      correct: isTrue ? "True" : "False",
    };
  }
  const options = shuffled([card.meaning, ...pickDistractors(allCards.map((c) => c.meaning), card.meaning)]);
  return { card, prompt: card.acronym, detail: "What does this acronym mean?", options, correct: card.meaning };
}

function makeBlank(meaning: string) {
  const words = meaning.split(" ");
  const candidates = words
    .map((word, index) => ({ word: word.replace(/[^A-Za-z]/g, ""), index }))
    .filter(({ word }) => word.length >= 4);
  const chosen = candidates[Math.floor(Math.random() * candidates.length)] ?? { word: words[0], index: 0 };
  const display = words.map((word, index) => (index === chosen.index ? "_____" : word)).join(" ");
  return { display, answer: chosen.word };
}

function percent(correct: number, attempts: number) {
  return attempts ? Math.round((correct / attempts) * 100) : 0;
}

export default function A220AcronymsClient() {
  const [mode, setMode] = useState<Mode>("reference");
  const [activeSection, setActiveSection] = useState("Flight Controls");
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState<ProgressData>(blankProgress);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const sessionStarted = useRef(false);

  // Flashcards
  const [studySection, setStudySection] = useState("All Systems");
  const [studyDeck, setStudyDeck] = useState<StudyCard[]>(allCards);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answerFirst, setAnswerFirst] = useState(false);

  // Quiz
  const [quizKind, setQuizKind] = useState<QuizKind>("meaning");
  const [quizSection, setQuizSection] = useState("All Systems");
  const [quizSize, setQuizSize] = useState("10");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizMissed, setQuizMissed] = useState<QuizQuestion[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Drills
  const [drillSection, setDrillSection] = useState("All Systems");
  const [drillType, setDrillType] = useState<"definition" | "acronym" | "blank" | "builder">("acronym");
  const [drillCard, setDrillCard] = useState<StudyCard>(allCards[0]);
  const [drillInput, setDrillInput] = useState("");
  const [drillFeedback, setDrillFeedback] = useState<"idle" | "correct" | "wrong" | "shown">("idle");
  const [blank, setBlank] = useState(() => makeBlank(allCards[0].meaning));
  const [builderPool, setBuilderPool] = useState<string[]>(shuffled(allCards[0].acronym.split("")));
  const [builderAnswer, setBuilderAnswer] = useState<string[]>([]);

  // Match
  const [matchSection, setMatchSection] = useState("All Systems");
  const [matchCards, setMatchCards] = useState<StudyCard[]>([]);
  const [matchLeft, setMatchLeft] = useState<string | null>(null);
  const [matchRight, setMatchRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [matchAttempts, setMatchAttempts] = useState(0);
  const matchMeaningCards = useMemo(() => shuffled(matchCards), [matchCards]);

  // Speed round
  const [speedSection, setSpeedSection] = useState("All Systems");
  const [speedDuration, setSpeedDuration] = useState(60);
  const [speedTime, setSpeedTime] = useState(60);
  const [speedRunning, setSpeedRunning] = useState(false);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedAttempts, setSpeedAttempts] = useState(0);
  const [speedQuestion, setSpeedQuestion] = useState<QuizQuestion | null>(null);

  // System tree
  const [openSystems, setOpenSystems] = useState<Set<string>>(new Set(["Flight Controls"]));

  const ensureSession = () => {
    if (sessionStarted.current) return;
    sessionStarted.current = true;
    setProgress((current) => ({ ...current, sessions: current.sessions + 1 }));
  };

  const updateCardStats = (card: StudyCard, correct?: boolean, confidence?: Confidence) => {
    ensureSession();
    setProgress((current) => {
      const existing = current.cards[card.id] ?? { seen: 0, attempts: 0, correct: 0, missed: 0 };
      const next: CardStats = {
        ...existing,
        seen: existing.seen + 1,
        confidence: confidence ?? existing.confidence,
        attempts: existing.attempts + (correct === undefined ? 0 : 1),
        correct: existing.correct + (correct === true ? 1 : 0),
        missed: existing.missed + (correct === false || confidence === "nope" ? 1 : 0),
      };
      return {
        ...current,
        answered: current.answered + (correct === undefined ? 0 : 1),
        correct: current.correct + (correct === true ? 1 : 0),
        cards: { ...current.cards, [card.id]: next },
      };
    });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress({ ...blankProgress, ...JSON.parse(raw) });
    } catch {
      // Keep the page fully usable even if storage is blocked.
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!progressLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage failures.
    }
  }, [progress, progressLoaded]);

  const visibleSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.acronym.toLowerCase().includes(q) || item.meaning.toLowerCase().includes(q) || section.title.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  const currentSection = visibleSections.find((section) => section.title === activeSection) ?? visibleSections[0] ?? null;
  const currentCard = studyDeck[cardIndex] ?? null;

  const weakCards = useMemo(() => {
    return [...allCards]
      .filter((card) => {
        const stats = progress.cards[card.id];
        return stats && (stats.missed > 0 || stats.confidence === "nope" || stats.confidence === "kinda");
      })
      .sort((a, b) => {
        const aa = progress.cards[a.id];
        const bb = progress.cards[b.id];
        const as = (aa?.missed ?? 0) * 3 + (aa?.confidence === "nope" ? 2 : aa?.confidence === "kinda" ? 1 : 0);
        const bs = (bb?.missed ?? 0) * 3 + (bb?.confidence === "nope" ? 2 : bb?.confidence === "kinda" ? 1 : 0);
        return bs - as;
      });
  }, [progress]);

  const selectStudySection = (sectionName: string) => {
    setStudySection(sectionName);
    const next = sectionName === "Needs Work" ? weakCards : cardPool(sectionName);
    setStudyDeck(next.length ? [...next] : [...allCards]);
    setCardIndex(0);
    setRevealed(false);
  };

  const nextCard = () => {
    if (!studyDeck.length) return;
    setCardIndex((index) => (index + 1) % studyDeck.length);
    setRevealed(false);
  };

  const previousCard = () => {
    if (!studyDeck.length) return;
    setCardIndex((index) => (index - 1 + studyDeck.length) % studyDeck.length);
    setRevealed(false);
  };

  useEffect(() => {
    if (mode !== "flashcards") return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "SELECT" || target?.tagName === "BUTTON") return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        setRevealed((value) => !value);
      } else if (event.key === "ArrowRight") nextCard();
      else if (event.key === "ArrowLeft") previousCard();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, studyDeck.length]);

  const startQuiz = (overrideCards?: StudyCard[]) => {
    ensureSession();
    let pool = overrideCards ?? (quizKind === "category" ? categoryCards : cardPool(quizSection));
    if (!overrideCards && quizSection !== "All Systems" && quizKind === "category") {
      pool = categoryCards.filter((card) => card.section === quizSection);
    }
    if (quizSize === "weak" && !overrideCards) pool = weakCards.length ? weakCards : pool;
    const size = overrideCards ? pool.length : (quizSize === "all" || quizSize === "weak" ? pool.length : Math.min(Number(quizSize), pool.length));
    const cards = shuffled(pool).slice(0, size);
    setQuizQuestions(cards.map((card) => buildQuizQuestion(card, quizKind)));
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswer(null);
    setQuizMissed([]);
    setQuizFinished(false);
  };

  const answerQuiz = (answer: string) => {
    if (quizAnswer !== null || quizFinished) return;
    const question = quizQuestions[quizIndex];
    if (!question) return;
    const correct = answer === question.correct;
    setQuizAnswer(answer);
    setQuizScore((score) => score + (correct ? 1 : 0));
    if (!correct) setQuizMissed((items) => [...items, question]);
    updateCardStats(question.card, correct);
  };

  const advanceQuiz = () => {
    if (quizIndex + 1 >= quizQuestions.length) {
      setQuizFinished(true);
      setQuizAnswer(null);
      return;
    }
    setQuizIndex((index) => index + 1);
    setQuizAnswer(null);
  };

  const chooseDrillCard = (sectionName = drillSection, type = drillType) => {
    const pool = cardPool(sectionName);
    const card = pool[Math.floor(Math.random() * pool.length)] ?? allCards[0];
    setDrillCard(card);
    setDrillInput("");
    setDrillFeedback("idle");
    setBlank(makeBlank(card.meaning));
    setBuilderPool(shuffled(card.acronym.split("")));
    setBuilderAnswer([]);
    if (type === "builder") ensureSession();
  };

  const submitDrill = () => {
    if (drillFeedback !== "idle") return;
    let expected = drillCard.acronym;
    if (drillType === "definition") expected = drillCard.meaning;
    if (drillType === "blank") expected = blank.answer;
    const correct = normalize(drillInput) === normalize(expected);
    setDrillFeedback(correct ? "correct" : "wrong");
    updateCardStats(drillCard, correct);
  };

  const addBuilderLetter = (letter: string, index: number) => {
    if (drillFeedback !== "idle") return;
    const nextPool = [...builderPool];
    nextPool.splice(index, 1);
    const nextAnswer = [...builderAnswer, letter];
    setBuilderPool(nextPool);
    setBuilderAnswer(nextAnswer);
    if (nextAnswer.length === drillCard.acronym.length) {
      const correct = nextAnswer.join("") === drillCard.acronym;
      setDrillFeedback(correct ? "correct" : "wrong");
      updateCardStats(drillCard, correct);
    }
  };

  const removeBuilderLetter = (index: number) => {
    if (drillFeedback !== "idle") return;
    const next = [...builderAnswer];
    const [letter] = next.splice(index, 1);
    setBuilderAnswer(next);
    setBuilderPool((pool) => [...pool, letter]);
  };

  const newMatchRound = (sectionName = matchSection) => {
    ensureSession();
    const raw = cardPool(sectionName);
    const unique = raw.filter((card, index, arr) => arr.findIndex((c) => c.acronym === card.acronym) === index);
    setMatchCards(shuffled(unique).slice(0, Math.min(6, unique.length)));
    setMatchLeft(null);
    setMatchRight(null);
    setMatched(new Set());
    setMatchAttempts(0);
  };

  useEffect(() => {
    if (!matchLeft || !matchRight) return;
    const leftCard = matchCards.find((card) => card.id === matchLeft);
    const rightCard = matchCards.find((card) => card.id === matchRight);
    if (!leftCard || !rightCard) return;
    const correct = leftCard.id === rightCard.id;
    setMatchAttempts((value) => value + 1);
    updateCardStats(leftCard, correct);
    if (correct) {
      setMatched((current) => new Set([...current, leftCard.id]));
      setMatchLeft(null);
      setMatchRight(null);
    } else {
      const timer = window.setTimeout(() => {
        setMatchLeft(null);
        setMatchRight(null);
      }, 450);
      return () => window.clearTimeout(timer);
    }
  }, [matchLeft, matchRight]);

  const nextSpeedQuestion = (sectionName = speedSection) => {
    const pool = cardPool(sectionName);
    const card = pool[Math.floor(Math.random() * pool.length)] ?? allCards[0];
    setSpeedQuestion(buildQuizQuestion(card, "meaning"));
  };

  const startSpeed = () => {
    ensureSession();
    setSpeedTime(speedDuration);
    setSpeedScore(0);
    setSpeedAttempts(0);
    setSpeedRunning(true);
    nextSpeedQuestion();
  };

  const answerSpeed = (answer: string) => {
    if (!speedRunning || !speedQuestion) return;
    const correct = answer === speedQuestion.correct;
    setSpeedAttempts((value) => value + 1);
    if (correct) setSpeedScore((value) => value + 1);
    updateCardStats(speedQuestion.card, correct);
    nextSpeedQuestion();
  };

  useEffect(() => {
    if (!speedRunning) return;
    const timer = window.setInterval(() => {
      setSpeedTime((time) => {
        if (time <= 1) {
          window.clearInterval(timer);
          setSpeedRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [speedRunning]);

  useEffect(() => {
    if (speedRunning || speedTime !== 0) return;
    setProgress((current) => ({ ...current, bestSpeed: Math.max(current.bestSpeed, speedScore) }));
  }, [speedRunning, speedTime, speedScore]);

  const perSectionStats = useMemo(() => sections.map((section) => {
    const cards = allCards.filter((card) => card.section === section.title);
    const stats = cards.reduce((acc, card) => {
      const s = progress.cards[card.id];
      return { attempts: acc.attempts + (s?.attempts ?? 0), correct: acc.correct + (s?.correct ?? 0) };
    }, { attempts: 0, correct: 0 });
    return { title: section.title, ...stats, pct: percent(stats.correct, stats.attempts) };
  }), [progress]);

  const resetProgress = () => {
    if (!window.confirm("Reset all A220 study progress on this device?")) return;
    setProgress(blankProgress);
    sessionStarted.current = false;
  };

  const navItems: Array<[Mode, string]> = [
    ["reference", "Reference"], ["flashcards", "Flashcards"], ["quiz", "Quiz"], ["drills", "Drills"],
    ["match", "Match"], ["speed", "Speed Round"], ["systems", "Systems"], ["progress", "Progress"],
  ];

  const renderDeckSelect = (value: string, onChange: (value: string) => void, includeWeak = false) => (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
      <option>All Systems</option>
      {includeWeak && <option>Needs Work</option>}
      {sections.map((section) => <option key={section.title}>{section.title}</option>)}
    </select>
  );

  return (
    <main className={styles.shell}>
      <section className={styles.card} aria-label="A220 study center">
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>ONETIME LABS / PRIVATE STUDY TOOL</p>
            <h1>A220 Study Center</h1>
            <p className={styles.subtitle}>Reference, drills, quizzes and progress tracking built from the transcribed study notes.</p>
          </div>
          <div className={styles.badge}>A220</div>
        </header>

        <div className={styles.modeBar} role="tablist" aria-label="Study mode">
          {navItems.map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={mode === key}
              className={`${styles.modeButton} ${mode === key ? styles.modeButtonActive : ""}`}
              onClick={() => {
                setMode(key);
                if (key === "match" && !matchCards.length) newMatchRound();
              }}>
              {label}
            </button>
          ))}
        </div>

        {mode === "reference" && <>
          <div className={styles.searchWrap}>
            <input className={styles.search} type="search" placeholder="Search acronym, definition or system…" value={query}
              onChange={(event) => setQuery(event.target.value)} aria-label="Search acronyms" />
          </div>
          <div className={styles.layout}>
            <nav className={styles.menu} aria-label="A220 system categories">
              {visibleSections.map((section) => (
                <button key={section.title} className={`${styles.menuItem} ${currentSection?.title === section.title ? styles.active : ""}`}
                  onClick={() => setActiveSection(section.title)} type="button">
                  <span>{section.title}</span><span className={styles.chevron}>›</span>
                </button>
              ))}
            </nav>
            <section className={styles.content}>
              {currentSection ? <>
                <div className={styles.sectionHeading}>
                  <div><p className={styles.sectionLabel}>SYSTEM</p><h2>{currentSection.title}</h2></div>
                  <span className={styles.count}>{currentSection.items.length} {currentSection.items.length === 1 ? "item" : "items"}</span>
                </div>
                <div className={styles.list}>
                  {currentSection.items.map((item) => (
                    <article className={styles.row} key={`${currentSection.title}-${item.acronym}`}>
                      <div className={styles.acronym}>{item.acronym}</div><div className={styles.dash}>—</div><div className={styles.meaning}>{item.meaning}</div>
                    </article>
                  ))}
                </div>
              </> : <div className={styles.empty}>No matching acronyms found.</div>}
            </section>
          </div>
        </>}

        {mode === "flashcards" && <section className={styles.studyArea}>
          <div className={styles.toolbar}>
            <label className={styles.fieldLabel}><span>Deck</span>{renderDeckSelect(studySection, selectStudySection, true)}</label>
            <label className={styles.toggleLabel}><input type="checkbox" checked={answerFirst} onChange={(e) => { setAnswerFirst(e.target.checked); setRevealed(false); }} /><span>Definition first</span></label>
            <button type="button" className={styles.secondaryButton} onClick={() => { setStudyDeck(shuffled(studyDeck)); setCardIndex(0); setRevealed(false); }}>Shuffle deck</button>
          </div>
          {currentCard ? <>
            <div className={styles.cardMeta}><span>{currentCard.section}</span><span>{cardIndex + 1} / {studyDeck.length}</span></div>
            <button type="button" className={`${styles.flashcard} ${revealed ? styles.flashcardRevealed : ""}`}
              onClick={() => setRevealed((value) => !value)}>
              <div className={styles.flashcardPrompt}>
                <span className={styles.flashcardEyebrow}>{answerFirst ? "WHAT IS THE ACRONYM?" : "WHAT DOES THIS MEAN?"}</span>
                <strong className={answerFirst ? styles.definitionPrompt : styles.acronymPrompt}>{answerFirst ? currentCard.meaning : currentCard.acronym}</strong>
              </div>
              <div className={styles.flashcardDivider} />
              <div className={styles.flashcardAnswer}>{revealed ? <>
                <span className={styles.flashcardEyebrow}>ANSWER</span>
                <strong className={answerFirst ? styles.acronymAnswer : styles.definitionAnswer}>{answerFirst ? currentCard.acronym : currentCard.meaning}</strong>
              </> : <span className={styles.revealHint}>Click card or press Space to reveal</span>}</div>
            </button>
            {revealed && <div className={styles.confidenceRow}>
              <span>How well did you know it?</span>
              <button className={styles.badButton} onClick={() => { updateCardStats(currentCard, undefined, "nope"); nextCard(); }}>Nope</button>
              <button className={styles.midButton} onClick={() => { updateCardStats(currentCard, undefined, "kinda"); nextCard(); }}>Kinda</button>
              <button className={styles.goodButton} onClick={() => { updateCardStats(currentCard, undefined, "got"); nextCard(); }}>Got it</button>
            </div>}
            <div className={styles.controls}><button className={styles.secondaryButton} onClick={previousCard}>← Previous</button><button className={styles.primaryButton} onClick={() => revealed ? nextCard() : setRevealed(true)}>{revealed ? "Next →" : "Reveal answer"}</button></div>
            <p className={styles.keyboardHint}>Keyboard: <kbd>Space</kbd> reveal · <kbd>←</kbd> previous · <kbd>→</kbd> next</p>
          </> : <div className={styles.empty}>No cards in this deck yet. Try All Systems.</div>}
        </section>}

        {mode === "quiz" && <section className={styles.studyArea}>
          {!quizQuestions.length || quizFinished ? <>
            <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>TEST YOURSELF</p><h2>{quizFinished ? "Quiz complete" : "Build a quiz"}</h2></div></div>
            {quizFinished && <div className={styles.resultHero}>
              <strong>{quizScore} / {quizQuestions.length}</strong><span>{percent(quizScore, quizQuestions.length)}%</span>
              <p>{quizMissed.length ? `${quizMissed.length} item${quizMissed.length === 1 ? "" : "s"} to review.` : "Clean sweep."}</p>
            </div>}
            {quizFinished && quizMissed.length > 0 && <div className={styles.reviewBox}>
              <h3>Missed questions</h3>
              {quizMissed.map((q, i) => <div className={styles.reviewRow} key={`${q.card.id}-${i}`}><strong>{q.card.acronym}</strong><span>{q.card.meaning}</span><small>{q.card.section}</small></div>)}
              <button className={styles.secondaryButton} onClick={() => { setQuizSize("all"); startQuiz(quizMissed.map((q) => q.card)); }}>Retry missed only</button>
            </div>}
            <div className={styles.setupGrid}>
              <label className={styles.fieldLabel}><span>Question type</span><select className={styles.select} value={quizKind} onChange={(e) => setQuizKind(e.target.value as QuizKind)}>
                <option value="meaning">Acronym → definition</option><option value="acronym">Definition → acronym</option><option value="category">Category challenge</option><option value="truefalse">True / False</option>
              </select></label>
              <label className={styles.fieldLabel}><span>Deck</span>{renderDeckSelect(quizSection, setQuizSection)}</label>
              <label className={styles.fieldLabel}><span>Length</span><select className={styles.select} value={quizSize} onChange={(e) => setQuizSize(e.target.value)}>
                <option value="10">Random 10</option><option value="25">Random 25</option><option value="all">Full deck</option><option value="weak">Needs Work deck</option>
              </select></label>
            </div>
            <button className={styles.primaryButton} onClick={() => startQuiz()}>{quizFinished ? "Start another quiz" : "Start quiz"}</button>
          </> : <>
            <div className={styles.questionTop}><span>Question {quizIndex + 1} / {quizQuestions.length}</span><strong>{quizScore} correct</strong></div>
            <div className={styles.progressTrack}><span style={{ width: `${((quizIndex + (quizAnswer ? 1 : 0)) / quizQuestions.length) * 100}%` }} /></div>
            <div className={styles.questionCard}>
              <p>{quizQuestions[quizIndex].detail}</p><h2>{quizQuestions[quizIndex].prompt}</h2>
              <div className={styles.optionGrid}>{quizQuestions[quizIndex].options.map((option) => {
                const answered = quizAnswer !== null;
                const isCorrect = option === quizQuestions[quizIndex].correct;
                const isChosen = option === quizAnswer;
                const cls = answered ? (isCorrect ? styles.optionCorrect : isChosen ? styles.optionWrong : "") : "";
                return <button key={option} className={`${styles.optionButton} ${cls}`} disabled={answered} onClick={() => answerQuiz(option)}>{option}</button>;
              })}</div>
              {quizAnswer && <div className={styles.answerBar}>
                <span>{quizAnswer === quizQuestions[quizIndex].correct ? "Correct." : `Correct answer: ${quizQuestions[quizIndex].correct}`}</span>
                <button className={styles.primaryButton} onClick={advanceQuiz}>{quizIndex + 1 === quizQuestions.length ? "See results" : "Next question →"}</button>
              </div>}
            </div>
          </>}
        </section>}

        {mode === "drills" && <section className={styles.studyArea}>
          <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>ACTIVE RECALL</p><h2>Drills</h2></div><span className={styles.count}>Type it. Build it. Fill the blank.</span></div>
          <div className={styles.toolbar}>
            <label className={styles.fieldLabel}><span>Deck</span>{renderDeckSelect(drillSection, (value) => { setDrillSection(value); chooseDrillCard(value); })}</label>
            <label className={styles.fieldLabel}><span>Drill</span><select className={styles.select} value={drillType} onChange={(e) => { const type = e.target.value as typeof drillType; setDrillType(type); chooseDrillCard(drillSection, type); }}>
              <option value="acronym">Definition → acronym</option><option value="definition">Acronym → full definition</option><option value="blank">Fill in the blank</option><option value="builder">Acronym builder</option>
            </select></label>
            <button className={styles.secondaryButton} onClick={() => chooseDrillCard()}>New prompt</button>
          </div>
          <div className={styles.drillCard}>
            <span className={styles.flashcardEyebrow}>{drillCard.section}</span>
            {drillType === "acronym" && <><p>TYPE THE ACRONYM</p><h2>{drillCard.meaning}</h2></>}
            {drillType === "definition" && <><p>TYPE THE FULL DEFINITION</p><h2 className={styles.monoHuge}>{drillCard.acronym}</h2></>}
            {drillType === "blank" && <><p>FILL IN THE MISSING WORD</p><h2>{blank.display}</h2><small>{drillCard.acronym}</small></>}
            {drillType === "builder" && <><p>BUILD THE ACRONYM</p><h2>{drillCard.meaning}</h2>
              <div className={styles.builderAnswer}>{builderAnswer.length ? builderAnswer.map((letter, i) => <button key={`${letter}-${i}`} onClick={() => removeBuilderLetter(i)}>{letter}</button>) : <span>Choose letters below</span>}</div>
              <div className={styles.builderPool}>{builderPool.map((letter, i) => <button key={`${letter}-${i}`} onClick={() => addBuilderLetter(letter, i)}>{letter}</button>)}</div>
            </>}
            {drillType !== "builder" && <form className={styles.drillForm} onSubmit={(e) => { e.preventDefault(); submitDrill(); }}>
              <input className={styles.answerInput} value={drillInput} disabled={drillFeedback !== "idle"} onChange={(e) => setDrillInput(e.target.value)} autoCapitalize="characters" autoComplete="off" placeholder="Type your answer…" />
              <button className={styles.primaryButton} disabled={!drillInput.trim() || drillFeedback !== "idle"}>Check</button>
            </form>}
            {drillFeedback !== "idle" && <div className={`${styles.feedback} ${drillFeedback === "correct" ? styles.feedbackGood : drillFeedback === "wrong" ? styles.feedbackBad : ""}`}>
              <strong>{drillFeedback === "correct" ? "Correct." : drillFeedback === "shown" ? "Answer shown." : "Not quite."}</strong>
              <span>{drillType === "blank" ? blank.answer : drillType === "definition" ? drillCard.meaning : drillCard.acronym}</span>
              <button className={styles.primaryButton} onClick={() => chooseDrillCard()}>Next prompt →</button>
            </div>}
            {drillFeedback === "idle" && <button className={styles.linkButton} onClick={() => { setDrillFeedback("shown"); updateCardStats(drillCard, false); }}>Show answer</button>}
          </div>
        </section>}

        {mode === "match" && <section className={styles.studyArea}>
          <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>PAIR THEM UP</p><h2>Matching Game</h2></div><span className={styles.count}>{matched.size} / {matchCards.length} matched · {matchAttempts} attempts</span></div>
          <div className={styles.toolbar}>
            <label className={styles.fieldLabel}><span>Deck</span>{renderDeckSelect(matchSection, (value) => { setMatchSection(value); newMatchRound(value); })}</label>
            <button className={styles.secondaryButton} onClick={() => newMatchRound()}>New round</button>
          </div>
          {matchCards.length > 0 && <div className={styles.matchGrid}>
            <div className={styles.matchColumn}>{matchCards.map((card) => <button key={`l-${card.id}`} disabled={matched.has(card.id)} className={`${styles.matchButton} ${matchLeft === card.id ? styles.matchSelected : ""} ${matched.has(card.id) ? styles.matchDone : ""}`} onClick={() => setMatchLeft(card.id)}><strong>{card.acronym}</strong></button>)}</div>
            <div className={styles.matchColumn}>{matchMeaningCards.map((card) => <button key={`r-${card.id}`} disabled={matched.has(card.id)} className={`${styles.matchButton} ${matchRight === card.id ? styles.matchSelected : ""} ${matched.has(card.id) ? styles.matchDone : ""}`} onClick={() => setMatchRight(card.id)}><span>{card.meaning}</span></button>)}</div>
          </div>}
          {matchCards.length > 0 && matched.size === matchCards.length && <div className={styles.completedBanner}><strong>Round complete.</strong><span>{matchAttempts} attempts for {matchCards.length} pairs.</span><button className={styles.primaryButton} onClick={() => newMatchRound()}>Play again</button></div>}
        </section>}

        {mode === "speed" && <section className={styles.studyArea}>
          <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>BEAT THE CLOCK</p><h2>Speed Round</h2></div><span className={styles.count}>Best: {progress.bestSpeed} correct</span></div>
          {!speedRunning && speedTime !== 0 && <>
            <div className={styles.setupGrid}>
              <label className={styles.fieldLabel}><span>Deck</span>{renderDeckSelect(speedSection, setSpeedSection)}</label>
              <label className={styles.fieldLabel}><span>Timer</span><select className={styles.select} value={speedDuration} onChange={(e) => { const n = Number(e.target.value); setSpeedDuration(n); setSpeedTime(n); }}><option value={30}>30 seconds</option><option value={60}>60 seconds</option><option value={120}>2 minutes</option></select></label>
            </div>
            <button className={styles.primaryButton} onClick={startSpeed}>Start speed round</button>
          </>}
          {speedRunning && speedQuestion && <>
            <div className={styles.speedHud}><div><small>TIME</small><strong>{speedTime}</strong></div><div><small>CORRECT</small><strong>{speedScore}</strong></div><div><small>ATTEMPTS</small><strong>{speedAttempts}</strong></div></div>
            <div className={styles.questionCard}><p>WHAT DOES THIS MEAN?</p><h2 className={styles.monoHuge}>{speedQuestion.prompt}</h2><div className={styles.optionGrid}>{speedQuestion.options.map((option) => <button key={option} className={styles.optionButton} onClick={() => answerSpeed(option)}>{option}</button>)}</div></div>
          </>}
          {!speedRunning && speedTime === 0 && <div className={styles.resultHero}><strong>{speedScore}</strong><span>correct in {speedDuration} seconds</span><p>{speedAttempts} total attempts · {percent(speedScore, speedAttempts)}% accuracy</p><button className={styles.primaryButton} onClick={startSpeed}>Run it again</button></div>}
        </section>}

        {mode === "systems" && <section className={styles.studyArea}>
          <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>MENTAL MAP</p><h2>System Tree</h2></div><span className={styles.count}>{sections.length} systems · {allCards.length} entries</span></div>
          <div className={styles.systemTree}>{sections.map((section) => {
            const open = openSystems.has(section.title);
            return <article className={styles.systemNode} key={section.title}>
              <button className={styles.systemNodeHead} onClick={() => setOpenSystems((current) => { const next = new Set(current); open ? next.delete(section.title) : next.add(section.title); return next; })}>
                <div><span className={styles.systemDot} /><strong>{section.title}</strong><small>{section.items.length} items</small></div><span>{open ? "−" : "+"}</span>
              </button>
              {open && <div className={styles.systemChildren}>{section.items.map((item) => <div key={`${section.title}-${item.acronym}`}><strong>{item.acronym}</strong><span>{item.meaning}</span></div>)}</div>}
            </article>;
          })}</div>
        </section>}

        {mode === "progress" && <section className={styles.studyArea}>
          <div className={styles.panelHeader}><div><p className={styles.sectionLabel}>LOCAL TO THIS DEVICE</p><h2>Progress</h2></div><button className={styles.linkButton} onClick={resetProgress}>Reset progress</button></div>
          <div className={styles.statGrid}>
            <div className={styles.statCard}><small>SESSIONS</small><strong>{progress.sessions}</strong></div>
            <div className={styles.statCard}><small>QUIZ / DRILL ANSWERS</small><strong>{progress.answered}</strong></div>
            <div className={styles.statCard}><small>ACCURACY</small><strong>{percent(progress.correct, progress.answered)}%</strong></div>
            <div className={styles.statCard}><small>SPEED BEST</small><strong>{progress.bestSpeed}</strong></div>
          </div>
          <div className={styles.progressColumns}>
            <div className={styles.progressPanel}><h3>By system</h3>{perSectionStats.map((item) => <div className={styles.systemStat} key={item.title}><div><span>{item.title}</span><small>{item.attempts ? `${item.correct}/${item.attempts}` : "Not tested"}</small></div><div className={styles.miniTrack}><span style={{ width: `${item.pct}%` }} /></div><strong>{item.attempts ? `${item.pct}%` : "—"}</strong></div>)}</div>
            <div className={styles.progressPanel}><h3>Needs work</h3>{weakCards.length ? weakCards.slice(0, 12).map((card) => { const stats = progress.cards[card.id]; return <div className={styles.weakRow} key={card.id}><div><strong>{card.acronym}</strong><span>{card.meaning}</span></div><small>{card.section}<br />{stats?.missed ?? 0} miss{(stats?.missed ?? 0) === 1 ? "" : "es"}</small></div>; }) : <p className={styles.empty}>Nothing has been flagged yet. Use the quizzes, drills or confidence buttons and this list will build itself.</p>}</div>
          </div>
        </section>}

        <footer className={styles.footer}><span>OneTime Labs</span><span>Unofficial study reference • Verify against approved training material • Not for operational use</span></footer>
      </section>
    </main>
  );
}
