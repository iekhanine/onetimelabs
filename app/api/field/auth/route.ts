import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
export async function GET() {
 const client=process.env.DISCORD_CLIENT_ID, secret=process.env.DISCORD_CLIENT_SECRET, owner=process.env.OTL_FIELD_OWNER_DISCORD_ID;
 if(!client || !secret || !owner || !process.env.OTL_FIELD_SESSION_SECRET) return NextResponse.json({error:"Private login requires Discord OAuth configuration."},{status:503});
 const state=randomBytes(24).toString("base64url");
 (await cookies()).set("otl_field_oauth_state",state,{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:600});
 const redirect=process.env.OTL_FIELD_ORIGIN || "https://www.onetimelabs.net";
 const uri=new URL("https://discord.com/oauth2/authorize");
 uri.searchParams.set("client_id",client);uri.searchParams.set("response_type","code");uri.searchParams.set("redirect_uri",redirect+"/api/field/auth/callback");uri.searchParams.set("scope","identify");uri.searchParams.set("state",state);
 return NextResponse.redirect(uri);
}