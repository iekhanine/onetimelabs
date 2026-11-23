import {notFound,redirect} from "next/navigation";
import type {Metadata} from "next";
import {isFieldOwner,fieldDb} from "@/lib/field";
import {fieldSections} from "@/lib/field-playbook";
import PrintButton from "../../PrintButton";
import "../../field.css";
import styles from "../../field.module.css";
export const metadata:Metadata={title:"Internal Site Assessment Report | OneTime Labs",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function FullReport({params}:{params:Promise<{id:string}>}){
 if(!await isFieldOwner())redirect("/login");
 const {id}=await params;if(!/^[0-9a-f-]{36}$/.test(id))notFound();
 const {data:a,error}=await fieldDb().from("otl_field_assessments").select("*").eq("id",id).single();if(error||!a)notFound();
 const answers=(a.answers||{}) as Record<string,string>;
 const assets=(Array.isArray(a.assets)?a.assets:[]) as Record<string,string>[];
 return <main className={styles.report}><div className={styles.reportInner}><header><span>◈ OneTime Labs</span><small>CONFIDENTIAL / INTERNAL ASSESSMENT</small></header><h1>{a.client_name}</h1><h2>{a.site_name}</h2><p>{a.address||""} · Visit date: {a.visit_date||"Not set"} · Assessor: {a.assigned_to||"Not set"}</p><p>Review status: {a.status}</p><PrintButton/>
 {fieldSections.map(s=><section key={s.id}><h3>{s.title}</h3>{s.questions.map(q=><div key={q.id} style={{marginBottom:16}}><b>{q.label}</b><p>{answers[q.id]||"Not recorded"}</p></div>)}</section>)}
 <section><h3>Device inventory ({assets.length})</h3>{assets.map((x,i)=><div key={i} style={{padding:"14px 0",borderBottom:"1px solid #ffffff33"}}><b>{i+1}. {x.category} · {x.manufacturer} {x.model}</b><p>Serial: {x.serial||"—"} · Asset tag: {x.asset_tag||"—"} · Location: {x.location||"—"} · Assigned to: {x.assigned_to||"—"} · Condition: {x.condition||"—"}</p><p>{x.notes}</p></div>)}</section>
 <section><h3>Internal reviewer notes</h3><p>{a.admin_notes||"None recorded"}</p></section>
 </div></main>;
}
