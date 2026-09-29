/**
 * Professional experience. All bullets, dates and metrics are taken from the CV.
 * Order is chronological so the timeline reads as a career progression.
 */

export type Kpi = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Optional grouping for thousands, e.g. 50000 -> "50,000". */
  group?: boolean;
  icon: "clock" | "database" | "chart" | "users" | "funnel" | "list" | "gear" | "presentation";
};

export type Role = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  startISO: string;
  endISO: string;
  context: string;
  achievements: string[];
  accomplishment: string;
  kpis: Kpi[];
  tools: string[];
  /** Company logo, cut from the Experience reference. */
  logo: { src: string; width: number; height: number };
};

export const experience: Role[] = [
  {
    id: "wipro",
    company: "Wipro Limited",
    role: "Associate Data Analyst",
    location: "Hyderabad, India",
    start: "Jul 2022",
    end: "Jun 2024",
    startISO: "2022-07",
    endISO: "2024-06",
    context: "Supply chain reporting, data quality and automation for business stakeholders.",
    achievements: [
      "Built dashboards tracking 15+ supply chain KPIs (inventory turnover, fill rate, OTIF, supplier SLA) for 10+ stakeholders, cutting reporting cycle time by 40%.",
      "Extracted and transformed 50,000+ ERP/CRM records using SQL and Python (Pandas), and automated data quality checks, reducing manual errors by 35%.",
      "Standardized reporting templates across 3 business units, presenting workflows to teams and saving 8 analyst hours per week through Python and Power Automate automation.",
    ],
    accomplishment:
      "Improved data reliability and reporting efficiency by delivering scalable analytics and automation solutions.",
    kpis: [
      { value: 40, suffix: "%", label: "Faster reporting cycle", icon: "clock" },
      { value: 50000, suffix: "+", group: true, label: "ERP/CRM records processed", icon: "database" },
      { value: 15, suffix: "+", label: "Supply chain KPIs tracked", icon: "chart" },
      { value: 10, suffix: "+", label: "Stakeholders supported", icon: "users" },
    ],
    tools: ["SQL", "Python (Pandas)", "Power BI", "Power Automate", "ERP / CRM data"],
    logo: { src: "/images/logos/wipro.webp", width: 276, height: 225 },
  },
  {
    id: "icodetest",
    company: "ICodeTest",
    role: "Business Analyst (Academic Internship)",
    location: "Hyderabad, India",
    start: "Apr 2025",
    end: "Jul 2025",
    startISO: "2025-04",
    endISO: "2025-07",
    context: "Supplier analytics and sales-to-delivery performance tracking.",
    achievements: [
      "Conducted detailed supplier analysis across 100+ vendor prospects and built a segmentation model that reduced vendor shortlisting time by 30%.",
      "Tracked 12 KPIs across the sales-to-delivery funnel using SQL and Excel, and identified 3 bottlenecks, improving order fulfilment visibility.",
      "Produced weekly supply chain performance dashboards in Power BI for management review and proposed 2 Power Automate automation opportunities.",
    ],
    accomplishment:
      "Enabled analytics-based operational decision-making by combining supplier analytics, KPI tracking and business intelligence reporting, presenting insights to 50+ stakeholders.",
    kpis: [
      { value: 30, suffix: "%", label: "Faster vendor shortlisting", icon: "funnel" },
      { value: 12, label: "KPIs tracked, sales to delivery", icon: "list" },
      { value: 2, label: "Automation opportunities proposed", icon: "gear" },
      { value: 50, suffix: "+", label: "Stakeholders presented to", icon: "presentation" },
    ],
    tools: ["SQL", "Excel", "Power BI", "Power Automate", "Segmentation modelling"],
    logo: { src: "/images/logos/icodetest.webp", width: 324, height: 111 },
  },
];

/** Wipro reporting pipeline, reconstructed from the three Wipro bullets. */
export const wiproPipeline = [
  { id: "source", title: "ERP / CRM data", detail: "50,000+ records", note: "Extracted with SQL" },
  { id: "transform", title: "Transform", detail: "SQL + Python (Pandas)", note: "Cleaned and reshaped" },
  { id: "quality", title: "Quality checks", detail: "Automated", note: "35% fewer manual errors" },
  { id: "templates", title: "Standard templates", detail: "3 business units", note: "8 analyst hours saved / week" },
  { id: "dashboards", title: "KPI dashboards", detail: "15+ KPIs", note: "Turnover, fill rate, OTIF, SLA" },
  { id: "people", title: "Stakeholders", detail: "10+ supported", note: "40% faster reporting cycle" },
] as const;

/** ICodeTest vendor funnel, reconstructed from the ICodeTest bullets. */
export const vendorFunnel = [
  { label: "Vendor prospects analysed", value: "100+" },
  { label: "Segmented by the model", value: "Segments" },
  { label: "Shortlist, reached 30% faster", value: "Shortlist" },
] as const;
