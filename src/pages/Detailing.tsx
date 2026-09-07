import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import GalleryCarousel from "@/components/GalleryCarousel";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import completeHero from "@/assets/gallery-22.jpg";
import {
  Sparkles, Shield, Droplets, ShieldCheck, ArrowRight, Dog, Wind, Lightbulb, Car,
} from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

type TabKey = "interior" | "exterior" | "complete" | "add-ons";

const TABS: { key: TabKey; label: string }[] = [
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "complete", label: "Complete" },
  { key: "add-ons", label: "Add-Ons" },
];

const detailingFAQs = [
  { q: "How long does a detail take?", a: "Exterior packages run about 1.33–2.33 hours, interior packages about 1.83–2.83 hours, and a complete detail about 3.33–3.83 hours. Heavily soiled vehicles may take longer — we'll tell you upfront." },
  { q: "Do you come to me?", a: "Yes. We are fully mobile across Calgary, Airdrie, Chestermere and Cochrane. We just need access to the vehicle and, ideally, a nearby water and power source." },
  { q: "Is a complete detail better value than booking separately?", a: "Yes. Bundling interior and exterior into one visit costs less than two separate appointments and gives a more consistent finish." },
  { q: "Do I need to be home during the service?", a: "Not necessarily. Many clients leave the keys and carry on with their day while we work." },
  { q: "How often should I book?", a: "A complete detail two to four times a year, with maintenance washes in between, keeps most vehicles in excellent shape year-round." },
];

const addOns = [
  { icon: Dog, name: "Excess Pet Hair Removal", price: "$55", description: "Lifts embedded pet hair from seats, carpets, mats and hard-to-reach areas." },
  { icon: Sparkles, name: "Heavily Soiled Interior", price: "$75", description: "Extra time and tools for severe dirt, stains or buildup. Add-on to the interior premium package." },
  { icon: Sparkles, name: "Headliner Shampoo", price: "$40", description: "Shampoo and steam clean the headliner, including stain removal, for a fresh uniform finish." },
  { icon: Wind, name: "Odour Elimination", price: "$75", description: "Neutralizes deep-set smells from pets, smoke, food or mildew with up to two ozone rounds." },
  { icon: Shield, name: "Tree Sap Removal", price: "$75", description: "Safely dissolves and lifts sap before it etches or stains your clear coat." },
  { icon: Lightbulb, name: "Headlight Restoration", price: "$80", description: "Wet-sand, polish and seal both headlights to restore clarity and night visibility." },
  { icon: Car, name: "Engine Bay Cleaning", price: "$50", description: "Degrease, rinse and dress all components using engine-safe chemicals and full component protection." },
  { icon: Droplets, name: "Ceramic Spray Sealant Upgrade", price: "$75", description: "Upgrade from wax to a ceramic spray sealant lasting 3–6 months longer with deeper gloss." },
];

