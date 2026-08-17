import { useState } from 'react';
import { Clipboard, Mail, ShieldCheck, Trash2 } from 'lucide-react';
import { parseEmail } from './lib/emailParser';
import { copyText } from './lib/clipboard';
import type { ParsedEmail } from './types/email';
import './App.css';

const Row=({label,value}:{label:string,value:string})=> value ? <div className="row"><div><span>{label}</span><p>{value}</p></div><button onClick={()=>copyText(value)} title={`Copy ${label}`}><Clipboard size={14}/></button></div>:null;
export default function App(){
 const [source,setSource]=useState(''); const [email,setEmail]=useState<ParsedEmail|null>(null); const [error,setError]=useState('');
 const parse=()=>{try{if(!source.trim())throw new Error('Paste a Gmail Show original message first.'); setEmail(parseEmail(source));setError('');}catch(e){setError(e instanceof Error?e.message:'Unable to parse message');}};
 return <main><header><div className="brand"><b>OneTime Labs</b><span>Toolkit / Mail Parser</span></div><div className="privacy"><ShieldCheck size={15}/> Local processing. Nothing is uploaded.</div></header>
 <section className="hero"><div className="eyebrow">EMAIL TOOLKIT</div><h1>Mail Parser</h1><p>Paste the complete source from Gmail <b>Show original</b>. Decode MIME, inspect delivery data, and copy clean message content.</p></section>
 {!email?<section className="input-card"><div className="card-title"><Mail size={18}/><div><h2>Original message</h2><p>Paste the complete raw email source below.</p></div></div><textarea value={source} onChange={e=>setSource(e.target.value)} placeholder="Delivered-To: you@example.com\nReceived: ...\nFrom: ...\n\nMessage body..."/>{error&&<div className="error">{error}</div>}<div className="actions"><button className="secondary" onClick={()=>{setSource('');setError('')}}><Trash2 size={15}/> Clear</button><button className="primary" onClick={parse}>Parse message</button></div></section>:
 <section className="results"><div className="result-head"><div><div className="eyebrow">PARSED MESSAGE</div><h2>{email.subject||'Untitled message'}</h2></div><div className="actions"><button className="secondary" onClick={()=>copyText(email.raw)}><Clipboard size={15}/> Copy original</button><button className="primary" onClick={()=>setEmail(null)}>Parse another</button></div></div>
 <div className="grid"><article><h3>Message</h3><Row label="From" value={email.from}/><Row label="To" value={email.to}/><Row label="CC" value={email.cc}/><Row label="Subject" value={email.subject}/><Row label="Date" value={email.date}/><Row label="Message-ID" value={email.messageId}/><Row label="In-Reply-To" value={email.inReplyTo}/></article>
 <article><h3>Delivery & authentication</h3><Row label="Delivered-To" value={email.deliveredTo}/><Row label="Return-Path" value={email.returnPath}/><Row label="SPF" value={email.spf}/><Row label="DKIM" value={email.dkim}/><Row label="DMARC" value={email.dmarc}/></article></div>
 <article className="wide"><div className="article-head"><h3>Clean message body</h3><button onClick={()=>copyText(email.body)}><Clipboard size={14}/> Copy body</button></div><pre>{email.body||'No readable text body found.'}</pre></article>
 <div className="grid"><article><h3>Attachments</h3>{email.attachments.length?email.attachments.map((a,i)=><div className="attachment" key={i}><b>{a.filename}</b><span>{a.contentType} · {a.embedded?'embedded':'attachment'}</span></div>):<p className="muted">No attachments detected.</p>}</article><article><h3>Received chain</h3><p className="muted">{email.received.length} routing hop{email.received.length===1?'':'s'} detected.</p>{email.received.map((r,i)=><Row key={i} label={`Hop ${i+1}`} value={r}/>)}</article></div>
 <details><summary>Raw headers</summary><pre>{email.rawHeaders}</pre></details><details><summary>Raw body</summary><pre>{email.rawBody}</pre></details></section>}
 <footer>OneTime Labs Toolkit · Mail Parser · v0.1.0</footer></main>
}
