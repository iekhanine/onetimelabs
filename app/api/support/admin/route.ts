import {fieldDb,isFieldOwner,normalize,jsonError,emailCustomer,supportOrigin} from "@/lib/support";
export const runtime="nodejs";export const dynamic="force-dynamic";
const statuses=["new","open","waiting_customer","in_progress","resolved","closed"];
const priorities=["low","normal","high","urgent"];
async function owner(){return await isFieldOwner();}
export async function GET(req:Request){
 if(!await owner())return jsonError("Unauthorized",401);
 try{
  const db=fieldDb(),id=new URL(req.url).searchParams.get("id");
  if(!id){
   const {data,error}=await db.from("otl_support_tickets").select("id,ticket_number,requester_name,requester_email,organization,subject,category,urgency,priority,status,remote_requested,created_at,updated_at,last_reply_at").order("updated_at",{ascending:false}).limit(250);
   if(error)throw error;return Response.json({tickets:data||[]},{headers:{"Cache-Control":"no-store"}});
  }
  if(!/^[\da-f-]{36}$/i.test(id))return jsonError("Invalid ticket",400);
  const [{data:t,error:e},{data:messages},{data:time}]=await Promise.all([
   db.from("otl_support_tickets").select("*").eq("id",id).single(),
   db.from("otl_support_messages").select("*").eq("ticket_id",id).order("created_at",{ascending:true}),
   db.from("otl_support_time").select("*").eq("ticket_id",id).order("created_at",{ascending:false})
  ]);
  if(e||!t)return jsonError("Ticket not found",404);
  return Response.json({ticket:t,messages:messages||[],time:time||[]},{headers:{"Cache-Control":"no-store"}});
 }catch(e){console.error("Ticket admin get",e);return jsonError("Unable to load support tickets.",500);}
}
export async function PATCH(req:Request){
 if(!await owner())return jsonError("Unauthorized",401);
 try{
  const b=await req.json();if(!/^[\da-f-]{36}$/i.test(b.id||""))return jsonError("Invalid ticket",400);
  const changes:Record<string,unknown>={updated_at:new Date().toISOString()};
  if(statuses.includes(b.status))changes.status=b.status;
  if(priorities.includes(b.priority))changes.priority=b.priority;
  if(typeof b.internal_notes==="string")changes.internal_notes=normalize(b.internal_notes,6000);
  if(typeof b.remote_notes==="string")changes.remote_notes=normalize(b.remote_notes,3000);
  const {data,error}=await fieldDb().from("otl_support_tickets").update(changes).eq("id",b.id).select().single();if(error)throw error;
  return Response.json({ticket:data});
 }catch{return jsonError("Unable to update ticket.",500);}
}
export async function POST(req:Request){
 if(!await owner())return jsonError("Unauthorized",401);
 try{
  const b=await req.json();if(!/^[\da-f-]{36}$/i.test(b.id||""))return jsonError("Invalid ticket",400);
  const db=fieldDb();const {data:t,error:e}=await db.from("otl_support_tickets").select("id,ticket_number,requester_email,subject,status").eq("id",b.id).single();
  if(e||!t)return jsonError("Ticket not found",404);
  if(b.action==="time"){
    const minutes=Number(b.minutes),description=normalize(b.description,600);
    if(!Number.isInteger(minutes)||minutes<1||minutes>1440)return jsonError("Enter 1–1440 minutes",400);
    const {error}=await db.from("otl_support_time").insert({ticket_id:t.id,minutes,description,billable:b.billable===true});if(error)throw error;
    return Response.json({ok:true});
  }
  if(b.action!=="reply")return jsonError("Invalid action",400);
  const message=normalize(b.message,4000),internal=b.internal===true;
  if(!message)return jsonError("Write a reply",400);
  if(!internal){
    const sent=await emailCustomer(t.requester_email,"OneTime Labs reply — ticket #"+t.ticket_number,
      "A support technician has replied to your ticket #"+t.ticket_number+".\n\n"+message+"\n\nTo respond, use the private ticket link in your original confirmation email. If you lost that link, contact support@onetimelabs.net.");
    if(sent.error)return jsonError("Could not email customer. Reply not saved.",502);
  }
  const {error}=await db.from("otl_support_messages").insert({ticket_id:t.id,sender:"agent",body:message,is_internal:internal});if(error)throw error;
  await db.from("otl_support_tickets").update({updated_at:new Date().toISOString(),status:internal?t.status:"waiting_customer",last_reply_at:new Date().toISOString()}).eq("id",t.id);
  return Response.json({ok:true});
 }catch(e){console.error("Ticket admin action",e);return jsonError("Action could not be completed.",500);}
}
