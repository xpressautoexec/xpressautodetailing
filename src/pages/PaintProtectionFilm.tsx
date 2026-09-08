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
import ppfHero from "@/assets/ppf-hero.jpg";
import { Check, Phone, ArrowRight } from "lucide-react";
import { AUTO_PPF, PPF_UPCHARGE, TINT, PHONE, money } from "@/data/pricing";

const TINT_FILMS = [
  {
    id: "carbon",
    label: "Carbon",
    blurb:
      "A solid, fade-resistant carbon film. Cuts glare, blocks UV and never turns purple. The right choice if you mainly want privacy and a clean look.",
    points: ["99% UV rejection", "No signal interference", "Lifetime no-fade warranty"],
  },
  {
    id: "ceramic",
    label: "Ceramic IR",
    blurb:
      "Nano-ceramic film with infrared rejection. Same shade, far less heat — the cabin stays noticeably cooler in July and the A/C works less.",
    points: ["Up to 90% infrared heat rejection", "99% UV rejection", "Highest clarity, no haze"],
  },
] as const;

const coverage: Record<string, string[]> = {
  "Partial Front": [
    "Leading 18–24 inches of the hood",
    "Front bumper",
    "Both mirror caps",
    "Best value against city gravel",
  ],
  "Full Front": [
    "Full hood, no seam line",
    "Full front fenders",
    "Front bumper and mirror caps",
    "The coverage most highway drivers ask for",
  ],
  "Track Pack": [
    "Everything in Full Front",
    "A-pillars and roof leading edge",
    "Rocker panels",
    "Rear arch impact zones",
  ],
  "Full Vehicle": [
    "Every painted panel wrapped",
    "Wrapped edges wherever possible",
    "Maximum resale protection",
    "Two to three days in the shop",
  ],
  "Windshield PPF": [
    "Optically clear windshield shield",
    "Resists rock chips and star cracks",
    "Cheaper than one glass replacement",
  ],
  "Interior Screen PPF": [
    "Infotainment and gauge screens",
    "Stops fingernail scratches and swirl",
    "Matte or gloss finish",
  ],
};

const comparison = [
  { label: "Nothing", chips: "No", swirls: "No", gloss: "—", life: "—" },
  { label: "Wax / sealant", chips: "No", swirls: "No", gloss: "Good", life: "3–6 months" },
  { label: "Ceramic coating", chips: "No", swirls: "Light only", gloss: "Excellent", life: "1–9 years" },
  { label: "Paint protection film", chips: "Yes", swirls: "Yes, self-healing", gloss: "Excellent", life: "10 years" },
];

const faqs = [
  {
    q: "What does paint protection film stop?",
    a: "Rock chips, road salt, sand blasting on the lower panels, bug etching and light scratches. The film absorbs the impact instead of the paint, and light swirls in the film self-heal in the sun.",
  },
  {
    q: "Will it yellow or peel?",
    a: "The films we install carry a 10-year manufacturer warranty against yellowing, cracking, bubbling and peeling. Older films yellowed; modern top-coated urethane does not.",
  },
  {
    q: "Can I put a ceramic coating over the film?",
    a: "Yes, and we recommend it. Coating over film makes it easier to clean and keeps the finish slick. Most clients pair Full Front with a coating on the rest of the car.",
  },
  {
    q: "Does it cost more for a truck or an exotic?",
    a: `Yes — trucks and large SUVs are ${PPF_UPCHARGE.truckSuvPct}% more because of panel size, and exotics are ${PPF_UPCHARGE.exoticPct}% more because of the complexity of the panels.`,
  },
  {
    q: "How long does the install take?",
    a: "A partial or full front is one day. Track Pack is one to two days. A full vehicle wrap is two to three days, and the film needs a few days to fully clear.",
  },
];

