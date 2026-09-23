import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  Download,
  FileText,
  Gauge,
  KeyRound,
  Landmark,
  MapPin,
  Printer,
  ShieldCheck,
  Store,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import "./BusinessPage.css";

/* ==========================================================
   BUSINESS PAGE 001
   OneTime Labs business plan data
   ========================================================== */

const businessNav = [
  ["Overview", "overview"],
  ["Services", "services"],
  ["Products", "products"],
  ["Market", "market"],
  ["Revenue", "revenue"],
  ["Financials", "financials"],
  ["Strategy", "strategy"],
  ["Risks", "risks"],
] as const;

const businessLines = [
  {
    icon: BriefcaseBusiness,
    title: "Enterprise Consulting",
    text: "Vendor migrations, systems architecture, ITAM/SAM, modernization, governance, documentation, and technical project leadership.",
  },
  {
    icon: Printer,
    title: "Managed Print",
    text: "Fleet assessments, print infrastructure, vendor transition, configuration compliance, optimization, and lifecycle management.",
  },
  {
    icon: Code2,
    title: "Custom Engineering",
    text: "Internal applications, dashboards, workflow systems, portals, integrations, automation, and purpose-built operational software.",
  },
  {
    icon: KeyRound,
    title: "Commercial Software",
    text: "OneTime Labs products licensed under ownership-friendly perpetual or customer-controlled commercial models.",
  },
];

const portfolio = [
  ["OTLES", "Structured organizational documentation and engineering standards."],
  ["OTML", "Purpose-built structured markup for engineering and operational documentation."],
  ["ChangeOps", "Change requests, implementation planning, CAB approval, governance, and audit history."],
  ["PCCR", "Printer Configuration Compliance Reporting for measurable fleet compliance."],
  ["OTLAM", "Modular asset management for IT assets and other operational asset classes."],
  ["PlotMap", "Operational records combined with geospatial mapping and field verification."],
  ["Licensing", "Product, customer, seat, activation, expiration, and licensing infrastructure."],
  ["TVM", "Browser-managed venue entertainment, digital displays, trivia, and audience participation."],
  ["Tasks", "Lightweight task management without enterprise project-management overhead."],
  ["Entertainment Platforms", "ROFFLE, IvanSays, UnfilteredLog, and other publishing/community systems."],
] as const;

const customerSegments = [
  {
    icon: Store,
    title: "Small + Mid-Sized Business",
    text: "Organizations that need senior technical capability but cannot justify a large consulting firm or permanent senior engineering staff.",
  },
  {
    icon: Building2,
    title: "Enterprise",
    text: "Specialized project work in vendor migrations, print transformation, asset management, software engineering, governance, and architecture.",
  },
  {
    icon: Users,
    title: "Technology Partners",
    text: "MSPs, vendors, recruiters, and consulting organizations requiring specialized subcontracted engineering or migration expertise.",
  },
];

const revenueRows = [
  ["Consulting", "$150-$225/hr", "Hourly, daily, retainer, or fixed project"],
  ["Custom development", "$5,000-$100,000+", "Milestone-based delivery"],
  ["Vendor migrations", "$10,000-$150,000+", "Scoped to complexity and business impact"],
  ["Commercial software", "$500-$50,000+", "Product and organization dependent"],
  ["Implementation", "Project based", "Installation, conversion, migration, configuration, and training"],
  ["Support", "15%-25% of license", "Optional annual support planning target"],
  ["Managed services", "Monthly", "Hosting, monitoring, administration, and continuing service"],
] as const;

const revenueProjection = [
  ["Consulting & migrations", "$180,000", "$300,000", "$450,000"],
  ["Managed Print / managed services", "$45,000", "$90,000", "$160,000"],
  ["Software licensing", "$40,000", "$85,000", "$180,000"],
  ["Custom development", "$20,000", "$45,000", "$110,000"],
  ["Total Revenue", "$285,000", "$520,000", "$900,000"],
] as const;

const profitProjection = [
  ["Revenue", "$285,000", "$520,000", "$900,000"],
  ["Direct delivery costs", "$62,700", "$130,000", "$252,000"],
  ["Gross Profit", "$222,300", "$390,000", "$648,000"],
  ["Operating expenses", "$145,000", "$235,000", "$375,000"],
  ["Operating Profit", "$77,300", "$155,000", "$273,000"],
] as const;

