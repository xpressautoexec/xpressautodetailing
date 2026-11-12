import type { ReactNode } from "react";
import { FILM_PRODUCTS, DQUARTZ_PACKAGES } from "@/data/protection-brands";
import { WHY_PPF, WHY_CERAMIC, WHY_TINT } from "@/data/why";
import type { WhyItem } from "@/components/site/WhyBand";
import type { QuoteNeed } from "@/components/QuoteForm";
import QuoteLink from "@/components/site/QuoteLink";
import heroPorsche from "@/assets/jobs/exterior-porsche-macan-front.webp";
import heroRangeRover from "@/assets/jobs/ceramic-range-rover-headlight.webp";
import heroCeramic from "@/assets/jobs/hero-ceramic-coating.webp";
import heroTint from "@/assets/jobs/exterior-range-rover-three-quarter.webp";
import heroBmw from "@/assets/jobs/exterior-bmw-m340i-front.webp";
import heroCabin from "@/assets/jobs/interior-acura-cabin.webp";

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
const TRADEMARKS = "SunTek®, LLumar® and CARPRO® are trademarks of their respective owners.";

const PPF_FAQS = [
  { q: "How much does paint protection film cost in Calgary?", a: "It depends on the vehicle, the film and the coverage: a partial front, a full front or the whole car. Text us three photos and we will send an exact price for your vehicle." },
  { q: "How long does PPF last?", a: "Premium SunTek and LLumar films are built to last for years and carry a manufacturer warranty. Washing and care affect how long it looks its best, and we walk you through that at pickup." },
  { q: "Can I put ceramic coating on top of PPF?", a: "Yes. Coating the film makes it easier to wash and adds gloss. Some films already have a hydrophobic topcoat, so we will tell you whether it is worth it on yours." },
  { q: "Will PPF damage my paint if it is removed?", a: "Quality film installed on healthy factory paint is designed to come off cleanly. Repainted or damaged paint is a different case, and we check it before we install." },
];

const TINT_FAQS = [
  { q: "How dark can you legally tint windows in Alberta?", a: "Alberta restricts film on the windshield and the front side windows. Rear side windows and the back glass can usually go darker. We will tell you what is allowed on your vehicle before we install." },
  { q: "Is ceramic window tint worth it in Calgary?", a: "Ceramic film rejects more heat than basic dyed film without metal in it, so it will not interfere with phone, GPS or radio signals. In a Calgary summer with long daylight hours, most drivers notice the cabin is cooler." },
  { q: "How long does window tint take?", a: "Most cars take a few hours. We will give you a time with your quote." },
  { q: "How soon can I roll my windows down?", a: "Give the film a few days to cure before rolling the windows down. We will give you the exact aftercare for your film." },
];

