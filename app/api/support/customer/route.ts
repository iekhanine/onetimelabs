import {fieldDb,accessTicket,supportClientTicket,normalize,jsonError,emailOwner,supportOrigin} from "@/lib/support";
export const runtime="nodejs";export const dynamic="force-dynamic";
function tokenFrom(request:Request){return new URL(request.url).searchParams.get("token")||"";}
export async function GET(req:Request){
 try{
  const id=await accessTicket(tokenFrom(req));if(!id)return jsonError("This ticket link is invalid or expired.",403);
  const db=fieldDb();
  const {data:t,error}=await db.from("otl_support_tickets").select("*").eq("id",id).single();
  if(error||!t)return jsonError("Ticket unavailable.",404);
  const {data:messages}=await db.from("otl_support_messages").select("id,sender,body,created_at").eq("ticket_id",id).eq("is_internal",false).order("created_at",{ascending:true});
  return Response.json({ticket:supportClientTicket(t),messages:messages||[]},{headers:{"Cache-Control":"no-store"}});
 }catch{return jsonError("Unable to load ticket.",500);}
}
export async function POST(req:Request){
 try{
  const b=await req.json();const id=await accessTicket(typeof b.token==="string"?b.token:"");if(!id)return jsonError("This ticket link is invalid or expired.",403);
  const body=normalize(b.message,4000),consent=b.remote_consent===true;
  if(!body&&!consent)return jsonError("Write a reply first.");
  const db=fieldDb();const {data:t,error}=await db.from("otl_support_tickets").select("id,ticket_number,subject,status").eq("id",id).single();
  if(error||!t)return jsonError("Ticket unavailable.",404);
  if(t.status==="closed")return jsonError("This ticket is closed. Please open a new support request.",409);
  if(consent){
   await db.from("otl_support_tickets").update({remote_requested:true,remote_consent_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",id);
  }
  if(body){
   const {error:insertError}=await db.from("otl_support_messages").insert({ticket_id:id,sender:"customer",body,is_internal:false});if(insertError)throw insertError;
  }
  await db.from("otl_support_tickets").update({status:"open",updated_at:new Date().toISOString(),last_reply_at:new Date().toISOString()}).eq("id",id);
  await emailOwner("Customer update — ticket #"+t.ticket_number,
    "A customer updated support ticket #"+t.ticket_number+".\nSubject: "+t.subject+"\nRemote support requested: "+(consent?"Yes":"Not in this reply")+"\n\nReview at "+supportOrigin()+"/field");
  return Response.json({ok:true});
 }catch{return jsonError("Unable to send reply.",500);}
}
