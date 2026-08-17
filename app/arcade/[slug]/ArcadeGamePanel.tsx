"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Gamepad2,
  RotateCcw,
} from "lucide-react";

import type {
  ArcadeGame,
} from "../../../lib/arcade/games";


// ==========================================================
// GAME ENGINE 001 — SHARED TYPES
// ==========================================================

type Point = {
  x: number;
  y: number;
};


// ==========================================================
// GAME ENGINE 002 — SNAKE
// ==========================================================

function SnakeGame() {
  const size = 14;

  const [
    snake,
    setSnake,
  ] = useState<Point[]>([
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]);

  const [
    food,
    setFood,
  ] = useState<Point>({
    x: 10,
    y: 7,
  });

  const [
    direction,
    setDirection,
  ] = useState<Point>({
    x: 1,
    y: 0,
  });

  const directionRef =
    useRef(direction);

  const [
    running,
    setRunning,
  ] = useState(false);

  const [
    gameOver,
    setGameOver,
  ] = useState(false);

  const reset =
    useCallback(() => {
      setSnake([
        { x: 6, y: 7 },
        { x: 5, y: 7 },
        { x: 4, y: 7 },
      ]);

      setFood({
        x: 10,
        y: 7,
      });

      const next = {
        x: 1,
        y: 0,
      };

      directionRef.current = next;
      setDirection(next);
      setRunning(false);
      setGameOver(false);
    }, []);

  const turn =
    useCallback(
      (next: Point) => {
        const current =
          directionRef.current;

        if (
          current.x + next.x === 0 &&
          current.y + next.y === 0
        ) {
          return;
        }

        directionRef.current = next;
        setDirection(next);
        setRunning(true);
      },
      [],
    );

  useEffect(() => {
    const onKey =
      (event: KeyboardEvent) => {
        const key =
          event.key.toLowerCase();

        if (key === "arrowup" || key === "w") {
          event.preventDefault();
          turn({ x: 0, y: -1 });
        }

        if (key === "arrowdown" || key === "s") {
          event.preventDefault();
          turn({ x: 0, y: 1 });
        }

        if (key === "arrowleft" || key === "a") {
          event.preventDefault();
          turn({ x: -1, y: 0 });
        }

        if (key === "arrowright" || key === "d") {
          event.preventDefault();
          turn({ x: 1, y: 0 });
        }
      };

    window.addEventListener("keydown", onKey);

    return () =>
      window.removeEventListener("keydown", onKey);
  }, [turn]);

  useEffect(() => {
    if (!running || gameOver) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setSnake((current) => {
          const head =
            current[0];

          const dir =
            directionRef.current;

          const next = {
            x: head.x + dir.x,
            y: head.y + dir.y,
          };

          const collision =
            next.x < 0 ||
            next.y < 0 ||
            next.x >= size ||
            next.y >= size ||
            current.some(
              (part) =>
                part.x === next.x &&
                part.y === next.y,
            );

          if (collision) {
            setGameOver(true);
            setRunning(false);
            return current;
          }

          const ate =
            next.x === food.x &&
            next.y === food.y;

          const updated = [
            next,
            ...current,
          ];

          if (!ate) {
            updated.pop();
          }
          else {
            setFood(() => {
              for (let tries = 0; tries < 100; tries++) {
                const candidate = {
                  x: Math.floor(Math.random() * size),
                  y: Math.floor(Math.random() * size),
                };

                if (
                  !updated.some(
                    (part) =>
                      part.x === candidate.x &&
                      part.y === candidate.y,
                  )
                ) {
                  return candidate;
                }
              }

              return { x: 1, y: 1 };
            });
          }

          return updated;
        });
      }, 150);

    return () =>
      window.clearInterval(timer);
  }, [running, gameOver, food]);

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>SCORE</span>
        <strong>{snake.length - 3}</strong>

        <span>STATUS</span>
        <strong>
          {gameOver
            ? "FAULT"
            : running
              ? "RUNNING"
              : "STANDBY"}
        </strong>
      </div>

      <div
        className="snake-board"
        style={{
          gridTemplateColumns:
            `repeat(${size}, 1fr)`,
        }}
      >
        {Array.from({
          length: size * size,
        }).map((_, index) => {
          const x =
            index % size;

          const y =
            Math.floor(index / size);

          const isSnake =
            snake.some(
              (part) =>
                part.x === x &&
                part.y === y,
            );

          const isFood =
            food.x === x &&
            food.y === y;

          return (
            <i
              key={index}
              className={
                isSnake
                  ? "snake-cell snake-cell--active"
                  : isFood
                    ? "snake-cell snake-cell--food"
                    : "snake-cell"
              }
            />
          );
        })}
      </div>

      <div className="direction-pad">
        <button
          onClick={() => turn({ x: 0, y: -1 })}
          aria-label="Up"
        >
          ▲
        </button>

        <div>
          <button
            onClick={() => turn({ x: -1, y: 0 })}
            aria-label="Left"
          >
            ◀
          </button>

          <button
            onClick={reset}
            aria-label="Reset"
          >
            ●
          </button>

          <button
            onClick={() => turn({ x: 1, y: 0 })}
            aria-label="Right"
          >
            ▶
          </button>
        </div>

        <button
          onClick={() => turn({ x: 0, y: 1 })}
          aria-label="Down"
        >
          ▼
        </button>
      </div>
    </div>
  );
}


