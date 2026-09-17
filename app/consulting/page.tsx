import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  Database,
  FileCheck2,
  Layers3,
  Wrench,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const disciplines = [
  {
    icon: Layers3,
    title: "Enterprise architecture",
    text: "Current-state analysis, target-state design, technical standards, integration boundaries, ownership, and implementation planning.",
  },
  {
    icon: Boxes,
    title: "ITAM / SAM",
    text: "Inventory, lifecycle, normalization, reconciliation, licensing, reclamation, compliance, publisher data, and operational governance.",
  },
  {
    icon: Database,
    title: "CMDB / ServiceNow",
    text: "Asset and CI alignment, discovery, data quality, ownership, workflow, relationships, and operational cleanup around enterprise records.",
  },
  {
    icon: FileCheck2,
    title: "Governance & change",
    text: "Technical standards, change controls, CAB support, documentation requirements, acceptance criteria, evidence, and audit-ready process design.",
  },
  {
    icon: Wrench,
    title: "Project recovery",
    text: "Step into an implementation that is drifting, identify the blockers, restore ownership, establish a workable plan, and get delivery moving again.",
  },
  {
    icon: Building2,
    title: "Fractional technical leadership",
    text: "Senior architecture and technical program support for organizations that need experienced ownership without adding another permanent leadership role.",
  },
];

const engagementModel = [
  ["Advisory", "Short, focused technical guidance for a decision, design, issue, or vendor discussion."],
  ["Assessment", "Structured review of an environment, process, tooling stack, data set, migration, or operational gap."],
  ["Implementation", "Hands-on technical delivery alongside internal teams, vendors, and project stakeholders."],
  ["Fractional", "Ongoing architecture, governance, migration leadership, or technical ownership on a contracted basis."],
];

export const metadata = {
  title: "Enterprise Technology Consulting",
  description:
    "Enterprise technology consulting for architecture, ITAM, SAM, CMDB, ServiceNow, governance, operational cleanup, project recovery, and fractional technical leadership.",
};

export default function ConsultingPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">ENTERPRISE CONSULTING</span>
              <h1>Senior technical help for the work between the silos.</h1>
              <p>
                Architecture, asset management, licensing, CMDB, governance, implementation,
                and operational cleanup tend to collide in real enterprise projects. OneTime Labs
                works across those boundaries instead of pretending the problem belongs to one tool.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Start a consultation <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/experience">
                  Enterprise experience
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Model</span><strong>Advisory · assessment · implementation · fractional</strong></div>
              <div><span>Core</span><strong>Architecture · ITAM · SAM · CMDB · governance</strong></div>
              <div><span>Onsite</span><strong>Racine · Milwaukee · Chicago</strong></div>
              <div><span>Remote</span><strong>National engagements welcome</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">DISCIPLINES</span>
                <h2>Enterprise work rarely stays inside the box on the org chart.</h2>
                <p>Bring in one technical partner for the areas that span systems, process, vendors, and ownership.</p>
              </div>
            </div>

            <div className="otl-detail-grid">
              {disciplines.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={18} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">ENGAGEMENT MODEL</span>
                <h2>Use as much consulting as the problem actually needs.</h2>
              </div>
            </div>

            <div className="otl-engagement-table">
              {engagementModel.map(([title, text]) => (
                <div key={title}><strong>{title}</strong><span>{text}</span></div>
              ))}
            </div>
          </section>

          <section className="otl-route-grid">
            <Link href="/vendor-migration">
              <span>Specialized service</span>
              <strong>Vendor Migration</strong>
              <p>Discovery through cutover and operational handoff.</p>
              <em>Open service page <ArrowRight size={12} /></em>
            </Link>
            <Link href="/managed-print-services">
              <span>Specialized service</span>
              <strong>Managed Print Services</strong>
              <p>Enterprise print architecture, fleet operations, tooling, and transition.</p>
              <em>Open service page <ArrowRight size={12} /></em>
            </Link>
            <Link href="/custom-development">
              <span>Specialized service</span>
              <strong>Custom Development</strong>
              <p>Operational applications and internal tooling built around the actual workflow.</p>
              <em>Open service page <ArrowRight size={12} /></em>
            </Link>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">CONSULTING RATES</span>
              <h2>Remote from $175/hour. Onsite from $225/hour.</h2>
              <p>Project and longer-term pricing is available when hourly billing is the wrong model for the engagement.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/pricing">
              View all pricing <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
