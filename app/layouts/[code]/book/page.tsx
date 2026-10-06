import { notFound } from "next/navigation";
import { getDemoSite } from "@/lib/business-site/demos";
import BookingDemo from "./BookingDemo";
import SalonBookingDemo from "@/components/salon/SalonBookingDemo";
import "../../../[slug]/site.css";
export default async function DemoBookingPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params; const site=getDemoSite(code); if(!site) notFound();
  if(site.layout.style_key==="editorial-studio") return <SalonBookingDemo site={site}/>;
  if(["clean-service","workshop-dark"].includes(site.layout.style_key)) return <BookingDemo site={site}/>;
  notFound();
}
