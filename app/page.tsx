"use client";

import {
  ArrowRight,
  BookOpen,
  Boxes,
  Building2,
  Check,
  Code2,
  Menu,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

import "./page.css";

/* ==========================================================
   APP 001
   OneTime Labs corporate website
   ========================================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      {/* =====================================================
          HEADER 002
          ===================================================== */}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="OneTime Labs home">
          <span className="brand-mark">OTL</span>
          <span className="brand-name">OneTime Labs</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="/custom-development">Custom Development</a>
          <a href="#solutions">Solutions</a>
          <a href="#company">Company</a>
          <a href="#documentation">Documentation</a>
        </nav>

        <a className="header-cta desktop-cta" href="/custom-development">
          Build Something
          <ArrowRight size={15} />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#products" onClick={() => setMenuOpen(false)}>
              Products
            </a>
            <a href="/custom-development" onClick={() => setMenuOpen(false)}>
              Custom Development
            </a>
            <a href="#solutions" onClick={() => setMenuOpen(false)}>
              Solutions
            </a>
            <a href="#company" onClick={() => setMenuOpen(false)}>
              Company
            </a>
            <a href="#documentation" onClick={() => setMenuOpen(false)}>
              Documentation
            </a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* ===================================================
            HERO 003
            =================================================== */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">INDEPENDENT SOFTWARE ENGINEERING</p>

            <h1>
              Software built
              <br />
              to be <em>yours.</em>
            </h1>

            <p className="hero-description">
              OneTime Labs builds practical software for teams that want
              control over their tools, their data, and their infrastructure.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#products">
                Explore Products
                <ArrowRight size={16} />
              </a>

              <a className="button button-light" href="/custom-development">
                Build Something Custom
              </a>
            </div>
          </div>

          <div className="hero-principle" aria-label="OneTime Labs principle">
            <span className="principle-number">01</span>
            <div>
              <p className="principle-label">THE PRINCIPLE</p>
              <p className="principle-statement">
                Buy it.
                <br />
                Deploy it.
                <br />
                <strong>Own it.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            TRUST STRIP 004
            =================================================== */}
        <section className="trust-strip" aria-label="Product principles">
          <span><Check size={14} /> Self-hosted options</span>
          <span><Check size={14} /> Perpetual licensing</span>
          <span><Check size={14} /> Your infrastructure</span>
          <span><Check size={14} /> No forced subscription</span>
        </section>

        {/* ===================================================
            PHILOSOPHY 005
            =================================================== */}
        <section className="section philosophy-section" id="company">
          <div className="section-kicker">
            <span>02</span>
            <p>BUILT DIFFERENTLY</p>
          </div>

          <div className="philosophy-grid">
            <h2>
              We don't think every piece of software needs to become a
              monthly bill.
            </h2>

            <div className="body-copy">
              <p>
                OneTime Labs develops focused software designed around
                ownership rather than dependency.
              </p>
              <p>
                Our products solve specific operational problems without
                turning the customer into a permanent subscriber. Where
                practical, applications can run in your environment and keep
                your data under your control.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            CUSTOM DEVELOPMENT 006
            =================================================== */}
        <section className="custom-development-band">
          <div className="custom-development-band-copy">
            <p className="eyebrow">CUSTOM DEVELOPMENT</p>
            <h2>Your process doesn't have to fit someone else's software.</h2>
            <p>
              Have an internal workflow, spreadsheet, reporting process, or
              operational problem that deserves a real tool? OneTime Labs can
              design and build it around the way your team actually works.
            </p>
          </div>

          <div className="custom-development-band-action">
            <Code2 size={30} strokeWidth={1.4} />
            <p>
              Purpose-built internal tools, workflow applications, dashboards,
              automation, integrations, and business software.
            </p>
            <a className="text-link" href="/custom-development">
              Custom Development
              <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* ===================================================
            PRODUCTS 007
            =================================================== */}
        <section className="section products-section" id="products">
          <div className="section-kicker">
            <span>03</span>
            <p>PRODUCTS</p>
          </div>

          <div className="section-heading-row">
            <div>
              <h2>Purpose-built software.</h2>
              <p>
                Focused tools for real operational work. No platform theater.
              </p>
            </div>
          </div>

          <article className="featured-product">
            <div className="product-identity">
              <div className="product-icon">
                <BookOpen size={27} strokeWidth={1.5} />
              </div>

              <div>
                <p className="product-label">FLAGSHIP PRODUCT</p>
                <h3>OTLES</h3>
                <p className="product-name">
                  Operational &amp; Technical Library Engineering System
                </p>
              </div>
            </div>

            <div className="product-description">
              <p>
                Structured documentation for technical and operational teams.
                Organize knowledge, maintain revisions, control access, and
                publish consistent documentation without building another
                sprawling wiki.
              </p>

              <div className="product-tags">
                <span>Structured docs</span>
                <span>Revision history</span>
                <span>Organization access</span>
                <span>OTML</span>
              </div>

              <a
                className="text-link"
                href="http://otles.onetimelabs.net"
              >
                Explore OTLES
                <ArrowRight size={15} />
              </a>
            </div>
          </article>
        </section>

        {/* ===================================================
            SOLUTIONS 008
            =================================================== */}
        <section className="section solutions-section" id="solutions">
          <div className="section-kicker">
            <span>04</span>
            <p>SOLUTIONS</p>
          </div>

          <div className="section-heading-row">
            <div>
              <h2>Built around the problem.</h2>
              <p>
                Not every operational problem needs another enormous platform.
              </p>
            </div>
          </div>

          <div className="solution-grid">
            <SolutionCard
              icon={<BookOpen size={22} />}
              number="01"
              title="Technical Documentation"
              text="Structured, versioned operational knowledge without the wiki sprawl."
            />
            <SolutionCard
              icon={<Boxes size={22} />}
              number="02"
              title="IT Operations"
              text="Focused tools designed around the workflows infrastructure teams actually use."
            />
            <SolutionCard
              icon={<Server size={22} />}
              number="03"
              title="Self-Hosted Software"
              text="Keep applications and business data within infrastructure you control."
            />
            <SolutionCard
              icon={<Code2 size={22} />}
              number="04"
              title="Custom Engineering"
              text="Purpose-built internal tooling when off-the-shelf software is the wrong fit."
            />
          </div>
        </section>

        {/* ===================================================
            OWNERSHIP 009
            =================================================== */}
        <section className="ownership-section">
          <div className="ownership-copy">
            <p className="eyebrow">THE ONETIME MODEL</p>
            <h2>Ownership should still be an option.</h2>
            <p>
              Software that performs a defined job shouldn't necessarily
              require an indefinite monthly payment to keep doing that job.
            </p>
          </div>

          <div className="ownership-points">
            <div>
              <ShieldCheck size={21} />
              <span>
                <strong>Control</strong>
                Your software. Your environment.
              </span>
            </div>
            <div>
              <Server size={21} />
              <span>
                <strong>Deployment</strong>
                Self-host where practical.
              </span>
            </div>
            <div>
              <Building2 size={21} />
              <span>
                <strong>Licensing</strong>
                Clear terms without forced SaaS.
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            DOCUMENTATION 010
            =================================================== */}
        <section className="section docs-section" id="documentation">
          <div className="docs-card">
            <div>
              <p className="eyebrow">
                OneTime Labs: Enterprise Standards (OTLES)
              </p>
              <h2>Built by engineers.</h2>
              <p>
                Product guides, architecture notes, deployment information,
                and technical references belong in one predictable place.
              </p>
            </div>

            <a
              className="button button-light-on-dark"
              href="http://otles.onetimelabs.net"
            >
              See it in Action
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER 011
          ===================================================== */}
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">OTL</span>
          <div>
            <strong>OneTime Labs</strong>
            <p>Software built to be yours.</p>
          </div>
        </div>

        <div className="footer-links">
          <a href="#products">Products</a>
          <a href="/custom-development">Custom Development</a>
          <a href="#solutions">Solutions</a>
          <a href="#company">Company</a>
          <a href="#documentation">Documentation</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} OneTime Labs.
        </p>
      </footer>
    </div>
  );
}

/* ==========================================================
   COMPONENT 012
   Solution card
   ========================================================== */

type SolutionCardProps = {
  icon: React.ReactNode;
  number: string;
  title: string;
  text: string;
};

function SolutionCard({
  icon,
  number,
  title,
  text,
}: SolutionCardProps) {
  return (
    <article className="solution-card">
      <div className="solution-card-top">
        <span className="solution-icon">{icon}</span>
        <span className="solution-number">{number}</span>
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}