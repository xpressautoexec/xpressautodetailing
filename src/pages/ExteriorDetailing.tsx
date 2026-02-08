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
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center text-primary-foreground mb-12">
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
            surcharges={["Add $10 for small SUVs", "Add $20 for 3rd-row SUVs/Trucks/Minivans"]}
            isPrimary
          />
        </div>
      </div>
    </section>

    <section className="py-16 bg-background">
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
