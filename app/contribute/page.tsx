import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import ContributeClient from "./ContributeClient";
import "./page.css";

export const metadata: Metadata = {
  title: "Support OneTime Labs",
  description:
    "Support independent software engineering and product development at OneTime Labs through a one-time support payment.",
};

export default function ContributePage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero otl-contribute-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">SUPPORT ONETIME LABS</span>
              <h1>Help us build the next thing.</h1>
              <p>
                OneTime Labs builds practical software, internal tools, and custom systems.
                If you want to help fund independent development, testing, infrastructure,
                and the weird useful projects that do not fit neatly into somebody else&apos;s
                subscription model, you can support the work directly.
              </p>
            </div>

            <aside className="otl-page-summary" aria-label="Contribution summary">
              <div><span>Payment</span><strong>One-time support through Stripe Checkout</strong></div>
              <div><span>Amounts</span><strong>$10 · $25 · $50 · $100 · $250 · Custom</strong></div>
              <div><span>Ownership</span><strong>Support payments do not purchase equity</strong></div>
              <div><span>Investors</span><strong><Link className="otl-contribute-summary-link" href="/invest">Use the separate investor profile →</Link></strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <ContributeClient />

          <section className="otl-contribute-invest-link">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">LOOKING FOR OWNERSHIP?</span>
              <h2>Support and investment are intentionally separate.</h2>
              <p>If you are interested in a future ownership opportunity rather than simply supporting the work, use the investor profile and non-binding interest form.</p>
            </div>
            <Link className="otl-button otl-button-primary" href="/invest">
              View investor profile <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
