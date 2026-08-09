"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  Code2,
  Database,
  FileSpreadsheet,
  GitBranch,
  Menu,
  Server,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";

import "./page.css";

/* ==========================================================
   CUSTOM DEVELOPMENT 001
   OneTime Labs professional engineering services
   ========================================================== */

export default function CustomDevelopment() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="custom-page">
      {/* =====================================================
          HEADER 002
          ===================================================== */}
      <header className="custom-header">
        <a className="custom-brand" href="/" aria-label="OneTime Labs home">
          <span className="custom-brand-mark">OTL</span>
          <span className="custom-brand-name">OneTime Labs</span>
        </a>

        <nav className="custom-desktop-nav" aria-label="Primary navigation">
          <a href="/#products">Products</a>
          <a className="active" href="/custom-development">
            Custom Development
          </a>
          <a href="/#solutions">Solutions</a>
          <a href="/#company">Company</a>
          <a href="/#documentation">Documentation</a>
        </nav>

        <a className="custom-header-cta" href="/custom-development/contact">
          Discuss a Project
          <ArrowRight size={15} />
        </a>

        <button
          className="custom-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav className="custom-mobile-nav" aria-label="Mobile navigation">
            <a href="/#products">Products</a>
            <a href="/custom-development">Custom Development</a>
            <a href="/#solutions">Solutions</a>
            <a href="/#company">Company</a>
            <a href="/#documentation">Documentation</a>
          </nav>
        )}
      </header>

      <main>
        {/* ===================================================
            HERO 003
            =================================================== */}
        <section className="custom-hero">
          <div className="custom-hero-copy">
            <a className="back-link" href="/">
              <ArrowLeft size={14} />
              OneTime Labs
            </a>

            <p className="custom-eyebrow">CUSTOM DEVELOPMENT</p>

            <h1>
              Your process doesn't
              <br />
              have to fit <em>their software.</em>
            </h1>

            <p className="custom-hero-description">
              OneTime Labs designs and builds purpose-built internal software
              for organizations with workflows that spreadsheets,
              off-the-shelf products, and giant enterprise platforms don't
              handle well.
            </p>

            <div className="custom-hero-actions">
              <a
                className="custom-button custom-button-dark"
                href="/custom-development/contact"
              >
                Discuss Your Idea
                <ArrowRight size={16} />
              </a>

              <a
                className="custom-button custom-button-light"
                href="#pricing"
              >
                View Starting Prices
              </a>
            </div>
          </div>

          <div className="custom-hero-aside">
            <span className="custom-aside-number">01</span>
            <div>
              <p className="custom-aside-label">THE IDEA</p>
              <p className="custom-aside-statement">
                You know the
                <br />
                problem.
                <br />
                <strong>We'll build the tool.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            TRUST STRIP 004
            =================================================== */}
        <section className="custom-trust-strip">
          <span><Check size={14} /> Purpose-built</span>
          <span><Check size={14} /> Source code included</span>
          <span><Check size={14} /> Deployment documented</span>
          <span><Check size={14} /> No forced retainer</span>
        </section>

        {/* ===================================================
            WHAT WE BUILD 005
            =================================================== */}
        <section className="custom-section custom-build-section">
          <div className="custom-section-kicker">
            <span>02</span>
            <p>WHAT WE BUILD</p>
          </div>

          <div className="custom-heading-row">
            <div>
              <h2>Small enough to stay focused. Serious enough for real work.</h2>
              <p>
                The goal isn't to build another giant platform. It's to solve
                the specific operational problem that's costing your team time.
              </p>
            </div>
          </div>

          <div className="custom-capability-grid">
            <Capability
              icon={<Workflow size={22} />}
              title="Workflow Applications"
              text="Turn manual processes, approvals, handoffs, and repetitive operational work into a focused application."
            />
            <Capability
              icon={<BarChart3 size={22} />}
              title="Dashboards & Reporting"
              text="Bring operational data together and turn recurring reporting work into something useful and repeatable."
            />
            <Capability
              icon={<FileSpreadsheet size={22} />}
              title="Spreadsheet Replacements"
              text="Replace the spreadsheet that quietly became a mission-critical application with software designed for the job."
            />
            <Capability
              icon={<Boxes size={22} />}
              title="Internal Tools"
              text="Build departmental utilities, admin portals, asset tools, compliance systems, and other focused business applications."
            />
            <Capability
              icon={<GitBranch size={22} />}
              title="Integrations & Automation"
              text="Connect systems, APIs, exports, imports, and repetitive processes that currently depend on manual intervention."
            />
            <Capability
              icon={<Database size={22} />}
              title="Data Applications"
              text="Create practical interfaces around operational data without forcing users to work directly from raw databases or exports."
            />
          </div>
        </section>

        {/* ===================================================
            TECHNOLOGY 006
            =================================================== */}
        <section className="custom-section custom-technology-section">
          <div className="custom-section-kicker">
            <span>03</span>
            <p>TECHNOLOGY</p>
          </div>

          <div className="custom-heading-row">
            <div>
              <h2>Technology chosen around the problem.</h2>
              <p>
                The stack should support the application, not dictate it.
                OneTime Labs works with modern web, automation, and data
                technologies selected around the requirements of the project.
              </p>
            </div>
          </div>

          <div className="custom-terms-grid">
            <Term
              title="Application Development"
              text="React · Next.js · TypeScript · JavaScript · C# · .NET"
            />
            <Term
              title="Backend & Data"
              text="PostgreSQL · SQL · Supabase · REST APIs · ASP.NET Core · REST API"
            />
            <Term
              title="Automation & Scripting"
              text="Python · PowerShell"
            />
          </div>
        </section>

        {/* ===================================================
            ENGAGEMENT MODEL 007
            =================================================== */}
        <section className="custom-section custom-process-section">
          <div className="custom-section-kicker">
            <span>04</span>
            <p>HOW IT WORKS</p>
          </div>

          <div className="custom-process-grid">
            <div className="custom-process-intro">
              <h2>Start with the problem. Not the technology.</h2>
              <p>
                You don't need a finished specification before reaching out.
                A broken process, ugly spreadsheet, recurring manual task, or
                idea for a better internal tool is enough to start.
              </p>
            </div>

            <div className="custom-process-steps">
              <ProcessStep
                number="01"
                title="Discovery"
                text="Define the problem, users, workflow, constraints, and what success actually looks like."
              />
              <ProcessStep
                number="02"
                title="Scope"
                text="Turn the idea into a defined project with deliverables, assumptions, timeline, and price."
              />
              <ProcessStep
                number="03"
                title="Build"
                text="Develop the application in visible milestones with working software reviewed throughout the project."
              />
              <ProcessStep
                number="04"
                title="Deliver"
                text="Deploy the application and provide the agreed source code, documentation, and handoff materials."
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            PRICING 008
            =================================================== */}
        <section
          className="custom-section custom-pricing-section"
          id="pricing"
        >
          <div className="custom-section-kicker">
            <span>05</span>
            <p>STARTING PRICES</p>
          </div>

          <div className="custom-heading-row">
            <div>
              <h2>Defined projects. Clear starting points.</h2>
              <p>
                Every build is scoped individually. These ranges establish the
                size of engagement OneTime Labs is designed to take on.
              </p>
            </div>
          </div>

          <div className="pricing-grid">
            <PricingCard
              label="PROTOTYPE"
              price="$1,500+"
              description="For validating an idea or turning a manual process into a working proof of concept."
              items={[
                "Focused proof of concept",
                "Core workflow",
                "Basic interface",
                "Technical feasibility",
              ]}
            />

            <PricingCard
              label="INTERNAL TOOL"
              price="$5,000+"
              featured
              description="For production-ready tools used by a team or department."
              items={[
                "Production application",
                "Database-backed workflows",
                "Authentication where required",
                "Deployment and handoff",
              ]}
            />

            <PricingCard
              label="BUSINESS PLATFORM"
              price="$15,000+"
              description="For larger applications involving multiple workflows, roles, integrations, or business functions."
              items={[
                "Multiple application areas",
                "Roles and permissions",
                "System integrations",
                "Structured deployment",
              ]}
            />

            <PricingCard
              label="ENTERPRISE / CUSTOM"
              price="Let's talk."
              description="For complex integrations, migrations, infrastructure requirements, or larger organizational deployments."
              items={[
                "Custom scope",
                "Architecture planning",
                "Enterprise integrations",
                "Milestone-based delivery",
              ]}
            />
          </div>

          <p className="pricing-note">
            Starting prices are planning ranges, not fixed quotes. Final pricing
            is based on agreed scope, complexity, integrations, deployment
            requirements, and delivery schedule.
          </p>
        </section>

        {/* ===================================================
            OWNERSHIP 009
            =================================================== */}
        <section className="custom-ownership">
          <div className="custom-ownership-copy">
            <p className="custom-eyebrow">AFTER DELIVERY</p>
            <h2>You shouldn't need permission to keep using what you paid for.</h2>
            <p>
              Custom development is built around a clean handoff. Ownership,
              licensing, source-code delivery, deployment, and support terms
              are defined in the project agreement before work begins.
            </p>
          </div>

          <div className="custom-ownership-points">
            <OwnershipPoint
              icon={<Code2 size={21} />}
              title="Source"
              text="Source-code delivery is defined as part of the engagement."
            />
            <OwnershipPoint
              icon={<Server size={21} />}
              title="Deployment"
              text="Host with OneTime Labs, in your environment, or move it elsewhere when the project allows."
            />
            <OwnershipPoint
              icon={<Check size={21} />}
              title="Maintenance"
              text="Ongoing support can be arranged separately. It is not a mandatory development subscription."
            />
          </div>
        </section>

        {/* ===================================================
            SCOPE CHANGES 010
            =================================================== */}
        <section className="custom-section custom-terms-section">
          <div className="custom-section-kicker">
            <span>06</span>
            <p>PROJECT MODEL</p>
          </div>

          <div className="custom-terms-grid">
            <Term
              title="Deposits"
              text="Projects begin after the agreed initial payment and project scope are approved."
            />
            <Term
              title="Milestones"
              text="Larger projects can be divided into defined delivery and payment milestones."
            />
            <Term
              title="Revisions"
              text="Expected review and revision cycles are included in the project scope before development begins."
            />
            <Term
              title="Scope Changes"
              text="New requirements are documented and priced separately instead of quietly expanding the original project."
            />
            <Term
              title="Hosting"
              text="Hosting and infrastructure are quoted separately when OneTime Labs is responsible for operating the application."
            />
            <Term
              title="Maintenance"
              text="Post-launch maintenance, enhancements, and support are optional follow-on services."
            />
          </div>
        </section>

        {/* ===================================================
            CTA 011
            =================================================== */}
        <section className="custom-cta-section">
          <div>
            <p className="custom-eyebrow">HAVE AN IDEA?</p>
            <h2>Show me the ugly spreadsheet.</h2>
            <p>
              Or the manual process. Or the tool your team keeps saying
              somebody should build. That's usually where the interesting
              projects start.
            </p>
          </div>

          <a
            className="custom-button custom-button-light-on-dark"
            href="/custom-development/contact"
          >
            Discuss a Project
            <ArrowRight size={16} />
          </a>
        </section>
      </main>

      {/* =====================================================
          FOOTER 012
          ===================================================== */}
      <footer className="custom-footer">
        <div className="custom-footer-brand">
          <span className="custom-brand-mark">OTL</span>
          <div>
            <strong>OneTime Labs</strong>
            <p>Software built to be yours.</p>
          </div>
        </div>

        <div className="custom-footer-links">
          <a href="/">Home</a>
          <a href="/#products">Products</a>
          <a href="/custom-development">Custom Development</a>
          <a href="/#documentation">Documentation</a>
        </div>

        <p className="custom-copyright">
          © {new Date().getFullYear()} OneTime Labs.
        </p>
      </footer>
    </div>
  );
}

/* ==========================================================
   COMPONENTS 013
   ========================================================== */

type CapabilityProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function Capability({ icon, title, text }: CapabilityProps) {
  return (
    <article className="capability-card">
      <span className="capability-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
};

function ProcessStep({ number, title, text }: ProcessStepProps) {
  return (
    <div className="process-step">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

type PricingCardProps = {
  label: string;
  price: string;
  description: string;
  items: string[];
  featured?: boolean;
};

function PricingCard({
  label,
  price,
  description,
  items,
  featured = false,
}: PricingCardProps) {
  return (
    <article className={`pricing-card${featured ? " featured" : ""}`}>
      <p className="pricing-label">{label}</p>
      <h3>{price}</h3>
      <p className="pricing-description">{description}</p>

      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={13} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

type OwnershipPointProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function OwnershipPoint({ icon, title, text }: OwnershipPointProps) {
  return (
    <div>
      {icon}
      <span>
        <strong>{title}</strong>
        {text}
      </span>
    </div>
  );
}

type TermProps = {
  title: string;
  text: string;
};

function Term({ title, text }: TermProps) {
  return (
    <article className="term-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}