"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, Scissors, UserRound } from "lucide-react";
import type { BusinessSite } from "@/lib/business-site/data";
import { salonServices, salonStylists } from "./salonData";

const dates=["Fri Oct 9","Sat Oct 10","Tue Oct 13","Wed Oct 14"];
const times=["9:00 AM","10:30 AM","12:00 PM","2:00 PM","3:30 PM","5:00 PM"];

export default function SalonBookingDemo({site}:{site:BusinessSite}){
  const base=`/layouts/${site.layout.code}`;
  const [step,setStep]=useState(1);
  const categories=[...new Set(salonServices.map(s=>s.category))];
  const [category,setCategory]=useState(categories[0]);
  const [service,setService]=useState(salonServices[0].name);
  const [stylist,setStylist]=useState("first");
  const [date,setDate]=useState(dates[0]);
  const [time,setTime]=useState(times[1]);
  const [name,setName]=useState("Alex Customer");
  const [email,setEmail]=useState("alex@example.com");
  const [phone,setPhone]=useState("(262) 555-0199");
  const [newClient,setNewClient]=useState(true);
  const [agree,setAgree]=useState(true);

  useEffect(()=>{
    const q=new URLSearchParams(window.location.search);
    const requested=q.get("service"); const stylistId=q.get("stylist");
    if(requested){const found=salonServices.find(s=>s.name===requested||requested==="Consultation");if(found){setService(found.name);setCategory(found.category)}}
    if(stylistId&&salonStylists.some(s=>s.id===stylistId)) setStylist(stylistId);
  },[]);

  const selected=salonServices.find(s=>s.name===service)||salonServices[0];
  const eligible=salonStylists.filter(s=>selected.stylists.includes(s.id));
  const stylistName=stylist==="first"?"First available":salonStylists.find(s=>s.id===stylist)?.name||"First available";

  return <main className="salon-booking-shell"><header><Link href={base}><ArrowLeft size={16}/> Back to salon</Link><div><strong>{site.instance.business_name}</strong><span>Online booking demo</span></div></header><section className="salon-booking-card"><div className="salon-book-progress">{[1,2,3,4,5].map(n=><span className={step>=n?"active":""} key={n}>{n}</span>)}</div>
    {step===1&&<div className="salon-book-step"><span>STEP 1</span><h1>What would you like done?</h1><p>Start with a category so clients never have to interpret an internal salon service database.</p><div className="salon-book-categories">{categories.map(c=><button className={category===c?"selected":""} onClick={()=>{setCategory(c);const first=salonServices.find(s=>s.category===c);if(first)setService(first.name)}} key={c}>{c}</button>)}</div><div className="salon-book-services">{salonServices.filter(s=>s.category===category).map(s=><button className={service===s.name?"selected":""} onClick={()=>setService(s.name)} key={s.name}><div><strong>{s.name}</strong><p>{s.description}</p></div><span><b>{s.price}</b><small>{s.duration}</small></span></button>)}</div><button className="salon-book-next" onClick={()=>setStep(2)}>Choose stylist <ArrowRight size={16}/></button></div>}
    {step===2&&<div className="salon-book-step"><span>STEP 2</span><h1>Choose your stylist.</h1><p>Only stylists qualified for <strong>{selected.name}</strong> appear here.</p><div className="salon-stylist-choice"><button className={stylist==="first"?"selected":""} onClick={()=>setStylist("first")}><UserRound/><div><strong>First available</strong><small>Show the earliest appointment with any eligible stylist.</small></div></button>{eligible.map(s=><button className={stylist===s.id?"selected":""} onClick={()=>setStylist(s.id)} key={s.id}><div><strong>{s.name}</strong><small>{s.level} · {s.specialties.join(" · ")}</small></div></button>)}</div><div className="salon-book-nav"><button onClick={()=>setStep(1)}>Back</button><button className="salon-book-next" onClick={()=>setStep(3)}>See availability <ArrowRight size={16}/></button></div></div>}
    {step===3&&<div className="salon-book-step"><span>STEP 3</span><h1>Pick a time.</h1><p>Availability reflects service duration, stylist schedule, blocked time and existing appointments.</p><div className="salon-date-row">{dates.map(d=><button className={date===d?"selected":""} onClick={()=>setDate(d)} key={d}><CalendarDays size={16}/>{d}</button>)}</div><div className="salon-time-grid">{times.map(t=><button className={time===t?"selected":""} onClick={()=>setTime(t)} key={t}><Clock3 size={15}/>{t}</button>)}</div><div className="salon-book-nav"><button onClick={()=>setStep(2)}>Back</button><button className="salon-book-next" onClick={()=>setStep(4)}>Your information <ArrowRight size={16}/></button></div></div>}
    {step===4&&<div className="salon-book-step"><span>STEP 4</span><h1>Tell us about you.</h1><p>Nothing entered in this demo is saved.</p><div className="salon-client-toggle"><button className={newClient?"selected":""} onClick={()=>setNewClient(true)}>New client</button><button className={!newClient?"selected":""} onClick={()=>setNewClient(false)}>Returning client</button></div><div className="salon-book-form"><label>Name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Email<input value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Mobile<input value={phone} onChange={e=>setPhone(e.target.value)}/></label><label>Hair goals / notes<textarea rows={4} placeholder="Current color, inspiration, sensitivities, anything your stylist should know."/></label>{selected.category==="Color"&&<label>Color history<textarea rows={3} placeholder="Recent color, lightener, box dye, henna or corrective work."/></label>}</div><label className="salon-policy"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/><span>I agree to the salon's cancellation and late-arrival policies. A live system can collect a card or deposit when required.</span></label><div className="salon-book-nav"><button onClick={()=>setStep(3)}>Back</button><button disabled={!agree} className="salon-book-next" onClick={()=>setStep(5)}>Review <ArrowRight size={16}/></button></div></div>}
    {step===5&&<div className="salon-book-step salon-book-review"><CheckCircle2 size={42}/><span>FINAL STEP</span><h1>Review your appointment.</h1><div className="salon-review-summary"><div><Scissors/><span><small>Service</small><strong>{selected.name}</strong><em>{selected.price} · {selected.duration}</em></span></div><div><UserRound/><span><small>Stylist</small><strong>{stylistName}</strong></span></div><div><CalendarDays/><span><small>Appointment</small><strong>{date} · {time}</strong></span></div><div><UserRound/><span><small>Client</small><strong>{name}</strong><em>{email} · {phone}</em></span></div></div><div className="salon-demo-warning">Demo only — confirmation does not create an appointment, charge a deposit, send a reminder or save a client record.</div><div className="salon-book-nav"><button onClick={()=>setStep(4)}>Back</button><button className="salon-book-next" onClick={()=>alert("Demo complete — nothing was saved.")}>Confirm demo booking</button></div></div>}
  </section></main>
}
