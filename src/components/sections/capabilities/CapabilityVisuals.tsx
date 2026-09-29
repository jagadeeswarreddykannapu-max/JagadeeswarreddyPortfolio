"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CapabilityId } from "@/content/skills";
import { smoothPath } from "@/lib/utils";

/* Small, calm illustrations of each capability's core method. Illustrative values only. */

function useDraw(delay = 0) {
  const reduce = useReducedMotion();
  return reduce
    ? { initial: false as const }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
      };
}

function OperationsVisual() {
  // sawtooth stock with reorder point and safety stock
  const pts: [number, number][] = [];
  const cycles = 4;
  for (let c = 0; c < cycles; c++) {
    const x0 = 20 + c * 95;
    pts.push([x0, 40], [x0 + 88, 146], [x0 + 95, 40]);
  }
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join("");
  const draw = useDraw(0.1);
  return (
    <svg viewBox="0 0 420 190" className="h-auto w-full" role="img" aria-label="Illustration: stock falls with demand, an order is placed at the reorder point and arrives before stock drops into the safety buffer.">
      <rect x="20" y="146" width="380" height="24" rx="4" fill="#0e9aa7" opacity="0.14" />
      <text x="26" y="162" fontSize="10" fill="#0b6e77" fontWeight="600">Safety stock</text>
      <line x1="20" x2="400" y1="104" y2="104" stroke="#d03b3b" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="396" y="98" fontSize="10" fill="#d03b3b" fontWeight="600" textAnchor="end" stroke="#fff" strokeWidth="4" paintOrder="stroke">Reorder point</text>
      <line x1="20" x2="400" y1="170" y2="170" stroke="#d8e1ec" />
      <motion.path d={d} fill="none" stroke="#145fe5" strokeWidth="2.5" strokeLinejoin="round" {...draw} />
    </svg>
  );
}

