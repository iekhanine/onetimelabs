import { notFound } from "next/navigation";
import { getDemoSite } from "@/lib/business-site/demos";
import { PerformanceShopPage } from "../../../[slug]/BusinessSiteView";
import "../../../[slug]/site.css";
export default async function DemoShopPage({params}:{params:Promise<{code:string}>}){
  const {code}=await params; const site=getDemoSite(code);
  if(!site || site.layout.style_key!=="workshop-dark") notFound();
  return <PerformanceShopPage site={site} preview/>;
}
