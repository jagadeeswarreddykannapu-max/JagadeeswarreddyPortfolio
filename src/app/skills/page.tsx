import type { Metadata } from "next";
import { SkillsLandscape } from "@/components/sections/skills/SkillsLandscape";
import { CapabilitySection } from "@/components/sections/capabilities/CapabilitySection";
import { CredentialsSection } from "@/components/sections/credentials/CredentialsSection";
import { NextPage } from "@/components/layout/NextPage";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Supply chain and operations, analytics and BI, procurement, automation, and predictive modelling: tools, methods and where each was used.",
};

export default function SkillsPage() {
  return (
    <main id="main">
      <SkillsLandscape />
      <CapabilitySection />
      <CredentialsSection />
      <NextPage
        label="Education"
        href="/education"
        description="MSc in Purchasing & Supply Chain Management at Montpellier Business School, and a Bachelor of Commerce."
      />
    </main>
  );
}
