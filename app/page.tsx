import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  MapPin,
  Network,
  Printer,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { enterpriseExperience } from "@/lib/company";

const capabilities = [
  {
    href: "/vendor-migration",
    icon: Network,
    title: "Vendor Migration",
    description:
      "Discovery, dependency mapping, transition planning, cutover, validation, documentation, and operational handoff.",
    detail: "Plan the move without losing the operation.",
  },
  {
    href: "/managed-print-services",
    icon: Printer,
    title: "Managed Print Services",
    description:
      "Enterprise print architecture, fleet assessment, PrinterLogic, Web JetAdmin, Streamline NX, print servers, and vendor transitions.",
    detail: "Treat print like infrastructure.",
  },
  {
    href: "/consulting",
    icon: BriefcaseBusiness,
    title: "Enterprise Consulting",
    description:
      "Architecture, ITAM, SAM, CMDB, operational governance, technical standards, project recovery, and senior implementation support.",
    detail: "Senior technical help without the giant consultancy.",
  },
  {
    href: "/custom-development",
    icon: Code2,
    title: "Custom Development",
    description:
      "Purpose-built internal software when commercial tools are too expensive, too rigid, or simply do not fit the workflow.",
    detail: "Build the missing piece.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-hero">
          <div className="otl-shell otl-hero-grid">
            <div className="otl-hero-copy">
              <span className="otl-eyebrow">ENTERPRISE CONSULTING · RACINE / MILWAUKEE / CHICAGO</span>
              <h1>Enterprise technology transitions without the consulting theater.</h1>
              <p>
                OneTime Labs helps organizations change vendors, modernize managed print,
                clean up operational technology, and build the software needed to support
                the environment after the project team leaves.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/vendor-migration">
                  Explore services <ArrowRight size={14} />
                </Link>
                <Link className="otl-button otl-button-secondary" href="/contact">
                  Start a conversation
                </Link>
              </div>
            </div>

            <div className="otl-hero-index" aria-label="OneTime Labs focus areas">
              <div className="otl-hero-index-row">
                <strong>Vendor Migration</strong>
                <span>Current state → target state → cutover → handoff</span>
              </div>
              <div className="otl-hero-index-row">
                <strong>Managed Print</strong>
                <span>Fleet · tooling · print servers · governance · MPS transition</span>
              </div>
              <div className="otl-hero-index-row">
                <strong>Operational Software</strong>
                <span>Internal tools · workflow systems · APIs · enterprise applications</span>
              </div>
            </div>
          </div>
        </section>

        <section className="otl-enterprise-proof">
          <div className="otl-shell">
            <div className="otl-proof-heading">
              <span className="otl-eyebrow otl-eyebrow-dark">ENTERPRISE ENVIRONMENTS SUPPORTED</span>
              <Link href="/experience">View enterprise experience <ArrowRight size={13} /></Link>
            </div>
            <div className="otl-logo-row" aria-label="Prior enterprise environments supported">
              {enterpriseExperience.map((company) => <strong key={company}>{company}</strong>)}
            </div>
            <p className="otl-proof-note">
              Prior professional experience and engagements. Listed organizations are not presented as current OneTime Labs clients or sponsors.
            </p>
          </div>
        </section>

        <div className="otl-shell otl-home-content">
          <section className="otl-home-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">SERVICES</span>
                <h2>Pick the problem. Go to the page.</h2>
                <p>The homepage is the lobby now. Each capability has its own scope, process, and engagement model.</p>
              </div>
            </div>

            <div className="otl-service-cards">
              {capabilities.map(({ href, icon: Icon, title, description, detail }) => (
                <Link className="otl-service-card otl-service-card-link" href={href} key={title}>
                  <Icon size={18} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>{detail} <ArrowRight size={12} /></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="otl-home-split">
            <div className="otl-home-panel">
              <span className="otl-eyebrow otl-eyebrow-dark">SOFTWARE</span>
              <h2>Software built from operational problems.</h2>
              <p>
                OTLES, ChangeOps, PCCR, licensing infrastructure, asset-management tooling,
                geospatial systems, and creator/broadcast utilities.
              </p>
              <div className="otl-inline-links">
                <Link href="/software">Enterprise software <ArrowRight size={13} /></Link>
                <Link href="/creator-tools">Creator tools <ArrowRight size={13} /></Link>
              </div>
            </div>

            <div className="otl-home-panel">
              <span className="otl-eyebrow otl-eyebrow-dark">ENGAGEMENTS</span>
              <h2>Clear rates. Scoped work.</h2>
              <p>
                Remote consulting starts at $175/hour, onsite consulting at $225/hour,
                with project pricing available for migrations, assessments, and longer engagements.
              </p>
              <div className="otl-inline-links">
                <Link href="/pricing">View pricing <ArrowRight size={13} /></Link>
                <Link href="/contact">Request a consultation <ArrowRight size={13} /></Link>
              </div>
            </div>
          </section>

          <section className="otl-contribute-feature">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">SUPPORT ONETIME LABS</span>
              <h2>Help fund the next thing we build.</h2>
              <p>
                If you like what OneTime Labs is building, you can support independent development directly.
                Support is separate from the non-binding future investment-interest list.
              </p>
            </div>
            <div className="otl-contribute-feature-actions">
              <Link className="otl-button otl-button-primary" href="/contribute">
                Support OneTime Labs <ArrowRight size={14} />
              </Link>
              <Link href="/contribute#ownership">
                Interested in future ownership? <ArrowRight size={12} />
              </Link>
            </div>
          </section>

          <section className="otl-local-strip">
            <MapPin size={18} />
            <div>
              <strong>Primary onsite service area</strong>
              <span>Racine, WI · Milwaukee, WI · Chicago, IL</span>
            </div>
            <p>Remote and national enterprise engagements are welcome.</p>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">START HERE</span>
              <h2>Tell us what is changing.</h2>
              <p>Vendor problem, print problem, architecture problem, software problem. Start with the actual problem and we will scope from there.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/contact">
              Contact OneTime Labs <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
