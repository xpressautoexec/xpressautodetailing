import { Link } from "react-router-dom";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading, btnSecondary, cardClass } from "@/components/site/Section";
import heroImg from "@/assets/windshield-ppf-hero.jpg";
import { WINDSHIELD_PPF, fielddUrl, money } from "@/data/pricing";
import { WINDSHIELD_FILM_BRAND } from "@/data/copy";
import WindshieldDiagram from "@/components/ppf/WindshieldDiagram";
import PPFCraft from "@/components/ppf/PPFCraft";

const TEL = "tel:+15875004523";
const BOOK_LABEL = "Book windshield film";
const from = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

const INVESTMENT = [
  { title: "Cheaper than a replacement.", body: "A new windshield plus recalibrating the cameras behind it can cost more than the film." },
  { title: "Factory glass stays factory.", body: "You keep the original glass, fit and seal, which matters when you sell or trade in." },
  { title: "You won't see it.", body: "The film is optically clear, so you look through it like the glass itself." },
];

const termsText =
  "It takes most of the hits that would chip bare glass, but no film is unbreakable. A large or sharp impact can still get through. You'll find the details in section 8 of our Terms of Service.";

const faqs = [
  {
    q: "Will it stop every chip?",
    a: termsText,
    aNode: (
      <>
        It takes most of the hits that would chip bare glass, but no film is unbreakable. A large or sharp impact can
        still get through. You'll find the details in section 8 of our{" "}
        <Link to="/terms-of-service" className="font-semibold text-electric hover:underline">
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
    q: "What if my windshield already has a chip?",
    a: "Get it repaired first. The film doesn't fix existing damage, and it would seal the chip in underneath.",
  },
];

const WindshieldPPF = () => (
  <LandingPage
    childrenBeforeWork
    products={["exoshield"]}
    seo={{
      title: "Windshield Protection Film Calgary | Xpress Auto & RV Detailing",
      description:
        "ExoShield windshield protection film in Calgary from $449. Stops most rock chips, keeps safety cameras calibrated, installed at your home or work.",
      canonical: "/windshield-ppf",
      serviceName: "Windshield Protection Film",
      serviceDescription: `${WINDSHIELD_FILM_BRAND} windshield protection film installed at your home or work in Calgary and area.`,
    }}
    hero={{
      title: "Windshield protection film: stop rock chips before they crack",
      subtitle: `Alberta roads throw gravel all year, and one chip can spread into a crack across your line of sight. We fit ${WINDSHIELD_FILM_BRAND}, a clear film made for windshields, to the outside of your glass so it takes the hits instead. We come to your home or work anywhere in Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County.`,
      image: heroImg,
      ctaType: "book",
      bookLabel: BOOK_LABEL,
      bookHref: "#pricing",
      phoneHref: TEL,
    }}
    features={{
      title: "A safety upgrade, not a cosmetic one",
      items: [
        { title: "Clear view, every drive.", body: "A chip in your line of sight scatters headlights at night and low sun in the morning. The film keeps the glass you look through intact." },
        { title: "Keeps the glass doing its job.", body: "Your windshield is part of how your vehicle protects you in a crash. A crack weakens it, and the film helps stop the chip that starts one." },
        { title: "Keeps your safety cameras calibrated.", body: "Lane-keeping and emergency-braking cameras sit behind the windshield. Keeping the factory glass means no replacement and no camera recalibration." },
      ],
    }}
    steps={{
      title: "How it works",
      items: [
        { title: "Book online or call", body: "Tell us the year, make and model." },
        { title: "We come to you", body: "Film needs a dry, sheltered spot above freezing, so in winter we'll book it in your garage or another covered space." },
        { title: "We fit the film", body: "We clean the glass, fit the film and finish the edges, then check your cameras and rain sensor before we leave." },
        { title: "Drive away the same day", body: "You drive away the same day. Wait 24 hours before washing the vehicle." },
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
      body: `From ${money(from)}, installed at your home or work.`,
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
            <dt className="font-heading text-lg font-semibold text-ink">{f.title}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section>
      <SectionHeading title="The film" />
      <div className="mb-10 max-w-3xl rounded-2xl border border-line bg-card p-4 sm:p-6">
        <WindshieldDiagram />
      </div>
      <p className="max-w-3xl text-[15px] leading-relaxed text-ink-2">
        {WINDSHIELD_FILM_BRAND} windshield protection film, custom-cut for your year, make and model. {WINDSHIELD_FILM_BRAND} says
        it absorbs up to 6 times more impact than the windshield alone. It carries {WINDSHIELD_FILM_BRAND}'s 2-year / 50,000 km
        warranty against cracking, delamination, discoloration, hazing and yellowing. We register it for you.
      </p>
    </Section>

    <Section tone="surface" id="pricing">
      <SectionHeading title="Pricing by vehicle size" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WINDSHIELD_PPF.map((t) => (
          <div key={t.id} className={`${cardClass} flex flex-col p-6`}>
            <h3 className="font-heading text-lg font-semibold text-ink">{t.label}</h3>
            <p className="mt-2 font-heading text-4xl font-semibold tabular-nums text-ink">{money(t.price)}</p>
            <p className="mt-1 text-sm text-muted-ink">Install time {t.installTime}</p>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{t.examples}</p>
            <a href={fielddUrl(t.book)} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} mt-6 self-start`}>
              {BOOK_LABEL}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-2">
        Heated, panoramic and oversized glass may carry a small surcharge, confirmed before we start.
      </p>
    </Section>

    <PPFCraft
      film={WINDSHIELD_FILM_BRAND}
      filmBody={`${WINDSHIELD_FILM_BRAND} is made for windshields: optically clear, built to absorb rock hits, and backed by a 2-year / 50,000 km warranty we register for you.`}
    />
  </LandingPage>
);

export default WindshieldPPF;
