/**
 * DEMONSTRATION DATA for the AI Supply Chain Control Tower view.
 * Figures, supplier names and alert texts are illustrative and are labelled as demo
 * data wherever they appear. The project facts (7 workflows, 8 KPIs, Power BI,
 * email alerts, n8n + JavaScript) come from the CV.
 */
import type { Status } from "@/components/charts/primitives";

export const weeks = Array.from({ length: 12 }, (_, i) => `Wk ${i + 1}`);

export type CtKpi = {
  id: string;
  name: string;
  value: string;
  target: string;
  status: Status;
  series: number[];
  unit: string;
  higherIsBetter: boolean;
  threshold?: number;
  rule: string;
  workflow: string;
};

export const ctKpis: CtKpi[] = [
  {
    id: "turnover",
    name: "Inventory turnover",
    value: "6.8×",
    target: "Target: at least 6.0×",
    status: "good",
    series: [6.1, 6.2, 6.0, 6.3, 6.4, 6.3, 6.5, 6.6, 6.5, 6.7, 6.6, 6.8],
    unit: "×",
    higherIsBetter: true,
    threshold: 6,
    rule: "Email the inventory lead if turnover stays below 6.0× for two weeks.",
    workflow: "inventory",
  },
  {
    id: "dio",
    name: "Days inventory outstanding",
    value: "53.7 days",
    target: "Limit: 60 days",
    status: "good",
    series: [59.8, 58.9, 60.4, 58.1, 57.2, 57.9, 56.4, 55.3, 56.0, 54.6, 55.1, 53.7],
    unit: "days",
    higherIsBetter: false,
    threshold: 60,
    rule: "Flag when DIO rises above 60 days.",
    workflow: "inventory",
  },
  {
    id: "stockout",
    name: "Days to stockout, lowest SKU",
    value: "4.6 days",
    target: "Minimum cover: 7 days",
    status: "critical",
    series: [11.2, 10.4, 9.8, 10.1, 9.2, 8.6, 8.9, 7.8, 7.1, 6.2, 5.3, 4.6],
    unit: "days",
    higherIsBetter: true,
    threshold: 7,
    rule: "Immediate email to the planner when any SKU drops below 7 days of cover.",
    workflow: "inventory",
  },
  {
    id: "reorder",
    name: "Reorder quantity due",
    value: "1,240 units",
    target: "18 SKUs at reorder point",
    status: "warning",
    series: [620, 540, 710, 680, 820, 760, 900, 870, 1010, 980, 1120, 1240],
    unit: "units",
    higherIsBetter: false,
    rule: "Daily reorder list emailed to purchasing.",
    workflow: "procurement",
  },
  {
    id: "var",
    name: "Inventory value at risk",
    value: "€182K",
    target: "Limit: €150K",
    status: "serious",
    series: [128, 131, 135, 133, 140, 146, 151, 149, 158, 166, 174, 182],
    unit: "€K",
    higherIsBetter: false,
    threshold: 150,
    rule: "Flag slow-moving stock value above €150K.",
    workflow: "warehouse",
  },
  {
    id: "supplier",
    name: "Supplier risk score, average",
    value: "41 / 100",
    target: "Limit: 45",
    status: "good",
    series: [47, 46, 48, 45, 44, 45, 43, 44, 42, 43, 42, 41],
    unit: "score",
    higherIsBetter: false,
    threshold: 45,
    rule: "Escalate any supplier scoring above 70.",
    workflow: "supplier",
  },
  {
    id: "forecast",
    name: "Demand forecast, next 4 weeks",
    value: "18,400 units",
    target: "Up 6.2% on the last period",
    status: "info",
    series: [15.9, 16.2, 16.0, 16.6, 16.9, 16.7, 17.1, 17.4, 17.2, 17.8, 18.1, 18.4],
    unit: "k units",
    higherIsBetter: true,
    rule: "Weekly refresh feeds reorder points and the executive summary.",
    workflow: "demand",
  },
  {
    id: "transport",
    name: "Transport on schedule",
    value: "93.6%",
    target: "Target: 95%",
    status: "warning",
    series: [96.2, 95.8, 96.4, 95.1, 95.6, 94.8, 95.2, 94.4, 94.9, 94.1, 93.8, 93.6],
    unit: "%",
    higherIsBetter: true,
    threshold: 95,
    rule: "Alert logistics when on-schedule loads fall below 95%.",
    workflow: "logistics",
  },
];

export type Workflow = {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  outputs: string[];
  kpis: string[];
};

