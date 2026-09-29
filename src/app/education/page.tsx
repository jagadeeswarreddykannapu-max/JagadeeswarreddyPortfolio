import type { Metadata } from "next";
import { EducationSection } from "@/components/sections/education/EducationSection";
import { NextPage } from "@/components/layout/NextPage";

export const metadata: Metadata = {
  title: "Education",
  description:
    "MSc Purchasing & Supply Chain Management (DESSMO), MBS School of Business, 2024 to 2026, and a Bachelor of Commerce in Computer Applications.",
};

export default function EducationPage() {
  return (
    <main id="main">
      <EducationSection />
      <NextPage label="Contact" href="/contact" description="Email, phone, LinkedIn, or send a message directly." />
    </main>
  );
}
