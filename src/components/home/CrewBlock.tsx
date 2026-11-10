import { Check, ShieldCheck } from "lucide-react";
import { CREW } from "@/data/season";
import { GUARANTEES, COVERAGE } from "@/data/copy";
import vanImg from "@/assets/jobs/crew-van-gear.webp";

/** Who shows up, and what they promise before they leave. */
const CrewBlock = () => (
  <section className="section-y border-y border-line bg-tint" aria-labelledby="crew-title">
    <div className="shell grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <div>
        <h2 id="crew-title" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
          Who's coming to your driveway
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CREW.map((m) => (
            <li key={m.name} className="overflow-hidden rounded-card border border-line bg-surface">
              {m.photo ? (
                <img src={m.photo} alt={`${m.name}, Xpress ${m.role.toLowerCase()}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div aria-hidden="true" className="flex aspect-[4/5] w-full items-center justify-center bg-electric-soft">
                  <span className="font-heading text-6xl font-extrabold italic text-electric">{m.name.charAt(0)}</span>
                </div>
              )}
              <div className="px-4 py-3">
                <p className="font-heading text-xl font-bold text-ink">{m.name}</p>
                <p className="text-xs text-muted-ink">{m.role}</p>
              </div>
            </li>
          ))}
          <li className="col-span-2 overflow-hidden rounded-card border border-line bg-surface sm:col-span-1">
            <img
              src={vanImg}
              alt="Xpress van rear with on-board water and detailing gear"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="px-4 py-3">
              <p className="font-heading text-xl font-bold text-ink">The van</p>
              <p className="text-xs text-muted-ink">Own water and power</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="lg:pt-3">
        <div className="rounded-card border border-line bg-surface p-7 sm:p-9">
          <p className="eyebrow">Walkaround Guarantee</p>
          <p className="mt-3 font-heading text-3xl font-bold leading-tight text-ink">
            Before we leave, we walk the vehicle with you.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            If anything was missed, we fix it on the spot, before you pay.
          </p>
          <ul className="mt-7 space-y-3 border-t border-line pt-6">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                <Check className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                {g}
              </li>
            ))}
            <li className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
              <ShieldCheck className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
              {COVERAGE}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default CrewBlock;
