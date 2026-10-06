import Link from "next/link";
import { createClient as createServiceClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { getBusinessSiteBySlug } from "@/lib/business-site/data";
import AdminLogin from "./AdminLogin";
import BusinessSiteAdminClient from "./BusinessSiteAdminClient";
import "./admin.css";

export const dynamic = "force-dynamic";

function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createServiceClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export default async function BusinessAdminPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getBusinessSiteBySlug(slug).catch(() => null);
  if (!site) return <main className="biz-admin-gate"><h1>Site not found</h1><Link href="/">Return to OneTime Labs</Link></main>;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <main className="biz-admin-gate"><span>Customer Site Admin</span><h1>{site.instance.business_name}</h1><p>Sign in with the Google account assigned as this business's administrator.</p><AdminLogin slug={slug} /><Link href={`/${slug}`}>← Back to site</Link></main>;
  }

  const emailMatches = Boolean(user.email && site.instance.admin_email && user.email.toLowerCase() === site.instance.admin_email.toLowerCase());
  let platformAdmin = false;
  if (!emailMatches) {
    const db = serviceClient();
    if (db) {
      const { data } = await db.from("platform_users").select("active,is_platform_owner,is_platform_admin").eq("auth_user_id", user.id).maybeSingle();
      platformAdmin = Boolean(data?.active && (data.is_platform_owner || data.is_platform_admin));
    }
  }

  if (!emailMatches && !platformAdmin) {
    return <main className="biz-admin-gate"><span>Customer Site Admin</span><h1>Access denied</h1><p>{user.email} is signed in, but this account is not assigned to {site.instance.business_name}.</p><Link href={`/${slug}`}>← Back to site</Link></main>;
  }

  return <BusinessSiteAdminClient site={site} />;
}
