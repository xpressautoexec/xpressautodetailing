import LpShell from "@/components/lp/LpShell";
import { LpClose, LpHeading, LpHero, LpProof, LpTrust, lpCta } from "@/components/lp/LpBlocks";
import LpReceipts from "@/components/lp/LpReceipts";
import QuoteForm from "@/components/QuoteForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import { CAR_PPF, CERAMIC_PACKAGES, FIVE_STAR_REVIEWS, PPF_UPCHARGE, WINDSHIELD_PPF, money } from "@/data/pricing";
import { FILM_BRAND, SHOP, WINDSHIELD_FILM_BRAND } from "@/data/copy";
import small from "@/assets/lp/ceramic-640.webp";
import large from "@/assets/lp/ceramic-1050.webp";

const CTA = "Get a quote";
const from = (n: number) => `From ${money(n)}`;

const faqs = [
  {
    q: "Why is this done in the shop?",
    a: `Coatings and film need a warm, dry, clean bay to cure and stick properly, which a Calgary driveway can't give you for most of the year. Drop the vehicle at our heated shop at ${SHOP.full}.`,
  },
  {
    q: "What film and coatings do you use?",
    a: `${FILM_BRAND} paint protection film, and ${WINDSHIELD_FILM_BRAND} on windshields (backed by ${WINDSHIELD_FILM_BRAND}'s 2-year / 50,000 km warranty). We're an authorized System X installer; coatings are registered with the manufacturer.`,
  },
  {
    q: "How long will I be without the car?",
    a: `Paint protection film takes ${CAR_PPF[0].time} for front coverage and ${CAR_PPF[CAR_PPF.length - 1].time} for a full vehicle. Windshield film takes ${WINDSHIELD_PPF[0].installTime}.`,
  },
  {
    q: "Is the price on the page the price I pay?",
    a: `Prices are for a car or small SUV. Trucks and large SUVs are ${PPF_UPCHARGE.truckSuvPct}% more for film, exotics ${PPF_UPCHARGE.exoticPct}% more. Your price is confirmed before we start.`,
  },
];

const Card = ({ title, brand, rows, note }: { title: string; brand: string; rows: [string, string, string?][]; note?: string }) => (
  <article className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
    <div className="border-b border-line p-6 sm:p-7">
      <p className="eyebrow">{brand}</p>
      <h3 className="mt-2 font-heading text-3xl font-bold leading-tight text-ink">{title}</h3>
    </div>
    <ul className="flex-1">
      {rows.map(([name, price, sub]) => (
        <li key={name} className="flex items-baseline justify-between gap-4 border-b border-line px-6 py-4 last:border-b-0 sm:px-7">
          <span>
            <span className="font-semibold text-ink">{name}</span>
            {sub && <span className="block text-xs text-muted-ink">{sub}</span>}
          </span>
          <span className="num shrink-0 text-xl text-ink">{price}</span>
        </li>
      ))}
    </ul>
    {note && <p className="border-t border-line bg-tint px-6 py-3 text-xs text-muted-ink sm:px-7">{note}</p>}
  </article>
);

/** Paid-ad landing page: ceramic, PPF and windshield film at the Airdrie shop. */
const CeramicPpfLp = () => (
  <LpShell
    title="Ceramic Coating, PPF & Windshield Film | Airdrie Shop"
    description="Paint correction and ceramic coating, 3M Scotchgard Pro paint protection film and ExoShield windshield film, done indoors at our heated Airdrie shop."
    canonical="/lp/ceramic-ppf"
  >
    <LpHero
      eyebrow={`Heated shop · ${SHOP.city}`}
      title="Ceramic, PPF and windshield film, done indoors in Airdrie."
      sub="Paint correction and ceramic coating, clear paint protection film and windshield film, installed in a warm, clean bay. Drop it off; we'll text you when it's ready."
      points={[
        "Authorized System X installer",
        `${FILM_BRAND} paint film · ${WINDSHIELD_FILM_BRAND} windshield film`,
        "Add photos for an exact quote by text",
      ]}
      image={{ small, large, alt: "White Mercedes-AMG GLE headlight after paint correction and System X ceramic coating" }}
      form={
        <QuoteForm
          source="lp-ceramic-ppf"
          title="Get your price"
          defaultNeed="Paint correction/ceramic"
          defaultLocation="shop"
          submitLabel={CTA}
        />
      }
    />

    <LpProof
      items={[
        { strong: FIVE_STAR_REVIEWS, rest: "five-star Google reviews" },
        { strong: "System X", rest: "authorized installer" },
        { strong: "3M", rest: "Scotchgard Pro paint film" },
        { strong: "Heated", rest: `indoor bay in ${SHOP.city}` },
      ]}
    />

    <section className="section-y bg-surface">
      <div className="shell">
        <LpHeading
          eyebrow="Published prices"
          title="Three ways to protect it"
          intro="Car or small SUV prices shown. Not sure which one? Send photos and tell us how long you're keeping it."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card
            title="Paint correction + ceramic"
            brand="System X · authorized installer"
            rows={CERAMIC_PACKAGES.map((p) => [p.name, from(p.price), `${p.correction} · ${p.coating}`])}
          />
          <Card
            title="Paint protection film"
            brand={FILM_BRAND}
            rows={CAR_PPF.map((p) => [p.name, from(p.price), p.covers.slice(0, 2).join(", ")])}
            note={`Trucks and large SUVs +${PPF_UPCHARGE.truckSuvPct}%, exotics +${PPF_UPCHARGE.exoticPct}%.`}
          />
          <Card
            title="Windshield film"
            brand={WINDSHIELD_FILM_BRAND}
            rows={WINDSHIELD_PPF.map((w) => [w.label, money(w.price), `${w.installTime} · ${w.examples}`])}
            note={`Backed by ${WINDSHIELD_FILM_BRAND}'s 2-year / 50,000 km warranty.`}
          />
        </div>
        <a href="#quote" className={`${lpCta} mt-8`}>
          {CTA}
        </a>
      </div>
    </section>

    <LpReceipts slugs={["mercedes-amg-gle"]} title="Recent protection work" />

    <LpTrust />
    <ServiceFAQ title="Questions" faqs={faqs} />
    <LpClose
      title="Book a bay in Airdrie"
      body="Send a few daylight photos of the paint and we'll text you an exact price and the next open drop-off."
      cta={CTA}
    />
  </LpShell>
);

export default CeramicPpfLp;
