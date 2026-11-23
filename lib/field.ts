import { createClient } from "@supabase/supabase-js";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "otl_field_session";
function secret() { return process.env.OTL_FIELD_SESSION_SECRET || ""; }
export function fieldDb() {
 const url=process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url || !key) throw new Error("Field database is not configured");
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export function digest(value:string) {return createHmac("sha256",secret()).update(value).digest("hex");}
export function newToken() {return randomBytes(32).toString("base64url");}
export async function isFieldOwner() {
 const owner=process.env.OTL_FIELD_OWNER_DISCORD_ID;
 if(!owner || !secret() || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) return false;
 const value=(await cookies()).get(cookieName)?.value;
 if(!value) return false;
 const [payload,sig]=value.split(".");
 if(!payload || !sig) return false;
 const expected=digest(payload);
 if(sig.length!==expected.length || !timingSafeEqual(Buffer.from(sig),Buffer.from(expected)))return false;
 try {const data=JSON.parse(Buffer.from(payload,"base64url").toString("utf8"));return data.id===owner && typeof data.exp==="number" && data.exp>Date.now();}catch{return false;}
}
export async function createOwnerCookie(id:string){
 const payload=Buffer.from(JSON.stringify({id,exp:Date.now()+8*60*60*1000})).toString("base64url");
 (await cookies()).set(cookieName,payload+"."+digest(payload),{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:8*60*60});
}
export async function clearOwnerCookie(){(await cookies()).delete(cookieName);}
export async function accessFromToken(token:string,kind:"assessor"|"public") {
 if(!secret() || !/^[A-Za-z0-9_-]{30,100}$/.test(token)) return null;
 const db=fieldDb();
 const {data}=await db.from("otl_field_access").select("id, assessment_id,expires_at,revoked_at").eq("token_hash",digest(token)).eq("kind",kind).maybeSingle();
 if(!data || data.revoked_at || Date.parse(data.expires_at)<Date.now())return null;
 return data as {id:string;assessment_id:string;expires_at:string};
}
export function safeText(v:unknown, max=300){return typeof v==="string"?v.trim().slice(0,max):"";}
export function safeAnswers(v:unknown):Record<string,string>{
 if(!v || typeof v!=="object" || Array.isArray(v))return {};
 return Object.fromEntries(Object.entries(v).slice(0,250).filter(([k,val])=>/^[a-z0-9_-]{1,70}$/.test(k)&&typeof val==="string").map(([k,val])=>[k,(val as string).slice(0,3500)]));
}
export function safeAssets(v:unknown){
 if(!Array.isArray(v))return [];
 return v.slice(0,500).map(x=>({category:safeText(x?.category,70),manufacturer:safeText(x?.manufacturer,100),model:safeText(x?.model,120),serial:safeText(x?.serial,150),asset_tag:safeText(x?.asset_tag,100),location:safeText(x?.location,150),assigned_to:safeText(x?.assigned_to,120),condition:safeText(x?.condition,60),notes:safeText(x?.notes,500)}));
}