// ==========================================================
// GAME ENGINE 003 — MINES
// ==========================================================

type MineCell = {
  mine: boolean;
  open: boolean;
  flagged: boolean;
};

function createMineBoard(): MineCell[] {
  const cells =
    Array.from(
      { length: 81 },
      () => ({
        mine: false,
        open: false,
        flagged: false,
      }),
    );

  const positions =
    new Set<number>();

  while (positions.size < 10) {
    positions.add(
      Math.floor(Math.random() * 81),
    );
  }

  positions.forEach(
    (index) => {
      cells[index].mine = true;
    },
  );

  return cells;
}

function MinesGame() {
  const [
    board,
    setBoard,
  ] = useState<MineCell[]>(
    () => createMineBoard(),
  );

  const [
    lost,
    setLost,
  ] = useState(false);

  const neighbors =
    (index: number) => {
      const x = index % 9;
      const y = Math.floor(index / 9);

      const result: number[] = [];

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) {
            continue;
          }

          const nx = x + dx;
          const ny = y + dy;

          if (
            nx >= 0 &&
            nx < 9 &&
            ny >= 0 &&
            ny < 9
          ) {
            result.push(ny * 9 + nx);
          }
        }
      }

      return result;
    };

  const openCell =
    (index: number) => {
      if (
        lost ||
        board[index].flagged ||
        board[index].open
      ) {
        return;
      }

      const next =
        board.map(
          (cell) => ({ ...cell }),
        );

      if (next[index].mine) {
        next.forEach(
          (cell) => {
            if (cell.mine) {
              cell.open = true;
            }
          },
        );

        setBoard(next);
        setLost(true);
        return;
      }

      const queue = [index];
      const visited =
        new Set<number>();

      while (queue.length) {
        const current =
          queue.shift()!;

        if (visited.has(current)) {
          continue;
        }

        visited.add(current);
        next[current].open = true;

        const count =
          neighbors(current)
            .filter(
              (n) => next[n].mine,
            )
            .length;

        if (count === 0) {
          neighbors(current)
            .filter(
              (n) =>
                !next[n].mine &&
                !next[n].flagged,
            )
            .forEach(
              (n) => queue.push(n),
            );
        }
      }

      setBoard(next);
    };

  const flagCell =
    (
      event: React.MouseEvent,
      index: number,
    ) => {
      event.preventDefault();

      if (
        lost ||
        board[index].open
      ) {
        return;
      }

      setBoard(
        board.map(
          (cell, i) =>
            i === index
              ? {
                  ...cell,
                  flagged: !cell.flagged,
                }
              : cell,
        ),
      );
    };

  const won =
    board.filter(
      (cell) =>
        !cell.mine &&
        cell.open,
    ).length === 71;

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>MINES</span>
        <strong>10</strong>

        <span>STATUS</span>
        <strong>
          {lost
            ? "FAULT"
            : won
              ? "CLEAR"
              : "ACTIVE"}
        </strong>
      </div>

      <div className="mine-board">
        {board.map(
          (cell, index) => {
            const count =
              neighbors(index)
                .filter(
                  (n) => board[n].mine,
                )
                .length;

            return (
              <button
                key={index}
                className={
                  cell.open
                    ? cell.mine
                      ? "mine-cell mine-cell--mine"
                      : "mine-cell mine-cell--open"
                    : "mine-cell"
                }
                onClick={() => openCell(index)}
                onContextMenu={
                  (event) =>
                    flagCell(event, index)
                }
              >
                {cell.open
                  ? cell.mine
                    ? "×"
                    : count || ""
                  : cell.flagged
                    ? "⚑"
                    : ""}
              </button>
            );
          },
        )}
      </div>

      <button
        className="game-action"
        onClick={() => {
          setBoard(createMineBoard());
          setLost(false);
        }}
      >
        <RotateCcw size={12} />
        NEW FIELD
      </button>
    </div>
  );
}


// ==========================================================
// GAME ENGINE 004 — MEMORY GRID
// ==========================================================

