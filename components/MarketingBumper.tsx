"use client";

import { useEffect, useMemo, useState } from "react";

import rotationData from "@/data/marketing-rotation.json";

type RotationItem = {
  id: string;
  segment: string;
  segmentLabel: string;
  text: string;
  weight: number;
};

const rotation = rotationData as RotationItem[];

const segmentAliases: Record<string, string> = {
  general: "general",
  business: "general",
  trades: "trades",
  trade: "trades",
  plumbing: "trades",
  plumber: "trades",
  hvac: "trades",
  electrical: "trades",
  electrician: "trades",
  retail: "retail",
  store: "retail",
  restaurant: "hospitality",
  bar: "hospitality",
  hospitality: "hospitality",
  warehouse: "warehouse",
  distribution: "warehouse",
  auto: "auto",
  repair: "auto",
  appointments: "appointments",
  salon: "appointments",
  barber: "appointments",
  property: "property",
  facilities: "property",
  construction: "construction",
  contractors: "construction",
  professional: "professional",
};

function chooseWeighted(items: RotationItem[], excludedId?: string | null) {
  const eligible = items.filter((item) => item.id !== excludedId);
  const pool = eligible.length > 0 ? eligible : items;
  const totalWeight = pool.reduce((sum, item) => sum + Math.max(1, item.weight), 0);

  let cursor = Math.random() * totalWeight;

  for (const item of pool) {
    cursor -= Math.max(1, item.weight);
    if (cursor <= 0) return item;
  }

  return pool[pool.length - 1];
}

function getPool(segment: string) {
  if (segment === "all") return rotation;

  const matches = rotation.filter((item) => item.segment === segment);
  return matches.length > 1 ? matches : rotation;
}

export function MarketingBumper() {
  const [segment, setSegment] = useState("all");
  const [current, setCurrent] = useState<RotationItem>(rotation[0]);
  const [visible, setVisible] = useState(true);

  const pool = useMemo(() => getPool(segment), [segment]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSegment = params.get("segment")?.trim().toLowerCase() ?? "";
    const resolvedSegment = segmentAliases[requestedSegment] ?? "all";
    const initialPool = getPool(resolvedSegment);
    const lastId = window.sessionStorage.getItem("otl-marketing-bumper-last");
    const initial = chooseWeighted(initialPool, lastId);

    setSegment(resolvedSegment);
    setCurrent(initial);
    window.sessionStorage.setItem("otl-marketing-bumper-last", initial.id);
  }, []);

  useEffect(() => {
    if (pool.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer = 0;

    const schedule = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;

        setVisible(false);

        timer = window.setTimeout(() => {
          if (cancelled) return;

          setCurrent((previous) => {
            const next = chooseWeighted(pool, previous.id);
            window.sessionStorage.setItem("otl-marketing-bumper-last", next.id);
            return next;
          });

          window.requestAnimationFrame(() => {
            if (!cancelled) setVisible(true);
          });

          schedule();
        }, 1750);
      }, 7200);
    };

    schedule();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pool]);

  return (
    <div className="otl-marketing-note" aria-label="Examples of business problems OneTime Labs can solve">
      <div className="otl-marketing-note-stage" aria-live="off">
        <p className={`otl-marketing-note-text${visible ? "" : " is-fading"}`}>
          {current.text}
        </p>
      </div>
    </div>
  );
}
