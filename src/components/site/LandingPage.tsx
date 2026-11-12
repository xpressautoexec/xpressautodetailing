import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import QuoteSection from "@/components/site/QuoteSection";
import ServicePageHero from "@/components/ServicePageHero";
import GuaranteeStrip from "@/components/site/GuaranteeStrip";
import XpressProcess from "@/components/site/XpressProcess";
import ClosingCTA from "@/components/site/ClosingCTA";
import QualityProducts from "@/components/site/QualityProducts";
import type { ProductLine } from "@/data/copy";
import WorkShowcase, { type Work } from "@/components/site/WorkShowcase";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import WhyBand, { type WhyItem } from "@/components/site/WhyBand";

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
  childrenBeforeWork = false,
  quote,
  why,
  afterFeatures,
}: {
  seo: { title: string; description: string; canonical: string; serviceName: string; serviceDescription: string };
  hero: { eyebrow?: string; quoteLabel?: string; title: string; subtitle: string; image: string; ctaType: "book" | "call"; imagePosition?: string; bookLabel?: string; phoneHref?: string; bookHref?: string };
  features: { eyebrow?: string; title: string; intro?: string; items: Item[] };
  children?: ReactNode;
  /** Service-specific steps, shown under the Xpress Process. */
  steps?: { title: string; items: Item[] };
  faqs: { title: string; items: { q: string; a: string; aNode?: ReactNode }[] };
  related: { label: string; to: string }[];
  closing: { title: string; body?: string; mode: "book" | "quote"; quoteHref?: string; quoteLabel?: string; bookLabel?: string; phoneHref?: string; bookHref?: string; primaryLabel?: string };
  /** Product lines for the "products we use" band; defaults to the general set. */
  products?: ProductLine[];
  /** Real job photos (and optional clips) shown after the features. */
  work?: Work;
  /** Render the page-specific sections (e.g. pricing) above the work photos instead of below. */
  childrenBeforeWork?: boolean;
  /** Quote form above the FAQ. `source` defaults to the canonical path. */
  quote?: Partial<ComponentProps<typeof QuoteSection>>;
  /** LLumar-style dark "WHY ___" band after the features. */
  why?: { subject: string; intro: string; apart?: string; items: WhyItem[] };
  /** Rendered straight after the features (e.g. brand product links). */
  afterFeatures?: ReactNode;
}) => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={[buildServiceJsonLd(seo.serviceName, seo.serviceDescription, seo.canonical), buildFAQJsonLd(faqs.items)]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        eyebrow={hero.eyebrow}
        quoteLabel={hero.quoteLabel}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        ctaType={hero.ctaType}
        imagePosition={hero.imagePosition}
        bookLabel={hero.bookLabel}
        phoneHref={hero.phoneHref}
        bookHref={hero.bookHref}
      />
      <GuaranteeStrip />

      <Section>
        <SectionHeading eyebrow={features.eyebrow} title={features.title} intro={features.intro} />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f) => (
            <div key={f.title} className="border-t-2 border-ink pt-6">
              <dt className="font-heading text-xl font-bold text-ink">{f.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {afterFeatures}

      {why && <WhyBand subject={why.subject} intro={why.intro} apart={why.apart} items={why.items} />}

      {childrenBeforeWork && children}

      {work && <WorkShowcase {...work} tone="surface" />}

      {!childrenBeforeWork && children}

      <XpressProcess service={seo.serviceName.toLowerCase()} details={steps?.items} detailsTitle={steps?.title} />

      <QuoteSection source={seo.canonical.replace(/^\//, "") || "landing"} {...quote} />

      <ServiceFAQ title={faqs.title} faqs={faqs.items} />

      <Section tone="surface">
        <p className="eyebrow">Related</p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-ink">Related services</h2>
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
    </div>
  </PageTransition>
);

export default LandingPage;
