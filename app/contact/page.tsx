import { Suspense } from "react";

import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Contact",
  description:
    "Contact OneTime Labs about business technology, enterprise consulting, software, migrations, contact center platforms, managed print, reporting, automation, or custom development.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-contact-page">
        <section className="otl-compact-contact-heading">
          <div className="otl-shell">
            <span className="otl-eyebrow">CONTACT</span>
            <h1>Tell us what you need.</h1>
            <p>A rough explanation is enough. We will figure out the technical part.</p>
          </div>
        </section>

        <section className="otl-shell otl-compact-contact-layout">
          <aside className="otl-compact-contact-details">
            <div>
              <span>GENERAL</span>
              <strong>inquiry@onetimelabs.net</strong>
            </div>
            <div>
              <span>SUPPORT</span>
              <strong>support@onetimelabs.net</strong>
            </div>
            <div>
              <span>ONSITE</span>
              <strong>Racine · Milwaukee · Chicago</strong>
            </div>
            <div>
              <span>REMOTE</span>
              <strong>National engagements welcome</strong>
            </div>
          </aside>

          <div className="otl-contact-form-stage">
            <Suspense fallback={<div className="inquiry-form">Loading contact form...</div>}>
              <InquiryForm />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
