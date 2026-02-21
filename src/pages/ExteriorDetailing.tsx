import PageTransition from "@/components/PageTransition";
import SeasonalPromoPopup from "@/components/SeasonalPromoPopup";
import Navbar from "@/components/Navbar";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import exteriorHero from "@/assets/exterior-hero.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";
import { Snowflake, Sun, CloudRain, Droplets, ShieldCheck, Zap, ArrowRight, Check, Shield } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const exteriorFAQs = [
  { q: "How is a professional exterior detail different from a car wash?", a: "A car wash uses automated brushes that can scratch your paint. Our hand wash uses the two-bucket method, pH-neutral soap, and microfiber mitts that are safe for your clear coat. Plus, we decontaminate, clay bar, and protect — steps a car wash skips entirely." },
  { q: "Will the clay bar scratch my paint?", a: "When used properly with a lubricant spray, clay bar treatment is completely safe. It removes embedded contaminants like iron particles, brake dust, and tree sap that washing alone can't remove." },
  { q: "How long does the wax protection last?", a: "Our high-quality carnauba and synthetic wax blends typically last 2–3 months depending on weather exposure and how often you wash the vehicle. For longer protection, ask about our ceramic spray sealant upgrade." },
  { q: "Can you detail my car in the rain?", a: "Light rain isn't usually an issue for most exterior services, but heavy rain may require rescheduling. We'll always communicate with you if weather affects your appointment." },
  { q: "Do you bring your own water and power?", a: "We're fully self-sufficient with water tanks and generators, but access to your outdoor tap makes the process faster and more eco-friendly. We'll work with whatever's available." },
];

const exteriorTestimonials = [
  { quote: "My black F-150 was covered in water spots and looked grey. After the Gloss Refresh + Armor, the paint depth came back and the truck looks jet black again. Incredible transformation.", name: "Tyler R.", location: "Airdrie", service: "Gloss Refresh + Armor" },
  { quote: "I get my Lexus detailed monthly with the Gloss Refresh. It's quick, affordable, and keeps my car looking showroom-fresh year-round. Wouldn't trust anyone else.", name: "Sarah L.", location: "Calgary SW", service: "Gloss Refresh (Monthly)" },
  { quote: "The brake dust on my BMW wheels was baked on. They got every bit of it off and the wheels look factory new. The attention to detail is next level.", name: "Kevin W.", location: "Calgary NW", service: "Gloss Refresh + Armor" },
  { quote: "Had tree sap all over my hood from parking under a maple tree for months. They removed it all without damaging the paint. Saved me from a respray.", name: "Linda C.", location: "Cochrane", service: "Gloss Refresh + Armor" },
];

