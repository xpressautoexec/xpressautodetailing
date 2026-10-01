import ClosingCTA from "@/components/site/ClosingCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import heroImg from "@/assets/gallery-bmw-emblem.jpg";
import { Snowflake, ShieldCheck, Droplets, CheckCircle } from "lucide-react";

const PUBLISHED = "2026-07-30";

const faqs = [
  {
    q: "Do I need both PPF and ceramic coating in Calgary?",
    a: "Most Calgary drivers get the best result from both: paint protection film on the high-impact front end where Deerfoot and Stoney Trail gravel hits, and a ceramic coating over the whole vehicle so road salt and mag chloride rinse off instead of etching.",
  },
  {
    q: "Does ceramic coating stop rock chips?",
    a: "No. Ceramic coating is a hard chemical barrier a few microns thick — it resists salt, brine, bug acid and UV, but it will not absorb a gravel strike. Only paint protection film, which is a thick self-healing urethane, stops chips.",
  },
  {
    q: "Can PPF be installed in Calgary winter?",
    a: "Film installs need a controlled, heated environment, so the ideal time is before the first snowfall. We install windshield film and RV film; for paint film on a car, choose an installer with a heated bay.",
  },
  {
    q: "How long does each last on Alberta roads?",
    a: "Quality paint protection film typically lasts 7 to 10 years. A professional ceramic coating lasts 1 to 9 years depending on the product tier and how the vehicle is washed and stored through winter.",
  },
];

