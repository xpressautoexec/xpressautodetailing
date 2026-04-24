import PageTransition from "@/components/PageTransition";
import InteriorPromoPopup from "@/components/InteriorPromoPopup";
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
import interiorHero from "@/assets/interior-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";
import RecentWorkStrip from "@/components/RecentWorkStrip";
import bmwRedInterior from "@/assets/gallery-bmw-red-interior.jpg";
import catExcavator1 from "@/assets/gallery-cat-excavator-1.jpg";
import catExcavator3 from "@/assets/gallery-cat-excavator-3.jpg";
import bmwRedDash from "@/assets/gallery-bmw-red-dash.jpg";
import catExcavatorPedals from "@/assets/gallery-cat-excavator-pedals.jpg";
import rangeRoverInterior from "@/assets/gallery-range-rover-interior.jpg";
import { ShieldCheck, Droplets, Wind, Bug, Sparkles, Clock, ArrowRight, Car, PawPrint, Shield } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const interiorFAQs = [
  { q: "How long does an interior detail take?", a: "The Fresh Start Interior takes about 1.5–2 hours. The Deep Clean + Shield takes 2–2.5 hours. Heavily soiled vehicles may take longer — we'll let you know upfront." },
  { q: "Can you remove pet hair from my car?", a: "Yes! Pet hair removal is one of our most popular add-ons. We use specialized tools to extract every strand from seats, carpets, and hard-to-reach areas." },
  { q: "Will shampooing damage my leather seats?", a: "No. We use pH-balanced cleaners specifically formulated for automotive leather. After cleaning, we apply a conditioner that keeps the leather supple and protected against cracking." },
  { q: "Can you get rid of cigarette smoke smell?", a: "In most cases, yes. Our Deep Clean + Shield package combined with the Ozone Odor Bomb add-on is extremely effective at eliminating embedded smoke odors — not just masking them." },
  { q: "Do I need to be home during the service?", a: "Not necessarily! As long as we have access to the vehicle and a water/power source nearby, we can work while you're at home, at work, or running errands." },
  { q: "What if the stains don't come out?", a: "We're honest about expectations. Some permanent stains can't be fully removed, but we'll do our absolute best. If we can't improve it, we'll tell you before we charge." },
];

const interiorTestimonials = [
  { quote: "My 3-year-old's car seat area was a disaster — crushed crackers, juice stains, mystery spills. After the Deep Clean + Shield, it looks like the day I bought the car.", name: "Amanda K.", location: "Calgary", service: "Deep Clean + Shield" },
  { quote: "I'm a realtor and my car is my office. The Fresh Start Interior keeps it looking professional for clients. I book monthly and it's always perfect.", name: "David P.", location: "Airdrie", service: "Fresh Start Interior" },
  { quote: "Had my dog's mud all through the back seat. They got every bit of it out and the ozone treatment killed that wet-dog smell completely.", name: "Rachel M.", location: "Cochrane", service: "Deep Clean + Shield + Ozone" },
  { quote: "I was embarrassed to have anyone in my car. After one interior detail, my friend asked if I got a new car. That says it all.", name: "Jason T.", location: "Chestermere", service: "Deep Clean + Shield" },
];

