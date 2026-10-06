import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BusinessSiteView from "../../[slug]/BusinessSiteView";
import { getDemoSite } from "@/lib/business-site/demos";
import "../../[slug]/site.css";

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const site = getDemoSite(code);
  if (!site) return {};
  return {
    title: `${site.layout.name} Demo | OneTime Labs`,
    description: `Live ${site.layout.name} business website preview from OneTime Labs.`,
    robots: { index: false, follow: false },
  };
}

export default async function LayoutDemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code } = await params;
  const site = getDemoSite(code);
  if (!site) notFound();
  const query = await searchParams;
  const read = (key: string) => typeof query[key] === "string" ? query[key] as string : undefined;
  const themedSite = { ...site, layout: { ...site.layout, config: { ...site.layout.config, palette: { ...(site.layout.config?.palette ?? {}), ...(read("accent") ? { accent: read("accent") } : {}), ...(read("background") ? { background: read("background") } : {}), ...(read("surface") ? { surface: read("surface") } : {}), ...(read("text") ? { text: read("text"), muted: read("text") } : {}) } } } };
  return <BusinessSiteView site={themedSite} preview />;
}
