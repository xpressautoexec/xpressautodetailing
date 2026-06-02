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
} from "lucide-react";

const PHONE = "587-500-4523";
const PHONE_HREF = "tel:5875004523";

const FREQUENCIES = [
  { value: "1", label: "Every Month (Most Popular)", discount: 20, cadence: "monthly" },
  { value: "2", label: "Every 2 Months", discount: 15, cadence: "every 2 months" },
  { value: "3", label: "Every 3 Months", discount: 10, cadence: "every 3 months" },
  { value: "6", label: "Every 6 Months", discount: 5, cadence: "every 6 months" },
];

const PACKAGES = [
  {
    name: "Interior Deep Clean + Shield",
    base: 199.99,
    blurb:
      "Full steam extraction, leather conditioning, stain treatment and an interior protectant shield.",
    time: "2 – 2.5 hrs",
  },
  {
    name: "Complete Showroom Reset",
    base: 269.0,
    blurb:
      "Interior deep clean + full exterior hand wash, clay bar decontamination and sealant. Inside and out.",
    time: "3 – 3.5 hrs",
    popular: true,
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
    a: "The discount applies to the base package price. Add-ons (pet hair, ozone, ceramic spray, etc.) are billed separately at standard pricing.",
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
  const selected = useMemo(
    () => FREQUENCIES.find((f) => f.value === freq) ?? FREQUENCIES[0],
    [freq]
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEO
          title="Monthly Detailing Plan Calgary | Save up to 20%"
          description="Join 200+ Calgarians on the Xpress Auto Detailing Monthly Plan. Save up to 20% on Interior Deep Clean and Complete Showroom Reset packages. Pick your frequency."
          canonical="/monthly-plan"
          jsonLd={[buildFAQJsonLd(monthlyFAQs)]}
        />
        <Navbar />

        {/* Hero */}
        <section className="relative bg-brand-dark text-primary-foreground py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="container relative max-w-4xl text-center px-6">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-primary">
                Over 200 Calgarians On The Plan
              </span>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight mb-5">
              The <span className="text-primary">Monthly Detailing</span> Plan
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Keep your vehicle in showroom condition year-round and save up to{" "}
              <span className="text-primary font-bold">20%</span> on every visit.
              Pick a frequency. We handle the rest.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-5xl px-6">
            <ScrollReveal>
              <div className="text-center mb-10">
                <p className="text-sm font-heading font-bold uppercase tracking-widest text-primary mb-3">
                  See Your Discount
                </p>
                <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                  Pick Your <span className="text-gradient">Frequency</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                  The more often we visit, the more you save. Choose what fits your routine.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-md mx-auto mb-12">
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
              <p className="text-center text-sm text-muted-foreground mt-3">
                You'll save{" "}
                <span className="text-primary font-bold">{selected.discount}%</span>{" "}
                on every {selected.cadence} service.
              </p>
            </div>

            {/* Package pricing */}
            <div className="grid md:grid-cols-2 gap-6">
              {PACKAGES.map((pkg) => {
                const discounted = pkg.base * (1 - selected.discount / 100);
                const savings = pkg.base - discounted;
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
                        {money(pkg.base)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-success mb-5">
                      You save {money(savings)} every visit
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.time}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>14-Day Guarantee</span>
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

            <p className="text-xs text-center text-muted-foreground mt-6 max-w-2xl mx-auto">
              Pricing shown is for sedans. Larger vehicles (SUVs, trucks) may have a size surcharge — your discount still applies. Add-ons billed separately.
            </p>
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
                  body: "Up to 20% off every visit. No coupons, no fine print — it's automatic.",
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

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-3xl px-6">
            <div className="text-center mb-10">
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase">
                Monthly Plan <span className="text-gradient">FAQs</span>
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
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MonthlyPlan;
