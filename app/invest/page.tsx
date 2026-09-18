import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileSearch,
  Gauge,
  Landmark,
  Network,
  ShieldAlert,
  Target,
  Wrench,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { consultingPricing } from "@/lib/company";

import InvestInterestForm from "./InvestInterestForm";
import "./page.css";

export const metadata: Metadata = {
  title: "Invest in OneTime Labs",
  description:
    "Review the OneTime Labs company profile, business model, product portfolio, use-of-capital plan, risks, roadmap, and register a non-binding indication of investment interest.",
};

const portfolio = [
  {
    name: "OTLES",
    type: "Engineering documentation",
    description:
      "Structured technical documentation, engineering standards, controlled revisions, and organization-level knowledge management.",
  },
  {
    name: "ChangeOps",
    type: "Operational change management",
    description:
      "Change-request workflow and operational governance tooling designed around practical enterprise implementation work.",
  },
  {
    name: "PCCR",
    type: "Print compliance",
    description:
      "Printer configuration and compliance analysis built from real managed-print reporting and fleet-management problems.",
  },
  {
    name: "Licensing / Platform",
    type: "Commercial infrastructure",
    description:
      "Customer, product, licensing, activation, seller, and operational administration infrastructure for OneTime Labs software.",
  },
  {
    name: "Creator Software",
    type: "Broadcast tooling",
    description:
      "Streamer and creator utilities for moderation, broadcast control, overlays, safety workflows, and custom audience experiences.",
  },
  {
    name: "Custom Systems",
    type: "Client engineering",
    description:
      "Purpose-built internal tools and applications created when commercial software does not fit the actual workflow.",
  },
];

const useOfFunds = [
  { label: "Sales / customer acquisition", amount: "35%", detail: "Lead generation, outreach, sales tooling, and converting enterprise capability into repeatable pipeline." },
  { label: "Product development", amount: "30%", detail: "Engineering capacity, product completion, testing, integrations, packaging, and release work." },
  { label: "Infrastructure", amount: "15%", detail: "Production hosting, deployment systems, domains, storage, monitoring, email, and operational tooling." },
  { label: "Legal / IP / compliance", amount: "10%", detail: "Entity, contracts, intellectual-property work, securities counsel, accounting, and compliance preparation." },
  { label: "Operations", amount: "10%", detail: "Contractor capacity, administrative systems, insurance, equipment, and general operating needs." },
];

const risks = [
  "OneTime Labs is early-stage and future revenue is not guaranteed.",
  "The business is currently founder-dependent and key-person concentration is meaningful.",
  "Several products are still being developed, validated, packaged, or brought to market.",
  "Enterprise sales cycles can be long, irregular, and dependent on customer budgets and procurement timelines.",
  "A future investment structure, valuation, security type, investor rights, and offering exemption have not been finalized.",
  "Any investment in an early-stage private company can result in partial or total loss of capital and may be illiquid for an extended period.",
];

