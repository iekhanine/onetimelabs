import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BusinessSiteView from "./BusinessSiteView";
import { getBusinessSiteBySlug } from "@/lib/business-site/data";
import "./site.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = await getBusinessSiteBySlug(slug).catch(() => null);
  if (!site) return {};
  return {
    title: site.instance.business_name,
    description: site.content.subheadline || site.content.about_text,
    alternates: { canonical: site.instance.canonical_url || `https://onetimelabs.net/${slug}` },
  };
}

export default async function BusinessPathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getBusinessSiteBySlug(slug).catch((error) => {
    console.error("Business site load failed:", error);
    return null;
  });
  if (!site) notFound();
  return <BusinessSiteView site={site} />;
}
