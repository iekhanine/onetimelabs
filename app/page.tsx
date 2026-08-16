import {
  BookOpenText, ChevronDown, Gauge, KeyRound, LockKeyhole,
  PackageOpen, Power, Radio, Wrench,
} from "lucide-react";
import { getToolkits } from "../lib/toolkits/service";
import type { ToolkitRecord } from "../lib/toolkits/types";
import "./page.css";

// ==========================================================
// HEADER 001 — PRIMARY PRODUCTS
// ==========================================================

const products = [
  { name: "OTLES", category: "DOCUMENTATION", description: "Technical documentation platform", href: "https://otles.onetimelabs.net", icon: BookOpenText, accent: "cyan", status: "ONLINE" },
  { name: "LICENSING", category: "ACTIVATION + SEATS", description: "Software licensing and activation", href: "https://licensing.onetimelabs.net", icon: KeyRound, accent: "amber", status: "ONLINE" },
] as const;

// ==========================================================
// PRODUCT BUTTON 002 — HARDWARE KEY
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
// TOOLKITS 003 — DROPDOWN PRODUCT KEY
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
// TOOLKIT BAY 004 — DYNAMIC MODULES
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
// PAGE 005 — ONE TIME LABS PRODUCT DECK
// ==========================================================

export default async function Home() {
  const toolkits = await getToolkits();
  return (
    <main className="site-shell">
      <section className="control-panel" aria-label="OneTime Labs product launcher">
        <div className="panel-screw panel-screw--tl" /><div className="panel-screw panel-screw--tr" /><div className="panel-screw panel-screw--bl" /><div className="panel-screw panel-screw--br" />
        <header className="panel-header"><div className="brand-block"><div className="brand-block__title-row"><Power size={18} /><h1>OneTime Labs</h1><span className="header-online"><i />ONLINE</span></div><p>SOFTWARE + TOOLS</p></div><div className="panel-id"><span>OTL // PRODUCT SYSTEM</span><strong>DECK-01</strong></div></header>
        <section className="deck-display"><div className="deck-display__screen"><div><strong>SELECT A PRODUCT</strong></div><div className="screen-right"><span>MODE</span><strong>OWNERSHIP</strong></div></div><div className="deck-display__indicators"><i className="active" /><i className="active" /><i className="active" /><i /></div></section>
        <section className="product-grid" aria-label="OneTime Labs products">{products.map((p) => <ProductButton key={p.name} product={p} />)}<ToolkitsButton toolkits={toolkits} /></section>
        <ToolkitBay toolkits={toolkits} />
      </section>
    </main>
  );
}
