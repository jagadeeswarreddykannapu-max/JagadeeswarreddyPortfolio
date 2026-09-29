/**
 * Skills, grouped as in the portfolio brief and populated from the CV's "Technical Skills".
 * No proficiency ratings: each capability is backed by an example of where it was used.
 */

export type CapabilityId = "operations" | "analytics" | "procurement" | "automation" | "modelling";

export type Capability = {
  id: CapabilityId;
  index: string;
  title: string;
  summary: string;
  skills: string[];
  evidence: string[];
};

export const capabilities: Capability[] = [
  {
    id: "operations",
    index: "01",
    title: "Supply Chain & Operations",
    summary: "Planning, inventory, procurement and logistics decisions that balance service, cost and cash.",
    skills: [
      "Demand Forecasting",
      "Inventory Management",
      "EOQ & Safety Stock",
      "S&OP",
      "MRP",
      "Procurement & Vendor Analysis",
      "Logistics Coordination",
      "Working Capital Analysis",
    ],
    evidence: [
      "Inventory policy modelled at a 97.5% service level",
      "MSc thesis on inventory efficiency and working capital",
      "Supplier analysis across 100+ vendor prospects",
    ],
  },
  {
    id: "analytics",
    index: "02",
    title: "Data Analytics & Business Intelligence",
    summary: "Turning raw operational data into dashboards and analysis that people use to decide.",
    skills: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "SQL (MySQL, PostgreSQL)",
      "Power BI",
      "Tableau",
      "Advanced Excel (PivotTables, Power Query)",
      "IBM SPSS",
      "KPI Tracking",
      "Predictive Analytics",
      "Data Visualization",
    ],
    evidence: [
      "Dashboards tracking 15+ supply chain KPIs at Wipro",
      "50,000+ ERP/CRM records transformed with SQL and Python",
      "Weekly Power BI performance dashboards at ICodeTest",
    ],
  },
  {
    id: "procurement",
    index: "03",
    title: "Procurement & Supplier Management",
    summary: "Understanding supplier performance and risk to make sourcing decisions faster and safer.",
    skills: [
      "Supplier Analysis",
      "Vendor Segmentation",
      "Strategic Sourcing",
      "Procurement Reporting",
      "Supplier Risk Assessment",
      "Vendor Performance",
    ],
    evidence: [
      "Segmentation model cut vendor shortlisting time by 30%",
      "Supplier risk workflow in the AI Control Tower",
      "Strategic Sourcing module in the MSc",
    ],
  },
  {
    id: "automation",
    index: "04",
    title: "Process Automation & Digital Tools",
    summary: "Automating the repetitive parts of reporting so analysts spend time on the exceptions.",
    skills: [
      "ERP Systems",
      "Power Apps",
      "Power Automate",
      "n8n",
      "Python Automation",
      "Data Quality Checks",
      "Workflow Optimization",
      "Lean / Continuous Improvement",
    ],
    evidence: [
      "7 automated workflows built in n8n",
      "8 analyst hours saved per week at Wipro",
      "35% fewer manual errors after automated quality checks",
    ],
  },
  {
    id: "modelling",
    index: "05",
    title: "Predictive Modelling & Optimization",
    summary: "Statistical and machine learning methods to forecast, optimize and reduce cost.",
    skills: [
      "Time-Series Forecasting",
      "Regression Analysis",
      "Random Forest",
      "Linear Programming",
      "Scikit-learn",
      "Inventory Optimization",
      "Risk Modelling",
    ],
    evidence: [
      "Random Forest delay model: 84% accuracy on 10,000+ shipments",
      "Linear programming for inventory policy (22% lower modelled holding cost)",
      "Time-series demand forecasting",
    ],
  },
];

/** Skills highlighted in the immersive landscape, each with a one-line proof point. */
export const landscapeSkills = [
  { label: "Demand Forecasting", proof: "Time-series forecasts feed the inventory optimization model." },
  { label: "Inventory Optimization", proof: "EOQ, safety stock and reorder points at a 97.5% service level." },
  { label: "Procurement & Sourcing", proof: "Supplier analysis across 100+ vendor prospects at ICodeTest." },
  { label: "Logistics Coordination", proof: "Delay prediction on 10,000+ shipment records in NovexAI." },
  { label: "S&OP and MRP", proof: "Planning methods from the CV skill set and the MSc S&OP module." },
  { label: "KPI Reporting", proof: "Dashboards tracking 15+ supply chain KPIs for 10+ stakeholders." },
  { label: "Process Automation", proof: "Seven n8n workflows and Power Automate reporting automation." },
] as const;
