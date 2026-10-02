import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServicePageHero from "@/components/ServicePageHero";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import ProcessSteps from "@/components/site/ProcessSteps";
import ClosingCTA from "@/components/site/ClosingCTA";
import QualityProducts from "@/components/site/QualityProducts";
import type { ProductLine } from "@/data/copy";
import type { Clip } from "@/data/photos";
import WorkShowcase, { type Work } from "@/components/site/WorkShowcase";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";

type Item = { title: string; body: string };

/**
 * Template for search landing pages (/auto-detailing, /rv-detailing, /ceramic-coating, /paint-correction).
 * Same order and styling on every one: hero, guarantees, features, optional slot, steps, FAQ, related, closing CTA.
 */
const LandingPage = ({
  seo,
  hero,
  features,
  children,
  steps,
  faqs,
  related,
  closing,
  products,
  work,
}: {
  seo: { title: string; description: string; canonical: string; serviceName: string; serviceDescription: string };
  hero: { title: string; subtitle: string; image: string; ctaType: "book" | "call"; video?: Clip; imagePosition?: string };
  features: { title: string; intro?: string; items: Item[] };
  children?: ReactNode;
  steps?: { title: string; items: Item[] };
  faqs: { title: string; items: { q: string; a: string }[] };
  related: { label: string; to: string }[];
  closing: { title: string; body?: string; mode: "book" | "quote"; quoteHref?: string; quoteLabel?: string };
  /** Product lines for the "products we use" band; defaults to the general set. */
  products?: ProductLine[];
  /** Real job photos (and optional clips) shown after the features. */
  work?: Work;
}) => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={[buildServiceJsonLd(seo.serviceName, seo.serviceDescription, seo.canonical), buildFAQJsonLd(faqs.items)]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        ctaType={hero.ctaType}
        video={hero.video}
        imagePosition={hero.imagePosition}
      />
      <GuaranteeStrip />

      <Section>
        <SectionHeading title={features.title} intro={features.intro} />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f) => (
            <div key={f.title} className="border-t-2 border-ink pt-6">
              <dt className="font-heading text-lg font-semibold text-ink">{f.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {work && <WorkShowcase {...work} tone="surface" />}

      {children}

      {steps && (
        <Section tone="surface">
          <SectionHeading title={steps.title} />
          <ProcessSteps steps={steps.items} />
        </Section>
      )}

      <ServiceFAQ title={faqs.title} faqs={faqs.items} />

      <Section tone="surface">
        <h2 className="font-heading text-xl font-semibold text-ink">Related services</h2>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {related.map((r) => (
            <li key={r.to}>
              <Link to={r.to} className="text-[15px] font-semibold text-electric hover:underline hover:underline-offset-4">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <QualityProducts lines={products} tone="canvas" />

      <ClosingCTA {...closing} />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default LandingPage;
