import {NextResponse} from "next/server";
import {fieldDb,digest,newToken,normalize,validEmail,supportEmail,emailOwner,supportUrl,jsonError} from "@/lib/support";
export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function POST(request:Request){
 try{
  const b=await request.json();
  if(normalize(b.website,250))return Response.json({ok:true});
  const email=normalize(b.email,254).toLowerCase(),name=normalize(b.name,120);
  const subject=normalize(b.subject,180),description=normalize(b.description,6000);
  if(!validEmail(email)||name.length<2||subject.length<5||description.length<12)return jsonError("Enter your name, valid email, subject and a description of at least 12 characters.");
  const provided=Number(b.form_started_at);
  if(provided>0 && (Date.now()-provided)<1500)return jsonError("Please review the form before submitting.",429);
  const db=fieldDb();
  if(!process.env.RESEND_API_KEY)return jsonError("Support email delivery is unavailable. Please try again later.",503);
  const ip=normalize(request.headers.get("x-vercel-forwarded-for")?.split(",")[0]||request.headers.get("x-forwarded-for")?.split(",")[0]||"",100);
  const fingerprint=digest("support-rate:"+(ip||email));
  const {data:rate}=await db.from("otl_support_rate_limits").select("window_start,attempts").eq("fingerprint",fingerprint).maybeSingle();
  if(rate&&Date.now()-Date.parse(rate.window_start)<3600000&&rate.attempts>=5)return jsonError("Too many requests. Please try again later.",429);
  if(rate&&Date.now()-Date.parse(rate.window_start)<3600000)await db.from("otl_support_rate_limits").update({attempts:rate.attempts+1}).eq("fingerprint",fingerprint);
  else await db.from("otl_support_rate_limits").upsert({fingerprint,window_start:new Date().toISOString(),attempts:1});
  const ticket={requester_name:name,requester_email:email,organization:normalize(b.organization,160),subject,description,device:normalize(b.device,350),category:["general","hardware","software","accounts","network","security","it-am","remote"].includes(b.category)?b.category:"general",urgency:["low","normal","high"].includes(b.urgency)?b.urgency:"normal",remote_requested:b.remote_requested===true};
  const {data,error}=await db.from("otl_support_tickets").insert(ticket).select("id,ticket_number").single();
  if(error||!data)throw error||new Error("Unable to create ticket");
  const token=newToken(),link=supportUrl(token);
  const {error:linkError}=await db.from("otl_support_access").insert({ticket_id:data.id,token_hash:digest(token),expires_at:new Date(Date.now()+90*86400000).toISOString()});
  if(linkError){await db.from("otl_support_tickets").delete().eq("id",data.id);throw linkError;}
  const sent=await supportEmail().emails.send({from:"OneTime Labs Support <support@onetimelabs.net>",to:[email],subject:"Your OneTime Labs support ticket #"+data.ticket_number,text:"We received your support request.\n\nTicket #"+data.ticket_number+"\nSubject: "+subject+"\n\nView and reply securely using your private ticket link:\n"+link+"\n\nPlease keep this link private. It grants access to your ticket. It expires after 90 days.\n\nIf remote support is needed, you will be asked to approve a separate attended Splashtop session.\n\nOneTime Labs Support"});
  if(sent.error){await db.from("otl_support_tickets").delete().eq("id",data.id);return jsonError("We couldn't send your ticket link by email. Your request wasn't submitted. Please try again.",502);}
  await emailOwner("New support ticket #"+data.ticket_number+": "+subject,"New ticket from "+name+" ("+email+")\nOrganization: "+ticket.organization+"\nUrgency: "+ticket.urgency+"\nRemote requested: "+String(ticket.remote_requested)+"\n\nOpen private admin: "+(process.env.OTL_FIELD_ORIGIN||"https://www.onetimelabs.net")+"/field");
  return Response.json({ok:true,number:data.ticket_number,message:"Ticket submitted. Check your email for your private reply link."},{headers:{"Cache-Control":"no-store"}});
 }catch(e){console.error("Support create failure",e);return jsonError("Could not submit the ticket. Please try again.",500);}
}
