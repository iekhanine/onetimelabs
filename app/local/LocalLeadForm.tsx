"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./local.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export function LocalLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending"); setError("");
    const interest = String(data.get("interest") ?? "");
    const details = String(data.get("details") ?? "");
    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), company: data.get("company"),
          topic: interest === "website" || interest === "booking" ? "business-web" : interest === "spreadsheets" ? "business-data" : "business-tools",
          product: "", website: data.get("website"),
          message: `Interest: ${interest}\nProject: ${details}`,
          source: window.location.href,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      setStatus("sent");
      form.reset();
    } catch (e) { setError(e instanceof Error ? e.message : "Could not send your message."); setStatus("error"); }
  }
  if (status === "sent") return <div className={styles.formBox} role="status"><CheckCircle2 size={36} color="#24866c"/><h3>Thanks for reaching out!</h3><p>Your message has been sent. We'll follow up using the email you provided.</p><button className={styles.formButton} onClick={()=>setStatus("idle")}>Send another message <ArrowRight size={16}/></button></div>;
  return <form onSubmit={submit} className={styles.formBox}>
    <h3>Tell us about your idea</h3><p>Just a few details. No obligation.</p>
    <div className={styles.formPair}><label>Your name <input name="name" type="text" autoComplete="name" placeholder="Your name" maxLength={120} required/></label><label>Email address <input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={200} required/></label></div>
    <label>Business name <span>(optional)</span><input name="company" type="text" autoComplete="organization" placeholder="Your business" maxLength={160}/></label>
    <label>What can we help with? <select name="interest" defaultValue="" required><option value="" disabled>Choose what sounds closest</option><option value="website">Website</option><option value="booking">Booking / check-in</option><option value="spreadsheets">Spreadsheets / reporting</option><option value="tracking">Inventory / customer tracking</option><option value="automation">Automation / custom tools</option><option value="something-else">Something else</option></select></label>
    <label>What's going on? <textarea name="details" rows={3} placeholder="A couple sentences is plenty..." maxLength={4000} required/></label>
    <label className={styles.honeypot} aria-hidden="true">Website <input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button type="submit" className={styles.formButton} disabled={status==="sending"}>{status==="sending" ? "Sending…" : "Send my message"} <ArrowRight size={16}/></button>
    {status==="error" && <p role="alert" className={styles.error}>{error}</p>}
    <small>We'll only use your information to respond to your inquiry. No mailing list.</small>
  </form>;
}
