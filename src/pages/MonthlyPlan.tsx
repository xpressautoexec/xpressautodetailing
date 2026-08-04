import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CheckCircle2,
  Phone,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  Clock,
  Tag,
  Car,
  Truck,
  Star,
  Quote,
} from "lucide-react";
import heroImg from "@/assets/complete-hero.jpg";
import xpressPassCard from "@/assets/xpress-pass-card.png";
import bannerImg from "@/assets/gallery-paint-reflection.jpg";
import gal1 from "@/assets/gallery-bmw-red-interior.jpg";
import gal2 from "@/assets/gallery-acura-blue.jpg";
import gal3 from "@/assets/gallery-range-rover-interior.jpg";
import gal4 from "@/assets/gallery-gti-front.jpg";
import gal5 from "@/assets/gallery-bmw-wheel-front.jpg";
import gal6 from "@/assets/gallery-lexus-is.jpg";

const PHONE = "587-500-4523";
const PHONE_HREF = "tel:5875004523";

const FREQUENCIES = [
  { value: "1", label: "Every Month (Most Popular)", discount: 20, addOnDiscount: 15, cadence: "monthly" },
  { value: "2", label: "Every 2 Months", discount: 15, addOnDiscount: 12, cadence: "every 2 months" },
  { value: "3", label: "Every 3 Months", discount: 10, addOnDiscount: 10, cadence: "every 3 months" },
  { value: "6", label: "Every 6 Months", discount: 5, addOnDiscount: 5, cadence: "every 6 months" },
];

type SizeKey = "sedan" | "small_suv" | "large_suv";

const SIZE_LABELS: Record<SizeKey, string> = {
  sedan: "Sedan / Coupe",
  small_suv: "Small SUV / Crossover",
  large_suv: "Large SUV / Truck / Van",
};

const PACKAGES: {
  name: string;
  blurb: string;
  time: string;
  popular?: boolean;
  prices: Record<SizeKey, number>;
}[] = [
  {
    name: "Interior Deep Clean + Shield",
    blurb:
      "Full steam extraction, leather conditioning, stain treatment and an interior protectant shield.",
    time: "2.33 – 2.83 hrs",
    prices: { sedan: 199.99, small_suv: 249.99, large_suv: 269.99 },
  },
  {
    name: "Complete Showroom Reset",
    blurb:
      "Interior deep clean + full exterior hand wash, clay bar decontamination and sealant. Inside and out.",
    time: "3.33 – 3.83 hrs",
    popular: true,
    prices: { sedan: 269.0, small_suv: 329.0, large_suv: 349.0 },
  },
];

const ADD_ONS = [
  { name: "Pet Hair Removal", price: 49 },
  { name: "Ozone Odor Treatment", price: 79 },
  { name: "Ceramic Spray Sealant", price: 99 },
  { name: "Engine Bay Detail", price: 59 },
  { name: "Headlight Restoration", price: 69 },
  { name: "Leather Deep Conditioning", price: 49 },
];

const TESTIMONIALS = [
  {
    name: "Daniel R.",
    vehicle: "BMW M340i · Xpress Pass since 2024",
    quote:
      "Best decision I made for my car. Pulls into my driveway every month, leaves looking brand new. I've stopped thinking about cleaning my car entirely.",
  },
  {
    name: "Priya S.",
    vehicle: "Acura MDX · Every 2 Months",
    quote:
      "Three kids, one dog. The interior used to be a disaster. Now it stays fresh between visits and the savings add up fast over the year.",
  },
  {
    name: "Marcus W.",
    vehicle: "Ford F-150 · Xpress Pass",
    quote:
      "Work truck during the week, family ride on weekends. The team handles both — and the monthly discount makes the truck size charge a non-issue.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Call to Enroll",
    body: "Quick 3-minute call. Pick frequency, package, and your preferred service window.",
  },
  {
    step: "02",
    title: "We Schedule For You",
    body: "We reach out before each cycle. You confirm or reschedule — no tracking dates.",
  },
  {
    step: "03",
    title: "We Come To You",
    body: "Mobile service across Calgary, Airdrie, Chestermere and Cochrane. Discount auto-applied.",
  },
];

