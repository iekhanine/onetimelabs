import {createClient} from "@supabase/supabase-js";
import {isFieldOwner} from "@/lib/field";

/** The existing Google/Supabase admin allowlist is authoritative for /admin. */
export async function isOtlAdmin(request:Request):Promise<boolean>{
 if(await isFieldOwner())return true; // Preserve access for the existing Field Operations owner.
 const token=(request.headers.get("authorization")||"").replace(/^Bearer\s+/i,"").trim();
 if(!token)return false;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL||process.env.SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const serviceKey=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key||!serviceKey)return false;
 try{
  const auth=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);
  if(error||!data.user?.email)return false;
  const email=data.user.email.toLowerCase();
  const admins=(process.env.OTL_ADMIN_EMAILS||"").split(",").map(x=>x.trim().replace(/^["']|["']$/g,"").toLowerCase()).filter(Boolean);
  if(admins.includes(email))return true;
  const db=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:admin,error:lookupError}=await db.from("admin_users").select("email").eq("email",email).maybeSingle();
  return !lookupError&&!!admin;
 }catch{return false;}
}
