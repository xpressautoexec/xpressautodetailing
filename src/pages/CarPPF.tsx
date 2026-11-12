import { useState } from "react";
import LandingPage from "@/components/site/LandingPage";
import { Section, SectionHeading } from "@/components/site/Section";
import PackageCard from "@/components/site/PackageCard";
import PpfCoverageMap, { CHIP_ZONES, type PpfPackageId } from "@/components/ppf/PpfCoverageMap";
import PPFCraft from "@/components/ppf/PPFCraft";
import heroImg from "@/assets/ppf-hero.jpg";
import { CAR_PPF, CAR_PPF_SIZES, PPF_UPCHARGE, WINDSHIELD_PPF, carPpfPrice, money, type CarPpfSizeId } from "@/data/pricing";
import { FILM_BRAND, FILM_CUT_SYSTEM } from "@/data/copy";
import { FILM, SYSTEMS } from "@/data/brand";
import { IS_3M_CERTIFIED } from "@/config/site";
import { WHY_PPF } from "@/data/why";
import ProtectionProductLinks from "@/components/site/ProtectionProductLinks";

const TEL = "tel:+15875004523";
const from = Math.min(...CAR_PPF.map((p) => p.price));
const windshieldFrom = Math.min(...WINDSHIELD_PPF.map((t) => t.price));

const faqs = [
  {
    q: "What does it protect against?",
    a: "Rock chips, road salt, sand blasting on the lower panels, bug etching and light scratches. The film takes the impact instead of the paint, and light swirls in the film heal with heat.",
  },
  {
    q: "Which film do you use?",
    a: `${FILM_BRAND} paint protection film, installed by an authorized SunTek and LLumar installer. Both are optically clear, self-healing under heat and carry a manufacturer film warranty.`,
  },
  {
    q: "Is the film cut on my car?",
    a: `No. We cut it on our plotter from ${FILM_CUT_SYSTEM} patterns made for your year, make and model, so there's no knife work on your paint.`,
  },
  {
    q: "PPF or ceramic coating?",
    a: "Ceramic coating makes paint glossy and easy to wash, but it won't stop a rock chip. Film does. Many owners film the front and coat the rest.",
  },
  {
    q: "How long does it take?",
    a: "A partial or full front is one day. Track Pack is one to two days. A full vehicle is two to three days, and the film needs a few days to fully clear.",
  },
  {
    q: "Can you do the windshield too?",
    a: `Yes. Windshield protection film starts at ${money(windshieldFrom)} and pairs well with a front-end package.`,
  },
];

const SIZE_LABEL: Record<CarPpfSizeId, string> = { car: "Sedan / small SUV", truck: "Truck / large SUV", exotic: "Exotic" };

