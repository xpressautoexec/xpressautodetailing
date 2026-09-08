import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import AutoPackages from "@/components/AutoPackages";
import AddOnList from "@/components/AddOnList";
import ServiceFAQ from "@/components/ServiceFAQ";
import GalleryCarousel from "@/components/GalleryCarousel";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import completeHero from "@/assets/complete-hero.jpg";
import { ArrowRight } from "lucide-react";
import { BOOKING_URL, PHONE, PASS_ADDON_DISCOUNT } from "@/data/pricing";
import { WATER_LINE, GUARANTEES } from "@/data/copy";

const detailingFAQs = [
  {
    q: "Do you need my water or power?",
    a: "No. Our vans carry their own water and power, so we can work in a driveway, parkade, storage lot or job site.",
  },
  {
    q: "How long does a detail take?",
    a: "Xpress Maintain is about 45 minutes, Refresh 2.5–3 hours, Showroom Reset 3.5–4 hours, and Restore is a full 8-hour day.",
  },
  {
    q: "Which package should I book?",
    a: "If the car is generally clean, book Refresh. If it hasn't been detailed in a year, or there are stains, salt or pet hair, book the Showroom Reset. If the paint is swirled and you want it protected, book Restore.",
  },
  {
    q: "Do I have to be there?",
    a: "No. Plenty of clients leave the keys and carry on with their day. We walk you through the finished vehicle whenever you're available.",
  },
  {
    q: "When do I pay?",
    a: "After the work is done and you've looked it over. Nothing up front, and cancellations are free.",
  },
];

const Detailing = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Car Detailing Calgary | Mobile Packages"
        description="Mobile car detailing in Calgary, Airdrie, Cochrane and Chestermere. Four packages from a 45-minute maintain to a full correct-and-coat. We bring our own water and power."
        canonical="/detailing"
        jsonLd={[
          buildServiceJsonLd(
            "Car Detailing",
            "Mobile interior and exterior car detailing packages in Calgary and area.",
            "/detailing",
          ),
          buildFAQJsonLd(detailingFAQs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="Mobile Car Detailing in Calgary" image={completeHero} />

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              Four packages. One visit. No drop-off.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{WATER_LINE}</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {GUARANTEES.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {g}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <AutoPackages
            dark
            heading="Detailing Packages"
            intro="Pick your vehicle size — the prices update. Everything below is the full price, taxes aside. No hidden trip charge."
          />
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-4xl px-6">
          <ScrollReveal>
            <div className="mb-8 text-center">
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground">Add-Ons</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Add any of these to any package. Xpress Pass members take {PASS_ADDON_DISCOUNT}% off every add-on.
              </p>
            </div>
            <AddOnList />
          </ScrollReveal>
        </div>
      </section>

      <GalleryCarousel />
      <ServiceFAQ title="Detailing FAQs" faqs={detailingFAQs} />

      {/* Closing CTA */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">
              Ready when you are
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base text-background/60">
              Pick a package and a time. We come to your home, office or storage lot.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE.replace(/-/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-background/25 px-8 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:border-background/60"
              >
                Call {PHONE}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <div className="h-24 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Detailing;
