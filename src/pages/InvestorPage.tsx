import {
  ArrowRight,
  Banknote,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileText,
  Gauge,
  Layers3,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import InvestorNav from "../components/InvestorNav";

/* ==========================================================
   INVESTOR OVERVIEW 001
   7-10 second skim-first investor landing page
   ========================================================== */

export default function InvestorPage() {
  return (
    <>
      <InvestorNav />

      <main className="investor-overview-page">
        {/* ====================================================
            INVESTOR OVERVIEW 002
            Hero: the whole company in one screen
            ==================================================== */}
        <section className="investor-hero">
          <div className="store-shell investor-hero-grid">
            <div className="investor-hero-copy">
              <span className="investor-kicker">INVESTOR OVERVIEW · SEPTEMBER 2026</span>
              <h1>Enterprise engineering without artificial dependency.</h1>
              <p>
                OneTime Labs combines consulting, custom software, managed technology,
                and commercial products under one founder-led engineering company.
              </p>

              <div className="investor-hero-actions">
                <NavLink className="button primary" to="/business/plan">
                  <FileText size={15} />
                  Read the business plan
                </NavLink>
                <NavLink className="button investor-button-ghost" to="/business/plan?export=1">
                  <Download size={15} />
                  Export PDF
                </NavLink>
              </div>
            </div>

            <div className="investor-snapshot" aria-label="Investor snapshot">
              <div>
                <span>YEAR 1 PLAN</span>
                <strong>$285K</strong>
                <small>total revenue</small>
              </div>
              <div>
                <span>YEAR 3 PLAN</span>
                <strong>$900K</strong>
                <small>total revenue</small>
              </div>
              <div>
                <span>GROWTH ROUND</span>
                <strong>$100K-$250K</strong>
                <small>planning target</small>
              </div>
              <div>
                <span>REVENUE ENGINES</span>
                <strong>3</strong>
                <small>services · software · support</small>
              </div>
            </div>
          </div>
        </section>

        <div className="store-shell investor-overview-content">
          {/* ==================================================
              INVESTOR OVERVIEW 003
              What the company actually sells
              ================================================== */}
          <section className="investor-section investor-section-tight">
            <div className="investor-section-heading">
              <div>
                <span className="eyebrow dark">THE BUSINESS</span>
                <h2>Three revenue engines. One engineering core.</h2>
              </div>
              <p>
                Consulting generates cash now. Customer work exposes repeatable problems.
                Repeatable problems become products and long-term intellectual property.
              </p>
            </div>

            <div className="investor-engine-grid">
              <article className="investor-engine-card">
                <span className="investor-card-icon"><BriefcaseBusiness size={20} /></span>
                <strong>Consulting & migrations</strong>
                <p>Vendor migrations, architecture, ITAM/SAM, print infrastructure, modernization, and technical project leadership.</p>
              </article>

              <article className="investor-engine-card">
                <span className="investor-card-icon"><Blocks size={20} /></span>
                <strong>Commercial software</strong>
                <p>Purpose-built products including OTLES, ChangeOps, PCCR, PlotMap, OTLAM, licensing infrastructure, TVM, and related tools.</p>
              </article>

              <article className="investor-engine-card">
                <span className="investor-card-icon"><Layers3 size={20} /></span>
                <strong>Managed services & support</strong>
                <p>Optional support, hosting, maintenance, administration, monitoring, and managed technology after implementation.</p>
              </article>
            </div>
          </section>

          {/* ==================================================
              INVESTOR OVERVIEW 004
              Fast thesis
              ================================================== */}
          <section className="investor-section">
            <div className="investor-section-heading compact">
              <div>
                <span className="eyebrow dark">WHY THIS MODEL</span>
                <h2>Cash-flow first. Product upside second.</h2>
              </div>
            </div>

            <div className="investor-thesis-grid">
              <article>
                <Gauge size={18} />
                <div><strong>Lean operating model</strong><span>Remote-first infrastructure, limited fixed overhead, and contractors before premature payroll.</span></div>
              </article>
              <article>
                <TrendingUp size={18} />
                <div><strong>Service revenue funds product development</strong><span>The company does not need software sales alone to finance engineering.</span></div>
              </article>
              <article>
                <ShieldCheck size={18} />
                <div><strong>Ownership-friendly positioning</strong><span>Recurring revenue comes from continuing service and support rather than mandatory permission to keep using purchased software.</span></div>
              </article>
              <article>
                <Rocket size={18} />
                <div><strong>Capital accelerates execution</strong><span>Funding is intended for engineering capacity, product completion, sales, customer acquisition, and working capital.</span></div>
              </article>
            </div>
          </section>

          {/* ==================================================
              INVESTOR OVERVIEW 005
              Planning model
              ================================================== */}
          <section className="investor-section">
            <div className="investor-section-heading">
              <div>
                <span className="eyebrow dark">PLANNING MODEL</span>
                <h2>Services lead early; product revenue grows into the mix.</h2>
              </div>
              <p>These figures are planning assumptions, not historical results or guaranteed forecasts.</p>
            </div>

            <div className="investor-financial-strip">
              <div><span>Year 1 revenue</span><strong>$285,000</strong></div>
              <div><span>Year 2 revenue</span><strong>$520,000</strong></div>
              <div><span>Year 3 revenue</span><strong>$900,000</strong></div>
              <div><span>Year 3 operating profit</span><strong>$273,000</strong></div>
            </div>
          </section>

          {/* ==================================================
              INVESTOR OVERVIEW 006
              Capital summary + CTA
              ================================================== */}
          <section className="investor-capital-card">
            <div className="investor-capital-icon"><Banknote size={28} /></div>
            <div className="investor-capital-copy">
              <span className="eyebrow dark">CAPITAL</span>
              <h2>Targeting a $100K-$250K growth round.</h2>
              <p>
                The plan uses a $200,000 example allocation: 35% engineering and contractors,
                20% operating runway, 15% sales, 10% product infrastructure, 10% marketing,
                5% legal/accounting, and 5% contingency.
              </p>
              <div className="investor-legal-note">
                <CheckCircle2 size={15} />
                <span>Equity percentages and investor terms are intentionally not promised publicly until legal structure, capitalization, valuation, and securities documentation are established.</span>
              </div>
            </div>
            <div className="investor-capital-actions">
              <NavLink className="button primary" to="/business/plan">
                Full plan <ArrowRight size={14} />
              </NavLink>
              <NavLink className="button secondary" to="/business/plan?export=1">
                <Download size={14} /> PDF
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
