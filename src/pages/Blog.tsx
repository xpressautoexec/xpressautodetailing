import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, cardClass } from "@/components/site/Section";
import SEO from "@/components/SEO";
import { BLOG_CARDS, formatDate, imageFor } from "@/data/blog";

const Blog = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Detailing Guides | Xpress Auto & RV Detailing"
        description="Plain-language guides on detailing prices, paint protection and seasonal vehicle care in Calgary."
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Xpress Auto & RV Detailing guides",
          url: "https://xpressautodetail.ca/blog",
          blogPost: BLOG_CARDS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            url: `https://xpressautodetail.ca${p.href}`,
          })),
        }}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <div className="shell">
          <h1 className="font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">Guides</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
            Plain answers on pricing, paint protection and keeping a vehicle in shape through Calgary seasons.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_CARDS.map((post) => (
            <Link key={post.href} to={post.href} className={`${cardClass} group flex flex-col overflow-hidden transition-colors hover:border-ink-2`}>
              <img src={imageFor(post.image)} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-muted-ink">{formatDate(post.date)}</p>
                <h2 className="mt-2 font-heading text-xl font-semibold text-ink group-hover:text-electric">{post.title}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{post.excerpt}</p>
                <span className="mt-5 text-sm font-semibold text-electric">Read the guide</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <ClosingCTA />
      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Blog;
