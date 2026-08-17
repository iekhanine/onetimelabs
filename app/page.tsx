import {
  BookOpenText,
  Boxes,
  ChevronDown,
  Gauge,
  Gamepad2,
  PackageOpen,
  Power,
  RefreshCw,
  Rocket,
  Wrench,
} from "lucide-react";
import { getToolkits } from "../lib/toolkits/service";
import type { ToolkitRecord } from "../lib/toolkits/types";
import HomeInquiryForm from "./HomeInquiryForm";
import "./page.css";

// ==========================================================
// HEADER 001 - PRIMARY PRODUCTS
// ==========================================================

const products = [
  { name: "OTLES", category: "DOCUMENTATION", description: "Technical documentation platform", href: "https://otles.onetimelabs.net", icon: BookOpenText, accent: "cyan", status: "ONLINE" },
  { name: "ARCADE", category: "GAMES + EXPERIMENTS", description: "Games, puzzles, and interactive experiments", href: "/arcade", icon: Gamepad2, accent: "amber", status: "ONLINE" },
] as const;

const services = [
  {
    number: "01",
    title: "Custom Development",
    description: "Web applications built around your actual workflow instead of forcing your business into an existing SaaS product.",
    icon: Boxes,
  },
  {
    number: "02",
    title: "Internal Tools",
    description: "Dashboards, portals, asset systems, administrative applications, reporting systems, and purpose-built operational software.",
    icon: Gauge,
  },
  {
    number: "03",
    title: "Process Modernization",
    description: "Replace Excel, Access, PDFs, paper forms, shared drives, email chains, and repetitive manual work with software built for the job.",
    icon: RefreshCw,
  },
  {
    number: "04",
    title: "Rapid Prototyping",
    description: "Turn a business problem or software idea into a functional prototype that can be demonstrated, tested, and refined quickly.",
    icon: Rocket,
  },
] as const;

// ==========================================================
// PRODUCT BUTTON 002 - HARDWARE KEY
// ==========================================================

function ProductButton({ product }: { product: (typeof products)[number] }) {
  const Icon = product.icon;
  return (
    <div className="product-well">
      <a className={`product-key product-key--${product.accent}`} href={product.href} aria-label={`Open ${product.name}`}>
        <div className="product-key__topline"><span className="product-key__status"><span className={`status-led status-led--${product.accent}`} />{product.status}</span><span>OPEN ↗</span></div>
        <div className="product-key__center"><Icon className="product-key__icon" strokeWidth={1.65} /><div><strong className="product-key__name">{product.name}</strong><span className="product-key__category">{product.category}</span></div></div>
        <span className="product-key__description">{product.description}</span>
      </a>
    </div>
  );
}

// ==========================================================
// TOOLKITS 003 - DROPDOWN PRODUCT KEY
// ==========================================================

function ToolkitsButton({ toolkits }: { toolkits: ToolkitRecord[] }) {
  return (
    <div className="product-well toolkit-well">
      <details className="toolkit-selector">
        <summary className="product-key product-key--green">
          <div className="product-key__topline"><span className="product-key__status"><span className="status-led status-led--green" />{toolkits.length ? `${toolkits.length} INSTALLED` : "READY"}</span><span className="toolkit-select">SELECT <ChevronDown size={12} /></span></div>
          <div className="product-key__center"><Wrench className="product-key__icon" strokeWidth={1.65} /><div><strong className="product-key__name">TOOLKITS</strong><span className="product-key__category">IT + ENGINEERING</span></div></div>
          <span className="product-key__description">Operational and engineering tools</span>
        </summary>
        <div className="toolkit-dropdown">
          <div className="toolkit-dropdown__header"><div><span>TOOLKIT SELECTOR</span><strong>INSTALLED MODULES</strong></div><b>{String(toolkits.length).padStart(2, "0")}</b></div>
          {toolkits.length ? <div className="toolkit-dropdown__list">{toolkits.map((t) => <a key={t.id} className={`toolkit-dropdown__item toolkit-accent--${t.accent}`} href={t.url}><i /><span><strong>{t.name}</strong><small>{t.category}</small></span><em>OPEN ↗</em></a>)}</div> : <div className="toolkit-empty"><PackageOpen size={18} /><div><strong>NO MODULES INSTALLED</strong><span>Catalog ready for Platform.</span></div></div>}
        </div>
      </details>
    </div>
  );
}

// ==========================================================
// TOOLKIT BAY 004 - DYNAMIC MODULES
// ==========================================================

