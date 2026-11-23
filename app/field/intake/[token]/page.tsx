import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {accessFromToken,fieldDb} from "@/lib/field";
import FieldEditor,{type Assessment} from "../../FieldEditor";
import styles from "../../field.module.css";
import "../../field.css";

export const metadata:Metadata={title:"IT Pre-Assessment | OneTime Labs",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default async function ClientIntake({params}:{params:Promise<{token:string}>}){
 const {token}=await params;
 const access=await accessFromToken(token,"intake");
 if(!access)notFound();
 const {data,error}=await fieldDb().from("otl_field_assessments").select("id,client_name,site_name,address,visit_date,assigned_to,answers,assets,status").eq("id",access.assessment_id).single();
 if(error||!data)notFound();
 return <main className={styles.guest}>
   <header><span>◈ OneTime Labs</span><small>IT ENVIRONMENT / PRE-ASSESSMENT</small></header>
   <div className={styles.guestShell}>
     <div className={styles.intakeWelcome}>
       <span className={styles.smallCaption}>CLIENT QUESTIONNAIRE · NO ACCOUNT REQUIRED</span>
       <h1>Help us understand your IT environment.</h1>
       <p>We're preparing a potential scope of work for <strong>{data.client_name}</strong>{data.site_name?" — "+data.site_name:""}. Your team's knowledge helps us identify priorities, assess complexity, and prepare a more accurate proposal.</p>
       <p><strong>Nothing is required.</strong> Answer the questions you can, skip the rest, and save your progress. You can submit even if you only answer a few. This questionnaire does not ask for passwords or confidential credentials.</p>
     </div>
     {data.status==="draft"?<FieldEditor initial={data as Assessment} token={token} mode="intake"/>:<div className={styles.intakeWelcome}><h2>Questionnaire received.</h2><p>Thank you for your team's input. This assessment is now with OneTime Labs for review.</p></div>}
   </div>
 </main>;
}
