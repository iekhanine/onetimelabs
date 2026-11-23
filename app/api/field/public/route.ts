import { NextResponse } from "next/server";
import { accessFromToken,fieldDb } from "@/lib/field";
export const dynamic="force-dynamic";
export async function GET(req:Request){
 try{const token=new URL(req.url).searchParams.get("token");const access=token?await accessFromToken(token,"public"):null;
 if(!access)return NextResponse.json({error:"Link expired or invalid"},{status:403});
 const {data,error}=await fieldDb().from("otl_field_assessments").select("client_name,site_name,address,visit_date,status,answers,assets").eq("id",access.assessment_id).single();
 if(error||!data||data.status!=="approved")return NextResponse.json({error:"Report unavailable"},{status:404});
 // Public overview omits serial numbers, asset tags, assigned users and internal notes.
 return NextResponse.json({overview:{client_name:data.client_name,site_name:data.site_name,visit_date:data.visit_date,summary:data.answers?.executive_summary||"",recommendations:data.answers?.recommendations||"",assets_count:Array.isArray(data.assets)?data.assets.length:0}});
 }catch{return NextResponse.json({error:"Report unavailable"},{status:500});}
}
