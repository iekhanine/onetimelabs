"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Code2, Server, TestTube2 } from "lucide-react";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

export default function ContributeClient() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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
            <span className="otl-eyebrow otl-eyebrow-dark">DIRECT SUPPORT</span>
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
    </>
  );
}
