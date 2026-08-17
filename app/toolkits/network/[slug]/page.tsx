import {
  notFound,
} from "next/navigation";

import {
  getNetworkTool,
} from "../../../lib/network/tools";

import NetworkInstrument from "./NetworkInstrument";

import "./tool.css";


// ==========================================================
// NETWORK TOOL 001 — DYNAMIC INSTRUMENT ROUTE
// ==========================================================

export default async function ToolPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const {
    slug,
  } = await params;

  const tool =
    getNetworkTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <NetworkInstrument
      tool={tool}
    />
  );
}
