import { Check, ShieldCheck } from "lucide-react";
import { GUARANTEES, COVERAGE } from "@/data/copy";
import CrewSection from "@/components/site/CrewSection";
import WalkaroundGuarantee from "@/components/site/WalkaroundGuarantee";
import vanImg from "@/assets/jobs/crew-van-gear.webp";

/** Who shows up, and what they promise before they leave. */
const CrewBlock = () => (
  <section className="section-y border-y border-line bg-tint" aria-labelledby="crew-title">
    <div className="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div>
        <p className="eyebrow mb-3">The crew</p>
        <h2 id="crew-title" className="font-heading text-4xl font-extrabold leading-[1.0] tracking-display text-ink sm:text-6xl">
          Who's coming to your driveway
        </h2>
        <div className="mt-10">
          <CrewSection
            extra={
              <figure className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
                <img
                  src={vanImg}
                  alt="Xpress van rear with on-board water and detailing gear"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover max-sm:aspect-[16/10]"
                />
                <figcaption className="px-4 py-4">
                  <p className="font-heading text-xl font-bold leading-none text-ink">The van</p>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-label text-electric">Own water and power</p>
                </figcaption>
              </figure>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:pt-3">
        <WalkaroundGuarantee variant="card" />
        <ul className="grid gap-3 rounded-card border border-line bg-surface p-6 sm:grid-cols-2">
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
  </section>
);

export default CrewBlock;
