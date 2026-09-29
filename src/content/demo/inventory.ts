/**
 * DEMONSTRATION DATA for the inventory views.
 * The policy lab uses textbook formulas with example parameters so visitors can see
 * how EOQ, safety stock and reorder points respond. The analytics view is a
 * representative interface. Neither shows the project's own data; the project's
 * modelled result (22% lower holding cost at a 97.5% service level) is stated separately.
 */

export const labDefaults = {
  annualDemand: 12000, // units per year
  orderCost: 85, // EUR per order
  unitCost: 24, // EUR per unit
  holdingRate: 22, // % of unit cost per year
  leadTime: 10, // days
  demandSd: 12, // daily demand standard deviation, units
  serviceLevel: 97.5, // %
} as const;

export type LabParams = { -readonly [K in keyof typeof labDefaults]: number };

export const warehouses = [
  { label: "Lyon DC", value: 11900 },
  { label: "Marseille DC", value: 8460 },
  { label: "Toulouse DC", value: 6190 },
  { label: "Lille DC", value: 5280 },
  { label: "Nantes DC", value: 3970 },
];

export const productGroups = [
  { label: "Motors", value: 1980 },
  { label: "Bearings", value: 1240 },
  { label: "Fasteners", value: 860 },
  { label: "Seals & gaskets", value: 610 },
  { label: "Packaging", value: 290 },
];

export const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
export const salesUnits = [22400, 23900, 25800, 21900, 22600, 24700, 25900, 26800, 27900, 28300, 26600, 27150];
export const purchaseUnits = [26100, 21800, 23500, 27400, 20400, 22900, 28100, 24700, 25200, 30100, 23300, 24950];

export const inventoryTiles = [
  { label: "Stock on hand", value: "35,800 units" },
  { label: "Stock value", value: "€4.98M" },
  { label: "Sales, last 12 months", value: "303,950 units" },
  { label: "Average cover", value: "43 days" },
];
