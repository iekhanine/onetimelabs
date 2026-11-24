"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";
import SupportDesk from "@/app/field/SupportDesk";
import styles from "./admin-home.module.css";
export default function SupportInboxClient(){
 const [supabase,setSupabase]=useState<ReturnType<typeof createClient>|null>(null),[token,setToken]=useState(""),[email,setEmail]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
 useEffect(()=>{try{setSupabase(createClient())}catch(e){setError(e instanceof Error?e.message:"Unable to connect authentication");setLoading(false)}},[]);
 useEffect(()=>{if(!supabase)return;let active=true;
  async function refresh(){const {data:{session}}=await supabase!.auth.getSession();if(active){setToken(session?.access_token||"");setEmail(session?.user.email||"");setLoading(false);}}
  void refresh();const {data}=supabase.auth.onAuthStateChange(()=>{void refresh()});
  return()=>{active=false;data.subscription.unsubscribe()}
 },[supabase]);
 async function signIn(){if(!supabase)return;await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+"/auth/callback?next=/admin/support"}})}
 if(loading)return <div className={styles.login}>Checking admin session…</div>;
 if(!token)return <div className={styles.login}><h2>Admin sign-in</h2><p>Sign in using your existing authorized OneTime Labs admin Google account.</p>{error&&<p>{error}</p>}<button onClick={()=>void signIn()}>Sign in with Google</button></div>;
 return <><div className={styles.session}>Signed in as {email} · <Link href="/admin/assessments">Assessment Inbox</Link></div><SupportDesk accessToken={token}/></>;
}
