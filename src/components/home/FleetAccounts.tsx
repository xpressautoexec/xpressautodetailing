import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FLEET_TERMS, COVERAGE } from "@/data/copy";

/** Home-page band for commercial buyers: account terms procurement looks for, one link to /fleet. */
const FleetAccounts = () => (
  <section className="py-16 sm:py-20">
    <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-electric">Commercial accounts</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Run like a vendor, not a one-off job
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-2">
          Builders, contractors, dealers and shops keep their trucks, lots and equipment on a rotation with us. Here is how
          an account works.
        </p>
        <Link
          to="/fleet"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-electric px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
        >
          Request a fleet quote
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="mt-6 flex items-center gap-2 text-sm font-medium text-ink-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
          {COVERAGE} on every job
        </p>
      </div>
      <dl className="grid gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2">
        {FLEET_TERMS.map((t) => (
          <div key={t.title} className="bg-surface p-6 sm:p-7">
            <dt className="font-heading text-base font-semibold text-ink">{t.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-2">{t.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default FleetAccounts;
