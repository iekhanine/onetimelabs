"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

import "./page.css";

/* ==========================================================
   CUSTOM DEVELOPMENT CONTACT 001
   Project inquiry form
   ========================================================== */

export default function CustomDevelopmentContact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send project inquiry.");
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send project inquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="inquiry-page">
      {/* =====================================================
          HEADER 002
          ===================================================== */}
      <header className="inquiry-header">
        <a className="inquiry-brand" href="/" aria-label="OneTime Labs home">
          <span className="inquiry-brand-mark">OTL</span>
          <span className="inquiry-brand-name">OneTime Labs</span>
        </a>

        <nav className="inquiry-desktop-nav" aria-label="Primary navigation">
          <a href="/#products">Products</a>
          <a href="/custom-development">Custom Development</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#company">Company</a>
          <a href="/#documentation">Documentation</a>
        </nav>

        <a className="inquiry-header-cta" href="/custom-development">
          Custom Development
          <ArrowRight size={15} />
        </a>

        <button
          className="inquiry-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav className="inquiry-mobile-nav" aria-label="Mobile navigation">
            <a href="/#products">Products</a>
            <a href="/custom-development">Custom Development</a>
            <a href="/#solutions">Solutions</a>
            <a href="/#company">Company</a>
            <a href="/#documentation">Documentation</a>
          </nav>
        )}
      </header>

      <main>
        {/* ===================================================
            INTRO 003
            =================================================== */}
        <section className="inquiry-intro">
          <div className="inquiry-intro-copy">
            <a className="inquiry-back-link" href="/custom-development">
              <ArrowLeft size={14} />
              Custom Development
            </a>

            <p className="inquiry-eyebrow">PROJECT INQUIRY</p>

            <h1>
              Tell me what
              <br />
              <em>needs fixing.</em>
            </h1>

            <p className="inquiry-description">
              You don't need a finished specification. Tell me what your team
              is doing today, what isn't working, and what you wish existed
              instead.
            </p>
          </div>

          <aside className="inquiry-intro-aside">
            <span className="inquiry-aside-number">01</span>

            <div>
              <p className="inquiry-aside-label">A GOOD PLACE TO START</p>

              <p className="inquiry-aside-statement">
                Show me the
                <br />
                ugly spreadsheet.
              </p>

              <p className="inquiry-aside-copy">
                Or the manual workflow. Or the repetitive task. Or the tool
                everyone keeps saying somebody should build.
              </p>
            </div>
          </aside>
        </section>

        {/* ===================================================
            FORM 004
            =================================================== */}
        <section className="inquiry-form-section">
          <div className="inquiry-form-heading">
            <span>02</span>

            <div>
              <p>THE PROJECT</p>
              <h2>Give me the useful version.</h2>
              <p className="inquiry-form-heading-copy">
                Enough information to understand the problem is more valuable
                than a hundred pages of requirements.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="inquiry-success">
              <CheckCircle2 size={32} strokeWidth={1.4} />

              <div>
                <p className="inquiry-eyebrow">INQUIRY RECEIVED</p>
                <h2>That's enough to start a conversation.</h2>
                <p>
                  Your project inquiry has been sent to OneTime Labs. I'll
                  review what you shared and follow up using the email address
                  you provided.
                </p>

                <button
                  className="inquiry-secondary-button"
                  type="button"
                  onClick={() => setSubmitted(false)}
                >
                  Return to Form
                </button>
              </div>
            </div>
          ) : (
            <form className="inquiry-form" onSubmit={handleSubmit}>
              {/* =================================================
                  CONTACT 005
                  ================================================= */}
              <fieldset className="inquiry-fieldset">
                <legend>
                  <span>01</span>
                  Who am I talking to?
                </legend>

                <div className="inquiry-grid inquiry-grid-two">
                  <label>
                    <span>Name *</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    <span>Company / Organization</span>
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company name"
                    />
                  </label>

                  <label>
                    <span>Email *</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                    />
                  </label>

                  <label>
                    <span>Role / Title</span>
                    <input
                      name="role"
                      type="text"
                      autoComplete="organization-title"
                      placeholder="What do you do?"
                    />
                  </label>
                </div>
              </fieldset>

              {/* =================================================
                  PROBLEM 006
                  ================================================= */}
              <fieldset className="inquiry-fieldset">
                <legend>
                  <span>02</span>
                  What's the problem?
                </legend>

                <label className="inquiry-full-field">
                  <span>What are you doing today? *</span>
                  <textarea
                    name="currentProcess"
                    required
                    rows={6}
                    placeholder="Describe the current process, tool, spreadsheet, manual work, or operational headache."
                  />
                </label>

                <label className="inquiry-full-field">
                  <span>What would you rather have happen? *</span>
                  <textarea
                    name="desiredOutcome"
                    required
                    rows={6}
                    placeholder="Describe what a better workflow or tool would let your team do."
                  />
                </label>
              </fieldset>

              {/* =================================================
                  PROJECT DETAILS 007
                  ================================================= */}
              <fieldset className="inquiry-fieldset">
                <legend>
                  <span>03</span>
                  What does the project look like?
                </legend>

                <div className="inquiry-grid inquiry-grid-two">
                  <label>
                    <span>Approximate Budget</span>
                    <select name="budget" defaultValue="">
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option value="under-1500">Under $1,500</option>
                      <option value="1500-5000">$1,500 – $5,000</option>
                      <option value="5000-15000">$5,000 – $15,000</option>
                      <option value="15000-30000">$15,000 – $30,000</option>
                      <option value="30000-plus">$30,000+</option>
                      <option value="unknown">Not sure yet</option>
                    </select>
                  </label>

                  <label>
                    <span>Timeline</span>
                    <select name="timeline" defaultValue="">
                      <option value="" disabled>
                        Select a timeline
                      </option>
                      <option value="asap">As soon as practical</option>
                      <option value="1-2-months">1–2 months</option>
                      <option value="3-6-months">3–6 months</option>
                      <option value="6-plus-months">6+ months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </label>

                  <label>
                    <span>Who will use it?</span>
                    <select name="audience" defaultValue="">
                      <option value="" disabled>
                        Select an audience
                      </option>
                      <option value="individual">One person</option>
                      <option value="team">A team / department</option>
                      <option value="organization">The organization</option>
                      <option value="customers">Customers / external users</option>
                      <option value="mixed">A mix of users</option>
                    </select>
                  </label>

                  <label>
                    <span>Current Tool</span>
                    <input
                      name="currentTool"
                      type="text"
                      placeholder="Excel, SharePoint, email, paper, etc."
                    />
                  </label>
                </div>
              </fieldset>

              {/* =================================================
                  FINAL DETAILS 008
                  ================================================= */}
              <fieldset className="inquiry-fieldset">
                <legend>
                  <span>04</span>
                  Anything else?
                </legend>

                <label className="inquiry-full-field">
                  <span>Details, constraints, integrations, weird stuff...</span>
                  <textarea
                    name="additionalDetails"
                    rows={7}
                    placeholder="Existing systems, data sources, security requirements, examples, technical constraints, or anything else that would help explain the idea."
                  />
                </label>
              </fieldset>

              {/* =================================================
                  SUBMIT 009
                  ================================================= */}
              <div className="inquiry-submit-row">
                <div>
                  <p className="inquiry-submit-title">
                    No polished requirements document required.
                  </p>
                  <p>
                    A clear description of the problem is enough to start.
                  </p>
                </div>

                <div className="inquiry-submit-action">
                  {submitError && (
                    <p className="inquiry-submit-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    className="inquiry-submit-button"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Send Project Inquiry"}
                    {!submitting && <ArrowRight size={16} />}
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </main>

      {/* =====================================================
          FOOTER 010
          ===================================================== */}
      <footer className="inquiry-footer">
        <div className="inquiry-footer-brand">
          <span className="inquiry-brand-mark">OTL</span>

          <div>
            <strong>OneTime Labs</strong>
            <p>Software built to be yours.</p>
          </div>
        </div>

        <div className="inquiry-footer-links">
          <a href="/">Home</a>
          <a href="/custom-development">Custom Development</a>
          <a href="/#products">Products</a>
          <a href="/#documentation">Documentation</a>
        </div>

        <p className="inquiry-copyright">
          © {new Date().getFullYear()} OneTime Labs.
        </p>
      </footer>
    </div>
  );
}