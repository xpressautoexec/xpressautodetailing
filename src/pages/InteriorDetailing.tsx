import Navbar from "@/components/Navbar";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import interiorHero from "@/assets/interior-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const interiorFAQs = [
  { q: "How long does an interior detail take?", a: "The Fresh Start Interior takes about 1.5–2 hours. The Deep Clean + Shield takes 2–2.5 hours. Heavily soiled vehicles may take longer — we'll let you know upfront." },
  { q: "Can you remove pet hair from my car?", a: "Yes! Pet hair removal is one of our most popular add-ons. We use specialized tools to extract every strand from seats, carpets, and hard-to-reach areas." },
  { q: "Will shampooing damage my leather seats?", a: "No. We use pH-balanced cleaners specifically formulated for automotive leather. After cleaning, we apply a conditioner that keeps the leather supple and protected against cracking." },
  { q: "Can you get rid of cigarette smoke smell?", a: "In most cases, yes. Our Deep Clean + Shield package combined with the Ozone Odor Bomb add-on is extremely effective at eliminating embedded smoke odors — not just masking them." },
  { q: "Do I need to be home during the service?", a: "Not necessarily! As long as we have access to the vehicle and a water/power source nearby, we can work while you're at home, at work, or running errands." },
  { q: "What if the stains don't come out?", a: "We're honest about expectations. Some permanent stains (like dye transfers or chemical burns) can't be fully removed, but we'll do our absolute best. If we can't improve it, we'll tell you before we charge." },
];

const interiorTestimonials = [
  { quote: "My 3-year-old's car seat area was a disaster — crushed crackers, juice stains, mystery spills. After the Deep Clean + Shield, it looks like the day I bought the car. Absolutely incredible work.", name: "Amanda K.", location: "Calgary", service: "Deep Clean + Shield" },
  { quote: "I'm a realtor and my car is my office. The Fresh Start Interior keeps it looking professional for clients. I book monthly and it's always perfect.", name: "David P.", location: "Airdrie", service: "Fresh Start Interior" },
  { quote: "Had my dog's mud all through the back seat and carpets. They got every bit of it out and the ozone treatment killed that wet-dog smell completely. My car smells brand new.", name: "Rachel M.", location: "Cochrane", service: "Deep Clean + Shield + Ozone" },
  { quote: "I was embarrassed to have anyone in my car. After one interior detail, my friend asked if I got a new car. That says it all.", name: "Jason T.", location: "Chestermere", service: "Deep Clean + Shield" },
];

const InteriorDetailing = () => (
  <div className="min-h-screen">
    <SEO
      title="Interior Detailing Calgary"
      description="Professional mobile interior car detailing in Calgary. Deep cleaning, stain removal, leather conditioning & odor elimination. Book in 60 seconds."
      canonical="/interior-detailing"
      jsonLd={[
        buildServiceJsonLd("Interior Detailing", "Professional mobile interior car detailing in Calgary. Deep cleaning, stain removal, leather conditioning.", "/interior-detailing"),
        buildFAQJsonLd(interiorFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Interior Detailing Services in Calgary and Surrounding Areas" image={interiorHero} />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Expert Car Interior Detailing Services
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A spotless exterior is only part of what makes a vehicle truly well kept. The condition of your car's interior plays an equally vital role in overall maintenance and comfort. That's why our interior detailing services are designed to deliver a deep, transformative clean that goes beyond the surface.
        </p>
        <p className="text-muted-foreground leading-relaxed font-semibold">
          Breathe New Life Into Your Cabin
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your car's interior isn't just a space — it's where you spend hours every week. We deep clean and sanitize every surface, restore freshness, and protect against future wear, so you can drive in comfort and confidence.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Did you know the average car interior harbors more bacteria than a public toilet seat? Steering wheels, cup holders, and air vents are breeding grounds for germs. Our professional interior detailing eliminates up to 99% of bacteria and allergens, creating a healthier environment for you and your passengers.
        </p>
      </div>
    </section>

    {/* Packages */}
    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center mb-12">
          Interior Detailing Packages
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PackageCard
            icon="🧼"
            name="Fresh Start Interior"
            price="$159.99"
            tagline="A quick professional refresh that makes your cabin feel spotless. Perfect for maintenance or light cleanup."
            features={[
              "Full vacuum",
              "Wipe-down of dash, plastics, cupholders & doors",
              "Seats scrubbed and cleaned",
              "Rubber mats washed, scrubbed, and dressed",
              "Windows & mirrors cleaned",
              "Vent blowout and light air freshening to leave the cabin smelling clean",
            ]}
            addOns={[
              { name: "Pet Hair Removal", price: "+$40" },
              { name: "Odor Elimination Treatment", price: "+$50" },
              { name: "Leather Conditioning", price: "+$30" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 1.5-2 hrs | Mobile anywhere in Calgary"
          />
          <PackageCard
            icon="🛡️"
            name="Deep Clean + Shield"
            price="$189.99"
            tagline="A full interior transformation — stains, salt, and odors gone. Perfect for winter cleanup or cars needing a real reset."
            features={[
              "Everything in the Fresh Start Interior PLUS:",
              "Deep vacuum (mats, seats, trunk)",
              "Shampoo/steam clean seats, mats & carpets",
              "Leather clean & condition or fabric protectant",
              "Sticky residue removal",
              "Door jambs cleaned",
              "Complete surface UV protection & dressing",
            ]}
            bonuses={["🎁 Bonus: Interior protectant application ($50 value)"]}
            addOns={[
              { name: "Pet Hair Removal", price: "+$40" },
              { name: "Headliner Deep Clean", price: "+$45" },
              { name: "Ozone Odor Bomb", price: "+$60" },
              { name: "Engine Bay Detail", price: "+$75" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 2-2.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Before & After Transformation */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          The Transformation Is Real
        </h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto">
          Every interior tells a story — spilled coffee, muddy boots, years of daily wear. We've seen it all, and we've restored it all. Here's what happens when you hand us the keys.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">🚗 Before: The Daily Driver</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Crumbs wedged into every crevice. Cup holders sticky from forgotten drinks. Seats stained from kids, pets, and life. The dashboard coated in dust, and the carpets haven't been shampooed since you bought the car. You stopped noticing the smell — but your passengers haven't.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
              <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: The Showroom Reset</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Step inside and breathe deep — it smells brand new. Every surface has been hand-cleaned and protected. Seats are plush, stain-free, and conditioned. The dashboard gleams. Even the vents are clear. It doesn't just look clean. It <em>feels</em> like a different car.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">🐕 Before: The Pet Owner's Ride</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fur embedded in every seat fiber. Scratches on the door panels. That unmistakable wet-dog smell that no air freshener can mask. Mud tracks on the carpets from park trips, and drool marks on the windows.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
              <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: Fur-Free & Fresh</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every strand of fur extracted. Seats deep-cleaned and deodorized. Door panels restored. The cabin smells like it did the day you drove it off the lot. Your dog can still ride — your interior just won't show it anymore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BeforeAfterSlider />
    <TestimonialBlock testimonials={interiorTestimonials} />
    <ServiceFAQ title="Interior Detailing FAQs" faqs={interiorFAQs} />

    {/* Image + CTA */}
    <section className="py-16 bg-primary">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <img src={interiorImg} alt="Interior detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-primary-foreground mb-4">Ready for a Fresh Interior?</h3>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            Book your interior detail today and experience the difference. We come to you — mobile anywhere in Calgary and surrounding areas.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default InteriorDetailing;
