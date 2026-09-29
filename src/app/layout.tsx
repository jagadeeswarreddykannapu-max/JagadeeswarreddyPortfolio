import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SmoothCursor } from "@/components/motion/SmoothCursor";
import { RouteEffects } from "@/components/layout/RouteEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FooterGate } from "@/components/layout/FooterGate";

const inter = localFont({
  src: [{ path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Supply Chain Analyst`,
    template: `%s | ${site.name}, Supply Chain Analyst`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    "Supply Chain Analyst",
    "Demand Planning",
    "Inventory Optimization",
    "Power BI",
    "Procurement analytics",
    "Montpellier",
  ],
  openGraph: {
    type: "profile",
    title: `${site.name} | Supply Chain Analyst`,
    description: site.description,
    siteName: site.name,
    locale: "en_GB",
    images: [{ url: "/images/ui/og.jpg", width: 1200, height: 630, alt: "Jagadeeswar Reddy, Supply Chain Analyst" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Supply Chain Analyst`,
    description: site.description,
    images: ["/images/ui/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b3d91",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Montpellier", addressCountry: "FR" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Montpellier Business School" },
    { "@type": "CollegeOrUniversity", name: "Tapasya Degree College" },
  ],
  sameAs: [site.linkedin.href],
  knowsAbout: ["Demand planning", "Inventory optimization", "Procurement analytics", "Power BI", "Python", "SQL"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so reveal styles never hide content for no-JS visitors.
            A plain inline script runs while the HTML is parsed; next/script's beforeInteractive is queued until
            the Next.js runtime loads, so content first painted visible and then faded out before its reveal. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="relative min-h-dvh bg-canvas font-sans text-ink">
        <div id="scroll-sentinel" aria-hidden className="pointer-events-none absolute left-0 top-0 h-4 w-px" />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <FooterGate>
          <SiteFooter />
        </FooterGate>
        <SmoothScroll />
        <SmoothCursor />
        <RouteEffects />
        <RevealObserver />
      </body>
    </html>
  );
}