export default function InvestPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero otl-invest-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">INVEST IN ONETIME LABS</span>
              <h1>Build the company behind the software.</h1>
              <p>
                OneTime Labs combines enterprise consulting with commercially licensed software
                built from problems we have actually encountered in operations. We are evaluating
                a future capital raise and are currently collecting non-binding indications of
                interest from people who want to follow that process.
              </p>
              <div className="otl-invest-hero-actions">
                <a className="otl-button otl-button-primary" href="#interest">
                  Register interest <ArrowRight size={14} />
                </a>
                <Link className="otl-button otl-button-secondary" href="/software">
                  View software portfolio
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary" aria-label="Investment profile summary">
              <div><span>Status</span><strong>Future offering under evaluation</strong></div>
              <div><span>Today</span><strong>Non-binding investor interest only</strong></div>
              <div><span>Funds</span><strong>No investment funds accepted on this page</strong></div>
              <div><span>Structure</span><strong>Terms and security type not yet finalized</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">01 / COMPANY</span>
                <h2>Enterprise work funds product thinking. Product thinking improves the enterprise work.</h2>
                <p>OneTime Labs is being built around two connected engines: senior technical services and owned software.</p>
              </div>
            </div>

            <div className="otl-invest-thesis-grid">
              <article>
                <BriefcaseBusiness size={18} />
                <h3>Enterprise consulting</h3>
                <p>Vendor migration, Managed Print Services, ITAM/SAM, architecture, operational governance, and senior implementation support.</p>
              </article>
              <article>
                <Code2 size={18} />
                <h3>Commercial software</h3>
                <p>Tools built from operational gaps instead of trend-chasing: documentation, compliance, licensing, workflow, and creator utilities.</p>
              </article>
              <article>
                <Landmark size={18} />
                <h3>Ownership-first model</h3>
                <p>Where practical, OneTime Labs favors perpetual or locally controlled software over forcing every useful tool into another permanent subscription.</p>
              </article>
            </div>
          </section>

          <section className="otl-section" id="portfolio">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">02 / PORTFOLIO</span>
                <h2>Products already exist. This is not a pitch deck full of rectangles.</h2>
                <p>The portfolio spans enterprise operations, software infrastructure, and creator tooling.</p>
              </div>
              <Link href="/software">Explore software <ArrowRight size={13} /></Link>
            </div>

            <div className="otl-invest-portfolio-grid">
              {portfolio.map((item) => (
                <article key={item.name}>
                  <span>{item.type}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">03 / SERVICES</span>
                <h2>The current revenue engine is enterprise technical work.</h2>
                <p>Published consulting rates give the company a services path while the software portfolio matures.</p>
              </div>
              <Link href="/pricing">Full pricing <ArrowRight size={13} /></Link>
            </div>

            <div className="otl-invest-service-table">
              {consultingPricing.slice(0, 6).map((item) => (
                <div key={item.service}>
                  <strong>{item.service}</strong>
                  <span>{item.price}</span>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="otl-section otl-invest-business-model">
            <div className="otl-two-column-panel">
              <div className="otl-panel-lead">
                <span className="otl-eyebrow otl-eyebrow-dark">04 / BUSINESS MODEL</span>
                <h2>Multiple ways to make money without turning everything into SaaS.</h2>
                <p>
                  The goal is a practical mix of consulting cash flow and product revenue. Services
                  solve immediate customer problems; products package repeatable solutions and create
                  assets that can sell beyond a single engagement.
                </p>
              </div>
              <div className="otl-invest-model-list">
                <div><strong>Consulting</strong><span>Hourly, daily, and scoped enterprise engagements.</span></div>
                <div><strong>Software licensing</strong><span>Commercial licenses, including perpetual licensing where the product model supports it.</span></div>
                <div><strong>Implementation</strong><span>Configuration, migration, deployment, integration, and operational handoff.</span></div>
                <div><strong>Support / maintenance</strong><span>Optional ongoing technical support where a customer wants continued involvement.</span></div>
                <div><strong>Custom engineering</strong><span>Client-specific operational systems that can also inform future reusable products.</span></div>
              </div>
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">05 / USE OF CAPITAL</span>
                <h2>What additional capital would actually do.</h2>
                <p>This is a planning allocation, not a finalized offering budget or promise of exact spending percentages.</p>
              </div>
            </div>

            <div className="otl-invest-funds">
              {useOfFunds.map((item) => (
                <div className="otl-invest-fund-row" key={item.label}>
                  <strong>{item.amount}</strong>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-invest-roadmap-grid">
              <article>
                <Target size={18} />
                <span className="otl-eyebrow otl-eyebrow-dark">06 / NEAR TERM</span>
                <h3>Turn capability into pipeline.</h3>
                <p>Formalize sales outreach, strengthen the consulting funnel, package product demos, and create repeatable customer acquisition instead of relying on one-off introductions.</p>
              </article>
              <article>
                <Wrench size={18} />
                <span className="otl-eyebrow otl-eyebrow-dark">07 / PRODUCT</span>
                <h3>Finish, harden, ship.</h3>
                <p>Move the strongest software from working product to sellable product: documentation, onboarding, licensing, support paths, deployment, and customer-facing packaging.</p>
              </article>
              <article>
                <Gauge size={18} />
                <span className="otl-eyebrow otl-eyebrow-dark">08 / SCALE</span>
                <h3>Reduce founder bottlenecks.</h3>
                <p>Add contractor and specialist capacity where it creates leverage, while keeping architecture, standards, and product direction coherent.</p>
              </article>
            </div>
          </section>

          <section className="otl-section">
            <div className="otl-two-column-panel otl-invest-founder-panel">
              <div className="otl-panel-lead">
                <span className="otl-eyebrow otl-eyebrow-dark">09 / FOUNDER</span>
                <h2>Built from enterprise operations, not startup cosplay.</h2>
                <p>
                  OneTime Labs is founder-led by an enterprise technologist whose background spans
                  managed print, IT asset management, software licensing, vendor transitions,
                  operational architecture, and internal tooling. The products exist because the
                  same categories of ugly operational problems keep appearing inside real environments.
                </p>
              </div>
              <div className="otl-invest-founder-facts">
                <div><Network size={16} /><span>Large enterprise environments and vendor transitions</span></div>
                <div><Building2 size={16} /><span>ITAM, SAM, managed print, infrastructure, and operations</span></div>
                <div><Code2 size={16} /><span>Purpose-built software and internal automation</span></div>
                <div><FileSearch size={16} /><span>Documentation, standards, governance, and technical process</span></div>
              </div>
            </div>
          </section>

          <section className="otl-section" id="financials">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">10 / FINANCIAL SNAPSHOT</span>
                <h2>No fake hockey-stick chart.</h2>
                <p>Detailed company financials are not being published on this preliminary interest page because an offering and disclosure package have not been prepared yet.</p>
              </div>
            </div>

            <div className="otl-invest-financial-grid">
              <article>
                <span>CURRENT PUBLIC VIEW</span>
                <strong>Services + product development</strong>
                <p>The public site shows current consulting pricing and a growing software portfolio, but does not represent unaudited revenue, profit, cash, or valuation figures as settled investor data.</p>
              </article>
              <article>
                <span>BEFORE AN OFFERING</span>
                <strong>Actual historical numbers</strong>
                <p>Revenue, operating expenses, cash position, liabilities, ownership/capitalization, material contracts, and other required financial disclosures would be assembled from company records.</p>
              </article>
              <article>
                <span>THE RULE</span>
                <strong>Do not invent the number</strong>
                <p>Valuation and ownership economics belong in the actual offering terms after the legal entity, capitalization, instrument, and raise structure are established.</p>
              </article>
            </div>
          </section>

          <section className="otl-section" id="structure">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">11 / INVESTMENT STRUCTURE</span>
                <h2>The future security has not been chosen yet.</h2>
                <p>We are intentionally separating investor interest from the eventual legal offering.</p>
              </div>
            </div>

            <div className="otl-invest-structure-grid">
              <article>
                <strong>Possible future structures</strong>
                <p>Depending on legal and tax advice, a future raise could use equity, a SAFE, Regulation Crowdfunding, a Rule 506(c) offering, or another compliant structure.</p>
              </article>
              <article>
                <strong>What is not being promised</strong>
                <p>No valuation, valuation cap, ownership percentage, voting rights, return, dividend, liquidity event, or investor tier is being promised by this page.</p>
              </article>
              <article>
                <strong>What happens before money</strong>
                <p>The entity, security, offering exemption, disclosures, investor eligibility, legal documents, and transaction process would be established before investment funds are accepted.</p>
              </article>
            </div>
          </section>

          <section className="otl-section" id="risks">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">12 / RISKS</span>
                <h2>Early-stage means risk. Put it on the page.</h2>
                <p>This is a preliminary profile, not a substitute for the disclosures that would accompany an actual offering.</p>
              </div>
            </div>

            <div className="otl-invest-risk-box">
              <ShieldAlert size={20} />
              <div>
                {risks.map((risk) => <p key={risk}>{risk}</p>)}
              </div>
            </div>
          </section>

          <section className="otl-section otl-invest-interest-section" id="interest">
            <div className="otl-invest-interest-copy">
              <span className="otl-eyebrow otl-eyebrow-dark">13 / INVESTOR INTEREST</span>
              <h2>Interested in the future round?</h2>
              <p>
                Register a non-binding indication of interest. This helps OneTime Labs understand
                whether there is enough demand to justify the legal, accounting, and platform work
                required to prepare an actual offering.
              </p>

              <div className="otl-invest-legal-box">
                <strong>No securities are being sold through this page.</strong>
                <p>
                  No money or other consideration is being solicited, and if sent in response, will
                  not be accepted. No offer to buy securities can be accepted and no part of a
                  purchase price can be received until the applicable offering requirements have
                  been satisfied. An indication of interest involves no obligation or commitment of
                  any kind.
                </p>
              </div>

              <Link className="otl-invest-support-link" href="/contribute">
                Looking to support the work without ownership? Go to Support OTL <ArrowRight size={12} />
              </Link>
            </div>

            <InvestInterestForm />
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
