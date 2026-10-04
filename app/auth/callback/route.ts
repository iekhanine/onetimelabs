import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(request: Request){const u=new URL(request.url);const code=u.searchParams.get("code");const next=u.searchParams.get("next")||"/omr/upload";if(code){const s=await createClient();await s.auth.exchangeCodeForSession(code)}return NextResponse.redirect(new URL(next,u.origin));}
