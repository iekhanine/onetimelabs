"use client";
import {useEffect,useState} from "react";
import FieldEditor,{type Assessment} from "./FieldEditor";
import SupportDesk from "./SupportDesk";
import {completion} from "@/lib/field-playbook";
import styles from "./field.module.css";
export default function FieldDashboard(){
 const [items,setItems]=useState<Assessment[]>([]),[active,setActive]=useState<string|null>(null),[nav,setNav]=useState("assessments"),[busy,setBusy]=useState(false),[notice,setNotice]=useState(""),[link,setLink]=useState("");
 const [newName,setNewName]=useState(""),[newSite,setNewSite]=useState("");
 const [inviteEmail,setInviteEmail]=useState(""),[intakeLink,setIntakeLink]=useState("");
 async function load(){const r=await fetch("/api/field",{cache:"no-store"});const j=await r.json();if(!r.ok)setNotice(j.error||"Unable to load");else setItems(j.assessments||[]);}
 useEffect(()=>{void load();},[]);
 const selected=items.find(x=>x.id===active);
 async function create(){if(!newName.trim())return;setBusy(true);try{const r=await fetch("/api/field",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({client_name:newName,site_name:newSite})});const j=await r.json();if(!r.ok)throw Error(j.error);setItems(x=>[j.assessment,...x]);setActive(j.assessment.id);setNav("editor");setNewName("");setNewSite("");}catch(e){setNotice(String(e));}finally{setBusy(false);}}
 async function status(id:string,value:string){setBusy(true);try{const r=await fetch("/api/field",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:value})});const j=await r.json();if(!r.ok)throw Error(j.error);setItems(x=>x.map(a=>a.id===id?j.assessment:a));setNotice("Status updated.");}catch(e){setNotice(String(e));}finally{setBusy(false);}}
 async function makeLink(kind:"assessor"|"public"){if(!selected)return;setBusy(true);setLink("");try{const r=await fetch("/api/field",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:selected.id,kind})});const j=await r.json();if(!r.ok)throw Error(j.error);setLink(j.url);setNotice(kind==="assessor"?"Assessor link created. Expires in 7 days.":"Public overview link created. Expires in 14 days.");}catch(e){setNotice(String(e));}finally{setBusy(false);}}
 async function inviteTeam(mode:"link"|"email"){
  if(!selected)return;setBusy(true);setNotice("");setIntakeLink("");
  try{
   const r=await fetch("/api/field/intake-invite",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:selected.id,mode,email:inviteEmail})});
   const j=await r.json();if(!r.ok)throw new Error(j.error||"Invitation failed");
   setIntakeLink(j.url);setNotice(mode==="email"?"Questionnaire invitation emailed to "+j.recipient+".":"Private questionnaire link created. It expires in 21 days.");
  }catch(e){setNotice(e instanceof Error?e.message:"Could not send invitation");}finally{setBusy(false);}
 }
 async function revoke(){if(!selected||!confirm("Revoke every shared link for this assessment?"))return;const r=await fetch("/api/field",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:selected.id})});setNotice(r.ok?"All shared links revoked.":"Could not revoke links.");setLink("");}
 function renderList(){return <div><div className={styles.sectionTitle}><div><span className={styles.smallCaption}>ACTIVE WORKSPACE</span><h1>Site assessments</h1></div><span>{items.length} sites</span></div>
  <div className={styles.newCard}><h2>New site visit</h2><div className={styles.twoCol}><label className={styles.field}><span>Business name</span><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Client name"/></label><label className={styles.field}><span>Site / location</span><input value={newSite} onChange={e=>setNewSite(e.target.value)} placeholder="Headquarters, branch, warehouse..."/></label></div><button className={styles.primary} disabled={busy||!newName.trim()} onClick={create}>Create assessment</button></div>
  <div className={styles.cards}>{items.map(a=><button type="button" className={styles.siteCard} key={a.id} onClick={()=>{setActive(a.id);setNav("editor");setLink("");}}><span className={styles.smallCaption}>{a.status.replaceAll("_"," ").toUpperCase()}</span><strong>{a.client_name}</strong><span>{a.site_name||"Site not named"}</span><div className={styles.progressTrack}><div style={{width:completion(a.answers||{},a.assets||[])+"%"}}/></div><small>{completion(a.answers||{},a.assets||[])}% complete · {(a.assets||[]).length} devices</small></button>)}</div></div>;}
 return <main className={styles.app}>
  <aside className={styles.sidebar}><div className={styles.logo}>◈ <span>OneTime Labs<small>FIELD OPERATIONS</small></span></div><div className={styles.smallCaption}>WORKSPACE</div>
   {[["assessments","▦","Assessments"],["editor","▤","Playbook"],["review","✓","Review & publish"],["support","⌁","Help desk"]].map(([key,icon,label])=><button type="button" key={key} className={nav===key?styles.active:""} onClick={()=>setNav(key)}>{icon} <span>{label}</span></button>)}
   <div className={styles.sidebarBottom}><button onClick={async()=>{await fetch("/api/field/auth/logout",{method:"POST"});window.location.href="/login";}}>Sign out ↗</button></div>
  </aside>
  <div className={styles.main}><header className={styles.top}><div><span className={styles.smallCaption}>PRIVATE / OWNER ACCESS</span><strong>{nav==="assessments"?"Assessment overview":nav==="editor"?"Field playbook":nav==="support"?"Help desk":"Review center"}</strong></div><button onClick={()=>{setActive(null);setNav("assessments");}}>All sites</button></header>
   <div className={styles.body}>{notice&&<p className={styles.notice} role="status">{notice}</p>}
    {nav==="assessments"&&renderList()}
    {nav==="support"&&<SupportDesk/>}
    {nav==="editor"&&(selected?<><div className={styles.sectionTitle}><div><h1>{selected.client_name}</h1><p>{selected.site_name}</p></div><button onClick={()=>setNav("review")}>Share / Review →</button></div><FieldEditor key={selected.id} initial={selected} onSaved={updated=>setItems(prev=>prev.map(x=>x.id===updated.id?updated:x))}/></>:renderList())}
    {nav==="review"&&<><div className={styles.sectionTitle}><div><span className={styles.smallCaption}>REVIEW & CONTROL</span><h1>Share, review & publish</h1></div></div>
     <div className={styles.cards}>{items.map(x=><button key={x.id} className={styles.siteCard} onClick={()=>setActive(x.id)}><strong>{x.client_name}</strong><span>{x.status.replaceAll("_"," ")}</span><small>{completion(x.answers||{},x.assets||[])}% complete</small></button>)}</div>
     {selected?<div className={styles.newCard}><h2>{selected.client_name}</h2><p>Status: <b>{selected.status.replaceAll("_"," ")}</b> · {(selected.assets||[]).length} devices inventoried</p><div className={styles.actionRow}>{["in_review","approved","rejected"].map(v=><button disabled={busy} key={v} onClick={()=>status(selected.id,v)}>{v.replaceAll("_"," ")}</button>)}</div>
       <label className={styles.field}><span>Internal reviewer notes (saved with playbook)</span><textarea rows={4} value={selected.admin_notes||""} onChange={e=>setItems(prev=>prev.map(x=>x.id===selected.id?{...x,admin_notes:e.target.value}:x))}/></label><button onClick={async()=>{const r=await fetch("/api/field",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:selected.id,admin_notes:selected.admin_notes})});setNotice(r.ok?"Notes saved":"Notes not saved");}}>Save reviewer notes</button>
       <div className={styles.inviteCard}>
        <span className={styles.smallCaption}>CLIENT DISCOVERY / BEFORE THE VISIT</span>
        <h3>Send an IT pre-assessment questionnaire</h3>
        <p>Let the client's IT or ITAM team provide a first-pass inventory of their environment. Every question is optional. Their answers save into this assessment and move to your review queue when submitted.</p>
        <label className={styles.field}><span>Recipient's work email</span><input type="email" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} placeholder="it.manager@company.com"/></label>
        <div className={styles.actionRow}>
          <button type="button" disabled={busy||selected.status!=="draft"} onClick={()=>inviteTeam("link")}>Generate questionnaire link</button>
          <button type="button" disabled={busy||selected.status!=="draft"||!inviteEmail.trim()} className={styles.primary} onClick={()=>inviteTeam("email")}>Email questionnaire</button>
        </div>
        {selected.status!=="draft"&&<p>To invite another respondent, reopen this assessment as a draft first.</p>}
        {intakeLink&&<div className={styles.share}><input readOnly aria-label="IT pre-assessment questionnaire link" value={intakeLink}/><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(intakeLink);setNotice("Questionnaire link copied.");}catch{setNotice("Select the link to copy it.");}}}>Copy link</button></div>}
        <p className={styles.inviteFine}>Invite links expire after 21 days and can be revoked. Anybody with the link can complete this single questionnaire; share it only with the intended department.</p>
       </div>
       <h3>Share and deliver</h3><p>Assessor links allow a collaborator to enter observations, but not see other sites or use your admin. Public links show a redacted summary only after approval.</p><div className={styles.actionRow}><button onClick={()=>makeLink("assessor")}>Create assessor link</button><button disabled={selected.status!=="approved"} onClick={()=>makeLink("public")}>Create client overview link</button><button onClick={()=>window.open("/field/print/"+selected.id,"_blank","noopener,noreferrer")}>Export full PDF</button><button onClick={revoke}>Revoke shared links</button></div>
       {link&&<div className={styles.share}><input readOnly aria-label="Shared link" value={link}/><button onClick={()=>navigator.clipboard.writeText(link)}>Copy link</button></div>}
       <div className={styles.actionRow}><button onClick={()=>setNav("editor")}>Open full assessment</button></div>
      </div>:<p>Select a submitted assessment above, or open a site from the overview.</p>}
    </>}
   </div>
  </div>
 </main>;
}
