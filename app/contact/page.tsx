import { Suspense } from "react";

import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Contact",
  description:
    "Contact OneTime Labs about vendor migration, Managed Print Services, enterprise consulting, custom software, or OneTime Labs products.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="otl-company-page">
        <section className="otl-page-hero otl-page-hero-contact">
          <div className="otl-shell otl-page-hero-grid">
            <div>
              <span className="otl-eyebrow">CONTACT ONETIME LABS</span>
              <h1>Start with the problem.</h1>
              <p>
                Vendor change, print environment, enterprise architecture, asset or licensing issue,
                custom workflow, internal software, or product support. The rough version is enough to start.
              </p>
            </div>

            <aside className="otl-page-summary">
              <div><span>General inquiries</span><strong>inquiry@onetimelabs.net</strong></div>
              <div><span>Product support</span><strong>support@onetimelabs.net</strong></div>
              <div><span>Onsite corridor</span><strong>Racine · Milwaukee · Chicago</strong></div>
              <div><span>Remote</span><strong>National engagements welcome</strong></div>
            </aside>
          </div>
        </section>

        <div className="otl-shell otl-page-content">
          <section className="otl-contact-layout">
            <div className="otl-contact-copy">
              <span className="otl-eyebrow otl-eyebrow-dark">NO TICKET MAZE</span>
              <h2>Tell us what you are trying to change, fix, replace, or build.</h2>
              <p>
                You do not need a polished requirements document. Include the environment, what is
                not working, any deadline or cutover date, and what a successful result should look like.
              </p>
              <div className="otl-contact-direct">
                <div><span>General</span><strong>inquiry@onetimelabs.net</strong></div>
                <div><span>Support</span><strong>support@onetimelabs.net</strong></div>
              </div>
            </div>

            <div className="otl-contact-form-stage">
              <Suspense fallback={<div className="inquiry-form">Loading contact form...</div>}>
                <InquiryForm />
              </Suspense>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
