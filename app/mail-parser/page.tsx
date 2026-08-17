"use client";
import { useMemo, useState } from "react";
import "./page.css";

function findLine(text:string,label:string){
  const m=text.match(new RegExp(`^${label}\\s*:\\s*(.+)$`,"im")); return m?.[1]?.trim() || "";
}
export default function MailParser(){
  const [raw,setRaw]=useState("");
  const parsed=useMemo(()=>({
    from:findLine(raw,"From"),
    to:findLine(raw,"To"),
    cc:findLine(raw,"Cc"),
    subject:findLine(raw,"Subject"),
    date:findLine(raw,"Date|Sent"),
    links:Array.from(raw.matchAll(/https?:\/\/[^\s<>"')]+/g)).map(m=>m[0]),
    emails:Array.from(new Set(Array.from(raw.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)).map(m=>m[0]))),
  }),[raw]);

  return <main className="mail-page"><div className="mail-shell">
    <a href="/" className="mail-back">← OneTime Labs</a>
    <p className="mail-kicker">MAIL PARSER</p>
    <h1>Paste the email. We’ll break it apart.</h1>
    <p className="mail-intro">Open the email in Gmail, Outlook, or your mail client. Select the full message, copy it, then paste it below. Nothing is published by this page.</p>
    <div className="mail-grid">
      <section><label>PASTE EMAIL CONTENT</label><textarea value={raw} onChange={e=>setRaw(e.target.value)} placeholder={"From: sender@example.com\nTo: you@example.com\nSubject: Example\n\nPaste the complete email here..."} /></section>
      <section className="results"><h2>Parsed details</h2>
        {["from","to","cc","subject","date"].map(k=><div className="result-row" key={k}><span>{k.toUpperCase()}</span><strong>{parsed[k as keyof typeof parsed] as string || "Not detected"}</strong></div>)}
        <div className="result-block"><span>EMAIL ADDRESSES</span>{parsed.emails.length?parsed.emails.map(e=><code key={e}>{e}</code>):<em>None detected</em>}</div>
        <div className="result-block"><span>LINKS</span>{parsed.links.length?parsed.links.map(l=><a key={l} href={l} target="_blank" rel="noreferrer">{l}</a>):<em>None detected</em>}</div>
      </section>
    </div>
  </div></main>
}
