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

        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <h3 className="font-heading font-bold text-foreground uppercase text-lg mb-3">What Our Clients Say After Their First Interior Detail</h3>
          <blockquote className="text-muted-foreground italic text-lg leading-relaxed mb-4">
            "I didn't think my seats could look like this again. My 2019 RAV4 looks like it just rolled off the lot. My kids couldn't believe it was the same car."
          </blockquote>
          <p className="text-sm text-muted-foreground font-semibold">— Sarah M., Calgary</p>
        </div>
      </div>
    </section>

    {/* Image + CTA */}
    <section className="py-16 section-dark">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <img src={interiorImg} alt="Interior detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-primary-foreground mb-4">Ready for a Fresh Interior?</h3>
          <p className="text-brand-gray leading-relaxed mb-6">
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
