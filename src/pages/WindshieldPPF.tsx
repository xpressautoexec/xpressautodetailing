import { Link } from "react-router-dom";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading } from "@/components/site/Section";
import heroImg from "@/assets/windshield-ppf-hero.jpg";
import {
  WINDSHIELD_PPF,
  WINDSHIELD_REPLACEMENT_COSTS,
  WINDSHIELD_ULTRA_UPGRADE,
  money,
} from "@/data/pricing";
import { WINDSHIELD_FILM_BRAND } from "@/data/copy";
import exoshieldLockup from "@/assets/brand-exoshield-lockup.svg";
import ManufacturerWarranty from "@/components/site/ManufacturerWarranty";
import WindshieldPackages from "@/components/ppf/WindshieldPackages";
import PPFCraft from "@/components/ppf/PPFCraft";
import { ArrowUpRight } from "lucide-react";

const TEL = "tel:+15875004523";
const BOOK_LABEL = "Book online";
const from = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

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
    childrenFirst
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
      title: "It pays for itself on the drive home.",
      subtitle: `ExoShield windshield film from ${money(from)} CAD, installed at your home or work in Calgary, Airdrie and surrounding areas. One rock is a $900 to $1,400 windshield once the cameras are recalibrated.`,
      image: heroImg,
      ctaType: "book",
      bookLabel: "See packages",
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
    <Section id="pricing">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-3">Certified ExoShield installer</p>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-5xl">
            Pick your film.
          </h2>
        </div>
        <img
          src={exoshieldLockup}
          alt="ExoShield nanoceramic windshield protection film"
          width={904}
          height={178}
          className="h-auto w-52 sm:w-64"
        />
      </div>
      <WindshieldPackages />
    </Section>

    <Section tone="surface" id="cost">
      <SectionHeading eyebrow="The math" title="One rock. Four figures." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
        <div className="flex flex-col overflow-hidden rounded-card border-2 border-electric bg-canvas">
          <div className="border-b border-line p-6">
            <p className="text-xs font-semibold uppercase tracking-label text-muted-ink">
              New windshield + calibration
            </p>
            <p className="mt-2 font-heading text-3xl font-bold tabular-nums text-muted-ink line-through decoration-2">
              $900–$1,820
            </p>
          </div>
          <div className="flex-1 bg-electric p-6 text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-label text-primary-foreground/80">
              ExoShield GT3+
            </p>
            <p className="mt-2 flex items-end gap-2">
              <span className="num text-6xl leading-none">{money(from)}</span>
              <span className="pb-1 text-sm font-semibold text-primary-foreground/80">
                CAD
              </span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-primary-foreground/90">
              Stop the one rock that would have cracked it and the film has paid
              for itself, with your factory glass and camera calibration
              untouched.
            </p>
            <a
              href="#pricing"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary-foreground px-6 text-sm font-semibold text-ink transition-colors hover:bg-primary-foreground/90"
            >
              Protect my windshield
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-card border border-line bg-canvas">
          <table className="w-full text-left">
            <caption className="sr-only">
              What a windshield replacement costs, in Canadian dollars
            </caption>
            <thead className="border-b border-line bg-tint text-xs font-semibold uppercase tracking-label text-muted-ink">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Replacement
                </th>
                <th scope="col" className="px-5 py-3 text-right">
                  Cost (CAD)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {WINDSHIELD_REPLACEMENT_COSTS.map((c) => (
                <tr key={c.what}>
                  <td className="px-5 py-4 align-top">
                    <p className="text-[15px] font-semibold text-ink">
                      {c.what}
                    </p>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline hover:underline-offset-4"
                    >
                      {c.source}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </td>
                  <td className="px-5 py-4 text-right align-top">
                    <p className="num whitespace-nowrap text-2xl text-ink">
                      {c.cad}
                    </p>
                    {"note" in c && (
                      <p className="mt-0.5 text-xs text-muted-ink">{c.note}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-line px-5 py-3 text-xs leading-relaxed text-muted-ink">
            Published prices and quotes, checked November 2026. US prices
            converted at 1.36 CAD per US dollar. No film is unbreakable; a large
            or sharp impact can still get through.
          </p>
        </div>
      </div>
    </Section>

    <Section id="warranty">
      <SectionHeading title="Backed by ExoShield, registered by us" />
      <ManufacturerWarranty brand="exoshield" />
    </Section>

    <PPFCraft
      film="ExoShield film"
      filmBody={`ExoShield GT3+ or ULTRA, cut for your windshield: optically clear, built to absorb rock hits, and backed by ExoShield's 3-year limited warranty, which we register for you as a certified installer.`}
    />
  </LandingPage>
);

export default WindshieldPPF;
