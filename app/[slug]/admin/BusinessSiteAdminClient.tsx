"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImagePlus, Plus, Save, Trash2, Upload } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { BusinessSite } from "@/lib/business-site/data";

type Service = { name: string; description?: string; size?: "small" | "medium" | "large" };
type NavLink = { label: string; href: string };

export default function BusinessSiteAdminClient({ site }: { site: BusinessSite }) {
  const [headline, setHeadline] = useState(site.content.headline);
  const [subheadline, setSubheadline] = useState(site.content.subheadline);
  const [aboutText, setAboutText] = useState(site.content.about_text);
  const [ctaLabel, setCtaLabel] = useState(site.content.primary_cta_label);
  const [ctaHref, setCtaHref] = useState(site.content.primary_cta_href);
  const [phone, setPhone] = useState(site.content.phone);
  const [contactEmail, setContactEmail] = useState(site.content.contact_email);
  const [addressText, setAddressText] = useState(site.content.address_text);
  const [hoursText, setHoursText] = useState(site.content.hours_text);
  const [services, setServices] = useState<Service[]>(site.content.services);
  const [navLinks, setNavLinks] = useState<NavLink[]>(site.content.nav_links || []);
  const [media, setMedia] = useState(site.media);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const hero = useMemo(() => media.find(item => item.kind === "hero"), [media]);
  const portfolio = useMemo(() => media.filter(item => item.kind === "portfolio" || item.kind === "gallery"), [media]);

  async function token() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("Your session expired. Sign in again.");
    return session.access_token;
  }

  async function saveContent() {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/api/business-site", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({
          action: "save-content",
          slug: site.instance.path_slug,
          headline,
          subheadline,
          aboutText,
          primaryCtaLabel: ctaLabel,
          primaryCtaHref: ctaHref,
          phone,
          contactEmail,
          addressText,
          hoursText,
          services,
          navLinks,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Save failed.");
      setStatus("Site content saved.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Save failed."); }
    finally { setSaving(false); }
  }

  async function uploadImage(kind: "hero" | "logo" | "gallery" | "portfolio" | "placeholder", file: File | undefined, caption = "") {
    if (!file) return;
    setStatus(`Uploading ${file.name}...`);
    try {
      const form = new FormData();
      form.set("slug", site.instance.path_slug);
      form.set("kind", kind);
      form.set("file", file);
      form.set("caption", caption);
      form.set("altText", caption || `${site.instance.business_name} ${kind} image`);
      const response = await fetch("/api/business-site", {
        method: "POST",
        headers: { Authorization: `Bearer ${await token()}` },
        body: form,
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Upload failed.");
      setMedia(current => kind === "hero" || kind === "logo"
        ? [...current.filter(item => item.kind !== kind), body.media]
        : [...current, body.media]);
      setStatus("Image uploaded.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Upload failed."); }
  }

  async function deleteMedia(id: string) {
    try {
      const response = await fetch("/api/business-site", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ action: "delete-media", slug: site.instance.path_slug, mediaId: id }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Delete failed.");
      setMedia(current => current.filter(item => item.id !== id));
      setStatus("Image removed.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Delete failed."); }
  }

  function patchService(index: number, field: keyof Service, value: string) {
    setServices(current => current.map((service, i) => i === index ? { ...service, [field]: value } : service));
  }


  function patchNavLink(index: number, field: keyof NavLink, value: string) {
    setNavLinks(current => current.map((link, i) => i === index ? { ...link, [field]: value } : link));
  }

  return (
    <main className="biz-admin">
      <header className="biz-admin-header">
        <div><span>Customer Site Admin</span><h1>{site.instance.business_name}</h1><p>Permanent fallback: <Link href={`/${site.instance.path_slug}`}>onetimelabs.net/{site.instance.path_slug}</Link></p></div>
        <div><Link className="biz-admin-secondary" href={`/${site.instance.path_slug}`} target="_blank">View live site</Link><button className="biz-admin-primary" onClick={() => void saveContent()} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save changes"}</button></div>
      </header>

      {status && <div className="biz-admin-status">{status}</div>}

      <section className="biz-admin-panel">
        <div className="biz-admin-panel-title"><span>01</span><div><h2>Homepage content</h2><p>Public copy and contact information. This is intentionally managed here, not from Platform.</p></div></div>
        <div className="biz-admin-fields">
          <label className="wide">Headline<input value={headline} onChange={e => setHeadline(e.target.value)} /></label>
          <label className="wide">Subheadline<textarea rows={3} value={subheadline} onChange={e => setSubheadline(e.target.value)} /></label>
          <label className="wide">About<textarea rows={6} value={aboutText} onChange={e => setAboutText(e.target.value)} /></label>
          <label>Primary button label<input value={ctaLabel} onChange={e => setCtaLabel(e.target.value)} /></label>
          <label>Primary button link<input value={ctaHref} onChange={e => setCtaHref(e.target.value)} /></label>
          <label>Phone<input value={phone} onChange={e => setPhone(e.target.value)} /></label>
          <label>Public email<input value={contactEmail} onChange={e => setContactEmail(e.target.value)} /></label>
          <label>Address<input value={addressText} onChange={e => setAddressText(e.target.value)} /></label>
          <label>Hours<input value={hoursText} onChange={e => setHoursText(e.target.value)} /></label>
        </div>
      </section>

      <section className="biz-admin-panel">
        <div className="biz-admin-panel-title"><span>02</span><div><h2>Site images</h2><p>Upload real business photography whenever possible. Recommended hero: landscape, at least 1600 × 1000. Logos work best as transparent PNG/WebP.</p></div></div>
        <div className="biz-admin-media-cards">
          <label className="biz-upload-card"><ImagePlus size={25} /><strong>Hero image</strong><span>{hero ? "Replace current homepage hero" : "Replace the temporary stock hero"} · 2000 × 1200 recommended</span><input type="file" accept="image/*" onChange={e => void uploadImage("hero", e.target.files?.[0])} /></label>
          <label className="biz-upload-card"><Upload size={25} /><strong>Logo</strong><span>Business logo used in the site header · transparent PNG/WebP, 800 × 800 recommended</span><input type="file" accept="image/*" onChange={e => void uploadImage("logo", e.target.files?.[0])} /></label>
          <label className="biz-upload-card"><ImagePlus size={25} /><strong>General gallery image</strong><span>Location, staff, products, food, vehicles or atmosphere</span><input type="file" accept="image/*" onChange={e => void uploadImage("gallery", e.target.files?.[0])} /></label>
          <label className="biz-upload-card"><ImagePlus size={25} /><strong>Portfolio / work image</strong><span>Before/after, hair, styling, repairs, projects or finished work · 1600 × 1200 recommended</span><input type="file" accept="image/*" onChange={e => void uploadImage("portfolio", e.target.files?.[0])} /></label>
          <label className="biz-upload-card"><ImagePlus size={25} /><strong>Placeholder / section image</strong><span>Reusable image for future homepage sections · 1600 × 1200 recommended</span><input type="file" accept="image/*" onChange={e => void uploadImage("placeholder", e.target.files?.[0])} /></label>
        </div>
        {media.length > 0 && <div className="biz-admin-media-grid">{media.map(item => <figure key={item.id}><div><Image src={item.public_url} alt={item.alt_text || item.kind} fill sizes="220px" /></div><figcaption><span>{item.kind}</span><button onClick={() => void deleteMedia(item.id)} title="Remove image"><Trash2 size={14} /></button></figcaption></figure>)}</div>}
      </section>

      <section className="biz-admin-panel">
        <div className="biz-admin-panel-title"><span>03</span><div><h2>Header menu</h2><p>Add or remove navigation items. Use site paths such as /your-business/contact or anchors such as /your-business#services.</p></div></div>
        <div className="biz-admin-navlinks">
          {navLinks.map((link, index) => <div key={index}><input value={link.label} onChange={e => patchNavLink(index, "label", e.target.value)} placeholder="Menu label" /><input value={link.href} onChange={e => patchNavLink(index, "href", e.target.value)} placeholder="/business/page or #section" /><button className="biz-admin-danger" onClick={() => setNavLinks(current => current.filter((_, i) => i !== index))}><Trash2 size={14}/> Remove</button></div>)}
          <button className="biz-admin-secondary" onClick={() => setNavLinks(current => [...current, { label: "New page", href: `/${site.instance.path_slug}` }])}><Plus size={15}/> Add menu item</button>
        </div>
      </section>

      <section className="biz-admin-panel">
        <div className="biz-admin-panel-title"><span>04</span><div><h2>Services</h2><p>Each service becomes a booking button. Choose Small (3 across), Medium (2 across), or Large (full width) based on how much detail it needs.</p></div></div>
        <div className="biz-admin-services">
          {services.map((service, index) => <div key={index}><input value={service.name} onChange={e => patchService(index, "name", e.target.value)} placeholder="Service name" /><textarea rows={3} value={service.description || ""} onChange={e => patchService(index, "description", e.target.value)} placeholder="Short description" /><select value={service.size || "medium"} onChange={e => patchService(index, "size", e.target.value)}><option value="small">Small · 3 across</option><option value="medium">Medium · 2 across</option><option value="large">Large · full width</option></select><button className="biz-admin-danger" onClick={() => setServices(current => current.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove</button></div>)}
          <button className="biz-admin-secondary" onClick={() => setServices(current => [...current, { name: "New service", description: "", size: "medium" }])}><Plus size={15} /> Add service</button>
        </div>
      </section>

      {portfolio.length > 0 && <section className="biz-admin-panel"><div className="biz-admin-panel-title"><span>05</span><div><h2>Portfolio</h2><p>These images appear in the public Work section automatically.</p></div></div><div className="biz-admin-media-grid">{portfolio.map(item => <figure key={item.id}><div><Image src={item.public_url} alt={item.alt_text || "Portfolio work"} fill sizes="260px" /></div><figcaption><span>{item.caption || "Portfolio image"}</span></figcaption></figure>)}</div></section>}
    </main>
  );
}