const priorities = [
  ["01", "Close paying consulting engagements", "Vendor migration, print infrastructure, asset management, architecture, and custom software are the shortest route to meaningful revenue."],
  ["02", "Commercialize two or three products", "Prioritize products with identifiable buyers rather than building a sales organization around every application at once."],
  ["03", "Publish case studies", "Turn completed systems into evidence of architecture, engineering, delivery, and operational results."],
  ["04", "Standardize contracts and billing", "Create the MSA, SOW, consulting agreement, software license, support agreement, NDA, and repeatable invoice process."],
  ["05", "Formalize sales operations", "Track leads, contacts, opportunities, proposals, contracts, projects, and follow-ups in one consistent pipeline."],
  ["06", "Build repeatable implementation packages", "Every successful delivery should reduce the cost and risk of the next deployment."],
] as const;

const risks = [
  ["Founder dependency", "Architecture, development, and sales currently depend heavily on one person.", "Documentation, standards, source control, reusable systems, contractors, and structured delivery."],
  ["Product sprawl", "Rapid engineering can create more products than the company can realistically market.", "Require commercial validation before expanding the active product portfolio."],
  ["Sales capacity", "Engineering capability does not automatically produce customers.", "Use structured outbound sales, partnerships, referrals, and dedicated business development."],
  ["Support load", "Installed products create continuing support expectations.", "Standardize deployments, documentation, paid support, and clear service boundaries."],
  ["Customer concentration", "A large engagement can make revenue dependent on one customer.", "Maintain multiple service and product revenue streams."],
  ["Legal structure", "Licensing, investment, IP, and custom development require formal agreements.", "Standardize contracts and complete appropriate company and fundraising legal work."],
] as const;

const advantages = [
  "Enterprise thinking without enterprise overhead",
  "Direct technical access to the people doing the work",
  "Vendor-neutral recommendations",
  "Ownership-friendly software licensing",
  "Custom engineering when commercial tools do not fit",
  "Operational experience rather than feature-first development",
  "Documentation and customer handoff designed into delivery",
];

/* ==========================================================
   BUSINESS PAGE 002
   Reusable content components
   ========================================================== */

function PlanSection({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="business-plan-section" id={id}>
      <div className="business-section-heading">
        <span className="business-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="business-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </div>
  );
}

/* ==========================================================
   BUSINESS PAGE 003
   /business
   ========================================================== */

