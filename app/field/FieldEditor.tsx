"use client";
import {useEffect,useRef,useState} from "react";
import {fieldSections,assetCategories,completion} from "@/lib/field-playbook";
import styles from "./field.module.css";

export type Asset={category:string;manufacturer:string;model:string;serial:string;asset_tag:string;location:string;assigned_to:string;condition:string;notes:string};
export type Assessment={id:string;client_name:string;site_name:string;address:string;contact_name?:string;contact_email?:string;visit_date?:string|null;assigned_to?:string;admin_notes?:string;status:string;answers:Record<string,string>;assets:Asset[]};
const blankAsset:Asset={category:"Laptop",manufacturer:"",model:"",serial:"",asset_tag:"",location:"",assigned_to:"",condition:"",notes:""};
export default function FieldEditor({initial,token,mode="assessor",onSaved}:{initial:Assessment;token?:string;mode?:"assessor"|"intake";onSaved?:(x:Assessment)=>void}){
 const [a,setA]=useState<Assessment>(initial);
 const [tab,setTab]=useState("scope"),[busy,setBusy]=useState(false),[notice,setNotice]=useState(""),[menuOpen,setMenuOpen]=useState(false);
 const [revision,setRevision]=useState(0);
 const [saveState,setSaveState]=useState<"saved"|"unsaved"|"saving"|"error"|"recovered">("saved");
 const guest=Boolean(token),intake=guest&&mode==="intake",readOnly=guest&&a.status!=="draft";
 const sections=[...fieldSections,{id:"assets",title:"10 · Device logbook",description:"Inventory serials, locations, assignments and observed condition. Do not record passwords.",questions:[]}];
 const draftKey="otl-field-unsaved:"+initial.id+":"+(guest?(mode+":"+token?.slice(0,12)):"owner");
 const dataRef=useRef<Assessment>(initial);
 const revisionRef=useRef(0);
 const savedRevisionRef=useRef(0);
 const inFlightRef=useRef<Promise<boolean>|null>(null);
 const submitRef=useRef(false);
 const mountedRef=useRef(false);

 function updateDraft(updater:(prev:Assessment)=>Assessment){
  setA(prev=>updater(prev));
  revisionRef.current+=1;
  setRevision(revisionRef.current);
  setSaveState("unsaved");
  setNotice("");
 }
 function setAnswer(id:string,value:string){updateDraft(prev=>({...prev,answers:{...prev.answers,[id]:value}}));}
 function setAsset(i:number,key:keyof Asset,value:string){updateDraft(prev=>({...prev,assets:prev.assets.map((x,j)=>i===j?{...x,[key]:value}:x)}));}

 // Only unfinished changes are cached locally. A confirmed server save removes the cache.
 useEffect(()=>{
  try{
   const raw=localStorage.getItem(draftKey);
   if(raw && !readOnly){
    const candidate=JSON.parse(raw) as {assessment?:Assessment};
    if(candidate.assessment?.id===initial.id && candidate.assessment?.status==="draft"){
     const restored:Assessment={...initial,answers:candidate.assessment.answers||{},assets:candidate.assessment.assets||[],assigned_to:candidate.assessment.assigned_to||initial.assigned_to};
     if(!guest)Object.assign(restored,{client_name:candidate.assessment.client_name,site_name:candidate.assessment.site_name,address:candidate.assessment.address,contact_name:candidate.assessment.contact_name,contact_email:candidate.assessment.contact_email,visit_date:candidate.assessment.visit_date});
     dataRef.current=restored;setA(restored);
     revisionRef.current+=1;setRevision(revisionRef.current);setSaveState("recovered");
     setNotice("Recovered unsaved answers from this device. They will sync automatically.");
    }
   }
  }catch{/* Browser storage may be disabled; server-side saving still works. */}
  mountedRef.current=true;
 // Mount-only recovery for this assessment.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[draftKey]);

 useEffect(()=>{
  dataRef.current=a;
  if(!mountedRef.current || revision===0 || readOnly)return;
  try{localStorage.setItem(draftKey,JSON.stringify({assessment:a,savedAt:Date.now()}));}catch{/* Continue with network autosave. */}
 },[a,draftKey,revision,readOnly]);

 async function persist(submit=false):Promise<boolean>{
  if(readOnly || (submitRef.current && !submit))return false;
  if(submit)submitRef.current=true;
  if(inFlightRef.current)await inFlightRef.current;
  if(!submit && savedRevisionRef.current>=revisionRef.current)return true;
  const snapshot=dataRef.current, snapshotRevision=revisionRef.current;
  setSaveState("saving");
  if(submit)setBusy(true);
  const operation=(async()=>{
   try{
    const req=guest?{url:intake?"/api/field/intake":"/api/field/guest",method:"POST",body:{token,answers:snapshot.answers,assets:snapshot.assets,assigned_to:snapshot.assigned_to,submit}}:{url:"/api/field",method:"PATCH",body:{...snapshot,status:submit?"submitted":snapshot.status}};
    const res=await fetch(req.url,{method:req.method,headers:{"Content-Type":"application/json"},body:JSON.stringify(req.body),cache:"no-store",keepalive:true});
    const data=await res.json();
    if(!res.ok)throw new Error(data.error||"Save failed");
    savedRevisionRef.current=Math.max(savedRevisionRef.current,snapshotRevision);
    if(submit){
     if(data.assessment){setA(data.assessment);dataRef.current=data.assessment;onSaved?.(data.assessment);}
     else {setA(prev=>({...prev,status:"submitted"}));}
     setNotice("Submitted successfully. Thank you!");
     setSaveState("saved");
     try{localStorage.removeItem(draftKey);}catch{}
    }else if(snapshotRevision===revisionRef.current){
     setSaveState("saved");
     setNotice("");
     try{localStorage.removeItem(draftKey);}catch{}
     // Do not overwrite newer text in the editor with an older server response.
     if(data.assessment)onSaved?.(data.assessment);
    }else{
     setSaveState("unsaved");
    }
    return true;
   }catch(e){
    setSaveState("error");
    setNotice((e instanceof Error?e.message:"Unable to save")+" — your unsaved answers are retained on this device.");
    return false;
   }finally{
    if(submit){setBusy(false);submitRef.current=false;}
   }
  })();
  inFlightRef.current=operation;
  const ok=await operation;
  if(inFlightRef.current===operation)inFlightRef.current=null;
  return ok;
 }

 useEffect(()=>{
  if(revision===0 || readOnly || submitRef.current)return;
  const timeout=window.setTimeout(()=>{void persist(false);},1100);
  return ()=>window.clearTimeout(timeout);
 // Changes to the form schedule a debounced save.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[revision,readOnly]);

 useEffect(()=>{
  const flush=()=>{if(document.visibilityState==="hidden" && revisionRef.current>savedRevisionRef.current && !submitRef.current){void persist(false);}};
  document.addEventListener("visibilitychange",flush);
  return ()=>document.removeEventListener("visibilitychange",flush);
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[guest,intake,readOnly,draftKey]);

 async function save(submit=false){
  if(submit && !window.confirm("Submit your answers for review? You won't be able to edit them afterward."))return;
  await persist(submit);
 }
 const percent=completion(a.answers,a.assets||[]);
 const currentIndex=sections.findIndex(s=>s.id===tab);
 function goTo(index:number){if(index<0||index>=sections.length)return;setTab(sections[index].id);setMenuOpen(false);document.getElementById("field-section-heading")?.scrollIntoView({behavior:"smooth",block:"start"});}
 const siteSummary=[["Client / business",a.client_name],["Site / location",a.site_name],["Site address",a.address],["Site contact",a.contact_name],["Contact email",a.contact_email],["Visit date",a.visit_date]].filter(([,value])=>Boolean(value));

 return <div className={styles.editor}>
  <div className={styles.mobileSectionBar}>
    <button type="button" className={styles.mobileSectionTrigger} onClick={()=>setMenuOpen(true)} aria-label="Open all assessment sections" aria-expanded={menuOpen}>
     <span className={styles.mobileSectionIcon}>☰</span><span><small>SECTION {currentIndex+1} OF {sections.length} · {percent}% COMPLETE</small><strong>{sections[currentIndex]?.title||"Choose section"}</strong></span><span aria-hidden="true">▾</span>
    </button>
    <div className={styles.mobileSectionTrack}><div style={{width:percent+"%"}}/></div>
  </div>
  {menuOpen&&<button type="button" aria-label="Close section menu" className={styles.mobileBackdrop} onClick={()=>setMenuOpen(false)}/>}
  <aside className={styles.editorNav+" "+(menuOpen?styles.mobileOpen:"")}>
   <div className={styles.smallCaption}>{intake?"OPTIONAL IT QUESTIONNAIRE":"FIELD PLAYBOOK"}</div>
   <div className={styles.progressLine}><strong>{percent}%</strong><span>complete</span></div>
   <div className={styles.progressTrack}><div style={{width:percent+"%"}}/></div>
   <div className={styles.mobileNav}>{sections.map(s=><button type="button" key={s.id} className={tab===s.id?styles.active:""} onClick={()=>{setTab(s.id);setMenuOpen(false);}}>{s.title}</button>)}</div>
  </aside>
  <section className={styles.editorContent}>
   {sections.filter(s=>s.id===tab).map(s=><div key={s.id}>
    <div className={styles.smallCaption}>{intake?"IT PRE-ASSESSMENT":"SITE ASSESSMENT"} / {a.client_name}</div>
    <h2 id="field-section-heading">{s.title}</h2><p className={styles.description}>{s.description}</p>
    {intake&&<p className={styles.intakeHint}>All questions are optional. Skip anything you don't know. Please don't enter passwords, private keys, or other credentials.</p>}
    {intake&&tab==="scope"&&<div className={styles.twoCol}>{([["respondent_name","Your name (optional)"],["respondent_email","Your work email (optional)"]] as const).map(([key,label])=><label className={styles.field} key={key}><span>{label}</span><input disabled={readOnly} value={a.answers?.[key]||""} onChange={e=>setAnswer(key,e.target.value)} placeholder="Optional"/></label>)}</div>}
    {tab==="scope"&&guest&&<div className={styles.siteSummary}>
      <div className={styles.siteSummaryHeading}><strong>Site details</strong><span>Provided by OneTime Labs · read-only</span></div>
      <div className={styles.siteSummaryGrid}>{siteSummary.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      {intake&&<p>This is the site you are reviewing. If any details are incorrect, note the correction below so we can update our records.</p>}
    </div>}
    {tab==="scope"&&!guest&&<div className={styles.twoCol}>
     {([["client_name","Client / business"],["site_name","Location / site"],["address","Site address"],["contact_name","Contact person"],["contact_email","Contact email"],["visit_date","Visit date"],["assigned_to","Assessor"]] as const).map(([k,label])=><label className={styles.field} key={k}><span>{label}</span><input disabled={readOnly} type={k==="visit_date"?"date":"text"} value={String(a[k]||"")} onChange={e=>updateDraft(prev=>({...prev,[k]:e.target.value}))}/></label>)}
    </div>}
    {tab==="scope"&&intake&&<label className={styles.field}><span>Corrections to site details (optional)</span><textarea disabled={readOnly} rows={2} value={a.answers?.site_corrections||""} onChange={e=>setAnswer("site_corrections",e.target.value)} placeholder="Anything we should correct about this site?"/></label>}
    {tab==="scope"&&guest&&!intake&&<label className={styles.field}><span>Assessor name</span><input disabled={readOnly} value={a.assigned_to||""} onChange={e=>updateDraft(prev=>({...prev,assigned_to:e.target.value}))}/></label>}
    {s.questions.map(q=><label className={styles.field} key={q.id}><span>{q.label}</span><textarea disabled={readOnly} rows={3} value={a.answers?.[q.id]||""} onChange={e=>setAnswer(q.id,e.target.value)} placeholder={intake?"Share what you know (optional)":"Observations, evidence, follow-up, owner and next action..."}/></label>)}
    {tab==="assets"&&<div className={styles.assets}>
      <div className={styles.assetHeading}><strong>{a.assets?.length||0} recorded devices</strong><button disabled={readOnly} type="button" onClick={()=>updateDraft(prev=>({...prev,assets:[...(prev.assets||[]),{...blankAsset}]}))}>+ Add device</button></div>
      {(a.assets||[]).map((asset,i)=><article className={styles.assetCard} key={i}>
       <header><b>Device {i+1}</b><button type="button" disabled={readOnly} onClick={()=>updateDraft(prev=>({...prev,assets:prev.assets.filter((_,j)=>i!==j)}))}>Remove</button></header>
       <div className={styles.twoCol}>{(Object.keys(blankAsset) as (keyof Asset)[]).map(k=><label className={styles.field} key={k}><span>{k.replaceAll("_"," ")}</span>{k==="category"?<select disabled={readOnly} value={asset[k]} onChange={e=>setAsset(i,k,e.target.value)}>{assetCategories.map(x=><option key={x}>{x}</option>)}</select>:<input disabled={readOnly} value={asset[k]||""} onChange={e=>setAsset(i,k,e.target.value)}/>}</label>)}</div>
      </article>)}
    </div>}
   </div>)}
   <div className={styles.sectionPager}>
    <button type="button" disabled={currentIndex===0} onClick={()=>goTo(currentIndex-1)}>← Previous section</button>
    <span>{currentIndex+1} / {sections.length}</span>
    <button type="button" disabled={currentIndex===sections.length-1} onClick={()=>goTo(currentIndex+1)}>{currentIndex===sections.length-2?"Device logbook →":"Next section →"}</button>
   </div>
   <div className={styles.editorFooter}><span role="status">{notice||({saved:"✓ All changes saved",unsaved:"Changes pending…",saving:"Saving changes…",error:"Save failed — retry below",recovered:"Recovered local draft — syncing…"}[saveState])}</span><div><button disabled={busy||readOnly} onClick={()=>void save(false)} type="button">{saveState==="saving"?"Saving…":saveState==="error"?"Retry save":"Save now"}</button>{guest&&!readOnly&&<button disabled={busy||saveState==="saving"} className={styles.primary} onClick={()=>void save(true)} type="button">{intake?"Submit answers":"Submit for review"}</button>}</div></div>
  </section>
 </div>;
}