const ExteriorDetailing = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Exterior Car Detailing Calgary — Mobile Hand Wash"
      description="Professional hand wash, clay bar & paint sealant — done at your location. Remove contaminants, restore shine & protect your finish. Book online today."
      canonical="/exterior-detailing"
      jsonLd={[
        buildServiceJsonLd("Exterior Detailing", "Professional mobile exterior car detailing in Calgary. Hand wash, clay bar, and sealant protection.", "/exterior-detailing"),
        buildFAQJsonLd(exteriorFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Exterior Detailing Services in Calgary and Surrounding Areas" image={exteriorHero} />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
            Calgary's Weather Is <span className="text-primary">Destroying Your Paint</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            Between road salt, gravel highways, intense UV, and chinook temperature swings, Calgary is one of the hardest cities in Canada on your vehicle's exterior. Every season brings new threats — and automatic car washes with their spinning brushes only make it worse by grinding contaminants into your clear coat.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Professional exterior detailing doesn't just clean — it <strong className="text-foreground">decontaminates, corrects, and protects</strong>. We restore your paint's depth and brilliance, then seal it with a protective barrier that repels the elements for months.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Calgary Seasonal Threats */}
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            What Calgary Does to Your Paint — <span className="text-primary">Season by Season</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Your paint faces different attacks every season. Here's why year-round exterior care isn't optional — it's essential.
          </p>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
          {[
            { icon: Snowflake, season: "Winter", color: "text-blue-400", threats: ["Road salt corrosion", "Gravel chip damage", "Calcium buildup", "Frozen grime bonding"] },
            { icon: CloudRain, season: "Spring", color: "text-green-500", threats: ["Pollen embedding", "Tree sap bonding", "Water spot etching", "Winter damage revealed"] },
            { icon: Sun, season: "Summer", color: "text-amber-500", threats: ["UV paint oxidation", "Bug splatter acid", "Bird dropping etching", "Tar from hot roads"] },
            { icon: Droplets, season: "Fall", color: "text-orange-500", threats: ["Leaf tannin staining", "Early frost damage", "Pre-salt preparation", "Moisture trapping"] },
          ].map((item) => (
            <StaggerItem key={item.season}>
              <div className="p-5 sm:p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-3">{item.season}</h3>
                <ul className="space-y-1.5">
                  {item.threats.map((t) => (
                    <li key={t} className="text-muted-foreground text-xs sm:text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Packages */}
    <section className="section-dark py-16 sm:py-20">
      <div className="container">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center mb-4">
            Exterior Detailing Packages
          </h2>
          <p className="text-center text-primary-foreground/60 font-heading text-sm uppercase tracking-widest mb-12">
            Professional hand wash &amp; protection — never a machine
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Droplets className="w-8 h-8" />}
            name="Gloss Refresh"
            price="$79.99"
            tagline="Perfect for: Quick exterior touch-ups before a big event, seasonal change, or just to turn heads on the road."
            features={[
              "No contact pre-wash",
              "Soft contact hand wash",
              "Soft contact hand dry & blow dry",
              "Tire and wheel cleaning & shine",
              "Streak-free window cleaning",
            ]}
            addOns={[
              { name: "Bug & Tar Removal", price: "+$25" },
              { name: "Trim Restoration", price: "+$35" },
              { name: "Rain Repellent Coating", price: "+$30" },
            ]}
            surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/Trucks/Minivans"]}
          />
          <PackageCard
            icon={<Shield className="w-8 h-8" />}
            name="Gloss Refresh + Armor"
            price="$99.99"
            tagline="Perfect for: Drivers who want a showroom finish that lasts, even through Calgary's harsh weather."
            features={[
              "Everything in Gloss Refresh PLUS:",
              "Door jambs pressure washed",
              "Bug & tar removal",
              "Deep brake dust cleaning",
              "Clay bar treatment",
              "Protective wax coat",
            ]}
            addOns={[
              { name: "Engine Bay Cleaning", price: "+$50" },
              { name: "Headlight Restoration", price: "+$80" },
              { name: "Ceramic Spray Sealant Upgrade", price: "+$50" },
              { name: "Wheel Ceramic Coating", price: "+$80" },
            ]}
            surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/Trucks/Minivans"]}
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Car Wash vs Professional Detail */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            Car Wash vs. <span className="text-primary">Professional Detail</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Think your $15 car wash is enough? Here's what you're actually getting — and what you're missing.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 p-4">
              <span className="font-heading font-bold text-foreground text-xs sm:text-sm uppercase" />
              <span className="font-heading font-bold text-muted-foreground text-xs sm:text-sm uppercase text-center">Car Wash</span>
              <span className="font-heading font-bold text-primary text-xs sm:text-sm uppercase text-center">Xpress Detail</span>
            </div>
            {[
              ["Safe for paint?", false, true],
              ["Removes contaminants?", false, true],
              ["Clay bar treatment?", false, true],
              ["Protects against UV?", false, true],
              ["Wheels hand-cleaned?", false, true],
              ["Water beading finish?", false, true],
              ["Door jambs cleaned?", false, true],
              ["Mobile — comes to you?", false, true],
            ].map(([label, carWash, xpress], i) => (
              <div key={i} className={`grid grid-cols-3 p-3 sm:p-4 ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                <span className="text-foreground text-xs sm:text-sm">{label as string}</span>
                <span className="text-center text-muted-foreground text-sm">✗</span>
                <span className="text-center text-primary text-sm">
                  <Check className="w-4 h-4 mx-auto" />
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Mid-page CTA */}
    <section className="py-10 sm:py-14 bg-primary">
      <div className="container text-center">
        <ScrollReveal>
          <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
            Stop Settling for "Clean Enough"
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
            Your vehicle deserves better than automated brushes and recycled water. Experience the difference of a true hand detail — we come to you.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all group">
            Book My Exterior Detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>

    {/* Our Process */}
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
            Our <span className="text-primary">5-Step</span> Exterior Process
          </h2>
        </ScrollReveal>
        <div className="space-y-6">
          {[
            { step: "1", title: "Contactless Pre-Wash", desc: "We soak the vehicle with a high-pressure foam cannon to lift and dissolve surface dirt before anything touches the paint. This critical first step prevents micro-scratches." },
            { step: "2", title: "Two-Bucket Hand Wash", desc: "Using the two-bucket method with pH-neutral soap and premium microfiber mitts, we hand-wash every panel. No spinning brushes, no cross-contamination." },
            { step: "3", title: "Decontamination & Clay Bar", desc: "Iron fallout remover dissolves embedded brake dust and metal particles. Clay bar treatment removes bonded contaminants, leaving the paint glass-smooth." },
            { step: "4", title: "Protection Application", desc: "We seal the paint with a premium wax or ceramic spray sealant that creates a hydrophobic barrier — water beads and sheets off, keeping your car cleaner longer." },
            { step: "5", title: "Wheels, Tires & Final Touches", desc: "Wheels are hand-cleaned with wheel-safe acid-free products. Tires dressed. Windows streak-free. Every detail inspected under natural light." },
          ].map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.08}>
              <div className="flex gap-5 items-start p-5 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-primary-foreground text-sm">{item.step}</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <BeforeAfterSlider />
    <TestimonialBlock testimonials={exteriorTestimonials} />
    <ServiceFAQ title="Exterior Detailing FAQs" faqs={exteriorFAQs} />

    {/* CTA */}
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-brand-blue-deep">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground mb-4">Your Vehicle Deserves Better</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 text-sm sm:text-base">
              Don't let Calgary's elements ruin your finish. Book a professional exterior detail and keep your vehicle turning heads all year long.
            </p>
             <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-primary-foreground/60 text-sm mb-8">
               <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Hand wash only</span>
               <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Paint-safe products</span>
               <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Mobile to your location</span>
             </div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group">
              Schedule My Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={exteriorImg} alt="Exterior detailing result" className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
    <SeasonalPromoPopup />
  </div></PageTransition>
);

export default ExteriorDetailing;
