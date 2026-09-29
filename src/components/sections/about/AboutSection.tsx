import Image from "next/image";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { Handshake } from "@phosphor-icons/react/dist/ssr/Handshake";
import { Package } from "@phosphor-icons/react/dist/ssr/Package";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { PresentationChart } from "@phosphor-icons/react/dist/ssr/PresentationChart";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { aboutCopy, domains, portraits, type Domain } from "@/content/about";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import styles from "./about.module.css";

const icons = {
  plan: ChartLineUp,
  source: Handshake,
  stock: Package,
  move: Truck,
  measure: PresentationChart,
} as const;

/** callouts on the right half of the stage read right-to-left toward their portrait */
const endAligned = new Set(["source", "plan"]);

const byId = Object.fromEntries(domains.map((d) => [d.id, d])) as Record<string, Domain>;

function Callout({ domain, delay }: { domain: Domain; delay: number }) {
  const Icon = icons[domain.id as keyof typeof icons];
  const end = endAligned.has(domain.id);
  // measure sits right of the centre portrait, so its leader points left
  const leaderPointsLeft = end || domain.id === "measure";
  return (
    <div
      className={cn(styles.callout, styles[`c-${domain.id}`], end && styles.calloutEnd)}
      data-reveal={end ? "right" : "left"}
      style={{ ["--d" as string]: `${delay}ms`, ["--dur" as string]: "450ms", ["--rx" as string]: end ? "16px" : "-16px" }}
    >
      <span className={styles.iconWrap}>
        <span className={styles.icon}>
          <Icon size={20} weight="light" aria-hidden />
        </span>
        <span
          aria-hidden
          data-reveal="draw-x"
          style={{ ["--d" as string]: `${delay + 220}ms` }}
          className={cn(styles.leader, leaderPointsLeft ? styles.leaderLeft : styles.leaderRight)}
        />
      </span>
      <div>
        <p className={styles.stageWord}>{domain.stage}</p>
        <h2 className={styles.calloutTitle}>{domain.title}</h2>
        <ul className={styles.points}>
          {domain.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Figure({
  id,
  domainId,
  className,
  delay,
  sizes,
}: {
  id: keyof typeof portraits;
  domainId: string;
  className?: string;
  delay: number;
  sizes: string;
}) {
  const p = portraits[id];
  return (
    <figure
      className={cn(styles.figure, styles[`fig-${domainId}`], className)}
      style={{ aspectRatio: `${p.width} / ${p.height}`, ["--d" as string]: `${delay}ms`, ["--ry" as string]: "16px", ["--dur" as string]: "650ms" }}
      data-reveal="rise"
    >
      <Image src={p.src} alt={p.alt} fill sizes={sizes} quality={85} className="object-contain object-bottom" />
    </figure>
  );
}

export function AboutSection() {
  const sideUnits = ["plan", "source", "stock", "move"] as const;
  const figureDelay: Record<string, number> = { stock: 520, source: 610, measure: 440, move: 700, plan: 790 };

  return (
    <section
      id="about"
     
      data-header-theme="light"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-white"
    >

      <div className={styles.stage}>
        <div className={styles.topRow}>
          <p className={styles.labels} data-reveal style={{ ["--d" as string]: "120ms", ["--ry" as string]: "8px", ["--dur" as string]: "400ms" }}>
            Supply chain analyst
            <br />
            Data driven
            <br />
            Global perspective
          </p>
          <ol className={styles.chain} aria-label="Links of the supply chain" data-reveal style={{ ["--d" as string]: "160ms", ["--ry" as string]: "8px", ["--dur" as string]: "400ms" }}>
            {domains.map((d) => (
              <li key={d.id}>{d.stage}</li>
            ))}
          </ol>
          <p className={cn(styles.labels, styles.labelsRight)} data-reveal style={{ ["--d" as string]: "200ms", ["--ry" as string]: "8px", ["--dur" as string]: "400ms" }}>
            People
            <br />
            Process
            <br />
            Technology
          </p>
        </div>

        <div className={styles.headlineWrap}>
          <h1
            id="about-title"
            data-section-heading
            className={cn("reveal-lines", styles.headline)}
            data-reveal
            style={{ ["--ly" as string]: "22px", ["--ldur" as string]: "700ms" }}
          >
            <span className="line">
              <span style={{ ["--i" as string]: 0, ["--d" as string]: "260ms" }}>{aboutCopy.headline[0]}</span>
            </span>
            <span className="line">
              <span className="text-blue" style={{ ["--i" as string]: 1, ["--d" as string]: "380ms" }}>
                {aboutCopy.headline[1]}
              </span>
            </span>
          </h1>
          <span aria-hidden className={styles.headlineRule} data-reveal="draw-x" style={{ ["--d" as string]: "700ms" }} />
        </div>

        {/* centre: the big name with the main portrait standing in front of it */}
        <div className={styles.hero}>
          <p aria-hidden className={styles.bigName} data-reveal="scale" style={{ ["--d" as string]: "200ms", ["--rs" as string]: "1.02", ["--dur" as string]: "800ms" }}>
            Jagadeeswar
          </p>
          <Figure
            id="suit"
            domainId="measure"
            className={styles.heroFigure}
            delay={figureDelay.measure}
            sizes="(min-width: 1100px) 20vw, 60vw"
          />
          <Callout domain={byId.measure} delay={980} />
        </div>

        <div className={styles.rail} role="list" aria-label="Where I contribute along the chain">
          {sideUnits.map((id, i) => {
            const d = byId[id];
            return (
              <div key={id} className={styles.unit} role="listitem">
                <div className={styles.unitFigure}>
                  <Figure
                    id={d.portrait}
                    domainId={id}
                    delay={figureDelay[id]}
                    sizes="(min-width: 1100px) 15vw, (min-width: 768px) 30vw, 60vw"
                  />
                </div>
                <Callout domain={d} delay={900 + i * 90} />
              </div>
            );
          })}
        </div>

        <div className={styles.bottomRow} data-reveal="fade" style={{ ["--d" as string]: "1200ms" }}>
          <span className="inline-flex items-center gap-2.5">
            <MapPin size={16} weight="regular" aria-hidden />
            {site.location}
          </span>
          <a href="#about-story" className={styles.cue} aria-label="Scroll to read more about me">
            <span className={styles.cueLabel}>Scroll to explore</span>
            <span className={styles.cueCircle}>
              <ArrowDown size={15} weight="regular" aria-hidden />
            </span>
          </a>
        </div>
      </div>

      {/* narrative */}
      <div id="about-story" className="shell grid scroll-mt-24 gap-10 pb-[var(--section-y)] pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-20">
        <p
          className="type-subtitle pretty text-ink lg:col-span-6"
          data-reveal
        >
          {aboutCopy.lead}
        </p>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="type-body pretty text-ink-2" data-reveal style={{ ["--d" as string]: "90ms" }}>
            {aboutCopy.body}
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3 sm:gap-5">
            {aboutCopy.facts.map((f, i) => (
              <div
                key={f.value}
                className="flex flex-col-reverse justify-end"
                data-reveal
                style={{ ["--d" as string]: `${160 + i * 80}ms` }}
              >
                <dt className="mt-1.5 text-[0.84rem] leading-snug text-muted">{f.label}</dt>
                <dd className="text-[1.35rem] font-[640] tracking-[-0.03em] text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
