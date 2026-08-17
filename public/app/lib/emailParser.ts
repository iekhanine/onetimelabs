import type { HeaderMap, ParsedEmail, Attachment } from '../types/email';
import { decodeQuotedPrintable } from './quotedPrintable';

function splitHeadBody(raw:string){ const m=raw.match(/\r?\n\r?\n/); if(!m)return [raw,'']; const i=m.index!; return [raw.slice(0,i),raw.slice(i+m[0].length)]; }
function parseHeaders(text:string):HeaderMap { const unfolded=text.replace(/\r?\n[ \t]+/g,' '); const out:HeaderMap={}; for(const line of unfolded.split(/\r?\n/)){ const i=line.indexOf(':'); if(i<1)continue; const k=line.slice(0,i).trim().toLowerCase(); (out[k]??=[]).push(line.slice(i+1).trim()); } return out; }
const first=(h:HeaderMap,k:string)=>h[k]?.[0]??'';
function authStatus(auth:string,key:string){ const m=auth.match(new RegExp(`\\b${key}=([a-zA-Z0-9_-]+)`,'i')); return m?.[1]?.toUpperCase()??''; }
function boundaryOf(contentType:string){ return contentType.match(/boundary="?([^";]+)"?/i)?.[1]??''; }
function decodePart(body:string, headers:HeaderMap){ const enc=first(headers,'content-transfer-encoding').toLowerCase(); if(enc==='quoted-printable')return decodeQuotedPrintable(body); if(enc==='base64'){ try{return atob(body.replace(/\s/g,''));}catch{return body;} } return body; }
function stripHtml(html:string){ const doc=new DOMParser().parseFromString(html,'text/html'); return (doc.body.textContent??'').replace(/\n{3,}/g,'\n\n').trim(); }
function walkMime(body:string, contentType:string, attachments:Attachment[]):{plain:string[],html:string[]}{
 const result={plain:[] as string[],html:[] as string[]}; const boundary=boundaryOf(contentType);
 if(boundary){ for(const rawPart of body.split(`--${boundary}`).slice(1)){ if(rawPart.startsWith('--'))break; const clean=rawPart.replace(/^\r?\n/,''); const [ph,pb]=splitHeadBody(clean); const h=parseHeaders(ph); const ct=first(h,'content-type')||'text/plain'; const disp=first(h,'content-disposition'); const filename=(disp.match(/filename="?([^";]+)"?/i)||ct.match(/name="?([^";]+)"?/i))?.[1]; if(filename){attachments.push({filename,contentType:ct.split(';')[0],disposition:disp||'attachment',embedded:/inline/i.test(disp)||!!first(h,'content-id')}); continue;} const child=walkMime(pb,ct,attachments); result.plain.push(...child.plain); result.html.push(...child.html); } return result; }
 const fake:HeaderMap={'content-transfer-encoding':[contentType.includes('quoted-printable')?'quoted-printable':'']}; let decoded=decodePart(body,fake); if(/text\/html/i.test(contentType)) result.html.push(stripHtml(decoded)); else if(/text\/plain/i.test(contentType)) result.plain.push(decoded.trim()); return result;
}
export function parseEmail(raw:string):ParsedEmail{
 const normalized=raw.replace(/^```[^\n]*\n?/,'').replace(/```\s*$/,'').trim(); const [rawHeaders,rawBody]=splitHeadBody(normalized); const headers=parseHeaders(rawHeaders); const attachments:Attachment[]=[]; const ct=first(headers,'content-type')||'text/plain';
 // Top-level transfer encoding is uncommon; nested MIME parts are decoded by a lightweight parser below.
 const boundary=boundaryOf(ct); let plain:string[]=[]; let html:string[]=[];
 if(boundary){ const parts=rawBody.split(`--${boundary}`).slice(1); const recurse=(part:string)=>{ const [ph,pb]=splitHeadBody(part.replace(/^\r?\n/,'')); const h=parseHeaders(ph); const pct=first(h,'content-type')||'text/plain'; const pdisp=first(h,'content-disposition'); const filename=(pdisp.match(/filename="?([^";]+)"?/i)||pct.match(/name="?([^";]+)"?/i))?.[1]; if(filename){attachments.push({filename,contentType:pct.split(';')[0],disposition:pdisp||'attachment',embedded:/inline/i.test(pdisp)||!!first(h,'content-id')});return;} const b=boundaryOf(pct); if(b){pb.split(`--${b}`).slice(1).forEach(x=>{if(!x.startsWith('--'))recurse(x)});return;} const decoded=decodePart(pb,h); if(/text\/plain/i.test(pct))plain.push(decoded.trim()); else if(/text\/html/i.test(pct))html.push(stripHtml(decoded)); };
 parts.forEach(p=>{if(!p.startsWith('--'))recurse(p)});
 } else { plain=[rawBody.trim()]; }
 const auth=(headers['authentication-results']??[]).join(' ');
 return {headers,from:first(headers,'from'),to:first(headers,'to'),cc:first(headers,'cc'),subject:first(headers,'subject'),date:first(headers,'date'),messageId:first(headers,'message-id'),inReplyTo:first(headers,'in-reply-to'),deliveredTo:first(headers,'delivered-to'),returnPath:first(headers,'return-path'),spf:authStatus(auth,'spf')||first(headers,'received-spf').split(/\s/)[0].toUpperCase(),dkim:authStatus(auth,'dkim'),dmarc:authStatus(auth,'dmarc'),received:headers['received']??[],body:(plain.find(Boolean)||html.find(Boolean)||'').trim(),attachments,rawHeaders,rawBody,raw:normalized};
}
