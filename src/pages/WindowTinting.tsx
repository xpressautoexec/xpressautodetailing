import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollReveal from "@/components/ScrollReveal";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import tintHero from "@/assets/tint-hero.jpg";
import { Phone, ArrowRight } from "lucide-react";
import { TINT, PHONE, money } from "@/data/pricing";

const FILMS = [
  {
    id: "carbon",
    label: "Carbon",
    multiplier: 1,
    blurb:
      "A solid, fade-resistant carbon film. Cuts glare, blocks UV and never turns purple. The right choice if you mainly want privacy and a clean look.",
    points: ["99% UV rejection", "No signal interference", "Lifetime no-fade warranty"],
  },
  {
    id: "ceramic",
    label: "Ceramic IR",
    multiplier: 1,
    blurb:
      "Nano-ceramic film with infrared rejection. Same shade, far less heat — the cabin stays noticeably cooler in July and the A/C works less.",
    points: ["Up to 90% infrared heat rejection", "99% UV rejection", "Highest clarity, no haze"],
  },
] as const;

const faqs = [
  {
    q: "What is the difference between carbon and ceramic tint?",
    a: "Both look the same from outside. Carbon blocks UV and glare. Ceramic IR film adds infrared rejection, which is the part you actually feel — it keeps the heat out of the cabin instead of just darkening the glass.",
  },
  {
    q: "How dark can I legally go in Alberta?",
    a: "Front side windows and the windshield are regulated in Alberta; rear side windows and the rear windshield have no darkness limit on most vehicles. We will walk you through the legal shades before we cut anything.",
  },
  {
    q: "Will it bubble or turn purple?",
    a: "No. The films we install carry a lifetime warranty against bubbling, peeling and colour change. Purple tint is old dyed film.",
  },
  {
    q: "How long before I can roll the windows down?",
    a: "Leave them up for 48 hours while the film cures. Small haze or water pockets are normal for the first few days and clear on their own.",
  },
  {
    q: "Do you tint at my home?",
    a: "Tint is installed in a controlled, dust-free environment rather than a driveway. Call and we will book you in.",
  },
];

const WindowTinting = () => {
  const [film, setFilm] = useState<(typeof FILMS)[number]["id"]>("carbon");
  const active = FILMS.find((f) => f.id === film)!;

  return (
    <PageTransition>
      <div className="min-h-screen pb-16 lg:pb-0">
        <SEO
          title="Window Tinting Calgary | Ceramic & Carbon"
          description="Carbon and ceramic IR window tinting in Calgary. Clear pricing per coverage area, lifetime no-bubble, no-fade warranty."
          canonical="/protection/window-tint"
          jsonLd={[
            buildServiceJsonLd(
              "Window Tinting",
              "Carbon and ceramic infrared window film installation in Calgary and area.",
              "/protection/window-tint",
            ),
            buildFAQJsonLd(faqs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero title="Window Tinting" image={tintHero} ctaType="call" />

        {/* Intro */}
        <section className="py-14 sm:py-20 bg-background">
          <div className="container max-w-3xl px-6 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
                Pick your film. One price.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Carbon or ceramic IR — the price is the same either way, so pick on performance, not budget.
                Carbon for looks, privacy and UV. Ceramic IR when you want the cabin to actually stay cool.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Film switch + pricing */}
        <section className="py-14 sm:py-20 bg-foreground">
          <div className="container max-w-4xl px-4 sm:px-6">
            <div
              role="tablist"
              aria-label="Film type"
              className="mx-auto mb-8 flex w-fit gap-1 rounded-full bg-background/10 p-1"
            >
              {FILMS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={film === f.id}
                  onClick={() => setFilm(f.id)}
                  className={`rounded-full px-5 sm:px-7 py-2.5 text-sm font-semibold transition-colors ${
                    film === f.id
                      ? "bg-primary text-primary-foreground"
                      : "text-background/70 hover:text-background"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-sm sm:text-base text-background/70">{active.blurb}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {active.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-background/20 px-4 py-1.5 text-xs font-semibold text-background/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="divide-y divide-background/10 overflow-hidden rounded-2xl border border-background/15 bg-background/[0.04]">
              {TINT.map((t) => (
                <li key={t.name} className="flex items-center justify-between gap-4 p-4 sm:px-6">
                  <span className="text-sm sm:text-base text-background/85">{t.name}</span>
                  <span className="font-heading font-black text-lg sm:text-xl text-background tabular-nums">
                    {money(Math.round(t.price * active.multiplier))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-xs text-background/50">
              Prices are for standard vehicles. Steep rear glass, coupes with wraparound windows and commercial
              vans are quoted after we see the car.
            </p>

            <div className="mt-8 text-center">
              <a
                href={`tel:${PHONE.replace(/-/g, "")}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Book your tint
              </a>
            </div>
          </div>
        </section>

        <ServiceFAQ title="Tint FAQs" faqs={faqs} />

        {/* Closing CTA */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container px-6 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground mb-4">
                Not sure which shade?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base text-muted-foreground">
                Call us with your vehicle and how dark you want to go. We will tell you what is legal in Alberta
                and what it will cost.
              </p>
              <a
                href={`tel:${PHONE.replace(/-/g, "")}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Call {PHONE}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default WindowTinting;