const money = (n: number) => `$${n.toFixed(2)}`;

const monthlyFAQs = [
  {
    q: "How does the monthly plan work?",
    a: "Pick a recurring frequency that fits your routine — monthly, every 2, 3 or 6 months. We auto-schedule your detail at the same approximate window each cycle and your discount is automatically applied to either the Interior Deep Clean + Shield or the Complete Showroom Reset.",
  },
  {
    q: "Can I cancel or pause anytime?",
    a: "Yes. There's no long-term contract. Pause for winter, vacation or any reason — just give us a heads up before your next scheduled service.",
  },
  {
    q: "Can I switch between Deep Clean and Complete each visit?",
    a: "Absolutely. Many clients alternate — Complete in summer, Interior Deep Clean in winter. Your discount applies either way.",
  },
  {
    q: "Does the discount apply to add-ons?",
    a: "Yes. Plan members save on every add-on too — up to 15% off pet hair removal, ozone treatments, ceramic spray, engine bay, headlight restoration and more.",
  },
  {
    q: "What about SUVs and trucks?",
    a: "Larger vehicles have a small size surcharge ($30–$60 over sedan pricing) reflecting extra time and product. Your plan discount still applies on top.",
  },
  {
    q: "Is there a sign-up fee?",
    a: "No sign-up fee. You only pay per service at your discounted rate.",
  },
  {
    q: "What if I miss a scheduled service?",
    a: "Life happens — we'll reschedule. Missing more than two cycles in a row may pause your plan, but you can resume anytime.",
  },
];

