import { createClient } from "@supabase/supabase-js";

export type BusinessType = "retail" | "restaurant_bar" | "barber_salon" | "auto_repair";

export type BusinessSite = {
  instance: {
    id: string;
    business_name: string;
    path_slug: string;
    subdomain: string;
    business_type: BusinessType;
    admin_email: string | null;
    site_layout_code: string | null;
    canonical_url: string | null;
    custom_domain: string | null;
    subdomain_enabled: boolean;
    status: string;
  };
  layout: {
    code: string;
    name: string;
    style_key: string;
    config: Record<string, any>;
  };
  content: {
    headline: string;
    subheadline: string;
    about_text: string;
    primary_cta_label: string;
    primary_cta_href: string;
    phone: string;
    contact_email: string;
    address_text: string;
    hours_text: string;
    services: Array<{ name: string; description?: string; size?: "small" | "medium" | "large" }>;
    nav_links: Array<{ label: string; href: string }>;
    testimonials: Array<{ quote: string; name?: string }>;
  };
  media: Array<{
    id: string;
    kind: "hero" | "logo" | "gallery" | "portfolio" | "placeholder";
    public_url: string;
    alt_text: string;
    caption: string;
    source_name: string | null;
    source_url: string | null;
    sort_order: number;
  }>;
};

function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const defaultPhotography: Record<BusinessType, { url: string; source: string; sourceUrl: string }> = {
  auto_repair: {
    url: "https://images.pexels.com/photos/8478233/pexels-photo-8478233.jpeg?auto=compress&cs=tinysrgb&w=1800",
    source: "Pexels / Sergey Meshkov",
    sourceUrl: "https://www.pexels.com/photo/mechanic-fixing-a-car-8478233/",
  },
  barber_salon: {
    url: "https://images.pexels.com/photos/8834077/pexels-photo-8834077.jpeg?auto=compress&cs=tinysrgb&w=1800",
    source: "Pexels / Kampus Production",
    sourceUrl: "https://www.pexels.com/photo/a-client-having-her-hair-cut-by-the-hair-stylist-8834077/",
  },
  restaurant_bar: {
    url: "https://images.pexels.com/photos/20862562/pexels-photo-20862562.jpeg?auto=compress&cs=tinysrgb&w=1800",
    source: "Pexels / Nadin Sh",
    sourceUrl: "https://www.pexels.com/photo/food-on-table-in-restaurant-20862562/",
  },
  retail: {
    url: "https://images.pexels.com/photos/5864800/pexels-photo-5864800.jpeg?auto=compress&cs=tinysrgb&w=1800",
    source: "Pexels / Rachel Claire",
    sourceUrl: "https://www.pexels.com/photo/people-inside-the-boutique-store-5864800/",
  },
};

export const defaultServices: Record<BusinessType, Array<{ name: string; description: string }>> = {
  retail: [
    { name: "Shop local", description: "Feature the products, collections or categories customers ask for most." },
    { name: "Personal service", description: "Explain what customers get here that a big-box or online store cannot match." },
    { name: "Easy pickup", description: "Use this card for pickup, special orders, delivery or another practical service." },
  ],
  restaurant_bar: [
    { name: "House favorites", description: "Highlight signature dishes, seasonal menus or the food your regulars come back for." },
    { name: "Drinks & hospitality", description: "Feature cocktails, local beer, wine, happy hour or the room itself." },
    { name: "Reservations & events", description: "Use this card for reservations, private dining, catering or special events." },
  ],
  barber_salon: [
    { name: "Cuts & styling", description: "Describe your core haircut, styling and grooming services." },
    { name: "Color & treatments", description: "Showcase specialty color, treatments, texture or other signature work." },
    { name: "Book your person", description: "Give clients a clear path to the barber or stylist who fits what they want." },
  ],
  auto_repair: [
    { name: "Diagnostics", description: "Explain how you identify problems and communicate findings before work begins." },
    { name: "Maintenance", description: "Feature routine maintenance, inspections and the services that prevent bigger repairs." },
    { name: "Repair", description: "Highlight the mechanical, electrical or specialty repair work your shop handles." },
  ],
};

export async function getBusinessSiteBySlug(slug: string): Promise<BusinessSite | null> {
  const db = serviceClient();
  if (!db) throw new Error("Business site database is not configured.");

  const { data: instance, error: instanceError } = await db
    .from("platform_business_instances")
    .select("id,business_name,path_slug,subdomain,business_type,admin_email,site_layout_code,canonical_url,custom_domain,subdomain_enabled,status")
    .eq("path_slug", slug)
    .eq("status", "ready")
    .maybeSingle();

  if (instanceError) throw instanceError;
  if (!instance) return null;

  const [layoutResult, contentResult, mediaResult] = await Promise.all([
    db.from("platform_site_layouts")
      .select("code,name,style_key,config")
      .eq("code", instance.site_layout_code || "clean-service")
      .eq("active", true)
      .maybeSingle(),
    db.from("platform_business_site_content")
      .select("headline,subheadline,about_text,primary_cta_label,primary_cta_href,phone,contact_email,address_text,hours_text,services,testimonials,nav_links")
      .eq("business_instance_id", instance.id)
      .maybeSingle(),
    db.from("platform_business_media")
      .select("id,kind,public_url,alt_text,caption,source_name,source_url,sort_order")
      .eq("business_instance_id", instance.id)
      .eq("active", true)
      .order("sort_order")
      .order("created_at"),
  ]);

  if (layoutResult.error) throw layoutResult.error;
  if (contentResult.error) throw contentResult.error;
  if (mediaResult.error) throw mediaResult.error;

  const businessType = instance.business_type as BusinessType;
  const content = contentResult.data ?? {
    headline: instance.business_name,
    subheadline: "Local service, built around the people we serve.",
    about_text: `Welcome to ${instance.business_name}.`,
    primary_cta_label: "Contact us",
    primary_cta_href: "#contact",
    phone: "",
    contact_email: instance.admin_email || "",
    address_text: "",
    hours_text: "",
    services: [],
    testimonials: [],
    nav_links: [
      { label: "Home", href: `/${instance.path_slug || instance.subdomain}` },
      { label: "Services", href: `/${instance.path_slug || instance.subdomain}#services` },
      { label: "Contact", href: `/${instance.path_slug || instance.subdomain}/contact` },
    ],
  };

  return {
    instance: { ...instance, business_type: businessType, path_slug: instance.path_slug || instance.subdomain },
    layout: layoutResult.data ?? { code: "clean-service", name: "Clean Service", style_key: "clean-service", config: {} },
    content: {
      ...content,
      services: Array.isArray(content.services) && content.services.length ? content.services : defaultServices[businessType],
      testimonials: Array.isArray(content.testimonials) ? content.testimonials : [],
      nav_links: Array.isArray((content as any).nav_links) && (content as any).nav_links.length
        ? (content as any).nav_links
        : [
            { label: "Home", href: `/${instance.path_slug || instance.subdomain}` },
            { label: "Services", href: `/${instance.path_slug || instance.subdomain}#services` },
            { label: "Contact", href: `/${instance.path_slug || instance.subdomain}/contact` },
          ],
    },
    media: (mediaResult.data ?? []) as BusinessSite["media"],
  };
}
