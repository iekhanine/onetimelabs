"use client";
import {useState} from "react";
import {fieldSections,assetCategories,completion} from "@/lib/field-playbook";
import styles from "./field.module.css";

export type Asset={category:string;manufacturer:string;model:string;serial:string;asset_tag:string;location:string;assigned_to:string;condition:string;notes:string};
export type Assessment={id:string;client_name:string;site_name:string;address:string;contact_name?:string;contact_email?:string;visit_date?:string|null;assigned_to?:string;admin_notes?:string;status:string;answers:Record<string,string>;assets:Asset[]};
const blankAsset:Asset={category:"Laptop",manufacturer:"",model:"",serial:"",asset_tag:"",location:"",assigned_to:"",condition:"",notes:""};
export default function FieldEditor({initial,token,onSaved}:{initial:Assessment;token?:string;onSaved?:(x:Assessment)=>void}){
 const [a,setA]=useState<Assessment>(initial);
 const [tab,setTab]=useState("scope"),[busy,setBusy]=useState(false),[notice,setNotice]=useState("");
 const guest=Boolean(token),readOnly=guest&&["approved","rejected","in_review"].includes(a.status);
 const sections=[...fieldSections,{id:"assets",title:"09 · Device logbook",description:"Inventory serials, locations, assignments and observed condition. Do not record passwords.",questions:[]}];
 function setAnswer(id:string,value:string){setA(prev=>({...prev,answers:{...prev.answers,[id]:value}}));}
 function setAsset(i:number,key:keyof Asset,value:string){setA(prev=>({...prev,assets:prev.assets.map((x,j)=>i===j?{...x,[key]:value}:x)}));}
 async function save(submit=false){
  setBusy(true);setNotice("");
  try{
   const req=guest?{url:"/api/field/guest",method:"POST",body:{token,answers:a.answers,assets:a.assets,assigned_to:a.assigned_to,submit}}:{url:"/api/field",method:"PATCH",body:{...a,status:submit?"submitted":a.status}};
   const res=await fetch(req.url,{method:req.method,headers:{"Content-Type":"application/json"},body:JSON.stringify(req.body),cache:"no-store"});
   const data=await res.json();if(!res.ok)throw new Error(data.error||"Save failed");
   if(data.assessment){setA(data.assessment);onSaved?.(data.assessment);}
   else if(submit)setA(prev=>({...prev,status:"submitted"}));
   setNotice(submit?"Submitted for review.":"Saved successfully.");
  }catch(e){setNotice(e instanceof Error?e.message:"Unable to save");}finally{setBusy(false);}
 }
 const percent=completion(a.answers,a.assets||[]);
 return <div className={styles.editor}>
  <aside className={styles.editorNav}>
   <div className={styles.smallCaption}>FIELD PLAYBOOK</div>
   <div className={styles.progressLine}><strong>{percent}%</strong><span>complete</span></div>
   <div className={styles.progressTrack}><div style={{width:percent+"%"}}/></div>
   <div className={styles.mobileNav}>{sections.map(s=><button type="button" key={s.id} className={tab===s.id?styles.active:""} onClick={()=>setTab(s.id)}>{s.title}</button>)}</div>
  </aside>
  <section className={styles.editorContent}>
   {sections.filter(s=>s.id===tab).map(s=><div key={s.id}>
    <div className={styles.smallCaption}>SITE ASSESSMENT / {a.client_name}</div>
    <h2>{s.title}</h2><p className={styles.description}>{s.description}</p>
    {tab==="scope"&&<div className={styles.twoCol}>
     {([["client_name","Client / business"],["site_name","Location / site"],["address","Site address"],["contact_name","Contact person"],["contact_email","Contact email"],["visit_date","Visit date"],["assigned_to","Assessor"]] as const).map(([k,label])=><label className={styles.field} key={k}><span>{label}</span><input disabled={guest||readOnly} type={k==="visit_date"?"date":"text"} value={String(a[k]||"")} onChange={e=>setA(prev=>({...prev,[k]:e.target.value}))}/></label>)}
    </div>}
    {s.questions.map(q=><label className={styles.field} key={q.id}><span>{q.label}</span><textarea disabled={readOnly} rows={3} value={a.answers?.[q.id]||""} onChange={e=>setAnswer(q.id,e.target.value)} placeholder="Observations, evidence, follow-up, owner and next action..."/></label>)}
    {tab==="assets"&&<div className={styles.assets}>
      <div className={styles.assetHeading}><strong>{a.assets?.length||0} recorded devices</strong><button disabled={readOnly} type="button" onClick={()=>setA(prev=>({...prev,assets:[...(prev.assets||[]),{...blankAsset}]}))}>+ Add device</button></div>
      {(a.assets||[]).map((asset,i)=><article className={styles.assetCard} key={i}>
       <header><b>Device {i+1}</b><button type="button" disabled={readOnly} onClick={()=>setA(prev=>({...prev,assets:prev.assets.filter((_,j)=>i!==j)}))}>Remove</button></header>
       <div className={styles.twoCol}>{(Object.keys(blankAsset) as (keyof Asset)[]).map(k=><label className={styles.field} key={k}><span>{k.replaceAll("_"," ")}</span>{k==="category"?<select disabled={readOnly} value={asset[k]} onChange={e=>setAsset(i,k,e.target.value)}>{assetCategories.map(x=><option key={x}>{x}</option>)}</select>:<input disabled={readOnly} value={asset[k]||""} onChange={e=>setAsset(i,k,e.target.value)}/>}</label>)}</div>
      </article>)}
    </div>}
   </div>)}
   <div className={styles.editorFooter}><span role="status">{notice}</span><div><button disabled={busy||readOnly} onClick={()=>save(false)} type="button">{busy?"Saving…":"Save progress"}</button>{guest&&a.status!=="submitted"&&<button disabled={busy} className={styles.primary} onClick={()=>save(true)} type="button">Submit for review</button>}</div></div>
  </section>
 </div>;
}
