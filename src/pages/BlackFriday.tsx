import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Check, Phone, CalendarCheck, Eye, ShieldCheck, Sun, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown";
import { BLACK_FRIDAY_COPY } from "@/data/copy";
import { BLACK_FRIDAY_SIZES, BOOKING_URL, PHONE, money, type BlackFridaySize } from "@/data/pricing";
import { useBlackFriday } from "@/hooks/useBlackFriday";
import { blackFridayMaxDiscount, blackFridayPrice } from "@/lib/black-friday";
import winterPhoto from "@/assets/jobs/exterior-bmw-m340i-front-xpress-studio.webp";

const WINTER_ICONS = [Eye, ShieldCheck, Sun];
const MAX_DISCOUNT = blackFridayMaxDiscount();

const BlackFriday = () => {
  const { ready, active, countdown } = useBlackFriday();
  const [size, setSize] = useState<BlackFridaySize>("sedan");
  const sizeLabel = BLACK_FRIDAY_SIZES.find((s) => s.id === size)?.label ?? "";
  return (
    <>
      <SEO title={BLACK_FRIDAY_COPY.seoTitle} description={BLACK_FRIDAY_COPY.seoDescription} canonical="/black-friday" />
      <Navbar />
      <AutoBreadcrumbs currentLabel="Black Friday" />
      <main className="black-friday-page">
        {ready && !active ? (
          <section className="shell py-20 text-center">
            <h1 className="text-ink">This offer has ended</h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild><Link to="/detailing">Regular detailing packages</Link></Button>
              <Button asChild variant="outline"><Link to="/paint-protection-film">Paint protection film</Link></Button>
              <Button asChild variant="outline"><Link to="/windshield-ppf">Windshield protection film</Link></Button>
            </div>
          </section>
        ) : (
          <>
            <section className="bf-hero pb-12 pt-12 sm:pb-16 sm:pt-16">
              <div className="shell text-center">
                <span className="bf-eyebrow inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">{BLACK_FRIDAY_COPY.heroEyebrow}</span>
                <h1 className="bf-hero-title mt-6">{BLACK_FRIDAY_COPY.title}</h1>
                <p className="bf-hero-deal mt-4">Up to <span className="bf-hero-accent">{MAX_DISCOUNT}% off</span></p>
                <p className="bf-hero-sub mx-auto mt-5 max-w-2xl text-base sm:text-lg">{BLACK_FRIDAY_COPY.subtitle}</p>
                <div className="mt-8"><BlackFridayCountdown countdown={countdown} large /></div>
                <p className="bf-hero-sub mt-10 text-xs font-semibold uppercase tracking-widest">{BLACK_FRIDAY_COPY.pickTitle}</p>
                <div className="mx-auto mt-4 grid max-w-4xl gap-3 sm:grid-cols-3">
                  {BLACK_FRIDAY_COPY.packages.map((pkg) => {
                    const price = blackFridayPrice(pkg.id, size);
                    return (
                      <a key={pkg.id} href={`#bf-${pkg.id}`} data-tier={pkg.id} className="bf-goal-chip group flex items-center justify-between gap-3 rounded-md px-4 py-3 text-left">
                        <span>
                          <span className="bf-goal-chip-tier block text-xs font-bold uppercase tracking-widest">{pkg.name}</span>
                          <span className="block text-[15px] font-semibold leading-snug">{pkg.goal}</span>
                          <span className="bf-hero-sub block text-xs">Save {money(price.savings)}</span>
                        </span>
                        <ArrowDown className="h-4 w-4 shrink-0 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
            <section aria-label="Black Friday packages" className="bg-tint py-10 sm:py-14">
              <div className="shell">
                <p className="mb-3 text-center text-sm font-semibold text-ink">Prices for your vehicle</p>
                <div role="group" aria-label="Vehicle size" className="mx-auto mb-10 grid max-w-2xl grid-cols-3 gap-1 rounded-full border border-line bg-canvas p-1">
                  {BLACK_FRIDAY_SIZES.map((option) => (
                    <Button key={option.id} variant={size === option.id ? "default" : "ghost"} aria-pressed={size === option.id} onClick={() => setSize(option.id)} className="h-auto min-h-11 whitespace-normal rounded-full px-2 py-2 text-xs leading-tight sm:text-sm">{option.label}</Button>
                  ))}
                </div>
                <div className="grid items-start gap-6 lg:grid-cols-3">
                  {BLACK_FRIDAY_COPY.packages.map((pkg) => {
                    const price = blackFridayPrice(pkg.id, size);
                    return (
                      <article id={`bf-${pkg.id}`} key={pkg.id} aria-label={`${pkg.name} package`} data-tier={pkg.id} className={`bf-card flex scroll-mt-32 flex-col overflow-hidden rounded-md border bg-canvas ${pkg.popular ? "bf-card-popular border-action" : "border-line"}`}>
                        <div className="bf-tier-stripe h-2" aria-hidden="true" />
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                          <div className="flex min-h-7 items-center justify-between gap-2">
                            <h2 className="bf-package-name text-ink">{pkg.name}</h2>
                            {pkg.popular && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most popular</span>}
                          </div>
                          <div className="mt-4">
                            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-action"><Target className="h-3.5 w-3.5" aria-hidden="true" />Goal</p>
                            <p className="mt-1 text-xl font-bold leading-tight text-ink">{pkg.goal}</p>
                            <p className="mt-2 text-sm leading-snug text-muted-ink">{pkg.goalBody}</p>
                          </div>
                          <div className="bf-price-panel mt-6 rounded-md p-5">
                            <p className="text-sm text-muted-ink">Regular <del className="tabular-nums">{money(price.regular)}</del></p>
                            <p className="bf-sale-price mt-2 text-ink tabular-nums">{money(price.sale)}</p>
                            <p className="bf-save-pill mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold tabular-nums">Save {money(price.savings)} · {price.discount}% off</p>
                          </div>
                          <div className="mt-6">
                            <div className="flex items-baseline justify-between border-b border-line pb-2 text-xs font-semibold uppercase tracking-wider text-muted-ink"><span>What's included</span><span>{BLACK_FRIDAY_COPY.valueLabel}</span></div>
                            <ul className="divide-y divide-line">
                              {price.items.map((item) => (
                                <li key={item.id} className="flex items-start gap-3 py-3 text-[15px] leading-snug text-foreground">
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                                  <span className="flex-1">{BLACK_FRIDAY_COPY.items[item.id]}</span>
                                  <span className="shrink-0 font-semibold tabular-nums text-ink">{money(item.value)}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="space-y-1 border-t-2 border-ink pt-3 text-sm">
                              <div className="flex justify-between text-muted-ink"><span>{BLACK_FRIDAY_COPY.totalLabel}</span><del className="tabular-nums">{money(price.regular)}</del></div>
                              <div className="flex justify-between font-bold text-ink"><span>Black Friday price</span><span className="tabular-nums text-action">{money(price.sale)}</span></div>
                            </div>
                          </div>
                          <p className="mt-5 text-sm leading-snug text-muted-ink"><span className="font-semibold text-ink">Best for:</span> {pkg.bestFor}</p>
                          <p className="mt-1 min-h-5 text-sm leading-snug text-muted-ink">{pkg.shop ? BLACK_FRIDAY_COPY.shopNote : null}</p>
                          <div className="mt-6 grid gap-3">
                            <Button asChild size="lg" className="rounded-full"><a href={`tel:+1${PHONE.replace(/\D/g, "")}`}><Phone aria-hidden="true" />Call {PHONE}</a></Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><CalendarCheck aria-hidden="true" />Book online</a></Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-muted-ink sm:text-sm">Values shown for a {sizeLabel.toLowerCase()} at our regular published prices. {BLACK_FRIDAY_COPY.finePrint}</p>
              </div>
            </section>
            <section className="bg-canvas py-12 sm:py-16">
              <div className="shell">
                <h2 className="text-center text-ink">Built for Alberta winters</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {BLACK_FRIDAY_COPY.winter.map((item, index) => {
                    const Icon = WINTER_ICONS[index];
                    return <div key={item.title} className="border-t border-line pt-5">{Icon && <Icon className="mb-3 h-6 w-6 text-action" aria-hidden="true" />}<h3 className="text-lg text-ink">{item.title}</h3><p className="mt-2 text-sm text-muted-ink">{item.body}</p></div>;
                  })}
                </div>
                <img src={winterPhoto} alt="BMW M340i with a detailed exterior in the Xpress studio" loading="lazy" width={1536} height={864} className="mx-auto mt-10 aspect-video w-full max-w-3xl rounded-md object-cover" />
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
export default BlackFriday;
