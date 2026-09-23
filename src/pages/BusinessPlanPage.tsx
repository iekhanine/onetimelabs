import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  Blocks,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  Gauge,
  Globe2,
  Handshake,
  Landmark,
  Layers3,
  MapPin,
  Network,
  Rocket,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import InvestorNav from "../components/InvestorNav";

/* ==========================================================
   BUSINESS PLAN 001
   Investor-oriented rewrite of the September 2026 plan
   ========================================================== */

function exportPdf() {
  const previousTitle = document.title;
  document.title = "OneTime-Labs-Business-Plan-September-2026";
  document.body.classList.add("business-plan-exporting");

  const cleanup = () => {
    document.body.classList.remove("business-plan-exporting");
    document.title = previousTitle;
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
  window.print();
}

function PlanSection({
  id,
  number,
  eyebrow,
  title,
  children,
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="plan-section">
      <div className="plan-section-title">
        <span className="plan-section-number">{number}</span>
        <div>
          <span className="eyebrow dark">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function PlanCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`plan-card ${className}`.trim()}>
      <div className="plan-card-heading">
        {icon ? <span className="plan-card-icon">{icon}</span> : null}
        <strong>{title}</strong>
      </div>
      <div className="plan-card-body">{children}</div>
    </article>
  );
}

export default function BusinessPlanPage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("export") !== "1") return;

    const timer = window.setTimeout(() => exportPdf(), 350);
    return () => window.clearTimeout(timer);
  }, [location.search]);

  return (
    <>
      <InvestorNav />

      <main className="store-shell business-plan-page">
        {/* ====================================================
            BUSINESS PLAN 002
            Document header and investor controls
            ==================================================== */}
        <header className="plan-document-header">
          <div>
            <span className="investor-kicker">ONETIME LABS · BUSINESS PLAN</span>
            <h1>Build once. Own forever.</h1>
            <p>
              Investor-oriented business plan · Version 1.0 · September 2026 · Draft
            </p>
          </div>
          <div className="plan-header-actions no-print">
            <NavLink className="button secondary" to="/business">
              Investor overview
            </NavLink>
            <button className="button primary" type="button" onClick={exportPdf}>
              <Download size={15} />
              Export PDF
            </button>
          </div>
        </header>

        {/* ====================================================
            BUSINESS PLAN 003
            On-page table of contents
            ==================================================== */}
        <nav className="plan-toc no-print" aria-label="Business plan sections">
          <a href="#company">Company</a>
          <a href="#revenue">Revenue</a>
          <a href="#market">Market</a>
          <a href="#commercial">Commercial model</a>
          <a href="#go-to-market">Go-to-market</a>
          <a href="#operations">Operations</a>
          <a href="#financials">Financials</a>
          <a href="#capital">Capital</a>
          <a href="#risks">Risks & milestones</a>
          <a href="#opportunity">Long-term opportunity</a>
        </nav>

        {/* ====================================================
            BUSINESS PLAN 004
            One-page executive synopsis inside full plan
            ==================================================== */}
        <section className="plan-executive-card">
          <div className="plan-executive-copy">
            <span className="eyebrow dark">EXECUTIVE SYNOPSIS</span>
            <h2>A small engineering company designed to turn real operational problems into consulting revenue and reusable software.</h2>
            <p>
              OneTime Labs designs, migrates, builds, implements, and supports operational technology.
              The company uses consulting and project revenue to finance a growing portfolio of commercial software,
              while optional support and managed services create recurring relationships without forcing customers into perpetual software rent.
            </p>
          </div>
          <div className="plan-executive-metrics">
            <div><span>Year 1 revenue plan</span><strong>$285K</strong></div>
            <div><span>Year 3 revenue plan</span><strong>$900K</strong></div>
            <div><span>Monthly revenue milestone</span><strong>$25K</strong></div>
            <div><span>Growth round target</span><strong>$100K-$250K</strong></div>
          </div>
        </section>

        <PlanSection id="company" number="01" eyebrow="COMPANY & THESIS" title="Solve the operational problem first. Choose the technology second.">
          <div className="plan-grid plan-grid-2">
            <PlanCard icon={<Building2 size={18} />} title="Company concept">
              <p>
                OneTime Labs is an independent software engineering and technology consulting company.
                It operates across architecture, migrations, custom development, implementation, managed technology,
                and commercial software when those disciplines are required to solve the customer problem correctly.
              </p>
              <p>
                The company is intentionally vendor-neutral: implement an existing product when it fits; engineer a purpose-built alternative when it does not.
              </p>
            </PlanCard>

            <PlanCard icon={<ShieldCheck size={18} />} title="Core philosophy">
              <p><strong>Technology should solve a problem - not automatically become another permanent subscription.</strong></p>
              <p>
                OneTime Labs is not opposed to recurring revenue. It is opposed to artificial dependency.
                Customers may pay for ongoing support, hosting, monitoring, maintenance, administration, or feature work because those services continue to create value.
              </p>
            </PlanCard>

            <PlanCard icon={<Layers3 size={18} />} title="Three connected businesses">
              <ul>
                <li><strong>Consulting & engineering:</strong> high-value project work and specialized expertise.</li>
                <li><strong>Commercial software:</strong> purpose-built applications and reusable intellectual property.</li>
                <li><strong>Managed technology:</strong> optional support and administration after delivery.</li>
              </ul>
            </PlanCard>

            <PlanCard icon={<MapPin size={18} />} title="Delivery model & geography">
              <p>
                Initial business development is concentrated in Racine, Milwaukee, and Chicago,
                while consulting, engineering, development, and migration work can be delivered nationally and remotely.
              </p>
              <p>
                The company is founder-led, remote-capable, and structured to keep fixed overhead low while customer demand is still being established.
              </p>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="revenue" number="02" eyebrow="REVENUE ENGINES" title="Consulting pays today. Products create scalable upside.">
          <div className="plan-grid plan-grid-2">
            <PlanCard icon={<BriefcaseBusiness size={18} />} title="Enterprise consulting & vendor migrations">
              <p>Primary service areas include:</p>
              <ul className="plan-columns-2">
                <li>Vendor migrations</li><li>Systems architecture</li><li>Infrastructure modernization</li><li>Technology assessments</li>
                <li>IT asset management</li><li>Software asset management</li><li>Governance & documentation</li><li>Technical project leadership</li>
                <li>Platform implementation</li><li>Application modernization</li><li>Workflow automation</li><li>Operational process design</li>
              </ul>
              <p>
                Migration work is particularly attractive because organizations often need senior expertise during a transition without needing that expertise permanently afterward.
              </p>
            </PlanCard>

            <PlanCard icon={<Wrench size={18} />} title="Managed Print Services specialization">
              <p>
                OneTime Labs has a focused enterprise-print capability covering fleet management, Windows print infrastructure,
                PrinterLogic, Web JetAdmin, device configuration, vendor transitions, compliance reporting, security, standardization,
                print-server migration, fleet optimization, policy, and lifecycle management.
              </p>
              <p>
                PCCR - Printer Configuration Compliance Reporting - is an example of converting that operational knowledge into reusable software.
              </p>
            </PlanCard>

            <PlanCard icon={<Blocks size={18} />} title="Custom software engineering">
              <p>
                Custom engagements include internal business applications, dashboards, workflow systems, asset and inventory platforms,
                documentation systems, approval workflows, customer portals, mapping platforms, licensing systems, integrations,
                data-processing tools, and specialized industry applications.
              </p>
              <p>
                Architecture, interface design, database design, development, deployment, documentation, training, and handoff can all be included in one engagement.
              </p>
            </PlanCard>

            <PlanCard icon={<Network size={18} />} title="Commercial software portfolio">
              <ul>
                <li><strong>OTLES:</strong> structured organizational documentation and engineering standards.</li>
                <li><strong>ChangeOps:</strong> focused technology change management and CAB governance.</li>
                <li><strong>PCCR:</strong> printer-fleet configuration compliance reporting.</li>
                <li><strong>OTLAM:</strong> flexible asset-management architecture.</li>
                <li><strong>PlotMap:</strong> operational records combined with geospatial mapping.</li>
                <li><strong>OneTime Labs Licensing:</strong> shared commercial licensing infrastructure.</li>
                <li><strong>TVM / Tasks / publishing & entertainment tools:</strong> proof that the engineering model extends beyond traditional corporate IT.</li>
              </ul>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="market" number="03" eyebrow="CUSTOMERS & MARKET" title="Target specialized problems where a giant platform or giant consulting firm is unnecessary.">
          <div className="plan-grid plan-grid-2">
            <PlanCard icon={<Users size={18} />} title="Small & mid-sized organizations">
              <p>
                Primary SMB profile: roughly <strong>5-500 employees</strong> that need professional architecture,
                integration, security, modernization, development, or operational technology without a permanent senior engineering staff.
              </p>
              <p>
                Relevant industries include manufacturing, professional services, hospitality, property management,
                healthcare support, logistics, retail, bars and restaurants, local government, associations, and nonprofits.
              </p>
            </PlanCard>

            <PlanCard icon={<Landmark size={18} />} title="Enterprise & channel customers">
              <p>
                Enterprise organizations can engage OneTime Labs as a consultant, subcontractor, or specialist project resource for migrations,
                print transformation, asset management, internal development, architecture, governance, and technical project delivery.
              </p>
              <p>
                Technology vendors, MSPs, and consulting firms can also use OneTime Labs as a specialist subcontractor rather than a direct competitor.
              </p>
            </PlanCard>

            <PlanCard icon={<Globe2 size={18} />} title="Market opportunity">
              <p>
                The plan cites approximately <strong>36.2 million U.S. small businesses as of February 2026</strong>, including roughly 6.4 million with paid employees.
                It also cites continued growth in computer-systems services and approximately 16% projected software-development employment growth from 2024-2034.
              </p>
              <p>
                OneTime Labs does not require broad market share. A small base of recurring consulting customers, migration projects,
                custom builds, and license customers can support a lean engineering organization.
              </p>
            </PlanCard>

            <PlanCard icon={<Target size={18} />} title="Competitive position">
              <ul>
                <li><strong>Large consultancies:</strong> more scale; OneTime Labs competes on access, specialization, speed, and overhead.</li>
                <li><strong>MSPs:</strong> standardized recurring IT; OneTime Labs can complement them with projects, architecture, and custom engineering.</li>
                <li><strong>SaaS vendors:</strong> broad products; OneTime Labs targets poor fit, excess complexity, cost, or dependency.</li>
                <li><strong>Freelancers:</strong> often compete on price; OneTime Labs differentiates through enterprise operations, governance, documentation, and maintainability.</li>
              </ul>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="commercial" number="04" eyebrow="COMMERCIAL MODEL" title="Price expertise, project value, software ownership, and ongoing service separately.">
          <div className="plan-table-card">
            <table className="plan-table">
              <thead><tr><th>Revenue line</th><th>Planning range</th><th>Commercial structure</th></tr></thead>
              <tbody>
                <tr><td>Consulting</td><td>$150-$225 / hour</td><td>Hourly, daily, retainer, or fixed project.</td></tr>
                <tr><td>Custom development</td><td>$5,000-$100,000+</td><td>Milestone-based project billing.</td></tr>
                <tr><td>Vendor migrations</td><td>$10,000-$150,000+</td><td>Fixed scope priced around complexity and business impact.</td></tr>
                <tr><td>Software licenses</td><td>$500-$50,000+</td><td>Perpetual or customer-friendly organization licensing, product dependent.</td></tr>
                <tr><td>Support & maintenance</td><td>15%-25% of license value annually</td><td>Optional ongoing technical support and maintenance.</td></tr>
                <tr><td>Managed services</td><td>Engagement specific</td><td>Recurring fee for continuing service, not continued permission to use purchased software.</td></tr>
              </tbody>
            </table>
          </div>

          <div className="plan-grid plan-grid-2 plan-grid-after-table">
            <PlanCard icon={<Handshake size={18} />} title="Customer acquisition process">
              <p className="plan-process-line">Inquiry → Discovery → Assessment → Proposal → Contract → Deposit → Engineering → Acceptance → Handoff → Support</p>
              <p>
                Initial discovery may be free for qualified opportunities. Detailed technical assessments should become paid consulting.
                Development work should use deposits and milestone billing.
              </p>
            </PlanCard>

            <PlanCard icon={<Banknote size={18} />} title="Typical project billing">
              <div className="plan-milestones">
                <span><strong>30%</strong> project start</span>
                <span><strong>30%</strong> design / prototype approval</span>
                <span><strong>30%</strong> production delivery</span>
                <span><strong>10%</strong> final acceptance</span>
              </div>
              <p>Large projects can use more granular milestones as scope and risk require.</p>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="go-to-market" number="05" eyebrow="GO-TO-MARKET" title="Lead with solved problems, not generic transformation language.">
          <div className="plan-grid plan-grid-3">
            <PlanCard icon={<ArrowUpRight size={18} />} title="Sales">
              <p>
                Founder-led sales initially, using direct outreach, local networking, LinkedIn, professional relationships,
                recruiters, consulting firms, MSP and print-vendor partnerships, referrals, business organizations,
                demos, case studies, and the OneTime Labs website.
              </p>
            </PlanCard>

            <PlanCard icon={<FileText size={18} />} title="Marketing">
              <p>
                Show the problem, the system, how it works, and what the customer owns afterward.
                Primary assets should be demonstrations, screenshots, architecture diagrams, migration stories,
                case studies, technical articles, engineering documentation, and project summaries.
              </p>
            </PlanCard>

            <PlanCard icon={<MapPin size={18} />} title="Initial markets">
              <p>
                Direct prospecting starts in Racine, Milwaukee, and Chicago, with remote delivery expanding the addressable market nationally.
                The local market also supports smaller technology engagements that larger consultancies often ignore.
              </p>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="operations" number="06" eyebrow="OPERATIONS, TECHNOLOGY & IP" title="Stay lean, document aggressively, and reuse infrastructure across products.">
          <div className="plan-grid plan-grid-2">
            <PlanCard icon={<Gauge size={18} />} title="Lean operations">
              <p>
                The company does not initially require expensive office space, physical inventory, manufacturing facilities,
                or a large permanent workforce. Core development and operating systems are cloud-based and remote-capable.
              </p>
              <p>
                Contractors should be used for specialized or project-based capacity before permanent headcount is added.
              </p>
            </PlanCard>

            <PlanCard icon={<Network size={18} />} title="Reusable platform strategy">
              <p>Shared components are intended to reduce the marginal cost of future products:</p>
              <ul className="plan-columns-2">
                <li>Authentication</li><li>Organization management</li><li>Licensing</li><li>Roles & permissions</li>
                <li>Administration</li><li>Billing</li><li>Notifications</li><li>Audit logging</li><li>Deployment tooling</li>
              </ul>
            </PlanCard>

            <PlanCard icon={<Scale size={18} />} title="Intellectual property">
              <ul>
                <li><strong>OneTime Labs products:</strong> company-owned IP licensed to customers.</li>
                <li><strong>Customer-specific development:</strong> ownership defined explicitly by contract.</li>
                <li><strong>Reusable frameworks and pre-existing components:</strong> normally retained by OneTime Labs unless specifically sold.</li>
                <li><strong>Third-party projects:</strong> separated clearly from OneTime Labs-owned products in portfolio presentation.</li>
              </ul>
            </PlanCard>

            <PlanCard icon={<Users size={18} />} title="Management & hiring">
              <p>
                The founder currently covers architecture, engineering, product strategy, customer discovery, technical consulting,
                project management, business development, and product development, drawing on enterprise work in managed print,
                IT asset management, vendor transitions, infrastructure operations, large device fleets, and technical delivery.
              </p>
              <p>
                Likely early additions: contract software engineer, UI/UX designer, sales/business development,
                support engineer, and project manager - added only when revenue and delivery load justify them.
              </p>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="financials" number="07" eyebrow="FINANCIAL PLAN" title="A service-led base case that shifts toward software and recurring service over time.">
          <p className="plan-assumption-note">
            <strong>Important:</strong> the following figures are planning assumptions, not historical financial results and not guaranteed forecasts.
          </p>

          <div className="plan-table-card plan-financial-table-card">
            <table className="plan-table plan-financial-table">
              <thead><tr><th>Revenue</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead>
              <tbody>
                <tr><td>Consulting & migrations</td><td>$180,000</td><td>$300,000</td><td>$450,000</td></tr>
                <tr><td>Managed Print / managed services</td><td>$45,000</td><td>$90,000</td><td>$160,000</td></tr>
                <tr><td>Software licensing</td><td>$40,000</td><td>$85,000</td><td>$180,000</td></tr>
                <tr><td>Custom development</td><td>$20,000</td><td>$45,000</td><td>$110,000</td></tr>
                <tr className="plan-table-total"><td>Total revenue</td><td>$285,000</td><td>$520,000</td><td>$900,000</td></tr>
              </tbody>
            </table>
          </div>

          <div className="plan-table-card plan-grid-after-table">
            <table className="plan-table plan-financial-table">
              <thead><tr><th>Delivery & profitability</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead>
              <tbody>
                <tr><td>Revenue</td><td>$285,000</td><td>$520,000</td><td>$900,000</td></tr>
                <tr><td>Direct delivery costs</td><td>$62,700</td><td>$130,000</td><td>$252,000</td></tr>
                <tr className="plan-table-total"><td>Gross profit</td><td>$222,300</td><td>$390,000</td><td>$648,000</td></tr>
                <tr><td>Operating expenses</td><td>$145,000</td><td>$235,000</td><td>$375,000</td></tr>
                <tr className="plan-table-total"><td>Operating profit</td><td>$77,300</td><td>$155,000</td><td>$273,000</td></tr>
              </tbody>
            </table>
          </div>

          <div className="plan-grid plan-grid-2 plan-grid-after-table">
            <PlanCard icon={<TrendingUp size={18} />} title="Mix shift">
              <p>
                Year One remains primarily service-driven. By Year Three, software licensing, managed services,
                and repeatable products are expected to represent a materially larger share of revenue,
                reducing the company's dependence on founder billable hours.
              </p>
            </PlanCard>
            <PlanCard icon={<Gauge size={18} />} title="Early break-even milestone">
              <p>
                A practical early milestone is <strong>$25,000 in consistent monthly revenue</strong> - enough to begin making more deliberate decisions around hiring,
                product investment, reserves, and recurring operating commitments.
              </p>
            </PlanCard>
          </div>
        </PlanSection>

        <PlanSection id="capital" number="08" eyebrow="CAPITAL & INVESTMENT READINESS" title="Raise capital only when it has a defined job.">
          <div className="plan-grid plan-grid-2">
            <PlanCard icon={<Banknote size={18} />} title="Funding target">
              <p>
                OneTime Labs can continue through customer-funded growth, outside investment, or a combination of both.
                The plan identifies an initial growth round of approximately <strong>$100,000-$250,000</strong>,
                depending on legal structure, valuation, and hiring plan.
              </p>
              <p>
                Capital is intended to accelerate revenue-producing capacity rather than fund overhead without a commercial path.
              </p>
            </PlanCard>

            <PlanCard icon={<Scale size={18} />} title="Investor terms are not pre-promised">
              <p>
                Equity percentages should not be publicly promised until company legal structure, capitalization,
                valuation, securities documentation, and investor terms have been established with qualified legal and financial professionals.
              </p>
              <p>
                That boundary is deliberate: the public business plan can explain the opportunity and intended use of capital without inventing a cap table.
              </p>
            </PlanCard>
          </div>

          <div className="plan-allocation-card">
            <div className="plan-allocation-heading">
              <span className="eyebrow dark">EXAMPLE $200,000 ALLOCATION</span>
              <h3>Put the majority of capital into capacity that can produce more revenue.</h3>
            </div>
            <div className="plan-allocation-grid">
              <div><strong>35%</strong><span>Engineering & contractors</span></div>
              <div><strong>20%</strong><span>Operating runway</span></div>
              <div><strong>15%</strong><span>Sales & business development</span></div>
              <div><strong>10%</strong><span>Product infrastructure</span></div>
              <div><strong>10%</strong><span>Marketing</span></div>
              <div><strong>5%</strong><span>Legal & accounting</span></div>
              <div><strong>5%</strong><span>Contingency</span></div>
            </div>
          </div>
        </PlanSection>

        <PlanSection id="risks" number="09" eyebrow="RISKS & MILESTONES" title="The near-term constraint is commercial execution, not the ability to create more software.">
          <div className="plan-risk-grid">
            <PlanCard icon={<AlertTriangle size={18} />} title="Founder dependency">
              <p><strong>Risk:</strong> architecture, delivery, and sales rely heavily on one person.</p>
              <p><strong>Mitigation:</strong> documentation, engineering standards, reusable architecture, contractors, source control, and structured project management.</p>
            </PlanCard>
            <PlanCard icon={<AlertTriangle size={18} />} title="Product sprawl">
              <p><strong>Risk:</strong> building more products than the company can effectively sell.</p>
              <p><strong>Mitigation:</strong> prioritize commercial validation and active buyers before adding products.</p>
            </PlanCard>
            <PlanCard icon={<AlertTriangle size={18} />} title="Sales capacity">
              <p><strong>Risk:</strong> engineering capability does not automatically create customers.</p>
              <p><strong>Mitigation:</strong> structured outbound sales, partnerships, referrals, and eventually dedicated business development.</p>
            </PlanCard>
            <PlanCard icon={<AlertTriangle size={18} />} title="Support load">
              <p><strong>Risk:</strong> installed software creates long-term support obligations.</p>
              <p><strong>Mitigation:</strong> standardized deployments, documentation, paid support agreements, and defined support boundaries.</p>
            </PlanCard>
            <PlanCard icon={<AlertTriangle size={18} />} title="Customer concentration">
              <p><strong>Risk:</strong> large engagements can dominate revenue.</p>
              <p><strong>Mitigation:</strong> maintain multiple service and software revenue streams.</p>
            </PlanCard>
            <PlanCard icon={<AlertTriangle size={18} />} title="Legal structure">
              <p><strong>Risk:</strong> licensing, investment, IP, and customer work require formal agreements.</p>
              <p><strong>Mitigation:</strong> standardize agreements and formal company structure before significant fundraising and larger engagements.</p>
            </PlanCard>
          </div>

          <div className="plan-priority-card">
            <span className="eyebrow dark">NEXT 12 MONTHS</span>
            <div className="plan-priority-grid">
              <div><CheckCircle2 size={15} /><span><strong>1.</strong> Close paying consulting engagements.</span></div>
              <div><CheckCircle2 size={15} /><span><strong>2.</strong> Select two or three products for active commercialization.</span></div>
              <div><CheckCircle2 size={15} /><span><strong>3.</strong> Publish case studies from completed systems.</span></div>
              <div><CheckCircle2 size={15} /><span><strong>4.</strong> Standardize contracts, licensing, support, and billing.</span></div>
              <div><CheckCircle2 size={15} /><span><strong>5.</strong> Formalize CRM and sales operations.</span></div>
              <div><CheckCircle2 size={15} /><span><strong>6.</strong> Turn successful delivery patterns into repeatable implementation packages.</span></div>
            </div>
          </div>
        </PlanSection>

        <PlanSection id="opportunity" number="10" eyebrow="LONG-TERM OPPORTUNITY" title="Turn enterprise experience into a compounding library of products, infrastructure, and customer relationships.">
          <div className="plan-flywheel">
            <div><span>1</span><strong>Consulting creates revenue</strong><small>High-value expertise funds operations now.</small></div>
            <div><span>2</span><strong>Projects expose problems</strong><small>Real customer work identifies repeatable pain.</small></div>
            <div><span>3</span><strong>Repeated problems become software</strong><small>Engineering creates reusable intellectual property.</small></div>
            <div><span>4</span><strong>Products scale beyond hours</strong><small>Licensing separates growth from pure labor.</small></div>
            <div><span>5</span><strong>Support deepens relationships</strong><small>Recurring service adds continuity without artificial lock-in.</small></div>
          </div>

          <div className="plan-positioning-card">
            <Rocket size={24} />
            <div>
              <span className="eyebrow dark">POSITIONING</span>
              <h3>Enterprise-quality technology without enterprise consulting overhead or unnecessary long-term software dependency.</h3>
              <p>
                When an existing solution works, OneTime Labs implements it. When it does not, OneTime Labs builds something better.
                When OneTime Labs builds it, the relationship is designed so the customer remains in control of its technology.
              </p>
            </div>
          </div>
        </PlanSection>

        <footer className="plan-document-footer">
          <div>
            <strong>OneTime Labs</strong>
            <span>Business Plan · Version 1.0 · September 2026 · Draft</span>
          </div>
          <span>Build once. Own forever.</span>
        </footer>
      </main>
    </>
  );
}
