import PageTransition from "@/components/PageTransition";
import SeasonalPromoPopup from "@/components/SeasonalPromoPopup";
import Navbar from "@/components/Navbar";
import GalleryCarousel from "@/components/GalleryCarousel";
import BeforeAfterCard from "@/components/BeforeAfterCard";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import completeHero from "@/assets/complete-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";
import { ArrowRight, TrendingUp, Clock, DollarSign, Sparkles, ShieldCheck, Heart, Check, Snowflake } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const completeFAQs = [
  { q: "How long does a complete detail take?", a: "The Showroom Reset takes approximately 2.5–3 hours. The Showroom Reset + Protection takes 3–3.5 hours. Heavily soiled vehicles may require additional time." },
  { q: "Is a complete detail worth the extra cost over separate interior/exterior?", a: "Absolutely. Bundling saves you money compared to booking interior and exterior separately, plus the detailer can ensure a seamless result without rushing between appointments." },
  { q: "Should I get a complete detail before selling my car?", a: "100% yes. A professional detail can increase your perceived vehicle value by $1,000–$3,000. It's one of the highest-ROI investments you can make before listing." },
  { q: "How often should I get a complete detail?", a: "We recommend a full complete detail 2–4 times per year (once per season), with exterior maintenance washes in between. Monthly clients get the best long-term results." },
  { q: "Can you come to my workplace and do the detail while I work?", a: "Yes! Many of our clients book during work hours. We just need access to the vehicle and ideally a water/power source. We'll have it done by the time you clock out." },
  { q: "What's included in the 25% off Engine Bay Detail bonus?", a: "When you book the Showroom Reset + Protection, you get 25% off our full engine bay detail — which includes degreasing, pressure rinsing, and dressing all engine components for a like-new engine bay." },
];

const completeTestimonials = [
  { quote: "I was about to trade in my Highlander. Got it detailed first with the Showroom Reset + Protection and the dealer offered me $2,500 more than their original quote. Best $240 I've ever spent.", name: "Marcus D.", location: "Cochrane", service: "Showroom Reset + Protection" },
  { quote: "We get both our family cars done every spring and fall. The complete detail keeps them in amazing shape year-round. The convenience of mobile service makes it a no-brainer.", name: "The Nguyen Family", location: "Calgary SE", service: "Showroom Reset (Seasonal)" },
  { quote: "Bought a used Honda Accord that smelled like the previous owner's dog. After the Showroom Reset + Protection, it looked and smelled like a brand new car. My wife couldn't believe it.", name: "Chris B.", location: "Airdrie", service: "Showroom Reset + Protection" },
  { quote: "I'm a contractor and my truck takes a beating. The complete detail every few months keeps it looking professional for clients. Worth every cent.", name: "Derek S.", location: "Okotoks", service: "Showroom Reset" },
];

