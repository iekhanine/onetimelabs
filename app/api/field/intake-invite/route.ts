import { NextResponse } from "next/server";
import { Resend } from "resend";
import { fieldDb, isFieldOwner, newToken, digest, safeText } from "@/lib/field";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const urlBase = () => process.env.OTL_FIELD_ORIGIN || "https://www.onetimelabs.net";

export async function POST(req: Request) {
 if (!await isFieldOwner()) return NextResponse.json({error:"Unauthorized"},{status:401});
 let tokenHash = "";
 let db: ReturnType<typeof fieldDb> | null = null;
 try {
   const body = await req.json();
   if (typeof body.id !== "string" || !/^[a-f0-9-]{36}$/i.test(body.id)) return NextResponse.json({error:"Invalid assessment"},{status:400});
   const mode = body.mode === "email" ? "email" : "link";
   const recipient = safeText(body.email,254);
   if (mode === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return NextResponse.json({error:"Enter a valid recipient email address"},{status:400});
   db=fieldDb();
   const {data:a,error:findError}=await db.from("otl_field_assessments").select("id,client_name,site_name,status").eq("id",body.id).single();
   if(findError||!a) return NextResponse.json({error:"Assessment not found"},{status:404});
   if(a.status!=="draft") return NextResponse.json({error:"Reopen the assessment as a draft before inviting respondents"},{status:409});
   if(mode==="email"&&!process.env.RESEND_API_KEY)return NextResponse.json({error:"Email delivery is not configured"},{status:503});
   const token=newToken();tokenHash=digest(token);
   const expires=new Date(Date.now()+21*86400000).toISOString();
   const {error:insertError}=await db.from("otl_field_access").insert({assessment_id:a.id,kind:"intake",token_hash:tokenHash,expires_at:expires});
   if(insertError)throw insertError;
   const link=urlBase()+"/field/intake/"+token;
   if(mode==="email"){
     const sender=new Resend(process.env.RESEND_API_KEY);
     const site=a.site_name?(" ("+a.site_name+")"):"";
     const result=await sender.emails.send({
       from:"OneTime Labs <inquiry@onetimelabs.net>",
       to:[recipient],
       subject:"IT environment pre-assessment — "+a.client_name,
       text:"Hello,\n\nOneTime Labs is preparing an IT environment assessment for "+a.client_name+site+". We'd appreciate your team's input to help scope the work accurately.\n\nComplete the optional questionnaire here:\n"+link+"\n\nEvery question is optional. Provide only what you know; you can save and return later, or submit a partial response. Do not enter passwords or other credentials. The private link expires in 21 days and can be forwarded to an authorized colleague on your team.\n\nThank you,\nOneTime Labs"
     });
     if(result.error)throw new Error("Email delivery failed. Please create and copy a link instead.");
   }
   return NextResponse.json({url:link,expires_at:expires,delivered:mode==="email",recipient:mode==="email"?recipient:null});
 }catch(error){
   if(tokenHash&&db)await db.from("otl_field_access").delete().eq("token_hash",tokenHash);
   return NextResponse.json({error:error instanceof Error?error.message:"Could not create invitation"},{status:500});
 }
}
