import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import ceramicHero from "@/assets/ceramic-hero.jpg";
import paintImg from "@/assets/paint-correction.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const ceramicFAQs = [
  { q: "How long does ceramic coating last?", a: "Our 1-Year Ceramic Spray Sealant lasts up to 12 months with proper care. The 4-Year Infused Ceramic Coating lasts 4+ years when maintained with recommended wash techniques. We'll provide aftercare instructions." },
  { q: "Is paint correction necessary before ceramic coating?", a: "Yes. Ceramic coating locks in whatever is on your paint — including swirl marks and scratches. That's why we always perform paint correction first, so the coating seals in a flawless finish." },
  { q: "Can ceramic coating be applied to a new car?", a: "Absolutely — and it's actually the ideal time. New paint is in its best condition, so applying ceramic coating preserves that factory finish for years. Many of our clients coat their vehicles within the first month of purchase." },
  { q: "Do I still need to wash my car after ceramic coating?", a: "Yes, but it's much easier. Dirt and grime slide off coated surfaces, so washes are faster and less frequent. We recommend a gentle hand wash every 2–3 weeks." },
  { q: "What's the difference between ceramic coating and wax?", a: "Wax is a temporary layer that lasts 1–3 months and offers mild protection. Ceramic coating is a semi-permanent chemical bond with your clear coat that provides years of UV, chemical, and scratch resistance with an unmatched gloss." },
  { q: "Can ceramic coating fix scratches?", a: "No — ceramic coating is a protective layer, not a corrective one. That's why our packages include paint correction before application. The correction removes defects, and the coating prevents new ones." },
];

const ceramicTestimonials = [
  { quote: "I almost spent $3,000 on a full respray for my black BMW. Got the 2-step correction + ceramic instead for a fraction of the cost. It looks better than the day I bought it. Water just sheets off.", name: "James K.", location: "Calgary", service: "2-Step Correction + Ceramic" },
  { quote: "Got my brand new Tesla Model 3 ceramic coated. It's been 6 months and it still looks like I just drove it off the lot. The water beading is insane.", name: "Alicia R.", location: "Calgary NW", service: "2-Step Correction + Ceramic" },
  { quote: "The 1-step enhancement brought my 2018 Camry back to life. The swirl marks are gone and the ceramic spray keeps it glossy between washes. Amazing value for the price.", name: "Nathan G.", location: "Chestermere", service: "1-Step Enhancement" },
  { quote: "I've had ceramic coatings done at shops before — but the quality and care here is on another level. They spent an hour just inspecting and prepping. That attention to detail makes the difference.", name: "Omar H.", location: "Airdrie", service: "2-Step Correction + Ceramic" },
];

