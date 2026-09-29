import Image from "next/image";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr/DownloadSimple";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { ChartLineUp } from "@phosphor-icons/react/dist/ssr/ChartLineUp";
import { Handshake } from "@phosphor-icons/react/dist/ssr/Handshake";
import { Package } from "@phosphor-icons/react/dist/ssr/Package";
import { Truck } from "@phosphor-icons/react/dist/ssr/Truck";
import { Gauge } from "@phosphor-icons/react/dist/ssr/Gauge";
import { resume, site } from "@/content/site";
import { TransitionLink } from "./TransitionLink";

/* the five links of the chain (as on the About page), painted on the open container's door */
const door = [
  { label: "Plan", Icon: ChartLineUp },
  { label: "Source", Icon: Handshake },
  { label: "Stock", Icon: Package },
  { label: "Move", Icon: Truck },
  { label: "Measure", Icon: Gauge },
];

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export function SiteFooter() {
  return (
    <footer className="relative text-white">
      {/* invitation */}
      <div className="relative overflow-hidden border-t border-line-soft bg-white text-ink" data-header-theme="light">
        {/* phones and tablets: the invitation, then portrait and open container side by side; wide: all three in a row */}
        <div className="shell relative grid grid-cols-2 items-end gap-x-4 gap-y-10 pt-20 md:grid-cols-12 md:gap-6 md:pt-24">
          <div className="relative order-2 w-full max-w-[15rem] justify-self-center md:col-span-6 md:max-w-[19rem] lg:order-1 lg:col-span-3" data-reveal="rise">
            <Image
              src="/images/portraits/shirt.webp"
              alt="Jagadeeswar Reddy in a light blue shirt with a lanyard, holding a tablet"
              width={622}
              height={1024}
              sizes="(min-width: 768px) 19rem, 45vw"
              quality={85}
              className="h-auto w-full"
            />
          </div>
          <div className="order-1 col-span-2 pb-4 md:col-span-12 lg:order-2 lg:col-span-6 lg:pb-24">
            <p className="type-label text-blue" data-reveal>
              Open to opportunities
            </p>
            <p className="mt-4 text-[clamp(2.8rem,1.3rem+4.2vw,5.4rem)] font-[700] leading-[0.92] tracking-[-0.06em]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Let&apos;s connect<span className="text-blue">.</span>
            </p>
            <p className="type-lead pretty mt-5 max-w-[34rem] text-ink-2" data-reveal style={{ ["--d" as string]: "160ms" }}>
              Open to discussing supply chain, analytics, operations and collaboration opportunities.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={{ ["--d" as string]: "240ms" }}>
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                <EnvelopeSimple size={18} weight="bold" aria-hidden />
                Email {site.name}
                <ArrowRight size={16} weight="bold" className="btn-arrow" aria-hidden />
              </a>
              <a href={resume.href} download={resume.fileName} className="btn btn-secondary">
                <DownloadSimple size={18} weight="bold" aria-hidden />
                Download resume
              </a>
            </div>
            <p className="mt-4 text-[0.95rem] text-ink-2" data-reveal style={{ ["--d" as string]: "300ms" }}>
              <a href={`mailto:${site.email}`} className="link-draw font-medium text-navy">
                {site.email}
              </a>
            </p>
          </div>
          <div className="relative order-3 self-end pb-6 md:col-span-6 md:w-full md:max-w-[24rem] md:justify-self-center lg:col-span-3 lg:max-w-none lg:pb-12" data-reveal="right" style={{ ["--d" as string]: "200ms" }}>
            <div className="relative [container-type:inline-size]">
              <Image
                src="/images/footer/open-container.webp"
                alt="An open blue shipping container loaded with stacked cartons"
                width={1204}
                height={818}
                sizes="(min-width: 1024px) 30vw, 48vw"
                quality={85}
                className="h-auto w-full drop-shadow-[0_24px_30px_rgba(11,40,90,0.25)]"
              />
              <ul aria-hidden className="absolute left-[74.5%] top-[21%] flex h-[62%] w-[21.5%] flex-col justify-between">
                {door.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-[2.6cqw] text-[2.6cqw] font-medium leading-none text-white/90">
                    <span className="grid size-[7cqw] shrink-0 place-items-center rounded-full border border-white/35 bg-white/10">
                      <Icon className="size-[3.8cqw]" weight="regular" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* structured footer */}
      <div className="bg-navy-950" data-header-theme="dark" data-surface="dark">
        <div className="shell grid gap-12 py-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4" data-reveal="fade" style={{ ["--dur" as string]: "500ms" }}>
            <p className="text-[1.1rem] font-[680] uppercase tracking-[0.08em]">{site.name}</p>
            <p className="mt-2 text-[0.92rem] text-white/70">Supply chain, operations, data and automation</p>
            <p className="mt-3 inline-flex items-center gap-2 text-[0.9rem] text-white/70">
              <MapPin size={16} aria-hidden />
              {site.location}
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-4" data-reveal="fade" style={{ ["--d" as string]: "90ms", ["--dur" as string]: "500ms" }}>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/50">Sections</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[0.95rem]">
              {nav.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} className="flex min-h-11 w-full items-center text-white/80 hover:text-white">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4" data-reveal="fade" style={{ ["--d" as string]: "180ms", ["--dur" as string]: "500ms" }}>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/50">Find me on</p>
            <div className="mt-4 flex gap-3">
              <a
                href={site.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-navy-950"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <LinkedinLogo size={22} weight="fill" aria-hidden />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="grid size-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-navy-950"
                aria-label={`Email ${site.email}`}
              >
                <EnvelopeSimple size={22} weight="bold" aria-hidden />
              </a>
            </div>
            <p className="mt-8 text-[1.15rem] leading-snug tracking-[-0.015em] text-white/85">
              Data. Processes. People.
              <br />
              <span className="text-[#8fb6f5]">Stronger supply chains.</span>
            </p>
          </div>
        </div>
        <div className="shell flex flex-col gap-4 border-t border-white/10 py-6 text-[0.84rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="#main" className="inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-white">
            Back to top
            <ArrowUp size={15} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