const TabPanel = ({ children }: { children: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">{children}</div>
);

const Detailing = () => {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const initial = (params.get("tab") as TabKey) || (location.hash.replace("#", "") as TabKey) || "interior";
  const [tab, setTab] = useState<TabKey>(TABS.some((t) => t.key === initial) ? initial : "interior");

  useEffect(() => {
    const next = params.get("tab") as TabKey | null;
    if (next && TABS.some((t) => t.key === next) && next !== tab) setTab(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const selectTab = (key: TabKey) => {
    setTab(key);
    setParams({ tab: key }, { replace: true });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEO
          title="Car Detailing Calgary | Interior, Exterior & Complete"
          description="Mobile car detailing in Calgary — interior deep cleans, exterior hand wash and full complete details, plus add-ons. We come to you. Book online."
          canonical="/detailing"
          jsonLd={[
            buildServiceJsonLd("Car Detailing", "Mobile interior, exterior and complete car detailing in Calgary.", "/detailing"),
            buildFAQJsonLd(detailingFAQs),
          ]}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <ServicePageHero title="Car Detailing in Calgary and Surrounding Areas" image={completeHero} />

        {/* Intro */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-3xl text-center px-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-5">
                One Page. Every Detailing Option.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Interior, exterior, complete details and every add-on — all in one place, all fully mobile across Calgary, Airdrie, Chestermere and Cochrane.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs + packages */}
        <section className="py-14 sm:py-20 bg-foreground">
          <div className="container px-4 sm:px-6">
            <div
              role="tablist"
              aria-label="Detailing categories"
              className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14"
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => selectTab(t.key)}
                  className={`font-heading font-bold uppercase tracking-wider text-xs sm:text-sm px-5 sm:px-7 py-2.5 rounded-full transition-colors ${
                    tab === t.key
                      ? "bg-primary text-primary-foreground"
                      : "text-background/60 border border-background/20 hover:text-background hover:border-background/40"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "interior" && (
              <TabPanel>
                <PackageCard
                  icon={<Sparkles className="w-8 h-8" />}
                  name="Fresh Start (Base Package)"
                  price="$169.99"
                  tagline="A professional refresh for light cleanup and regular maintenance — keeps your cabin feeling fresh between deep cleans."
                  features={[
                    "Full vacuum of seats, carpets, trunk & crevices",
                    "Dashboard, console & door panel wipe-down",
                    "Seats scrubbed & surface-cleaned (fabric or leather)",
                    "All interior windows & mirrors streak-free cleaned",
                    "Rubber/vinyl floor mats washed, dressed & reinstalled",
                    "Air vents dusted & cup holders detailed",
                  ]}
                  addOns={[
                    { name: "Pet Hair Removal", price: "+$55" },
                    { name: "Ozone Odour Elimination", price: "+$75" },
                    { name: "Trunk Deep Clean", price: "+$30" },
                  ]}
                  surcharges={["Add $50 for SUVs/trucks", "Add $70 for 3-row SUVs/minivans"]}
                  time="~1.83–2.33 hrs | Mobile anywhere in Calgary"
                />
                <PackageCard
                  icon={<Shield className="w-8 h-8" />}
                  name="Deep Clean + Shield"
                  price="$199.99"
                  tagline="Full interior transformation — embedded stains, winter salt, pet mess and odours eliminated and protected."
                  features={[
                    "Everything in Fresh Start included",
                    "Hot water extraction shampoo on all carpets & fabric seats",
                    "Steam cleaning of hard-to-reach areas & crevices",
                    "Leather deep clean + conditioning treatment",
                    "UV protectant applied to dash, trim & all plastics",
                    "Door jambs cleaned & dried",
                    "Interior protectant on all surfaces (long-lasting shield)",
                  ]}
                  bonuses={["Interior protectant treatment ($50 value) — included"]}
                  addOns={[
                    { name: "Pet Hair Removal", price: "+$55" },
                    { name: "Ozone Odour Elimination", price: "+$75" },
                    { name: "Headliner Deep Clean", price: "+$40" },
                  ]}
                  surcharges={["Add $50 for SUVs/trucks", "Add $70 for 3-row SUVs/minivans"]}
                  time="~2.33–2.83 hrs | Mobile anywhere in Calgary"
                  isPrimary
                />
              </TabPanel>
            )}

            {tab === "exterior" && (
              <TabPanel>
                <PackageCard
                  icon={<Droplets className="w-8 h-8" />}
                  name="Gloss Refresh"
                  price="$89.99"
                  tagline="A thorough hand wash and shine — perfect for regular maintenance or between full details."
                  features={[
                    "Contactless foam pre-wash to loosen dirt safely",
                    "Two-bucket method hand wash with pH-neutral soap",
                    "Tire, wheel & wheel well cleaning + tire shine",
                    "Streak-free window & mirror cleaning (exterior)",
                    "Compressed air blow dry for a spot-free finish",
                    "Final walk-around inspection with you",
                  ]}
                  addOns={[
                    { name: "Bug & Tar Removal", price: "+$25" },
                    { name: "Rain Repellent Windshield Coating", price: "+$30" },
                    { name: "Trim Restorer (faded plastics)", price: "+$25" },
                  ]}
                  surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/trucks/minivans"]}
                  time="~1.33–1.83 hrs | Mobile anywhere in Calgary"
                />
                <PackageCard
                  icon={<Shield className="w-8 h-8" />}
                  name="Gloss Refresh + Armor"
                  price="$109.99"
                  tagline="Deep decontamination plus a wax seal for lasting paint protection. Our most popular exterior package."
                  features={[
                    "Everything in Gloss Refresh included",
                    "Clay bar decontamination for glass-smooth paint",
                    "Bug, tar & iron fallout removal",
                    "Hand-applied carnauba & synthetic wax coat",
                    "Door jambs cleaned & dried",
                    "Exhaust tips polished",
                    "Rubber & plastic trim dressed & UV-protected",
                  ]}
                  addOns={[
                    { name: "Engine Bay Cleaning", price: "+$50" },
                    { name: "Headlight Restoration (per pair)", price: "+$80" },
                    { name: "Ceramic Spray Sealant Upgrade", price: "+$50" },
                  ]}
                  surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/trucks/minivans"]}
                  time="~1.83–2.33 hrs | Mobile anywhere in Calgary"
                  isPrimary
                />
              </TabPanel>
            )}

            {tab === "complete" && (
              <div className="max-w-3xl mx-auto">
                <PackageCard
                  icon={<ShieldCheck className="w-8 h-8" />}
                  name="Complete Showroom Reset"
                  price="$269.00"
                  tagline="The ultimate inside-and-out transformation — full interior deep clean plus exterior decontamination, wax and lasting protection."
                  features={[]}
                  featureGroups={[
                    {
                      label: "Exterior",
                      items: [
                        "Full foam pre-wash + two-bucket hand wash & dry",
                        "Tire, wheel & wheel well cleaning + tire shine",
                        "Clay bar paint decontamination (glass-smooth finish)",
                        "Hand-applied carnauba & synthetic wax coat",
                        "Exhaust tips polished",
                        "Door jambs cleaned & dried",
                        "Streak-free windows inside & out",
                      ],
                    },
                    {
                      label: "Interior",
                      items: [
                        "Deep vacuum of seats, carpets, trunk & all crevices",
                        "Dashboard, console & door panels detailed",
                        "Hot water extraction shampoo on carpets & fabric seats",
                        "Steam cleaning of hard-to-reach areas & crevices",
                        "Leather deep clean + conditioning treatment",
                        "UV protectant on dash, trim & all plastics",
                        "Interior protectant (long-lasting shield)",
                      ],
                    },
                  ]}
                  addOns={[
                    { name: "Ceramic Spray Sealant Upgrade", price: "+$110" },
                    { name: "Pet Hair Removal", price: "+$55" },
                    { name: "Ozone Odour Elimination", price: "+$75" },
                    { name: "Headlight Restoration", price: "+$80" },
                  ]}
                  surcharges={["Add $60 for SUVs/trucks", "Add $80 for 3-row SUVs/vans"]}
                  time="~3.33–3.83 hrs | Mobile anywhere in Calgary"
                  isPrimary
                />
              </div>
            )}

            {tab === "add-ons" && (
              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto" staggerDelay={0.06}>
                {addOns.map((item) => (
                  <StaggerItem key={item.name}>
                    <div className="h-full p-6 rounded-2xl bg-background/[0.04] border border-background/10 hover:border-primary/40 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="font-heading font-bold uppercase text-background text-sm">{item.name}</h3>
                        <span className="font-heading font-black text-primary text-base shrink-0">{item.price}</span>
                      </div>
                      <p className="text-background/60 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>

        <GalleryCarousel />
        <ServiceFAQ title="Detailing FAQs" faqs={detailingFAQs} />

        {/* Single closing CTA */}
        <section className="py-16 sm:py-20 bg-foreground">
          <div className="container text-center px-6">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">
                Ready When You Are
              </h2>
              <p className="text-background/60 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                Pick a package, pick a time, and we'll come to your home or office.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm hover:bg-brand-blue-deep transition-colors"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:5875004523"
                  className="inline-flex items-center gap-2 border border-background/25 text-background font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm hover:border-background/60 transition-colors"
                >
                  Call 587-500-4523
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Detailing;
