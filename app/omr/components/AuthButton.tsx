"use client";
import { createClient } from "@/lib/supabase/client";
export default function AuthButton(){async function login(){const s=createClient();await s.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}/auth/callback?next=/omr/upload`}})}return <button className="omr-auth-button" onClick={login}>SIGN IN WITH GOOGLE</button>}
