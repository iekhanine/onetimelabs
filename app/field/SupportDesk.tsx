"use client";
import {useEffect,useMemo,useState} from "react";
import styles from "./supportDesk.module.css";
type Summary={id:string;ticket_number:number;subject:string;requester_name:string;requester_email:string;organization:string;category:string;urgency:string;priority:string;status:string;remote_requested:boolean;created_at:string;updated_at:string;last_reply_at:string|null};
type Ticket=Summary&{description:string;device:string;internal_notes:string;remote_notes:string;remote_consent_at:string|null};
type Message={id:string;sender:"agent"|"customer";body:string;is_internal:boolean;created_at:string};
type TimeEntry={id:string;minutes:number;description:string;billable:boolean;created_at:string};
const statuses=["new","open","in_progress","waiting_customer","resolved","closed"];
const statusLabel=(x:string)=>x.replaceAll("_"," ");
export default function SupportDesk(){
 const [tickets,setTickets]=useState<Summary[]>([]),[selected,setSelected]=useState<string|null>(null),[detail,setDetail]=useState<Ticket|null>(null);
 const [messages,setMessages]=useState<Message[]>([]),[entries,setEntries]=useState<TimeEntry[]>([]);
 const [filter,setFilter]=useState("active"),[search,setSearch]=useState(""),[busy,setBusy]=useState(false),[notice,setNotice]=useState("");
 const [reply,setReply]=useState(""),[internal,setInternal]=useState(false),[minutes,setMinutes]=useState(""),[work,setWork]=useState(""),[billable,setBillable]=useState(false);
 const [notes,setNotes]=useState(""),[remoteNotes,setRemoteNotes]=useState("");
 const [timerStart,setTimerStart]=useState<number|null>(null),[elapsed,setElapsed]=useState(0);
 async function load(){
  const r=await fetch("/api/support/admin",{cache:"no-store"});const j=await r.json();if(!r.ok)throw new Error(j.error||"Queue unavailable");setTickets(j.tickets||[]);
 }
 async function open(id:string){
  setSelected(id);setNotice("");
  const r=await fetch("/api/support/admin?id="+encodeURIComponent(id),{cache:"no-store"});const j=await r.json();if(!r.ok){setNotice(j.error||"Unable to load ticket");return;}
  setDetail(j.ticket);setMessages(j.messages||[]);setEntries(j.time||[]);setNotes(j.ticket.internal_notes||"");setRemoteNotes(j.ticket.remote_notes||"");
 }
 useEffect(()=>{void load().catch(e=>setNotice(String(e)));},[]);
 useEffect(()=>{if(!timerStart)return;const id=window.setInterval(()=>setElapsed(Date.now()-timerStart),1000);return()=>window.clearInterval(id);},[timerStart]);
 const visible=useMemo(()=>tickets.filter(t=>(filter==="all"||(filter==="active"?!["resolved","closed"].includes(t.status):t.status===filter))&&[t.subject,t.requester_name,t.requester_email,t.organization,String(t.ticket_number)].join(" ").toLowerCase().includes(search.toLowerCase())),[tickets,filter,search]);
 async function change(changes:Record<string,unknown>){
  if(!detail)return;setBusy(true);setNotice("");
  try{const r=await fetch("/api/support/admin",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:detail.id,...changes})});const j=await r.json();if(!r.ok)throw new Error(j.error);
    setDetail(j.ticket);setTickets(prev=>prev.map(t=>t.id===j.ticket.id?{...t,...j.ticket}:t));setNotice("Ticket updated.");
  }catch(e){setNotice(String(e));}finally{setBusy(false);}
 }
 async function action(body:Record<string,unknown>){
  if(!detail)return;setBusy(true);setNotice("");
  try{const r=await fetch("/api/support/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...body,id:detail.id})});const j=await r.json();if(!r.ok)throw new Error(j.error);
    setNotice(body.action==="reply"?(body.internal?"Internal note added.":"Reply emailed to customer."):"Time entry saved.");
    if(body.action==="reply")setReply("");else{setMinutes("");setWork("");}
    await open(detail.id);await load();
  }catch(e){setNotice(e instanceof Error?e.message:"Action failed");}finally{setBusy(false);}
 }
 const totalMinutes=entries.reduce((n,x)=>n+x.minutes,0);
 return <div className={styles.desk}>
  <div className={styles.title}><div><span>SUPPORT OPERATIONS · OWNER ONLY</span><h1>Help desk</h1><p>Customer requests, conversations, support sessions and work logs.</p></div><button onClick={()=>{void load();if(selected)void open(selected);}}>Refresh ↻</button></div>
  {notice&&<p role="status" className={styles.notice}>{notice}</p>}
  <div className={styles.kpis}><div><small>Open workload</small><strong>{tickets.filter(x=>!["resolved","closed"].includes(x.status)).length}</strong></div><div><small>Waiting for customer</small><strong>{tickets.filter(x=>x.status==="waiting_customer").length}</strong></div><div><small>Remote requested</small><strong>{tickets.filter(x=>x.remote_requested&&!["closed"].includes(x.status)).length}</strong></div></div>
  <div className={styles.layout}><aside className={styles.queue}><div className={styles.search}><input aria-label="Search tickets" placeholder="Search tickets, people, companies…" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="Ticket status filter" value={filter} onChange={e=>setFilter(e.target.value)}><option value="active">Active tickets</option><option value="all">All tickets</option>{statuses.map(s=><option key={s} value={s}>{statusLabel(s)}</option>)}</select></div>
   <div className={styles.queueItems}>{visible.map(t=><button type="button" className={selected===t.id?styles.selected:""} key={t.id} onClick={()=>void open(t.id)}><div className={styles.itemTop}><span>#{t.ticket_number}</span><small>{statusLabel(t.status)}</small></div><strong>{t.subject}</strong><span>{t.requester_name}{t.organization?" · "+t.organization:""}</span><small>{new Date(t.updated_at).toLocaleString()} · {t.priority} priority</small></button>)}
    {visible.length===0&&<p className={styles.empty}>No tickets match this filter.</p>}</div></aside>
  <section className={styles.detail}>{!detail?<div className={styles.emptyState}><h2>Select a ticket</h2><p>Choose a request from the queue to reply, update status, record work, or coordinate Splashtop SOS support.</p></div>:<>
   <div className={styles.detailHead}><span>TICKET #{detail.ticket_number}</span><h2>{detail.subject}</h2><p>{detail.requester_name} · <a href={"mailto:"+detail.requester_email}>{detail.requester_email}</a>{detail.organization?" · "+detail.organization:""}</p><small>{new Date(detail.created_at).toLocaleString()} · {detail.category}</small></div>
   <div className={styles.controls}><label>Status<select disabled={busy} value={detail.status} onChange={e=>void change({status:e.target.value})}>{statuses.map(s=><option value={s} key={s}>{statusLabel(s)}</option>)}</select></label><label>Priority<select disabled={busy} value={detail.priority} onChange={e=>void change({priority:e.target.value})}>{["low","normal","high","urgent"].map(p=><option value={p} key={p}>{p}</option>)}</select></label></div>
   <article className={styles.block}><h3>Reported issue</h3><p className={styles.pre}>{detail.description}</p><small>{detail.device||"No device provided"} · urgency: {detail.urgency}</small></article>
   <article className={styles.block}><h3>Conversation</h3>{messages.filter(m=>!m.is_internal).map(m=><div className={styles.message} key={m.id}><div><b>{m.sender==="agent"?"You":"Customer"}</b><small>{new Date(m.created_at).toLocaleString()}</small></div><p className={styles.pre}>{m.body}</p></div>)}{!messages.some(m=>!m.is_internal)&&<p>No replies yet.</p>}
    <label className={styles.check}><input type="checkbox" checked={internal} onChange={e=>setInternal(e.target.checked)}/> Save as internal note (not emailed or shown to customer)</label>
    <textarea value={reply} onChange={e=>setReply(e.target.value)} rows={4} maxLength={4000} placeholder={internal?"Private technician note…":"Reply to customer…"} aria-label="Reply to customer"/>
    <button disabled={busy||!reply.trim()} onClick={()=>void action({action:"reply",message:reply,internal})}>{internal?"Add internal note":"Send customer reply"}</button>
    {messages.filter(m=>m.is_internal).length>0&&<div className={styles.privateNotes}><h4>Internal conversation notes</h4>{messages.filter(m=>m.is_internal).map(m=><p key={m.id} className={styles.pre}>{m.body}</p>)}</div>}
   </article>
   <article className={styles.block}><h3>Splashtop SOS · attended remote support</h3><p>Customer requested remote assistance: <strong>{detail.remote_requested?"Yes":"Not yet"}</strong>. {detail.remote_consent_at?"Consent request logged "+new Date(detail.remote_consent_at).toLocaleString():"Obtain explicit consent before connecting."}</p>
    <a href="https://sos.splashtop.com" target="_blank" rel="noopener noreferrer">Open official Splashtop SOS instructions ↗</a>
    <p className={styles.small}>Arrange a session with the customer. They launch SOS and communicate the temporary 9-digit code directly to you. This dashboard does not initiate or authorize a remote connection by itself.</p>
    <label>Session notes<textarea rows={3} value={remoteNotes} onChange={e=>setRemoteNotes(e.target.value)} placeholder="Consent, session date, work completed — avoid saving access codes"/></label><button disabled={busy} onClick={()=>void change({remote_notes:remoteNotes})}>Save remote support notes</button>
   </article>
   <article className={styles.block}><h3>Work time</h3><div className={styles.workTotal}><strong>{Math.floor(totalMinutes/60)}h {totalMinutes%60}m</strong><span>recorded on this ticket</span></div>
    <div className={styles.timer}><button type="button" onClick={()=>{if(timerStart){setMinutes(String(Math.max(1,Math.ceil((Date.now()-timerStart)/60000))));setTimerStart(null);}else{setElapsed(0);setTimerStart(Date.now());}}}>{timerStart?"Stop timer and fill minutes":"Start timer"}</button><span>{Math.floor(elapsed/60000).toString().padStart(2,"0")}:{Math.floor(elapsed/1000%60).toString().padStart(2,"0")}</span></div>
    <div className={styles.timeForm}><label>Minutes<input type="number" min={1} max={1440} value={minutes} onChange={e=>setMinutes(e.target.value)}/></label><label>Description<input value={work} onChange={e=>setWork(e.target.value)} maxLength={600} placeholder="Troubleshooting, remote support…"/></label></div><label className={styles.check}><input type="checkbox" checked={billable} onChange={e=>setBillable(e.target.checked)}/> Billable time</label><button disabled={busy||!Number.isInteger(Number(minutes))||Number(minutes)<1} onClick={()=>void action({action:"time",minutes:Number(minutes),description:work,billable})}>Log time</button>
    {entries.map(e=><div className={styles.timeEntry} key={e.id}><span>{e.minutes} min · {e.billable?"Billable":"Non-billable"} · {e.description}</span><small>{new Date(e.created_at).toLocaleString()}</small></div>)}
   </article>
   <article className={styles.block}><h3>Internal case notes</h3><textarea rows={4} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Root cause, follow-up, handoff details…"/><button disabled={busy} onClick={()=>void change({internal_notes:notes})}>Save case notes</button></article>
  </>}</section></div>
 </div>;
}
