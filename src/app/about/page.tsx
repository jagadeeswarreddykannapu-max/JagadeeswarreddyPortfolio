import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { WhyChooseMe } from "@/components/sections/about/WhyChooseMe";
import { NextPage } from "@/components/layout/NextPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Supply chain analyst connecting demand planning, procurement, inventory, logistics and reporting with data and automation.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutSection />
      <WhyChooseMe />
      <NextPage
        label="Experience"
        href="/experience"
        description="Wipro and ICodeTest: the reporting pipeline I automated, supplier analytics, and the numbers behind them."
      />
    </main>
  );
}
