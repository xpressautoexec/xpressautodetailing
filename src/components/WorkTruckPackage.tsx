import { Link } from "react-router-dom";
import { ArrowRight, Check, HardHat, Truck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { WORK_TRUCK_PACKAGE, money, BOOKING_URL } from "@/data/pricing";

/** Work truck package — trades, landscaping and construction trucks, plus the fleet upsell. */
const WorkTruckPackage = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container max-w-5xl px-6">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <p className="font-heading text-[11px] font-black uppercase tracking-[0.2em] text-primary">
            Built for the trades
          </p>
          <h2 className="mt-3 font-heading text-2xl font-black uppercase text-foreground sm:text-3xl md:text-4xl">
            {WORK_TRUCK_PACKAGE.name}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {WORK_TRUCK_PACKAGE.tagline}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 md:grid-cols-2">
        {WORK_TRUCK_PACKAGE.tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 sm:p-7 ${
              tier.popular ? "border-primary/60 shadow-lg shadow-primary/10" : "border-border"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                Best value
              </span>
            )}
            <div className="flex items-center gap-2 text-primary">
              {tier.id === "interior" ? <HardHat className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
              <h3 className="font-heading text-lg font-bold text-foreground">{tier.name}</h3>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-heading text-4xl font-black text-foreground">{money(tier.price)}</span>
              <span className="text-xs font-semibold uppercase text-muted-foreground">{tier.duration}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {tier.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-primary px-6 font-heading text-xs font-black uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book {tier.name} — {money(tier.price)}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Fleet upsell */}
      <ScrollReveal delay={0.1}>
        <Link
          to="/fleet"
          className="group mt-6 flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-brand-dark p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div>
            <p className="font-heading text-lg font-black uppercase text-white sm:text-xl">
              Have a fleet? Save up to 50%
            </p>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Multiple work trucks, vans or trailers get volume pricing, scheduled on-site visits and one invoice.
              Tell us what you run and we'll build the package around it.
            </p>
          </div>
          <span className="inline-flex min-h-[46px] shrink-0 items-center gap-2 rounded-full bg-primary px-6 font-heading text-xs font-black uppercase tracking-wider text-primary-foreground transition-colors group-hover:bg-primary/90">
            Fleet detailing packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

export default WorkTruckPackage;
