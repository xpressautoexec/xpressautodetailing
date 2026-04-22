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
  { q: "Is a complete detail worth the extra cost over separate interior/exterior?", a: "Absolutely. Bundling saves you money compared to booking separately, plus the detailer ensures a seamless result." },
  { q: "Should I get a complete detail before selling my car?", a: "100% yes. A professional detail can increase your perceived vehicle value by $1,000–$3,000." },
  { q: "How often should I get a complete detail?", a: "We recommend 2–4 times per year (once per season), with exterior maintenance washes in between." },
  { q: "Can you come to my workplace?", a: "Yes! Many clients book during work hours. We just need vehicle access and ideally a water/power source." },
  { q: "What's included in the 25% off Engine Bay Detail bonus?", a: "Degreasing, pressure rinsing, and dressing all engine components for a like-new engine bay." },
];

const completeTestimonials = [
  { quote: "I was about to trade in my Highlander. Got it detailed first and the dealer offered me $2,500 more than their original quote. Best $240 I've ever spent.", name: "Marcus D.", location: "Cochrane", service: "Showroom Reset + Protection" },
  { quote: "We get both our family cars done every spring and fall. The convenience of mobile service makes it a no-brainer.", name: "The Nguyen Family", location: "Calgary SE", service: "Showroom Reset (Seasonal)" },
  { quote: "Bought a used Honda Accord that smelled like the previous owner's dog. After the detail, it looked and smelled brand new.", name: "Chris B.", location: "Airdrie", service: "Showroom Reset + Protection" },
  { quote: "I'm a contractor and my truck takes a beating. The complete detail every few months keeps it looking professional.", name: "Derek S.", location: "Okotoks", service: "Showroom Reset" },
];

