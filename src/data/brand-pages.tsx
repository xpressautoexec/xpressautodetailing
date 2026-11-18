import type { ReactNode } from "react";
import { FILM_PRODUCTS, DQUARTZ_PACKAGES } from "@/data/protection-brands";
import { WHY_PPF, WHY_CERAMIC } from "@/data/why";
import type { WhyItem } from "@/components/site/WhyBand";
import type { QuoteNeed } from "@/components/QuoteForm";
import QuoteLink from "@/components/site/QuoteLink";
import heroPpfFront from "@/assets/jobs/card-car-mercedes-c-class.webp";
import heroRangeRover from "@/assets/jobs/ceramic-range-rover-headlight.webp";
import heroDquartz from "@/assets/jobs/hero-dquartz-water-beading.webp";
import heroTint from "@/assets/jobs/exterior-range-rover-three-quarter.webp";
import heroBmw from "@/assets/jobs/exterior-bmw-m340i-front.webp";
import heroCabin from "@/assets/jobs/interior-acura-cabin.webp";
import kitDquartz from "@/assets/carpro/kit-dquartz.webp";
import kitFinestReserve from "@/assets/carpro/kit-cquartz-finest-reserve.webp";

export type BrandProduct = { name: string; description: string; benefits: readonly string[]; href?: string };
export type BrandPage = {
  path: string;
  seo: { title: string; description: string; serviceName: string };
  hero: { eyebrow: string; title: string; subtitle: string; image: string; imageAlt: string; imagePosition?: string };
  h1: string;
  /** Plain standalone first sentence: matches the meta description. */
  lead: string;
  intro: string[];
  questions: { q: string; a: string }[];
  productsTitle: string;
  products: readonly BrandProduct[];
  extra?: ReactNode;
  why: { subject: string; intro: string; apart: string; items: WhyItem[] };
  quoteTitle: string;
  quoteNeed?: QuoteNeed;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  pathways: { title: string; body: string; href: string }[];
  official?: { label: string; href: string };
  footnotes: string[];
};

const WARRANTY_NOTE = "Film and coating warranties are set by the manufacturer. Certain restrictions apply; ask us for the terms on your product.";
const TRADEMARKS = "SunTek® and CARPRO® are trademarks of their respective owners.";

const PPF_FAQS = [
  { q: "How much does paint protection film cost in Calgary?", a: "It depends on the vehicle, the film and the coverage: a partial front, a full front or the whole car. Send three photos through the quote form and we will send an exact price for your vehicle." },
  { q: "How long does PPF last?", a: "Premium SunTek films are built to last for years and carry a manufacturer warranty. Washing and care affect how long it looks its best, and we walk you through that at pickup." },
  { q: "Can I put ceramic coating on top of PPF?", a: "Yes. Coating the film makes it easier to wash and adds gloss. Some films already have a hydrophobic topcoat, so we will tell you whether it is worth it on yours." },
  { q: "Will PPF damage my paint if it is removed?", a: "Quality film installed on healthy factory paint is designed to come off cleanly. Repainted or damaged paint is a different case, and we check it before we install." },
];