const PaintProtectionFilm = () => {
  const [film, setFilm] = useState<(typeof TINT_FILMS)[number]["id"]>("carbon");
  const activeFilm = TINT_FILMS.find((f) => f.id === film)!;

  return (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="PPF & Window Tint Calgary | Xpress"
        description="Paint protection film and window tinting in Calgary. PPF coverage with a 10-year no-yellow warranty, carbon and ceramic IR tint at one price."
        canonical="/protection/ppf"
        jsonLd={[
          buildServiceJsonLd(
            "Paint Protection Film & Window Tinting",
            "Self-healing paint protection film and carbon/ceramic window tint installation in Calgary and area.",
            "/protection/ppf",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero title="PPF & Window Tint" image={ppfHero} ctaType="call" />

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
              The only thing that actually stops rock chips
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Deerfoot gravel, winter sanding trucks and highway 2 in the spring will chip a front end in a
              season. Film is a thick, self-healing urethane layer bonded over the paint — it takes the hit so
              the panel underneath stays factory.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="py-14 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background">
                Coverage & Pricing
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-background/60">
                Prices are for a sedan or coupe. Trucks and large SUVs {PPF_UPCHARGE.truckSuvPct}% more, exotics{" "}
                {PPF_UPCHARGE.exoticPct}% more.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUTO_PPF.map((p) => (
              <div
                key={p.name}
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                  p.popular
                    ? "border-primary/60 bg-background/[0.06] shadow-lg shadow-primary/10"
                    : "border-background/15 bg-background/[0.04]"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    Most booked
                  </span>
                )}
                <h3 className="font-heading font-black text-lg uppercase text-background">{p.name}</h3>
                <p className="mt-3 font-heading font-black text-3xl text-background">{money(p.price)}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {(coverage[p.name] ?? []).map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-background/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${PHONE.replace(/-/g, "")}`}
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-background/25 px-6 text-sm font-bold text-background transition-colors hover:bg-background/10"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Get a quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-8">
              Film vs coating vs wax
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-muted/60">
                  <tr className="text-left">
                    <th scope="col" className="p-4 font-heading font-bold uppercase text-xs text-foreground">
                      Protection
                    </th>
                    <th scope="col" className="p-4 font-heading font-bold uppercase text-xs text-foreground">
                      Rock chips
                    </th>
                    <th scope="col" className="p-4 font-heading font-bold uppercase text-xs text-foreground">
                      Scratches
                    </th>
                    <th scope="col" className="p-4 font-heading font-bold uppercase text-xs text-foreground">
                      Gloss
                    </th>
                    <th scope="col" className="p-4 font-heading font-bold uppercase text-xs text-foreground">
                      Lifespan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-muted/20" : "bg-card"}>
                      <th scope="row" className="p-4 text-left font-semibold text-foreground">
                        {row.label}
                      </th>
                      <td className="p-4 text-muted-foreground">{row.chips}</td>
                      <td className="p-4 text-muted-foreground">{row.swirls}</td>
                      <td className="p-4 text-muted-foreground">{row.gloss}</td>
                      <td className="p-4 text-muted-foreground">{row.life}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              10-year manufacturer warranty. No peeling, no yellowing, no cracking.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ServiceFAQ title="PPF FAQs" faqs={faqs} />

      {/* Closing CTA */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">
              Get a film quote
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base text-background/60">
              Tell us the year, make and model and how you drive it. We will tell you exactly which coverage is
              worth the money.
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

      {/* Window Tinting */}
      <section id="tint" className="py-14 sm:py-20 bg-foreground scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background">
                Window Tinting
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-background/60">
                Carbon or ceramic IR — the price is the same either way, so pick on performance, not budget.
                Carbon for looks, privacy and UV. Ceramic IR when you want the cabin to actually stay cool.
              </p>
            </div>
          </ScrollReveal>

          <div
            role="tablist"
            aria-label="Film type"
            className="mx-auto mb-8 flex w-fit gap-1 rounded-full bg-background/10 p-1"
          >
            {TINT_FILMS.map((f) => (
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
            <p className="text-sm sm:text-base text-background/70">{activeFilm.blurb}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {activeFilm.points.map((p) => (
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
                  {money(t.price)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-xs text-background/50">
            Prices are for standard vehicles. Steep rear glass, coupes with wraparound windows and commercial
            vans are quoted after we see the car. Lifetime warranty against bubbling, peeling and colour change.
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

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
  );
};

export default PaintProtectionFilm;
