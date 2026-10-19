import { Suspense } from "react";

import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Contact",
  description:
    "Contact OneTime Labs about IT asset management, CMDB improvements, license optimization, inventory systems, and related enterprise services.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page otl-compact-contact-page">
        <section className="otl-compact-contact-heading">
          <div className="otl-shell">
            <span className="otl-eyebrow">CONTACT</span>
            <h1>Tell us what needs fixing.</h1>
            <p>Tell us what you track today, which systems you use, and what needs to improve. A rough overview is enough.</p>
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
