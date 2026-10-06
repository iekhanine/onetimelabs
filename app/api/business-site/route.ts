import { NextResponse } from "next/server";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function authClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function authorizeBusinessAdmin(db: SupabaseClient, request: Request, slug: string): Promise<{ user: User; instance: any } | null> {
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const auth = authClient();
  if (!auth) return null;
  const { data: authData, error: authError } = await auth.auth.getUser(token);
  if (authError || !authData.user?.email) return null;

  const { data: instance, error: instanceError } = await db
    .from("platform_business_instances")
    .select("id,business_name,path_slug,subdomain,business_type,admin_email")
    .eq("path_slug", slug)
    .maybeSingle();
  if (instanceError || !instance) return null;

  const email = authData.user.email.toLowerCase();
  if ((instance.admin_email || "").toLowerCase() === email) return { user: authData.user, instance };

  const { data: platformUser } = await db
    .from("platform_users")
    .select("active,is_platform_owner,is_platform_admin")
    .eq("auth_user_id", authData.user.id)
    .maybeSingle();
  if (platformUser?.active && (platformUser.is_platform_owner || platformUser.is_platform_admin)) {
    return { user: authData.user, instance };
  }

  return null;
}

export async function POST(request: Request) {
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: "Business site database is not configured." }, { status: 503 });

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const slug = clean(form.get("slug"), 70);
    const authorization = await authorizeBusinessAdmin(db, request, slug);
    if (!authorization) return NextResponse.json({ error: "Business administrator access required." }, { status: 403 });

    const kind = clean(form.get("kind"), 30);
    if (!new Set(["hero", "logo", "gallery", "portfolio", "placeholder"]).has(kind)) {
      return NextResponse.json({ error: "Invalid image type." }, { status: 400 });
    }
    const file = form.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 400 });
    }

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
    const storagePath = `${authorization.instance.id}/${kind}/${crypto.randomUUID()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await db.storage
      .from("business-site-media")
      .upload(storagePath, bytes, { contentType: file.type, upsert: false });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const publicUrl = db.storage.from("business-site-media").getPublicUrl(storagePath).data.publicUrl;

    if (kind === "hero" || kind === "logo") {
      await db.from("platform_business_media")
        .update({ active: false })
        .eq("business_instance_id", authorization.instance.id)
        .eq("kind", kind);
    }

    const { data, error } = await db
      .from("platform_business_media")
      .insert({
        business_instance_id: authorization.instance.id,
        kind,
        storage_path: storagePath,
        public_url: publicUrl,
        alt_text: clean(form.get("altText"), 300),
        caption: clean(form.get("caption"), 500),
        sort_order: Number.parseInt(clean(form.get("sortOrder"), 10) || "0", 10) || 0,
        active: true,
      })
      .select("id,kind,public_url,alt_text,caption,source_name,source_url,sort_order")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ media: data });
  }

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const slug = clean(body.slug, 70);
  const authorization = await authorizeBusinessAdmin(db, request, slug);
  if (!authorization) return NextResponse.json({ error: "Business administrator access required." }, { status: 403 });

  if (body.action === "save-content") {
    const services = Array.isArray(body.services)
      ? body.services.slice(0, 12).map((item: any) => ({ name: clean(item?.name, 120), description: clean(item?.description, 400), size: new Set(["small","medium","large"]).has(item?.size) ? item.size : "medium" })).filter(item => item.name)
      : [];
    const navLinks = Array.isArray(body.navLinks)
      ? body.navLinks.slice(0, 10).map((item: any) => ({ label: clean(item?.label, 80), href: clean(item?.href, 300) })).filter((item: any) => item.label && item.href)
      : [];
    const payload = {
      business_instance_id: authorization.instance.id,
      headline: clean(body.headline, 180),
      subheadline: clean(body.subheadline, 500),
      about_text: clean(body.aboutText, 4000),
      primary_cta_label: clean(body.primaryCtaLabel, 80) || "Contact us",
      primary_cta_href: clean(body.primaryCtaHref, 300) || "#contact",
      phone: clean(body.phone, 80),
      contact_email: clean(body.contactEmail, 320),
      address_text: clean(body.addressText, 500),
      hours_text: clean(body.hoursText, 500),
      services,
      nav_links: navLinks,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await db.from("platform_business_site_content").upsert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ content: data });
  }

  if (body.action === "delete-media") {
    const mediaId = clean(body.mediaId, 80);
    const { data: media, error: findError } = await db
      .from("platform_business_media")
      .select("id,storage_path")
      .eq("id", mediaId)
      .eq("business_instance_id", authorization.instance.id)
      .maybeSingle();
    if (findError || !media) return NextResponse.json({ error: "Image not found." }, { status: 404 });
    if (media.storage_path) await db.storage.from("business-site-media").remove([media.storage_path]);
    const { error: deleteError } = await db.from("platform_business_media").delete().eq("id", media.id);
    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
