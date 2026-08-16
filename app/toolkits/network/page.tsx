import {
  ArrowLeft,
  ExternalLink,
  Network,
  Router,
} from "lucide-react";

import {
  networkTools,
} from "../../../lib/network/tools";

import "./network.css";


// ==========================================================
// NETWORK TOOLKIT 001 — TOOL LIBRARY PAGE
// ==========================================================

export default function NetworkToolkitPage() {
  return (
    <main className="network-shell">
      <section className="network-panel">

        {/* ==================================================
            HEADER 002 — MODULE IDENTIFICATION
            ================================================== */}

        <header className="network-header">
          <div>
            <span className="network-kicker">
              ONETIME LABS // TOOLKIT MODULE
            </span>

            <h1>
              <Network size={20} />
              NETWORK TOOLKIT
            </h1>

            <p>
              IP addressing, network planning, packet,
              service, and performance utilities.
            </p>
          </div>

          <a
            href="/"
            className="network-back"
          >
            <ArrowLeft size={14} />
            PRODUCT DECK
          </a>
        </header>


        {/* ==================================================
            DISPLAY 003 — LIBRARY STATUS
            ================================================== */}

        <div className="network-display">
          <div>
            <span>INSTRUMENT LIBRARY</span>
            <strong>SELECT A TOOL</strong>
          </div>

          <div>
            <span>MODULES</span>
            <strong>
              {String(networkTools.length).padStart(2, "0")} ONLINE
            </strong>
          </div>
        </div>


        {/* ==================================================
            TOOL GRID 004 — NETWORK INSTRUMENT BUTTONS
            ================================================== */}

        <section className="network-grid">
          {networkTools.map((tool, index) => (
            <div
              className="network-well"
              key={tool.slug}
            >
              <a
                className={
                  `network-key network-key--${tool.accent}`
                }
                href={`/toolkits/network/${tool.slug}`}
              >
                <div className="network-key__top">
                  <span>
                    <i />
                    {tool.category}
                  </span>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="network-key__body">
                  <Router size={24} />

                  <div>
                    <strong>
                      {tool.name}
                    </strong>

                    <p>
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="network-key__open">
                  OPEN INSTRUMENT
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
