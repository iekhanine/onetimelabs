import { NextResponse } from "next/server";
import { Resend } from "resend";
import { accessFromToken, fieldDb, safeAnswers, safeAssets } from "@/lib/field";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
 try {
  const b=await req.json();
  const access=typeof b.token==="string"?await accessFromToken(b.token,"intake"):null;
  if(!access)return NextResponse.json({error:"This questionnaire link is invalid or expired."},{status:403});
  const db=fieldDb();
  const {data:existing,error:loadError}=await db.from("otl_field_assessments").select("id,client_name,site_name,status").eq("id",access.assessment_id).single();
  if(loadError||!existing)return NextResponse.json({error:"Assessment not found"},{status:404});
  if(existing.status!=="draft")return NextResponse.json({error:"This questionnaire has already been submitted or closed."},{status:409});
  const answers=safeAnswers(b.answers),assets=safeAssets(b.assets);
  const status=b.submit===true?"submitted":"draft";
  const {data,error}=await db.from("otl_field_assessments").update({answers,assets,status,updated_at:new Date().toISOString()}).eq("id",access.assessment_id).eq("status","draft").select("id,status").maybeSingle();
  if(error)throw error;
  if(!data)return NextResponse.json({error:"This questionnaire has already been submitted."},{status:409});
  if(status==="submitted"&&process.env.RESEND_API_KEY){
   try{
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from:"OneTime Labs <inquiry@onetimelabs.net>",to:["inquiry@onetimelabs.net"],
      subject:"[OneTime Labs] IT pre-assessment received — "+existing.client_name,
      text:"The IT pre-assessment for "+existing.client_name+" ("+(existing.site_name||"site")+") has been submitted. Review it at https://www.onetimelabs.net/field"
    });
   }catch(e){console.error("Failed to notify owner of intake submission",e);}
  }
  return NextResponse.json({ok:true,status});
 }catch{return NextResponse.json({error:"Unable to save questionnaire"},{status:500});}
}
