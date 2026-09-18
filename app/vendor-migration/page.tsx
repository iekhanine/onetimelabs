import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Network,
  ShieldCheck,
  Split,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const phases = [
  {
    number: "01",
    title: "Discover",
    text: "Inventory the current environment, contracts, vendors, dependencies, owners, failure points, integrations, and operational constraints.",
  },
  {
    number: "02",
    title: "Design",
    text: "Define the target state, migration waves, success criteria, rollback path, ownership model, communications, and change controls.",
  },
  {
    number: "03",
    title: "Transition",
    text: "Coordinate vendors, implement tooling, migrate services, execute cutover, track exceptions, and validate the new environment.",
  },
  {
    number: "04",
    title: "Stabilize",
    text: "Close gaps, document the operating model, transfer ownership, resolve residual issues, and leave support teams with something maintainable.",
  },
];

const workstreams = [
  ["Vendor exit / replacement", "Move from an incumbent provider to a new vendor without losing the operational knowledge buried in the old contract."],
  ["Tool migration", "Replace management, monitoring, print, asset, workflow, or operational platforms while preserving required data and controls."],
  ["Infrastructure transition", "Map dependencies, ownership, change windows, validation, and support handoff across systems that cannot simply be switched off."],
  ["Multi-site rollout", "Sequence locations, pilot the target model, document exceptions, and keep local execution aligned with the enterprise standard."],
  ["Operational cleanup", "Use the migration as the point to fix naming, ownership, lifecycle, documentation, access, and process gaps instead of carrying them forward."],
  ["Vendor coordination", "Keep internal teams, incumbent vendors, incoming vendors, site contacts, and project stakeholders working from the same acceptance criteria."],
];

const deliverables = [
  "Current-state inventory and dependency map",
  "Target-state architecture and ownership model",
  "Migration plan, wave plan, and cutover checklist",
  "Acceptance criteria and validation evidence",
  "Risk, issue, exception, and decision tracking",
  "Runbooks, support documentation, and operational handoff",
];

export const metadata = {
  title: "Vendor Migration Consulting",
  description:
    "Vendor migration consulting for enterprise technology transitions, including discovery, target-state design, cutover, validation, documentation, and operational handoff in Racine, Milwaukee, Chicago, and remotely.",
};

export default function VendorMigrationPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">VENDOR MIGRATION</span>
              <h1>Change vendors without breaking operations.</h1>
              <p>
                OneTime Labs helps organizations move from the current environment to a defined
                target state with the dependencies, owners, validation, and handoff work treated as
                part of the migration—not as cleanup for somebody else later.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Discuss a migration <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/pricing">
                  View pricing
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Engagement</span><strong>Assessment → migration → handoff</strong></div>
              <div><span>Coverage</span><strong>Vendor · platform · infrastructure · print</strong></div>
              <div><span>Delivery</span><strong>Onsite or remote</strong></div>
              <div><span>Region</span><strong>Racine · Milwaukee · Chicago · National</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">THE MIGRATION MODEL</span>
                <h2>Four phases. One accountable transition.</h2>
                <p>The scope can stop at assessment or extend through cutover and steady-state handoff.</p>
              </div>
            </div>

            <div className="otl-process-grid">
              {phases.map(({ number, title, text }) => (
                <article key={title}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">WORKSTREAMS</span>
                <h2>Where migrations usually get messy.</h2>
                <p>Technical transition work rarely lives inside a single project plan or single vendor.</p>
              </div>
            </div>

            <div className="otl-detail-grid">
              {workstreams.map(([title, text], index) => {
                const Icon = [Split, Network, ShieldCheck, ClipboardList, CheckCircle2, Network][index];
                return (
                  <article key={title}>
                    <Icon size={17} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="otl-two-column-panel">
            <div className="otl-panel-lead">
              <span className="otl-eyebrow otl-eyebrow-dark">DELIVERABLES</span>
              <h2>Leave with an operating model, not just a completed project.</h2>
              <p>
                The point is not merely to get through cutover. The receiving organization should
                know what exists, who owns it, how it is validated, and how it is supported.
              </p>
            </div>
            <div className="otl-check-list">
              {deliverables.map((item) => (
                <div key={item}><CheckCircle2 size={15} /><span>{item}</span></div>
              ))}
            </div>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">NEXT STEP</span>
              <h2>Show us what you are replacing.</h2>
              <p>We can start with a short consultation, a current-state assessment, or a scoped migration engagement.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact">
              Start the conversation <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
