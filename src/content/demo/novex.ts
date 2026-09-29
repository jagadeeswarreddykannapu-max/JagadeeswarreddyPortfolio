/**
 * DEMONSTRATION DATA for the NovexAI predictive logistics view.
 * Shipments, lanes and probabilities are illustrative. The project facts (Random
 * Forest model, 10,000+ shipment records, 84% accuracy, 18% fewer late deliveries
 * in simulation) come from the CV and are shown separately, with their scope stated.
 */
import type { PortId } from "@/content/geo/world.generated";

export type Risk = "low" | "medium" | "high";

export type Shipment = {
  id: string;
  from: PortId;
  to: PortId;
  fromName: string;
  toName: string;
  progress: number; // 0..1 along the lane
  risk: Risk;
  probability: number; // modelled probability of arriving late
  delayDays: number; // predicted delay if late
  eta: string;
  promised: string;
  cargo: string;
  milestones: { label: string; planned: string; status: "done" | "current" | "next" | "at-risk" }[];
  action: string;
};

export const riskColor: Record<Risk, string> = {
  low: "#3e83f0",
  medium: "#c98500",
  high: "#e05252",
};

export const riskLabel: Record<Risk, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

const ms = (steps: [string, string, "done" | "current" | "next" | "at-risk"][]) =>
  steps.map(([label, planned, status]) => ({ label, planned, status }));