function MemoryGridGame() {
  const [
    sequence,
    setSequence,
  ] = useState<number[]>([]);

  const [
    input,
    setInput,
  ] = useState<number[]>([]);

  const [
    lit,
    setLit,
  ] = useState<number | null>(null);

  const [
    status,
    setStatus,
  ] = useState("STANDBY");

  const play =
    useCallback(
      async (values: number[]) => {
        setStatus("PLAYBACK");
        setInput([]);

        for (const value of values) {
          await new Promise(
            (resolve) =>
              setTimeout(resolve, 220),
          );

          setLit(value);

          await new Promise(
            (resolve) =>
              setTimeout(resolve, 330),
          );

          setLit(null);
        }

        setStatus("INPUT");
      },
      [],
    );

  const start =
    () => {
      const first = [
        Math.floor(Math.random() * 9),
      ];

      setSequence(first);
      play(first);
    };

  const press =
    (index: number) => {
      if (status !== "INPUT") {
        return;
      }

      setLit(index);

      window.setTimeout(
        () => setLit(null),
        120,
      );

      const next = [
        ...input,
        index,
      ];

      setInput(next);

      const expected =
        sequence[next.length - 1];

      if (expected !== index) {
        setStatus("FAULT");
        return;
      }

      if (next.length === sequence.length) {
        const expanded = [
          ...sequence,
          Math.floor(Math.random() * 9),
        ];

        setSequence(expanded);

        window.setTimeout(
          () => play(expanded),
          650,
        );
      }
    };

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>LEVEL</span>
        <strong>{sequence.length}</strong>

        <span>STATUS</span>
        <strong>{status}</strong>
      </div>

      <div className="memory-board">
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <button
            key={index}
            className={
              lit === index
                ? "memory-cell memory-cell--lit"
                : "memory-cell"
            }
            onClick={() => press(index)}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>

      <button
        className="game-action"
        onClick={start}
      >
        START SEQUENCE
      </button>
    </div>
  );
}


// ==========================================================
// GAME ENGINE 005 — LIGHTS OUT
// ==========================================================

function LightsOutGame() {
  const makeBoard =
    () =>
      Array.from(
        { length: 25 },
        () => Math.random() > 0.5,
      );

  const [
    lights,
    setLights,
  ] = useState<boolean[]>(
    () => makeBoard(),
  );

  const [
    moves,
    setMoves,
  ] = useState(0);

  const toggle =
    (index: number) => {
      const x = index % 5;
      const y = Math.floor(index / 5);

      const affected = [
        [x, y],
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];

      setLights(
        lights.map(
          (value, i) => {
            const ix = i % 5;
            const iy = Math.floor(i / 5);

            return affected.some(
              ([ax, ay]) =>
                ax === ix &&
                ay === iy,
            )
              ? !value
              : value;
          },
        ),
      );

      setMoves(moves + 1);
    };

  const clear =
    lights.every(
      (light) => !light,
    );

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>MOVES</span>
        <strong>{moves}</strong>

        <span>STATUS</span>
        <strong>
          {clear ? "DARK" : "ACTIVE"}
        </strong>
      </div>

      <div className="lights-board">
        {lights.map(
          (light, index) => (
            <button
              key={index}
              className={
                light
                  ? "light-cell light-cell--on"
                  : "light-cell"
              }
              onClick={() => toggle(index)}
            />
          ),
        )}
      </div>

      <button
        className="game-action"
        onClick={() => {
          setLights(makeBoard());
          setMoves(0);
        }}
      >
        <RotateCcw size={12} />
        RANDOMIZE
      </button>
    </div>
  );
}


// ==========================================================
// GAME ENGINE 006 — CIRCUIT TRACE
// ==========================================================

type CircuitTile = {
  type: "straight" | "corner";
  rotation: number;
};

const solvedCircuit: CircuitTile[] = [
  { type: "corner", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "corner", rotation: 2 },

  { type: "corner", rotation: 0 },
  { type: "straight", rotation: 1 },
  { type: "corner", rotation: 2 },
  { type: "corner", rotation: 1 },
  { type: "corner", rotation: 3 },

  { type: "corner", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "corner", rotation: 3 },
  { type: "corner", rotation: 0 },
  { type: "corner", rotation: 2 },

  { type: "corner", rotation: 0 },
  { type: "straight", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "straight", rotation: 1 },
  { type: "corner", rotation: 3 },
];

function randomCircuit() {
  return solvedCircuit.map(
    (tile) => ({
      ...tile,
      rotation:
        Math.floor(Math.random() * 4),
    }),
  );
}

