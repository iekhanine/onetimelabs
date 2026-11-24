import {fieldDb} from "@/lib/field";
import {isOtlAdmin} from "@/lib/admin-auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};

function allowedPath(input:unknown):input is string{
 return typeof input==="string"&&input.length<=240&&input.startsWith("/")&&!input.startsWith("//")&&!/[?#\\\x00-\x1f]/.test(input)&&!/^\/(?:api|admin|field|login|auth)(?:\/|$)/.test(input)&&!/^\/support\/t\//.test(input);
}
export async function GET(req:Request){
 const path=new URL(req.url).searchParams.get("path");
 if(!allowedPath(path))return Response.json({error:"Invalid page"},{status:400,headers});
 try{
  const {data,error}=await fieldDb().from("otl_site_copy").select("source_key,original_text,replacement_text,updated_at").eq("page_path",path).limit(700);
  if(error)throw error;
  return Response.json({items:data||[]},{headers});
 }catch(e){console.error("site copy get",e);return Response.json({error:"Unable to load page copy"},{status:500,headers});}
}
export async function PUT(req:Request){
 if(!await isOtlAdmin(req))return Response.json({error:"Admin authorization required"},{status:403,headers});
 try{
  const body=await req.json();const {path,source_key,original_text,replacement_text}=body;
  if(!allowedPath(path)||typeof source_key!=="string"||!/^[a-z0-9_-]{5,100}$/.test(source_key)||typeof original_text!=="string"||!original_text.trim()||original_text.length>2500||typeof replacement_text!=="string"||!replacement_text.trim()||replacement_text.length>2500)return Response.json({error:"Invalid copy change"},{status:400,headers});
  const db=fieldDb();
  // Keys are derived from the original visible text. Do not allow a different baseline for an existing key.
  const {data:previous,error:readError}=await db.from("otl_site_copy").select("original_text").eq("page_path",path).eq("source_key",source_key).maybeSingle();
  if(readError)throw readError;
  if(previous&&previous.original_text!==original_text)return Response.json({error:"This copy key belongs to different text. Reload the page."},{status:409,headers});
  const {error}=await db.from("otl_site_copy").upsert({page_path:path,source_key,original_text,replacement_text,updated_at:new Date().toISOString(),updated_by:"authorized admin"},{onConflict:"page_path,source_key"});
  if(error)throw error;
  await db.from("otl_site_copy_history").insert({page_path:path,source_key,original_text,replacement_text,changed_by:"authorized admin"});
  return Response.json({ok:true},{headers});
 }catch(e){console.error("site copy save",e);return Response.json({error:"Couldn't save this edit"},{status:500,headers});}
}
export async function DELETE(req:Request){
 if(!await isOtlAdmin(req))return Response.json({error:"Admin authorization required"},{status:403,headers});
 try{
  const body=await req.json();if(!allowedPath(body.path)||typeof body.source_key!=="string"||!/^[a-z0-9_-]{5,100}$/.test(body.source_key))return Response.json({error:"Invalid copy key"},{status:400,headers});
  const db=fieldDb();const {error}=await db.from("otl_site_copy").delete().eq("page_path",body.path).eq("source_key",body.source_key);if(error)throw error;
  await db.from("otl_site_copy_history").insert({page_path:body.path,source_key:body.source_key,original_text:"[reset]",replacement_text:null,changed_by:"authorized admin"});
  return Response.json({ok:true},{headers});
 }catch{return Response.json({error:"Couldn't reset the copy"},{status:500,headers});}
}
