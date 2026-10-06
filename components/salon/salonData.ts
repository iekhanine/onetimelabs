export const salonStylists = [
  { id:"ava", name:"Ava Monroe", level:"Senior Stylist", specialties:["Lived-In Color","Blonding","Extensions"], bio:"Soft dimension, bright-but-believable blonding, and extension work designed around how you  wear your hair.", photo:"https://images.pexels.com/photos/33867544/pexels-photo-33867544.jpeg?cs=srgb&dl=pexels-prolificpeople-33867544.jpg&fm=jpg" },
  { id:"maya", name:"Maya Ellis", level:"Stylist", specialties:["Precision Cuts","Texture","Curly Hair"], bio:"Shape-first cutting, natural texture, and wearable styling with an easy grow-out and a realistic home routine.", photo:"https://images.pexels.com/photos/33867543/pexels-photo-33867543.jpeg?cs=srgb&dl=pexels-prolificpeople-33867543.jpg&fm=jpg" },
  { id:"jules", name:"Jules Bennett", level:"Color Specialist", specialties:["Balayage","Corrective Color","Grey Blending"], bio:"Dimensional color plans with thoughtful maintenance, tonal balance, and room for your hair to evolve between visits.", photo:"https://images.pexels.com/photos/33867520/pexels-photo-33867520.jpeg?cs=srgb&dl=pexels-prolificpeople-33867520.jpg&fm=jpg" },
  { id:"noelle", name:"Noelle Hart", level:"Stylist · Bridal", specialties:["Bridal","Formal Styling","Makeup"], bio:"Polished event hair, modern bridal styling, and calm, organized wedding-day planning from trial through final look.", photo:"https://images.pexels.com/photos/7755166/pexels-photo-7755166.jpeg?cs=srgb&dl=pexels-rdne-7755166.jpg&fm=jpg" },
];

export const salonServices = [
  { category:"Cuts & Styling", name:"Signature Cut + Finish", duration:"60 min", price:"From $72", description:"Consultation, shampoo, tailored cut and finished style.", stylists:["ava","maya","jules"] },
  { category:"Cuts & Styling", name:"Blowout + Style", duration:"45 min", price:"From $52", description:"Shampoo, blowout and polished finish for everyday or event-ready hair.", stylists:["maya","noelle"] },
  { category:"Color", name:"Dimensional Color", duration:"2 hr 30 min", price:"From $185", description:"Customized dimensional color with toner and finish. New guests may be asked to consult first.", stylists:["ava","jules"] },
  { category:"Color", name:"Balayage / Specialty Blonding", duration:"3 hr", price:"From $225", description:"Hand-painted or specialty lightening plan with customized toning and finish.", stylists:["ava","jules"] },
  { category:"Color", name:"Root Refresh + Gloss", duration:"1 hr 45 min", price:"From $135", description:"Grey coverage or regrowth color with gloss and finished style.", stylists:["ava","jules"] },
  { category:"Extensions", name:"Extension Consultation", duration:"30 min", price:"Complimentary", description:"Color match, method recommendation, maintenance plan and investment estimate.", stylists:["ava"] },
  { category:"Treatments", name:"Repair + Gloss Treatment", duration:"60 min", price:"From $85", description:"Bond repair, conditioning treatment, gloss and blowout for shine and manageability.", stylists:["ava","maya","jules"] },
  { category:"Bridal", name:"Bridal Hair Trial", duration:"90 min", price:"From $145", description:"Dedicated trial appointment to build and photograph the wedding-day look.", stylists:["noelle"] },
  { category:"Bridal", name:"Special Occasion Styling", duration:"60 min", price:"From $95", description:"Formal styling for weddings, events, photos and celebrations.", stylists:["noelle","maya"] },
];

export const salonGallery = [
  { src:"https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?cs=srgb&dl=pexels-cottonbro-3993312.jpg&fm=jpg", alt:"Hair color application", caption:"Dimensional color", stylist:"Jules" },
  { src:"https://images.pexels.com/photos/7755166/pexels-photo-7755166.jpeg?cs=srgb&dl=pexels-rdne-7755166.jpg&fm=jpg", alt:"Styling appointment", caption:"Texture + finish", stylist:"Maya" },
  { src:"https://images.pexels.com/photos/33867544/pexels-photo-33867544.jpeg?cs=srgb&dl=pexels-prolificpeople-33867544.jpg&fm=jpg", alt:"Salon portrait", caption:"Soft blonding", stylist:"Ava" },
  { src:"https://images.pexels.com/photos/7388938/pexels-photo-7388938.jpeg?cs=srgb&dl=pexels-john-diez-7388938.jpg&fm=jpg", alt:"Salon color station", caption:"Color room", stylist:"Studio" },
  { src:"https://images.pexels.com/photos/7750099/pexels-photo-7750099.jpeg?cs=srgb&dl=pexels-artbovich-7750099.jpg&fm=jpg", alt:"Salon interior", caption:"The studio", stylist:"Lumen" },
  { src:"https://images.pexels.com/photos/33867520/pexels-photo-33867520.jpeg?cs=srgb&dl=pexels-prolificpeople-33867520.jpg&fm=jpg", alt:"Stylist portrait", caption:"Color consultation", stylist:"Jules" },
];

export const salonReviews = [
  { quote:"The booking process was simple, and I knew exactly who I was seeing and what I was booking before I arrived.", name:"Erin P." },
  { quote:"The color consultation felt thoughtful instead of rushed, and the maintenance plan was clear before we started.", name:"Morgan L." },
  { quote:"I booked my bridal trial, uploaded inspiration photos, and had everything in one place.", name:"Samantha R." },
];
