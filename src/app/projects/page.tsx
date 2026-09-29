import type { Metadata } from "next";
import { ProjectsLanding } from "@/components/sections/projects/ProjectsLanding";
import { NextPage } from "@/components/layout/NextPage";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies in supply chain automation, predictive logistics and inventory optimization, with working demonstrations and clearly stated results.",
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <ProjectsLanding />
      <NextPage
        label="Case study 01"
        href="/projects/control-tower"
        description="Start with the AI Supply Chain Control Tower: seven automated workflows and eight monitored KPIs."
      />
    </main>
  );
}
