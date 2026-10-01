import { Link, useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ClosingCTA from "@/components/site/ClosingCTA";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { BLOG_CARDS, formatDate, getPost, imageFor } from "@/data/blog";

const SITE = "https://xpressautodetail.ca";
const ORG = { "@type": "Organization", name: "Xpress Auto & RV Detailing", url: SITE };

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const url = `${SITE}/blog/${post.slug}`;
  const more = BLOG_CARDS.filter((c) => c.href !== `/blog/${post.slug}`).slice(0, 3);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      author: ORG,
      publisher: ORG,
    },
  ];
  if (post.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO title={post.title} description={post.description} canonical={`/blog/${post.slug}`} ogType="article" jsonLd={jsonLd} />
        <Navbar />
        <AutoBreadcrumbs currentLabel={post.title} />

        <article>
          <header className="bg-brand-dark py-16 md:py-24">
            <div className="shell max-w-3xl">
              <h1 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-primary-foreground md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">{post.excerpt}</p>
              <p className="mt-6 text-sm text-primary-foreground/60">
                Published {formatDate(post.date)} by Xpress Auto &amp; RV Detailing
              </p>
            </div>
          </header>

          <div className="shell max-w-3xl py-8">
            <img
              src={imageFor(post.image)}
              alt={post.imageAlt}
              width={1200}
              height={675}
              className="aspect-[16/9] w-full rounded-[10px] object-cover"
            />
          </div>

          <div className="shell max-w-3xl space-y-12 pb-20">
            {post.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="mb-4 font-heading text-2xl font-semibold tracking-tight text-ink">{s.heading}</h2>
                <div className="space-y-4 text-[17px] leading-relaxed text-ink-2">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            {post.faqs?.length ? (
              <section>
                <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight text-ink">Common questions</h2>
                <div className="space-y-5">
                  {post.faqs.map((f) => (
                    <div key={f.q} className="rounded-[10px] border border-line p-5">
                      <h3 className="mb-2 font-heading font-semibold text-ink">{f.q}</h3>
                      <p className="text-sm leading-relaxed text-ink-2">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-[10px] border border-line p-6">
              <h2 className="mb-4 font-heading text-xl font-semibold text-ink">Keep reading</h2>
              <ul className="space-y-2 text-sm">
                {[...(post.related ?? []), ...more.map((m) => ({ label: m.title, to: m.href }))].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="font-heading font-semibold text-electric hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/blog" className="font-heading font-semibold text-electric hover:underline">
                    All detailing guides
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </article>

        <ClosingCTA />
        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default BlogPost;
