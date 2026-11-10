import { CERAMIC_PACKAGES, CERAMIC_UPCHARGE, VEHICLE_SIZES, fielddUrl, money } from "@/data/pricing";
import { SYSTEMS } from "@/data/brand";
import { useSizeParam } from "@/hooks/useSizeParam";
import { Section, SectionHeading } from "@/components/site/Section";
import PackageCard from "@/components/site/PackageCard";

/** Durability-first tier names. Former package names stay as a subtitle (FAQ and booking use them). */
const TIER: Record<string, { years: string; stage: string; forWho: string; surfaces: string[]; time: string }> = {
  essential: {
    years: "Coat 1-Year",
    stage: "Stage 1 enhancement included",
    forWho: "Newer paint that needs gloss and a season or two of easy washing.",
    surfaces: ["Paint"], // TODO: confirm if glass, wheel faces or trim are coated on this tier
    time: "1 day",
  },
  signature: {
    years: "Coat 5-Year",
    stage: "Stage 2 correction included",
    forWho: "Daily drivers you plan to keep for years.",
    surfaces: ["Paint"], // TODO: confirm if glass, wheel faces or trim are coated on this tier
    time: "2 days",
  },
  elite: {
    years: "Coat 9-Year",
    stage: "Stage 2+ correction included",
    forWho: "Long-term, high-value and garage-kept vehicles. System X graphene.",
    surfaces: ["Paint"], // TODO: confirm if glass, wheel faces or trim are coated on this tier
    time: "2 days",
  },
};

/** Xpress Coat™ tiers with the vehicle-size toggle. */
const CoatTiers = ({ id = "packages", tone = "surface" }: { id?: string; tone?: "canvas" | "surface" }) => {
  const [size, setSize] = useSizeParam();
  return (
    <Section tone={tone} id={id}>
      <SectionHeading
        eyebrow={SYSTEMS.coat.tm}
        title="Gloss measured in years."
        intro={`Three ceramic coating tiers in Calgary, each starting with machine correction. Exotics and heavily modified paint are ${CERAMIC_UPCHARGE.exoticPct}% more.`}
      />
      <div role="group" aria-label="Vehicle size" className="mb-10 flex w-full gap-1 rounded-md border border-line bg-surface p-1 sm:w-fit">
        {VEHICLE_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSize(s.id)}
            aria-pressed={size === s.id}
            className={`flex-1 rounded px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:text-sm ${
              size === s.id ? "bg-ink text-primary-foreground" : "text-ink-2 hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 pt-3 md:grid-cols-3">
        {CERAMIC_PACKAGES.map((p) => {
          const t = TIER[p.id];
          return (
            <PackageCard
              key={p.id}
              name={
                <>
                  {t?.years ?? p.name}
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-label text-muted-ink">{p.name}</span>
                </>
              }
              forWho={t?.forWho ?? p.coating}
              includes={[
                t?.stage ?? p.correction,
                p.coating,
                `Surfaces coated: ${(t?.surfaces ?? ["Paint"]).join(", ")}`,
                ...p.includes.filter((i) => /decontamination|clay|iron|registered|inspection/i.test(i)),
                `Keep it valid: ${SYSTEMS.care.tm} booster visit every 6 months`,
              ]}
              time={t?.time}
              price={`From ${money(p.prices[size])}`}
              mostChosen={p.popular}
              warrantyLink
              footer={
                <a
                  href={fielddUrl(p.book[size])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-ink-2 underline decoration-line underline-offset-4 hover:text-electric"
                >
                  Book online
                </a>
              }
            />
          );
        })}
      </div>
    </Section>
  );
};

export default CoatTiers;
