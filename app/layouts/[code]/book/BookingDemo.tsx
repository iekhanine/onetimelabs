"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, UserRound } from "lucide-react";
import type { BusinessSite } from "@/lib/business-site/data";

type Props = { site: BusinessSite; homeHref?: string };
const times = ["8:00 AM","9:30 AM","11:00 AM","1:00 PM","2:30 PM","4:00 PM"];

export default function BookingDemo({ site, homeHref }: Props) {
  const [step,setStep]=useState(1);
  const [service,setService]=useState(site.content.services[0]?.name || "Service");
  const [date,setDate]=useState("2026-10-09");
  const [time,setTime]=useState("9:30 AM");
  const [name,setName]=useState("Alex Customer");
  const [email,setEmail]=useState("alex@example.com");
  const [phone,setPhone]=useState("(262) 555-0199");
  const [vehicle,setVehicle]=useState("2019 BMW M340i");
  const performanceShop = site.layout.style_key === "workshop-dark";
  useEffect(()=>{ const requested=new URLSearchParams(window.location.search).get("service"); if(requested && site.content.services.some(s=>s.name===requested)) setService(requested); },[site.content.services]);
  const selected = useMemo(()=>site.content.services.find(s=>s.name===service),[site.content.services,service]);
  const home=homeHref || `/layouts/${site.layout.code}`;
  return <main className={`booking-demo-shell ${performanceShop ? "performance-booking-demo" : ""}`}>
    <header className="booking-demo-top"><Link href={home}><ArrowLeft size={16}/> Back to site</Link><div><strong>{site.instance.business_name}</strong><span>Demo booking</span></div></header>
    <section className="booking-demo-card">
      <div className="booking-demo-progress">{[1,2,3,4].map(n=><span key={n} className={step>=n?"active":""}>{n}</span>)}</div>
      {step===1&&<div className="booking-step"><span className="eyebrow">STEP 1</span><h1>Choose a service</h1><p>Select the work you need. In production, these options come from the business admin.</p><div className="booking-service-options">{site.content.services.map(s=><button key={s.name} className={service===s.name?"selected":""} onClick={()=>setService(s.name)}><strong>{s.name}</strong><small>{s.description}</small></button>)}</div><button className="booking-next" onClick={()=>setStep(2)}>Continue <ArrowRight size={16}/></button></div>}
      {step===2&&<div className="booking-step"><span className="eyebrow">STEP 2</span><h1>Pick a date & time</h1><p>This demo uses sample availability. A live site would read the real business calendar and service duration.</p><label className="booking-field"><span>Date</span><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><div className="booking-times">{times.map(t=><button key={t} className={time===t?"selected":""} onClick={()=>setTime(t)}><Clock3 size={15}/>{t}</button>)}</div><div className="booking-nav"><button onClick={()=>setStep(1)}>Back</button><button className="booking-next" onClick={()=>setStep(3)}>Continue <ArrowRight size={16}/></button></div></div>}
      {step===3&&<div className="booking-step"><span className="eyebrow">STEP 3</span><h1>Your information</h1><p>Nothing entered here is saved. This is only a client-facing workflow demonstration.</p><div className="booking-form-grid"><label className="booking-field"><span>Name</span><input value={name} onChange={e=>setName(e.target.value)}/></label><label className="booking-field"><span>Email</span><input value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="booking-field wide"><span>Mobile</span><input value={phone} onChange={e=>setPhone(e.target.value)}/></label>{performanceShop && <label className="booking-field wide"><span>Vehicle</span><input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="Year, make and model"/></label>}<label className="booking-field wide"><span>{performanceShop ? "Work requested / current setup" : "Notes"}</span><textarea rows={4} placeholder={performanceShop ? "Tell the shop what you want done, current modifications, symptoms, goals or parts already purchased." : "Anything the business should know before your appointment?"}/></label></div><div className="booking-nav"><button onClick={()=>setStep(2)}>Back</button><button className="booking-next" onClick={()=>setStep(4)}>Review booking <ArrowRight size={16}/></button></div></div>}
      {step===4&&<div className="booking-step booking-review"><CheckCircle2 size={44}/><span className="eyebrow">FINAL STEP</span><h1>Review your appointment</h1><div className="booking-summary"><div><CalendarDays/><span><small>Service</small><strong>{service}</strong><em>{selected?.description}</em></span></div><div><Clock3/><span><small>Date & time</small><strong>{date} · {time}</strong></span></div><div><UserRound/><span><small>Customer</small><strong>{name}</strong><em>{email} · {phone}</em>{performanceShop && <em>{vehicle}</em>}</span></div></div><div className="demo-warning">Demo only — clicking confirm does not save, email, charge, or create an appointment.</div><div className="booking-nav"><button onClick={()=>setStep(3)}>Back</button><button className="booking-next" onClick={()=>alert("Demo complete — no appointment was saved.")}>Confirm demo booking</button></div></div>}
    </section>
  </main>;
}
