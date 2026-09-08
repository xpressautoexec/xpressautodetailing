import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";
import CompanyLogos from "@/components/CompanyLogos";
import FleetQuoteForm from "@/components/FleetQuoteForm";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import { Phone, Check } from "lucide-react";
import fleetHero from "@/assets/fleet-kls-truck.jpg";
import catExcavator1 from "@/assets/gallery-cat-excavator-1.jpg";
import catExcavatorExt1 from "@/assets/gallery-cat-excavator-exterior-1.jpg";
import catExcavatorExt2 from "@/assets/gallery-cat-excavator-exterior-2.jpg";
import catExcavator3 from "@/assets/gallery-cat-excavator-3.jpg";
import { PHONE, EMAIL } from "@/data/pricing";
import { WATER_LINE } from "@/data/copy";

const WHAT_WE_SERVICE = [
  {
    title: "Work trucks & vans",
    body: "Service fleets, trades vans and pickups washed on site so they leave the yard presentable.",
  },
  {
    title: "Dealership lots",
    body: "Lot washes, delivery prep and reconditioning on inventory — priced per unit, scheduled weekly.",
  },
  {
    title: "Heavy equipment",
    body: "Excavators, loaders and haul trucks degreased, washed and cabs detailed at the site or yard.",
  },
  {
    title: "Company cars & executive vehicles",
    body: "Scheduled interior and exterior details on a rotation your drivers never have to think about.",
  },
];

const HOW = [
  "We walk your yard and count units",
  "You get a written per-unit rate and a schedule",
  "We show up on rotation with our own water and power",
  "One monthly invoice with a per-unit breakdown",
];

const faqs = [
  {
    q: "How is fleet work priced?",
    a: "Per unit, on a rate set after we see the fleet. Vehicle type, condition, frequency and how many units we can do in one visit all affect the rate. Larger and more frequent fleets get better per-unit pricing.",
  },
  {
    q: "Do you need water and power at our yard?",
    a: WATER_LINE,
  },
  {
    q: "Can you work outside business hours?",
    a: "Yes. Most fleet work happens early morning, evenings or weekends so vehicles are not pulled off the road during the day.",
  },
  {
    q: "Do you invoice monthly?",
    a: "Yes. Fleet accounts are invoiced monthly with a per-unit breakdown and net terms.",
  },
  {
    q: "What is the minimum fleet size?",
    a: "There is no hard minimum, but scheduled rotations make the most sense from about five units up.",
  },
];

const GALLERY = [
  { src: catExcavatorExt1, alt: "Heavy equipment excavator after exterior wash in Calgary" },
  { src: catExcavator1, alt: "Excavator cab interior after detailing" },
  { src: catExcavatorExt2, alt: "Cleaned excavator undercarriage and body panels" },
  { src: catExcavator3, alt: "Detailed heavy equipment operator cab" },
];

const CorporateFleet = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Fleet & Dealership Detailing Calgary"
        description="On-site fleet washing and detailing in Calgary for work trucks, dealership lots and heavy equipment. Per-unit rates, scheduled rotations, monthly invoicing."
        canonical="/fleet"
        jsonLd={[
          buildServiceJsonLd(
            "Fleet & Dealership Detailing",
            "On-site fleet and dealership vehicle detailing across Calgary and area.",
            "/fleet",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="Fleet & Dealership Detailing" image={fleetHero} ctaType="call" />

      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Your vehicles stay working. We come to them.
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Scheduled on-site cleaning for work trucks, dealership inventory and heavy equipment. No drive
              time, no downtime, one invoice a month.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CompanyLogos />

      {/* What we service */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background text-center mb-10">
            What we service
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {WHAT_WE_SERVICE.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-background/15 bg-background/[0.04] p-6"
              >
                <h3 className="font-heading text-lg font-bold text-background">{s.title}</h3>
                <p className="mt-2 text-sm text-background/70">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            How fleet accounts work
          </h2>
          <ol className="space-y-4">
            {HOW.map((h, i) => (
              <li key={h} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="font-heading text-sm font-black text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm sm:text-base text-foreground">{h}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Fleet pricing is quoted per unit — there is no published rate card because no two fleets are alike.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-14 sm:py-20 bg-secondary/40">
        <div className="container px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
            Recent fleet work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {GALLERY.map((g) => (
              <img
                key={g.alt}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ title="Fleet FAQs" faqs={faqs} />

      {/* Quote */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-2xl px-4 sm:px-6">
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-3">
            Request a fleet quote
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Tell us how many units and where they sit. We&apos;ll come count them and send a written rate.
          </p>
          <FleetQuoteForm />
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border px-8 text-sm font-bold text-foreground transition-colors hover:border-primary"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default CorporateFleet;
