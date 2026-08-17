"use client";

import {
  BookOpenText,
  ChevronDown,
  Code2,
  Gauge,
  KeyRound,
  MailSearch,
  Power,
  Radio,
  Wrench,
} from "lucide-react";

import {
  useState,
} from "react";

import HomeInquiryForm from "./HomeInquiryForm";

import "./page.css";


// ==========================================================
// HEADER 001 — EXISTING PRODUCT DESTINATIONS
// ==========================================================

const toolkitItems = [
  { name: "ARCADE", category: "GAMING", description: "Games, puzzles, reflex tests, and interactive experiments.", href: "/arcade" },
  { name: "METROLOGY", category: "MEASUREMENT", description: "Calibration, tolerance, uncertainty, conversion, and measurement tools.", href: "/toolkits/metrology" },
  { name: "NETWORK", category: "NETWORKING", description: "IP addressing, subnetting, performance, and network reference tools.", href: "/toolkits/network" },
  { name: "METRONOME", category: "TIMING", description: "Browser-based tempo and timing utility.", href: "/toolkits/metronome" },
  { name: "IT OPERATIONS", category: "SYSTEMS", description: "Operational utilities for infrastructure and support.", href: "/toolkits/it-operations" },
  { name: "HVAC FIELD", category: "FACILITIES", description: "Field utilities for HVAC and maintenance work.", href: "/toolkits/hvac-field" },
] as const;


// ==========================================================
// PAGE 002 — ONE TIME LABS MAIN SITE
// ==========================================================

