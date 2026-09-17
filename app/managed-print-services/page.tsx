import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Printer,
  ServerCog,
  Settings2,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const capabilities = [
  {
    icon: BarChart3,
    title: "Fleet assessment",
    text: "Inventory, utilization, standards, support model, aging devices, exceptions, and the data quality needed to make a migration decision.",
  },
  {
    icon: ServerCog,
    title: "Print infrastructure",
    text: "Windows print servers, queue rationalization, naming, driver strategy, site dependencies, migration sequencing, and support handoff.",
  },
  {
    icon: Database,
    title: "Management tooling",
    text: "PrinterLogic, HP Web JetAdmin, Streamline NX, exports, reporting, compliance data, and operational administration.",
  },
  {
    icon: Settings2,
    title: "Vendor transition",
    text: "Incumbent-to-new-provider transition planning, site readiness, device deployment, acceptance criteria, exceptions, and stabilization.",
  },
];

const serviceLines = [
  "Managed Print Services vendor transition and replacement",
  "Enterprise fleet discovery, normalization, and assessment",
  "PrinterLogic administration, rollout, and migration support",
  "HP Web JetAdmin inventory, reporting, and fleet operations",
  "Streamline NX reporting, compliance, and transition support",
  "Windows print-server rationalization and queue migration",
  "Device standards, naming, ownership, and lifecycle governance",
  "Site readiness, deployment waves, cutover, and acceptance",
  "Printer compliance reporting and exception handling",
  "Documentation, support model, and operational handoff",
];

const engagementTypes = [
  ["Assessment", "Understand the fleet, tooling, contracts, infrastructure, support model, and transition risk before committing to a change."],
  ["Migration lead", "Own the technical workstream between the business, infrastructure teams, sites, incumbent provider, and incoming vendor."],
  ["Platform cleanup", "Rationalize print servers, queues, tooling, standards, reports, ownership, and documentation around an existing environment."],
  ["Ongoing advisory", "Provide senior MPS architecture and operational support when the organization needs experience without another full-time role."],
];

export const metadata = {
  title: "Managed Print Services Consulting",
  description:
    "Managed Print Services consulting, enterprise print architecture, fleet assessment, PrinterLogic, Web JetAdmin, Streamline NX, print-server migration, and vendor transition support in Racine, Milwaukee, Chicago, and remotely.",
};

export default function ManagedPrintServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">MANAGED PRINT SERVICES</span>
              <h1>Managed print is infrastructure. Treat it that way.</h1>
              <p>
                Enterprise print touches networks, identity, endpoints, drivers, servers, vendors,
                physical locations, security controls, finance, and end users. OneTime Labs helps
                organizations assess, migrate, standardize, and operate that environment as a system.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Discuss your print environment <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/pricing">
                  MPS pricing
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Focus</span><strong>Enterprise print / MPS</strong></div>
              <div><span>Tooling</span><strong>PrinterLogic · Web JetAdmin · Streamline NX</strong></div>
              <div><span>Infrastructure</span><strong>Print servers · queues · devices · reporting</strong></div>
              <div><span>Engagement</span><strong>Assess · migrate · optimize · govern</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">CAPABILITIES</span>
                <h2>From fleet data to cutover.</h2>
                <p>The work spans the physical fleet, the management stack, and the operational process around both.</p>
              </div>
            </div>

            <div className="otl-detail-grid otl-detail-grid-four">
              {capabilities.map(({ icon: Icon, title, text }) => (
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
                <span className="otl-eyebrow otl-eyebrow-dark">SERVICE LINES</span>
                <h2>The unglamorous stuff that keeps printing working.</h2>
              </div>
            </div>

            <div className="otl-check-grid">
              {serviceLines.map((service) => (
                <div key={service}><CheckCircle2 size={15} /><span>{service}</span></div>
              ))}
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">ENGAGEMENT OPTIONS</span>
                <h2>Bring us in where the environment needs help.</h2>
              </div>
            </div>

            <div className="otl-engagement-table">
              {engagementTypes.map(([title, text]) => (
                <div key={title}><strong>{title}</strong><span>{text}</span></div>
              ))}
            </div>
          </section>

          <section className="otl-two-column-panel">
            <div className="otl-panel-lead">
              <Printer size={22} />
              <span className="otl-eyebrow otl-eyebrow-dark">MPS + SOFTWARE</span>
              <h2>When reporting is the missing piece, we can build it.</h2>
              <p>
                PCCR was built around enterprise printer compliance and fleet reporting because
                operational data often exists long before somebody makes it useful.
              </p>
            </div>
            <div className="otl-panel-action">
              <strong>PCCR</strong>
              <p>Printer compliance and fleet reporting designed around Streamline NX and Web JetAdmin exports.</p>
              <Link href="/software">View enterprise software <ArrowRight size={13} /></Link>
            </div>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">MPS ASSESSMENT</span>
              <h2>Start with the environment you already have.</h2>
              <p>Managed print assessments start at $2,500, with larger migration and optimization engagements scoped separately.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact">
              Request an assessment <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