const InteriorDetailing = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Interior Car Detailing Calgary — From $159"
      description="Mobile interior car detailing in Calgary. Steam clean, stain & odour removal, leather conditioning & full sanitization. From $159. 14-day guarantee. Book online."
      canonical="/interior-detailing"
      jsonLd={[
        buildServiceJsonLd("Interior Detailing", "Professional mobile interior car detailing in Calgary.", "/interior-detailing"),
        buildFAQJsonLd(interiorFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Interior Detailing Services in Calgary and Surrounding Areas" image={interiorHero} />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
            Your Car's Interior Is <span className="text-gradient">Dirtier Than You Think</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
            Studies show the average steering wheel has <strong className="text-foreground">4× more bacteria than a public toilet seat</strong>. Cup holders, air vents, and seat crevices are breeding grounds for germs, allergens, and odors.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            A professional interior detail isn't just about aesthetics — it's about creating a <strong className="text-foreground">healthier, more comfortable</strong> driving environment for you and your family.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* The Problem */}
    <section className="py-16 sm:py-20 bg-card border-y border-border">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-4">
            What's Hiding in Your Cabin?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Your car collects more than just miles. A vacuum and air freshener aren't enough.
          </p>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.08}>
          {[
            { icon: Bug, title: "Bacteria & Allergens", desc: "Mold, dust mites, and bacteria thrive in dark, moist areas like under seats and inside vents." },
            { icon: Droplets, title: "Stains & Spills", desc: "Coffee, food, muddy shoes — everyday spills set into fabric and leather if not treated properly." },
            { icon: Wind, title: "Trapped Odors", desc: "Cigarette smoke, pet smell, and food odors embed into headliners, carpets, and seat foam." },
            { icon: ShieldCheck, title: "UV Damage", desc: "Calgary's intense sun cracks and fades unprotected dashboards, leather, and trim." },
            { icon: Sparkles, title: "Salt & Grime Buildup", desc: "Winter road salt tracked into carpets corrodes fibers and creates permanent white stains." },
            { icon: Clock, title: "Wear & Aging", desc: "Without conditioning, leather dries out, plastics fade, and your cabin ages years faster." },
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
            Interior Detailing Packages
          </h2>
          <p className="text-center text-background/50 font-heading text-sm uppercase tracking-widest mb-12">
            Choose the level of clean your cabin needs
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0">
          <PackageCard
            icon={<Sparkles className="w-8 h-8" />}
            name="Fresh Start Interior"
            price="$159.99"
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
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="~1.5–2 hrs | Mobile anywhere in Calgary"
          />
          <PackageCard
            icon={<Shield className="w-8 h-8" />}
            name="Deep Clean + Shield"
            price="$189.99"
            tagline="Full interior transformation — embedded stains, winter salt, pet mess & odors completely eliminated and protected."
            features={[
              "Everything in Fresh Start included",
              "Hot water extraction shampoo on all carpets & fabric seats",
              "Steam cleaning of hard-to-reach areas & crevices",
              "Leather deep clean + conditioning treatment",
              "UV protectant applied to dash, trim & all plastics",
              "Door jambs cleaned & dried",
              "Interior protectant on all surfaces (long-lasting shield)",
            ]}
            bonuses={["Interior protectant treatment ($50 value) — FREE"]}
            addOns={[
              { name: "Pet Hair Removal", price: "+$55" },
              { name: "Ozone Odour Elimination", price: "+$75" },
              { name: "Headliner Deep Clean", price: "+$40" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="~2–2.5 hrs | Mobile anywhere in Calgary"
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
            Limited Availability This Week
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
            Don't Wait Until It Gets Worse
          </h3>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
            Stains set deeper every day. Odors embed further. The longer you wait, the harder it gets. Book now while spots are available.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all shadow-lg">
            Check Available Times
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>

    {/* Before & After */}
    <section className="py-16 sm:py-20 bg-background">
      <div className="container max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
            Real Results From Real Clients
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto text-sm sm:text-base">
            Every interior tells a story. Here's what happens when you hand us the keys.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16">
          <ScrollReveal delay={0.1}>
            <BeforeAfterCard
              beforeIcon={<Car className="w-5 h-5" />}
              beforeTitle="Before: The Daily Driver"
              beforeText="Crumbs in every crevice. Cup holders sticky. Seats stained from kids, pets, and life. Dashboard coated in dust."
              afterTitle="After: The Showroom Reset"
              afterText="Every surface hand-cleaned and protected. Seats plush and stain-free. Dashboard gleams. Even the vents are clear. It feels like a different car."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <BeforeAfterCard
              beforeIcon={<PawPrint className="w-5 h-5" />}
              beforeTitle="Before: The Pet Owner's Ride"
              beforeText="Fur embedded in every seat fiber. That unmistakable wet-dog smell. Mud tracks on carpets. Drool marks on windows."
              afterTitle="After: Fur-Free & Fresh"
              afterText="Every strand extracted. Seats deep-cleaned and deodorized. Door panels restored. Smells like the day you drove it off the lot."
            />
          </ScrollReveal>
        </div>
      </div>
    </section>

    <GalleryCarousel />

    {/* Who It's For */}
    <section className="py-16 sm:py-20 bg-card border-y border-border">
      <div className="container max-w-4xl text-center px-6">
        <ScrollReveal>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground mb-8">
            Perfect For <span className="text-gradient">Every Situation</span>
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.08}>
          {[
            { emoji: "👶", text: "Parents with kids who treat the backseat like a playground" },
            { emoji: "🐾", text: "Pet owners tired of fur, mud, and that lingering smell" },
            { emoji: "💼", text: "Professionals who drive clients and need a spotless cabin" },
            { emoji: "🏠", text: "Anyone selling or trading in their vehicle" },
            { emoji: "❄️", text: "Drivers recovering from a long Calgary winter" },
            { emoji: "🎉", text: "Anyone who just wants to feel good getting into their car" },
          ].map((item) => (
            <StaggerItem key={item.text}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background text-left hover:border-primary/30 transition-all">
                <span className="text-2xl shrink-0">{item.emoji}</span>
                <p className="text-muted-foreground text-sm leading-snug">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>

    <TestimonialBlock testimonials={interiorTestimonials} />
    <ServiceFAQ title="Interior Detailing FAQs" faqs={interiorFAQs} />

    {/* Final CTA */}
    <section className="py-16 sm:py-20 bg-foreground">
      <div className="container grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={interiorImg} alt="Interior detailing result" className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-700" />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-background mb-4">Ready for a Fresh Interior?</h3>
            <p className="text-background/70 leading-relaxed mb-4 text-sm sm:text-base">
              Join hundreds of Calgary drivers who've experienced the difference. We come to you — mobile anywhere in Calgary and surrounding areas.
            </p>
            <p className="text-background/50 text-sm mb-8">
              ✓ No hidden fees &nbsp; ✓ 14-day guarantee &nbsp; ✓ Book in 60 seconds
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-lg shadow-primary/30">
              Book My Interior Detail
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <RecentWorkStrip
      eyebrow="See the Difference"
      title="Recent"
      highlight="Interior Work"
      description="From luxury leather to heavy-equipment cabins — every interior gets the same meticulous treatment."
      images={[
        { src: rangeRoverInterior, alt: "Range Rover tan leather interior after deep clean and conditioning" },
        { src: bmwRedInterior, alt: "BMW red leather seats after deep clean and conditioning" },
        { src: bmwRedDash, alt: "BMW interior dash, steering wheel and red leather after detail" },
        { src: catExcavator1, alt: "CAT excavator cab interior after professional deep clean" },
        { src: catExcavatorPedals, alt: "Spotless CAT excavator floor pedals and cab after detail" },
      ]}
    />

    <Footer />
    <InteriorPromoPopup />
  </div></PageTransition>
);

export default InteriorDetailing;