const CompleteDetailing = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Complete Car Detailing Calgary — Inside & Out from $209"
      description="Calgary's most popular mobile detail: full interior deep clean plus exterior hand wash, clay bar & sealant in one visit. From $209. 14-day guarantee. Book now."
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
          <div className="inline-flex items-center gap-2 bg-urgency/10 text-urgency font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6 border border-urgency/20">
            <TrendingUp className="w-3.5 h-3.5" />
            Our #1 Most Booked Service
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
            The Ultimate <span className="text-gradient">Head-to-Toe</span> Vehicle Reset
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            Why book two appointments when one gets you everything? Our complete detailing packages combine the best of our interior and exterior services into a single transformation — at a better price than booking separately.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Whether you're prepping for a sale, recovering from winter, or just want your car to feel <em>brand new</em> again — this is our most popular service for a reason.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Value Props */}
    <section className="py-16 sm:py-20 bg-card border-y border-border">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
            Why <span className="text-gradient">Complete Detailing</span> Is Worth Every Dollar
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.08}>
          {[
            { icon: DollarSign, title: "Save vs. Separate Bookings", desc: "Bundling saves you $30–$50 compared to booking each service individually." },
            { icon: TrendingUp, title: "Boost Resale Value", desc: "A professional detail can increase perceived value by $1,000–$3,000. Highest-ROI investment before listing." },
            { icon: Clock, title: "Done While You Work", desc: "We detail at your home or office. Drop the keys, go about your day, come back to a transformed vehicle." },
            { icon: Sparkles, title: "Every Surface, Every Crevice", desc: "From engine bay to trunk — nothing gets overlooked. The most thorough clean your car has ever had." },
            { icon: ShieldCheck, title: "Protected for Months", desc: "Clay bar, wax sealant, UV protectant, and fabric guard keep your vehicle looking its best for 2–3 months." },
            { icon: Heart, title: "That New Car Feeling", desc: "Fresh cabin, gleaming paint, pristine seats. Nothing beats stepping into a car that feels brand new." },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-5 sm:p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    {/* Packages */}
    <section className="py-16 sm:py-20 bg-foreground">
      <div className="container">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-center text-background mb-4">
            Complete Detailing Packages
          </h2>
          <p className="text-center text-background/50 font-heading text-sm uppercase tracking-widest mb-12">
            Interior + exterior in one visit — our best value
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="Showroom Reset"
            price="$209.99"
            tagline="Full interior + exterior in one visit — saves $30+ vs booking separately. Our best value for a complete refresh."
            features={[
              "Full foam pre-wash + two-bucket hand wash & dry",
              "Tire, wheel & wheel well cleaning + tire shine",
              "Deep vacuum of seats, carpets, trunk & all crevices",
              "Dashboard, console & door panels detailed",
              "Seats steam cleaned & conditioned",
              "All carpets & fabric shampooed",
              "Streak-free windows inside & out",
            ]}
            addOns={[
              { name: "Ceramic Spray Sealant Upgrade", price: "+$75" },
              { name: "Pet Hair Removal", price: "+$55" },
              { name: "Engine Bay Cleaning", price: "+$50" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="~2.5–3 hrs | Mobile anywhere in Calgary"
          />
          <PackageCard
            icon={<ShieldCheck className="w-8 h-8" />}
            name="Showroom Reset + Protection"
            price="$239.99"
            tagline="The ultimate package — deep clean, decontamination & lasting protection for every surface inside and out."
            features={[
              "Everything in Showroom Reset included",
              "Clay bar paint decontamination (glass-smooth finish)",
              "Hand-applied carnauba & synthetic wax coat",
              "Fabric guard OR leather conditioner applied",
              "UV protectant on all interior plastics & trim",
              "Door jambs cleaned & dried",
              "Exhaust tips polished",
            ]}
            bonuses={[
              "IronX Fallout Treatment ($40 value) — FREE",
              "25% OFF Engine Bay Detail when added",
            ]}
            addOns={[
              { name: "Ceramic Spray Sealant Upgrade", price: "+$75" },
              { name: "Ozone Odour Elimination", price: "+$75" },
              { name: "Headlight Restoration", price: "+$80" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="~3–3.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Mid-page CTA */}
    <section className="py-10 sm:py-14 bg-primary">
      <div className="container text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-primary-foreground/80 font-heading font-bold text-sm uppercase tracking-wider mb-3">
            <Clock className="w-4 h-4" />
            Our #1 Most Booked Service
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
            Save Money. Save Time. Get Everything.
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
            Interior + exterior in one appointment. Better results, better price, zero hassle.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all shadow-lg">
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
            When Should You Book a <span className="text-gradient">Complete Detail</span>?
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto text-sm sm:text-base">
            A complete detail is more than a wash — it's a full vehicle reset.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <ScrollReveal delay={0.1}>
            <BeforeAfterCard
              beforeIcon={<DollarSign className="w-5 h-5" />}
              beforeTitle="Before Selling or Trading In"
              beforeText="Visible stains, dull paint, and lingering odors signal neglect — giving buyers leverage to negotiate you down."
              afterTitle="After: Sell for Top Dollar"
              afterText="A detailed vehicle photographs better and commands a higher price. Our $240 detail regularly earns clients $1,500–$3,000 more."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <BeforeAfterCard
              beforeIcon={<Snowflake className="w-5 h-5" />}
              beforeTitle="Post-Winter Recovery"
              beforeText="Five months of salt, sand, and slush. Stained carpets, dull paint, wet-boot smell. Winter damage everywhere."
              afterTitle="After: Spring Ready"
              afterText="Salt extracted. Paint decontaminated and sealed. Dashboard conditioned and UV-protected. Ready for spring."
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <GalleryCarousel />
    <TestimonialBlock testimonials={completeTestimonials} />
    <ServiceFAQ title="Complete Detailing FAQs" faqs={completeFAQs} />

    {/* Final CTA */}
    <section className="py-16 sm:py-20 bg-foreground">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={interiorImg} alt="Complete detailing result" className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">The Ultimate Transformation Awaits</h3>
            <p className="text-background/70 leading-relaxed mb-4 text-sm sm:text-base">
              Give your vehicle the complete treatment — inside and out. We come to your home or office.
            </p>
            <p className="text-background/50 text-sm mb-8">
              ✓ Save vs. separate bookings &nbsp; ✓ $90+ in free bonuses &nbsp; ✓ 14-day guarantee
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-lg shadow-primary/30">
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