const BlogPPFvsCeramic = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="PPF vs Ceramic Coating for Calgary Winters"
        description="Road salt, mag chloride and Deerfoot gravel attack paint differently. Here's how PPF and ceramic coating compare — and why Calgary drivers often need both."
        canonical="/blog/ppf-vs-ceramic-coating-calgary"
        ogType="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "PPF vs Ceramic Coating for Calgary Winters",
            description:
              "A local comparison of paint protection film and ceramic coating for Calgary's road salt, mag chloride and gravel conditions.",
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            mainEntityOfPage: "https://xpressautodetail.ca/blog/ppf-vs-ceramic-coating-calgary",
            author: { "@type": "Organization", name: "Xpress Auto & RV Detailing" },
            publisher: {
              "@type": "Organization",
              name: "Xpress Auto & RV Detailing",
              url: "https://xpressautodetail.ca",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://xpressautodetail.ca/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://xpressautodetail.ca/blog" },
              {
                "@type": "ListItem",
                position: 3,
                name: "PPF vs Ceramic Coating for Calgary Winters",
                item: "https://xpressautodetail.ca/blog/ppf-vs-ceramic-coating-calgary",
              },
            ],
          },
        ]}
      />
      <Navbar />
        <AutoBreadcrumbs />
      <article>
        {/* Hero */}
        <header className="bg-brand-dark py-16 md:py-24">
          <div className="shell max-w-3xl">
            <h1 className="font-heading font-semibold text-3xl md:text-5xl text-primary-foreground mb-5">
              PPF vs Ceramic Coating for Calgary Winters
            </h1>

            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Six months of brine, mag chloride and gravel does two completely different kinds of damage to your paint.
              One product stops impacts, the other stops chemistry. Here's how to choose — or combine — them for
              Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County roads.
            </p>
            <p className="mt-6 text-sm text-primary-foreground/60">
              Published July 30, 2026 by Xpress Auto &amp; RV Detailing
            </p>
          </div>
        </header>

        <div className="shell max-w-3xl py-8">
          <img
            src={heroImg}
            alt="Freshly protected vehicle paint after ceramic coating in Calgary"
            width={1200}
            height={800}
            loading="eager"
            className="w-full rounded-[10px] object-cover"
          />
        </div>

        {/* Body */}
        <div className="shell max-w-3xl space-y-14 pb-20">
          <section>
            <h2 className="font-heading font-semibold text-2xl tracking-tight text-ink mb-4">
              What Calgary winter actually does to your paint
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                Alberta doesn't use plain rock salt alone. The City of Calgary runs an anti-icing program built around
                salt brine and magnesium chloride, sprayed before and during storms. Mag chloride is hygroscopic — it
                pulls moisture out of the air and stays wet on your panels well below freezing, which means the corrosive
                film keeps working long after the road dries.
              </p>
              <p>
                On top of that, the same crews lay down traction gravel. At 100 km/h on Deerfoot, Stoney Trail or the
                QEII to Airdrie, that gravel becomes shot-blasting media aimed at your bumper, hood leading edge, mirrors
                and rocker panels. Add freeze-thaw cycles from chinooks and any chip you took in November has water in it,
                freezing and expanding, by February.
              </p>
              <p>
                So there are two separate threats: <strong>mechanical impact</strong> (chips, sandblasting, scratches) and
                <strong> chemical attack</strong> (salt etching, brine staining, corrosion at exposed metal). No single
                product is best at both.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-2xl text-ink mb-6">Side-by-side comparison</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-[10px] border border-line p-6">
                <ShieldCheck className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-ink mb-3">Paint Protection Film (PPF)</h3>
                <ul className="space-y-2 text-sm text-ink-2">
                  <li>Thick self-healing urethane film, roughly 8 mil</li>
                  <li>Absorbs gravel strikes, sand blasting and road debris</li>
                  <li>Best on front bumper, hood, fenders, mirrors, rockers, headlights</li>
                  <li>Typically 7 to 10 years with quality film</li>
                  <li>Higher upfront cost, highest resale protection</li>
                </ul>
              </div>
              <div className="rounded-[10px] border border-line p-6">
                <Droplets className="w-9 h-9 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-ink mb-3">Ceramic Coating</h3>
                <ul className="space-y-2 text-sm text-ink-2">
                  <li>Hard, slick chemical barrier bonded to the clear coat</li>
                  <li>Stops salt, brine and mag chloride from etching or staining</li>
                  <li>Covers the whole vehicle, including glass and wheels</li>
                  <li>Typically 1 to 9 years depending on product tier</li>
                  <li>Makes winter washes far faster — grime releases instead of bonding</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-[10px] border border-electric/40 bg-electric-soft p-6">
              <div className="flex gap-3">
                <Snowflake className="w-6 h-6 text-electric shrink-0 mt-0.5" />
                <p className="text-sm text-ink/85 leading-relaxed">
                  <strong>The short answer:</strong> ceramic coating will not stop a rock chip, and PPF on the front end
                  leaves the other 70% of your paint bare to salt. They are complementary, not competing. Film handles
                  impact, coating handles chemistry — and coating can be applied over film so the whole car sheds brine
                  the same way.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-2xl tracking-tight text-ink mb-4">
              What we recommend by vehicle and driving pattern
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Highway commuters (Airdrie, Cochrane, Okotoks into Calgary)",
                  body: "Full front PPF plus a ceramic coating over the whole vehicle. You take the most gravel at highway speed and the most brine exposure per week.",
                },
                {
                  title: "City-only drivers with garage parking",
                  body: "Ceramic coating first. Salt exposure is the dominant threat; add partial front PPF later if you start seeing chips on the bumper.",
                },
                {
                  title: "New vehicles and leases",
                  body: "Protect before the first winter. Film and coating both bond best to factory paint that hasn't been etched, and a clean return at lease end avoids chip charges.",
                },
                {
                  title: "Dark or soft-paint vehicles",
                  body: "Coating is close to mandatory. Dark clear coats show salt haze and wash marring immediately; the slick surface cuts wash-induced swirls dramatically.",
                },
                {
                  title: "Trucks, RVs and fleet vehicles",
                  body: "Rocker and lower-panel film plus a durable coating. Gravel roads and job sites hit low panels hardest, and clean fleet trucks hold resale value.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-[10px] border border-line p-5">
                  <CheckCircle className="w-5 h-5 text-electric shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-ink mb-1">{item.title}</h3>
                    <p className="text-sm text-ink-2 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-2xl tracking-tight text-ink mb-4">
              Timing it right in Alberta
            </h2>
            <div className="space-y-4 text-ink-2 leading-relaxed">
              <p>
                The ideal window is late September through October — before the first sanding trucks roll out. Paint has
                to be decontaminated and, in most cases, machine polished before film or coating goes on, because both
                lock in whatever is on the surface. Doing it in spring still works, but it means one more winter of
                unprotected clear coat.
              </p>
              <p>
                Whatever you install, keep washing through winter. A coated vehicle rinsed every two to three weeks —
                undercarriage included — will look years newer than an uncoated one, because the brine never gets time to
                sit and etch.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-2xl text-ink mb-6">Common questions</h2>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-[10px] border border-line p-5">
                  <h3 className="font-heading font-semibold text-ink mb-2">{f.q}</h3>
                  <p className="text-sm text-ink-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[10px] border border-line p-6">
            <h2 className="font-heading font-semibold text-xl text-ink mb-4">Keep reading</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rv-trailer/ppf" className="text-electric font-heading font-semibold hover:underline">
                  RV paint protection film
                </Link>
              </li>
              <li>
                <Link to="/ceramic-paint-correction" className="text-electric font-heading font-semibold hover:underline">
                  Ceramic coating packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-electric font-heading font-semibold hover:underline">
                  All detailing guides
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </article>

      <ClosingCTA
        title="Protect it before the first snowfall"
        body="Tell us how you drive and we'll recommend the right protection, with no upsell."
        mode="quote"
        quoteHref="/ceramic-paint-correction#assessment"
        quoteLabel="Book a free paint inspection"
      />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default BlogPPFvsCeramic;
