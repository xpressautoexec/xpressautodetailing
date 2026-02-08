import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import interiorHero from "@/assets/interior-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const InteriorDetailing = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Interior Detailing Services in Calgary and Surrounding Areas" image={interiorHero} />

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
        <p className="text-muted-foreground leading-relaxed">
          Your car's interior isn't just a space — it's where you spend hours every week. We deep clean and sanitize every surface, restore freshness, and protect against future wear, so you can drive in comfort and confidence.
        </p>
      </div>
    </section>

    {/* Packages */}
    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center text-primary-foreground mb-12">
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
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 2-2.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Image + CTA */}
    <section className="py-16 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <img src={interiorImg} alt="Interior detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-4">Ready for a Fresh Interior?</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Book your interior detail today and experience the difference. We come to you — mobile anywhere in Calgary and surrounding areas.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-brand-blue-deep transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default InteriorDetailing;
