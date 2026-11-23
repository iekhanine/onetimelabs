import type {Metadata} from "next";
import {accessFromToken,fieldDb} from "@/lib/field";
import {notFound} from "next/navigation";
import FieldEditor,{type Assessment} from "../../FieldEditor";
import "../../field.css";
import styles from "../../field.module.css";
export const metadata:Metadata={title:"Site Visit | OneTime Labs",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function GuestVisit({params}:{params:Promise<{token:string}>}){
 const {token}=await params;const access=await accessFromToken(token,"assessor");if(!access)notFound();
 const {data}=await fieldDb().from("otl_field_assessments").select("id,client_name,site_name,address,visit_date,assigned_to,answers,assets,status").eq("id",access.assessment_id).single();
 if(!data)notFound();
 return <main className={styles.guest}><header><span>◈ OneTime Labs</span><small>PRIVATE FIELD ASSESSMENT</small></header><div className={styles.guestShell}><div className={styles.sectionTitle}><div><span className={styles.smallCaption}>AUTHORIZED ASSESSOR WORKSPACE</span><h1>{data.client_name}</h1><p>{data.site_name}</p></div></div><FieldEditor initial={data as Assessment} token={token}/></div></main>;
}