export default function BusinessPage() {
  return (
    <main className="business-page">
      {/* ======================================================
          BUSINESS PAGE 004
          Prominent plan navigation
          ====================================================== */}
      <div className="business-plan-nav-wrap">
        <div className="store-shell business-plan-nav">
          <div className="business-plan-nav-title">
            <FileText size={21} />
            <div>
              <strong>Business Plan</strong>
              <span>OneTime Labs · Revision 1.0</span>
            </div>
          </div>

          <nav className="business-plan-nav-links" aria-label="Business plan sections">
            {businessNav.map(([label, id]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>

          <a
            className="business-pdf-button"
            href="/OneTime-Labs-Business-Plan.pdf"
            download
          >
            <Download size={18} />
            PDF
          </a>
        </div>
      </div>

      <div className="store-shell business-shell">
        {/* ====================================================
            BUSINESS PAGE 005
            Store-style lead panel
            ==================================================== */}
        <section className="business-hero" id="overview">
          <div className="business-hero-copy">
            <span className="business-eyebrow">ONETIME LABS · BUSINESS PLAN · SEPTEMBER 2026</span>
            <h1>Enterprise engineering without unnecessary dependency.</h1>
            <p className="business-hero-lede">
              OneTime Labs is a software engineering, technology consulting, and enterprise solutions company focused on solving operational problems with practical systems customers can understand, operate, and own.
            </p>

            <div className="business-hero-actions">
              <a className="button primary large" href="#services">
                Explore the business <ArrowRight size={17} />
              </a>
              <a className="button secondary large" href="/OneTime-Labs-Business-Plan.pdf" download>
                <Download size={17} /> Download PDF
              </a>
            </div>
          </div>

          <aside className="business-hero-panel">
            <div className="business-hero-panel-label">CORE POSITION</div>
            <blockquote>
              Technology should solve a problem - not automatically become another permanent subscription.
            </blockquote>
            <div className="business-status-grid">
              <div><span>MODEL</span><strong>Consulting + IP</strong></div>
              <div><span>MARKET</span><strong>B2B</strong></div>
              <div><span>FOCUS</span><strong>Enterprise + SMB</strong></div>
              <div><span>DELIVERY</span><strong>Project + License</strong></div>
            </div>
          </aside>
        </section>

        {/* ====================================================
            BUSINESS PAGE 006
            Executive summary
            ==================================================== */}
        <PlanSection
          eyebrow="01 · EXECUTIVE SUMMARY"
          title="A consulting company that also builds commercial software."
          intro="The company combines near-term services revenue with long-term software intellectual property. Consulting creates cash flow and exposes repeatable operational problems; product engineering turns those repeatable problems into scalable assets."
        >
          <div className="business-summary-grid">
            <Metric label="Initial Markets" value="Racine · Milwaukee · Chicago" note="Local and regional business development with national remote delivery." />
            <Metric label="Revenue Engines" value="3" note="Consulting, commercial software, and managed services/support." />
            <Metric label="Early Revenue Goal" value="$25K / month" note="A practical operating milestone before meaningful permanent hiring." />
            <Metric label="Growth Capital" value="$100K-$250K" note="Potential range only after legal structure, valuation, and use of proceeds are defined." />
          </div>

          <div className="business-two-column business-copy-panel-row">
            <article className="business-copy-panel">
              <h3>Mission</h3>
              <p>Build practical technology that organizations can understand, operate, and own while bringing enterprise-grade architecture, documentation, and operational thinking to customers that do not need enterprise consulting overhead.</p>
            </article>
            <article className="business-copy-panel">
              <h3>Vision</h3>
              <p>Build a durable engineering company with three complementary businesses: high-value consulting, commercial software, and optional managed technology services.</p>
            </article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 007
            Services
            ==================================================== */}
        <PlanSection
          id="services"
          eyebrow="02 · CORE BUSINESS LINES"
          title="Services built around the problem, not the product catalog."
          intro="OneTime Labs can recommend, implement, migrate, build, document, and support technology without requiring that every engagement end in a proprietary OneTime Labs product."
        >
          <div className="business-card-grid business-card-grid-four">
            {businessLines.map(({ icon: Icon, title, text }) => (
              <article className="business-service-card" key={title}>
                <div className="business-card-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="business-split-panel">
            <div>
              <span className="business-eyebrow">DELIVERY MODEL</span>
              <h3>Assess → Design → Implement → Transfer</h3>
            </div>
            <ol className="business-process-list">
              <li>Review the existing environment and operational problem.</li>
              <li>Document requirements and determine whether an existing product is appropriate.</li>
              <li>Design the implementation, migration, or purpose-built system.</li>
              <li>Deploy, test, document, and train.</li>
              <li>Transfer operational control to the customer.</li>
              <li>Provide optional ongoing support or managed service.</li>
            </ol>
          </div>

          <div className="business-feature-row">
            <div><Printer size={19} /><strong>Managed Print</strong><span>Fleet, infrastructure, configuration, lifecycle, and vendor transitions.</span></div>
            <div><Wrench size={19} /><strong>Vendor Migration</strong><span>Temporary senior expertise during high-risk technology transitions.</span></div>
            <div><Code2 size={19} /><strong>Custom Software</strong><span>Purpose-built systems when commercial tools are a poor operational fit.</span></div>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 008
            Products
            ==================================================== */}
        <PlanSection
          id="products"
          eyebrow="03 · COMMERCIAL SOFTWARE"
          title="A growing portfolio built from real operational requirements."
          intro="Products act both as commercial assets and as evidence that OneTime Labs can convert operational problems into functioning systems."
        >
          <div className="business-product-grid">
            {portfolio.map(([name, description]) => (
              <article className="business-product-card" key={name}>
                <div className="business-product-name">{name}</div>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="business-callout">
            <ShieldCheck size={23} />
            <div>
              <strong>The anti-SaaS principle is not anti-recurring-revenue.</strong>
              <p>Customers may pay for support, hosting, monitoring, administration, upgrades, feature development, or retainers. The distinction is that they continue paying because OneTime Labs continues delivering value - not simply because access to already-purchased software is being withheld.</p>
            </div>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 009
            Market
            ==================================================== */}
        <PlanSection
          id="market"
          eyebrow="04 · TARGET MARKET"
          title="From local operators to enterprise transformation projects."
          intro="The initial direct-sales footprint is southeastern Wisconsin and northern Illinois, while consulting and engineering delivery can be national."
        >
          <div className="business-card-grid business-card-grid-three">
            {customerSegments.map(({ icon: Icon, title, text }) => (
              <article className="business-audience-card" key={title}>
                <div className="business-card-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="business-market-grid">
            <article>
              <MapPin size={20} />
              <div><strong>Racine, Wisconsin</strong><span>Local SMB relationships and direct-access engineering.</span></div>
            </article>
            <article>
              <MapPin size={20} />
              <div><strong>Milwaukee, Wisconsin</strong><span>Manufacturing, healthcare, hospitality, professional services, and technology.</span></div>
            </article>
            <article>
              <MapPin size={20} />
              <div><strong>Chicago, Illinois</strong><span>Enterprise consulting, vendor migration, corporate engineering, and partnerships.</span></div>
            </article>
          </div>

          <div className="business-two-column business-copy-panel-row">
            <article className="business-copy-panel">
              <h3>Competitive position</h3>
              <p>OneTime Labs sits between large consulting firms, MSPs, SaaS vendors, and freelance development. The company can operate independently or alongside those providers when specialized architecture, migration, print, asset-management, or software engineering expertise is needed.</p>
            </article>
            <article className="business-copy-panel">
              <h3>Why customers choose OTL</h3>
              <ul className="business-check-list">
                {advantages.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}
              </ul>
            </article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 010
            Revenue
            ==================================================== */}
        <PlanSection
          id="revenue"
          eyebrow="05 · REVENUE MODEL"
          title="Diversified revenue without forcing everything into a subscription."
          intro="Planning ranges below are working commercial assumptions, not guaranteed customer pricing. Final pricing should reflect scope, risk, value, delivery cost, and market conditions."
        >
          <div className="business-table-wrap">
            <table className="business-table">
              <thead><tr><th>Revenue Line</th><th>Planning Range</th><th>Commercial Model</th></tr></thead>
              <tbody>
                {revenueRows.map(([line, price, model]) => (
                  <tr key={line}><td>{line}</td><td>{price}</td><td>{model}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="business-sales-grid">
            <article><Target size={21} /><strong>Founder-led sales</strong><span>Targeted outreach, networking, referrals, recruiters, MSPs, vendors, and demonstrations.</span></article>
            <article><FileText size={21} /><strong>Evidence-first marketing</strong><span>Show the problem, system, architecture, outcome, and ownership model instead of generic transformation slogans.</span></article>
            <article><Gauge size={21} /><strong>Consistent pipeline</strong><span>Inquiry → discovery → assessment → proposal → contract → deposit → delivery → acceptance → support.</span></article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 011
            Financials
            ==================================================== */}
        <PlanSection
          id="financials"
          eyebrow="06 · FINANCIAL MODEL"
          title="Service-led at launch; progressively less dependent on founder hours."
          intro="The following three-year figures are planning assumptions for business modeling. They are not historical results or guaranteed forecasts."
        >
          <div className="business-financial-grid">
            <div className="business-table-wrap">
              <div className="business-table-title"><CircleDollarSign size={18} /> Revenue Projection</div>
              <table className="business-table compact">
                <thead><tr><th>Revenue</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead>
                <tbody>{revenueProjection.map((r) => <tr key={r[0]}>{r.map((v) => <td key={v}>{v}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div className="business-table-wrap">
              <div className="business-table-title"><TrendingUp size={18} /> Operating Model</div>
              <table className="business-table compact">
                <thead><tr><th>Operating</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead>
                <tbody>{profitProjection.map((r) => <tr key={r[0]}>{r.map((v) => <td key={v}>{v}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>

          <div className="business-financial-callouts">
            <article><span>BREAK-EVEN OPERATING TARGET</span><strong>$25K / month</strong><p>Practical early milestone before expanding permanent headcount.</p></article>
            <article><span>POTENTIAL GROWTH ROUND</span><strong>$100K-$250K</strong><p>Only after legal structure, valuation, capitalization, and use of proceeds are formalized.</p></article>
            <article><span>EXAMPLE $200K USE</span><strong>35% engineering</strong><p>With remaining capital allocated across runway, sales, infrastructure, marketing, legal/accounting, and reserve.</p></article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 012
            Operations and strategy
            ==================================================== */}
        <PlanSection
          id="strategy"
          eyebrow="07 · OPERATIONS + STRATEGY"
          title="Stay lean, standardize delivery, and make every project improve the next one."
          intro="OneTime Labs should avoid building payroll or overhead faster than predictable revenue. Reusable infrastructure, formal engineering standards, and contractor capacity are the first scaling mechanisms."
        >
          <div className="business-strategy-grid">
            {priorities.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </article>
            ))}
          </div>

          <div className="business-three-year">
            <article><span>YEAR 1</span><strong>Commercial proof</strong><p>Multiple paying consulting customers, one repeatable commercial product, standard contracts, case studies, and predictable monthly revenue.</p></article>
            <article><span>YEAR 2</span><strong>Repeatability</strong><p>Meaningful software revenue, engineering capacity beyond the founder, paid support/managed services, and multiple real installations.</p></article>
            <article><span>YEAR 3</span><strong>Independent business</strong><p>A functioning engineering organization with consulting, software, and managed-service revenue engines.</p></article>
          </div>

          <div className="business-two-column business-copy-panel-row">
            <article className="business-copy-panel">
              <h3>Engineering standards</h3>
              <p>OTLES provides a formal foundation for architecture, naming, documentation, security, database design, development, release management, change management, version control, testing, deployment, support, and system ownership.</p>
            </article>
            <article className="business-copy-panel">
              <h3>Intellectual property</h3>
              <p>OneTime Labs products remain OTL intellectual property and are licensed. Customer-specific ownership is defined by contract. Reusable libraries, frameworks, infrastructure, and pre-existing OTL IP should normally remain with OneTime Labs unless explicitly sold.</p>
            </article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 013
            Risks
            ==================================================== */}
        <PlanSection
          id="risks"
          eyebrow="08 · BUSINESS RISKS"
          title="The largest risks are execution risks, not technology risks."
          intro="The company can build. The next challenge is turning engineering capability into a disciplined commercial organization."
        >
          <div className="business-risk-list">
            {risks.map(([risk, issue, mitigation]) => (
              <article key={risk}>
                <div className="business-risk-name">{risk}</div>
                <div><span>Risk</span><p>{issue}</p></div>
                <div><span>Mitigation</span><p>{mitigation}</p></div>
              </article>
            ))}
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 014
            Management, hiring and KPI close
            ==================================================== */}
        <PlanSection
          eyebrow="09 · MANAGEMENT + SCALE"
          title="Founder-led now; documented and delegable by design."
          intro="The founder currently owns architecture, engineering, product strategy, customer discovery, consulting, project management, and business development. Hiring should follow sustained demand rather than precede it."
        >
          <div className="business-management-grid">
            <article><Users size={20} /><strong>Early capacity</strong><p>Contract software engineering, UI/UX design, sales/business development, support engineering, and project management as demand warrants.</p></article>
            <article><Landmark size={20} /><strong>Capital efficiency</strong><p>Keep fixed overhead low and focus spend on engineering, legal, insurance, accounting, customer acquisition, infrastructure, and revenue-producing work.</p></article>
            <article><Gauge size={20} /><strong>KPIs</strong><p>Track qualified leads, win rate, contract value, project margin, billable utilization, licenses sold, support attachment, monthly revenue, cash reserves, and customer concentration.</p></article>
          </div>
        </PlanSection>

        {/* ====================================================
            BUSINESS PAGE 015
            Final positioning
            ==================================================== */}
        <section className="business-close">
          <div>
            <span className="business-eyebrow">POSITIONING STATEMENT</span>
            <h2>When an existing solution works, we implement it. When it does not, we build something better.</h2>
            <p>And when we build it for you, we design the relationship so you remain in control of your technology.</p>
          </div>
          <div className="business-close-brand">
            <img src="/images/onetimelabs.png" alt="OneTime Labs" />
            <div><strong>OneTime Labs</strong><span>Build once. Own forever.</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
