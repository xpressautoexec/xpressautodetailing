import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO from "@/components/SEO";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import giftcardHero from "@/assets/jobs/hero-gift-cards.webp";
import { AUTO_PACKAGES, CERAMIC_PACKAGES, GIFT_CARD_TIERS, money } from "@/data/pricing";
import { NAP } from "@/data/copy";

const pkg = (id: string) => AUTO_PACKAGES.find((p) => p.id === id)!;
const minCard = Math.min(...GIFT_CARD_TIERS);
const maxCard = Math.max(...GIFT_CARD_TIERS);
const ceramicFrom = Math.min(...CERAMIC_PACKAGES.map((p) => p.price));

/** Each suggestion covers a real package at its sedan price. Sizes above sedan cost a little more. */
const SUGGESTIONS = [
  {
    title: pkg("refresh").name,
    covers: pkg("refresh").price.sedan,
    body: "A full interior and exterior reset for a car that's been lived in for a few months.",
  },
  {
    title: pkg("showroom").name,
    covers: pkg("showroom").price.sedan,
    body: "Deep extraction, salt stain removal and a ceramic spray sealant. Our most booked package.",
  },
  {
    title: "Ceramic coating",
    covers: ceramicFrom,
    body: "Decontamination, machine correction and a coating that lasts years, not weeks.",
  },
];

const faqs = [
  {
    q: "How is the gift card delivered?",
    a: "Digitally, by email, as soon as you check out. You can send it to yourself to print or forward, or straight to the recipient.",
  },
  {
    q: "What can it be used for?",
    a: "Any service we offer: car detailing packages, add-ons, ceramic coating, RV and marine work and windshield film. If the service costs more than the card, they pay the difference.",
  },
  {
    q: "Does it expire?",
    a: "No. Dollar-value gift cards in Alberta can't carry an expiry date, and there are no fees to use them.",
  },
  {
    q: "Can I buy a custom amount or several cards for a team?",
    a: `Yes. For custom amounts or corporate gifts, call or text ${NAP.phone} or email ${NAP.email}.`,
  },
];

const GiftCards = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Detailing Gift Cards Calgary"
        description={`Mobile car detailing gift cards in Calgary from ${money(minCard)}. Delivered by email instantly and redeemable for any Xpress service.`}
        canonical="/gift-cards"
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Detailing gift cards"
        subtitle={`From ${money(minCard)} to ${money(maxCard)}, delivered by email the moment you check out. Good for any service, and they never expire.`}
        image={giftcardHero}
      />

      <Section>
        <SectionHeading
          title="What a card covers"
          intro="Starting prices for a sedan or coupe. SUVs, pickups and 3-row vehicles cost a little more, and any difference is paid at the appointment."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {SUGGESTIONS.map((s) => (
            <article key={s.title} className={`${cardClass} p-6`}>
              <h3 className="font-heading text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 font-heading text-3xl font-semibold tabular-nums text-ink">{money(s.covers)}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface" id="buy">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Buy a gift card</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-2">
              Pick an amount and check out. Preset amounts are {GIFT_CARD_TIERS.map((t) => money(t)).join(", ")}.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
              Buying for a team or want a custom amount? Call or text{" "}
              <a href={NAP.phoneHref} className="font-semibold text-ink hover:text-electric">
                {NAP.phone}
              </a>
              .
            </p>
          </div>
          <iframe
            src="https://xpressauto.fieldd.co/gift-cards/purchase"
            title="Buy an Xpress Auto & RV Detailing gift card"
            loading="lazy"
            className={`${cardClass} block w-full`}
            style={{ height: "max(760px, 80vh)" }}
          />
        </div>
      </Section>

      <ServiceFAQ title="Gift card questions" faqs={faqs} />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default GiftCards;
