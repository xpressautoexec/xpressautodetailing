import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import completeHero from "@/assets/complete-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const CompleteDetailing = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Complete Detailing Services in Calgary and Surrounding Areas" image={completeHero} />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Professional Complete Detailing Services
        </h2>
        <p className="text-muted-foreground leading-relaxed font-semibold mb-2">Your Vehicle, Brand New Again — Without Leaving Home</p>
        <p className="text-muted-foreground leading-relaxed">
          Why settle for average when you can have dealership-quality results brought right to your driveway? At Xpress Auto Detailing, we deliver the ultimate inside-and-out transformation for SUVs, trucks, minivans, and more — serving Calgary, Airdrie, Cochrane, Chestermere, and surrounding areas. Backed by our 100% Satisfaction Guarantee.
        </p>
      </div>
    </section>

    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center text-primary-foreground mb-12">
          Complete Detailing Packages
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PackageCard
            icon="✨"
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
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 2.5-3 hrs | Mobile anywhere in Calgary"
          />
          <PackageCard
            icon="✨"
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
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 3-3.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <img src={interiorImg} alt="Complete detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-4">The Ultimate Transformation</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Give your vehicle the complete treatment it deserves — inside and out. Book your complete detail today.
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

export default CompleteDetailing;