const MonthlyPlan = () => {
  const [freq, setFreq] = useState("1");
  const [size, setSize] = useState<SizeKey>("sedan");
  const selected = useMemo(
    () => FREQUENCIES.find((f) => f.value === freq) ?? FREQUENCIES[0],
    [freq]
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEO
          title="Xpress Pass Monthly Detailing"
          description="Join 200+ Calgarians on The Xpress Pass — our monthly detailing membership. Save up to 20% on Interior Deep Clean and Complete Showroom Reset packages — plus discounted add-ons. Pick your frequency."
          canonical="/monthly-plan"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />

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
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary">
                  200+ Calgary Members
                </span>
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] mb-5">
                The <span className="text-primary">Xpress</span> Pass
              </h1>
              <p className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto lg:mx-0 leading-relaxed mb-3">
                Calgary's only monthly detailing membership.
              </p>
              <p className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Save up to <span className="text-primary font-bold">20%</span> on every package
                and <span className="text-primary font-bold">15% off all add-ons</span> — for as long as you're a member.
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
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-xl hover:bg-white/15 transition-colors w-full sm:w-auto"
                >
                  See My Discount
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7 text-xs font-heading font-semibold uppercase tracking-wider text-brand-gray">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No Contract</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> No Sign-Up Fee</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Cancel Anytime</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Satisfaction Guarantee</span>
              </div>
            </div>

            {/* Right: members card */}
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


        {/* Promo Banner */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="container max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Tag className="w-5 h-5 shrink-0" />
              <p className="font-heading font-bold uppercase tracking-wider text-sm sm:text-base">
                New Plan Members: Lock In Your Discount Today — Rates Increase Jan 1
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="bg-white text-primary font-heading font-bold uppercase tracking-wider text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors shrink-0"
            >
              Call to Lock In
            </a>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="py-16 sm:py-20 bg-background scroll-mt-24">
          <div className="container max-w-5xl px-6">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="text-sm font-heading font-bold uppercase tracking-widest text-primary mb-3">
                  See Your Discount
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                  Pick Your <span className="text-gradient">Frequency &amp; Vehicle</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                  The more often we visit, the more you save. Choose what fits your routine.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Service Frequency
                </label>
                <Select value={freq} onValueChange={setFreq}>
                  <SelectTrigger className="h-14 text-base font-semibold">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((f) => (
                      <SelectItem key={f.value} value={f.value} className="text-base">
                        {f.label} — Save {f.discount}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Vehicle Size
                </label>
                <Select value={size} onValueChange={(v) => setSize(v as SizeKey)}>
                  <SelectTrigger className="h-14 text-base font-semibold">
                    <Car className="w-4 h-4 mr-2 text-primary" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(SIZE_LABELS) as SizeKey[]).map((k) => (
                      <SelectItem key={k} value={k} className="text-base">
                        {SIZE_LABELS[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground -mt-6 mb-10">
              You'll save{" "}
              <span className="text-primary font-bold">{selected.discount}%</span>{" "}
              on every {selected.cadence} package + {" "}
              <span className="text-primary font-bold">{selected.addOnDiscount}% off</span> all add-ons.
            </p>

            {/* Package pricing */}
            <div className="grid md:grid-cols-2 gap-6">
              {PACKAGES.map((pkg) => {
                const base = pkg.prices[size];
                const discounted = base * (1 - selected.discount / 100);
                const savings = base - discounted;
                return (
                  <div
                    key={pkg.name}
                    className={`relative rounded-2xl border bg-card p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      pkg.popular
                        ? "ring-2 ring-primary/40 shadow-xl shadow-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-urgency text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-heading font-black text-lg uppercase leading-tight">
                        {pkg.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {pkg.blurb}
                    </p>

                    <div className="flex items-end gap-3 mb-1">
                      <span className="font-heading font-black text-4xl text-primary">
                        {money(discounted)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through pb-1">
                        {money(base)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-success mb-5">
                      You save {money(savings)} every visit · {SIZE_LABELS[size]}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.time}</span>
                      <span className="text-muted-foreground">•</span>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Satisfaction Guarantee</span>
                    </div>

                    <a
                      href={PHONE_HREF}
                      className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call to Start — {PHONE}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Vehicle size reference — adaptive */}
            <div className="mt-10 bg-muted/40 border border-border rounded-2xl p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <h3 className="font-heading font-bold uppercase tracking-wider text-sm">
                    Your Vehicle: <span className="text-primary">{SIZE_LABELS[size]}</span>
                  </h3>
                </div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Pre-Discount Rates
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {PACKAGES.map((pkg) => {
                  const base = pkg.prices[size];
                  const discounted = base * (1 - selected.discount / 100);
                  return (
                    <div key={pkg.name} className="bg-card border border-border rounded-xl p-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-heading font-bold uppercase text-xs tracking-wider text-muted-foreground mb-1">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Member: <span className="font-bold text-success">{money(discounted)}</span>
                        </p>
                      </div>
                      <p className="font-heading font-black text-2xl text-foreground shrink-0">
                        {money(base)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Add-On Savings */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container max-w-5xl px-6">
            <div className="text-center mb-10">
              <p className="text-sm font-heading font-bold uppercase tracking-widest text-primary mb-3">
                Plan Member Perks
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                Save On <span className="text-gradient">Every Add-On</span>, Too
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Plan members get up to <span className="font-bold text-primary">15% off</span> any
                add-on at every visit. Combine with your package discount for maximum value.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ADD_ONS.map((a) => {
                const memberPrice = a.price * (1 - selected.addOnDiscount / 100);
                return (
                  <div
                    key={a.name}
                    className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-primary/30 transition-colors"
                  >
                    <div>
                      <p className="font-heading font-bold text-sm uppercase tracking-wide mb-1">
                        {a.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Regular <span className="line-through">${a.price}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading font-black text-2xl text-primary leading-none">
                        ${memberPrice.toFixed(0)}
                      </p>
                      <p className="text-[10px] font-heading font-bold uppercase tracking-wider text-success mt-1">
                        Member Price
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials — featured */}
        <section className="relative py-20 sm:py-28 bg-brand-dark text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={bannerImg} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark" />
          <div className="container relative max-w-7xl px-6">
            <div className="text-center mb-14">
              <p className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.3em] text-primary mb-4">
                What Members Say
              </p>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-[1.05]">
                Real Calgarians.
                <br />
                <span className="text-primary">Real Results.</span>
              </h2>
              <div className="flex items-center justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
                <span className="ml-3 font-heading font-bold text-sm uppercase tracking-wider text-brand-gray">
                  5.0 from 200+ Members
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.name}
                  className={`relative bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-primary/40 hover:bg-white/[0.07] transition-all ${
                    idx === 1 ? "md:scale-105 md:shadow-2xl md:shadow-primary/20 ring-1 ring-primary/30" : ""
                  }`}
                >
                  <Quote className="w-12 h-12 text-primary mb-5" strokeWidth={1.5} />
                  <p className="font-heading text-xl sm:text-2xl leading-[1.35] text-primary-foreground mb-8 font-medium">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="font-heading font-black text-base uppercase tracking-wide text-primary-foreground">
                      {t.name}
                    </p>
                    <p className="text-sm text-brand-gray mt-1">
                      {t.vehicle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Process */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                How It <span className="text-gradient">Works</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {PROCESS.map((p) => (
                <div key={p.step} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 transition-colors">
                  <div className="font-heading font-black text-5xl text-primary/30 mb-3 leading-none">
                    {p.step}
                  </div>
                  <h3 className="font-heading font-bold text-lg uppercase mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                Why <span className="text-gradient">200+ Calgarians</span> Are On The Plan
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Always Showroom-Ready",
                  body: "Your vehicle never falls behind. Photo-ready for clients, family, or resale anytime.",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  title: "Locked-In Savings",
                  body: "Up to 20% off every visit + 15% off add-ons. No coupons, no fine print — it's automatic.",
                },
                {
                  icon: <Calendar className="w-5 h-5" />,
                  title: "Set & Forget Scheduling",
                  body: "We reach out, you confirm. No tracking dates or chasing appointments.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  title: "Priority Booking",
                  body: "Plan members get first access to peak-season slots before public availability.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-base uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery strip */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-6xl px-6">
            <div className="text-center mb-10">
              <p className="text-sm font-heading font-bold uppercase tracking-widest text-primary mb-3">
                Real Plan Member Vehicles
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                Maintained by <span className="text-gradient">Xpress</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {[gal1, gal2, gal3, gal4, gal5, gal6].map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl group">
                  <img
                    src={src}
                    alt={`Monthly plan member vehicle ${i + 1} detailed by Xpress Auto`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-3xl px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                The Xpress Pass <span className="text-gradient">FAQs</span>
              </h2>
            </div>
            <div className="space-y-4">
              {monthlyFAQs.map((f) => (
                <div
                  key={f.q}
                  className="bg-card border border-border rounded-xl p-5 sm:p-6"
                >
                  <p className="font-heading font-bold text-base sm:text-lg mb-2">
                    {f.q}
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-brand-dark text-primary-foreground">
          <div className="container max-w-3xl text-center px-6">
            <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase mb-4">
              Ready To Join The <span className="text-primary">Plan?</span>
            </h2>
            <p className="text-brand-gray text-lg mb-8 max-w-xl mx-auto">
              Call us and we'll get you set up in under 5 minutes. Pick your frequency, lock in your discount, and never think about it again.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-sm sm:text-base px-8 py-4 rounded-xl hover:bg-brand-blue-deep transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call {PHONE} to Start
            </a>
            <p className="text-xs text-brand-gray mt-5 uppercase tracking-widest">
              Serving Calgary · Airdrie · Chestermere · Cochrane
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
