/** Certifications and languages exactly as listed in the CV (no dates or credential IDs are given). */

export const certifications = [
  { title: "Microsoft Certified: Power Platform Fundamentals", code: "PL-900", issuer: "Microsoft" },
  { title: "Microsoft Data Analysis with SQL, Excel & Power BI Specialization", issuer: "Microsoft" },
  { title: "Unilever Supply Chain Data Analyst Professional Certificate", issuer: "Unilever" },
] as const;

export const languages = [
  { name: "English", level: "C2", note: "Proficient" },
  { name: "French", level: "A2", note: "In active study" },
] as const;
