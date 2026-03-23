import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStats from "@/components/TrustStats";
import TrustBadges from "@/components/TrustBadges";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import AppShowcase from "@/components/AppShowcase";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialBlock from "@/components/TestimonialBlock";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import BrandPartners from "@/components/BrandPartners";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingContact from "@/components/FloatingContact";
import ChatWidget from "@/components/ChatWidget";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import HomePromoPopup from "@/components/HomePromoPopup";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const homeTestimonials = [
  {
    quote: "Best detailing service in Calgary, hands down. They came to my office and had my SUV looking brand new by the time I was done work.",
    name: "Mike T.",
    location: "Calgary",
    service: "Complete Detail",
  },
  {
    quote: "I've tried 4 different detailing services in the city. Xpress is the only one I keep coming back to. Consistent quality every single time.",
    name: "Priya S.",
    location: "Airdrie",
    service: "Monthly Client",
  },
  {
    quote: "Got my truck ceramic coated before winter. Best decision I ever made — the salt and grime just washes right off. Still looks incredible 6 months later.",
    name: "Brandon L.",
    location: "Cochrane",
    service: "Ceramic Coating",
  },
  {
    quote: "They detailed my minivan after a road trip with 3 kids. I didn't think it was possible to make it look that clean again. Absolutely worth every penny.",
    name: "Jessica H.",
    location: "Chestermere",
    service: "Deep Clean + Shield",
  },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pb-16 lg:pb-0">
        <SEO
          title="Mobile Car Detailing Calgary"
          description="Calgary's #1 rated mobile car detailing service — we come to your home or office. Interior, exterior, ceramic coating & fleet packages. 4.9★ on Google. Book now."
          canonical="/"
          jsonLd={localBusinessJsonLd}
        />
        <Navbar />
        <HeroSection />
        <TrustStats />
        <TrustBadges />
        <HowItWorks />
        <GoogleReviewBadge />
        <ServicesSection />
        <AboutSection />
        <AppShowcase />
        <BrandPartners />
        <ReviewsSection />

        {/* Service Areas */}
        <section className="py-14 sm:py-16 bg-card">
          <div className="container max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
                Proudly Serving <span className="text-gradient">Calgary & Beyond</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                Our fully equipped mobile detailing unit comes to you — wherever you are. We proudly serve Calgary and all surrounding communities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                {["Calgary", "Airdrie", "Chestermere", "Cochrane", "& Surrounding Areas"].map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full border border-border bg-background text-xs sm:text-sm text-muted-foreground font-heading font-semibold uppercase tracking-wider"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <BenefitsSection />
        <TestimonialBlock testimonials={homeTestimonials} />

        {/* Why Choose Us */}
        <section className="py-16 bg-background">
          <div className="container max-w-5xl">
            <ScrollReveal>
              <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase text-foreground text-center mb-8 md:mb-12 px-2">
                Why Calgary Trusts <span className="text-gradient">Xpress Auto Detailing</span>
              </h2>
            </ScrollReveal>
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 px-2 sm:px-0"
              staggerDelay={0.08}
            >
              {[
                {
                  title: "Fully Insured & Bonded",
                  desc: "Your vehicle is in safe hands. We carry full liability insurance for complete peace of mind.",
                },
                {
                  title: "Eco-Friendly Products",
                  desc: "Biodegradable, pH-balanced products that are safe for your vehicle's surfaces and the environment.",
                },
                {
                  title: "Trained & Certified",
                  desc: "Professionally trained and certified in paint correction, ceramic coating, and interior restoration.",
                },
                {
                  title: "No Hidden Fees",
                  desc: "The price we quote is the price you pay. No surprise charges, no upselling pressure.",
                },
                {
                  title: "Flexible Scheduling",
                  desc: "Early mornings, evenings, weekends — we work around your schedule.",
                },
                {
                  title: "Money-Back Guarantee",
                  desc: "Not satisfied? We'll redo the service or refund you. That's how confident we are.",
                },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                    <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <FAQSection />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-foreground">
          <div className="container text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-urgency/90 text-urgency-foreground font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
                <Clock className="w-3.5 h-3.5" />
                Spots Filling Up Fast
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background mb-4 px-4">
                Ready to See the Difference?
              </h2>
              <p className="text-background/60 max-w-xl mx-auto mb-4 text-sm sm:text-base">
                Join 2,000+ happy Calgary drivers who trust Xpress Auto Detailing. Book your mobile detail today — we come to you.
              </p>
              <div className="flex items-center justify-center gap-4 text-background/40 text-xs mb-8">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 14-Day Guarantee</span>
                <span>•</span>
                <span>Free Cancellation</span>
                <span>•</span>
                <span>No Hidden Fees</span>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-10 py-4 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-lg shadow-primary/30"
              >
                Schedule My Detail
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
        <FloatingContact />
        <ChatWidget />
        <HomePromoPopup />
      </div>
    </PageTransition>
  );
};

export default Index;
