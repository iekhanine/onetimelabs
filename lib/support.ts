import {fieldDb,digest,newToken,safeText,isFieldOwner} from "@/lib/field";
import {Resend} from "resend";

export {fieldDb,digest,newToken,safeText,isFieldOwner};
export const supportOrigin=()=>process.env.OTL_FIELD_ORIGIN||"https://www.onetimelabs.net";
export const supportUrl=(token:string)=>supportOrigin()+"/support/t/"+token;
export const validEmail=(email:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&email.length<=254;
export function jsonError(error:string,status=400){return Response.json({error},{status,headers:{"Cache-Control":"no-store"}});}
export function supportEmail(){const key=process.env.RESEND_API_KEY;if(!key)throw new Error("Support email is not configured");return new Resend(key);}
export async function accessTicket(token:string){
 if(!process.env.OTL_FIELD_SESSION_SECRET|| !/^[A-Za-z0-9_-]{35,100}$/.test(token))return null;
 const db=fieldDb();const {data,error}=await db.from("otl_support_access").select("ticket_id,expires_at,revoked_at").eq("token_hash",digest(token)).maybeSingle();
 if(error||!data||data.revoked_at||Date.parse(data.expires_at)<Date.now())return null;
 return data.ticket_id as string;
}
export const normalize=(v:unknown,n=1000)=>safeText(v,n);
export function supportClientTicket(t:Record<string,unknown>){
 return {id:t.id,ticket_number:t.ticket_number,subject:t.subject,description:t.description,device:t.device,organization:t.organization,requester_name:t.requester_name,urgency:t.urgency,status:t.status,category:t.category,remote_requested:t.remote_requested,created_at:t.created_at,updated_at:t.updated_at};
}
export async function emailCustomer(email:string,subject:string,body:string){
 return supportEmail().emails.send({from:"OneTime Labs Support <support@onetimelabs.net>",to:[email],subject,text:body});
}
export async function emailOwner(subject:string,body:string){
 try{const result=await supportEmail().emails.send({from:"OneTime Labs Support <support@onetimelabs.net>",to:["support@onetimelabs.net"],subject,text:body});if(result.error)console.error("Support inbox notification failed",result.error);}catch(e){console.error("Support inbox notification failed",e);}
}
