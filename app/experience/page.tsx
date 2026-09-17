import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileStack,
  Layers3,
  Network,
  Printer,
  Settings2,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { enterpriseExperience } from "@/lib/company";

const experienceAreas = [
  {
    icon: Printer,
    title: "Enterprise print & MPS",
    text: "Large print environments, fleet operations, print servers, management tooling, vendor transitions, compliance, and support handoff.",
  },
  {
    icon: Network,
    title: "Vendor & platform transitions",
    text: "Discovery, target-state planning, migration sequencing, validation, vendor coordination, operational ownership, and stabilization.",
  },
  {
    icon: FileStack,
    title: "ITAM / SAM",
    text: "Asset lifecycle, software licensing, inventory, reconciliation, data quality, reclamation, compliance, and operational governance.",
  },
  {
    icon: Layers3,
    title: "Enterprise architecture",
    text: "Technical standards, current/target-state design, system boundaries, documentation, governance, and implementation planning.",
  },
  {
    icon: Settings2,
    title: "Operational systems",
    text: "Administration, workflow, infrastructure support, reporting, internal tooling, and the unglamorous work between systems and teams.",
  },
  {
    icon: Building2,
    title: "Large-enterprise operating reality",
    text: "Work shaped by environments where scale, change control, multiple vendors, distributed ownership, and supportability matter every day.",
  },
];

export const metadata = {
  title: "Enterprise Experience",
  description:
    "Enterprise experience behind OneTime Labs across Hewlett-Packard, SC Johnson, Google, Ricoh, and Bank of America environments, spanning managed print, vendor transition, ITAM/SAM, architecture, and operations.",
};

export default function ExperiencePage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">ENTERPRISE EXPERIENCE</span>
              <h1>OneTime Labs is new. The enterprise experience behind it is not.</h1>
              <p>
                OneTime Labs is built on prior professional work inside large enterprise environments
                where vendor management, infrastructure, print, asset management, licensing, governance,
                and support all have to function together.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Work with OneTime Labs <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/consulting">
                  Consulting services
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Environment</span><strong>Large enterprise</strong></div>
              <div><span>Operations</span><strong>Infrastructure · print · ITAM/SAM · support</strong></div>
              <div><span>Delivery</span><strong>Architecture · implementation · migration · governance</strong></div>
              <div><span>Current company</span><strong>OneTime Labs</strong></div>
            </aside>
          </div>
        </section>

        <section className="otl-enterprise-proof otl-enterprise-proof-page">
          <div className="otl-shell">
            <div className="otl-proof-heading">
              <span className="otl-eyebrow otl-eyebrow-dark">PRIOR ENTERPRISE ENVIRONMENTS SUPPORTED</span>
              <p>Professional experience preceding and informing OneTime Labs.</p>
            </div>
            <div className="otl-logo-row" aria-label="Prior enterprise environments supported">
              {enterpriseExperience.map((company) => <strong key={company}>{company}</strong>)}
            </div>
            <p className="otl-proof-note">
              These names describe prior professional environments and engagements. They are not represented as current OneTime Labs customers, endorsements, partnerships, or sponsorships.
            </p>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">WHAT THAT EXPERIENCE COVERS</span>
                <h2>Experience shaped by operations, not just project decks.</h2>
                <p>The point of listing enterprise experience is the operating context behind the consulting approach.</p>
              </div>
            </div>

            <div className="otl-detail-grid">
              {experienceAreas.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={18} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="otl-two-column-panel">
            <div className="otl-panel-lead">
              <span className="otl-eyebrow otl-eyebrow-dark">WHY IT MATTERS</span>
              <h2>Enterprise projects fail in the seams.</h2>
              <p>
                The hardest problems are usually between the vendor and the internal team, the asset record
                and the actual device, the architecture diagram and the deployed environment, or the project
                plan and the team that has to support it afterward.
              </p>
            </div>
            <div className="otl-panel-action">
              <strong>That is the lane.</strong>
              <p>OneTime Labs focuses on those seams: migration, operational ownership, managed print, architecture, governance, and purpose-built tooling.</p>
              <Link href="/vendor-migration">Vendor migration <ArrowRight size={13} /></Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
