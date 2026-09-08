import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import {
  CheckCircle2,
  Phone,
  Users,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Tag,
  Car,
  Star,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/complete-hero.jpg";
import xpressPassCard from "@/assets/xpress-pass-card.png";
import {
  XPRESS_PASS,
  PASS_ADDON_DISCOUNT,
  AUTO_PACKAGES,
  VEHICLE_SIZES,
  PHONE,
  money,
} from "@/data/pricing";

const PHONE_HREF = "tel:5875004523";
type SizeKey = "sedan" | "suv" | "minivan";

const PERKS = [
  {
    icon: Tag,
    title: `${PASS_ADDON_DISCOUNT}% off every add-on`,
    desc: "Pet hair, odour removal, clay bar, headlight restoration — every add-on, every visit, member pricing.",
  },
  {
    icon: Calendar,
    title: "Priority scheduling",
    desc: "Members book ahead of non-members. Your slot is held before the calendar opens to everyone else.",
  },
  {
    icon: Sparkles,
    title: "A fresh Xpress air freshener every visit",
    desc: "A small thing, but it's ours. Every visit ends with one.",
  },
  {
    icon: ShieldCheck,
    title: "Just had a service? Join within 7 days",
    desc: "We'll refund the plan discount on the job you just had. On a $379 Deep Clean & Seal, that's $45.48 back.",
  },
];

const monthlyFAQs = [
  {
    q: "How does the Xpress Pass work?",
    a: "Pick the plan that matches how you use the car — Maintain every month, Refresh every 2 months, or Restore every 3 months. We auto-schedule your detail at the same approximate window each cycle and the member rate is applied automatically.",
  },
  {
    q: "Can I cancel or pause anytime?",
    a: "Yes. There's no contract and no sign-up fee. Pause for winter, vacation or any reason — just give us a heads-up before your next scheduled service.",
  },
  {
    q: "Does the discount apply to add-ons?",
    a: `Yes. Members save ${PASS_ADDON_DISCOUNT}% on every add-on on every visit — pet hair removal, odour treatment, clay bar, engine bay, headlight restoration and more.`,
  },
  {
    q: "What about SUVs and trucks?",
    a: "Larger vehicles carry the same published size surcharge as our regular packages — your member rate is the discounted version of that same price. Nothing is adjusted on arrival.",
  },
  {
    q: "Is there a sign-up fee?",
    a: "No sign-up fee, no contract. You only pay per service at your member rate, after the work is done.",
  },
  {
    q: "What if I miss a scheduled service?",
    a: "Life happens — we'll reschedule. Missing more than two cycles in a row may pause your plan, but you can resume anytime.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Call to Enroll",
    body: "Quick 3-minute call. Pick your plan, your vehicle size, and your preferred service window.",
  },
  {
    step: "02",
    title: "We Schedule For You",
    body: "We reach out before each cycle. You confirm or reschedule — no tracking dates.",
  },
  {
    step: "03",
    title: "We Come To You",
    body: "Mobile service across Calgary, Airdrie, Chestermere and Cochrane. Member rate auto-applied.",
  },
];

const MonthlyPlan = () => {
  const [size, setSize] = useState<SizeKey>("sedan");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEO
          title="The Xpress Pass — Detailing Membership"
          description="Calgary's mobile detailing membership. Save up to 20% on Upkeep, Inside & Out and Deep Clean & Seal packages, plus 15% off every add-on. No contract, cancel anytime."
          canonical="/monthly-plan"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />
        <AutoBreadcrumbs />

        {/* Hero */}
        <section className="relative bg-brand-dark text-primary-foreground overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Detailed vehicle reflecting Xpress Pass membership results"
              className="w-full h-full object-cover opacity-20"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-dark/70" />
          </div>
          <div className="container relative max-w-6xl px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary">
                  No contract · No sign-up fee · Cancel any time
                </span>
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] mb-5">
                The <span className="text-primary">Xpress</span> Pass
              </h1>
              <p className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Save up to <span className="text-primary font-bold">20%</span> on every visit
                and <span className="text-primary font-bold">{PASS_ADDON_DISCOUNT}% off all add-ons</span> — for as long as you're a member.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-xl hover:bg-brand-blue-deep transition-colors w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  Claim Your Pass — {PHONE}
                </a>
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-xl hover:bg-white/15 transition-colors w-full sm:w-auto"
                >
                  See the Plans
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" aria-hidden />
              <img
                src={xpressPassCard}
                alt="The Xpress Pass — premium black membership card"
                className="relative w-full max-w-md drop-shadow-2xl animate-float"
                loading="eager"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-16 sm:py-20 bg-background scroll-mt-24">
          <div className="container max-w-5xl px-6">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="text-sm font-heading font-bold uppercase tracking-widest text-primary mb-3">
                  Three plans
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                  Pick Your <span className="text-gradient">Plan &amp; Vehicle Size</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                  The price shown is the price you pay, per visit. Nothing due until the work is done.
                </p>
              </div>
            </ScrollReveal>

            {/* Size switch */}
            <div
              role="tablist"
              aria-label="Vehicle size"
              className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-muted p-1"
            >
              {VEHICLE_SIZES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={size === s.id}
                  onClick={() => setSize(s.id as SizeKey)}
                  className={`rounded-full px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    size === s.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {XPRESS_PASS.map((plan) => {
                const pkg = AUTO_PACKAGES.find((p) => p.name === plan.service);
                return (
                  <ScrollReveal key={plan.id}>
                    <div
                      className={`relative h-full flex flex-col rounded-2xl border-2 bg-card p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                        plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                          <Star className="w-3 h-3" /> Most popular
                        </span>
                      )}
                      <p className="font-heading font-bold text-xs uppercase tracking-widest text-primary mb-1">
                        {plan.frequency}
                      </p>
                      <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5">
                        {plan.service} · save {plan.discount}% every visit
                      </p>
                      <div className="mb-5">
                        <span className="font-heading font-black text-4xl text-foreground tabular-nums">
                          {money(plan.memberPrice[size])}
                        </span>
                        <span className="text-muted-foreground text-sm"> / visit</span>
                        {pkg && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            {money(pkg.price[size])}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2.5 mb-6 flex-1">
                        {(pkg?.includes ?? []).slice(0, 5).map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-foreground/85">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {inc}
                          </li>
                        ))}
                        <li className="flex items-start gap-2 text-sm font-semibold text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {PASS_ADDON_DISCOUNT}% off every add-on
                        </li>
                      </ul>
                      <a
                        href={PHONE_HREF}
                        className={`inline-flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider text-sm px-5 py-3 rounded-xl transition-colors ${
                          plan.popular
                            ? "bg-primary text-primary-foreground hover:bg-brand-blue-deep"
                            : "bg-muted text-foreground hover:bg-muted/70 border border-border"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        Join {plan.name}
                      </a>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2">
              <Car className="w-3.5 h-3.5" />
              Member prices shown for {VEHICLE_SIZES.find((s) => s.id === size)?.label}. Switch size above.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-16 sm:py-20 bg-muted/40">
          <div className="container max-w-5xl px-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-center mb-12">
                Every Plan <span className="text-gradient">Includes</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {PERKS.map((p, i) => (
                <ScrollReveal key={p.title} delay={0.05 * i}>
                  <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                    <p.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="font-heading font-bold text-foreground mb-1.5">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-5xl px-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-center mb-12">
                How It <span className="text-gradient">Works</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {PROCESS.map((s, i) => (
                <ScrollReveal key={s.step} delay={0.05 * i}>
                  <div className="h-full bg-card border border-border rounded-xl p-6">
                    <span className="font-heading font-black text-3xl text-primary/30">{s.step}</span>
                    <h3 className="font-heading font-bold text-foreground mt-2 mb-1.5">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-muted/40">
          <div className="container max-w-3xl px-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-center mb-10">
                Xpress Pass <span className="text-gradient">FAQ</span>
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {monthlyFAQs.map((f, i) => (
                <ScrollReveal key={f.q} delay={0.04 * i}>
                  <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
                    <h3 className="font-heading font-bold text-foreground mb-2">{f.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-brand-dark text-primary-foreground">
          <div className="container max-w-3xl px-6 text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase mb-4">
                Ready to Stop <span className="text-primary">Thinking About It?</span>
              </h2>
              <p className="text-brand-gray mb-8 max-w-xl mx-auto">
                One call and your car stays clean on autopilot — at member rates, with priority booking.
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl hover:bg-brand-blue-deep transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {PHONE}
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
