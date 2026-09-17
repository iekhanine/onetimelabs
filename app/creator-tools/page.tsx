import Link from "next/link";
import {
  ArrowRight,
  EyeOff,
  MessageSquareText,
  RadioTower,
  ShieldAlert,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { creatorSoftware } from "@/lib/company";

const icons = [ShieldAlert, RadioTower, MessageSquareText];

export const metadata = {
  title: "Creator & Streaming Tools",
  description:
    "Creator software and streaming tools from OneTime Labs for Twitch, YouTube, OBS, broadcast safety, overlays, and live-production workflows.",
};

export default function CreatorToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">CREATOR / BROADCAST SOFTWARE</span>
              <h1>Small tools for the very public chaos of going live.</h1>
              <p>
                OneTime Labs also builds practical software for Twitch, YouTube, OBS, and live-production workflows.
                The problems are different from enterprise infrastructure. The engineering habits are not.
              </p>
              <div className="otl-hero-actions">
                <a className="otl-button otl-button-primary" href="https://store.onetimelabs.net">
                  Visit the software store <ArrowRight size={14} />
                </a>
                <Link className="otl-button otl-button-secondary" href="/software">
                  Enterprise software
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Platforms</span><strong>Twitch · YouTube · OBS</strong></div>
              <div><span>Focus</span><strong>Safety · overlays · operator workflow</strong></div>
              <div><span>Design</span><strong>Fast controls · low friction · practical use</strong></div>
              <div><span>Development</span><strong>Built alongside creator workflows</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">CREATOR PORTFOLIO</span>
                <h2>Tools built around the live operator.</h2>
                <p>Fast access matters when the audience can see the mistake at the same time you do.</p>
              </div>
            </div>

            <div className="otl-product-grid otl-product-grid-three">
              {creatorSoftware.map((product, index) => {
                const Icon = icons[index] ?? RadioTower;
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
              <EyeOff size={22} />
              <span className="otl-eyebrow otl-eyebrow-dark">STREAM SAFETY</span>
              <h2>Safety controls should be faster than panic.</h2>
              <p>
                Streamer-facing tools are designed around obvious controls and immediate actions,
                especially where privacy, accidental exposure, or operator mistakes can become public instantly.
              </p>
            </div>
            <div className="otl-panel-action">
              <strong>Need a creator-specific utility?</strong>
              <p>Custom browser tools, overlays, operator panels, and lightweight streaming utilities can also be scoped as custom work.</p>
              <Link href="/custom-development">Discuss custom development <ArrowRight size={13} /></Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