const PaintCeramics = () => (
  <div className="min-h-screen">
    <SEO
      title="Paint Correction & Ceramic Coating Calgary"
      description="Professional paint correction and ceramic coating in Calgary. Remove swirl marks, restore gloss & protect with long-lasting ceramic coatings."
      canonical="/paint-ceramics"
      jsonLd={[
        buildServiceJsonLd("Paint Correction & Ceramic Coating", "Professional paint correction and ceramic coating in Calgary.", "/paint-ceramics"),
        buildFAQJsonLd(ceramicFAQs),
      ]}
    />
    <Navbar />
    <ServicePageHero title="Paint Correction & Ceramic Coating Packages" image={ceramicHero} />
    <TrustStats />

    {/* Intro */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Paint Correction & Ceramic Coating in Calgary
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your vehicle's paint is its first impression — and over time, swirl marks, oxidation, and environmental damage steal that showroom glow. Our paint correction and ceramic coating services restore your paint to its absolute best, then lock in that perfection with industry-leading protection.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Whether you're an automotive enthusiast who demands perfection, a new car owner who wants to preserve that factory finish, or someone looking to bring a neglected vehicle back to life — we have the package for you.
        </p>
      </div>
    </section>

    {/* Packages */}
    <section className="section-dark py-16">
      <div className="container">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center mb-12">
          Paint Correction & Ceramic Packages
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <PackageCard
            icon="✨"
            name="1-Step Enhancement + 1 Yr Ceramic Spray"
            price="$399.99"
            tagline="Perfect for: Daily drivers, lightly swirled paint, vehicles needing gloss restoration without a full correction."
            features={[
              "Paint Decontamination",
              "1-Step Power Polish",
              "40-60% Of Defects Removed",
              "1-Year Ceramic Spray Sealant",
              "Final Paint Inspection",
            ]}
            addOns={[
              { name: "Wheel Ceramic Coating", price: "+$80" },
              { name: "Windshield Ceramic Coating", price: "+$50" },
              { name: "Trim Restoration & Coating", price: "+$60" },
            ]}
            surcharges={["SUV: $449.99", "Truck: $499.99"]}
          />
          <PackageCard
            icon="💎"
            name="2-Step Correction + 5 Yr Ceramic Coating"
            price="$599.99"
            tagline="Perfect for: Enthusiasts, new vehicles, neglected paint, or anyone wanting long-term gloss protection and easy maintenance."
            features={[
              "Paint Decontamination",
              "2-Step Power Cut & Polish",
              "85-95% Of Defects Removed",
              "4-Year Infused Ceramic Coating",
              "Final Paint Inspection",
            ]}
            addOns={[
              { name: "Wheel Ceramic Coating", price: "+$80" },
              { name: "Windshield Ceramic Coating", price: "+$50" },
              { name: "Interior Ceramic Coating", price: "+$120" },
              { name: "Full PPF (Paint Protection Film)", price: "Quote" },
            ]}
            surcharges={["SUV: $649.99", "Truck: $699.99"]}
            isPrimary
          />
        </div>
      </div>
    </section>

    {/* Why Ceramic */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-8">
          Unmatched Protection. Unbelievable Shine.
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          If you're serious about protecting your investment and making your vehicle stand out, ceramic coating is the ultimate solution. Ceramic coatings create a high-gloss, glass-like finish that dramatically enhances the depth, color, and clarity of your paint. The result? A showroom-level shine that lasts for years, not weeks.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Long-Term Protection", desc: "Defends your paint against UV rays, bird droppings, bug splatter, tree sap, road salt, and chemical contaminants for up to 7 years." },
            { title: "Hydrophobic Barrier", desc: "Water, dirt, and grime slide right off, making washes faster, easier, and less frequent." },
            { title: "Gloss Like No Other", desc: "Amplifies the depth, clarity, and shine of your vehicle's paint with a mirror-like finish." },
            { title: "Resale Value Boost", desc: "Keeps your car looking newer for longer, maintaining its value and market appeal." },
            { title: "No More Waxes", desc: "Say goodbye to monthly waxing and polishing. Protection lasts for years, saving you time & money." },
            { title: "Worth Every Penny", desc: "A one-time investment in ceramic coating can save you thousands in future paint repairs and reconditioning." },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-lg border border-border">
              <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* The Process */}
    <section className="section-dark py-16">
      <div className="container max-w-4xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-center mb-4">The Process</h2>
        <p className="text-center mb-12">Preparation. Precision. Perfection.</p>
        <div className="space-y-8">
          {[
            { step: "Step 1", title: "Exterior Wash & Decontamination", desc: "Thorough two-bucket hand wash, iron remover, and clay bar treatment to eliminate embedded contaminants." },
            { step: "Step 2", title: "Paint Inspection & Correction", desc: "Surface inspection under professional lighting. Multi-stage polishing to remove swirl marks, oxidation, and scratches." },
            { step: "Step 3", title: "Surface Prep & Panel Wipe", desc: "Panel wipe solution removes polishing oils, allowing the ceramic coating to chemically bond directly to the paint." },
            { step: "Step 4", title: "Ceramic Coating Application", desc: "Hand-applied in small, controlled sections using professional-grade applicators. Each panel inspected for perfection." },
            { step: "Step 5", title: "Curing & Final Inspection", desc: "Coating bonds at the molecular level with your clear coat. Thorough final inspection ensures a perfect, streak-free finish." },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-heading font-bold text-primary-foreground text-xs">{item.step.split(" ")[1]}</span>
              </div>
              <div>
                <h4 className="font-heading font-bold uppercase text-sm mb-1">{item.title}</h4>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Before & After */}
    <section className="py-16 bg-background">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">
          The Before & After Speaks for Itself
        </h2>
        <p className="text-muted-foreground text-center leading-relaxed mb-12 max-w-3xl mx-auto">
          Paint correction and ceramic coating isn't just maintenance — it's a transformation. Swirl marks vanish. Depth returns. And your paint stays protected for years.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-lg border border-border">
            <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">😔 Before: Swirled & Faded</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Years of automatic car washes have left hundreds of micro-scratches across every panel. Under direct sunlight, the swirl marks are impossible to ignore. The paint looks flat and lifeless — a shadow of what it used to be.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
            <h4 className="font-heading font-bold text-primary uppercase text-sm mb-2">💎 After: Glass-Like Perfection</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              After multi-stage paint correction, the surface is flawless. Swirl marks are gone. Reflections are razor-sharp. Then the ceramic coating locks it all in — creating a hydrophobic, UV-resistant shield that keeps the paint looking this good for years.
            </p>
          </div>
        </div>
      </div>
    </section>

    <TestimonialBlock testimonials={ceramicTestimonials} />
    <ServiceFAQ title="Paint Correction & Ceramic Coating FAQs" faqs={ceramicFAQs} />

    {/* CTA */}
    <section className="py-16 bg-primary">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="font-heading font-black text-2xl uppercase text-primary-foreground mb-4">Protect Your Vehicle Permanently</h3>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            Whether you've just purchased a new car or want to protect and restore a daily driver, ceramic coating offers the most advanced form of automotive surface protection available today.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Now
          </a>
        </div>
        <img src={paintImg} alt="Paint correction result" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
      </div>
    </section>

    <Footer />
  </div>
);

export default PaintCeramics;
