/** Education, from the CV. The MSc is listed as completed in the CV's professional summary. */

export type Qualification = {
  id: string;
  degree: string;
  school: string;
  schoolNote?: string;
  location: string;
  start: string;
  end: string;
  status?: string;
  accreditation?: string[];
  modules?: string[];
  thesis?: string;
};

export const qualifications: Qualification[] = [
  {
    id: "msc",
    degree: "MSc Purchasing & Supply Chain Management (DESSMO)",
    school: "MBS School of Business",
    schoolNote: "Montpellier Business School",
    location: "Montpellier, France",
    start: "2024",
    end: "2026",
    status: "Completed",
    accreditation: ["AACSB", "EQUIS"],
    modules: [
      "Strategic Sourcing",
      "Demand Planning",
      "Inventory Management",
      "Logistics & Distribution",
      "Financial Analysis",
      "S&OP",
    ],
    thesis: "The Impact of Inventory Management Efficiency on Working Capital and Firm Performance",
  },
  {
    id: "bcom",
    degree: "Bachelor of Commerce in Computer Applications",
    school: "Tapasya Degree College",
    location: "Hyderabad, India",
    start: "2018",
    end: "2022",
  },
];

export const educationCopy = {
  intro:
    "Building a strong foundation in global supply chain strategies, procurement and sustainable operations at one of Europe's leading business schools.",
  narrative:
    "My academic journey combines business fundamentals with a focused understanding of purchasing and supply chain management. Through coursework in sourcing, demand planning, inventory and logistics, I developed a practical perspective on how decisions across the supply chain affect service, cost and working capital.",
} as const;

/** The four notes around the campus photograph (wording from the Education reference). */
export type CampusCallout = {
  id: "program" | "accreditation" | "location" | "community";
  label: string;
  title: string;
  text: string;
  side: "left" | "right";
};

export const campusCallouts: CampusCallout[] = [
  {
    id: "program",
    label: "Program",
    title: "MSc Purchasing & Supply Chain Management",
    text: "A comprehensive program focused on strategic sourcing, logistics, demand planning and supply chain innovation.",
    side: "left",
  },
  {
    id: "accreditation",
    label: "Accreditation",
    title: "AACSB & EQUIS",
    text: "Part of the top 1% of business schools worldwide.",
    side: "left",
  },
  {
    id: "location",
    label: "Location",
    title: "Montpellier, France",
    text: "A vibrant and international city, known for innovation, education and a strong business ecosystem.",
    side: "right",
  },
  {
    id: "community",
    label: "Global environment",
    title: "International community",
    text: "Learn and collaborate with a diverse and global network of students and professionals.",
    side: "right",
  },
];

export const campusPhoto = {
  src: "/images/education/mbs-campus.webp",
  width: 1612,
  height: 852,
  alt: "The MBS School of Business building in Montpellier: a white and glass facade under a large blue MBS banner, framed by trees.",
  thumbnail: "/images/education/mbs-thumb.jpg",
} as const;