export default function Home() {

  const [
    toolkitsOpen,
    setToolkitsOpen,
  ] = useState(false);

  return (
    <main className="site-shell">

      <section
        className="control-panel"
        aria-label="OneTime Labs"
      >
        <div className="panel-screw panel-screw--tl" />
        <div className="panel-screw panel-screw--tr" />
        <div className="panel-screw panel-screw--bl" />
        <div className="panel-screw panel-screw--br" />


        {/* ==================================================
            HEADER 003 — BRAND
            ================================================== */}

        <header className="panel-header">
          <div className="brand-block">
            <div className="brand-block__title-row">
              <Power
                className="brand-block__mark"
                size={18}
                strokeWidth={2}
                aria-hidden="true"
              />

              <h1>OneTime Labs</h1>

              <span className="header-online">
                <span className="header-online__led" />
                ONLINE
              </span>
            </div>

            <p>
              CUSTOM SOFTWARE + ENGINEERING TOOLS
            </p>
          </div>

          <div className="panel-id">
            <span>OTL // PRODUCT SYSTEM</span>
            <strong>DECK-01</strong>
          </div>
        </header>


        {/* ==================================================
            CUSTOM DEVELOPMENT 004 — WHAT WE DO
            ================================================== */}

        <section className="development-strip">
          <div className="development-strip__copy">
            <span className="development-strip__eyebrow">
              CUSTOM DEVELOPMENT
            </span>

            <h2>
              We build software for companies.
            </h2>

            <p>
              OneTime Labs designs and builds custom web
              applications, internal tools, workflow systems,
              dashboards, automation, documentation platforms,
              and purpose-built business software around the
              way your organization actually works.
            </p>
          </div>

          <div className="development-strip__actions">
            <a
              className="development-button development-button--primary"
              href="/custom-development/contact"
            >
              <Code2
                size={15}
                strokeWidth={1.8}
              />
              Discuss a Project
            </a>

            <a
              className="development-button"
              href="mailto:inquiry@onetimelabs.net"
            >
              inquiry@onetimelabs.net
            </a>
          </div>
        </section>

        <section className="home-inquiry-panel" aria-label="Project inquiry form">
          <div className="home-inquiry-panel__heading">
            <span>START A PROJECT</span>
            <strong>Tell me what needs fixing.</strong>
            <p>You do not need a finished specification. Describe the current process and what you wish happened instead.</p>
          </div>
          <HomeInquiryForm />
        </section>


        {/* ==================================================
            DISPLAY 005 — PRODUCT DECK
            ================================================== */}

        <section className="deck-display">
          <div className="deck-display__screen">
            <div className="screen-scanline" />

            <div>
              <span className="screen-label">
                PRODUCT DECK
              </span>

              <strong>
                {toolkitsOpen
                  ? "TOOLKIT MENU OPEN"
                  : "SELECT A PRODUCT"}
              </strong>
            </div>

            <div className="screen-right">
              <span>MODE</span>
              <strong>OWNERSHIP</strong>
            </div>
          </div>

          <div
            className="deck-display__indicators"
            aria-hidden="true"
          >
            <span className="indicator indicator--active" />
            <span className="indicator indicator--active" />
            <span className="indicator indicator--active" />
            <span className="indicator" />
          </div>
        </section>


        {/* ==================================================
            PRIMARY 006 — OTLES > MAIL PARSER > TOOLKITS
            ================================================== */}

        <section
          className="product-grid product-grid--primary"
          aria-label="Primary products"
        >
          <div className="product-well product-well--primary">
            <a
              className="product-key product-key--cyan"
              href="https://otles.onetimelabs.net"
            >
              <div className="product-key__topline">
                <span className="product-key__status">
                  <span className="status-led status-led--cyan" />
                  ONLINE
                </span>
                <span className="product-key__open">
                  OPEN ↗
                </span>
              </div>

              <div className="product-key__center">
                <BookOpenText
                  className="product-key__icon"
                  strokeWidth={1.65}
                />
                <div>
                  <strong className="product-key__name">
                    OTLES
                  </strong>
                  <span className="product-key__category">
                    DOCUMENTATION
                  </span>
                </div>
              </div>

              <span className="product-key__description">
                Technical documentation platform
              </span>
            </a>
          </div>


          <div className="product-well product-well--primary">
            <a
              className="product-key product-key--violet"
              href="/mail-parser"
            >
              <div className="product-key__topline">
                <span className="product-key__status">
                  <span className="status-led status-led--violet" />
                  ONLINE
                </span>
                <span className="product-key__open">
                  OPEN ↗
                </span>
              </div>

              <div className="product-key__center">
                <MailSearch
                  className="product-key__icon"
                  strokeWidth={1.65}
                />
                <div>
                  <strong className="product-key__name">
                    MAIL PARSER
                  </strong>
                  <span className="product-key__category">
                    COPY + PASTE EMAIL
                  </span>
                </div>
              </div>

              <span className="product-key__description">
                Copy the full email. Paste it in. Parse the details.
              </span>
            </a>
          </div>


          <div className="product-well product-well--primary">
            <button
              className="product-key product-key--green product-key--button"
              type="button"
              onClick={() => {
                setToolkitsOpen(
                  current => !current,
                );
              }}
              aria-expanded={toolkitsOpen}
              aria-controls="toolkits-menu"
            >
              <div className="product-key__topline">
                <span className="product-key__status">
                  <span className="status-led status-led--green" />
                  ONLINE
                </span>

                <span className="product-key__open">
                  {toolkitsOpen
                    ? "CLOSE"
                    : "BROWSE"}

                  <ChevronDown
                    className={
                      toolkitsOpen
                        ? "toolkits-chevron toolkits-chevron--open"
                        : "toolkits-chevron"
                    }
                    size={12}
                    strokeWidth={1.9}
                  />
                </span>
              </div>

              <div className="product-key__center">
                <Wrench
                  className="product-key__icon"
                  strokeWidth={1.65}
                />
                <div>
                  <strong className="product-key__name">
                    TOOLKITS
                  </strong>
                  <span className="product-key__category">
                    UTILITIES + EXPERIMENTS
                  </span>
                </div>
              </div>

              <span className="product-key__description">
                Browse OneTime Labs utilities and tools
              </span>
            </button>
          </div>
        </section>


        {/* ==================================================
            TOOLKIT MENU 007 — EXISTING TOOLKITS SITE
            ================================================== */}

        {toolkitsOpen && (
          <section
            id="toolkits-menu"
            className="toolkits-menu"
            aria-label="Toolkit menu"
          >
            <div className="toolkits-menu__header">
              <div>
                <span>TOOLKITS // AVAILABLE TOOLS</span>
                <strong>SELECT A TOOL</strong>
              </div>

              <a
                href="/toolkits"
                className="toolkits-menu__all"
              >
                OPEN TOOLKITS →
              </a>
            </div>

            <div className="toolkits-menu__grid">
              {toolkitItems.map(
                toolkit => (
                  <a
                    key={toolkit.name}
                    className="toolkits-menu__item"
                    href={toolkit.href}
                  >
                    <span>
                      {toolkit.category}
                    </span>

                    <strong>
                      {toolkit.name}
                    </strong>

                    <p>
                      {toolkit.description}
                    </p>

                    <small>
                      OPEN →
                    </small>
                  </a>
                ),
              )}
            </div>
          </section>
        )}


        {/* ==================================================
            SECONDARY 008 — EXISTING LICENSING PRODUCT
            ================================================== */}

        <section className="secondary-strip">
          <a
            className="secondary-product"
            href="https://licensing.onetimelabs.net"
          >
            <KeyRound
              size={16}
              strokeWidth={1.7}
            />
            <div>
              <span>SOFTWARE LICENSING</span>
              <strong>LICENSING PLATFORM</strong>
            </div>
            <small>OPEN ↗</small>
          </a>
        </section>


        {/* ==================================================
            STATUS 009 — SYSTEM TELEMETRY
            ================================================== */}

        <footer className="status-bar">
          <div className="status-bar__item">
            <Gauge
              size={14}
              strokeWidth={1.8}
            />
            <span>SYSTEM</span>
            <strong>NOMINAL</strong>
          </div>

          <div className="status-bar__item">
            <Radio
              size={14}
              strokeWidth={1.8}
            />
            <span>PRODUCTS</span>
            <strong>ONLINE</strong>
          </div>

          <p className="status-bar__motto">
            ONE TIME. YOUR SOFTWARE.
          </p>
        </footer>
      </section>
    </main>
  );
}