function ToolkitBay({ toolkits }: { toolkits: ToolkitRecord[] }) {
  return (
    <section className="toolkit-bay" aria-labelledby="toolkit-bay-title">
      <header className="toolkit-bay__header"><div><span>MODULE BAY // TK-01</span><h2 id="toolkit-bay-title">TOOLKITS</h2></div><div><span>INSTALLED</span><strong>{String(toolkits.length).padStart(2, "0")}</strong></div></header>
      {toolkits.length ? <div className="toolkit-bay__grid">{toolkits.map((t) => <div key={t.id} className={`toolkit-module-well toolkit-accent--${t.accent}`}><a className="toolkit-module" href={t.url}><div className="toolkit-module__top"><span><i />{t.category}</span><span>OPEN ↗</span></div><strong>{t.name}</strong><p>{t.description}</p></a></div>)}</div> : <div className="toolkit-bay__empty"><PackageOpen size={22} /><div><strong>NO TOOLKITS INSTALLED</strong><span>BAY READY // PLATFORM CATALOG INTERFACE AVAILABLE</span></div></div>}
    </section>
  );
}

// ==========================================================
// PAGE 005 - ONETIME LABS
// ==========================================================

export default async function Home() {
  const toolkits = await getToolkits();

  return (
    <main className="site-shell">
      <section className="control-panel" aria-label="OneTime Labs">
        <div className="panel-screw panel-screw--tl" /><div className="panel-screw panel-screw--tr" /><div className="panel-screw panel-screw--bl" /><div className="panel-screw panel-screw--br" />

        <header className="panel-header">
          <div className="brand-block"><div className="brand-block__title-row"><Power size={18} /><h1>OneTime Labs</h1><span className="header-online"><i />ONLINE</span></div><p>SOFTWARE DEVELOPMENT + ENGINEERING</p></div>
          <div className="panel-id"><span>OTL // DEVELOPMENT SYSTEM</span><strong>DECK-01</strong></div>
        </header>

        <section className="company-hero" aria-labelledby="company-hero-title">
          <div className="company-hero__copy">
            <span className="section-label">CUSTOM SOFTWARE // BUSINESS SYSTEMS</span>
            <h2 id="company-hero-title">OneNote? Excel?<br />There’s a better way...</h2>
            <p>Still running processes through spreadsheets, email, OneNote or “that one file everyone uses”? 
              We build tools streamlining your existing documents. Custom web applications, internal tools, workflow automation, 
              and purpose-built software for businesses that have outgrown spreadsheets, paper processes, and off-the-shelf platforms.
              </p>
              <h1 id="services-title">No subscriptions. We build it. You own it.</h1>
            <div className="company-hero__actions">
              <a className="primary-cta" href="#project-inquiry">START A PROJECT</a>
              <a className="email-cta" href="mailto:inquiry@onetimelabs.net">inquiry@onetimelabs.net</a>
            </div>
          </div>
          <aside className="company-hero__aside">
            <span>OPERATING PRINCIPLE // 001</span>
            <strong>Have a convoluted process?</strong>
            <p>Let's fix it.</p>
          </aside>
        </section>

        <section className="services-section" aria-labelledby="services-title">
          <header className="section-header">
            <div><span className="section-label">WHAT WE DO // 01</span><h2 id="services-title">Custom Internal Tools</h2></div>
            <p>We design practical systems around how a business actually operates, then make the workflow simpler, faster, and easier to own.</p>
          </header>
          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-card__top"><span>{service.number}</span><Icon size={20} strokeWidth={1.5} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="project-inquiry" id="project-inquiry" aria-labelledby="project-inquiry-title">
          <div className="project-inquiry__intro">
            <span className="section-label">PROJECT INQUIRY // 02</span>
            <h2 id="project-inquiry-title">Got something in mind?</h2>
            <p>Tell us what's broken, annoying, manual, repetitive, or held together by a spreadsheet.</p>
            <div className="project-inquiry__email">Prefer email? <a href="mailto:inquiry@onetimelabs.net">inquiry@onetimelabs.net</a></div>
          </div>
          <HomeInquiryForm />
        </section>

        <section className="products-intro" aria-labelledby="products-title">
          <div>
            <span className="section-label">EXPLORE ONETIME LABS // 03</span>
            <h2 id="products-title">Products we have built:</h2>
          </div>
          <p>We build software for businesses, and our own products demonstrate the same practical engineering approach.</p>
        </section>

        <section className="deck-display"><div className="deck-display__screen"><div><strong>SELECT A PRODUCT</strong></div><div className="screen-right"><span>MODE</span><strong>OWNERSHIP</strong></div></div><div className="deck-display__indicators"><i className="active" /><i className="active" /><i className="active" /><i /></div></section>
        <section className="product-grid" aria-label="OneTime Labs products">{products.map((p) => <ProductButton key={p.name} product={p} />)}<ToolkitsButton toolkits={toolkits} /></section>
        <ToolkitBay toolkits={toolkits} />
      </section>
    </main>
  );
}
