"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";
import styles from "./admin-home.module.css";
export default function ContentEditorStart(){
 const [ready,setReady]=useState(false),[allowed,setAllowed]=useState(false),[error,setError]=useState("");
 const [auth,setAuth]=useState<ReturnType<typeof createClient>|null>(null);
 useEffect(()=>{try{setAuth(createClient())}catch{setReady(true)}},[]);
 useEffect(()=>{let active=true;async function test(){
  let token="";try{if(auth)token=(await auth.auth.getSession()).data.session?.access_token||""}catch{}
  const r=await fetch("/api/site-copy/session",{headers:token?{Authorization:"Bearer "+token}:{},cache:"no-store"}).catch(()=>null);
  if(active){setAllowed(r?.ok?Boolean((await r!.json()).admin):false);setReady(true);}
 }void test();const sub=auth?.auth.onAuthStateChange(()=>{void test()});return()=>{active=false;sub?.data.subscription.unsubscribe()}},[auth]);
 async function google(){if(!auth){setError("Google sign-in isn't configured here.");return}await auth.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+"/auth/callback?next=/admin/content"}})}
 return <div className={styles.shell}><span className={styles.eyebrow}>WEBSITE CONTENT</span><h1>Page text editor</h1>
 <p className={styles.intro}>Edit the visible text on any public OneTime Labs page. Changes save immediately to the database and remain after a deployment.</p>
 {!ready?<p>Checking your admin session…</p>:allowed?<><div className={styles.tiles}>
 <Link href="/"><span>START HERE</span><h2>Edit homepage →</h2><p>Open the site, click “Edit page text” in the bottom corner, then click the text you want to change.</p></Link>
 <Link href="/support"><span>CLIENT PORTAL</span><h2>Edit Help Desk →</h2><p>Change support page labels, headings and instructions directly on the page.</p></Link>
 </div><p className={styles.intro}>The editor appears on other public pages too. You can restore any edited text using Reset.</p></>:<div className={styles.login}><h2>Sign in to edit</h2><p>Use your authorized Google admin account, or sign in to Field Operations with the owner Discord account first.</p><div style={{display:"flex",gap:12,flexWrap:"wrap"}}><button onClick={()=>void google()}>Google admin login</button><Link href="/login" style={{alignSelf:"center"}}>Discord owner login ↗</Link></div>{error&&<p role="alert">{error}</p>}</div>}
 </div>;
}