export const shipments: Shipment[] = [
  {
    id: "NVX-10421",
    from: "shanghai",
    to: "rotterdam",
    fromName: "Shanghai",
    toName: "Rotterdam",
    progress: 0.58,
    risk: "high",
    probability: 0.82,
    delayDays: 4,
    eta: "14 Oct",
    promised: "10 Oct",
    cargo: "Electronic components, 2 x 40ft",
    milestones: ms([
      ["Booked", "12 Sep", "done"],
      ["Departed Shanghai", "15 Sep", "done"],
      ["Transshipment, Singapore", "22 Sep", "done"],
      ["Suez transit", "01 Oct", "at-risk"],
      ["Arrival Rotterdam", "10 Oct", "next"],
      ["Delivered", "12 Oct", "next"],
    ]),
    action: "Expedite customs pre-clearance and warn the customer of a likely 4-day delay.",
  },
  {
    id: "NVX-10388",
    from: "nhavaSheva",
    to: "leHavre",
    fromName: "Nhava Sheva",
    toName: "Le Havre",
    progress: 0.4,
    risk: "medium",
    probability: 0.47,
    delayDays: 2,
    eta: "09 Oct",
    promised: "07 Oct",
    cargo: "Textile rolls, 1 x 40ft",
    milestones: ms([
      ["Booked", "15 Sep", "done"],
      ["Departed Nhava Sheva", "19 Sep", "done"],
      ["Red Sea routing", "27 Sep", "current"],
      ["Arrival Le Havre", "07 Oct", "next"],
      ["Delivered", "09 Oct", "next"],
    ]),
    action: "Monitor the Red Sea leg; re-check the forecast after the next port call.",
  },
  {
    id: "NVX-10456",
    from: "busan",
    to: "losAngeles",
    fromName: "Busan",
    toName: "Los Angeles",
    progress: 0.72,
    risk: "low",
    probability: 0.11,
    delayDays: 0,
    eta: "03 Oct",
    promised: "04 Oct",
    cargo: "Automotive parts, 3 x 40ft",
    milestones: ms([
      ["Booked", "10 Sep", "done"],
      ["Departed Busan", "18 Sep", "done"],
      ["Mid-Pacific", "25 Sep", "current"],
      ["Arrival Los Angeles", "03 Oct", "next"],
      ["Delivered", "04 Oct", "next"],
    ]),
    action: "No action needed.",
  },
  {
    id: "NVX-10402",
    from: "santos",
    to: "rotterdam",
    fromName: "Santos",
    toName: "Rotterdam",
    progress: 0.3,
    risk: "medium",
    probability: 0.39,
    delayDays: 2,
    eta: "18 Oct",
    promised: "16 Oct",
    cargo: "Coffee, 4 x 20ft",
    milestones: ms([
      ["Booked", "20 Sep", "done"],
      ["Departed Santos", "24 Sep", "done"],
      ["Atlantic crossing", "30 Sep", "current"],
      ["Arrival Rotterdam", "16 Oct", "next"],
    ]),
    action: "Hold a berth window with the terminal; re-evaluate in 48 hours.",
  },
  {
    id: "NVX-10477",
    from: "singapore",
    to: "hamburg",
    fromName: "Singapore",
    toName: "Hamburg",
    progress: 0.66,
    risk: "high",
    probability: 0.74,
    delayDays: 5,
    eta: "20 Oct",
    promised: "15 Oct",
    cargo: "Machinery spares, 1 x 40ft HC",
    milestones: ms([
      ["Booked", "08 Sep", "done"],
      ["Departed Singapore", "14 Sep", "done"],
      ["Cape of Good Hope routing", "28 Sep", "at-risk"],
      ["Arrival Hamburg", "15 Oct", "next"],
      ["Delivered", "17 Oct", "next"],
    ]),
    action: "Split the order: air-freight the critical spares and notify the customer.",
  },
  {
    id: "NVX-10415",
    from: "jebelAli",
    to: "fos",
    fromName: "Jebel Ali",
    toName: "Fos-sur-Mer",
    progress: 0.52,
    risk: "low",
    probability: 0.16,
    delayDays: 0,
    eta: "06 Oct",
    promised: "06 Oct",
    cargo: "Polymers, 2 x 20ft",
    milestones: ms([
      ["Booked", "18 Sep", "done"],
      ["Departed Jebel Ali", "22 Sep", "done"],
      ["Mediterranean", "01 Oct", "current"],
      ["Arrival Fos-sur-Mer", "06 Oct", "next"],
    ]),
    action: "No action needed.",
  },
  {
    id: "NVX-10433",
    from: "shanghai",
    to: "losAngeles",
    fromName: "Shanghai",
    toName: "Los Angeles",
    progress: 0.84,
    risk: "low",
    probability: 0.09,
    delayDays: 0,
    eta: "02 Oct",
    promised: "03 Oct",
    cargo: "Consumer electronics, 5 x 40ft",
    milestones: ms([
      ["Booked", "05 Sep", "done"],
      ["Departed Shanghai", "16 Sep", "done"],
      ["Arrival Los Angeles", "02 Oct", "current"],
      ["Delivered", "03 Oct", "next"],
    ]),
    action: "No action needed.",
  },
  {
    id: "NVX-10461",
    from: "durban",
    to: "rotterdam",
    fromName: "Durban",
    toName: "Rotterdam",
    progress: 0.46,
    risk: "medium",
    probability: 0.52,
    delayDays: 3,
    eta: "17 Oct",
    promised: "14 Oct",
    cargo: "Citrus, 6 x 40ft reefer",
    milestones: ms([
      ["Booked", "16 Sep", "done"],
      ["Departed Durban", "21 Sep", "done"],
      ["West Africa coast", "30 Sep", "at-risk"],
      ["Arrival Rotterdam", "14 Oct", "next"],
    ]),
    action: "Confirm reefer plug availability on arrival; update the customer ETA.",
  },
  {
    id: "NVX-10449",
    from: "sydney",
    to: "singapore",
    fromName: "Sydney",
    toName: "Singapore",
    progress: 0.62,
    risk: "low",
    probability: 0.14,
    delayDays: 0,
    eta: "01 Oct",
    promised: "02 Oct",
    cargo: "Dairy, 2 x 20ft reefer",
    milestones: ms([
      ["Booked", "19 Sep", "done"],
      ["Departed Sydney", "23 Sep", "done"],
      ["Arrival Singapore", "01 Oct", "current"],
    ]),
    action: "No action needed.",
  },
  {
    id: "NVX-10470",
    from: "newYork",
    to: "leHavre",
    fromName: "New York",
    toName: "Le Havre",
    progress: 0.35,
    risk: "low",
    probability: 0.2,
    delayDays: 0,
    eta: "08 Oct",
    promised: "08 Oct",
    cargo: "Medical devices, 1 x 20ft",
    milestones: ms([
      ["Booked", "22 Sep", "done"],
      ["Departed New York", "26 Sep", "done"],
      ["North Atlantic", "01 Oct", "current"],
      ["Arrival Le Havre", "08 Oct", "next"],
    ]),
    action: "No action needed.",
  },
];

export const novexSummary = [
  { label: "Active shipments", value: "1,284" },
  { label: "Predicted late", value: "96", note: "7.5% of active" },
  { label: "High-risk lanes", value: "3" },
  { label: "Exceptions to review", value: "12" },
];

/**
 * The CV reports one aggregate: late deliveries 18% lower in simulation.
 * Shown as an index (baseline = 100) so no absolute rates are invented.
 */
export const simulation = { baseline: 100, withModel: 82 } as const;
