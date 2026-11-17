import { Link } from "react-router-dom";
import LandingPage from "@/components/site/LandingPage";
import { SYSTEMS } from "@/data/brand";
import {
  Section,
  SectionHeading,
  btnSecondary,
  cardClass,
} from "@/components/site/Section";
import heroImg from "@/assets/windshield-ppf-hero.jpg";
import {
  WINDSHIELD_PPF,
  WINDSHIELD_FILMS,
  WINDSHIELD_ULTRA_UPGRADE,
  fielddUrl,
  money,
} from "@/data/pricing";
import { WINDSHIELD_FILM_BRAND } from "@/data/copy";
import exoshieldLockup from "@/assets/brand-exoshield-lockup.svg";
import { Check } from "lucide-react";
import WindshieldDiagram from "@/components/ppf/WindshieldDiagram";
import PPFCraft from "@/components/ppf/PPFCraft";

const TEL = "tel:+15875004523";
const BOOK_LABEL = "Book online";
const from = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

const INVESTMENT = [
  {
    title: "Cheaper than a replacement.",
    body: "A new windshield plus recalibrating the cameras behind it can cost more than the film.",
  },
  {
    title: "Factory glass stays factory.",
    body: "You keep the original glass, fit and seal, which matters when you sell or trade in.",
  },
  {
    title: "You won't see it.",
    body: "The film is optically clear, so you look through it like the glass itself.",
  },
];

const termsText =
  "It takes most of the hits that would chip bare glass, but no film is unbreakable. A large or sharp impact can still get through. You'll find the details in section 8 of our Terms of Service.";

