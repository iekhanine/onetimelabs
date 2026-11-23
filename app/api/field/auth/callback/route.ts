import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createOwnerCookie } from "@/lib/field";
export async function GET(req:Request){
 const url=new URL(req.url), code=url.searchParams.get("code"), state=url.searchParams.get("state");
 const stored=(await cookies()).get("otl_field_oauth_state")?.value;
 (await cookies()).delete("otl_field_oauth_state");
 const origin=process.env.OTL_FIELD_ORIGIN || "https://www.onetimelabs.net";
 if(!code || !state || !stored || state!==stored)return NextResponse.redirect(origin+"/login?error=state");
 const id=process.env.DISCORD_CLIENT_ID, secret=process.env.DISCORD_CLIENT_SECRET, owner=process.env.OTL_FIELD_OWNER_DISCORD_ID;
 if(!id || !secret || !owner || !process.env.OTL_FIELD_SESSION_SECRET)return NextResponse.redirect(origin+"/login?error=config");
 const params=new URLSearchParams({client_id:id,client_secret:secret,grant_type:"authorization_code",code,redirect_uri:origin+"/api/field/auth/callback"});
 try{
  const res=await fetch("https://discord.com/api/oauth2/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:params.toString(),cache:"no-store"});
  if(!res.ok)throw new Error("oauth");
  const token=(await res.json()).access_token;
  const me=await fetch("https://discord.com/api/users/@me",{headers:{Authorization:"Bearer "+token},cache:"no-store"});
  if(!me.ok)throw new Error("profile");
  const profile=await me.json();
  if(profile.id!==owner)return NextResponse.redirect(origin+"/login?error=denied");
  await createOwnerCookie(profile.id);
  return NextResponse.redirect(origin+"/field");
 }catch{return NextResponse.redirect(origin+"/login?error=oauth");}
}