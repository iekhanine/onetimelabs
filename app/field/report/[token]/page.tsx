import type {Metadata} from "next";
import {accessFromToken,fieldDb} from "@/lib/field";
import {notFound} from "next/navigation";
import PrintButton from "../../PrintButton";
import "../../field.css";
import styles from "../../field.module.css";
export const metadata:Metadata={title:"Site Overview | OneTime Labs",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function PublicOverview({params}:{params:Promise<{token:string}>}){
 const {token}=await params;const access=await accessFromToken(token,"public");if(!access)notFound();
 const {data:a}=await fieldDb().from("otl_field_assessments").select("client_name,site_name,visit_date,status,answers,assets").eq("id",access.assessment_id).single();
 if(!a||a.status!=="approved")notFound();
 const answers=(a.answers||{}) as Record<string,string>;
 return <main className={styles.report}><div className={styles.reportInner}><header><span>◈ OneTime Labs</span><small>CLIENT OVERVIEW / APPROVED</small></header><span className={styles.smallCaption}>SITE TECHNOLOGY REVIEW</span><h1>{a.client_name}</h1><h2>{a.site_name}</h2><p>Assessment date: {a.visit_date||"Not recorded"} · Devices logged: {Array.isArray(a.assets)?a.assets.length:0}</p>
 <section><h3>Executive summary</h3><p>{answers.executive_summary||"Summary pending."}</p></section>
 <section><h3>Recommendations</h3><p>{answers.recommendations||"Recommendations pending."}</p></section>
 <section><h3>Next steps</h3><p>{answers.next_steps||"Follow-up to be agreed."}</p></section>
 <p className={styles.reportNote}>This client overview is intentionally limited. Detailed asset serial numbers, contact details, internal notes, and security observations are excluded.</p>
 <PrintButton/>
 </div></main>;
}