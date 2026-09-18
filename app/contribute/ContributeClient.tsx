"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./contribute.module.css";

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
      setInterestMessage("Got it. We’ll keep your indication of interest on file.");
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
      <section className={styles.hero}>
        <div className={styles.eyebrow}>SUPPORT ONETIMELABS</div>
        <h1>Help us build the next thing.</h1>
        <p>
          OneTime Labs builds practical software, internal tools, and custom systems without turning
          every useful idea into another monthly subscription. If you want to help fund the work,
          you can support us directly.
        </p>
      </section>

      {statusMessage ? <div className={styles.statusBanner}>{statusMessage}</div> : null}

      <section className={styles.gridSection}>
        <div className={styles.panel}>
          <div className={styles.sectionKicker}>01 / DIRECT SUPPORT</div>
          <h2>Back the work.</h2>
          <p className={styles.bodyCopy}>
            Support payments help cover hosting, infrastructure, testing, development time, and the
            cost of keeping independent projects moving.
          </p>

          <div className={styles.amountGrid}>
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`${styles.amountButton} ${
                  !customAmount && selectedAmount === preset ? styles.amountButtonActive : ""
                }`}
                onClick={() => {
                  setSelectedAmount(preset);
                  setCustomAmount("");
                }}
              >
                ${preset}
              </button>
            ))}
          </div>

          <label className={styles.fieldLabel} htmlFor="customAmount">
            Custom amount
          </label>
          <div className={styles.moneyField}>
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
            className={styles.primaryButton}
            onClick={startCheckout}
            disabled={checkoutBusy}
          >
            {checkoutBusy ? "Opening secure checkout…" : `Support OneTime Labs${amount ? ` — $${amount}` : ""}`}
          </button>

          {checkoutError ? <p className={styles.errorText}>{checkoutError}</p> : null}

          <div className={styles.finePrintBox}>
            <strong>This is support, not an investment.</strong>
            <p>
              A support payment does not purchase equity, voting rights, repayment rights, products,
              services, or any other ownership interest in OneTime Labs. It is not represented as a
              charitable or tax-deductible donation.
            </p>
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.sectionKicker}>WHAT IT SUPPORTS</div>
          <div className={styles.useRow}>
            <span>01</span>
            <div>
              <strong>Infrastructure</strong>
              <p>Hosting, domains, storage, email, and production services.</p>
            </div>
          </div>
          <div className={styles.useRow}>
            <span>02</span>
            <div>
              <strong>Development</strong>
              <p>Engineering time for OTL products, utilities, experiments, and releases.</p>
            </div>
          </div>
          <div className={styles.useRow}>
            <span>03</span>
            <div>
              <strong>Testing</strong>
              <p>Devices, test environments, integrations, and deployment work.</p>
            </div>
          </div>
          <div className={styles.useRow}>
            <span>04</span>
            <div>
              <strong>Keeping it independent</strong>
              <p>More room to build useful things without forcing everything into subscriptions.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.investSection}>
        <div className={styles.investIntro}>
          <div className={styles.sectionKicker}>02 / FUTURE OWNERSHIP</div>
          <h2>Want to own a piece of it?</h2>
          <p>
            We’re evaluating whether to offer an investment opportunity in OneTime Labs in the
            future. If equity ownership is something you would seriously consider, tell us what
            level of investment you might be interested in.
          </p>
          <div className={styles.legalNotice}>
            <strong>No securities are being offered or sold on this page.</strong>
            <p>
              We are not accepting investment funds here. Any indication of interest is non-binding,
              creates no obligation, and does not guarantee that an investment opportunity will be
              offered. Any future offering would be subject to separate terms, disclosures, legal
              requirements, and eligibility rules. Any ownership percentage would depend on the
              valuation and terms of that future offering.
            </p>
          </div>
        </div>

        <form className={styles.interestForm} onSubmit={submitInterest}>
          <div className={styles.formTitle}>Register interest</div>

          <label className={styles.fieldLabel} htmlFor="interestName">
            Name
          </label>
          <input
            className={styles.textInput}
            id="interestName"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label className={styles.fieldLabel} htmlFor="interestEmail">
            Email
          </label>
          <input
            className={styles.textInput}
            id="interestEmail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label className={styles.fieldLabel} htmlFor="interestRange">
            Potential investment range
          </label>
          <select
            className={styles.textInput}
            id="interestRange"
            value={range}
            onChange={(event) => setRange(event.target.value as (typeof INTEREST_RANGES)[number])}
          >
            {INTEREST_RANGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label className={styles.fieldLabel} htmlFor="interestNote">
            Note <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            className={styles.textArea}
            id="interestNote"
            rows={4}
            placeholder="What interests you about OneTime Labs?"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="companyWebsite">Website</label>
            <input
              id="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <button className={styles.secondaryButton} type="submit" disabled={interestBusy}>
            {interestBusy ? "Submitting…" : "I’m Interested"}
          </button>

          {interestMessage ? <p className={styles.formMessage}>{interestMessage}</p> : null}
        </form>
      </section>
    </>
  );
}
