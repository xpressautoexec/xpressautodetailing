import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import exteriorHero from "@/assets/exterior-hero.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";

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
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Exterior Detailing Services in Calgary and Surrounding Areas" image={exteriorHero} />
    <TrustStats />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Premium Exterior Car Detailing
        </h2>
        <p className="text-muted-foreground leading-relaxed font-semibold mb-2">Shine That Turns Heads</p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          From road dust to stubborn tar, our exterior detailing packages remove it all. We restore your paint's brilliance, protect it against Calgary's elements, and leave your vehicle gleaming with a showroom finish that lasts.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Calgary's climate is one of the harshest in Canada for your vehicle's paint. Road salt in winter, UV exposure in summer, gravel on every highway — it all takes a toll. Regular exterior detailing isn't a luxury, it's protection. Our packages are designed to combat every seasonal threat and keep your paint looking its best year-round.
        </p>
      </div>
    </section>

    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center mb-12">
          Exterior Detailing Packages
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PackageCard
            icon="💧"
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
            icon="🛡️"
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
              { name: "Engine Bay Detail", price: "+$75" },
              { name: "Headlight Restoration", price: "+$60" },
              { name: "Ceramic Spray Sealant Upgrade", price: "+$50" },
              { name: "Wheel Ceramic Coating", price: "+$80" },
            ]}
            surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/Trucks/Minivans"]}
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Before & After */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          See the Difference
        </h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto">
          Calgary roads are brutal on your paint — gravel chips, road salt, bug splatter, and UV exposure take their toll fast. Here's what a professional exterior detail actually reverses.
        </p>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="p-6 rounded-lg border border-border">
            <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">🚘 Before: Road-Worn & Dull</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A thick layer of road film dulls your paint. Brake dust is baked into your wheels. Bug residue and tar spots cling to the front end. The tires look grey and tired. From 10 feet away, the car looks okay — but up close? The neglect shows.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
            <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: Mirror-Finish Shine</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Paint is buttery smooth after clay bar treatment. Wax creates a deep, reflective gloss that beads water effortlessly. Wheels are spotless. Tires are dressed and jet-black. Every inch gleams like it just left the dealership — because that's the standard we hold.
            </p>
          </div>
        </div>
      </div>
    </section>

    <TestimonialBlock testimonials={exteriorTestimonials} />
    <ServiceFAQ title="Exterior Detailing FAQs" faqs={exteriorFAQs} />

    {/* CTA */}
    <section className="py-16 bg-primary">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-primary-foreground mb-4">Your Vehicle Deserves Better</h3>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            Don't let Calgary's elements ruin your finish. Book a professional exterior detail and keep your vehicle turning heads.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Now
          </a>
        </div>
        <img src={exteriorImg} alt="Exterior detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
      </div>
    </section>

    <Footer />
  </div>
);

export default ExteriorDetailing;