/** The seven workflow domains are from the CV; the configuration shown is an illustrative design. */
export const workflows: Workflow[] = [
  {
    id: "inventory",
    name: "Inventory",
    trigger: "Daily schedule",
    steps: ["Read stock levels", "Calculate turnover, DIO and cover", "Check thresholds"],
    outputs: ["Refresh Power BI", "Email alert"],
    kpis: ["turnover", "dio", "stockout"],
  },
  {
    id: "supplier",
    name: "Supplier risk",
    trigger: "Weekly schedule",
    steps: ["Read deliveries and invoices", "Score each supplier", "Flag scores above 70"],
    outputs: ["Refresh Power BI", "Email procurement"],
    kpis: ["supplier"],
  },
  {
    id: "procurement",
    name: "Procurement",
    trigger: "Daily schedule",
    steps: ["Compare stock with reorder points", "Size reorder quantities", "Build the reorder list"],
    outputs: ["Email purchasing"],
    kpis: ["reorder"],
  },
  {
    id: "warehouse",
    name: "Warehouse",
    trigger: "Daily schedule",
    steps: ["Read ageing stock", "Value slow-moving items", "Check value at risk"],
    outputs: ["Refresh Power BI", "Email alert"],
    kpis: ["var"],
  },
  {
    id: "demand",
    name: "Demand",
    trigger: "Weekly schedule",
    steps: ["Read order history", "Refresh the forecast", "Publish next 4 weeks"],
    outputs: ["Refresh Power BI"],
    kpis: ["forecast"],
  },
  {
    id: "logistics",
    name: "Logistics",
    trigger: "Every 4 hours",
    steps: ["Read shipment status", "Compare with plan", "Flag late loads"],
    outputs: ["Email logistics"],
    kpis: ["transport"],
  },
  {
    id: "executive",
    name: "Executive reporting",
    trigger: "Monday morning",
    steps: ["Collect all 8 KPIs", "Summarise exceptions", "Format the brief"],
    outputs: ["Email leadership"],
    kpis: ["turnover", "dio", "stockout", "reorder", "var", "supplier", "forecast", "transport"],
  },
];

export const suppliers = [
  { name: "Halden Steel", category: "Raw materials", onTime: 96.1, daysLate: 0.6, spend: 2140, risk: 22 },
  { name: "Oriel Components", category: "Electronics", onTime: 93.4, daysLate: 1.2, spend: 1680, risk: 31 },
  { name: "Lumen Fasteners", category: "Fasteners", onTime: 94.8, daysLate: 0.9, spend: 640, risk: 27 },
  { name: "Kestrel Packaging", category: "Packaging", onTime: 91.2, daysLate: 1.8, spend: 520, risk: 38 },
  { name: "Tervo Electronics", category: "Electronics", onTime: 88.6, daysLate: 2.7, spend: 1390, risk: 52 },
  { name: "Marisol Plastics", category: "Components", onTime: 86.9, daysLate: 3.1, spend: 760, risk: 58 },
  { name: "Arden Logistics", category: "Freight", onTime: 84.3, daysLate: 3.9, spend: 910, risk: 66 },
  { name: "Brenner Castings", category: "Castings", onTime: 78.5, daysLate: 5.4, spend: 1180, risk: 74 },
];

export const delaySeverity = [
  { label: "On time", value: 64, color: "#145fe5" },
  { label: "1 to 2 days late", value: 21, color: "#8fb6f5" },
  { label: "3 to 5 days late", value: 11, color: "#e0930b" },
  { label: "More than 5 days late", value: 4, color: "#d03b3b" },
];

export type Alert = {
  id: string;
  status: Status;
  title: string;
  detail: string;
  to: string;
  when: string;
  workflow: string;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    status: "critical",
    title: "Days to stockout below 7",
    detail: "Bearing kit BRG-2041 has 4.6 days of cover at current demand.",
    to: "Inventory planner",
    when: "Today, 06:02",
    workflow: "Inventory",
  },
  {
    id: "a2",
    status: "serious",
    title: "Inventory value at risk above limit",
    detail: "€182K in slow-moving stock against a €150K limit.",
    to: "Inventory lead",
    when: "Today, 06:05",
    workflow: "Warehouse",
  },
  {
    id: "a3",
    status: "warning",
    title: "Supplier risk score above 70",
    detail: "Brenner Castings scored 74: late deliveries and invoice disputes.",
    to: "Procurement",
    when: "Mon, 07:10",
    workflow: "Supplier risk",
  },
  {
    id: "a4",
    status: "warning",
    title: "Transport on schedule below 95%",
    detail: "7 of 109 loads are running late this week.",
    to: "Logistics coordinator",
    when: "Today, 08:00",
    workflow: "Logistics",
  },
  {
    id: "a5",
    status: "good",
    title: "Reorder list generated",
    detail: "18 SKUs at their reorder point, 1,240 units in total.",
    to: "Purchasing",
    when: "Today, 06:10",
    workflow: "Procurement",
  },
  {
    id: "a6",
    status: "info",
    title: "Weekly executive brief sent",
    detail: "8 KPIs with 3 exceptions highlighted.",
    to: "Leadership team",
    when: "Mon, 08:30",
    workflow: "Executive reporting",
  },
];
