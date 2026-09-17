import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  FileText,
  KeyRound,
  Map,
  Printer,
  Workflow,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { enterpriseSoftware } from "@/lib/company";

const icons = [FileText, Workflow, Printer, KeyRound, Boxes, Map];

export const metadata = {
  title: "Enterprise Software Portfolio",
  description:
    "Enterprise software from OneTime Labs including OTLES, ChangeOps, PCCR, licensing infrastructure, asset-management tools, and geospatial operational systems.",
};

export default function SoftwarePage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">ENTERPRISE SOFTWARE</span>
              <h1>Software built from problems we have actually seen.</h1>
              <p>
                The OneTime Labs portfolio comes out of operational work: documentation,
                change governance, managed print, licensing, asset management, and location-based records.
                The products are not filler around a consulting business—they are evidence of how we solve problems.
              </p>
              <div className="otl-hero-actions">
                <a className="otl-button otl-button-primary" href="https://store.onetimelabs.net">
                  Open software store <ArrowRight size={14} />
                </a>
                <Link className="otl-button otl-button-secondary" href="/custom-development">
                  Custom development
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Portfolio</span><strong>Documentation · governance · print · licensing</strong></div>
              <div><span>Model</span><strong>Purpose-built operational software</strong></div>
              <div><span>Delivery</span><strong>Hosted, deployable, or project-specific depending on product</strong></div>
              <div><span>Separate portfolio</span><strong>Creator / broadcast tools</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">PORTFOLIO</span>
                <h2>Enterprise systems.</h2>
                <p>Each product is tied to a concrete operational problem rather than a generic feature category.</p>
              </div>
            </div>

            <div className="otl-product-grid">
              {enterpriseSoftware.map((product, index) => {
                const Icon = icons[index] ?? Boxes;
                return (
                  <article key={product.name}>
                    <div className="otl-product-icon"><Icon size={18} /></div>
                    <span>{product.discipline}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="otl-two-column-panel">
            <div className="otl-panel-lead">
              <span className="otl-eyebrow otl-eyebrow-dark">BUY OR BUILD</span>
              <h2>Existing product when it fits. Custom software when it does not.</h2>
              <p>
                If one of the existing OneTime Labs products solves the problem, start there.
                If your workflow is specific, we can scope a purpose-built implementation instead.
              </p>
            </div>
            <div className="otl-panel-action">
              <strong>Need something specific?</strong>
              <p>Operational applications, workflow systems, data tools, integrations, and internal admin portals can be scoped separately.</p>
              <Link href="/custom-development">Custom development <ArrowRight size={13} /></Link>
            </div>
          </section>

          <section className="otl-route-grid otl-route-grid-two">
            <a href="https://store.onetimelabs.net">
              <span>Commercial software</span>
              <strong>OneTime Labs Store</strong>
              <p>Browse software available directly from OneTime Labs.</p>
              <em>Open store <ArrowRight size={12} /></em>
            </a>
            <Link href="/creator-tools">
              <span>Separate portfolio</span>
              <strong>Creator Tools</strong>
              <p>Twitch, YouTube, OBS, safety, overlays, and broadcast utilities.</p>
              <em>Open creator portfolio <ArrowRight size={12} /></em>
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
