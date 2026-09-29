/**
 * Identity, contact details and navigation.
 * Source of truth: "Jagadeeswar Reddy___CV.pdf" (contact + title) and the portfolio briefs
 * (location "Montpellier, France", menu structure).
 */

export const site = {
  name: "Jagadeeswar Reddy",
  firstName: "Jagadeeswar",
  role: "Supply Chain Analyst",
  specialism: "Demand Planning & Inventory Optimization",
  location: "Montpellier, France",
  email: "jagadeeswarreddykannapu@gmail.com",
  phone: {
    display: "+33 7 48 52 04 90",
    href: "tel:+33748520490",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/jagadeeswar-kannam/",
    handle: "in/jagadeeswar-kannam",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Jagadeeswar Reddy is a supply chain analyst focused on demand planning, inventory optimization, analytics and automation. MSc in Purchasing & Supply Chain Management, Montpellier Business School.",
} as const;

/** The single, approved résumé. Replace the file in /public/resume to update it. */
export const resume = {
  href: "/resume/Jagadeeswar-Reddy-Supply-Chain-Analyst-CV.pdf",
  fileName: "Jagadeeswar-Reddy-Supply-Chain-Analyst-CV.pdf",
  format: "PDF",
  pages: 1,
  size: "555 KB",
  updated: "Sep 2026",
  thumbnail: "/images/ui/cv-page.jpg",
} as const;

export type MenuPreviewKind = "about" | "projects" | "skills" | "education" | "contact" | "resume";

export type MenuItem = {
  index: string;
  label: string;
  href: string;
  preview: MenuPreviewKind;
  /** When set, the row downloads this file (and still opens its page). */
  download?: string;
};

/** Full-screen menu destinations (from the brief), each opening its own page. */
export const menuItems: MenuItem[] = [
  { index: "01", label: "About Me", href: "/about", preview: "about" },
  { index: "02", label: "Projects", href: "/projects", preview: "projects" },
  { index: "03", label: "Skills", href: "/skills", preview: "skills" },
  { index: "04", label: "Education", href: "/education", preview: "education" },
  { index: "05", label: "Contact", href: "/contact", preview: "contact" },
  { index: "06", label: "Download Resume", href: "/resume", preview: "resume", download: resume.href },
];

/** Page navigation in the header bar, in reading order. */
export const pageLinks = [
  { label: "About", href: "/about", description: "Who I am and where I contribute along the supply chain." },
  { label: "Experience", href: "/experience", description: "Wipro and ICodeTest: roles, results and the numbers behind them." },
  { label: "Projects", href: "/projects", description: "Four case studies in automation, prediction, optimization and supplier risk." },
  { label: "Skills", href: "/skills", description: "Capabilities, tools and certifications, each tied to real use." },
  { label: "Education", href: "/education", description: "MSc in Purchasing & Supply Chain Management, and a B.Com." },
  { label: "Contact", href: "/contact", description: "Email, phone, LinkedIn or a message." },
] as const;

/** Secondary destinations shown in the menu's top bar. */
export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Case studies", href: "/projects#case-studies" },
  { label: "Certifications", href: "/skills#credentials" },
] as const;
