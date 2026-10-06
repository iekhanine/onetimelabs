"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GripVertical,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Menu,
  Palette,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  WandSparkles,
  Wrench,
} from "lucide-react";
import type { BusinessSite } from "@/lib/business-site/data";

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
};

const defaultItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Bookings", icon: CalendarDays, badge: "12" },
  { label: "Calendar", icon: Clock3 },
  { label: "Customers", icon: Users },
  { label: "Services", icon: Wrench },
  { label: "Inbox", icon: Inbox, badge: "4" },
  { label: "Site Content", icon: FileText },
  { label: "Images & Portfolio", icon: ImageIcon },
  { label: "Navigation", icon: Menu },
  { label: "Reports", icon: BarChart3 },
  { label: "Appearance", icon: Palette },
  { label: "Settings", icon: Settings },
];

export default function AdminDemo({ site }: { site: BusinessSite }) {
  const [active, setActive] = useState("Dashboard");
  const [items, setItems] = useState(defaultItems);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{ label: string; position: "before" | "after" } | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(184);
  const [resizing, setResizing] = useState(false);

  const [adminAccent, setAdminAccent] = useState("#f05a28");
  const [adminCanvas, setAdminCanvas] = useState("#edf1f5");
  const [adminSurface, setAdminSurface] = useState("#ffffff");
  const [adminSidebar, setAdminSidebar] = useState("#101827");

  const [siteAccent, setSiteAccent] = useState("#f05a28");
  const [siteBackground, setSiteBackground] = useState("#080a0c");
  const [siteSurface, setSiteSurface] = useState("#0f1316");
  const [siteText, setSiteText] = useState("#f5f7f8");

  useEffect(() => {
    if (!resizing) return;
    const onMove = (event: MouseEvent) => setSidebarWidth(Math.min(320, Math.max(156, event.clientX)));
    const onUp = () => setResizing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    document.body.classList.add("admin-resizing");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("admin-resizing");
    };
  }, [resizing]);

  function moveItem(source: string, target: string, position: "before" | "after") {
    if (source === target) return;
    setItems((current) => {
      const next = [...current];
      const from = next.findIndex((item) => item.label === source);
      const targetIndex = next.findIndex((item) => item.label === target);
      if (from < 0 || targetIndex < 0) return current;
      const [moved] = next.splice(from, 1);
      let to = next.findIndex((item) => item.label === target);
      if (position === "after") to += 1;
      next.splice(to, 0, moved);
      return next;
    });
    setDropTarget(null);
  }

  const publicPreviewHref = useMemo(() => {
    const params = new URLSearchParams({
      accent: siteAccent,
      background: siteBackground,
      surface: siteSurface,
      text: siteText,
    });
    return `/layouts/${site.layout.code}?${params.toString()}`;
  }, [site.layout.code, siteAccent, siteBackground, siteSurface, siteText]);

  return (
    <main
      className="admin-demo-shell admin-demo-premium"
      style={{
        "--admin-accent": adminAccent,
        "--admin-canvas": adminCanvas,
        "--admin-surface": adminSurface,
        "--admin-sidebar": adminSidebar,
        "--admin-sidebar-width": `${sidebarWidth}px`,
      } as CSSProperties}
    >
      <aside className="admin-demo-sidebar">
        <div className="admin-demo-brand" title={`${site.instance.business_name} Business Console`}>
          <div className="admin-brand-mark"><WandSparkles size={18} /></div>
          <span>Console</span>
        </div>

        <div className="admin-sidebar-caption">Menu</div>
        <nav>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                draggable
                onDragStart={() => { setDragging(item.label); setDropTarget(null); }}
                onDragEnd={() => { setDragging(null); setDropTarget(null); }}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (!dragging || dragging === item.label) return;
                  const rect = event.currentTarget.getBoundingClientRect();
                  const position = event.clientY < rect.top + rect.height / 2 ? "before" : "after";
                  setDropTarget({ label: item.label, position });
                }}
                onDrop={() => dragging && dropTarget && moveItem(dragging, item.label, dropTarget.position)}
                className={`${isActive ? "active" : ""} ${dragging === item.label ? "dragging" : ""} ${dropTarget?.label === item.label ? `drop-${dropTarget.position}` : ""}`}
                onClick={() => setActive(item.label)}
                title="Drag to reorder"
              >
                <GripVertical className="admin-drag-handle" size={15} />
                <span className="admin-nav-icon"><Icon size={17} /></span>
                <span className="admin-nav-label">{item.label}</span>
                {item.badge ? <span className="admin-nav-badge">{item.badge}</span> : <ChevronRight className="admin-nav-chevron" size={14} />}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-spacer" />
        <Link className="admin-back-site" href={`/layouts/${site.layout.code}`} title="Back to sample site"><ArrowUpRight size={16}/><span>Site</span></Link>
        <button
          className="admin-sidebar-resizer"
          aria-label="Resize navigation"
          title="Drag to resize navigation"
          onMouseDown={(event) => { event.preventDefault(); setResizing(true); }}
        ><span /></button>
      </aside>

      <section className="admin-demo-main">
        <header className="admin-demo-header">
          <div>
            <span className="admin-eyebrow">CUSTOMER ADMIN</span>
            <h1>{active}</h1>
            <p>Manage day-to-day operations from one place.</p>
          </div>
          <div className="admin-header-actions">
            <label className="admin-search"><Search size={15}/><input aria-label="Search" placeholder="Search anything…" /></label>
            <button className="admin-icon-button" aria-label="Notifications"><Bell size={17}/><i>4</i></button>
            <button className="admin-primary-action"><Plus size={16}/>New</button>
          </div>
        </header>

        <div className="admin-demo-notice"><CheckCircle2 size={15}/><strong>Interactive demo</strong><span>Everything works visually, but nothing is saved.</span></div>
        <AdminPanel
          active={active}
          site={site}
          adminTheme={{ accent: adminAccent, canvas: adminCanvas, surface: adminSurface, sidebar: adminSidebar }}
          setAdminTheme={{ setAccent: setAdminAccent, setCanvas: setAdminCanvas, setSurface: setAdminSurface, setSidebar: setAdminSidebar }}
          siteTheme={{ accent: siteAccent, background: siteBackground, surface: siteSurface, text: siteText }}
          setSiteTheme={{ setAccent: setSiteAccent, setBackground: setSiteBackground, setSurface: setSiteSurface, setText: setSiteText }}
          publicPreviewHref={publicPreviewHref}
        />
      </section>
    </main>
  );
}