const CarPPF = () => {
  const [size, setSize] = useState<CarPpfSizeId>("car");
  const [selected, setSelected] = useState<PpfPackageId>("full-front");
  const [windshield, setWindshield] = useState(false);
  const [zones, setZones] = useState(false);
  const sizeInfo = CAR_PPF_SIZES.find((s) => s.id === size)!;
  const sel = CAR_PPF.find((p) => p.id === selected)!;

  return (
    <LandingPage
      quote={{ id: "quote", defaultNeed: "PPF/windshield film", title: "Get a PPF quote" }}
      childrenBeforeWork
      products={["suntek", "llumar", "carpro"]}
      why={WHY_PPF}
      afterFeatures={<ProtectionProductLinks />}
      seo={{
        title: "Paint Protection Film Calgary | SunTek & LLumar | Xpress",
        description: `${FILM_BRAND} paint protection film in Calgary from ${money(from)}. Computer-cut on our plotter, installed by our own crew. Partial front to full vehicle, priced by vehicle size.`,
        canonical: "/paint-protection-film",
        serviceName: "Paint Protection Film",
        serviceDescription: `${FILM_BRAND} paint protection film for cars, trucks and SUVs in Calgary and area, computer-cut and installed in-house.`,
      }}
      hero={{
        eyebrow: "Authorized SunTek & LLumar installer",
        title: "Stop rock chips before they start.",
        subtitle: `${FILM.name}, plotter-cut to your vehicle's pattern and installed in our Airdrie shop. Clear bra coverage from ${money(from)}.`,
        image: heroImg,
        ctaType: "call",
        bookHref: "#pricing",
        bookLabel: "See coverage and prices",
        phoneHref: TEL,
      }}
      features={{
        eyebrow: "Why film",
        title: "The film takes the hit.",
        intro: "Paint protection film in Calgary earns its cost on the Deerfoot, the QEII and every sanded winter road.",
        items: [
          { title: "Chips stop at the film.", body: "Gravel that would chip bare paint hits the film instead. Replace a panel of film, not repaint a panel." },
          { title: "Keeps resale value.", body: "Clean, original paint on the front end is one of the first things a buyer or appraiser checks." },
          { title: "You won't see it.", body: "The film is optically clear and keeps the gloss of the paint underneath." },
        ],
      }}
      steps={{
        title: "On a film install",
        items: [
          { title: "Get a quote", body: "Send the year, make and model, or call. We'll tell you which coverage fits how you drive." },
          { title: "We cut the film", body: `Patterns for your vehicle come from ${FILM_CUT_SYSTEM} and are cut on our plotter before install day.` },
          { title: "Prep and install", body: "We wash and decontaminate the paint in a clean, covered space above freezing, then fit and finish every edge." },
          { title: "Let it cure", body: "Wait a few days before washing while the film fully clears." },
        ],
      }}
      faqs={{ title: "Paint protection film questions", items: faqs }}
      related={[
        { label: "Windshield protection film", to: "/windshield-ppf" },
        { label: "Ceramic coating", to: "/ceramic-paint-correction" },
        { label: "RV paint protection film", to: "/rv-trailer/ppf" },
        { label: "Warranty & Care", to: "/warranty" },
      ]}
      closing={{
        title: "Protect the paint before the next rock",
        body: `${FILM_BRAND} coverage from ${money(from)}.`,
        mode: "quote",
        quoteHref: "#quote",
        phoneHref: TEL,
      }}
    >
      <Section tone="surface" id="pricing">
        <SectionHeading
          eyebrow={SYSTEMS.protect.tm}
          title="Four levels of coverage."
          intro="From a partial front to full front PPF and a full body clear bra. Pick a package to see exactly which panels it covers."
        />

        <div role="tablist" aria-label="Vehicle size" className="mb-2 flex w-full gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
          {CAR_PPF_SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={size === s.id}
              onClick={() => setSize(s.id)}
              className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
                size === s.id ? "bg-ink text-primary-foreground" : "text-ink-2 hover:text-ink"
              }`}
            >
              {SIZE_LABEL[s.id]}
            </button>
          ))}
        </div>
        <p className="mb-10 text-sm text-muted-ink">e.g. {sizeInfo.examples}</p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
          {/* Coverage map */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="eyebrow">Coverage</p>
              <p className="mt-1 font-heading text-2xl font-bold text-ink">{sel.name}</p>
              <PpfCoverageMap
                selected={selected}
                windshield={windshield}
                zones={zones}
                title={`Top-down view: ${sel.name} coverage${windshield ? " plus windshield film" : ""} shown in blue`}
                className="mx-auto mt-4 h-[360px] w-auto sm:h-[420px]"
              />
              <div className="mt-5 grid gap-2 border-t border-line pt-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2.5 text-ink">
                  <input type="checkbox" checked={windshield} onChange={(e) => setWindshield(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--electric))]" />
                  Add windshield film (ExoShield)
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-ink">
                  <input type="checkbox" checked={zones} onChange={(e) => setZones(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--electric))]" />
                  Show where chips happen
                </label>
              </div>
            </div>
          </div>

          {/* Package ladder */}
          <div className="grid gap-5 pt-3 sm:grid-cols-2">
            {CAR_PPF.map((p) => (
              <PackageCard
                key={p.id}
                name={p.name}
                forWho={p.forWho}
                includes={p.covers}
                time={p.time}
                price={`From ${money(carPpfPrice(p.price, size))}`}
                priceNote={SIZE_LABEL[size]}
                mostChosen={p.popular}
                selected={selected === p.id}
                onSelect={() => setSelected(p.id as PpfPackageId)}
                warrantyLink
              />
            ))}
            <div className="flex flex-col justify-between gap-4 rounded-card border border-dashed border-ink/25 p-6 sm:col-span-2 sm:flex-row sm:items-center">
              <div>
                <p className="eyebrow">Add-on</p>
                <p className="mt-1 font-heading text-2xl font-bold text-ink">Windshield film (ExoShield)</p>
                <p className="mt-1 text-sm text-ink-2">Clear film for the glass. Backed by ExoShield's 2-year / 50,000 km warranty.</p>
              </div>
              <p className="num shrink-0 text-3xl text-ink">From {money(windshieldFrom)}</p>
            </div>
          </div>
        </div>

        {/* Where chips happen */}
        <div className="mt-16 border-t border-line pt-12">
          <p className="eyebrow">Where chips happen</p>
          <h3 className="mt-2 font-heading text-3xl font-bold text-ink">Six places stones find first.</h3>
          <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHIP_ZONES.map((z) => (
              <li key={z.n} className="flex gap-4">
                <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal text-sm text-primary-foreground">{z.n}</span>
                <div>
                  <p className="font-semibold text-ink">{z.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{z.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <caption className="mb-3 text-left font-heading text-xl font-bold text-ink">All sizes at a glance</caption>
            <thead>
              <tr className="border-b border-line text-sm text-muted-ink">
                <th className="py-2 pr-4 font-semibold">Package</th>
                {CAR_PPF_SIZES.map((s) => (
                  <th key={s.id} className="py-2 pr-4 font-semibold">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAR_PPF.map((p) => (
                <tr key={p.id} className="border-b border-line/60">
                  <td className="py-3 pr-4 font-semibold text-ink">{p.name}</td>
                  {CAR_PPF_SIZES.map((s) => (
                    <td key={s.id} className="num py-3 pr-4 text-lg text-ink-2">
                      {money(carPpfPrice(p.price, s.id))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-ink">
            Trucks and large SUVs are {PPF_UPCHARGE.truckSuvPct}% more than a car, exotics {PPF_UPCHARGE.exoticPct}% more. Heavily
            modified bodies are quoted after we see the vehicle. Your price is confirmed before we start.
          </p>
        </div>
      </Section>

      <PPFCraft />
    </LandingPage>
  );
};

export default CarPPF;
