"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Code2, Server, TestTube2 } from "lucide-react";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];
const INTEREST_RANGES = [
  "Under $500",
  "$500–$2,500",
  "$2,500–$10,000",
  "$10,000+",
] as const;

export default function ContributeClient() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [range, setRange] = useState<(typeof INTEREST_RANGES)[number]>("$500–$2,500");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [interestBusy, setInterestBusy] = useState(false);
  const [interestMessage, setInterestMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "success") {
      setStatusMessage("Thank you. Your support payment was completed successfully.");
    } else if (status === "cancelled") {
      setStatusMessage("Checkout was cancelled. Nothing was charged.");
    }
  }, []);

  const amount = useMemo(() => {
    if (customAmount.trim()) {
      const parsed = Number(customAmount);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return selectedAmount ?? 0;
  }, [customAmount, selectedAmount]);

  async function startCheckout() {
    setCheckoutError("");
    setStatusMessage("");

    if (!Number.isFinite(amount) || amount < 5 || amount > 10000) {
      setCheckoutError("Enter an amount between $5 and $10,000.");
      return;
    }

    setCheckoutBusy(true);

    try {
      const response = await fetch("/api/contribute/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Unable to start checkout.");
      setCheckoutBusy(false);
    }
  }

  async function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInterestMessage("");
    setInterestBusy(true);

    try {
      const response = await fetch("/api/contribute/invest-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, range, note, website }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your interest.");
      }

      setInterestMessage("Got it. We’ll keep your non-binding indication of interest on file.");
      setName("");
      setEmail("");
      setRange("$500–$2,500");
      setNote("");
      setWebsite("");
    } catch (error) {
      setInterestMessage(error instanceof Error ? error.message : "Unable to submit your interest.");
    } finally {
      setInterestBusy(false);
    }
  }

  return (
    <>
      {statusMessage ? (
        <div className="otl-contribute-status" role="status">
          <Check size={15} />
          <span>{statusMessage}</span>
        </div>
      ) : null}

      <section className="otl-section otl-contribute-support" id="support">
        <div className="otl-section-heading">
          <div>
            <span className="otl-eyebrow otl-eyebrow-dark">01 / DIRECT SUPPORT</span>
            <h2>Back the work.</h2>
            <p>Pick an amount, then finish the payment on Stripe&apos;s hosted checkout.</p>
          </div>
        </div>

        <div className="otl-contribute-grid">
          <div className="otl-contribute-card otl-contribute-payment-card">
            <p className="otl-contribute-intro">
              Support payments help cover infrastructure, development time, testing,
              deployment work, and keeping independent projects moving.
            </p>

            <div className="otl-contribute-amounts" aria-label="Support amount">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={!customAmount && selectedAmount === preset ? "is-active" : ""}
                  onClick={() => {
                    setSelectedAmount(preset);
                    setCustomAmount("");
                  }}
                >
                  ${preset}
                </button>
              ))}
            </div>

            <label className="otl-contribute-label" htmlFor="customAmount">
              Custom amount
            </label>
            <div className="otl-contribute-money-field">
              <span>$</span>
              <input
                id="customAmount"
                inputMode="decimal"
                min="5"
                max="10000"
                step="1"
                placeholder="Other amount"
                value={customAmount}
                onChange={(event) => {
                  setCustomAmount(event.target.value);
                  setSelectedAmount(null);
                }}
              />
            </div>

            <button
              type="button"
              className="otl-button otl-button-primary otl-contribute-checkout-button"
              onClick={startCheckout}
              disabled={checkoutBusy}
            >
              {checkoutBusy ? "Opening Stripe Checkout…" : `Support OneTime Labs${amount ? ` — $${amount}` : ""}`}
              {!checkoutBusy ? <ArrowRight size={14} /> : null}
            </button>

            {checkoutError ? <p className="otl-contribute-error">{checkoutError}</p> : null}

            <div className="otl-contribute-notice">
              <strong>This is support, not an investment.</strong>
              <p>
                A support payment does not purchase equity, voting rights, repayment rights,
                products, services, or any other ownership interest in OneTime Labs. It is not
                represented as a charitable or tax-deductible donation.
              </p>
            </div>
          </div>

          <aside className="otl-contribute-card otl-contribute-uses">
            <span className="otl-eyebrow otl-eyebrow-dark">WHAT IT SUPPORTS</span>

            <div className="otl-contribute-use-row">
              <Server size={16} />
              <div><strong>Infrastructure</strong><p>Hosting, domains, storage, email, and production services.</p></div>
            </div>
            <div className="otl-contribute-use-row">
              <Code2 size={16} />
              <div><strong>Development</strong><p>Engineering time for products, utilities, experiments, and releases.</p></div>
            </div>
            <div className="otl-contribute-use-row">
              <TestTube2 size={16} />
              <div><strong>Testing</strong><p>Devices, test environments, integrations, and deployment work.</p></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="otl-section otl-contribute-invest" id="ownership">
        <div className="otl-two-column-panel otl-contribute-invest-panel">
          <div className="otl-panel-lead">
            <span className="otl-eyebrow otl-eyebrow-dark">02 / FUTURE OWNERSHIP</span>
            <h2>Want to own a piece of it?</h2>
            <p>
              We&apos;re evaluating whether to offer an investment opportunity in OneTime Labs in
              the future. If equity ownership is something you would seriously consider, tell us
              the general level of investment you might be interested in.
            </p>

            <div className="otl-contribute-legal">
              <strong>No securities are being offered or sold on this page.</strong>
              <p>
                We are not accepting investment funds here. Any indication of interest is
                non-binding, creates no obligation, and does not guarantee that an investment
                opportunity will be offered. Any future offering would have separate terms,
                disclosures, legal requirements, and eligibility rules.
              </p>
            </div>
          </div>

          <div className="otl-panel-action otl-contribute-form-wrap">
            <form className="otl-contribute-form" onSubmit={submitInterest}>
              <strong>Register interest</strong>
              <p>This does not commit you to invest anything.</p>

              <label htmlFor="interestName">Name</label>
              <input
                id="interestName"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <label htmlFor="interestEmail">Email</label>
              <input
                id="interestEmail"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <label htmlFor="interestRange">Potential investment range</label>
              <select
                id="interestRange"
                value={range}
                onChange={(event) => setRange(event.target.value as (typeof INTEREST_RANGES)[number])}
              >
                {INTEREST_RANGES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <label htmlFor="interestNote">Note <span>(optional)</span></label>
              <textarea
                id="interestNote"
                rows={4}
                placeholder="What interests you about OneTime Labs?"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />

              <div className="otl-contribute-honeypot" aria-hidden="true">
                <label htmlFor="companyWebsite">Website</label>
                <input
                  id="companyWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <button className="otl-button otl-button-primary" type="submit" disabled={interestBusy}>
                {interestBusy ? "Submitting…" : "I’m Interested"}
                {!interestBusy ? <ArrowRight size={14} /> : null}
              </button>

              {interestMessage ? <p className="otl-contribute-form-message">{interestMessage}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
