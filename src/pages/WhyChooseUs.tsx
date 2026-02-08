import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingContact from "@/components/FloatingContact";
import ChatWidget from "@/components/ChatWidget";
import SEO from "@/components/SEO";
import ReviewsSection from "@/components/ReviewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialBlock from "@/components/TestimonialBlock";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Star, ShieldCheck, Award, ThumbsUp, Heart, Leaf, Clock, Users, CheckCircle } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const testimonials = [
  { quote: "Best detailing service in Calgary, hands down. They came to my office and had my SUV looking brand new by the time I was done work.", name: "Mike T.", location: "Calgary", service: "Complete Detail" },
  { quote: "I've tried 4 different detailing services in the city. Xpress is the only one I keep coming back to. Consistent quality every single time.", name: "Priya S.", location: "Airdrie", service: "Monthly Client" },
  { quote: "Got my truck ceramic coated before winter. Best decision I ever made — the salt and grime just washes right off. Still looks incredible 6 months later.", name: "Brandon L.", location: "Cochrane", service: "Ceramic Coating" },
  { quote: "They detailed my minivan after a road trip with 3 kids. I didn't think it was possible to make it look that clean again. Absolutely worth every penny.", name: "Jessica H.", location: "Chestermere", service: "Deep Clean + Shield" },
  { quote: "Xpress handled our entire company fleet — 12 trucks detailed in a single day. On-site, on-time, and every vehicle looked showroom fresh.", name: "Dave R.", location: "Calgary", service: "Fleet Detailing" },
  { quote: "The paint correction on my black BMW was flawless. Swirl marks gone, deep gloss restored. These guys know what they're doing.", name: "Sarah K.", location: "Okotoks", service: "Paint Correction" },
];

const commitments = [
  { icon: ShieldCheck, title: "100% Satisfaction Guarantee", desc: "Not happy? We'll redo the service or refund you. No questions asked." },
  { icon: Award, title: "Certified Professionals", desc: "Every detailer on our team is trained and certified in advanced detailing techniques." },
  { icon: Leaf, title: "Eco-Friendly Products", desc: "We use biodegradable, pH-balanced products that are safe for your vehicle and the planet." },
  { icon: ThumbsUp, title: "Transparent Pricing", desc: "No hidden fees, no upselling. The price we quote is the price you pay — every time." },
  { icon: Heart, title: "Passion for Perfection", desc: "We treat every vehicle like it's our own. Meticulous attention to detail is in our DNA." },
  { icon: Users, title: "Community Focused", desc: "Proudly local. We support Calgary businesses and give back to the communities we serve." },
];

const stats = [
  { value: "5,000+", label: "Vehicles Detailed" },
  { value: "100+", label: "5-Star Reviews" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "5+", label: "Years Experience" },
];

const WhyChooseUs = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pb-16 lg:pb-0">
        <SEO
          title="Why Choose Us | Xpress Auto Detailing Calgary"
          description="Discover why Calgary trusts Xpress Auto Detailing. 100+ five-star reviews, certified professionals, eco-friendly products, and a 100% satisfaction guarantee."
          canonical="/why-choose-us"
        />
        <Navbar />

        {/* Hero */}
        <section className="bg-brand-dark py-20 md:py-28">
          <div className="container text-center">
            <ScrollReveal>
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase text-primary-foreground mb-6">
                Why Choose <span className="text-primary">Xpress</span>?
              </h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                We're not just another detailing company. We're Calgary's most trusted mobile detailing team — backed by hundreds of happy customers, industry certifications, and a relentless commitment to quality.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-10 py-4 rounded text-sm hover:bg-brand-blue-deep transition-colors"
              >
                Book Your Detail
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary py-10">
          <div className="container">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div>
                    <p className="font-heading font-black text-3xl md:text-4xl text-primary-foreground">{stat.value}</p>
                    <p className="text-primary-foreground/80 font-heading text-sm uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection />

        {/* Our Commitments */}
        <section className="py-20 bg-background">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
                Our <span className="text-primary">Commitments</span> to You
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Every detail matters — from the products we use to the promises we keep. Here's what sets us apart.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
              {commitments.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors group h-full">
                    <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading font-bold text-lg uppercase text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
                Proudly Serving <span className="text-primary">Calgary & Beyond</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our fully equipped mobile detailing unit comes to you — wherever you are. We proudly serve Calgary and all surrounding communities, bringing dealership-quality results right to your driveway, office, or job site.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3">
                {["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Strathmore", "High River", "Crossfield", "Langdon", "Bearspaw"].map((city) => (
                  <span key={city} className="bg-muted text-foreground font-heading font-semibold text-sm uppercase tracking-wider px-4 py-2 rounded-full">
                    {city}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Benefits */}
        <BenefitsSection />

        {/* Testimonials */}
        <TestimonialBlock testimonials={testimonials} />

        {/* Why Calgary Trusts Xpress */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
                Why Calgary Trusts <span className="text-primary">Xpress Auto Detailing</span>
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.08}>
              {[
                { title: "Fully Insured & Bonded", desc: "Your vehicle is in safe hands. We carry full liability insurance so you can have complete peace of mind." },
                { title: "Eco-Friendly Products", desc: "We use biodegradable, pH-balanced products that are safe for your vehicle's surfaces and the environment." },
                { title: "Trained & Certified", desc: "Our detailers are professionally trained and certified in paint correction, ceramic coating application, and interior restoration." },
                { title: "No Hidden Fees", desc: "The price we quote is the price you pay. No surprise charges, no upselling pressure. Just honest, transparent pricing." },
                { title: "Flexible Scheduling", desc: "Early mornings, evenings, weekends — we work around your schedule, not the other way around." },
                { title: "Money-Back Guarantee", desc: "Not satisfied? We'll either redo the service or refund you completely. That's how confident we are in our work." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-6 rounded-lg border border-border h-full">
                    <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* The Xpress Difference */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <ScrollReveal>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
                The Xpress <span className="text-primary">Difference</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                We go beyond a simple wash. Here's what makes an Xpress detail different from the rest.
              </p>
            </ScrollReveal>
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {[
                { title: "Full Inspection Before We Start", desc: "We walk around your vehicle with you, noting existing damage and discussing your priorities before touching a single surface." },
                { title: "Professional-Grade Equipment", desc: "From dual-action polishers to HEPA-filtered extractors, we bring the full shop to your location — no shortcuts." },
                { title: "Premium Products Only", desc: "We exclusively use top-tier brands like Gtechniq, XPEL, and 3M. No cheap substitutes, no filler products." },
                { title: "Post-Detail Walkthrough", desc: "After every service, we do a final walkthrough with you to make sure every inch meets your expectations." },
                { title: "Aftercare Guidance", desc: "We provide personalized tips on how to maintain your vehicle's finish between details, extending the life of every service." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex gap-4 p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary">
          <div className="container text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of happy Calgary drivers. Book your mobile detail today — we come to you.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-10 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
              >
                Schedule My Detail
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
        <FloatingContact />
        <ChatWidget />
      </div>
    </PageTransition>
  );
};

export default WhyChooseUs;
