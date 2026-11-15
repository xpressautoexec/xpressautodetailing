import { useRef, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { COATING_OPTIONS, COATING_TIERS } from "@/data/coatings";
import { CERAMIC_PACKAGES, money } from "@/data/pricing";

/** Sidebar of coatings grouped by tier; the panel shows the selected coating. Customers choose at drop-off. */
const CoatingSelector = ({ id = "choose-your-coating" }: { id?: string }) => {
  const [activeId, setActiveId] = useState(COATING_OPTIONS.find((c) => c.flagship)?.id ?? COATING_OPTIONS[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const choose = (id: string) => {
    setActiveId(id);
    // Phones stack the panel under the list, so bring it into view.
    if (typeof window !== "undefined" && window.innerWidth < 1024) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const active = COATING_OPTIONS.find((c) => c.id === activeId) ?? COATING_OPTIONS[0];
  const tier = COATING_TIERS.find((t) => t.id === active.tier);
  const pkg = CERAMIC_PACKAGES.find((p) => p.id === active.tier);

  return (
    <Section tone="canvas" id={id}>
      <SectionHeading
        eyebrow="Choose your coating"
        title="Pick your ceramic at drop-off."
        intro="Every tier has two coatings at the same price. Pick your tier when you book, then choose the coating in person once we've looked at your paint."
      />
      <div className="grid overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-[18rem_1fr]">
        <nav aria-label="Ceramic coatings" className="border-b border-line bg-tint lg:border-b-0 lg:border-r">
          {COATING_TIERS.map((t) => (
            <div key={t.id} className="border-b border-line last:border-b-0">
              <p className="px-5 pb-1 pt-4 text-xs font-semibold uppercase tracking-label text-muted-ink">{t.label} coatings</p>
              <ul className="pb-2">
                {COATING_OPTIONS.filter((c) => c.tier === t.id).map((c) => {
                  const selected = c.id === activeId;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => choose(c.id)}
                        aria-pressed={selected}
                        className={`flex w-full items-center gap-3 border-l-4 px-5 py-3 text-left transition-colors ${
                          selected ? "border-primary bg-surface" : "border-transparent hover:bg-surface/60"
                        }`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-semibold uppercase tracking-label text-muted-ink">{c.brand}</span>
                          <span className={`block font-semibold ${selected ? "text-ink" : "text-ink-2"}`}>{c.name}</span>
                          <span className="block text-xs text-muted-ink">{c.tag}</span>
                        </span>
                        <ChevronRight className={`h-4 w-4 shrink-0 ${selected ? "text-primary" : "text-muted-ink"}`} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div ref={panelRef} className="scroll-mt-24 p-6 sm:p-10" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-label text-primary-foreground">
              {tier?.label} tier
            </span>
            {active.flagship && (
              <span className="rounded-full border border-primary px-3 py-1 text-xs font-semibold uppercase tracking-label text-primary">
                Flagship
              </span>
            )}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-label text-muted-ink">{active.brand}</p>
          <h3 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{active.name}</h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">{active.description}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[15px] text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-label text-muted-ink">Best for</dt>
              <dd className="mt-1 text-[15px] text-ink-2">{active.bestFor}</dd>
            </div>
            {pkg && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-label text-muted-ink">Package</dt>
                <dd className="mt-1 text-[15px] text-ink-2">
                  {pkg.name}, from {money(pkg.price)} with {pkg.correction.toLowerCase()}. Same price for either {tier?.label} coating.
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </Section>
  );
};

export default CoatingSelector;
