import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Phone, CalendarCheck, Eye, ShieldCheck, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BlackFridayCountdown } from "@/components/BlackFridayCountdown";
import { BLACK_FRIDAY_COPY } from "@/data/copy";
import { BLACK_FRIDAY_SIZES, BOOKING_URL, PHONE, money, type BlackFridaySize } from "@/data/pricing";
import { useBlackFriday } from "@/hooks/useBlackFriday";
import { blackFridayPrice } from "@/lib/black-friday";
import winterPhoto from "@/assets/jobs/exterior-bmw-m340i-front-xpress-studio.webp";

const WINTER_ICONS = [Eye, ShieldCheck, Sun];

const BlackFriday = () => {
  const { ready, active, countdown } = useBlackFriday();
  const [size, setSize] = useState<BlackFridaySize>("sedan");
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
            <section className="border-b border-line bg-canvas pb-10 pt-12 sm:pb-14 sm:pt-16">
              <div className="shell text-center">
                <h1 className="text-ink">{BLACK_FRIDAY_COPY.title}</h1>
                <p className="mx-auto mt-6 max-w-2xl text-base text-muted-ink sm:text-lg">{BLACK_FRIDAY_COPY.subtitle}</p>
                <div className="mt-8 text-action"><BlackFridayCountdown countdown={countdown} large /></div>
              </div>
            </section>
            <section aria-label="Black Friday packages" className="bg-tint py-10 sm:py-14">
              <div className="shell">
                <div role="group" aria-label="Vehicle size" className="mx-auto mb-10 grid max-w-2xl grid-cols-3 gap-1 rounded-md border border-line bg-canvas p-1">
                  {BLACK_FRIDAY_SIZES.map((option) => (
                    <Button key={option.id} variant={size === option.id ? "default" : "ghost"} aria-pressed={size === option.id} onClick={() => setSize(option.id)} className="h-auto min-h-12 whitespace-normal px-2 py-2 text-xs leading-tight sm:text-sm">{option.label}</Button>
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {BLACK_FRIDAY_COPY.packages.map((pkg) => {
                    const price = blackFridayPrice(pkg.id, size);
                    return (
                      <article key={pkg.id} aria-label={`${pkg.name} package`} className={`flex flex-col rounded-md border bg-canvas p-6 sm:p-8 ${pkg.popular ? "border-action" : "border-line"}`}>
                        <div className="flex min-h-7 items-center justify-between gap-2">
                          <h2 className="bf-package-name text-ink">{pkg.name}</h2>
                          {pkg.popular && <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Most popular</span>}
                        </div>
                        <p className="bf-sale-price mt-5 text-ink tabular-nums">{money(price.sale)}</p>
                        <div className="mt-2 min-h-6 text-sm">
                          {price.regular !== null && <><del className="text-muted-ink">{money(price.regular)}</del><span className="ml-3 font-semibold text-action">{price.discount}% off</span></>}
                        </div>
                        <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                          {pkg.includes.map((item) => <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" /><span>{item}</span></li>)}
                        </ul>
                        <p className="mt-6 min-h-10 text-sm leading-snug text-muted-ink">{pkg.shop ? BLACK_FRIDAY_COPY.shopNote : null}</p>
                        <div className="mt-5 grid gap-3">
                          <Button asChild size="lg" className="rounded-full"><a href={`tel:+1${PHONE.replace(/\D/g, "")}`}><Phone aria-hidden="true" />Call {PHONE}</a></Button>
                          <Button asChild variant="outline" size="lg" className="rounded-full"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"><CalendarCheck aria-hidden="true" />Book online</a></Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-muted-ink sm:text-sm">{BLACK_FRIDAY_COPY.finePrint}</p>
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