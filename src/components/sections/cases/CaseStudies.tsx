import Image from "next/image";
import { Brain } from "@phosphor-icons/react/dist/ssr/Brain";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { Database } from "@phosphor-icons/react/dist/ssr/Database";
import { Target } from "@phosphor-icons/react/dist/ssr/Target";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { projectBySlug } from "@/content/projects";
import { simulation } from "@/content/demo/novex";
import { ControlTowerDashboard } from "@/components/dashboards/ControlTowerDashboard";
import { NovexControlTower } from "@/components/dashboards/NovexControlTower";
import { InventoryLab } from "@/components/dashboards/InventoryLab";
import { InventoryAnalytics } from "@/components/dashboards/InventoryAnalytics";
import { BriefBlock, CaseLabel, CaseNav, ResultCard, ToolTags } from "./case-parts";

/* ---------------------------------------------------------------------------
   01  AI Supply Chain Control Tower: light, product-showcase layout
   ------------------------------------------------------------------------- */
export function CaseControlTower() {
  const p = projectBySlug["control-tower"];
  return (
    <article
      id="case-control-tower"
      aria-labelledby="case-control-tower-title"
      data-header-theme="light"
      className="relative bg-white"
    >
      <div className="shell section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <CaseLabel project={p} />
            <h1 id="case-control-tower-title" data-section-heading className="type-title balance mt-5 text-ink" data-reveal style={{ ["--d" as string]: "80ms" }}>
              {p.title}
            </h1>
            <p className="type-lead pretty mt-5 max-w-[40rem] text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
              {p.oneLiner}
            </p>
          </div>
          <aside className="grid content-start gap-6 lg:col-span-4 lg:col-start-9 lg:pt-12" aria-label="Project facts">
            <div data-reveal style={{ ["--d" as string]: "200ms" }}>
              <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Built with</p>
              <ToolTags tools={p.tools} label="Tools" />
            </div>
            <div data-reveal style={{ ["--d" as string]: "260ms" }}>
              <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Capabilities shown</p>
              <p className="text-[0.95rem] leading-relaxed text-ink-2">{p.capabilities.join(", ")}.</p>
            </div>
          </aside>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-10 lg:col-span-5">
            <BriefBlock title="The problem">{p.challenge}</BriefBlock>
            <BriefBlock title="The objective" delay={80}>
              {p.objective}
            </BriefBlock>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted" data-reveal>
              The approach
            </h2>
            <ol className="mt-3 grid gap-5">
              {p.approach.map((a, i) => (
                <li key={a.title} className="grid grid-cols-[2.25rem_1fr] gap-4" data-reveal style={{ ["--d" as string]: `${120 + i * 90}ms` }}>
                  <span className="num grid size-9 place-items-center rounded-full border border-line text-[0.78rem] font-semibold text-navy">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[1.02rem] font-semibold text-ink">{a.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16" data-reveal="rise">
          <ControlTowerDashboard />
          <p className="mt-3 text-[0.8rem] text-muted">
            Rebuilt as a working interface to show how the workflows, KPIs and alerts fit together. Figures, supplier
            names and alert texts are demonstration data, not results from the project.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {p.results.map((r, i) => (
              <ResultCard key={r.label} result={r} delay={i * 90} />
            ))}
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2" data-reveal style={{ ["--d" as string]: "240ms" }}>
            <BriefBlock title="Why it matters">{p.relevance}</BriefBlock>
          </div>
        </div>

        <CaseNav next={{ href: "/projects/novexai", label: projectBySlug.novexai.shortTitle }} />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   02  NovexAI: dark "control room" split layout with a sticky narrative
   ------------------------------------------------------------------------- */
export function CaseNovex() {
  const p = projectBySlug.novexai;
  const [records, accuracy, simulated] = p.results;
  return (
    <article
      id="case-novexai"
      aria-labelledby="case-novexai-title"
      data-header-theme="light"
      className="relative overflow-hidden bg-white text-ink"
    >
      <div className="shell section-pad relative">
        <div className="max-w-[54rem]">
          <CaseLabel project={p} />
          <h1 id="case-novexai-title" data-section-heading className="type-title balance mt-5 text-ink" data-reveal style={{ ["--d" as string]: "80ms" }}>
            {p.title}
          </h1>
          <p className="type-lead pretty mt-5 text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
            {p.oneLiner}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="grid gap-9 lg:sticky lg:top-24">
              <BriefBlock title="The problem">{p.challenge}</BriefBlock>
              <BriefBlock title="The objective" delay={80}>
                {p.objective}
              </BriefBlock>
              <div data-reveal style={{ ["--d" as string]: "140ms" }}>
                <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">The approach</h2>
                <ol className="mt-4 grid gap-4">
                  {p.approach.map((a, i) => {
                    const Icon = [Database, Brain, Target][i];
                    return (
                      <li key={a.title} className="grid grid-cols-[2.25rem_1fr] gap-3.5">
                        <span className="grid size-9 place-items-center rounded-full border border-line text-navy">
                          <Icon size={17} weight="light" aria-hidden />
                        </span>
                        <div>
                          <p className="text-[0.98rem] font-semibold text-ink">{a.title}</p>
                          <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-2">{a.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div data-reveal style={{ ["--d" as string]: "200ms" }}>
                <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Built with</p>
                <ToolTags tools={p.tools} label="Tools" />
              </div>
            </div>
          </div>

          <div className="grid content-start gap-6 lg:col-span-8">
            <div data-reveal="rise">
              <NovexControlTower />
              <p className="mt-3 text-[0.8rem] text-muted">
                A working reconstruction of the control-tower pattern the model feeds. Shipments, lanes and
                probabilities are demonstration data.
              </p>
            </div>

            {/* what the numbers claim, stated precisely */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4">
                <ResultCard result={records} />
                <ResultCard result={accuracy} delay={80} />
              </div>
              <div className="flex flex-col rounded-[16px] border border-line bg-white p-5" data-reveal style={{ ["--d" as string]: "160ms" }}>
                <span className="self-start rounded-full bg-[#fff3dd] px-2.5 py-1 text-[0.7rem] font-semibold text-[#8a5a00]">
                  Simulated outcome
                </span>
                <p className="mt-4 text-[2.4rem] font-[660] leading-none tracking-[-0.045em] text-navy">{simulated.value}</p>
                <p className="mt-2 text-[0.95rem] font-medium text-ink">{simulated.label}</p>
                <figure className="mt-5">
                  <figcaption className="sr-only">
                    Late deliveries in simulation, indexed: baseline {simulation.baseline}, acting on the model&apos;s flags {simulation.withModel}.
                  </figcaption>
                  {[
                    { label: "Baseline", value: simulation.baseline, color: "#c7d3e3" },
                    { label: "Acting on model flags", value: simulation.withModel, color: "#145fe5" },
                  ].map((b) => (
                    <div key={b.label} className="mt-3" aria-hidden>
                      <div className="flex justify-between text-[0.78rem] text-ink-2">
                        <span>{b.label}</span>
                        <span className="num font-semibold text-ink">{b.value}</span>
                      </div>
                      <div className="mt-1.5 h-2.5">
                        <div className="h-full rounded-r-[4px]" style={{ width: `${b.value}%`, background: b.color }} />
                      </div>
                    </div>
                  ))}
                  <p className="mt-3 text-[0.74rem] text-muted">Late deliveries, indexed to the simulated baseline (= 100)</p>
                </figure>
                <p className="mt-4 border-t border-line pt-3 text-[0.8rem] leading-relaxed text-muted">{simulated.note}</p>
              </div>
            </div>

            <div data-reveal>
              <BriefBlock title="Why it matters">{p.relevance}</BriefBlock>
            </div>
          </div>
        </div>

        <CaseNav
          prev={{ href: "/projects/control-tower", label: projectBySlug["control-tower"].shortTitle }}
          next={{ href: "/projects/inventory-optimization", label: projectBySlug["inventory-optimization"].shortTitle }}
        />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   03  Inventory optimization: interactive lab layout
   ------------------------------------------------------------------------- */
export function CaseInventory() {
  const p = projectBySlug["inventory-optimization"];
  const [holding, service] = p.results;
  return (
    <article
      id="case-inventory-optimization"
      aria-labelledby="case-inventory-title"
      data-header-theme="light"
      className="relative bg-white"
    >
      <div className="shell section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <CaseLabel project={p} />
            <h1 id="case-inventory-title" data-section-heading className="type-title balance mt-5 text-ink" data-reveal style={{ ["--d" as string]: "80ms" }}>
              {p.title}
            </h1>
            <p className="type-lead pretty mt-5 max-w-[40rem] text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
              {p.oneLiner}
            </p>
            <div className="mt-8" data-reveal style={{ ["--d" as string]: "220ms" }}>
              <ToolTags tools={p.tools} label="Tools" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:pt-10">
            <ResultCard result={holding} delay={120} />
            <ResultCard result={service} delay={200} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-8 lg:col-span-4">
            <BriefBlock title="The problem">{p.challenge}</BriefBlock>
            <BriefBlock title="The objective" delay={80}>
              {p.objective}
            </BriefBlock>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted" data-reveal>
              The approach, step by step
            </h2>
            <ol className="mt-5 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
              {p.approach.map((a, i) => (
                // the white cell stays put (its 1px gaps are the dividers); only its content fades in
                <li key={a.title} className="bg-white p-5">
                  <div data-reveal style={{ ["--d" as string]: `${100 + i * 90}ms` }}>
                    <span className="num text-[0.8rem] font-semibold text-blue">Step {i + 1}</span>
                    <p className="mt-2 text-[1rem] font-semibold text-ink">{a.title}</p>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16" data-reveal="rise">
          <h2 className="mb-2 text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">Try the trade-offs</h2>
          <p className="mb-5 max-w-[46rem] text-[0.95rem] leading-relaxed text-ink-2">
            The same logic the model uses, with example numbers: change demand, costs, lead time or service level and
            watch the order quantity, safety stock and reorder point respond.
          </p>
          <InventoryLab />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">Where the policy is monitored</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
              An inventory policy only holds if stock, value and flow are watched together. This representative view
              shows the signals that confirm it is working: stock by site, value by product group, and whether
              purchasing is running ahead of or behind sales.
            </p>
            <div className="mt-8 flex gap-3 rounded-[16px] border border-line bg-white p-5">
              <GraduationCap size={24} weight="light" className="shrink-0 text-blue" aria-hidden />
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">Why it matters</p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-2">{p.relevance}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8" data-reveal="rise">
            <InventoryAnalytics />
          </div>
        </div>

        <CaseNav
          prev={{ href: "/projects/novexai", label: projectBySlug.novexai.shortTitle }}
          next={{ href: "/projects/supplier-risk", label: projectBySlug["supplier-risk"].shortTitle }}
        />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   04  Supplier Performance & Risk Intelligence Center: the Power BI report itself
   ------------------------------------------------------------------------- */
const supplierVisuals = [
  {
    title: "Headline measures",
    question: "How reliable, exposed and mature is the supplier base right now?",
    detail: "On-time delivery, invoice exceptions, high-risk spend and preferred-supplier share, each with its context.",
  },
  {
    title: "Average days late by supplier",
    question: "Which suppliers create operational procurement risk?",
    detail: "Ranked bars with a drill-through by delivery status.",
  },
  {
    title: "Spend versus savings efficiency",
    question: "Which suppliers are associated with the highest spend?",
    detail: "Total spend against savings, coloured by delay class, with switches for savings, maverick and problematic spend.",
  },
  {
    title: "Delivery delay severity",
    question: "How severe are operational supplier delays?",
    detail: "Distribution from on time to extreme delays, with a drill-through by tier and supplier.",
  },
  {
    title: "Segment and procurement maturity",
    question: "How much spend is managed, strategic or high risk?",
    detail: "Spend split by supplier segment, with a drill-through by tier and name.",
  },
  {
    title: "Invoice and payment governance",
    question: "Which suppliers create invoice and payment-processing risk?",
    detail: "Exceptions by supplier, with a drill-through by approver.",
  },
];

export function CaseSupplier() {
  const p = projectBySlug["supplier-risk"];
  return (
    <article id="case-supplier-risk" aria-labelledby="case-supplier-title" data-header-theme="light" className="relative bg-white">
      <div className="shell section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <CaseLabel project={p} />
            <h1 id="case-supplier-title" data-section-heading className="type-title balance mt-5 text-ink" data-reveal style={{ ["--d" as string]: "80ms" }}>
              {p.title}
            </h1>
            <p className="type-lead pretty mt-5 max-w-[40rem] text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
              {p.oneLiner}
            </p>
          </div>
          <aside className="grid content-start gap-6 lg:col-span-4 lg:col-start-9 lg:pt-12" aria-label="Project facts">
            <div data-reveal style={{ ["--d" as string]: "200ms" }}>
              <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Built with</p>
              <ToolTags tools={p.tools} label="Tools" />
            </div>
            <div data-reveal style={{ ["--d" as string]: "280ms" }}>
              <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Capabilities shown</p>
              <p className="text-[0.95rem] leading-relaxed text-ink-2">{p.capabilities.join(", ")}.</p>
            </div>
          </aside>
        </div>

        {/* the report itself */}
        <figure className="mt-14" data-reveal="rise" style={{ ["--d" as string]: "240ms" }}>
          <div className="overflow-hidden rounded-[18px] border border-line bg-[#252423] shadow-[var(--shadow-float)]">
            <Image
              src="/images/projects/supplier-dashboard.jpg"
              alt="Power BI report titled Supplier Performance and Risk Intelligence Center. Four headline cards show on-time delivery 64.13%, invoice exceptions 45.12%, high-risk spend 6.57% and preferred suppliers 33.33%. Charts show average days late by supplier, supplier spend against savings, delivery delay severity, spend by supplier segment and invoice governance risk by supplier."
              width={2358}
              height={1328}
              sizes="(min-width: 1408px) 1312px, 94vw"
              quality={90}
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 text-[0.8rem] text-muted">
            <span>Suppliers page of the report. Supplier names and figures are sample data.</span>
            <a
              href="/images/projects/supplier-dashboard.jpg"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-blue hover:text-blue-700"
            >
              Open full size
              <ArrowSquareOut size={15} aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-10 lg:col-span-5">
            <BriefBlock title="The problem">{p.challenge}</BriefBlock>
            <BriefBlock title="The objective" delay={80}>
              {p.objective}
            </BriefBlock>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted" data-reveal>
              How the report is built
            </h2>
            <ol className="mt-3 grid gap-5">
              {p.approach.map((a, i) => (
                <li key={a.title} className="grid grid-cols-[2.25rem_1fr] gap-4" data-reveal style={{ ["--d" as string]: `${120 + i * 80}ms` }}>
                  <span className="num grid size-9 place-items-center rounded-full border border-line text-[0.78rem] font-semibold text-navy">{i + 1}</span>
                  <div>
                    <p className="text-[1.02rem] font-semibold text-ink">{a.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink" data-reveal>
            What each view answers
          </h2>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {supplierVisuals.map((sv, i) => (
              <li key={sv.title} className="bg-white p-5">
                <div data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <p className="text-[1rem] font-semibold text-ink">{sv.title}</p>
                  <p className="mt-2 text-[0.92rem] font-medium leading-snug text-blue">{sv.question}</p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-2">{sv.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="rounded-[16px] border border-line bg-mist p-5 lg:col-span-7" data-reveal>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">Results</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
              A reporting build: it makes supplier performance visible and explorable, so no outcome figures are claimed for it.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2" data-reveal style={{ ["--d" as string]: "120ms" }}>
            <BriefBlock title="Why it matters">{p.relevance}</BriefBlock>
          </div>
        </div>

        <CaseNav prev={{ href: "/projects/inventory-optimization", label: projectBySlug["inventory-optimization"].shortTitle }} />
      </div>
    </article>
  );
}

/** Case study page bodies, keyed by project slug. */
export const caseStudyBySlug = {
  "control-tower": CaseControlTower,
  novexai: CaseNovex,
  "inventory-optimization": CaseInventory,
  "supplier-risk": CaseSupplier,
} as const;

