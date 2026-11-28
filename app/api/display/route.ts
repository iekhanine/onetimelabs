import {fieldDb} from "@/lib/field";
import {isOtlAdmin} from "@/lib/admin-auth";
export const runtime="nodejs"; export const dynamic="force-dynamic";
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(req:Request){
 try{
 const body=await req.json(); const {ws,screen,op,p}=body;
 if(typeof ws!=="string"||typeof screen!=="string"||! /^[a-z0-9-]{1,40}$/.test(ws)||! /^[a-z0-9-]{1,40}$/.test(screen)||!["read","bootstrap","pair","revoke","reset","set_pin","lock","unlock","add_task","toggle_task","delete_task","add_module","remove_module","note"].includes(op))return reply({error:"Invalid request"},400);
 const db=fieldDb();let actor:string|null=null;
 const bearer=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
 if(bearer){const {data,error}=await db.auth.getUser(bearer);if(!error&&data.user&&await isOtlAdmin(req))actor=data.user.id;}
 const device=req.headers.get("x-display-device");
 if(!actor&&!device)return reply({error:"Sign in or pair this display"},401);
 if(device&&!/^[a-f0-9]{64}$/.test(device))return reply({error:"Invalid device"},401);
 const {data,error}=await db.rpc("otl_display_v1",{actor,device,ws,screen,op,p:p||{}});
 if(error){console.error("display rpc",error.code);return reply({error:"Display operation failed"},500);}
 return reply(data,data?.error?400:200);
 }catch{return reply({error:"Unable to process request"},400);}
}