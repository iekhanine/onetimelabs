"use client";
import {useEffect,useState} from "react";
import styles from "./support.module.css";
type Ticket={ticket_number:number;subject:string;description:string;device:string;requester_name:string;status:string;urgency:string;remote_requested:boolean;created_at:string};
type Message={id:string;sender:string;body:string;created_at:string};
export default function CustomerTicket({token}:{token:string}){
 const [ticket,setTicket]=useState<Ticket|null>(null),[messages,setMessages]=useState<Message[]>([]);
 const [reply,setReply]=useState(""),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(""),[note,setNote]=useState("");
 async function load(){const r=await fetch("/api/support/customer?token="+encodeURIComponent(token),{cache:"no-store"});const j=await r.json();if(!r.ok)throw new Error(j.error||"Ticket unavailable");setTicket(j.ticket);setMessages(j.messages||[]);}
 useEffect(()=>{void load().catch(e=>setError(String(e)));},[token]);
 async function send(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");setNote("");
  try{const r=await fetch("/api/support/customer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token,message:reply,remote_consent:consent})});const j=await r.json();if(!r.ok)throw new Error(j.error||"Could not send");
   setReply("");setConsent(false);setNote("Update sent to your support technician.");await load();
  }catch(e){setError(e instanceof Error?e.message:"Unable to send");}finally{setBusy(false);}
 }
 if(!ticket)return <div className={styles.panel}><h2>{error||"Loading your ticket…"}</h2></div>;
 return <div className={styles.ticketView}><div className={styles.ticketTop}><div><span className={styles.kicker}>PRIVATE SUPPORT TICKET #{ticket.ticket_number}</span><h1>{ticket.subject}</h1><p>Opened {new Date(ticket.created_at).toLocaleString()} · {ticket.requester_name}</p></div><span className={styles.statusBadge}>{ticket.status.replaceAll("_"," ")}</span></div>
  <section className={styles.panel}><span className={styles.kicker}>ORIGINAL REQUEST</span><p className={styles.pre}>{ticket.description}</p>{ticket.device&&<p className={styles.note}>Device: {ticket.device}</p>}</section>
  <section className={styles.panel}><h2>Conversation</h2>{messages.length===0?<p className={styles.note}>There aren't any replies yet. You can add details below.</p>:<div className={styles.messages}>{messages.map(m=><article key={m.id} className={m.sender==="agent"?styles.agentMessage:styles.customerMessage}><div><strong>{m.sender==="agent"?"OneTime Labs":"You"}</strong><time>{new Date(m.created_at).toLocaleString()}</time></div><p className={styles.pre}>{m.body}</p></article>)}</div>}
  {ticket.status!=="closed"?<form onSubmit={send} className={styles.form}><label>Reply to your technician<textarea rows={4} value={reply} onChange={e=>setReply(e.target.value)} maxLength={4000} placeholder="Add details or answer a question…"/></label>
   <label className={styles.check}><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>I request attended remote support and consent to discussing a one-time session. No connection starts until I run the app and approve access.</span></label>
   {error&&<p role="alert" className={styles.error}>{error}</p>}{note&&<p role="status" className={styles.good}>{note}</p>}
   <button className={styles.primary} disabled={busy||(!reply.trim()&&!consent)}>{busy?"Sending…":"Send update →"}</button></form>:<p className={styles.note}>This ticket is closed. For another problem, <a href="/support">open a new request</a>.</p>}
  </section><section className={styles.panel}><h2>Attended remote help</h2><p>When a technician confirms a session, visit <a href="https://sos.splashtop.com" target="_blank" rel="noopener noreferrer">the official Splashtop SOS website</a>, launch the helper, and share its 9-digit session code directly with your technician through an agreed communication channel. You control the session; never share passwords.</p><p className={styles.note}>OneTime Labs does not connect to your device automatically. This is not an unattended access installation.</p></section>
  </div>;
}
