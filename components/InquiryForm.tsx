"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const productOptions = [
  { value: "otles", label: "OTLES" },
  { value: "changeops", label: "ChangeOps" },
  { value: "pccr", label: "PCCR" },
  { value: "licensing", label: "OneTime Labs Licensing" },
  { value: "otlam", label: "OTLAM" },
  { value: "plotmap", label: "PlotMap" },
  { value: "creator-tools", label: "Creator / streaming tools" },
];

const topicOptions = [
  { value: "business", label: "Business solutions consultation" },
  { value: "business-web", label: "Website / booking / customer-facing service" },
  { value: "business-tools", label: "Internal tool / job or customer tracking" },
  { value: "business-data", label: "Spreadsheets / reporting / data cleanup" },
  { value: "enterprise", label: "Enterprise consultation" },
  { value: "vendor-migration", label: "Enterprise — vendor migration" },
  { value: "managed-print", label: "Enterprise — Managed Print Services" },
  { value: "contact-center", label: "Enterprise — contact center / Five9 / Genesys" },
  { value: "consulting", label: "Enterprise consulting" },
  { value: "custom", label: "Enterprise custom software / workflow" },
  { value: "product", label: "Software product question / demo" },
  { value: "support", label: "Product support" },
  { value: "partnership", label: "Partnership" },
  { value: "general", label: "General inquiry" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const searchParams = useSearchParams();

  const initialProduct = useMemo(() => {
    const value = searchParams.get("product") ?? "";
    return productOptions.some((option) => option.value === value) ? value : "";
  }, [searchParams]);

  const initialTopic = useMemo(() => {
    const value = searchParams.get("topic") ?? "consulting";
    return topicOptions.some((option) => option.value === value) ? value : "consulting";
  }, [searchParams]);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      topic: String(data.get("topic") ?? ""),
      product: String(data.get("product") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      source: window.location.href,
    };

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Message could not be sent.");
    }
  }

  if (status === "sent") {
    return (
      <div className="inquiry-success" role="status">
        <span className="eyebrow">Message sent</span>
        <h2>Got it.</h2>
        <p>Your message is on its way to OneTime Labs. We will reply to the email address you provided.</p>
        <button className="button button--ink" type="button" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form__row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" maxLength={120} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={200} required />
        </label>
      </div>

      <div className="inquiry-form__row">
        <label>
          <span>Company / organization <small>optional</small></span>
          <input name="company" type="text" autoComplete="organization" maxLength={160} />
        </label>
        <label>
          <span>What is this about?</span>
          <select name="topic" defaultValue={initialTopic} required>
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Product <small>optional</small></span>
        <select name="product" defaultValue={initialProduct}>
          <option value="">Not product-specific</option>
          {productOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <label>
        <span>What are you trying to do?</span>
        <textarea
          name="message"
          rows={8}
          maxLength={6000}
          placeholder="Tell us the problem, what you are looking at, or what you want to know."
          required
        />
      </label>

      <label className="inquiry-form__honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="inquiry-form__footer">
        <button className="button button--ink" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send to OneTime Labs"}
        </button>
        <p>Replies go to the email address you enter above.</p>
      </div>

      {status === "error" && (
        <p className="inquiry-form__error" role="alert">{errorMessage}</p>
      )}
    </form>
  );
}
