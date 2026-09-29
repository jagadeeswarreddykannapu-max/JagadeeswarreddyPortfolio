import type { Metadata } from "next";
import { ExperienceHero } from "@/components/sections/experience/ExperienceHero";
import { ExperienceSection } from "@/components/sections/experience/ExperienceSection";
import { NextPage } from "@/components/layout/NextPage";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Associate Data Analyst at Wipro (2022 to 2024) and Business Analyst intern at ICodeTest (2025): supply chain KPIs, reporting automation and supplier analytics.",
};

export default function ExperiencePage() {
  return (
    <main id="main">
      <ExperienceHero />
      <ExperienceSection />
      <NextPage
        label="Projects"
        href="/projects"
        description="Four case studies: an AI control tower, a delay-prediction model, an inventory optimization model and a supplier risk report."
      />
    </main>
  );
}
