import { NextResponse } from "next/server";
import { fieldDb,isFieldOwner,newToken,digest,safeText,safeAnswers,safeAssets } from "@/lib/field";
export const dynamic="force-dynamic";
const denied=()=>NextResponse.json({error:"Unauthorized"},{status:401});
export async function GET(){if(!await isFieldOwner())return denied();try{const {data,error}=await fieldDb().from("otl_field_assessments").select("*").order("updated_at",{ascending:false}).limit(100);if(error)throw error;return NextResponse.json({assessments:data||[]});}catch{return NextResponse.json({error:"Database unavailable"},{status:500});}}
export async function POST(req:Request){if(!await isFieldOwner())return denied();try{const body=await req.json();const {data,error}=await fieldDb().from("otl_field_assessments").insert({client_name:safeText(body.client_name,150)||"New client",site_name:safeText(body.site_name,150),address:safeText(body.address,300),contact_name:safeText(body.contact_name,150),contact_email:safeText(body.contact_email,200)}).select().single();if(error)throw error;return NextResponse.json({assessment:data});}catch{return NextResponse.json({error:"Could not create assessment"},{status:500});}}
export async function PATCH(req:Request){
 if(!await isFieldOwner())return denied();
 try{
  const b=await req.json();if(typeof b.id!=="string")return NextResponse.json({error:"Missing assessment ID"},{status:400});
  const update:Record<string,unknown>={updated_at:new Date().toISOString()};
  for(const k of ["client_name","site_name","address","contact_name","contact_email","assigned_to","admin_notes"])if(k in b)update[k]=safeText(b[k],k==="admin_notes"?5000:300);
  if("visit_date" in b)update.visit_date=/^\d{4}-\d{2}-\d{2}$/.test(b.visit_date)?b.visit_date:null;
  if("answers" in b)update.answers=safeAnswers(b.answers);
  if("assets" in b)update.assets=safeAssets(b.assets);
  if("status" in b&&["draft","submitted","in_review","approved","rejected"].includes(b.status))update.status=b.status;
  const {data,error}=await fieldDb().from("otl_field_assessments").update(update).eq("id",b.id).select().single();
  if(error)throw error;return NextResponse.json({assessment:data});
 }catch{return NextResponse.json({error:"Could not save assessment"},{status:500});}
}
export async function PUT(req:Request){
 if(!await isFieldOwner())return denied();
 try{
  const b=await req.json();if(typeof b.id!=="string"||!["assessor","public"].includes(b.kind))return NextResponse.json({error:"Invalid link request"},{status:400});
  const db=fieldDb();const check=await db.from("otl_field_assessments").select("id,status").eq("id",b.id).single();
  if(check.error)return NextResponse.json({error:"Assessment not found"},{status:404});
  if(b.kind==="public"&&check.data.status!=="approved")return NextResponse.json({error:"Approve the assessment before publishing an overview."},{status:409});
  const token=newToken(),days=b.kind==="public"?14:7;
  const {error}=await db.from("otl_field_access").insert({assessment_id:b.id,kind:b.kind,token_hash:digest(token),expires_at:new Date(Date.now()+days*86400000).toISOString()});
  if(error)throw error;return NextResponse.json({url:(process.env.OTL_FIELD_ORIGIN || "https://www.onetimelabs.net")+(b.kind==="public"?"/field/report/":"/field/visit/")+token,expires_in_days:days});
 }catch{return NextResponse.json({error:"Could not issue link"},{status:500});}
}
export async function DELETE(req:Request){if(!await isFieldOwner())return denied();try{const b=await req.json();const {error}=await fieldDb().from("otl_field_access").update({revoked_at:new Date().toISOString()}).eq("assessment_id",b.id);if(error)throw error;return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Could not revoke links"},{status:500});}}
