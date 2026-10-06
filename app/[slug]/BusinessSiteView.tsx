import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, CalendarDays, Clock3, MapPin, MessageCircle, Phone, Quote, Star, Wrench } from "lucide-react";
import { defaultPhotography, type BusinessSite } from "@/lib/business-site/data";
import { SalonHome } from "@/components/salon/SalonSite";

function cssVars(site: BusinessSite): CSSProperties {
  const p = site.layout.config?.palette ?? {};
  return {
    "--biz-bg": p.background || "#fbf8f0",
    "--biz-surface": p.surface || "#fffdf8",
    "--biz-text": p.text || "#0b1b28",
    "--biz-muted": p.muted || "#56616a",
    "--biz-accent": p.accent || "#ef252e",
    "--biz-accent2": p.accent2 || "#dce7ed",
    "--biz-radius": site.layout.config?.radius || "8px",
  } as CSSProperties;
}

function img(site: BusinessSite, kind: "hero" | "gallery" | "portfolio", index = 0) {
  const rows = site.media.filter(item => item.kind === kind || (kind === "gallery" && item.kind === "placeholder"));
  if (rows[index]) return rows[index];
  if (kind === "hero") {
    const stock = defaultPhotography[site.instance.business_type];
    return { id: "stock", public_url: stock.url, alt_text: site.instance.business_name, caption: "", source_name: stock.source, source_url: stock.sourceUrl, sort_order: 0, kind: "hero" as const };
  }
  return null;
}

function Brand({ site, light = false }: { site: BusinessSite; light?: boolean }) {
  const logo = site.media.find(item => item.kind === "logo");
  return <Link className={`lbg-brand ${light ? "light" : ""}`} href={`/${site.instance.path_slug}`}>
    {logo ? <span className="lbg-logo"><Image src={logo.public_url} alt={logo.alt_text || site.instance.business_name} fill sizes="54px" /></span> : <span className="lbg-mark">{site.instance.business_name.slice(0, 2).toUpperCase()}</span>}
    <span><strong>{site.instance.business_name}</strong><small>{site.instance.business_type.replaceAll("_", " ")}</small></span>
  </Link>;
}

function ContactStrip({ site }: { site: BusinessSite }) {
  return <div className="contact-strip">
    {site.content.phone && <a href={`tel:${site.content.phone.replace(/[^+\d]/g, "")}`}><Phone size={15}/><span>{site.content.phone}</span></a>}
    {site.content.hours_text && <span><Clock3 size={15}/>{site.content.hours_text}</span>}
    {site.content.address_text && <span><MapPin size={15}/>{site.content.address_text}</span>}
  </div>;
}

