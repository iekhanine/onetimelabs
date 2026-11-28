"use client";
import {usePathname} from "next/navigation";
import {useCallback,useEffect,useRef,useState} from "react";
import {createClient} from "@/lib/supabase/client";
import styles from "./SiteCopyEditor.module.css";

type CopyItem={source_key:string;original_text:string;replacement_text:string};
type Target={key:string;original:string;value:string;node:Text;element:HTMLElement};
const ignore="script,style,noscript,svg,canvas,iframe,textarea,input,select,option,[contenteditable], [data-otl-editor], [data-otl-no-edit]";
function hash(s:string){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(36);}
function sourceKey(s:string){return "t_"+hash(s)+"_"+s.length.toString(36);}
function editable(node:Text){const p=node.parentElement;return !!p&&!p.closest(ignore)&&!!node.textContent?.trim()&&(node.textContent?.trim().length||0)<=2500;}
function parts(n:Text){const raw=n.textContent||"";const text=raw.trim();return {text,lead:raw.slice(0,raw.indexOf(text)),trail:raw.slice(raw.indexOf(text)+text.length)};}
const excluded=(path:string)=>/^\/(?:admin|api|field|login|auth|display)(?:\/|$)/.test(path)||path.startsWith("/support/t/");
export default function SiteCopyEditor(){
 const pathname=usePathname()||"/";
 const [admin,setAdmin]=useState(false),[mode,setMode]=useState(false),[selected,setSelected]=useState<Target|null>(null);
 const [draft,setDraft]=useState(""),[saving,setSaving]=useState(false),[notice,setNotice]=useState("");
 const [googleToken,setGoogleToken]=useState("");
 const edits=useRef<Map<string,CopyItem>>(new Map());
 const originals=useRef(new WeakMap<Text,{text:string;lead:string;trail:string}>());
 const managed=useRef(new WeakMap<Text,string>());
 const ignorePage=excluded(pathname);
 const apply=useCallback(()=>{
  if(typeof document==="undefined"||excluded(pathname))return;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node:Node|null;
  while((node=walker.nextNode())){
   const n=node as Text;if(!editable(n))continue;
   let base=originals.current.get(n);
   if(!base){base=parts(n);originals.current.set(n,base);}
   const key=sourceKey(base.text),saved=edits.current.get(key);
   if(saved?.original_text===base.text){
    const wanted=base.lead+saved.replacement_text+base.trail;
    managed.current.set(n,wanted);
    if(n.textContent!==wanted)n.textContent=wanted;
   }else if(managed.current.get(n)===n.textContent){
    const wanted=base.lead+base.text+base.trail;
    managed.current.delete(n);
    if(n.textContent!==wanted)n.textContent=wanted;
   }
  }
 },[pathname]);
 useEffect(()=>{
  if(ignorePage)return;
  let active=true;edits.current=new Map();originals.current=new WeakMap();managed.current=new WeakMap();setSelected(null);setMode(false);setNotice("");
  fetch("/api/site-copy?path="+encodeURIComponent(pathname),{cache:"no-store"}).then(r=>r.json()).then(j=>{if(!active)return;edits.current=new Map((j.items||[]).map((x:CopyItem)=>[x.source_key,x]));apply()}).catch(()=>{});
  return()=>{active=false};
 },[pathname,ignorePage,apply]);
 useEffect(()=>{if(ignorePage)return;apply();const observer=new MutationObserver(()=>apply());observer.observe(document.body,{subtree:true,childList:true,characterData:true});return()=>observer.disconnect()},[pathname,ignorePage,apply]);
 useEffect(()=>{
  if(ignorePage)return;
  let active=true;
  let auth:ReturnType<typeof createClient>|undefined;
  try{auth=createClient()}catch{}
  async function verify(){
   let token="";
   try{const {data}=await auth?.auth.getSession()||{data:{session:null}};token=data.session?.access_token||""}catch{}
   const r=await fetch("/api/site-copy/session",{headers:token?{Authorization:"Bearer "+token}:{},cache:"no-store"}).catch(()=>null);
   const allowed=r?.ok?Boolean((await r!.json()).admin):false;
   if(active){setGoogleToken(token);setAdmin(allowed);}
  }
  void verify();
  const subscription=auth?.auth.onAuthStateChange(()=>{void verify()});
  return()=>{active=false;subscription?.data.subscription.unsubscribe()}
 },[ignorePage]);
 useEffect(()=>{
  if(!mode)return;
  function pick(e:MouseEvent){
   const element=e.target instanceof HTMLElement?e.target:null;
   if(!element||element.closest("[data-otl-editor]")||element.closest(ignore))return;
   const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);let node:Node|null,target:Text|null=null;
   while((node=walker.nextNode()))if(editable(node as Text)){target=node as Text;break}
   if(!target)return;
   const base=originals.current.get(target)||parts(target);
   originals.current.set(target,base);
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const key=sourceKey(base.text);
   const saved=edits.current.get(key);
   setSelected({node:target,element,key,original:base.text,value:saved?.original_text===base.text?saved.replacement_text:base.text});
   setDraft(saved?.original_text===base.text?saved.replacement_text:base.text);
   setNotice("");
  }
  document.addEventListener("click",pick,true);
  return()=>document.removeEventListener("click",pick,true);
 },[mode]);
 async function mutate(reset=false){
  if(!selected||saving)return;setSaving(true);setNotice("");
  const token=googleToken||"";
  try{
   if(!reset&&!draft.trim())throw Error("Text can't be empty. Use Reset to restore the original.");
   const response=await fetch("/api/site-copy",{method:reset?"DELETE":"PUT",headers:{"Content-Type":"application/json",...(token?{Authorization:"Bearer "+token}:{})},body:JSON.stringify({path:pathname,source_key:selected.key,original_text:selected.original,replacement_text:draft.trim()})});
   const data=await response.json();if(!response.ok)throw Error(data.error||"Could not save");
   if(reset){edits.current.delete(selected.key);setDraft(selected.original);}
   else{edits.current.set(selected.key,{source_key:selected.key,original_text:selected.original,replacement_text:draft.trim()});}
   apply();setNotice(reset?"Original restored.":"Saved — changes are live.");
  }catch(e){setNotice(e instanceof Error?e.message:"Unable to save");}finally{setSaving(false);}
 }
 if(ignorePage||!admin)return null;
 return <div className={styles.dock} data-otl-editor="true">
  {!mode?<button className={styles.toggle} onClick={()=>setMode(true)}>✎ Edit page text</button>:<div className={styles.toolbar}><strong>Copy editing ON</strong><span>Click any text on this page.</span><button onClick={()=>{setSelected(null);setMode(false);setNotice("")}}>Done</button></div>}
  {mode&&selected&&<div className={styles.panel} role="dialog" aria-label="Edit website copy">
   <div className={styles.panelHead}><strong>Edit website text</strong><button aria-label="Close text editor" onClick={()=>setSelected(null)}>×</button></div>
   <label>Original text<div className={styles.original}>{selected.original}</div></label>
   <label>Replacement<textarea value={draft} onChange={e=>setDraft(e.target.value)} maxLength={2500} rows={5}/></label>
   <div className={styles.actions}><button disabled={saving} onClick={()=>void mutate(true)}>Reset</button><button disabled={saving||!draft.trim()} className={styles.save} onClick={()=>void mutate()}>{saving?"Saving…":"Save text"}</button></div>
   {notice&&<p role="status">{notice}</p>}
   <small>Applies to matching text on this page. Plain text only; layout and links stay intact.</small>
  </div>}
 </div>;
}
