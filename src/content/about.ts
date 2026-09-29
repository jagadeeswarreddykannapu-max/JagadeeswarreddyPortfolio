/**
 * About section content. Every descriptor below is traceable to the CV:
 * experience at Wipro / ICodeTest, the three key projects and the MSc.
 */

export type PortraitId = "operations" | "office" | "suit" | "field" | "casual";

export type Domain = {
  id: string;
  stage: string;
  title: string;
  points: string[];
  portrait: PortraitId;
};

export const portraits: Record<
  PortraitId,
  { src: string; width: number; height: number; alt: string }
> = {
  suit: {
    src: "/images/portraits/suit.webp",
    width: 530,
    height: 1644,
    alt: "Jagadeeswar Reddy in a dark suit, arms folded, smiling at the camera",
  },
  operations: {
    src: "/images/portraits/operations.webp",
    width: 422,
    height: 1166,
    alt: "Jagadeeswar in a high-visibility vest holding a tablet",
  },
  office: {
    src: "/images/portraits/office.webp",
    width: 380,
    height: 1210,
    alt: "Jagadeeswar in a white shirt with a lanyard, holding a tablet",
  },
  field: {
    src: "/images/portraits/field.webp",
    width: 482,
    height: 1160,
    alt: "Jagadeeswar in a navy work jacket carrying a white safety helmet",
  },
  casual: {
    src: "/images/portraits/casual.webp",
    width: 410,
    height: 1132,
    alt: "Jagadeeswar in a green overshirt holding a tablet",
  },
};

/** The five links of the chain, each tied to evidence from the CV. */
export const domains: Domain[] = [
  {
    id: "plan",
    stage: "Plan",
    title: "Demand planning",
    points: ["Time-series forecasting", "S&OP and MRP", "Demand Planning module, MSc"],
    portrait: "casual",
  },
  {
    id: "source",
    stage: "Source",
    title: "Procurement & sourcing",
    points: ["100+ vendors analysed", "Vendor segmentation", "Supplier risk scoring"],
    portrait: "office",
  },
  {
    id: "stock",
    stage: "Stock",
    title: "Inventory",
    points: ["EOQ and safety stock", "Reorder points", "Working capital analysis"],
    portrait: "operations",
  },
  {
    id: "move",
    stage: "Move",
    title: "Logistics",
    points: ["Shipment delay prediction", "Logistics coordination", "OTIF and fill rate"],
    portrait: "field",
  },
  {
    id: "measure",
    stage: "Measure",
    title: "Reporting & automation",
    points: ["Power BI dashboards", "Python and SQL pipelines", "Power Automate and n8n"],
    portrait: "suit",
  },
];

/**
 * "Why choose me?": the reference's layout and tone, with every reason backed by the CV
 * (the reference's sector list and "3+ years" are not in the CV, so they are not used).
 */
export const whyChooseMe = {
  eyebrow: "A broader perspective",
  statement: ["I bring an end-to-end understanding to solve real", "supply chain challenges."],
  body:
    "From supplier data to stock on the shelf, I connect data, process and people to build efficient, resilient and sustainable supply chains.",
  corners: { left: ["Supply chain", "analyst"], right: ["Data", "Process", "People", "Impact"] },
  reasons: [
    {
      id: "reporting",
      title: "Reporting automation",
      text: "Power BI dashboards and Python and SQL pipelines that cut the reporting cycle at Wipro by 40%.",
    },
    {
      id: "supplier",
      title: "Supplier analytics",
      text: "Vendor segmentation across 100+ prospects that made shortlisting 30% faster at ICodeTest.",
    },
    {
      id: "inventory",
      title: "Inventory optimization",
      text: "EOQ, safety-stock and reorder-point models built to protect a 97.5% service level.",
    },
    {
      id: "logistics",
      title: "Predictive logistics",
      text: "A Random Forest delay model trained on 10,000+ shipment records, 84% accurate.",
    },
    {
      id: "automation",
      title: "Process automation",
      text: "Seven n8n workflows across inventory, procurement, warehouse, demand and logistics.",
    },
  ],
  stats: [
    { value: 2, suffix: "+", label: "Years of analytics experience" },
    { value: 15, suffix: "+", label: "Supply chain KPIs tracked" },
    { value: 100, suffix: "+", label: "Vendors analysed" },
    { symbol: "∞", label: "Continuous learning" },
  ],
} as const;

export const aboutCopy = {
  headline: ["Connecting operations.", "Creating impact."],
  lead:
    "I'm a supply chain analyst with two years of operational and analytics experience across demand forecasting, inventory optimization and procurement reporting.",
  body:
    "My work sits where supply chain knowledge meets data: Power BI dashboards that make performance visible, Python and SQL pipelines that remove manual reporting, and EOQ and safety-stock models that reduce holding costs. I completed my MSc in Purchasing & Supply Chain Management at Montpellier Business School, and I'm looking for roles where better data leads to better supply chain decisions.",
  facts: [
    { value: "2 years", label: "Operational and analytics experience" },
    { value: "MSc", label: "Purchasing & Supply Chain Management, 2024 to 2026" },
    { value: "English C2", label: "French A2, in active study" },
  ],
} as const;
