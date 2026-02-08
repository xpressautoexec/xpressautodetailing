import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import completeHero from "@/assets/complete-hero.jpg";
import interiorImg from "@/assets/interior-detail.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const completeFAQs = [
  { q: "How long does a complete detail take?", a: "The Showroom Reset takes approximately 2.5–3 hours. The Showroom Reset + Protection takes 3–3.5 hours. Heavily soiled vehicles may require additional time." },
  { q: "Is a complete detail worth the extra cost over separate interior/exterior?", a: "Absolutely. Bundling saves you money compared to booking interior and exterior separately, plus the detailer can ensure a seamless result without rushing between appointments." },
  { q: "Should I get a complete detail before selling my car?", a: "100% yes. A professional detail can increase your perceived vehicle value by $1,000–$3,000. It's one of the highest-ROI investments you can make before listing." },
  { q: "How often should I get a complete detail?", a: "We recommend a full complete detail 2–4 times per year (once per season), with exterior maintenance washes in between. Monthly clients get the best long-term results." },
  { q: "Can you come to my workplace and do the detail while I work?", a: "Yes! Many of our clients book during work hours. We just need access to the vehicle and ideally a water/power source. We'll have it done by the time you clock out." },
  { q: "What's included in the 25% off Engine Bay Detail bonus?", a: "When you book the Showroom Reset + Protection, you get 25% off our full engine bay detail — which includes degreasing, pressure rinsing, and dressing all engine components for a like-new engine bay." },
];

const completeTestimonials = [
  { quote: "I was about to trade in my Highlander. Got it detailed first with the Showroom Reset + Protection and the dealer offered me $2,500 more than their original quote. Best $240 I've ever spent.", name: "Marcus D.", location: "Cochrane", service: "Showroom Reset + Protection" },
  { quote: "We get both our family cars done every spring and fall. The complete detail keeps them in amazing shape year-round. The convenience of mobile service makes it a no-brainer.", name: "The Nguyen Family", location: "Calgary SE", service: "Showroom Reset (Seasonal)" },
  { quote: "Bought a used Honda Accord that smelled like the previous owner's dog. After the Showroom Reset + Protection, it looked and smelled like a brand new car. My wife couldn't believe it.", name: "Chris B.", location: "Airdrie", service: "Showroom Reset + Protection" },
  { quote: "I'm a contractor and my truck takes a beating. The complete detail every few months keeps it looking professional for clients. Worth every cent.", name: "Derek S.", location: "Okotoks", service: "Showroom Reset" },
];

const CompleteDetailing = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Complete Detailing Calgary"
      description="Full interior & exterior mobile detailing in Calgary. The ultimate top-to-bottom detail for your vehicle. Book in 60 seconds."
      canonical="/complete-detailing"
      jsonLd={[
        buildServiceJsonLd("Complete Detailing", "Full interior and exterior mobile detailing in Calgary.", "/complete-detailing"),
        buildFAQJsonLd(completeFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Complete Detailing Services in Calgary and Surrounding Areas" image={completeHero} />
    <TrustStats />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Professional Complete Detailing Services
        </h2>
        <p className="text-muted-foreground leading-relaxed font-semibold mb-2">Your Vehicle, Brand New Again — Without Leaving Home</p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Why settle for average when you can have dealership-quality results brought right to your driveway? At Xpress Auto Detailing, we deliver the ultimate inside-and-out transformation for SUVs, trucks, minivans, and more — serving Calgary, Airdrie, Cochrane, Chestermere, and surrounding areas. Backed by our 100% Satisfaction Guarantee.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our complete detailing packages combine the best of our interior and exterior services into one comprehensive package. It's the most popular choice for clients who want their vehicle to look, feel, and smell brand new — without the hassle of booking multiple appointments. Whether you're prepping for a sale, welcoming a new season, or just treating yourself, complete detailing is the ultimate reset.
        </p>
      </div>
    </section>

    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center mb-12">
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

    {/* Before & After */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          Total Transformation, Inside & Out
        </h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto">
          A complete detail is more than a wash and vacuum — it's a full vehicle reset. Every surface, every crevice, every inch gets the attention it deserves.
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
                The paint reflects like glass. Inside, it smells like new leather. Every surface is clean, conditioned, and protected. You open the door and pause — because this is the car you remember buying.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">💰 Before: Pre-Sale Panic</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You're about to list your car. The interior has years of wear. The exterior has lost its luster. Every flaw screams "negotiate me down."
              </p>
            </div>
            <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
              <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">✨ After: Sell It For More</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Buyers see a car that's been cared for. The paint pops in photos. The interior is spotless. Our clients regularly tell us their detail paid for itself at sale time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BeforeAfterSlider />
    <TestimonialBlock testimonials={completeTestimonials} />
    <ServiceFAQ title="Complete Detailing FAQs" faqs={completeFAQs} />

    {/* CTA */}
    <section className="py-16 bg-primary">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <img src={interiorImg} alt="Complete detailing result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-primary-foreground mb-4">The Ultimate Transformation</h3>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            Give your vehicle the complete treatment it deserves — inside and out. Book your complete detail today.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Now
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default CompleteDetailing;
