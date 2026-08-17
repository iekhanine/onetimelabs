"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Clipboard, Download, FileText, Mail, RotateCcw, ShieldCheck } from "lucide-react";
import { parseEmail } from "../../lib/emailParser";
import type { ParsedEmail } from "../../types/email";

function Field({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }
  return <div className="mail-field"><div><span>{label}</span><strong>{value}</strong></div><button onClick={copy} title={`Copy ${label}`}>{copied ? <Check size={13}/> : <Clipboard size={13}/>}</button></div>;
}

function Status({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return <div className="mail-status"><span>{label}</span><strong data-state={value.toLowerCase()}>{value}</strong></div>;
}

export default function MailParserPanel() {
  const [source, setSource] = useState("");
  const [parsed, setParsed] = useState<ParsedEmail | null>(null);
  const [error, setError] = useState("");
  const canParse = source.trim().length > 0;
  const copyAll = useMemo(() => parsed ? [
    `FROM: ${parsed.from}`, `TO: ${parsed.to}`, parsed.cc && `CC: ${parsed.cc}`,
    `SUBJECT: ${parsed.subject}`, `DATE: ${parsed.date}`, `MESSAGE ID: ${parsed.messageId}`,
    `DELIVERED TO: ${parsed.deliveredTo}`, `RETURN PATH: ${parsed.returnPath}`,
    `SPF: ${parsed.spf}`, `DKIM: ${parsed.dkim}`, `DMARC: ${parsed.dmarc}`,
    "", "MESSAGE BODY", parsed.body
  ].filter(Boolean).join("\n") : "", [parsed]);

  function runParser() {
    try {
      const result = parseEmail(source);
      if (!result.from && !result.subject && !result.body) throw new Error("No recognizable email content was found.");
      setParsed(result); setError("");
    } catch (e) { setParsed(null); setError(e instanceof Error ? e.message : "Unable to parse message."); }
  }
  function reset() { setSource(""); setParsed(null); setError(""); }

  function exportAll() {
    if (!parsed) return;

    const lines = [
      "ONETIME LABS MAIL PARSER",
      "========================================",
      "",
      "MESSAGE DETAILS",
      "----------------------------------------",
      `From: ${parsed.from || ""}`,
      `To: ${parsed.to || ""}`,
      parsed.cc ? `CC: ${parsed.cc}` : "",
      `Subject: ${parsed.subject || ""}`,
      `Date: ${parsed.date || ""}`,
      `Message-ID: ${parsed.messageId || ""}`,
      parsed.inReplyTo ? `In-Reply-To: ${parsed.inReplyTo}` : "",
      "",
      "DELIVERY",
      "----------------------------------------",
      `Delivered-To: ${parsed.deliveredTo || ""}`,
      `Return-Path: ${parsed.returnPath || ""}`,
      "",
      "AUTHENTICATION",
      "----------------------------------------",
      `SPF: ${parsed.spf || ""}`,
      `DKIM: ${parsed.dkim || ""}`,
      `DMARC: ${parsed.dmarc || ""}`,
      "",
      "RECEIVED / ROUTING",
      "----------------------------------------",
      parsed.received.length ? parsed.received.join("\n\n") : "None detected",
      "",
      "MESSAGE BODY",
      "----------------------------------------",
      parsed.body || "No readable message body found.",
      "",
      "ATTACHMENTS",
      "----------------------------------------",
      parsed.attachments.length
        ? parsed.attachments.map((a, i) => `${i + 1}. ${a.filename} | ${a.contentType} | ${a.embedded ? "EMBEDDED" : "ATTACHMENT"}`).join("\n")
        : "None detected",
      "",
      "RAW HEADERS",
      "----------------------------------------",
      parsed.rawHeaders,
      "",
      "COMPLETE ORIGINAL SOURCE",
      "========================================",
      parsed.raw,
      "",
    ].filter((line) => line !== false).join("\n");

    const datePart = (parsed.date || new Date().toISOString()).slice(0, 10).replace(/[^0-9-]/g, "") || "email";
    const subjectPart = (parsed.subject || "message")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "message";
    const filename = `mail-export-${datePart}-${subjectPart}.txt`;
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return <main className="mail-shell"><section className="mail-panel">
    <header className="mail-header"><div><span className="mail-kicker">ONETIME LABS // TOOLKIT MODULE</span><h1><Mail size={20}/> MAIL PARSER</h1><p>Turn Gmail “Show original” source into clean, structured, copy-ready message data.</p></div><a href="/" className="mail-back"><ArrowLeft size={14}/> PRODUCT DECK</a></header>

    <div className="mail-display"><div><span>PROCESSING MODE</span><strong>LOCAL BROWSER</strong></div><div><span>STORAGE</span><strong>NONE</strong></div><div><span>NETWORK</span><strong>NOT REQUIRED</strong></div></div>

    <section className="mail-input-card"><div className="mail-section-title"><div><FileText size={15}/><span>SOURCE INPUT</span></div><small>GMAIL // SHOW ORIGINAL</small></div><textarea value={source} onChange={e=>setSource(e.target.value)} placeholder={'Paste the complete Gmail “Show original” message here...'} spellCheck={false}/><div className="mail-actions"><button className="mail-primary" disabled={!canParse} onClick={runParser}>PARSE MESSAGE</button><button className="mail-secondary" onClick={reset}><RotateCcw size={13}/> CLEAR</button></div>{error && <div className="mail-error">{error}</div>}</section>

    {parsed && <div className="mail-results">
      <div className="mail-results-bar"><div><span>PARSE COMPLETE</span><strong>{parsed.attachments.length} ATTACHMENT{parsed.attachments.length===1?"":"S"}</strong></div><div className="mail-results-actions"><button onClick={()=>navigator.clipboard.writeText(copyAll)}><Clipboard size={13}/> COPY ALL</button><button className="mail-export" onClick={exportAll}><Download size={13}/> EXPORT ALL</button></div></div>

      <section className="mail-card"><div className="mail-section-title"><div><Mail size={15}/><span>MESSAGE</span></div></div><div className="mail-fields"><Field label="FROM" value={parsed.from}/><Field label="TO" value={parsed.to}/><Field label="CC" value={parsed.cc}/><Field label="SUBJECT" value={parsed.subject}/><Field label="DATE" value={parsed.date}/><Field label="MESSAGE ID" value={parsed.messageId}/><Field label="IN REPLY TO" value={parsed.inReplyTo}/></div></section>

      <section className="mail-card"><div className="mail-section-title"><div><ShieldCheck size={15}/><span>DELIVERY + AUTHENTICATION</span></div></div><div className="mail-status-grid"><Status label="SPF" value={parsed.spf}/><Status label="DKIM" value={parsed.dkim}/><Status label="DMARC" value={parsed.dmarc}/></div><div className="mail-fields"><Field label="DELIVERED TO" value={parsed.deliveredTo}/><Field label="RETURN PATH" value={parsed.returnPath}/></div>{parsed.received.length>0 && <details><summary>RECEIVED CHAIN // {parsed.received.length}</summary><pre>{parsed.received.join("\n\n")}</pre></details>}</section>

      <section className="mail-card"><div className="mail-section-title"><div><FileText size={15}/><span>MESSAGE BODY</span></div><button onClick={()=>navigator.clipboard.writeText(parsed.body)}><Clipboard size={12}/> COPY BODY</button></div><pre className="mail-body">{parsed.body || "No readable message body found."}</pre></section>

      {parsed.attachments.length>0 && <section className="mail-card"><div className="mail-section-title"><div><FileText size={15}/><span>ATTACHMENTS</span></div></div><div className="mail-attachments">{parsed.attachments.map((a,i)=><div key={`${a.filename}-${i}`}><strong>{a.filename}</strong><span>{a.contentType}</span><em>{a.embedded?"EMBEDDED":"ATTACHMENT"}</em></div>)}</div></section>}

      <section className="mail-card"><div className="mail-section-title"><div><FileText size={15}/><span>RAW SOURCE</span></div></div><details><summary>RAW HEADERS</summary><pre>{parsed.rawHeaders}</pre></details><details><summary>RAW BODY</summary><pre>{parsed.rawBody}</pre></details><details><summary>COMPLETE ORIGINAL</summary><pre>{parsed.raw}</pre></details></section>
    </div>}
  </section></main>;
}
