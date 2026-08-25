import { Suspense } from "react";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Contact",
  description: "Contact OneTime Labs about products, demos, partnerships, support, or custom software work.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="simple-hero simple-hero--contact">
          <div className="shell simple-hero__inner">
            <span className="eyebrow">Contact OneTime Labs</span>
            <h1>Start with the problem.</h1>
            <p>
              Ask about a product, request a demo, talk through a workflow, or get product support.
              The form goes directly to OneTime Labs.
            </p>
          </div>
        </section>

        <section className="section contact-form-section">
          <div className="shell contact-form-layout">
            <div className="contact-form-copy">
              <span className="eyebrow">No ticket maze</span>
              <h2>Tell us what you are trying to do.</h2>
              <p>
                You do not need a polished requirements document. A rough description of what is annoying,
                broken, expensive, or unnecessarily complicated is enough to start.
              </p>
              <div className="contact-direct">
                <span>General inquiries</span>
                <strong>inquiry@onetimelabs.net</strong>
                <span>Existing product support</span>
                <strong>support@onetimelabs.net</strong>
              </div>
            </div>
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
