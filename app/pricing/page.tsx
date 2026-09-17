import Link from "next/link";
import { ArrowRight, Clock3, MapPin, ReceiptText } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { consultingPricing } from "@/lib/company";

const notes = [
  ["Travel", "Reasonable travel time, lodging, mileage, airfare, parking, or other direct travel costs are scoped separately when onsite work requires them."],
  ["After-hours work", "Cutovers, weekend work, overnight work, or unusual support windows may use a different rate or project price depending on the engagement."],
  ["Hardware & third parties", "Hardware, software licensing, vendor charges, cloud services, and other third-party costs are not included unless they are explicitly written into the scope."],
  ["Project pricing", "Fixed or milestone-based pricing is available when the work can be defined clearly enough that hourly billing would be the wrong model."],
];

export const metadata = {
  title: "Consulting Pricing",
  description:
    "OneTime Labs consulting pricing for remote enterprise consulting, onsite work, vendor migrations, managed print assessments, custom software, and longer-term engagements.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">CONSULTING PRICING</span>
              <h1>Published starting points. Scoped enterprise work.</h1>
              <p>
                The rates are public because the basic question should not require a sales call.
                Complex migrations, multi-site work, long engagements, and custom software are scoped
                around the actual environment and outcome.
              </p>
              <div className="otl-hero-actions">
                <Link className="otl-button otl-button-primary" href="/contact">
                  Request a consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <aside className="otl-page-summary">
              <div><span>Remote</span><strong>From $175 / hour</strong></div>
              <div><span>Onsite</span><strong>From $225 / hour</strong></div>
              <div><span>Full day</span><strong>$1,500 / day</strong></div>
              <div><span>Initial consultation</span><strong>No charge</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">RATE CARD</span>
                <h2>Simple enough to budget before we talk.</h2>
                <p>Final scope, deliverables, assumptions, and payment terms are documented before paid work begins.</p>
              </div>
            </div>

            <div className="otl-pricing-table">
              {consultingPricing.map(({ service, price, note }) => (
                <div className="otl-pricing-row" key={service}>
                  <strong>{service}</strong>
                  <span>{price}</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="otl-pricing-highlights">
            <article>
              <Clock3 size={18} />
              <span>Hourly</span>
              <strong>Use hourly when the scope needs flexibility.</strong>
              <p>Good for advisory, troubleshooting, architecture, review, and smaller implementation work.</p>
            </article>
            <article>
              <ReceiptText size={18} />
              <span>Project</span>
              <strong>Use project pricing when the outcome can be defined.</strong>
              <p>Best for assessments, migrations, custom builds, or work with clear deliverables and acceptance criteria.</p>
            </article>
            <article>
              <MapPin size={18} />
              <span>Onsite</span>
              <strong>Racine, Milwaukee, and Chicago are the primary corridor.</strong>
              <p>Other onsite work is available when travel and scheduling make sense for the engagement.</p>
            </article>
          </section>

          <section className="otl-section">
            <div className="otl-section-heading">
              <div>
                <span className="otl-eyebrow otl-eyebrow-dark">SCOPE NOTES</span>
                <h2>No surprise line items.</h2>
              </div>
            </div>

            <div className="otl-engagement-table">
              {notes.map(([title, text]) => (
                <div key={title}><strong>{title}</strong><span>{text}</span></div>
              ))}
            </div>
          </section>

          <section className="otl-store-strip">
            <div>
              <span className="otl-eyebrow otl-eyebrow-dark">READY TO SCOPE IT?</span>
              <h2>Send the rough version of the problem.</h2>
              <p>You do not need procurement-grade requirements to start. We can turn the messy version into a defined engagement.</p>
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
