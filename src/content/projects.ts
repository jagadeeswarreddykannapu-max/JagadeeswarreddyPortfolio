/**
 * Key projects. Facts (tools, scope, metrics) come from the CV's "Key Projects" section.
 * Framing copy (challenge, objective, relevance) is connective writing that describes the
 * problem each project addresses; it makes no additional factual claims.
 *
 * Dashboard figures used in the interactive views live in /src/content/demo and are
 * always labelled on screen as demonstration data.
 */

export type ResultKind = "delivered" | "model" | "simulated" | "modelled";

export type ProjectCategory = "supply-chain" | "analytics" | "automation" | "forecasting";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "supply-chain", label: "Supply chain" },
  { id: "analytics", label: "Data analytics" },
  { id: "automation", label: "Automation" },
  { id: "forecasting", label: "Forecasting" },
];

export type ProjectResult = {
  value: string;
  label: string;
  kind: ResultKind;
  note?: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  oneLiner: string;
  tools: string[];
  tags: string[];
  challenge: string;
  objective: string;
  approach: { title: string; text: string }[];
  capabilities: string[];
  results: ProjectResult[];
  relevance: string;
  /** Card image: the project visual from the Experience reference (or the report itself). */
  thumbnail: { src: string; width: number; height: number };
  /** One-sentence card summary, as written for the "Real projects. Real results." cards. */
  cardSummary: string;
  cardTags: string[];
  categories: ProjectCategory[];
};

export const resultKindLabel: Record<ResultKind, string> = {
  delivered: "Built and delivered",
  model: "Model performance",
  simulated: "Simulated outcome",
  modelled: "Modelled outcome",
};