const CompleteDetailing = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Complete Car Detailing Calgary — Full Interior & Exterior"
      description="The ultimate top-to-bottom mobile detail. Interior deep clean + exterior hand wash, clay bar & sealant — all at your door. Prices from $189. Book now."
      canonical="/complete-detailing"
      jsonLd={[
        buildServiceJsonLd("Complete Detailing", "Full interior and exterior mobile detailing in Calgary.", "/complete-detailing"),
        buildFAQJsonLd(completeFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Complete Detailing Services in Calgary and Surrounding Areas" image={completeHero} />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
            The Ultimate <span className="text-primary">Head-to-Toe</span> Vehicle Reset
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            Why book two appointments when one gets you everything? Our complete detailing packages combine the best of our interior and exterior services into a single, comprehensive transformation — at a better price than booking separately.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Whether you're prepping for a sale, recovering from a harsh winter, or just want your car to feel <em>brand new</em> again, this is our most popular service for a reason. It's the full reset — inside and out.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Why Complete Detail - Value Props */}
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
            Why <span className="text-primary">Complete Detailing</span> Is Worth Every Dollar
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
          {[
            { icon: DollarSign, title: "Save vs. Separate Bookings", desc: "Bundling interior + exterior saves you $30–$50 compared to booking each service individually. Same quality, better price." },
            { icon: TrendingUp, title: "Boost Resale Value", desc: "A professional detail can increase your vehicle's perceived value by $1,000–$3,000. It's the highest-ROI investment before listing." },
            { icon: Clock, title: "Done While You Work", desc: "We detail at your home or office. Drop the keys, go about your day, come back to a transformed vehicle." },
            { icon: Sparkles, title: "Every Surface, Every Crevice", desc: "From engine bay to trunk, dashboard to wheel wells — nothing gets overlooked. It's the most thorough clean your car has ever had." },
            { icon: ShieldCheck, title: "Protected for Months", desc: "Clay bar treatment, wax sealant, UV protectant, and fabric guard keep your vehicle looking its best for 2–3 months after service." },
            { icon: Heart, title: "That New Car Feeling", desc: "Step into a cabin that smells fresh, sit on seats that feel like new, and drive a car with paint that gleams. Nothing beats it." },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-5 sm:p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
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
            Complete Detailing Packages
          </h2>
          <p className="text-center text-primary-foreground/60 font-heading text-sm uppercase tracking-widest mb-12">
            Our most popular service — interior + exterior in one visit
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="Showroom Reset"
            price="$209.99"
            tagline="Perfect for: Selling your car, impressing clients, or giving your ride a fresh start."
            features={[
              "No contact pre-wash",
              "Soft contact hand wash",
              "Soft contact hand dry & blow dry",
              "Tire and wheel cleaning & shine",
              "Streak-free window cleaning",
              "Deep vacuum of seats, carpets, and trunk",
              "Dash, console, trim, and panels detailed and dressed",
              "Leather seats steam cleaned and conditioned",
              "Rubber mats washed, scrubbed & dressed",
              "Carpets shampooed & steam cleaned",
              "Vents, buttons, and tight surfaces thoroughly cleaned",
              "Vent blowout & light air freshening",
            ]}
            addOns={[
              { name: "Pet Hair Removal", price: "+$55" },
              { name: "Headlight Restoration", price: "+$80" },
              { name: "Engine Bay Cleaning", price: "+$50" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 2.5-3 hrs | Mobile anywhere in Calgary"
          />
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="Showroom Reset + Protection"
            price="$239.99"
            tagline="Perfect for: Long-lasting shine, winter prep, or top-tier presentation."
            features={[
              "Everything in the Showroom Reset PLUS:",
              "Door jambs pressure washed",
              "Bug & tar removal",
              "Deep brake dust cleaning",
              "Clay bar treatment",
              "Protective wax coat",
              "Fabric seats shampooed including stain removal",
              "Sticky residue removal",
              "Door jambs cleaned",
              "Complete surface UV protection & dressing",
            ]}
            bonuses={[
              "🎁 Bonus: Interior protectant application ($50 value)",
              "🎁 Bonus: IronX Paint Imperfection Treatment ($40 value)",
              "🎁 Bonus: 25% OFF Engine Bay Detail",
            ]}
            addOns={[
              { name: "Ceramic Spray Sealant Upgrade", price: "+$50" },
              { name: "Odour Elimination", price: "+$75" },
              { name: "Headlight Restoration", price: "+$80" },
              { name: "Trim Restoration", price: "+$35" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 3-3.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Mid-page CTA */}
    <section className="py-10 sm:py-14 bg-primary">
      <div className="container text-center">
        <ScrollReveal>
          <p className="text-primary-foreground/80 font-heading uppercase tracking-wider text-sm mb-3">Our #1 Most Booked Service</p>
          <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
            Save Money. Save Time. Get Everything.
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
            Interior + exterior in one appointment. Better results, better price, zero hassle. Join hundreds of Calgary drivers who choose the complete package.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all group">
            Book the Complete Package
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>

    {/* Use Cases */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            When Should You Book a <span className="text-primary">Complete Detail</span>?
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto text-sm sm:text-base">
            A complete detail is more than a wash and vacuum — it's a full vehicle reset. Here are the most common reasons our clients book this service.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <ScrollReveal delay={0.1}>
            <BeforeAfterCard
              beforeIcon={<DollarSign className="w-5 h-5" />}
              beforeTitle="Before Selling or Trading In"
              beforeText="Buyers judge with their eyes (and nose). A vehicle with visible stains, dull paint, and lingering odors signals neglect — and gives them leverage to negotiate you down by thousands."
              afterTitle="After: Sell for Top Dollar"
              afterText="A detailed vehicle photographs better, shows better in person, and commands a higher price. Our clients regularly tell us their $240 detail earned them $1,500–$3,000 more at sale time."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <BeforeAfterCard
              beforeIcon={<Snowflake className="w-5 h-5" />}
              beforeTitle="Post-Winter Recovery"
              beforeText="Five months of salt, sand, and slush have left your carpets stained, your paint dull, and your cabin smelling like wet boots. The winter damage is everywhere."
              afterTitle="After: Spring Ready"
              afterText="Salt extracted from carpets. Paint decontaminated and sealed. Dashboard conditioned and UV-protected. Your car is ready for spring — and so are you."
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <GalleryCarousel />
    <TestimonialBlock testimonials={completeTestimonials} />
    <ServiceFAQ title="Complete Detailing FAQs" faqs={completeFAQs} />

    {/* CTA */}
    <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-brand-blue-deep">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={interiorImg} alt="Complete detailing result" className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground mb-4">The Ultimate Transformation Awaits</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 text-sm sm:text-base">
              Give your vehicle the complete treatment it deserves — inside and out. We come to your home or office, and your car comes back to life.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8">
              ✓ Save vs. separate bookings &nbsp; ✓ $90+ in free bonuses &nbsp; ✓ 14-day guarantee
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group">
              Book My Complete Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <Footer />
    <SeasonalPromoPopup />
  </div></PageTransition>
);

export default CompleteDetailing;
