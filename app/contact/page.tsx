import { Suspense } from "react";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Contact",
  description:
    "Contact OneTime Labs about products, demos, partnerships, support, or custom software work.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ==========================================================
            CONTACT 001 — INTRO
            ========================================================== */}
        <section className="simple-hero simple-hero--contact">
          <div className="shell simple-hero__inner">
            <span className="eyebrow">Contact OneTime Labs</span>
            <h1>Start with the problem.</h1>
            <p>
              Ask about a product, request a demo, talk through a workflow,
              or get product support. The form goes directly to OneTime Labs.
            </p>
          </div>
        </section>

        {/* ==========================================================
            CONTACT 010 — INQUIRY
            Two-row desktop grid:
            row 1 = intro / form
            row 2 = direct email / success confirmation
            ========================================================== */}
        <section className="section contact-form-section">
          <div className="shell contact-form-layout">
            <div className="contact-form-intro">
              <span className="eyebrow">No ticket maze</span>
              <h2>Tell us what you are trying to do.</h2>
              <p>
                You do not need a polished requirements document. A rough
                description of what is annoying, broken, expensive, or
                unnecessarily complicated is enough to start.
              </p>
            </div>

            <div className="contact-direct">
              <span>General inquiries</span>
              <strong>inquiry@onetimelabs.net</strong>

              <span>Existing product support</span>
              <strong>support@onetimelabs.net</strong>
            </div>

            <div className="contact-form-stage">
              <Suspense
                fallback={<div className="inquiry-form">Loading contact form...</div>}
              >
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