export const SUNTEK_PPF: BrandPage = {
  path: "/paint-protection-film/suntek",
  seo: {
    title: "SunTek PPF Calgary | Authorized SunTek Installer | Xpress",
    description: "SunTek Reaction, Ultra, Ultra Matte and Ultra Defense PPF installed in Calgary by an authorized SunTek installer, at our Airdrie shop.",
    serviceName: "SunTek Paint Protection Film",
  },
  hero: {
    eyebrow: "Authorized SunTek installer",
    title: "SunTek PPF",
    subtitle: "Self-healing paint protection film that takes the rock chips, gravel and road salt so your paint does not. Installed in Calgary, Airdrie and surrounding areas.",
    image: heroPpfFront,
    imageAlt: "White Mercedes-Benz C-Class front end",
  },
  h1: "SunTek® Paint Protection Film in Calgary",
  lead: "SunTek paint protection film from Xpress is SunTek PPF installed by an authorized SunTek installer, mobile across Calgary or in our heated Airdrie shop.",
  intro: [
    "SunTek film is a clear, self-healing layer that guards your factory paint against rock chips, surface scratches, bird droppings and road debris while keeping the original finish looking new.",
  ],
  questions: [
    { q: "Is SunTek PPF worth it in Calgary?", a: "If you drive the Deerfoot, Stoney Trail or Highway 2, gravel and winter grit are a daily hit on your hood and bumper. Film costs far less than a repaint and keeps the factory paint intact for resale." },
    { q: "How much does SunTek PPF cost?", a: "Price depends on your vehicle, the film you pick and the coverage: partial front, full front or full body. Send photos through the quote form for an exact number." },
    { q: "How long does it last?", a: "SunTek films are built to last for years and carry a manufacturer's limited warranty. We explain the warranty and care at pickup." },
  ],
  productsTitle: "The SunTek films we install",
  products: FILM_PRODUCTS.suntek.products,
  why: WHY_PPF,
  quoteTitle: "Get a SunTek PPF quote",
  quoteNeed: "PPF/windshield film",
  faqTitle: "SunTek PPF questions",
  faqs: PPF_FAQS,
  pathways: [
    { title: "Add windshield film", body: "ExoShield GT3+ windshield film, from $479 CAD.", href: "/windshield-ppf" },
    { title: "Add ceramic coating", body: "Coat the rest of the car with CARPRO DQUARTZ.", href: "/ceramic-coating/carpro-dquartz" },
  ],
  official: { label: "See SunTek's official PPF line-up", href: FILM_PRODUCTS.suntek.official },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

/** Hidden for now: /paint-protection-film/llumar redirects to SunTek. Kept so it can be switched back on. */
export const LLUMAR_PPF: BrandPage = {
  path: "/paint-protection-film/llumar",
  seo: {
    title: "LLumar PPF Calgary | Authorized LLumar Installer | Xpress",
    description: "LLumar paint protection film installed in Calgary by an authorized LLumar installer: Valor, Platinum Gloss, Platinum Matte and Platinum Extra.",
    serviceName: "LLumar Paint Protection Film",
  },
  hero: {
    eyebrow: "Authorized LLumar installer",
    title: "LLumar PPF",
    subtitle: "Protect and enhance your vehicle's finish with LLumar paint protection film, in gloss or matte. Installed in Calgary, Airdrie and surrounding areas.",
    image: heroRangeRover,
    imageAlt: "Range Rover headlight after paint protection",
  },
  h1: "LLumar® Paint Protection Film in Calgary",
  lead: "LLumar paint protection film from Xpress is LLumar PPF installed by an authorized LLumar installer, mobile across Calgary or in our heated Airdrie shop.",
  intro: [
    "LLumar film is self-healing, extensively tested and backed by a factory warranty, with gloss, matte and 2-in-1 films that combine protection with easier washing.",
  ],
  questions: [
    { q: "Is LLumar PPF worth it in Calgary?", a: "Flying gravel, salt, sand and bird droppings are a year-round fact of Alberta driving. Film absorbs the damage, and a fresh panel of film costs far less than paint." },
    { q: "How much does LLumar PPF cost?", a: "It depends on the vehicle, the film and the coverage. Send photos through the quote form and we will send an exact price." },
    { q: "Which LLumar film should I pick?", a: "Valor for the easiest washing, Platinum Gloss for a factory look, Platinum Matte for flat paint, and Platinum Extra for gravel roads and heavy use." },
  ],
  productsTitle: "The LLumar films we install",
  products: FILM_PRODUCTS.llumar.products,
  why: WHY_PPF,
  quoteTitle: "Get a LLumar PPF quote",
  quoteNeed: "PPF/windshield film",
  faqTitle: "LLumar PPF questions",
  faqs: PPF_FAQS,
  pathways: [
    { title: "Compare with SunTek PPF", body: "Reaction, Ultra, Ultra Matte and Ultra Defense.", href: "/paint-protection-film/suntek" },
    { title: "Add windshield film", body: "ExoShield GT3+ windshield film, from $479 CAD.", href: "/windshield-ppf" },
  ],
  official: { label: "See LLumar's official PPF line-up", href: FILM_PRODUCTS.llumar.official },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

const DQuartzExtra = () => (
  <section className="section-y bg-canvas" id="compare" aria-labelledby="compare-title">
    <div className="shell">
      <h2 id="compare-title" className="display-xl !text-[clamp(30px,3.4vw,52px)]">
        How DQUARTZ compares
      </h2>
      <div className="mt-10 overflow-x-auto rounded-[16px] border border-line">
        <table className="w-full min-w-[560px] text-left text-base">
          <thead className="bg-tint">
            <tr>
              <th className="p-5 font-semibold text-ink"> </th>
              <th className="p-5 font-semibold text-ink">Standard ceramic</th>
              <th className="p-5 font-semibold text-action">CARPRO DQUARTZ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {[
              ["Swirl resistance", "Good", "Better: nano-diamond reinforced"],
              ["Gloss", "High", "High"],
              ["Water beading", "Yes", "Yes"],
              ["Salt and chemical resistance", "Good", "Strong"],
              ["Maintenance", "Regular hand washes", "Regular hand washes, easier release"],
            ].map(([row, a, b]) => (
              <tr key={row}>
                <th className="p-5 font-semibold text-ink">{row}</th>
                <td className="p-5 text-ink-2">{a}</td>
                <td className="p-5 text-ink">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {DQUARTZ_PACKAGES.map((p, i) => (
          <div key={p.name} className="rounded-[16px] bg-tint p-8 shadow-[var(--shadow-card)] sm:p-10">
            <img
              src={i === 0 ? kitDquartz : kitFinestReserve}
              alt={i === 0 ? "CARPRO DQUARTZ coating kit" : "CARPRO CQUARTZ Finest Reserve coating kit"}
              className="mb-6 h-40 w-auto object-contain"
              loading="lazy"
            />
            <h3 className="text-[26px] font-semibold text-ink">{p.name}</h3>
            <p className="mt-2 text-base font-semibold text-action">{p.priceLabel}</p>
            <ul className="mt-5 space-y-2">
              {p.includes.map((i) => (
                <li key={i} className="flex gap-2 text-base text-ink-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <QuoteLink className="pill-action mt-8 inline-flex bg-action text-primary-foreground hover:bg-ink">Get a quote</QuoteLink>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const DQUARTZ: BrandPage = {
  path: "/ceramic-coating/carpro-dquartz",
  seo: {
    title: "CARPRO DQUARTZ Ceramic Coating Calgary",
    description: "CARPRO DQUARTZ nano-diamond ceramic coating in Calgary, installed by an authorized CARPRO installer after paint prep and correction. Get a quote.",
    serviceName: "CARPRO DQUARTZ Ceramic Coating",
  },
  hero: {
    eyebrow: "Authorized CARPRO installer",
    title: "CARPRO DQUARTZ",
    subtitle: "Our flagship coating: ceramic protection reinforced with synthetic nano-diamonds, built to resist wash swirls. Installed in Calgary, Airdrie and surrounding areas.",
    image: heroDquartz,
    imageAlt: "Water beading on a freshly coated white hood",
  },
  h1: "CARPRO DQUARTZ Nano-Diamond Ceramic Coating in Calgary",
  lead: "CARPRO DQUARTZ from Xpress is a ceramic coating reinforced with synthetic nano-diamonds, installed by an authorized CARPRO installer in Calgary and Airdrie.",
  intro: [
    "DQUARTZ is built to resist the fine swirls and light scratches that washing leaves behind, on top of the gloss, water beading, UV, road-salt and chemical resistance you expect from a professional coating.",
    "A coating will not stop rock chips. For chips, pair it with SunTek paint protection film on the front end.",
  ],
  questions: [
    { q: "Why it matters in Calgary", a: "Road salt, mag chloride, gravel dust and hard water all attack clear coat. A hard, slick coating means less sticks, and what does comes off with a gentle wash." },
    { q: "Is DQUARTZ worth it over a standard coating?", a: "If your car goes through a lot of washes, the added swirl resistance is the difference you will notice. We will tell you honestly whether your car needs it." },
    { q: "How long does DQUARTZ last?", a: "On its own it is a 2-year coating. We top it with CARPRO Finest Reserve, which takes the system to 5+ years with proper washing and care." },
  ],
  productsTitle: "",
  products: [],
  extra: <DQuartzExtra />,
  why: WHY_CERAMIC,
  quoteTitle: "Get a DQUARTZ quote",
  quoteNeed: "Paint correction/ceramic",
  faqTitle: "DQUARTZ questions",
  faqs: [
    { q: "How long does DQUARTZ last?", a: "About 2 years on its own. With a Finest Reserve top layer, as we install it, 5+ years with proper care." },
    { q: "Is DQUARTZ worth it in a Calgary winter?", a: "Yes for most daily drivers. Salt and slush release more easily from a coated surface, so winter washes are faster and gentler on the paint." },
    { q: "DQUARTZ or PPF?", a: "They do different jobs. PPF stops rock chips; DQUARTZ resists swirls and makes washing easier. Many owners put film on the front and coat the rest." },
    { q: "Can I take a coated car through a car wash?", a: "Touchless washes are fine. Brush washes cause the swirls a coating is meant to resist, so hand washing is best." },
    { q: "Does DQUARTZ have real diamonds in it?", a: "No. It uses synthetic nano-diamonds bonded into the coating. It is not as hard as diamond and it is not scratch-proof, but it resists wash swirls better than a standard coating." },
  ],
  pathways: [
    { title: "See packages and book", body: "Our hardness package: DQUARTZ topped with Finest Reserve. Prices by vehicle size.", href: "/ceramic-coating#packages" },
    { title: "Aftercare with Xpress Pass", body: "Maintenance washes that keep the coating performing.", href: "/xpress-pass" },
    { title: "Add front-end PPF", body: "Stop rock chips with SunTek film.", href: "/paint-protection-film" },
  ],
  official: { label: "See CARPRO's DQUARTZ coating", href: "https://carpro.global/products/category/protect/0" },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