function AdminPanel({
  active,
  site,
  adminTheme,
  setAdminTheme,
  siteTheme,
  setSiteTheme,
  publicPreviewHref,
}: {
  active: string;
  site: BusinessSite;
  adminTheme: { accent: string; canvas: string; surface: string; sidebar: string };
  setAdminTheme: { setAccent: (value: string) => void; setCanvas: (value: string) => void; setSurface: (value: string) => void; setSidebar: (value: string) => void };
  siteTheme: { accent: string; background: string; surface: string; text: string };
  setSiteTheme: { setAccent: (value: string) => void; setBackground: (value: string) => void; setSurface: (value: string) => void; setText: (value: string) => void };
  publicPreviewHref: string;
}) {
  const serviceCount = String(site.content.services.length);

  if (active === "Dashboard") {
    return (
      <div className="admin-demo-grid dashboard-grid">
        <section className="admin-command-card">
          <div className="admin-command-copy">
            <span>GOOD MORNING</span>
            <h2>Everything you need to run today.</h2>
            <p>Appointments, customers, messages and website updates stay in one workspace.</p>
            <div className="admin-command-actions">
              <button className="admin-command-primary"><CalendarDays size={17}/>Create booking</button>
              <button className="admin-command-secondary"><Users size={17}/>New customer</button>
            </div>
          </div>
          <div className="admin-command-visual">
            <div className="admin-live-pill"><i/>LIVE OPERATIONS</div>
            <strong>4</strong>
            <span>appointments today</span>
            <div className="admin-mini-track"><i style={{width:"72%"}}/></div>
            <small>72% of today’s schedule filled</small>
          </div>
        </section>

        <Stat label="Upcoming bookings" value="12" delta="+18%" icon={CalendarDays} />
        <Stat label="New messages" value="4" delta="2 unread" icon={Inbox} />
        <Stat label="Customers" value="286" delta="+23 this month" icon={Users} />
        <Stat label="Active services" value={serviceCount} delta="All bookable" icon={Wrench} />

        <section className="admin-demo-panel admin-schedule-card wide">
          <PanelTitle title="Today’s schedule" subtitle="Tuesday, October 6" action="View calendar" />
          <div className="admin-timeline">
            {[
              ["8:00 AM", "Diagnostics", "Jordan Miller", "Confirmed"],
              ["10:30 AM", "Brakes & Maintenance", "Casey Reed", "Confirmed"],
              ["1:00 PM", "Tires & Alignment", "Morgan Smith", "Pending"],
              ["3:30 PM", "Mechanical Repair", "Taylor Brooks", "Confirmed"],
            ].map(([time, service, customer, status]) => (
              <div className="admin-appointment" key={`${time}-${customer}`}>
                <div className="admin-appointment-time">{time}</div>
                <div className="admin-appointment-line" />
                <div className="admin-appointment-copy"><strong>{service}</strong><span>{customer}</span></div>
                <span className={`admin-status ${status.toLowerCase()}`}>{status}</span>
                <button className="admin-row-action"><ArrowUpRight size={14}/></button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-demo-panel admin-quick-card">
          <PanelTitle title="Quick actions" subtitle="Common tasks" />
          <div className="admin-quick-actions">
            <FancyAction icon={CalendarDays} title="Add booking" text="Create an appointment" />
            <FancyAction icon={Users} title="Add customer" text="Create a customer record" />
            <FancyAction icon={Wrench} title="Edit services" text="Pricing, duration & rules" />
            <FancyAction icon={FileText} title="Update website" text="Edit public content" />
          </div>
        </section>
      </div>
    );
  }

  if (active === "Bookings" || active === "Calendar") {
    return (
      <section className="admin-demo-panel admin-table-panel">
        <PanelTitle title={active} subtitle="Appointment management" action="+ Add booking" />
        <div className="admin-filter-row"><button className="selected">All</button><button>Confirmed</button><button>Pending</button><button>Completed</button></div>
        {[
          ["Oct 9 · 8:00 AM", "Diagnostics", "Jordan Miller", "Confirmed"],
          ["Oct 9 · 10:30 AM", "Brakes & Maintenance", "Casey Reed", "Confirmed"],
          ["Oct 9 · 1:00 PM", "Tires & Alignment", "Morgan Smith", "Pending"],
          ["Oct 10 · 9:00 AM", "Pre-Purchase Inspection", "Avery Johnson", "Confirmed"],
        ].map(([when, service, customer, status]) => <DataRow key={`${when}-${customer}`} primary={service} secondary={`${when} · ${customer}`} tag={status} />)}
      </section>
    );
  }

  if (active === "Customers") {
    return (
      <section className="admin-demo-panel admin-table-panel">
        <PanelTitle title="Customer records" subtitle="History, contact information and service notes" action="+ New customer" />
        {["Jordan Miller", "Casey Reed", "Morgan Smith", "Taylor Brooks"].map((name, i) => (
          <DataRow key={name} primary={name} secondary={["2019 BMW M3", "2021 Audi S4", "2018 Subaru WRX", "2020 Ford Mustang GT"][i]} tag={`${i + 1} booking${i ? "s" : ""}`} />
        ))}
      </section>
    );
  }

  if (active === "Services") {
    return (
      <section className="admin-demo-panel admin-table-panel">
        <PanelTitle title="Services" subtitle="Pricing, duration, booking rules and display order" action="+ Add service" />
        <div className="admin-service-list">
          {site.content.services.map((service, index) => (
            <div className="admin-service-card" key={service.name}>
              <div className="admin-service-number">{String(index + 1).padStart(2, "0")}</div>
              <div><strong>{service.name}</strong><p>{service.description}</p></div>
              <span className="admin-service-size">{service.size || "medium"}</span>
              <button className="admin-row-action"><MoreHorizontal size={16}/></button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (active === "Inbox") {
    return (
      <section className="admin-demo-panel admin-table-panel">
        <PanelTitle title="Inbox" subtitle="Customer questions and contact-form messages" action="Compose" />
        {["Question about brake inspection", "Can I move my Friday appointment?", "Estimate request", "Follow-up after service"].map((subject, i) => (
          <DataRow key={subject} primary={subject} secondary={["Jordan M. · 8 min ago", "Casey R. · 32 min ago", "Morgan S. · 1 hr ago", "Taylor B. · Yesterday"][i]} tag={i < 2 ? "Unread" : "Open"} />
        ))}
      </section>
    );
  }

  if (active === "Site Content") {
    return (
      <section className="admin-demo-panel form premium-form">
        <PanelTitle title="Homepage content" subtitle="Edit what customers see without touching code" action="Preview site" />
        <div className="admin-form-grid">
          <label className="wide">Headline<input defaultValue={site.content.headline}/></label>
          <label className="wide">Subheadline<textarea rows={3} defaultValue={site.content.subheadline}/></label>
          <label>Hours<input defaultValue={site.content.hours_text}/></label>
          <label>Address<input defaultValue={site.content.address_text}/></label>
        </div>
        <div className="admin-form-footer"><span>Changes are local to this demo.</span><button className="admin-save-button"><Sparkles size={15}/>Save demo changes</button></div>
      </section>
    );
  }

  if (active === "Images & Portfolio") {
    return (
      <section className="admin-demo-panel">
        <PanelTitle title="Images & Portfolio" subtitle="Manage the imagery used throughout the public site" action="Open media library" />
        <div className="admin-upload-grid premium-uploads">
          {[["Hero image", "Recommended 2000 × 1200"], ["Logo", "PNG or WebP preferred"], ["Gallery", "Show the space or team"], ["Portfolio", "Before/after or completed work"]].map(([title, help]) => (
            <button key={title}><span className="admin-upload-icon"><ImageIcon size={22}/></span><strong>{title}</strong><small>{help}</small><em>Choose file</em></button>
          ))}
        </div>
      </section>
    );
  }

  if (active === "Navigation") {
    return (
      <section className="admin-demo-panel admin-table-panel">
        <PanelTitle title="Navigation" subtitle="Add, rename and arrange public menu items" action="+ Add menu item" />
        {[
          ["Home", "/"], ["Services", "/services"], ["Appointments", "/book"], ["Contact", "/contact"],
        ].map(([label, href]) => (
          <div className="admin-nav-editor" key={label}><GripVertical size={17}/><input defaultValue={label}/><input defaultValue={href}/><button>Remove</button></div>
        ))}
      </section>
    );
  }

  if (active === "Appearance") {
    const adminPresets = [
      { name: "Graphite Orange", accent: "#f05a28", canvas: "#edf1f5", surface: "#ffffff", sidebar: "#101827" },
      { name: "Electric Blue", accent: "#3b82f6", canvas: "#eef3f8", surface: "#ffffff", sidebar: "#111827" },
      { name: "Emerald", accent: "#10b981", canvas: "#edf4f1", surface: "#ffffff", sidebar: "#10201b" },
      { name: "Violet", accent: "#8b5cf6", canvas: "#f1eef8", surface: "#ffffff", sidebar: "#171329" },
    ];
    const sitePresets = [
      { name: "Black / Orange", accent: "#f05a28", background: "#080a0c", surface: "#0f1316", text: "#f5f7f8" },
      { name: "Navy / Blue", accent: "#3b82f6", background: "#07111f", surface: "#0d1b2d", text: "#eef6ff" },
      { name: "Charcoal / Lime", accent: "#a3e635", background: "#0b0d0c", surface: "#141814", text: "#f4f7f2" },
      { name: "Warm / Gold", accent: "#d4a84f", background: "#17130e", surface: "#211a12", text: "#f7f0e4" },
    ];
    return (
      <div className="admin-appearance-grid">
        <section className="admin-demo-panel admin-theme-panel">
          <PanelTitle title="Admin theme" subtitle="Changes apply instantly to this demo console." />
          <div className="admin-preset-grid">{adminPresets.map((preset) => <button key={preset.name} onClick={() => { setAdminTheme.setAccent(preset.accent); setAdminTheme.setCanvas(preset.canvas); setAdminTheme.setSurface(preset.surface); setAdminTheme.setSidebar(preset.sidebar); }}><span className="admin-theme-swatch"><i style={{ background: preset.sidebar }} /><i style={{ background: preset.canvas }} /><i style={{ background: preset.accent }} /></span><strong>{preset.name}</strong></button>)}</div>
          <div className="admin-color-fields">
            <ColorField label="Accent" value={adminTheme.accent} onChange={setAdminTheme.setAccent} />
            <ColorField label="Canvas" value={adminTheme.canvas} onChange={setAdminTheme.setCanvas} />
            <ColorField label="Cards" value={adminTheme.surface} onChange={setAdminTheme.setSurface} />
            <ColorField label="Sidebar" value={adminTheme.sidebar} onChange={setAdminTheme.setSidebar} />
          </div>
        </section>
        <section className="admin-demo-panel admin-theme-panel">
          <PanelTitle title="Public site theme" subtitle="Try a color system on the actual customer-facing demo." />
          <div className="admin-preset-grid">{sitePresets.map((preset) => <button key={preset.name} onClick={() => { setSiteTheme.setAccent(preset.accent); setSiteTheme.setBackground(preset.background); setSiteTheme.setSurface(preset.surface); setSiteTheme.setText(preset.text); }}><span className="admin-theme-swatch"><i style={{ background: preset.background }} /><i style={{ background: preset.surface }} /><i style={{ background: preset.accent }} /></span><strong>{preset.name}</strong></button>)}</div>
          <div className="admin-color-fields">
            <ColorField label="Accent" value={siteTheme.accent} onChange={setSiteTheme.setAccent} />
            <ColorField label="Background" value={siteTheme.background} onChange={setSiteTheme.setBackground} />
            <ColorField label="Surface" value={siteTheme.surface} onChange={setSiteTheme.setSurface} />
            <ColorField label="Text" value={siteTheme.text} onChange={setSiteTheme.setText} />
          </div>
          <div className="admin-theme-preview"><div style={{ background: siteTheme.background, color: siteTheme.text }}><span style={{ background: siteTheme.accent }} /><strong>Performance Shop</strong><small>Live palette preview</small></div><Link href={publicPreviewHref} target="_blank" className="admin-preview-theme-button">Preview public site <ArrowUpRight size={15}/></Link></div>
        </section>
      </div>
    );
  }

  if (active === "Reports") {
    return (
      <div className="admin-demo-grid dashboard-grid">
        <Stat label="Bookings this month" value="46" delta="+12%" icon={CalendarDays} />
        <Stat label="New customers" value="19" delta="+7%" icon={Users} />
        <Stat label="Repeat customers" value="27" delta="59% return rate" icon={CheckCircle2} />
        <Stat label="No-shows" value="2" delta="4.3%" icon={Clock3} />
        <section className="admin-demo-panel wide admin-chart-card">
          <PanelTitle title="Service demand" subtitle="Bookings by service" action="Export report" />
          {site.content.services.slice(0, 5).map((service, index) => (
            <div className="admin-bar" key={service.name}><span>{service.name}</span><div><i style={{ width: `${88 - index * 11}%` }}/></div><b>{88 - index * 11}%</b></div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <section className="admin-demo-panel form premium-form">
      <PanelTitle title="Business settings" subtitle="Core preferences for this location" action="View site" />
      <div className="admin-form-grid">
        <label>Business name<input defaultValue={site.instance.business_name}/></label>
        <label>Public path<input defaultValue={`onetimelabs.net/${site.instance.path_slug}`}/></label>
        <label>Timezone<select defaultValue="America/Chicago"><option>America/Chicago</option></select></label>
        <label>Booking notifications<select defaultValue="enabled"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></label>
      </div>
      <div className="admin-form-footer"><span>Demo settings reset on refresh.</span><button className="admin-save-button"><Sparkles size={15}/>Save demo settings</button></div>
    </section>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="admin-color-field"><span>{label}</span><div><input type="color" value={value} onChange={(event) => onChange(event.target.value)} /><code>{value.toUpperCase()}</code></div></label>;
}

function PanelTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return <div className="admin-panel-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button>{action}<ArrowUpRight size={14}/></button>}</div>;
}

function DataRow({ primary, secondary, tag }: { primary: string; secondary: string; tag: string }) {
  return <div className="admin-data-row"><div className="admin-avatar">{primary.slice(0, 1)}</div><div><strong>{primary}</strong><span>{secondary}</span></div><span className="admin-data-tag">{tag}</span><button className="admin-row-action"><MoreHorizontal size={16}/></button></div>;
}

function FancyAction({ icon: Icon, title, text }: { icon: typeof CalendarDays; title: string; text: string }) {
  return <button className="admin-fancy-action"><span><Icon size={18}/></span><div><strong>{title}</strong><small>{text}</small></div><ChevronRight size={15}/></button>;
}

function Stat({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: typeof CalendarDays }) {
  return <div className="admin-demo-stat"><div className="admin-stat-top"><span className="admin-stat-icon"><Icon size={17}/></span><em>{delta}</em></div><strong>{value}</strong><span>{label}</span></div>;
}
