"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function HomeInquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your inquiry.");
      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your inquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="inquiry-confirmation" role="status">
        <CheckCircle2 size={26} strokeWidth={1.5} />
        <div><strong>INQUIRY RECEIVED</strong><p>Thanks. OneTime Labs will review it and follow up by email.</p><button type="button" onClick={() => setSubmitted(false)}>SEND ANOTHER</button></div>
      </div>
    );
  }

  return (
    <form className="home-inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-field-grid">
        <label><span>NAME *</span><input name="name" type="text" autoComplete="name" required /></label>
        <label><span>EMAIL *</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label><span>COMPANY <small>OPTIONAL</small></span><input name="company" type="text" autoComplete="organization" /></label>
      <label><span>WHAT ARE YOU DOING TODAY? *</span><textarea name="currentProcess" rows={4} required placeholder="Spreadsheet, email chain, manual process, repetitive task, or tool that is slowing the team down." /></label>
      <label><span>WHAT WOULD YOU RATHER HAVE HAPPEN? *</span><textarea name="desiredOutcome" rows={4} required placeholder="Describe the workflow, automation, application, or result you wish existed instead." /></label>
      {error && <p className="inquiry-error">{error}</p>}
      <button className="inquiry-submit" type="submit" disabled={submitting}><Send size={14} />{submitting ? "SENDING..." : "SEND INQUIRY"}</button>
    </form>
  );
}