const faqs = [
  {
    q: "Will it stop every chip?",
    a: termsText,
    aNode: (
      <>
        It takes most of the hits that would chip bare glass, but no film is
        unbreakable. A large or sharp impact can still get through. You'll find
        the details in section 8 of our{" "}
        <Link
          to="/terms-of-service"
          className="font-semibold text-electric hover:underline"
        >
          Terms of Service
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I use my wipers and ice scraper?",
    a: "Yes to wipers. Keep the blades in good shape, since a torn blade can scratch the film. In winter, run the defroster first and use a plastic scraper gently, never a metal scraper. Skip glass cleaners with ammonia or alcohol.",
  },
  {
    q: "Does it work with rain sensors and windshield cameras?",
    a: `Yes. ${WINDSHIELD_FILM_BRAND} is made for modern windshields and doesn't block sensors, cameras or head-up displays. We check yours before we leave.`,
  },
  {
    q: "GT3+ or ULTRA?",
    a: `GT3+ suits most daily drivers. ULTRA is ExoShield's thickest film (8 mil) and adds ${money(WINDSHIELD_ULTRA_UPGRADE)} at any size. We recommend it for trucks, upright windshields like a Jeep, Bronco or van, and anyone on gravel roads every week.`,
  },
  {
    q: "Is there coverage if the glass still breaks?",
    a: "Yes, as an option. ExoShield's Glass Protection Warranty adds up to $1,000 toward a replacement windshield on a protected windshield. Ask for it when you book.",
  },
  {
    q: "What if my windshield already has a chip?",
    a: "Get it repaired first. The film doesn't fix existing damage, and it would seal the chip in underneath.",
  },
];

const WindshieldPPF = () => (
  <LandingPage
    quote={{ defaultNeed: "PPF/windshield film" }}
    childrenBeforeWork
    products={["exoshield"]}
    seo={{
      title:
        "ExoShield Windshield Protection Film Calgary | Certified Installer",
      description: `ExoShield GT3+ and ULTRA windshield protection film in Calgary from ${money(from)}, installed by a certified ExoShield installer at your home or work.`,
      canonical: "/windshield-ppf",
      serviceName: "Windshield Protection Film",
      serviceDescription:
        "ExoShield windshield protection film installed by a certified ExoShield installer in Calgary, Airdrie and surrounding areas.",
    }}
    hero={{
      eyebrow: "Certified ExoShield installer",
      title: "Fewer chips. Fewer windshields.",
      subtitle: `ExoShield nanoceramic windshield film for Alberta's gravel highways, installed for drivers in Calgary, Airdrie and surrounding areas. Part of ${SYSTEMS.protect.tm}.`,
      image: heroImg,
      ctaType: "book",
      bookLabel: BOOK_LABEL,
      bookHref: "#pricing",
      phoneHref: TEL,
    }}
    features={{
      title: "A safety upgrade",
      items: [
        {
          title: "Clear view, every drive.",
          body: "A chip in your line of sight scatters headlights at night and low sun in the morning. The film keeps the glass you look through intact.",
        },
        {
          title: "Keeps the glass doing its job.",
          body: "Your windshield is part of how your vehicle protects you in a crash. A crack weakens it, and the film helps stop the chip that starts one.",
        },
        {
          title: "Keeps your safety cameras calibrated.",
          body: "Lane-keeping and emergency-braking cameras sit behind the windshield. Keeping the factory glass means no replacement and no camera recalibration.",
        },
      ],
    }}
    steps={{
      title: "How it works",
      items: [
        {
          title: "Book online or call",
          body: "Tell us the year, make and model.",
        },
        {
          title: "We come to you",
          body: "Film needs a dry, sheltered spot above freezing, so in winter we'll book it in your garage or another covered space.",
        },
        {
          title: "We fit the film",
          body: "We clean the glass, fit the film and finish the edges, then check your cameras and rain sensor before we leave.",
        },
        {
          title: "Drive away the same day",
          body: "You drive away the same day. Wait 24 hours before washing the vehicle.",
        },
      ],
    }}
    faqs={{ title: "Windshield film questions", items: faqs }}
    related={[
      { label: "RV paint protection film", to: "/rv-trailer/ppf" },
      { label: "Ceramic coating", to: "/ceramic-paint-correction" },
      { label: "Headlight restoration", to: "/headlight-restoration" },
      { label: "Car detailing packages", to: "/detailing" },
    ]}
    closing={{
      title: "Protect your windshield before the next rock",
      body: `ExoShield from ${money(from)}, installed at your home or work by a certified installer.`,
      mode: "book",
      bookLabel: BOOK_LABEL,
      bookHref: "#pricing",
      phoneHref: TEL,
    }}
  >
    <Section tone="surface">
      <SectionHeading title="Protect the investment" />
      <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
        {INVESTMENT.map((f) => (
          <div key={f.title} className="border-t-2 border-ink pt-6">
            <dt className="font-heading text-lg font-semibold text-ink">
              {f.title}
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">
              {f.body}
            </dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section id="film">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <img
            src={exoshieldLockup}
            alt="ExoShield nanoceramic windshield protection film"
            width={904}
            height={178}
            className="h-auto w-64 sm:w-80"
          />
          <h2 className="mt-8 font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
            Pick your film
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            We're a certified ExoShield installer. Both films are custom-cut for
            your year, make and model, and we register the warranty for you.
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {WINDSHIELD_FILMS.map((f) => (
          <article
            key={f.id}
            className={`flex flex-col rounded-card border bg-surface p-6 sm:p-8 ${f.id === "ultra" ? "border-2 border-electric" : "border-line"}`}
          >
            <span
              className={`w-fit rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-label ${
                f.id === "ultra"
                  ? "bg-ink text-primary-foreground"
                  : "bg-electric/10 text-electric"
              }`}
            >
              {f.tag}
            </span>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-2xl font-bold leading-tight text-ink">
                {f.name}
              </h3>
              <span className="num text-xl text-ink">
                {f.upgrade ? `+${money(f.upgrade)}` : `from ${money(from)}`}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-ink-2">{f.bestFor}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              {f.body}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {f.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-10 grid items-center gap-8 rounded-2xl border border-line bg-card p-4 sm:p-6 lg:grid-cols-[1.2fr_1fr]">
        <WindshieldDiagram />
        <p className="text-[15px] leading-relaxed text-ink-2">
          Optional: ExoShield's Glass Protection Warranty adds up to $1,000
          toward a replacement windshield if the protected glass breaks. Ask for
          it when you book.
        </p>
      </div>
    </Section>

    <Section tone="surface" id="pricing">
      <SectionHeading title="Pricing by vehicle size" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WINDSHIELD_PPF.map((t) => (
          <div key={t.id} className={`${cardClass} flex flex-col p-6`}>
            <h3 className="font-heading text-lg font-semibold text-ink">
              {t.label}
            </h3>
            <p className="mt-1 text-sm text-muted-ink">{t.examples}</p>
            <dl className="mt-5 flex-1 divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between py-3">
                <dt className="text-sm font-semibold text-ink">GT3+</dt>
                <dd className="font-heading text-3xl font-semibold tabular-nums text-ink">
                  {money(t.price)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between py-3">
                <dt className="text-sm font-semibold text-ink">ULTRA</dt>
                <dd className="font-heading text-3xl font-semibold tabular-nums text-ink">
                  {money(t.price + WINDSHIELD_ULTRA_UPGRADE)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-muted-ink">
              Install time {t.installTime}
            </p>
            <a
              href={fielddUrl(t.book)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnSecondary} mt-6 self-start`}
            >
              {BOOK_LABEL}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-2">
        Booking online? Pick your size, then add the ULTRA upgrade at checkout.
        Heated, panoramic and oversized glass may carry a small surcharge,
        confirmed before we start.
      </p>
    </Section>

    <PPFCraft
      film="ExoShield film"
      filmBody={`ExoShield GT3+ or ULTRA, cut for your windshield: optically clear, built to absorb rock hits, and backed by ExoShield's 3-year limited warranty, which we register for you as a certified installer.`}
    />
  </LandingPage>
);

export default WindshieldPPF;
