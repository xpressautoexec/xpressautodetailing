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
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center text-foreground mb-12">
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
            addOns={[
              { name: "Pet Hair Removal", price: "+$40" },
              { name: "Headlight Restoration", price: "+$60" },
              { name: "Engine Bay Detail", price: "+$75" },
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
            addOns={[
              { name: "Ceramic Spray Sealant Upgrade", price: "+$50" },
              { name: "Ozone Odor Bomb", price: "+$60" },
              { name: "Headlight Restoration", price: "+$60" },
              { name: "Trim Restoration", price: "+$35" },
            ]}
            surcharges={["Add $20 for small SUVs/trucks", "Add $30 for 3-row SUVs/minivans"]}
            time="Time: 3-3.5 hrs | Mobile anywhere in Calgary"
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Before & After Transformation */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          Total Transformation, Inside & Out
        </h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto">
          A complete detail is more than a wash and vacuum — it's a full vehicle reset. Every surface, every crevice, every inch gets the attention it deserves. Here's what that looks like in practice.
        </p>

        <div className="space-y-8 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">🚙 Before: The Neglected Commuter</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Three years of daily driving without a proper detail. The paint is oxidized and covered in water spots. Inside, the seats are stained, the carpets are matted, and there's a faint smell you can't quite identify. The car runs fine — but it doesn't <em>feel</em> fine.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
              <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: The Complete Reset</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The paint reflects like glass. Inside, it smells like new leather. Every surface is clean, conditioned, and protected. You open the door and pause — because this is the car you remember buying. That's the power of a complete detail.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">💰 Before: Pre-Sale Panic</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You're about to list your car. The interior has years of wear. The exterior has lost its luster. Every flaw screams "negotiate me down." You know first impressions matter — and right now, your car isn't making a good one.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
              <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: Sell It For More</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Buyers see a car that's been cared for. The paint pops in photos. The interior is spotless. You get higher offers, faster responses, and the confidence that you're presenting your vehicle at its absolute best. Our clients regularly tell us their detail paid for itself at sale time.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h3 className="font-heading font-bold text-foreground uppercase text-lg mb-3">The Complete Detail Difference</h3>
          <blockquote className="text-muted-foreground italic text-lg leading-relaxed mb-4">
            "I was about to trade in my Highlander. Got it detailed first with the Showroom Reset + Protection and the dealer offered me $2,500 more than their original quote. Best $240 I've ever spent."
          </blockquote>
          <p className="text-sm text-muted-foreground font-semibold">— Marcus D., Cochrane</p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 section-dark">
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
