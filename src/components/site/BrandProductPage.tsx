import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import QuoteSection from "@/components/site/QuoteSection";
import WhyBand from "@/components/site/WhyBand";
import QuoteLink from "@/components/site/QuoteLink";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import type { BrandPage } from "@/data/brand-pages";

/**
 * SunTek / LLumar page template: hero, breadcrumb, keyword H1, plain first sentence,
 * question-style H2s, product rows, why band, quote, FAQ, footnotes, pathway cards.
 */
const BrandProductPage = ({ page }: { page: BrandPage }) => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title={page.seo.title}
        description={page.seo.description}
        canonical={page.path}
        jsonLd={[buildServiceJsonLd(page.seo.serviceName, page.seo.description, page.path), buildFAQJsonLd(page.faqs)]}
      />
      <Navbar />
      <ServicePageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        image={page.hero.image}
        imageAlt={page.hero.imageAlt}
        imagePosition={page.hero.imagePosition}
        ctaType="call"
        bookHref="#quote"
        bookLabel="Get a quote"
        openings={false}
        titleAs="p"
      />
      <AutoBreadcrumbs />

      {/* Keyword H1 + plain descriptive first sentence (this is what Google pulls as the snippet). */}
      <section className="section-y bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h1 className="display-xl heading-rule !text-[clamp(30px,3.4vw,52px)]">{page.h1}</h1>
            <p className="mt-8 text-lg leading-relaxed text-ink">{page.lead}</p>
            {page.intro.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-10">
            {page.questions.map((q) => (
              <div key={q.q}>
                <h3 className="text-2xl font-semibold text-ink">{q.q}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-2">{q.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.products.length > 0 && (
        <section className="section-y bg-tint" aria-labelledby="lineup-title">
          <div className="shell">
            <h2 id="lineup-title" className="display-xl !text-[clamp(30px,3.4vw,52px)]">
              {page.productsTitle}
            </h2>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {page.products.map((p) => (
                <div key={p.name} className="grid items-start gap-5 py-9 md:grid-cols-[1fr_1.6fr_auto] md:items-center md:gap-10">
                  <h3 className="text-[28px] font-semibold text-ink">{p.name}</h3>
                  <div>
                    <p className="text-lg leading-relaxed text-ink-2">{p.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.benefits.map((b) => (
                        <li key={b} className="flex gap-2 text-base text-ink">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {p.href ? (
                    <Link to={p.href} className="pill-action inline-flex items-center gap-2 bg-action text-primary-foreground hover:bg-ink">
                      Learn more
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <QuoteLink className="pill-action inline-flex items-center gap-2 bg-action text-primary-foreground hover:bg-ink">
                      Get a quote
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </QuoteLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.extra}

      <WhyBand subject={page.why.subject} intro={page.why.intro} apart={page.why.apart} items={page.why.items} />

      <QuoteSection
        source={page.path.replace(/^\//, "")}
        title={page.quoteTitle}
        intro="Tell us about the vehicle and we will get back to you with a real price, usually the same day. Prefer to talk it through? Call us."
        defaultNeed={page.quoteNeed}
      />

      <ServiceFAQ title={page.faqTitle} faqs={page.faqs} />

      <section className="section-y bg-canvas">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2">
            {page.pathways.map((c) => (
              <Link key={c.title} to={c.href} className="group rounded-[16px] bg-tint p-8 shadow-[var(--shadow-card)] sm:p-10">
                <h3 className="flex items-center gap-2 text-[26px] font-semibold text-action">
                  {c.title}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <p className="mt-3 text-lg text-ink-2">{c.body}</p>
              </Link>
            ))}
          </div>
          {page.official && (
            <a
              href={page.official.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-1.5 text-base font-semibold text-action hover:underline"
            >
              {page.official.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <div className="mt-8 space-y-1 text-sm text-muted-ink">
            {page.footnotes.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
);

export default BrandProductPage;
