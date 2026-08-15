import { localToolkits } from "./local";
import type { ToolkitRecord } from "./types";

// ==========================================================
// TOOLKIT SERVICE 001 — PLATFORM-READY DATA BOUNDARY
// ==========================================================
// Launch: local.ts -> service -> homepage
// Later: Platform public JSON endpoint -> service -> same homepage

const catalogUrl = process.env.NEXT_PUBLIC_TOOLKIT_CATALOG_URL;

function isToolkit(value: unknown): value is ToolkitRecord {
  if (!value || typeof value !== "object") return false;
  const t = value as Partial<ToolkitRecord>;
  return typeof t.id === "string" && typeof t.name === "string" &&
    typeof t.slug === "string" && typeof t.category === "string" &&
    typeof t.description === "string" && typeof t.url === "string" &&
    ["active", "draft", "disabled"].includes(String(t.status)) &&
    ["cyan", "amber", "green", "violet", "red"].includes(String(t.accent)) &&
    typeof t.sortOrder === "number";
}

function normalize(values: unknown[]): ToolkitRecord[] {
  return values.filter(isToolkit)
    .filter((t) => t.status === "active")
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

async function remoteCatalog(): Promise<ToolkitRecord[] | null> {
  if (!catalogUrl) return null;
  try {
    const response = await fetch(catalogUrl, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return Array.isArray(data) ? normalize(data) : null;
  } catch {
    return null;
  }
}

// ==========================================================
// TOOLKIT SERVICE 002 — PUBLIC GETTER
// ==========================================================

export async function getToolkits(): Promise<ToolkitRecord[]> {
  const remote = await remoteCatalog();
  return remote ?? normalize(localToolkits);
}