function AnalyticsVisual() {
  const bars = [46, 58, 52, 66, 72, 69, 81, 88];
  const reduce = useReducedMotion();
  const tiles = [
    { l: "Fill rate", v: "97.1%" },
    { l: "OTIF", v: "94.6%" },
    { l: "Supplier SLA", v: "92.3%" },
  ];
  return (
    <div role="img" aria-label="Illustration: KPI tiles for fill rate, OTIF and supplier SLA above a bar chart of a KPI improving over eight periods.">
      <div className="grid grid-cols-3 gap-2" aria-hidden>
        {tiles.map((t) => (
          <div key={t.l} className="rounded-lg border border-line bg-white px-2.5 py-2">
            <p className="text-[0.66rem] text-muted">{t.l}</p>
            <p className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">{t.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-28 items-end gap-2 border-b border-line px-1" aria-hidden>
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-[4px] bg-blue"
            style={{ height: `${b}%`, originY: 1 }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

function ProcurementVisual() {
  // Kraljic matrix: supply risk (x) vs profit impact (y)
  const reduce = useReducedMotion();
  const dots = [
    { x: 78, y: 26, r: 7 },
    { x: 66, y: 34, r: 5 },
    { x: 30, y: 30, r: 6 },
    { x: 22, y: 20, r: 4 },
    { x: 72, y: 74, r: 5 },
    { x: 58, y: 64, r: 4 },
    { x: 24, y: 72, r: 5 },
    { x: 38, y: 80, r: 4 },
    { x: 14, y: 60, r: 3 },
  ];
  const quad = [
    { x: 50, y: 0, label: "Strategic" },
    { x: 0, y: 0, label: "Leverage" },
    { x: 50, y: 50, label: "Bottleneck" },
    { x: 0, y: 50, label: "Routine" },
  ];
  return (
    <div role="img" aria-label="Illustration: a Kraljic matrix placing suppliers by supply risk and profit impact into strategic, leverage, bottleneck and routine segments.">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-white" aria-hidden>
        {quad.map((q) => (
          <span
            key={q.label}
            className="absolute flex h-1/2 w-1/2 items-start justify-end p-2 text-[0.7rem] font-semibold text-muted"
            style={{ left: `${q.x}%`, top: `${q.y}%`, background: q.label === "Strategic" ? "rgba(20,95,229,0.07)" : undefined }}
          >
            {q.label}
          </span>
        ))}
        <span className="absolute inset-y-0 left-1/2 w-px bg-line" />
        <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
        {dots.map((d, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-blue ring-2 ring-white"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2, height: d.r * 2, marginLeft: -d.r, marginTop: -d.r }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.68rem] text-muted" aria-hidden>
        <span>Supply risk, low to high</span>
        <span>Profit impact on the vertical axis</span>
      </div>
    </div>
  );
}

function AutomationVisual() {
  const reduce = useReducedMotion();
  const steps = ["Extract", "Validate", "Transform", "Publish", "Alert"];
  return (
    <div role="img" aria-label="Illustration: an automated reporting flow from extraction and validation to publishing a dashboard and sending alerts, replacing manual steps.">
      <div className="flex items-center justify-between gap-1" aria-hidden>
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <motion.div
              className="grid w-full place-items-center rounded-lg border border-line bg-white px-1 py-3 text-center text-[0.7rem] font-semibold text-ink"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.09 }}
            >
              <span className="mb-1 grid size-6 place-items-center rounded-full bg-blue-100 text-[0.66rem] text-navy">{i + 1}</span>
              {s}
            </motion.div>
            {i < steps.length - 1 ? <span className="h-px w-2 shrink-0 bg-navy/40" /> : null}
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-2.5" aria-hidden>
        {[
          { l: "Manual steps", w: 100, c: "#c7d3e3" },
          { l: "After automation", w: 22, c: "#145fe5" },
        ].map((b, i) => (
          <div key={b.l}>
            <p className="text-[0.7rem] text-muted">{b.l}</p>
            <motion.div
              className="mt-1 h-2.5 rounded-r-[4px]"
              style={{ width: `${b.w}%`, background: b.c, originX: 0 }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ModellingVisual() {
  const actual = [52, 56, 54, 61, 64, 60, 67, 71];
  const forecast = [52, 56, 54, 61, 64, 60, 67, 71, 74, 77, 76, 81];
  const X = (i: number) => 20 + i * 34;
  const Y = (v: number) => 160 - (v - 40) * 2.6;
  const upper = forecast.map((v, i) => (i < 7 ? v : v + (i - 6) * 3.2));
  const lower = forecast.map((v, i) => (i < 7 ? v : v - (i - 6) * 3.2));
  const band =
    upper
      .slice(7)
      .map((v, j) => `${j ? "L" : "M"}${X(j + 7)},${Y(v)}`)
      .join("") +
    lower
      .slice(7)
      .reverse()
      .map((v, j) => `L${X(forecast.length - 1 - j)},${Y(v)}`)
      .join("") +
    "Z";
  const drawA = useDraw(0.05);
  const drawF = useDraw(0.6);
  return (
    <svg viewBox="0 0 420 190" className="h-auto w-full" role="img" aria-label="Illustration: actual demand followed by a forecast line with a widening uncertainty band.">
      <line x1="20" x2="400" y1="170" y2="170" stroke="#d8e1ec" />
      <line x1={X(7)} x2={X(7)} y1="20" y2="170" stroke="#d8e1ec" />
      <text x={X(7) + 6} y="30" fontSize="10" fill="#667085">Forecast</text>
      <path d={band} fill="#e0930b" opacity="0.16" />
      <motion.path d={smoothPath(forecast.slice(7).map((v, i) => [X(i + 7), Y(v)]), 0.3)} fill="none" stroke="#e0930b" strokeWidth="2.5" strokeDasharray="6 5" {...drawF} />
      <motion.path d={smoothPath(actual.map((v, i) => [X(i), Y(v)]), 0.3)} fill="none" stroke="#145fe5" strokeWidth="2.5" {...drawA} />
      <text x="24" y={Y(actual[0]) - 10} fontSize="10" fill="#145fe5" fontWeight="600">Actual</text>
    </svg>
  );
}

export function CapabilityVisual({ id }: { id: CapabilityId }) {
  switch (id) {
    case "operations":
      return <OperationsVisual />;
    case "analytics":
      return <AnalyticsVisual />;
    case "procurement":
      return <ProcurementVisual />;
    case "automation":
      return <AutomationVisual />;
    default:
      return <ModellingVisual />;
  }
}

export const visualCaption: Record<CapabilityId, string> = {
  operations: "Inventory policy: reorder point and safety stock",
  analytics: "KPI tracking: service and supplier metrics",
  procurement: "Supplier segmentation: the Kraljic matrix",
  automation: "Reporting automation: from manual to automated steps",
  modelling: "Forecasting: expected demand with uncertainty",
};
