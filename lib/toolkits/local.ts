import type { ToolkitRecord } from "./types";

// ==========================================================
// LOCAL TOOLKITS 001 — LAUNCH FALLBACK CATALOG
// ==========================================================
// Add temporary launch toolkits here. The homepage never imports
// this file directly, so Platform can replace the data source later.

export const localToolkits: ToolkitRecord[] = [
{
  id: "network-toolkit",
  name: "NETWORK TOOLKIT",
  slug: "network-toolkit",
  category: "IT",
  description: "Network diagnostics and administration tools.",
  url: "#",
  status: "active",
  accent: "cyan",
  sortOrder: 10,
},

{
  id: "metrology-toolkit",
  name: "METROLOGY TOOLKIT",
  slug: "metrology-toolkit",
  category: "METROLOGY",
  description: "Measurement, tolerance, and calibration utilities.",
  url: "#",
  status: "active",
  accent: "green",
  sortOrder: 20,
},

{
  id: "systems-toolkit",
  name: "SYSTEMS TOOLKIT",
  slug: "systems-toolkit",
  category: "IT",
  description: "System administration and infrastructure utilities.",
  url: "#",
  status: "active",
  accent: "violet",
  sortOrder: 30,
},

{
  id: "security-toolkit",
  name: "SECURITY TOOLKIT",
  slug: "security-toolkit",
  category: "SECURITY",
  description: "Hashing, certificates, encoding, and security utilities.",
  url: "#",
  status: "active",
  accent: "red",
  sortOrder: 40,
},

{
  id: "facilities-toolkit",
  name: "FACILITIES TOOLKIT",
  slug: "facilities-toolkit",
  category: "FACILITIES",
  description: "HVAC, electrical, maintenance, and facility utilities.",
  url: "#",
  status: "active",
  accent: "amber",
  sortOrder: 50,
},

{
  id: "developer-toolkit",
  name: "DEVELOPER TOOLKIT",
  slug: "developer-toolkit",
  category: "DEVELOPMENT",
  description: "JSON, Base64, UUID, regex, and developer utilities.",
  url: "#",
  status: "active",
  accent: "cyan",
  sortOrder: 60,
},

{
  id: "data-toolkit",
  name: "DATA TOOLKIT",
  slug: "data-toolkit",
  category: "DATA",
  description: "CSV, JSON, text, conversion, and data inspection tools.",
  url: "#",
  status: "active",
  accent: "green",
  sortOrder: 70,
},

{
  id: "operations-toolkit",
  name: "OPERATIONS TOOLKIT",
  slug: "operations-toolkit",
  category: "OPERATIONS",
  description: "Operational planning, workflow, and field utilities.",
  url: "#",
  status: "active",
  accent: "amber",
  sortOrder: 80,
},

{
  id: "printer-toolkit",
  name: "PRINT TOOLKIT",
  slug: "printer-toolkit",
  category: "PRINT SERVICES",
  description: "Printer fleet, SNMP, configuration, and troubleshooting tools.",
  url: "#",
  status: "active",
  accent: "violet",
  sortOrder: 90,
},

{
  id: "asset-toolkit",
  name: "ASSET TOOLKIT",
  slug: "asset-toolkit",
  category: "ITAM",
  description: "Asset lifecycle, inventory, normalization, and audit utilities.",
  url: "#",
  status: "active",
  accent: "cyan",
  sortOrder: 100,
},

{
  id: "field-toolkit",
  name: "FIELD TOOLKIT",
  slug: "field-toolkit",
  category: "FIELD SERVICE",
  description: "Practical calculators and utilities for field technicians.",
  url: "#",
  status: "active",
  accent: "green",
  sortOrder: 110,
},

{
  id: "electrical-toolkit",
  name: "ELECTRICAL TOOLKIT",
  slug: "electrical-toolkit",
  category: "ENGINEERING",
  description: "Voltage, current, resistance, power, and electrical calculations.",
  url: "#",
  status: "active",
  accent: "amber",
  sortOrder: 120,
},

{
  id: "web-toolkit",
  name: "WEB TOOLKIT",
  slug: "web-toolkit",
  category: "WEB",
  description: "HTTP, headers, URLs, encoding, DNS, and web utilities.",
  url: "#",
  status: "active",
  accent: "violet",
  sortOrder: 130,
},

{
  id: "time-toolkit",
  name: "TIME TOOLKIT",
  slug: "time-toolkit",
  category: "GENERAL",
  description: "Time zones, timestamps, durations, dates, and scheduling tools.",
  url: "#",
  status: "active",
  accent: "cyan",
  sortOrder: 140,
},

{
  id: "conversion-toolkit",
  name: "CONVERSION TOOLKIT",
  slug: "conversion-toolkit",
  category: "ENGINEERING",
  description: "Engineering, scientific, storage, and unit conversions.",
  url: "#",
  status: "active",
  accent: "green",
  sortOrder: 150,
},
{
  id: "database-toolkit",
  name: "DATABASE TOOLKIT",
  slug: "database-toolkit",
  category: "DATA",
  description: "SQL, schema, query, and database administration utilities.",
  url: "#",
  status: "active",
  accent: "violet",
  sortOrder: 160,
},
];
