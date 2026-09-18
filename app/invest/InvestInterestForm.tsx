"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const INTEREST_RANGES = [
  "$500–$2,500",
  "$2,500–$10,000",
  "$10,000–$25,000",
  "$25,000+",
] as const;

const ACCREDITED_OPTIONS = ["Yes", "No", "Unsure"] as const;
const STRUCTURE_OPTIONS = ["Equity", "SAFE", "Other", "Unsure"] as const;

export default function InvestInterestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [range, setRange] = useState<(typeof INTEREST_RANGES)[number]>("$500–$2,500");
  const [accredited, setAccredited] = useState<(typeof ACCREDITED_OPTIONS)[number]>("Unsure");
  const [structure, setStructure] = useState<(typeof STRUCTURE_OPTIONS)[number]>("Unsure");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setSuccess(false);

    if (!consent) {
      setMessage("Please confirm that this is only a non-binding indication of interest.");
      setBusy(false);
      return;
    }

    try {
      const response = await fetch("/api/invest/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          range,
          accredited,
          structure,
          note,
          consent,
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit your interest.");
      }

      setSuccess(true);
      setMessage("Interest registered. No investment commitment has been created.");
      setName("");
      setEmail("");
      setCompany("");
      setRange("$500–$2,500");
      setAccredited("Unsure");
      setStructure("Unsure");
      setNote("");
      setConsent(false);
      setWebsite("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit your interest.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="otl-invest-form" onSubmit={submitInterest}>
      <div className="otl-invest-form-heading">
        <strong>Register investment interest</strong>
        <span>No payment. No commitment. No reservation of securities.</span>
      </div>

      <div className="otl-invest-form-grid">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="otl-invest-form-wide">
          <span>Company / occupation <i>optional</i></span>
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            maxLength={180}
          />
        </label>

        <label>
          <span>Potential investment range</span>
          <select value={range} onChange={(event) => setRange(event.target.value as (typeof INTEREST_RANGES)[number])}>
            {INTEREST_RANGES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Accredited investor?</span>
          <select value={accredited} onChange={(event) => setAccredited(event.target.value as (typeof ACCREDITED_OPTIONS)[number])}>
            {ACCREDITED_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="otl-invest-form-wide">
          <span>Structure you would want to learn about</span>
          <select value={structure} onChange={(event) => setStructure(event.target.value as (typeof STRUCTURE_OPTIONS)[number])}>
            {STRUCTURE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="otl-invest-form-wide">
          <span>Anything you want us to know? <i>optional</i></span>
          <textarea
            rows={5}
            placeholder="What interests you about OneTime Labs?"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={2500}
          />
        </label>
      </div>

      <label className="otl-invest-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          I understand this form is a non-binding indication of interest only and does not create
          an investment commitment, purchase, reservation, or right to receive securities.
        </span>
      </label>

      <div className="otl-invest-honeypot" aria-hidden="true">
        <label htmlFor="investmentWebsite">Website</label>
        <input
          id="investmentWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <button className="otl-button otl-button-primary otl-invest-submit" type="submit" disabled={busy}>
        {busy ? "Submitting…" : "Register investment interest"}
        {!busy ? <ArrowRight size={14} /> : null}
      </button>

      {message ? (
        <p className={`otl-invest-form-message${success ? " is-success" : ""}`} role="status">
          {success ? <CheckCircle2 size={14} /> : null}
          <span>{message}</span>
        </p>
      ) : null}
    </form>
  );
}
