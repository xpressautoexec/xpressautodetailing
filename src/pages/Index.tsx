import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Zap } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
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
import CompanyLogos from "@/components/CompanyLogos";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import InstagramFeed from "@/components/InstagramFeed";

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
          description="We come to you. Calgary's 4.9-star mobile detailing — interior, exterior, ceramic coating, PPF & RV oxidation removal. Online booking, same-week service."
          canonical="/"
          jsonLd={localBusinessJsonLd}
        />
        <Navbar />
        <AutoBreadcrumbs />
        <HeroSection />
        <FeatureRow />
        <ServicesSection />
        <HowItWorks />
        <GoogleReviewBadge />
        <BrandPartners />
        <AboutSection />
        <ReviewsSection />
        <InstagramFeed />



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

        <TestimonialBlock testimonials={homeTestimonials} />

        <FAQSection />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205_100%_50%/0.1),transparent_70%)]" />
          <div className="container text-center relative z-10">
            <ScrollReveal>
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background mb-4 px-4">
                Ready to See the Difference?
              </h2>
              <p className="text-background/70 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                Book your mobile detail today — we come to you, anywhere in Calgary and the surrounding communities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-10 py-4 rounded-lg text-sm hover:bg-primary/90 transition-all"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:5875004523"
                  className="inline-flex items-center gap-2 text-background/70 font-heading font-semibold uppercase tracking-wider px-4 py-4 text-xs hover:text-background transition-colors"
                >
                  Or call (587) 500-4523
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>


        <Footer />
        <div className="h-24 lg:hidden" />
        <StickyMobileCTA />
        <ChatWidget />
      </div>
    </PageTransition>
  );
};

export default Index;
