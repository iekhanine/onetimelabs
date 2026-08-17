import {
  ArrowLeft,
  ExternalLink,
  Gamepad2,
  Joystick,
} from "lucide-react";

import {
  arcadeGames,
} from "../lib/arcade/games";

import "./arcade.css";


// ==========================================================
// ARCADE 001 — PROGRAM LIBRARY
// ==========================================================

export default function ArcadePage() {
  return (
    <main className="arcade-shell">
      <section className="arcade-panel">

        {/* ==================================================
            HEADER 002 — ARCADE IDENTIFICATION
            ================================================== */}

        <header className="arcade-header">
          <div>
            <span className="arcade-kicker">
              ONETIME LABS // ENTERTAINMENT MODULE
            </span>

            <h1>
              <Gamepad2 size={20} />
              OTL ARCADE
            </h1>

            <p>
              Games, puzzles, reflex tests, and questionable
              uses of engineering hardware.
            </p>
          </div>

          <a
            href="/"
            className="arcade-back"
          >
            <ArrowLeft size={14} />
            PRODUCT DECK
          </a>
        </header>


        {/* ==================================================
            DISPLAY 003 — PROGRAM STATUS
            ================================================== */}

        <div className="arcade-display">
          <div>
            <span>PROGRAM LIBRARY</span>
            <strong>SELECT A PROGRAM</strong>
          </div>

          <div>
            <span>PROGRAMS</span>
            <strong>
              {String(arcadeGames.length).padStart(2, "0")} ONLINE
            </strong>
          </div>
        </div>


        {/* ==================================================
            PROGRAM GRID 004 — GAME BUTTONS
            ================================================== */}

        <section className="arcade-grid">
          {arcadeGames.map((game, index) => (
            <div
              className="arcade-well"
              key={game.slug}
            >
              <a
                className={`arcade-key arcade-key--${game.accent}`}
                href={`/arcade/${game.slug}`}
              >
                <div className="arcade-key__top">
                  <span>
                    <i />
                    {game.category}
                  </span>

                  <span>
                    PRG-{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="arcade-key__body">
                  <Joystick size={25} />

                  <div>
                    <strong>
                      {game.name}
                    </strong>

                    <p>
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="arcade-key__open">
                  RUN PROGRAM
                  <ExternalLink size={11} />
                </div>
              </a>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