function CircuitTraceGame() {
  const [
    tiles,
    setTiles,
  ] = useState<CircuitTile[]>(
    () => randomCircuit(),
  );

  const [
    moves,
    setMoves,
  ] = useState(0);

  const solved =
    tiles.every(
      (tile, index) =>
        tile.rotation ===
        solvedCircuit[index].rotation,
    );

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>ROTATIONS</span>
        <strong>{moves}</strong>

        <span>PATH</span>
        <strong>
          {solved ? "COMPLETE" : "OPEN"}
        </strong>
      </div>

      <div className="circuit-board">
        {tiles.map(
          (tile, index) => (
            <button
              key={index}
              className={
                solved
                  ? "circuit-cell circuit-cell--solved"
                  : "circuit-cell"
              }
              onClick={() => {
                setTiles(
                  tiles.map(
                    (current, i) =>
                      i === index
                        ? {
                            ...current,
                            rotation:
                              (current.rotation + 1) % 4,
                          }
                        : current,
                  ),
                );

                setMoves(moves + 1);
              }}
            >
              <i
                className={
                  tile.type === "straight"
                    ? "trace trace--straight"
                    : "trace trace--corner"
                }
                style={{
                  transform:
                    `rotate(${tile.rotation * 90}deg)`,
                }}
              />
            </button>
          ),
        )}
      </div>

      <button
        className="game-action"
        onClick={() => {
          setTiles(randomCircuit());
          setMoves(0);
        }}
      >
        <RotateCcw size={12} />
        SCRAMBLE
      </button>
    </div>
  );
}


// ==========================================================
// GAME ENGINE 007 — REACTION TEST
// ==========================================================

function ReactionGame() {
  const [
    state,
    setState,
  ] = useState<
    "idle" | "waiting" | "go" | "early" | "done"
  >("idle");

  const [
    result,
    setResult,
  ] = useState<number | null>(null);

  const startRef =
    useRef(0);

  const timerRef =
    useRef<number | null>(null);

  const begin =
    () => {
      setResult(null);
      setState("waiting");

      timerRef.current =
        window.setTimeout(
          () => {
            startRef.current =
              performance.now();

            setState("go");
          },
          1200 + Math.random() * 2800,
        );
    };

  const hit =
    () => {
      if (state === "waiting") {
        if (timerRef.current) {
          window.clearTimeout(
            timerRef.current,
          );
        }

        setState("early");
        return;
      }

      if (state === "go") {
        const elapsed =
          performance.now() -
          startRef.current;

        setResult(
          Math.round(elapsed),
        );

        setState("done");
      }
    };

  useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearTimeout(
          timerRef.current,
        );
      }
    },
    [],
  );

  return (
    <div className="game-stack">
      <div className="game-readout">
        <span>RESULT</span>
        <strong>
          {result !== null
            ? `${result} ms`
            : "—"}
        </strong>

        <span>STATUS</span>
        <strong>{state.toUpperCase()}</strong>
      </div>

      <button
        className={
          state === "go"
            ? "reaction-pad reaction-pad--go"
            : state === "early"
              ? "reaction-pad reaction-pad--fault"
              : "reaction-pad"
        }
        onClick={hit}
        disabled={
          state === "idle" ||
          state === "done" ||
          state === "early"
        }
      >
        <span>
          {state === "go"
            ? "HIT NOW"
            : state === "waiting"
              ? "WAIT..."
              : state === "early"
                ? "TOO EARLY"
                : state === "done"
                  ? "COMPLETE"
                  : "STANDBY"}
        </span>
      </button>

      <button
        className="game-action"
        onClick={begin}
        disabled={
          state === "waiting" ||
          state === "go"
        }
      >
        ARM TEST
      </button>
    </div>
  );
}


// ==========================================================
// GAME PANEL 008 — PROGRAM ROUTER
// ==========================================================

function Game({
  slug,
}: {
  slug: string;
}) {
  switch (slug) {
    case "snake":
      return <SnakeGame />;

    case "mines":
      return <MinesGame />;

    case "memory-grid":
      return <MemoryGridGame />;

    case "lights-out":
      return <LightsOutGame />;

    case "circuit-trace":
      return <CircuitTraceGame />;

    case "reaction-test":
      return <ReactionGame />;

    default:
      return null;
  }
}


// ==========================================================
// GAME PANEL 009 — HARDWARE PROGRAM ENCLOSURE
// ==========================================================

export default function ArcadeGamePanel({
  game,
}: {
  game: ArcadeGame;
}) {
  return (
    <main className="game-shell">
      <section className="game-panel">

        <header className="game-header">
          <div>
            <span>
              OTL ARCADE // {game.category}
            </span>

            <h1>
              <Gamepad2 size={19} />
              {game.name}
            </h1>

            <p>
              {game.description}
            </p>
          </div>

          <a href="/arcade">
            <ArrowLeft size={13} />
            PROGRAM LIBRARY
          </a>
        </header>

        <div className="game-display">
          <span>PROGRAM STATUS</span>
          <strong>LOADED // READY</strong>
        </div>

        <section className="game-instrument">
          <Game slug={game.slug} />
        </section>
      </section>
    </main>
  );
}
