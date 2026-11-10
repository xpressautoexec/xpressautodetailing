import LpShell from "@/components/lp/LpShell";
import { LpClose, LpHeading, LpHero, LpProof, LpTrust, lpCta } from "@/components/lp/LpBlocks";
import LpReceipts from "@/components/lp/LpReceipts";
import QuoteForm from "@/components/QuoteForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import { AUTO_PACKAGES, FIVE_STAR_REVIEWS, SEASON_STATS, VEHICLE_SIZES, money } from "@/data/pricing";
import { COVERAGE, WATER_LINE } from "@/data/copy";
import small from "@/assets/lp/interior-640.webp";
import large from "@/assets/lp/interior-1050.webp";

const CTA = "Get my price";
const PKGS = ["refresh", "showroom"].map((id) => AUTO_PACKAGES.find((p) => p.id === id)!);
const deep = PKGS[1];

const faqs = [
  {
    q: "Will the salt stains actually come out?",
    a: `${deep.name} and the ${deep.interiorOnly!.name} include salt stain removal and deep extraction of the carpets and mats. Fresh winter salt lines come out; very old, set-in stains can lighten rather than disappear completely.`,
  },
  { q: "Do you need my water or power?", a: WATER_LINE },
  {
    q: "How long does it take?",
    a: PKGS.map((p) => `${p.name}: ${p.duration} (interior only ${p.interiorOnly!.duration})`).join(". ") + ".",
  },
  {
    q: "Can you do interiors in the middle of winter?",
    a: "Yes. Interiors run year-round, in your garage or parkade, or drop the vehicle at our heated Airdrie shop.",
  },
];

/** Paid-ad landing page: winter interior detailing. */
const InteriorLp = () => (
  <LpShell
    title="Winter Interior Detailing Calgary | Salt Stain Removal"
    description="Salt stains extracted from carpets and mats, done in your driveway or at our heated Airdrie shop. Published prices, price by text."
    canonical="/lp/interior-detailing"
  >
    <LpHero
      eyebrow="Calgary salt season"
      title="Get the salt out of your interior — without leaving your driveway."
      sub="Carpets and mats extracted, not just vacuumed, so the white tide lines come out instead of drying back in. Our vans bring their own water and power."
      points={[
        "Salt stain removal and deep extraction included",
        "In your driveway, parkade or office lot, or at our heated Airdrie shop",
        "Price by text, usually within 15 minutes during the day",
      ]}
      image={{ small, large, alt: "Ford F-150 rear floor with the bench flipped up after vacuum and shampoo" }}
      form={<QuoteForm source="lp-interior" title="Get your price" defaultNeed="Interior" submitLabel={CTA} />}
    />

    <LpProof
      items={[
        { strong: FIVE_STAR_REVIEWS, rest: "five-star Google reviews" },
        { strong: SEASON_STATS.cars, rest: "cars this season" },
        { strong: COVERAGE.replace(/ liability coverage$/, ""), rest: "liability coverage" },
        { strong: "Own", rest: "water and power on every van" },
      ]}
    />

    <section className="section-y bg-surface" aria-labelledby="pricing">
      <div className="shell">
        <LpHeading eyebrow="Published prices" title="Two packages. Priced by vehicle size." intro="Interior only, or inside and out. No call-for-pricing." />
        <div className="grid gap-4 lg:grid-cols-2">
          {PKGS.map((p) => (
            <article key={p.id} className="relative overflow-hidden rounded-card border border-line bg-surface">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-3xl font-bold text-ink">{p.name}</h3>
                  {p.popular && <span className="rounded-sm bg-electric-soft px-2 py-0.5 text-xs font-semibold text-electric">Best for salt season</span>}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.tagline}</p>
              </div>
              <table className="w-full border-t border-line text-left text-sm">
                <caption className="sr-only">{p.name} prices</caption>
                <thead className="bg-tint text-muted-ink">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium sm:px-8">Vehicle</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Interior only</th>
                    <th scope="col" className="px-6 py-3 text-right font-medium sm:px-8">Inside + out</th>
                  </tr>
                </thead>
                <tbody>
                  {VEHICLE_SIZES.map((v) => (
                    <tr key={v.id} className="border-t border-line">
                      <th scope="row" className="px-6 py-3.5 font-normal text-ink-2 sm:px-8">{v.label}</th>
                      <td className="num px-3 py-3.5 text-right text-lg text-ink">{money(p.interiorOnly!.price[v.id]!)}</td>
                      <td className="num px-6 py-3.5 text-right text-lg text-ink sm:px-8">{money(p.price[v.id]!)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="grid gap-2 border-t border-line p-6 text-sm text-ink-2 sm:grid-cols-2 sm:p-8">
                {p.interiorOnly!.includes.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <a href="#quote" className={`${lpCta} mt-8`}>
          {CTA}
        </a>
      </div>
    </section>

    <LpReceipts
      slugs={["ford-f150", "bmw-2-series-convertible", "cadillac-srx"]}
      title="Recent interiors"
      intro="Real jobs, shot on site by our crew."
    />

    <LpTrust />
    <ServiceFAQ title="Questions" faqs={faqs} />
    <LpClose title="Book the salt out this week" body="Send a few photos of the seats and carpets and we'll text you an exact price." cta={CTA} />
  </LpShell>
);

export default InteriorLp;
