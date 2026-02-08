import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStats from "@/components/TrustStats";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialBlock from "@/components/TestimonialBlock";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEO, { localBusinessJsonLd } from "@/components/SEO";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const homeTestimonials = [
  { quote: "Best detailing service in Calgary, hands down. They came to my office and had my SUV looking brand new by the time I was done work.", name: "Mike T.", location: "Calgary", service: "Complete Detail" },
  { quote: "I've tried 4 different detailing services in the city. Xpress is the only one I keep coming back to. Consistent quality every single time.", name: "Priya S.", location: "Airdrie", service: "Monthly Client" },
  { quote: "Got my truck ceramic coated before winter. Best decision I ever made — the salt and grime just washes right off. Still looks incredible 6 months later.", name: "Brandon L.", location: "Cochrane", service: "Ceramic Coating" },
  { quote: "They detailed my minivan after a road trip with 3 kids. I didn't think it was possible to make it look that clean again. Absolutely worth every penny.", name: "Jessica H.", location: "Chestermere", service: "Deep Clean + Shield" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Mobile Car Detailing Calgary"
        description="Calgary's premier mobile car detailing service. Interior, exterior, ceramic coating & fleet detailing. We come to you — book in 60 seconds."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <Navbar />
      <HeroSection />
      <TrustStats />
      <HowItWorks />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />

      {/* Service Areas */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl text-center">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
            Proudly Serving <span className="text-primary">Calgary & Beyond</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our fully equipped mobile detailing unit comes to you — wherever you are. We proudly serve Calgary and all surrounding communities, bringing dealership-quality results right to your driveway, office, or job site.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Strathmore", "High River", "Crossfield", "Langdon", "Bearspaw"].map((city) => (
              <span key={city} className="bg-muted text-foreground font-heading font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection />
      <TestimonialBlock testimonials={homeTestimonials} />

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
            Why Calgary Trusts <span className="text-primary">Xpress Auto Detailing</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fully Insured & Bonded", desc: "Your vehicle is in safe hands. We carry full liability insurance so you can have complete peace of mind." },
              { title: "Eco-Friendly Products", desc: "We use biodegradable, pH-balanced products that are safe for your vehicle's surfaces and the environment." },
              { title: "Trained & Certified", desc: "Our detailers are professionally trained and certified in paint correction, ceramic coating application, and interior restoration." },
              { title: "No Hidden Fees", desc: "The price we quote is the price you pay. No surprise charges, no upselling pressure. Just honest, transparent pricing." },
              { title: "Flexible Scheduling", desc: "Early mornings, evenings, weekends — we work around your schedule, not the other way around." },
              { title: "Money-Back Guarantee", desc: "Not satisfied? We'll either redo the service or refund you completely. That's how confident we are in our work." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-lg border border-border">
                <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
            Ready to See the Difference?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of happy Calgary drivers who trust Xpress Auto Detailing. Book your mobile detail today — we come to you.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-10 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
          >
            Schedule My Detail
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
