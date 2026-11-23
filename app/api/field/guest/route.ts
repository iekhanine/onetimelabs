import { NextResponse } from "next/server";
import { accessFromToken,fieldDb,safeAnswers,safeAssets,safeText } from "@/lib/field";
export const dynamic="force-dynamic";
async function resolve(req:Request){const url=new URL(req.url), token=req.method==="GET"?url.searchParams.get("token"):null;return token?accessFromToken(token,"assessor"):null;}
export async function GET(req:Request){try{const access=await resolve(req);if(!access)return NextResponse.json({error:"Link expired or invalid"},{status:403});const {data,error}=await fieldDb().from("otl_field_assessments").select("id,client_name,site_name,address,visit_date,answers,assets,status").eq("id",access.assessment_id).single();if(error)throw error;return NextResponse.json({assessment:data});}catch{return NextResponse.json({error:"Unable to load visit"},{status:500});}}
export async function POST(req:Request){
 try{const b=await req.json();const access=typeof b.token==="string"?await accessFromToken(b.token,"assessor"):null;if(!access)return NextResponse.json({error:"Link expired or invalid"},{status:403});
 const db=fieldDb();const {data:existing,error:loadError}=await db.from("otl_field_assessments").select("status").eq("id",access.assessment_id).single();
 if(loadError||!existing)return NextResponse.json({error:"Not found"},{status:404});
 if(["approved","rejected","in_review"].includes(existing.status))return NextResponse.json({error:"Visit is locked for review"},{status:409});
 const update={answers:safeAnswers(b.answers),assets:safeAssets(b.assets),assigned_to:safeText(b.assigned_to,150),status:b.submit?"submitted":"draft",updated_at:new Date().toISOString()};
 const {error}=await db.from("otl_field_assessments").update(update).eq("id",access.assessment_id);if(error)throw error;return NextResponse.json({ok:true,status:update.status});
 }catch{return NextResponse.json({error:"Unable to save visit"},{status:500});}
}
