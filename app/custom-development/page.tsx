import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Database,
  GitBranch,
  KeyRound,
  Workflow,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const buildTypes = [
  {
    icon: Workflow,
    title: "Operational applications",
    text: "Internal applications built around the process your team actually follows instead of forcing that process into a generic platform.",
  },
  {
    icon: Database,
    title: "Data & reporting tools",
    text: "Import, normalize, compare, report, validate, and expose operational data that already exists but is not useful in its current form.",
  },
  {
    icon: GitBranch,
    title: "Workflow systems",
    text: "Intake, approval, handoff, lifecycle, change, status, audit history, and ownership flows designed around a specific operating model.",
  },
  {
    icon: KeyRound,
    title: "Licensing & admin portals",
    text: "Customer, product, entitlement, seat, activation, administrative, and access-control systems for software and internal services.",
  },
  {
    icon: Braces,
    title: "Integrations & APIs",
    text: "Connect systems that should talk to each other, automate repetitive exchange, and put purpose-built interfaces around existing services.",
  },
];

const approach = [
  ["01", "Define the workflow", "Start with the users, process, data, exceptions, and outcome—not a framework or feature wish list."],
  ["02", "Build the smallest useful system", "Ship the core workflow first, validate it with the people doing the work, then expand deliberately."],
  ["03", "Document the system", "Architecture, deployment, environment, ownership, data model, and operational notes are treated as part of the product."],
  ["04", "Hand over something ownable", "The goal is maintainable software with a clear operating model, not a dependency you can never escape."],
];

export const metadata = {
  title: "Custom Enterprise Software Development",
  description:
    "Custom internal software, workflow systems, operational applications, data tools, admin portals, integrations, and purpose-built enterprise development from OneTime Labs.",
};

export default function CustomDevelopmentPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">CUSTOM DEVELOPMENT</span>
              <h1>When the process needs software—not another subscription.</h1>
              <p>
                OneTime Labs builds focused operational software for organizations that have a real
                workflow problem and cannot justify twisting an expensive commercial platform around it.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Discuss a build <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/software">
                  See what we have built
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Typical stack</span><strong>React · TypeScript · APIs · PostgreSQL</strong></div>
              <div><span>Best fit</span><strong>Internal workflows and operational systems</strong></div>
              <div><span>Delivery</span><strong>Prototype → production → handoff</strong></div>
              <div><span>Commercial model</span><strong>Scoped project or contracted development</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">WHAT WE BUILD</span>
                <h2>Software that exists because somebody had an operational problem.</h2>
                <p>Focused systems beat giant platforms when the scope is clear and the workflow is specific.</p>
              </div>
            </div>

            <div className="otl-detail-grid">
              {buildTypes.map(({ icon: Icon, title, text }) => (
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
                <span className="otl-eyebrow otl-eyebrow-dark">DELIVERY APPROACH</span>
                <h2>Build around the operation, then get out of its way.</h2>
              </div>
            </div>

            <div className="otl-process-grid">
              {approach.map(([number, title, text]) => (
                <article key={title}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="otl-two-column-panel">
            <div className="otl-panel-lead">
              <span className="otl-eyebrow otl-eyebrow-dark">ANTI-BLOAT</span>
              <h2>Not every internal tool needs to become a platform.</h2>
              <p>
                A good internal application can be small, boring, well-documented, easy to deploy,
                and extremely valuable. We are comfortable building exactly that.
              </p>
            </div>
            <div className="otl-panel-action">
              <strong>See the portfolio</strong>
              <p>OTLES, ChangeOps, PCCR, licensing infrastructure, asset tooling, mapping systems, and creator utilities.</p>
              <Link href="/software">Enterprise software <ArrowRight size={13} /></Link>
            </div>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">PROJECT SCOPING</span>
              <h2>Bring the ugly spreadsheet, manual process, or broken workflow.</h2>
              <p>We will start by figuring out whether you actually need software. If you do, we scope the smallest useful system first.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact">
              Scope a project <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
