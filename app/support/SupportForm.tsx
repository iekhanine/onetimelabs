"use client";
import {useState} from "react";
import styles from "./support.module.css";
export default function SupportForm(){
 const [sending,setSending]=useState(false),[done,setDone]=useState<number|null>(null),[error,setError]=useState("");
 const [remote,setRemote]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(sending)return;setSending(true);setError("");
  const f=new FormData(e.currentTarget);
  try{
   const body=Object.fromEntries(f.entries());const response=await fetch("/api/support",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...body,remote_requested:remote})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||"Could not send request");
   setDone(data.number||0);
  }catch(e){setError(e instanceof Error?e.message:"Unable to submit request");}finally{setSending(false);}
 }
 if(done!==null)return <div className={styles.confirmation}><div className={styles.successMark}>✓</div><h2>We've received your request.</h2><p>Ticket <strong>#{done}</strong> has been created. Check your email for a private link to view the ticket and reply to the technician.</p><p>Keep the link private. If you don't see the message, check your spam folder.</p><button type="button" className={styles.primary} onClick={()=>setDone(null)}>Open another ticket</button></div>;
 return <form onSubmit={submit} className={styles.form}>
  <div className={styles.formSection}>CONTACT INFORMATION</div>
  <div className={styles.two}>
   <label>Your name <span className={styles.required}>*</span> <input required name="name" maxLength={120} autoComplete="name" placeholder="Full name"/></label>
   <label>Work or personal email <span className={styles.required}>*</span><input required type="email" name="email" maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
   <label>Company or organization <span className={styles.optional}>optional</span><input name="organization" maxLength={160} placeholder="Company name, or individual"/></label>
   <label>Type of request <select name="category" defaultValue="general"><option value="general">General IT question</option><option value="hardware">Computer / hardware</option><option value="software">Software / applications</option><option value="accounts">Accounts & login</option><option value="network">Wi-Fi / network / connectivity</option><option value="security">Security concern</option><option value="it-am">IT asset management</option><option value="remote">Remote assistance</option></select></label>
  </div>
  <div className={styles.formSection}>ISSUE INFORMATION</div>
  <label>Brief subject <span className={styles.required}>*</span><input required name="subject" maxLength={180} minLength={5} placeholder="e.g. Outlook is asking me to sign in repeatedly"/></label>
  <label>Description <span className={styles.required}>*</span><textarea required rows={6} name="description" minLength={12} maxLength={6000} placeholder="Describe the issue, when it started, any errors and what you've tried. Do not include passwords, access codes, or sensitive information."/></label>
  <div className={styles.two}>
   <label>Device / operating system <span className={styles.optional}>optional</span><input name="device" maxLength={350} placeholder="Windows 11 desktop / MacBook / printer"/></label>
   <label>Urgency <select name="urgency" defaultValue="normal"><option value="low">Low — question or minor issue</option><option value="normal">Normal — impacts work</option><option value="high">High — significant disruption</option></select></label>
  </div>
  <div className={styles.formSection}>SUPPORT OPTIONS</div>
  <label className={styles.check}><input type="checkbox" checked={remote} onChange={e=>setRemote(e.target.checked)}/><span>I'm open to a consent-based remote support session if needed. No remote connection will start from this form.</span></label>
  <label className={styles.trap} aria-hidden="true">Website <input tabIndex={-1} name="website" autoComplete="off"/></label>
  {error&&<p role="alert" className={styles.error}>{error}</p>}
  <div className={styles.formActions}><span>A private tracking link will be emailed to you.</span><button className={styles.primary} disabled={sending} type="submit">{sending?"Submitting…":"Submit request"}</button></div>
 </form>;
}