export const SUNTEK_PPF: BrandPage = {
  path: "/paint-protection-film/suntek",
  seo: {
    title: "SunTek PPF Calgary | Authorized SunTek Installer | Xpress",
    description: "SunTek paint protection film installed in Calgary by an authorized SunTek installer: Reaction, Ultra, Ultra Matte and Ultra Defense, mobile or in our Airdrie shop.",
    serviceName: "SunTek Paint Protection Film",
  },
  hero: {
    eyebrow: "Authorized SunTek installer",
    title: "SunTek PPF",
    subtitle: "Self-healing paint protection film that takes Calgary's rock chips, gravel and road salt so your paint does not.",
    image: heroPorsche,
    imageAlt: "White Porsche Macan front end",
  },
  h1: "SunTek® Paint Protection Film in Calgary",
  lead: "SunTek paint protection film from Xpress is SunTek PPF installed by an authorized SunTek installer, mobile across Calgary or in our heated Airdrie shop.",
  intro: [
    "SunTek film is a clear, self-healing layer that guards your factory paint against rock chips, surface scratches, bird droppings and road debris while keeping the original finish looking new.",
  ],
  questions: [
    { q: "Is SunTek PPF worth it in Calgary?", a: "If you drive the Deerfoot, Stoney Trail or Highway 2, gravel and winter grit are a daily hit on your hood and bumper. Film costs far less than a repaint and keeps the factory paint intact for resale." },
    { q: "How much does SunTek PPF cost?", a: "Price depends on your vehicle, the film you pick and the coverage: partial front, full front or full body. Text us photos for an exact number." },
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
    { title: "Compare with LLumar PPF", body: "Valor, Platinum Gloss, Platinum Matte and Platinum Extra.", href: "/paint-protection-film/llumar" },
    { title: "Add ceramic coating", body: "Coat the rest of the car with CARPRO DQUARTZ.", href: "/ceramic-coating/carpro-dquartz" },
  ],
  official: { label: "See SunTek's official PPF line-up", href: FILM_PRODUCTS.suntek.official },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

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
    subtitle: "Protect and enhance your vehicle's finish with LLumar paint protection film, in gloss or matte.",
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
    { q: "How much does LLumar PPF cost?", a: "It depends on the vehicle, the film and the coverage. Text us photos and we will send an exact price." },
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
    { title: "Add window tint", body: "LLumar and SunTek window film.", href: "/window-tint" },
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
        {DQUARTZ_PACKAGES.map((p) => (
          <div key={p.name} className="rounded-[16px] bg-tint p-8 shadow-[var(--shadow-card)] sm:p-10">
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
    title: "DQUARTZ Ceramic Coating Calgary | Authorized CARPRO Installer",
    description: "CARPRO DQUARTZ nano-diamond ceramic coating in Calgary, installed by an authorized CARPRO installer after paint prep and correction. Get a quote.",
    serviceName: "CARPRO DQUARTZ Ceramic Coating",
  },
  hero: {
    eyebrow: "Authorized CARPRO installer",
    title: "CARPRO DQUARTZ",
    subtitle: "Our flagship coating: ceramic protection reinforced with synthetic nano-diamonds, built to resist wash swirls.",
    image: heroCeramic,
    imageAlt: "Freshly coated paint with deep gloss",
  },
  h1: "CARPRO DQUARTZ Nano-Diamond Ceramic Coating in Calgary",
  lead: "CARPRO DQUARTZ from Xpress is a ceramic coating reinforced with synthetic nano-diamonds, installed by an authorized CARPRO installer in Calgary and Airdrie.",
  intro: [
    "DQUARTZ is built to resist the fine swirls and light scratches that washing leaves behind, on top of the gloss, water beading, UV, road-salt and chemical resistance you expect from a professional coating.",
    "It is a coating, not armour: it will not stop rock chips. For chips, pair it with SunTek or LLumar paint protection film on the front end.",
  ],
  questions: [
    { q: "Why it matters in Calgary", a: "Road salt, mag chloride, gravel dust and hard water all attack clear coat. A hard, slick coating means less sticks, and what does comes off with a gentle wash instead of a scrub that adds swirls." },
    { q: "Is DQUARTZ worth it over a standard coating?", a: "If your car goes through a lot of washes, the added swirl resistance is the difference you will notice. We will tell you honestly whether your car needs it." },
    { q: "How long does DQUARTZ last?", a: "Durability depends on prep, washing and how the car is stored. We will give you the warranty terms for your package with your quote." },
  ],
  productsTitle: "",
  products: [],
  extra: <DQuartzExtra />,
  why: WHY_CERAMIC,
  quoteTitle: "Get a DQUARTZ quote",
  quoteNeed: "Paint correction/ceramic",
  faqTitle: "DQUARTZ questions",
  faqs: [
    { q: "How long does DQUARTZ last?", a: "It depends on prep, care and storage. Your quote includes the warranty terms for your package." },
    { q: "Is DQUARTZ worth it in a Calgary winter?", a: "Yes for most daily drivers. Salt and slush release more easily from a coated surface, so winter washes are faster and gentler on the paint." },
    { q: "DQUARTZ or PPF?", a: "They do different jobs. PPF stops rock chips; DQUARTZ resists swirls and makes washing easier. Many owners put film on the front and coat the rest." },
    { q: "Can I take a coated car through a car wash?", a: "Touchless washes are fine. Brush washes cause the swirls a coating is meant to resist, so hand washing is best." },
    { q: "Does DQUARTZ have real diamonds in it?", a: "No. It uses synthetic nano-diamonds bonded into the coating. It is not as hard as diamond and it is not scratch-proof, but it resists wash swirls better than a standard coating." },
  ],
  pathways: [
    { title: "Aftercare with Xpress Pass", body: "Maintenance washes that keep the coating performing.", href: "/xpress-pass" },
    { title: "Add front-end PPF", body: "Stop rock chips with SunTek or LLumar film.", href: "/paint-protection-film" },
  ],
  official: { label: "See CARPRO's DQUARTZ coating", href: "https://carpro.global/products/category/protect/0" },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

export const WINDOW_TINT: BrandPage = {
  path: "/window-tint",
  seo: {
    title: "Window Tint Calgary | LLumar & SunTek Installer | Xpress",
    description: "Window tint in Calgary by an authorized LLumar and SunTek installer: ceramic and carbon film for heat rejection, less glare and UV protection.",
    serviceName: "Window Tint",
  },
  hero: {
    eyebrow: "Authorized LLumar & SunTek installer",
    title: "Window tint",
    subtitle: "A cooler cabin, less glare off snow and low winter sun, and UV protection for you and your interior.",
    image: heroTint,
    imageAlt: "Range Rover three-quarter view showing tinted windows",
  },
  h1: "Window Tint in Calgary — Authorized LLumar & SunTek Installer",
  lead: "Window tint from Xpress is LLumar and SunTek automotive window film installed by an authorized installer in Calgary and our heated Airdrie shop.",
  intro: [
    "We install ceramic, carbon and dyed films, cut to your windows with clean edges and no bubbles, and backed by the manufacturer's warranty on the film.",
  ],
  questions: [
    { q: "Is ceramic tint worth it in Calgary?", a: "Ceramic film rejects more heat than basic dyed film and has no metal, so phone, GPS and radio signals are not affected. With long summer days, most drivers feel the difference." },
    { q: "How dark can you legally tint in Alberta?", a: "Alberta restricts film on the windshield and front side windows. Rear side windows and the back glass can usually go darker. We will confirm what is legal for your vehicle before we install." },
    { q: "How much does window tint cost?", a: "It depends on the vehicle, the number of windows and the film. Text us photos for an exact price." },
  ],
  productsTitle: "Choose your film",
  products: [
    { name: "LLumar window tint", description: "LLumar automotive film, from FormulaOne to ceramic, clear and dyed options.", benefits: ["Top-of-the-line FormulaOne", "Colour-stable, scratch-resistant coating"], href: "/window-tint/llumar" },
    { name: "SunTek window tint", description: "SunTek automotive film, from Evolve to ceramic and carbon.", benefits: ["Evolve for higher infrared heat rejection", "Non-metal films that will not block signals"], href: "/window-tint/suntek" },
  ],
  why: WHY_TINT,
  quoteTitle: "Get a window tint quote",
  quoteNeed: "Not sure",
  faqTitle: "Window tint questions",
  faqs: TINT_FAQS,
  pathways: [
    { title: "Add paint protection film", body: "SunTek and LLumar PPF for the front end.", href: "/paint-protection-film" },
    { title: "Add ceramic coating", body: "CARPRO DQUARTZ for the whole car.", href: "/ceramic-coating/carpro-dquartz" },
  ],
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

export const LLUMAR_TINT: BrandPage = {
  path: "/window-tint/llumar",
  seo: {
    title: "LLumar Window Tint Calgary | Authorized LLumar Installer",
    description: "LLumar window tint installed in Calgary by an authorized LLumar installer: FormulaOne, ceramic, clear and dyed automotive film.",
    serviceName: "LLumar Window Tint",
  },
  hero: {
    eyebrow: "Authorized LLumar installer",
    title: "LLumar tint",
    subtitle: "Automotive window film known for quality, colour stability and a durable scratch-resistant coating.",
    image: heroCabin,
    imageAlt: "Vehicle cabin with tinted glass",
  },
  h1: "LLumar® Window Tint in Calgary",
  lead: "LLumar window tint from Xpress is LLumar automotive window film installed by an authorized LLumar installer in Calgary and Airdrie.",
  intro: ["LLumar film helps keep the cabin cooler, cuts glare, blocks UV and adds privacy, with a factory-backed warranty."],
  questions: [
    { q: "Which LLumar tint should I choose?", a: "FormulaOne is LLumar's top-of-the-line film for the best comfort and look. Ceramic films reject heat without metal. Dyed film is the budget option for looks and privacy." },
    { q: "How dark can I go in Alberta?", a: "Alberta restricts film on the windshield and front side windows. We will confirm what is legal on your vehicle." },
    { q: "How much does LLumar tint cost?", a: "It depends on the film and your vehicle. Text us photos for an exact price." },
  ],
  productsTitle: "The LLumar films we install",
  products: [
    { name: "FormulaOne", description: "LLumar's top-of-the-line automotive film for enhanced comfort, protection and a refined look.", benefits: ["Premium heat and glare control", "Factory-backed warranty"] },
    { name: "Ceramic", description: "Non-metal ceramic film for strong heat rejection without blocking signals.", benefits: ["Phone, GPS and radio friendly", "Cooler cabin in summer"] },
    { name: "Clear", description: "Near-invisible film for UV and heat protection without changing the look of your glass.", benefits: ["Keeps the factory look", "UV protection"] },
    { name: "Dyed", description: "Affordable film for privacy and a darker, uniform look.", benefits: ["Budget-friendly", "Added privacy"] },
  ],
  why: WHY_TINT,
  quoteTitle: "Get a LLumar tint quote",
  faqTitle: "LLumar tint questions",
  faqs: TINT_FAQS,
  pathways: [
    { title: "Compare SunTek tint", body: "Evolve, ceramic and carbon film.", href: "/window-tint/suntek" },
    { title: "Add LLumar PPF", body: "Self-healing paint protection film.", href: "/paint-protection-film/llumar" },
  ],
  official: { label: "See LLumar's official tint line-up", href: "https://llumar.com/en/tint/" },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};

export const SUNTEK_TINT: BrandPage = {
  path: "/window-tint/suntek",
  seo: {
    title: "SunTek Window Tint Calgary | Authorized SunTek Installer",
    description: "SunTek window tint installed in Calgary by an authorized SunTek installer: Evolve, ceramic and carbon automotive film for heat and glare control.",
    serviceName: "SunTek Window Tint",
  },
  hero: {
    eyebrow: "Authorized SunTek installer",
    title: "SunTek tint",
    subtitle: "When the sun brings its worst: SunTek window film for heat rejection, less glare and UV protection.",
    image: heroBmw,
    imageAlt: "BMW M340i front three-quarter",
  },
  h1: "SunTek® Window Tint in Calgary",
  lead: "SunTek window tint from Xpress is SunTek automotive window film installed by an authorized SunTek installer in Calgary and Airdrie.",
  intro: ["SunTek film is engineered for heat and glare control, with a manufacturer's warranty on the film."],
  questions: [
    { q: "Which SunTek tint should I choose?", a: "Evolve is SunTek's top-of-the-line tint for higher infrared heat rejection. Ceramic is a strong all-rounder. Carbon gives a matte, non-reflective look at a lower price." },
    { q: "How dark can I go in Alberta?", a: "Alberta restricts film on the windshield and front side windows. We will confirm what is legal on your vehicle." },
    { q: "How much does SunTek tint cost?", a: "It depends on the film and your vehicle. Text us photos for an exact price." },
  ],
  productsTitle: "The SunTek films we install",
  products: [
    { name: "Evolve", description: "SunTek's top-of-the-line automotive tint, engineered for enhanced heat-blocking and higher infrared rejection.", benefits: ["Best heat control in the SunTek range", "Manufacturer warranty"] },
    { name: "Ceramic", description: "Non-metal ceramic film for strong heat rejection without signal interference.", benefits: ["Phone, GPS and radio friendly", "Clear views, less glare"] },
    { name: "Carbon", description: "Carbon film with a matte, non-reflective finish and lasting colour.", benefits: ["Colour-stable finish", "Good value"] },
  ],
  why: WHY_TINT,
  quoteTitle: "Get a SunTek tint quote",
  faqTitle: "SunTek tint questions",
  faqs: TINT_FAQS,
  pathways: [
    { title: "Compare LLumar tint", body: "FormulaOne, ceramic, clear and dyed.", href: "/window-tint/llumar" },
    { title: "Add SunTek PPF", body: "Self-healing paint protection film.", href: "/paint-protection-film/suntek" },
  ],
  official: { label: "See SunTek's official tint line-up", href: "https://suntekfilms.com/na/en/automotive-window-tint/" },
  footnotes: [WARRANTY_NOTE, TRADEMARKS],
};
