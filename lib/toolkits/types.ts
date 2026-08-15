// ==========================================================
// TOOLKIT TYPES 001 — PLATFORM CONTRACT
// ==========================================================

export type ToolkitAccent = "cyan" | "amber" | "green" | "violet" | "red";
export type ToolkitStatus = "active" | "draft" | "disabled";

export type ToolkitRecord = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  url: string;
  status: ToolkitStatus;
  accent: ToolkitAccent;
  sortOrder: number;
};
