import type { Metadata } from "next";
import { ResumeSection } from "@/components/sections/resume/ResumeSection";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download the resume of Jagadeeswar Reddy, Supply Chain Analyst (PDF, 1 page).",
};

export default function ResumePage() {
  return (
    <main id="main">
      <ResumeSection />
    </main>
  );
}