export const projects: Project[] = [
  {
    slug: "control-tower",
    index: "01",
    title: "AI Supply Chain Control Tower",
    shortTitle: "AI Control Tower",
    oneLiner:
      "Seven automated workflows that watch inventory, suppliers and logistics, and alert the right people when a KPI drifts.",
    tools: ["n8n", "JavaScript", "Google Sheets", "Power BI", "GitHub"],
    tags: ["Automation", "KPI monitoring", "Alerting"],
    challenge:
      "Supply chain signals usually live in separate places: stock levels in one file, supplier performance in another, transport status somewhere else. When they are compiled by hand, exceptions are often spotted after the moment to act has passed.",
    objective:
      "Bring inventory, supplier, procurement, warehouse, demand, logistics and executive reporting into one automated monitoring loop that calculates KPIs, flags exceptions and briefs people without manual compilation.",
    approach: [
      {
        title: "Seven workflows in n8n",
        text: "One workflow per domain: inventory, supplier risk, procurement, warehouse, demand, logistics and executive reporting, with the business logic written in JavaScript.",
      },
      {
        title: "Eight monitored KPIs",
        text: "Inventory turnover, DIO, days-to-stockout, reorder quantity, inventory value at risk, supplier risk score, demand forecast and transportation status.",
      },
      {
        title: "Dashboards and alerts",
        text: "Power BI dashboards for monitoring, plus automated email alerts when a KPI needs attention. Google Sheets holds the working data; the build is versioned on GitHub.",
      },
    ],
    capabilities: ["Workflow automation", "KPI design", "Exception alerting", "Executive reporting"],
    results: [
      { value: "7", label: "Workflows automated end to end", kind: "delivered" },
      {
        value: "8",
        label: "KPIs monitored in real time",
        kind: "delivered",
        note: "Surfaced in Power BI dashboards, with automated email alerts when a KPI needs attention.",
      },
    ],
    relevance:
      "The same pattern (clear KPI definitions, automated monitoring and alerts routed to owners) applies to any planning or procurement team that still compiles reports by hand.",
    thumbnail: { src: "/images/projects/thumb-control-tower.jpg", width: 300, height: 268 },
    cardSummary:
      "Automated 7 workflows (inventory, supplier risk, procurement, warehouse, demand, logistics, executive reporting) using n8n.",
    cardTags: ["n8n", "JavaScript", "Power BI", "Google Sheets"],
    categories: ["supply-chain", "automation", "analytics"],
  },
  {
    slug: "novexai",
    index: "02",
    title: "NovexAI: Predictive Logistics Control Tower",
    shortTitle: "NovexAI",
    oneLiner:
      "A Random Forest model that estimates which shipments are likely to arrive late, surfaced in a Power BI control tower.",
    tools: ["Python", "Pandas", "Scikit-learn", "Power BI"],
    tags: ["Machine learning", "Logistics", "Delay prediction"],
    challenge:
      "Late deliveries are usually discovered after the promised date has passed. Knowing earlier which shipments are at risk gives planners time to expedite, re-route or reset customer expectations.",
    objective:
      "Estimate delay risk for each shipment early enough to act on it, and show planners where intervention matters most.",
    approach: [
      {
        title: "Prepare the shipment history",
        text: "Cleaned and structured 10,000+ shipment records with Pandas to build the training dataset.",
      },
      {
        title: "Train a delay classifier",
        text: "Built a Random Forest delay-prediction model with Scikit-learn and evaluated it at 84% accuracy.",
      },
      {
        title: "Put predictions in front of planners",
        text: "Deployed a Power BI dashboard that brings delay risk into the control tower view, then simulated acting on flagged shipments.",
      },
    ],
    capabilities: ["Predictive analytics", "Feature preparation", "Model evaluation", "Operational dashboards"],
    results: [
      { value: "10,000+", label: "Shipment records modelled", kind: "delivered" },
      {
        value: "84%",
        label: "Model accuracy",
        kind: "model",
        note: "Classification accuracy of the delay model. It describes the model, not a business result.",
      },
      {
        value: "18%",
        label: "Fewer late deliveries",
        kind: "simulated",
        note: "Measured in a simulation of acting on the model's flags, not in live operations.",
      },
    ],
    relevance:
      "Moves logistics reporting from describing what happened to prioritizing what is likely to happen next.",
    thumbnail: { src: "/images/projects/thumb-novexai.jpg", width: 274, height: 268 },
    cardSummary:
      "Built a Random Forest delay prediction model on 10,000+ shipment records (84% accuracy), reducing simulated late deliveries by 18%.",
    cardTags: ["Python", "Pandas", "Scikit-learn", "Power BI"],
    categories: ["supply-chain", "analytics", "forecasting"],
  },
  {
    slug: "inventory-optimization",
    index: "03",
    title: "Inventory Optimization & Demand Forecasting Model",
    shortTitle: "Inventory model",
    oneLiner:
      "Forecast-driven EOQ, safety-stock and reorder-point policies, optimized with linear programming.",
    tools: ["Python (Pandas, NumPy)", "SQL", "Linear Programming", "Excel"],
    tags: ["Forecasting", "Inventory policy", "Optimization"],
    challenge:
      "Too much stock ties up working capital; too little costs sales and service. Getting the balance right depends on knowing how much to order, when to order and how much buffer to hold.",
    objective:
      "Set order quantities, safety stock and reorder points that minimize holding cost while protecting a 97.5% service level.",
    approach: [
      {
        title: "Forecast demand",
        text: "Time-series forecasting to estimate expected demand and its variability.",
      },
      {
        title: "Size the buffer",
        text: "Safety stock set from demand variability and lead time for a 97.5% service level.",
      },
      {
        title: "Set the ordering policy",
        text: "Economic order quantity and reorder points calculated from the forecast and cost parameters.",
      },
      {
        title: "Optimize within constraints",
        text: "Linear programming to balance the policy, compared against the baseline holding cost.",
      },
    ],
    capabilities: ["Demand forecasting", "Inventory optimization", "Linear programming", "Working capital thinking"],
    results: [
      {
        value: "22%",
        label: "Lower holding costs",
        kind: "modelled",
        note: "A modelled result from the optimization, not an independently verified business outcome.",
      },
      { value: "97.5%", label: "Service level protected", kind: "modelled" },
    ],
    relevance:
      "Directly connected to my MSc thesis on how inventory management efficiency affects working capital and firm performance.",
    thumbnail: { src: "/images/projects/thumb-inventory.jpg", width: 280, height: 268 },
    cardSummary:
      "Optimized EOQ, safety stock and reorder points via time-series forecasting, cutting modelled holding costs by 22% at a 97.5% service level.",
    cardTags: ["Python", "SQL", "Linear Programming", "Excel"],
    categories: ["supply-chain", "forecasting", "analytics"],
  },
  {
    slug: "supplier-risk",
    index: "04",
    title: "Supplier Performance & Risk Intelligence Center",
    shortTitle: "Supplier risk center",
    oneLiner:
      "A Power BI report that brings delivery reliability, invoice exceptions, spend exposure, procurement maturity and supplier risk into one decision-support view.",
    tools: ["Power BI"],
    tags: ["Supplier analytics", "Procurement", "Risk"],
    challenge:
      "Supplier performance is usually judged from separate reports: delivery delays in one place, invoice disputes in another, spend in a third. Without one view it is hard to see which suppliers combine high spend with high operational risk.",
    objective:
      "Give procurement one place to see which suppliers deliver late, where spend and savings sit, where invoice and payment governance breaks down, and how mature the supplier base is.",
    approach: [
      {
        title: "Four headline measures",
        text: "On-time delivery, invoice exceptions, high-risk spend and preferred-supplier share, each paired with the context behind it (average delay, disputed invoices, high-risk suppliers, managed spend).",
      },
      {
        title: "Questions, not just charts",
        text: "Each visual answers one question: which suppliers are late, which carry the most spend, how severe the delays are, and which create invoice and payment risk.",
      },
      {
        title: "Built to drill down",
        text: "Drill-through by status, tier, supplier and approver; switches for savings, maverick and problematic spend; five reporting currencies; and separate Overview, Suppliers and Compliance pages.",
      },
    ],
    capabilities: ["Supplier performance", "Spend analysis", "Invoice governance", "Report design"],
    results: [],
    relevance:
      "The questions this report answers are the ones behind my supplier analysis and vendor segmentation at ICodeTest and the supplier SLA tracking at Wipro.",
    thumbnail: { src: "/images/projects/thumb-supplier.jpg", width: 600, height: 361 },
    cardSummary:
      "A Power BI report that consolidates delivery reliability, invoice exceptions, spend exposure and supplier risk into one decision-support view.",
    cardTags: ["Power BI", "Supplier scorecards", "Spend analysis"],
    categories: ["supply-chain", "analytics"],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;