function Footer({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const demoAdminEnabled = ["clean-service", "workshop-dark"].includes(site.layout.style_key);
  return <footer className="site-footer"><strong>{site.instance.business_name}</strong><span>{preview ? <>OneTime Labs design demo · <Link href="/layouts">Gallery</Link>{demoAdminEnabled && <> · <Link href={`/layouts/${site.layout.code}/admin`}>Admin demo</Link></>}</> : <>Site powered by OneTime Labs · <Link href={`/${site.instance.path_slug}/admin`}>Admin</Link></>}</span></footer>;
}

function localContactHref(site: BusinessSite, preview: boolean) {
  return preview ? `/layouts/${site.layout.code}/contact` : `/${site.instance.path_slug}/contact`;
}

function localHomeHref(site: BusinessSite, preview: boolean) {
  return preview ? `/layouts/${site.layout.code}` : `/${site.instance.path_slug}`;
}

function LocalServiceHeader({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const fallback = [
    { label: "Home", href: localHomeHref(site, preview) },
    { label: "Services", href: `${localHomeHref(site, preview)}#services` },
    { label: "Booking", href: preview ? `/layouts/${site.layout.code}/book` : `/${site.instance.path_slug}/book` },
    { label: "Contact", href: localContactHref(site, preview) },
  ];
  const links = site.content.nav_links?.length ? site.content.nav_links : fallback;
  const normalized = links.map((link) => {
    if (!preview) return link;
    if (link.href === `/${site.instance.path_slug}`) return { ...link, href: localHomeHref(site, true) };
    if (link.href === `/${site.instance.path_slug}/contact`) return { ...link, href: localContactHref(site, true) };
    if (link.href.startsWith(`/${site.instance.path_slug}#`)) return { ...link, href: `${localHomeHref(site, true)}${link.href.slice(link.href.indexOf("#"))}` };
    return link;
  });

  return <header className="local-top">
    <Brand site={site}/>
    <nav className="local-menu">
      {normalized.map((link) => <Link key={`${link.label}-${link.href}`} href={link.href}>{link.label}</Link>)}
    </nav>
  </header>;
}

function LocalService({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero = img(site, "hero")!;
  const bookingHref = preview
    ? `/layouts/${site.layout.code}/book`
    : (site.content.primary_cta_href && !site.content.primary_cta_href.startsWith("#")
      ? site.content.primary_cta_href
      : `/${site.instance.path_slug}/book`);
  const contactHref = localContactHref(site, preview);
  const serviceHref = (name: string) => {
    const separator = bookingHref.includes("?") ? "&" : "?";
    return `${bookingHref}${separator}service=${encodeURIComponent(name)}`;
  };

  return <main className="site local-service">
    <LocalServiceHeader site={site} preview={preview}/>

    <div className="local-home">
      <section className="local-hero" style={{ backgroundImage:`url(${hero.public_url})` }}>
        <div className="local-shade">
          <div className="local-copy">
            <h1>{site.content.headline}</h1>
            {site.content.subheadline && <p className="local-subheadline">{site.content.subheadline}</p>}
            {(site.content.hours_text || site.content.address_text) && <div className="local-hero-info">
              {site.content.hours_text && <span><Clock3 size={16}/><strong>Hours</strong>{site.content.hours_text}</span>}
              {site.content.address_text && <span><MapPin size={16}/><strong>Location</strong>{site.content.address_text}</span>}
            </div>}
            <div className="local-actions">
              <a className="cta primary" href={bookingHref}><CalendarDays size={18}/>{site.content.primary_cta_label}<ArrowRight size={16}/></a>
              <Link className="cta ghost" href={contactHref}><MessageCircle size={18}/>Contact</Link>
            </div>
          </div>
        </div>
      </section>

      <aside id="services" className="local-services">
        <div className="section-line">
          <div><span>Choose a service</span><h2>Services & Pricing</h2></div>
          <span>Managed from admin</span>
        </div>

        <p className="local-services-intro">
          Services are managed from the business admin. Add or remove services, change the description, choose the button size, set booking rules and connect each service to availability, calendars and customer records.
        </p>

        <div className="local-service-grid local-service-grid-sized">
          {site.content.services.slice(0,9).map((service, index) => {
            const size = service.size || "medium";
            return <a className={`local-service-button service-${size}`} href={serviceHref(service.name)} key={service.name}>
              <span className="local-service-icon"><Wrench size={18}/></span>
              <span className="local-service-content">
                <span className="local-service-number">{String(index + 1).padStart(2,"0")}</span>
                <strong>{service.name}</strong>
                <small>{service.description || "Service details can be managed from the business admin area."}</small>
              </span>
              <span className="local-service-action">Book <ArrowRight size={15}/></span>
            </a>;
          })}
        </div>


      </aside>
    </div>

    <Footer site={site} preview={preview}/>
  </main>;
}

export function LocalServiceContact({ site, preview = false }: { site: BusinessSite; preview?: boolean }) {
  const homeHref = localHomeHref(site, preview);
  return <main className="site local-service local-contact-page">
    <LocalServiceHeader site={site} preview={preview}/>
    <section className="local-contact-page-inner">
      <div className="local-contact-page-copy">
        <span>CONTACT</span>
        <h1>How can we help?</h1>
        <p>Send a message to the business. Service requests can be routed into the admin inbox and linked to customer and service records.</p>
        {(site.content.hours_text || site.content.address_text) && <div className="local-contact-details">
          {site.content.hours_text && <div><Clock3 size={18}/><span><strong>Hours</strong>{site.content.hours_text}</span></div>}
          {site.content.address_text && <div><MapPin size={18}/><span><strong>Location</strong>{site.content.address_text}</span></div>}
        </div>}
        <Link className="local-back-link" href={homeHref}>← Back to services</Link>
      </div>

      <form className="local-contact-form" action="#" method="post">
        <label><span>Name</span><input name="name" type="text" placeholder="Your name" required /></label>
        <label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label>
        <label><span>Service</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option>{site.content.services.map(service => <option key={service.name} value={service.name}>{service.name}</option>)}</select></label>
        <label><span>Preferred date</span><input name="preferredDate" type="date" /></label>
        <label className="local-contact-message"><span>Message</span><textarea name="message" rows={7} placeholder="Tell us what you need help with." required /></label>
        <button type="submit"><MessageCircle size={17}/>Send Message<ArrowRight size={16}/></button>
        {preview && <small>Demo form — production submissions connect to the business admin inbox/customer record.</small>}
      </form>
    </section>
    <Footer site={site} preview={preview}/>
  </main>;
}

function PerformanceShop({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero = img(site,"hero")!;
  const base = preview ? `/layouts/${site.layout.code}` : `/${site.instance.path_slug}`;
  const bookingHref = `${base}/book`;
  return <main className="site performance-shop performance-home">
    <section className="perf-hero" style={{ backgroundImage:`url(${hero.public_url})` }}><div className="perf-overlay"><header><Brand site={site} light/><nav><Link href={`${base}/services`}>Services</Link><Link href={`${base}/shop`}>The Shop</Link><Link href={bookingHref}>Appointments</Link></nav></header><div className="perf-copy"><span>PERFORMANCE / REPAIR / FABRICATION</span><h1>{site.content.headline}</h1>{site.content.subheadline && <p className="perf-subheadline">{site.content.subheadline}</p>}{(site.content.hours_text || site.content.address_text) && <div className="perf-hero-info">{site.content.hours_text && <span><Clock3 size={17}/><strong>Hours</strong>{site.content.hours_text}</span>}{site.content.address_text && <span><MapPin size={17}/><strong>Location</strong>{site.content.address_text}</span>}</div>}<Link className="perf-button" href={bookingHref}>Request an Appointment<ArrowRight/></Link></div><div className="perf-number">01</div></div></section>
    <Footer site={site} preview={preview}/>
  </main>;
}

export function PerformanceServicesPage({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const base = preview ? `/layouts/${site.layout.code}` : `/${site.instance.path_slug}`;
  const bookingHref = `${base}/book`;
  return <main className="site performance-shop perf-subpage"><header className="perf-page-header"><Brand site={site} light/><nav><Link href={base}>Home</Link><Link href={`${base}/services`}>Services</Link><Link href={`${base}/shop`}>The Shop</Link><Link href={bookingHref}>Appointments</Link></nav></header><section className="perf-page-intro"><span>SERVICES</span><h1>Choose the work.</h1><p>Select a service to start an appointment request. Each option, description and availability can be managed from the business admin.</p></section><section className="perf-services perf-services-page">{site.content.services.map((s,i)=><Link href={`${bookingHref}?service=${encodeURIComponent(s.name)}`} key={s.name}><span>{String(i+1).padStart(2,"0")}</span><h2>{s.name}</h2><p>{s.description}</p><strong>Request service <ArrowRight size={16}/></strong></Link>)}</section><Footer site={site} preview={preview}/></main>;
}

export function PerformanceShopPage({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const gallery = img(site,"gallery");
  const base = preview ? `/layouts/${site.layout.code}` : `/${site.instance.path_slug}`;
  return <main className="site performance-shop perf-subpage"><header className="perf-page-header"><Brand site={site} light/><nav><Link href={base}>Home</Link><Link href={`${base}/services`}>Services</Link><Link href={`${base}/shop`}>The Shop</Link><Link href={`${base}/book`}>Appointments</Link></nav></header><section className="perf-story perf-story-page"><div><span>THE SHOP</span><h1>Built for focused work.</h1><p>{site.content.about_text}</p><div className="perf-shop-meta">{site.content.hours_text&&<span><Clock3 size={17}/><b>Hours</b>{site.content.hours_text}</span>}{site.content.address_text&&<span><MapPin size={17}/><b>Location</b>{site.content.address_text}</span>}</div><Link className="perf-button" href={`${base}/book`}>Request an Appointment<ArrowRight/></Link></div>{gallery&&<figure><Image src={gallery.public_url} alt={gallery.alt_text} fill sizes="50vw"/></figure>}</section><Footer site={site} preview={preview}/></main>;
}

function EditorialStudio({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero=img(site,"hero")!; const work=img(site,"portfolio") || img(site,"gallery");
  return <main className="site editorial-studio">
    <header className="editorial-nav"><Brand site={site}/><nav><a href="#services">Services</a><a href="#story">Studio</a><a href="#work">Work</a><a className="book" href="#contact">Book</a></nav></header>
    <section className="editorial-hero"><div className="editorial-title"><span>INDEPENDENT HAIR STUDIO</span><h1>{site.content.headline}</h1><p>{site.content.subheadline}</p></div><figure><Image src={hero.public_url} alt={hero.alt_text} fill priority sizes="52vw"/></figure></section>
    <section id="services" className="editorial-services"><div className="editorial-rule"><span>Services</span><span>01—03</span></div>{site.content.services.slice(0,3).map((s,i)=><article key={s.name}><span>0{i+1}</span><h2>{s.name}</h2><p>{s.description}</p><ArrowRight/></article>)}</section>
    <section id="story" className="editorial-story"><div><span>THE STUDIO</span><h2>Quiet space. Considered work.</h2></div><p>{site.content.about_text}</p></section>
    {work&&<section id="work" className="editorial-work"><figure><Image src={work.public_url} alt={work.alt_text} fill sizes="60vw"/></figure><div><span>SELECTED WORK</span><h2>{work.caption || "Recent work"}</h2><a href="#contact">Book an appointment <ArrowRight size={16}/></a></div></section>}
    <section id="contact" className="editorial-contact"><h2>{site.content.primary_cta_label}</h2><ContactStrip site={site}/></section><Footer site={site} preview={preview}/>
  </main>;
}

function Hospitality({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero=img(site,"hero")!; const photos=site.media.filter(m=>m.kind==="gallery");
  return <main className="site hospitality-site"><header className="hospitality-nav"><Brand site={site}/><nav><a href="#menu">Menu</a><a href="#story">About</a><a href="#visit">Visit</a></nav><a className="reserve" href="#visit">Reserve</a></header>
    <section className="hospitality-hero"><figure><Image src={hero.public_url} alt={hero.alt_text} fill priority sizes="100vw"/></figure><div className="hospitality-copy"><span>DINNER · DRINKS · RACINE</span><h1>{site.content.headline}</h1><p>{site.content.subheadline}</p><a href="#visit">{site.content.primary_cta_label}</a></div></section>
    <section id="menu" className="menu-preview"><div><span>TONIGHT</span><h2>A short menu that changes with the room.</h2></div><div className="menu-list">{site.content.services.slice(0,3).map((s,i)=><div key={s.name}><span>0{i+1}</span><h3>{s.name}</h3><p>{s.description}</p></div>)}</div></section>
    {photos[0]&&<section className="hospitality-photo-row">{photos.slice(0,2).map(p=><figure key={p.id}><Image src={p.public_url} alt={p.alt_text} fill sizes="50vw"/><figcaption>{p.caption}</figcaption></figure>)}</section>}
    <section id="story" className="hospitality-story"><span>OUR ROOM</span><h2>Come for dinner. Stay because nobody is rushing you out.</h2><p>{site.content.about_text}</p></section>
    <section id="visit" className="hospitality-visit"><div><span>VISIT</span><h2>{site.instance.business_name}</h2></div><ContactStrip site={site}/></section><Footer site={site} preview={preview}/>
  </main>;
}

function ClassicBarber({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero=img(site,"hero")!; const work=img(site,"portfolio");
  return <main className="site classic-barber"><div className="barber-banner">EST. 2026 · RACINE, WISCONSIN · GOOD CUTS, NO NONSENSE</div><header className="barber-nav"><Brand site={site}/><nav><a href="#services">Services</a><a href="#shop">Shop</a><a href="#contact">Book</a></nav></header>
    <section className="barber-hero"><div className="barber-copy"><span>YOUR NEIGHBORHOOD BARBER</span><h1>{site.content.headline}</h1><p>{site.content.subheadline}</p><a href="#contact">{site.content.primary_cta_label}<ArrowRight size={17}/></a></div><figure><Image src={hero.public_url} alt={hero.alt_text} fill priority sizes="52vw"/></figure></section>
    <section id="services" className="barber-services"><h2>On the chair</h2>{site.content.services.slice(0,3).map((s,i)=><article key={s.name}><span>0{i+1}</span><div><h3>{s.name}</h3><p>{s.description}</p></div><strong>Book →</strong></article>)}</section>
    <section id="shop" className="barber-story">{work&&<figure><Image src={work.public_url} alt={work.alt_text} fill sizes="45vw"/></figure>}<div><span>THE SHOP</span><h2>Know your barber. Know your cut.</h2><p>{site.content.about_text}</p></div></section>
    <section id="contact" className="barber-contact"><h2>Grab a chair.</h2><ContactStrip site={site}/></section><Footer site={site} preview={preview}/>
  </main>;
}

function ModernService({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero=img(site,"hero")!; const gallery=site.media.filter(m=>m.kind==="gallery");
  return <main className="site modern-retail"><header className="retail-nav"><Brand site={site}/><nav><a href="#services">Services</a><a href="#booking">Appointments</a><a href="#visit">Contact</a></nav></header>
    <section id="services" className="retail-categories retail-categories-top">{site.content.services.slice(0,3).map((s,i)=><article key={s.name}><span>0{i+1}</span><h2>{s.name}</h2><p>{s.description}</p></article>)}</section>
    <section className="retail-grid retail-service-grid"><div className="retail-title retail-service-title"><span>APPOINTMENT-BASED SERVICE</span><h1>{site.content.headline}</h1><p>{site.content.subheadline}</p><a href="#booking">{site.content.primary_cta_label}<ArrowRight size={17}/></a></div><figure className="retail-main"><Image src={hero.public_url} alt={hero.alt_text} fill priority sizes="52vw"/></figure>{gallery[0]&&<figure className="retail-small"><Image src={gallery[0].public_url} alt={gallery[0].alt_text} fill sizes="34vw"/></figure>}</section>
    <section id="booking" className="retail-booking"><div><span>BOOKING</span><h2>Choose a service and reserve a time.</h2></div><a href={site.content.primary_cta_href}>{site.content.primary_cta_label}<ArrowRight size={17}/></a></section>
    <section id="visit" className="retail-visit"><h2>Appointments & contact</h2><ContactStrip site={site}/></section><Footer site={site} preview={preview}/>
  </main>;
}

function LuxuryNoir({ site, preview }: { site: BusinessSite; preview: boolean }) {
  const hero=img(site,"hero")!; const gallery=img(site,"gallery");
  return <main className="site luxury-noir"><section className="noir-hero" style={{backgroundImage:`url(${hero.public_url})`}}><div className="noir-overlay"><header><Brand site={site} light/><nav><a href="#experience">Experience</a><a href="#room">The Room</a><a href="#reserve">Reserve</a></nav></header><div className="noir-title"><span>NO. 8 · CHICAGO</span><h1>{site.content.headline}</h1><p>{site.content.subheadline}</p><a href="#reserve">{site.content.primary_cta_label}</a></div></div></section>
    <section id="experience" className="noir-services"><div><span>THE EVENING</span><h2>Less noise. More attention.</h2></div><div>{site.content.services.slice(0,3).map((s,i)=><article key={s.name}><span>0{i+1}</span><h3>{s.name}</h3><p>{s.description}</p></article>)}</div></section>
    <section id="room" className="noir-story">{gallery&&<figure><Image src={gallery.public_url} alt={gallery.alt_text} fill sizes="52vw"/></figure>}<div><span>THE ROOM</span><h2>Designed for an evening, not a turnover.</h2><p>{site.content.about_text}</p></div></section>
    <section className="noir-quote">{site.content.testimonials[0]&&<><Quote/><blockquote>“{site.content.testimonials[0].quote}”</blockquote><cite>{site.content.testimonials[0].name}</cite></>}</section>
    <section id="reserve" className="noir-contact"><h2>Reserve the evening.</h2><ContactStrip site={site}/></section><Footer site={site} preview={preview}/>
  </main>;
}

const renderers: Record<string,(props:{site:BusinessSite;preview:boolean})=>ReactNode> = {
  "clean-service": LocalService,
  "workshop-dark": PerformanceShop,
  "editorial-studio": SalonHome,
  "hospitality-warm": Hospitality,
  "neighborhood-classic": ClassicBarber,
  "modern-grid": ModernService,
  "luxury-noir": LuxuryNoir,
};

export default function BusinessSiteView({ site, preview = false }: { site: BusinessSite; preview?: boolean }) {
  const Renderer = renderers[site.layout.style_key] || LocalService;
  return <div className={`business-site-shell layout-${site.layout.style_key}`} style={cssVars(site)}><Renderer site={site} preview={preview}/></div>;
}
