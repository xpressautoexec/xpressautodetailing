import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import exteriorHero from "@/assets/exterior-hero.jpg";
import exteriorImg from "@/assets/exterior-detail.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ExteriorDetailing = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Exterior Detailing Services in Calgary and Surrounding Areas" image={exteriorHero} />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Premium Exterior Car Detailing
        </h2>
        <p className="text-muted-foreground leading-relaxed font-semibold mb-2">Shine That Turns Heads</p>
        <p className="text-muted-foreground leading-relaxed">
          From road dust to stubborn tar, our exterior detailing packages remove it all. We restore your paint's brilliance, protect it against Calgary's elements, and leave your vehicle gleaming with a showroom finish that lasts.
        </p>
      </div>
    </section>

    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center text-foreground mb-12">
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

    {/* Before & After Transformation */}
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

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h3 className="font-heading font-bold text-foreground uppercase text-lg mb-3">Real Results, Real Reactions</h3>
          <blockquote className="text-muted-foreground italic text-lg leading-relaxed mb-4">
            "I thought my black F-150 was just faded. Turns out it was just neglected. After the Gloss Refresh + Armor package, it literally looks like a brand new truck. My neighbour asked if I bought a new one."
          </blockquote>
          <p className="text-sm text-muted-foreground font-semibold">— Tyler R., Airdrie</p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 section-dark">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-4">Your Vehicle Deserves Better</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Don't let Calgary's elements ruin your finish. Book a professional exterior detail and keep your vehicle turning heads.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-brand-blue-deep transition-colors">
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
