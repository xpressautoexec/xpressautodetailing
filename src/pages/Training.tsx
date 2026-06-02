import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ArrowRight, GraduationCap, Shield, Wrench, Sparkles, Award, Users, Gem, Search } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const trainingFAQs = [
  { q: "Do I need any prior experience?", a: "No — our Detailing Fundamentals course is designed for complete beginners. However, for Ceramic Coating, Paint Correction, and PPF courses, we recommend at least some basic detailing experience or completing our fundamentals course first." },
  { q: "What products and tools are provided?", a: "All products, tools, and equipment are provided during training. You'll work with the same professional-grade products we use on client vehicles — including Gtechniq, XPEL, Chemical Guys, and Meguiar's." },
  { q: "How many students per class?", a: "We keep class sizes small — typically 4–6 students maximum — so you get plenty of hands-on time and one-on-one instruction." },
  { q: "Do I get a certificate?", a: "Yes! Every graduate receives a certificate of completion. Our Ceramic and PPF courses also include manufacturer-specific certifications that you can use to market your services." },
  { q: "Can I start a detailing business after training?", a: "Absolutely. Many of our graduates go on to launch successful mobile detailing businesses. We cover business fundamentals, pricing strategies, and marketing tips in every course." },
  { q: "Where does training take place?", a: "Training is conducted at our Calgary facility with real client vehicles. You'll work in a professional environment with proper lighting, equipment, and ventilation." },
];

const Training = () => (
  <PageTransition>
    <div className="min-h-screen">
      <SEO
        title="Auto Detailing Training Calgary"
        description="Hands-on auto detailing courses in Calgary. Learn ceramic coating, paint correction & PPF installation. Small classes of 4-6 students. Enroll now."
        canonical="/training"
        jsonLd={[buildFAQJsonLd(trainingFAQs)]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[340px] sm:h-[400px] overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 sm:pb-14 px-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="font-heading font-bold text-xs uppercase tracking-widest text-primary">Professional Training</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-primary-foreground text-center leading-tight mb-6 max-w-4xl">
            Master the Art of <span className="text-primary">Auto Detailing</span>
          </h1>
          <Link
            to="/training/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 shadow-lg shadow-primary/30 group"
          >
            View Course Schedule
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-4xl text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6">
              Turn Your Passion Into a <span className="text-primary">Career</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
              Whether you're starting from scratch or levelling up your skills, our hands-on training programs give you the real-world expertise to detail like a pro — or launch your own detailing business.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Learn from certified professionals who detail hundreds of vehicles a year. Small class sizes, real vehicles, and the same premium products we use on our clients' cars every day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground text-center mb-12">
              Why Train With <span className="text-primary">Xpress</span>?
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.08}>
            {[
              { icon: Wrench, title: "100% Hands-On", desc: "No PowerPoint marathons. You'll be polishing, coating, and wrapping from day one on real vehicles." },
              { icon: Users, title: "Small Class Sizes", desc: "4–6 students max per session ensures you get personalized attention and ample practice time." },
              { icon: Award, title: "Certified Instructors", desc: "Learn from Gtechniq & XPEL certified professionals with years of real-world experience." },
              { icon: Shield, title: "Manufacturer Certs", desc: "Graduate with recognized certifications you can use to market your services and build credibility." },
              { icon: Sparkles, title: "Premium Products", desc: "Train with the same pro-grade products we use daily — Gtechniq, XPEL, Chemical Guys, Meguiar's." },
              { icon: GraduationCap, title: "Business Support", desc: "We cover pricing, marketing, and operations so you can confidently launch or grow your detailing business." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-5 sm:p-6 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-bold text-foreground uppercase text-xs sm:text-sm mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Course Packages */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
              Training <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground font-heading text-sm uppercase tracking-widest mb-12">
              Choose the course that matches your goals
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0 mb-10">
            <PackageCard
              icon={<Wrench className="w-8 h-8" />}
              name="Detailing Fundamentals"
              price="$349"
              tagline="Perfect for: Beginners who want to learn proper detailing techniques from the ground up."
              features={[
                "2-day intensive hands-on training",
                "Interior deep cleaning & extraction",
                "Exterior wash, clay bar & decontamination",
                "Proper product selection & dilution ratios",
                "Tool operation & maintenance",
                "Paint-safe washing techniques",
                "Wheel & tire detailing mastery",
                "Leather & fabric care fundamentals",
                "Business startup basics & pricing strategies",
                "Certificate of completion",
              ]}
              bonuses={[
                "Starter product kit ($150 value)",
                "Business launch checklist",
              ]}
              time="Duration: 2 days (16 hours) | Calgary facility"
              ctaText="Call to Enroll"
              ctaLink="tel:5875004523"
              ctaExternal={false}
              guarantee=""
            />
            <PackageCard
              icon={<Search className="w-8 h-8" />}
              name="Paint Correction Mastery"
              price="$549"
              tagline="Perfect for: Detailers ready to add high-value paint correction services to their offerings."
              features={[
                "3-day intensive hands-on training",
                "Paint thickness measurement & assessment",
                "Single-stage & multi-stage correction",
                "Rotary & dual-action polisher techniques",
                "Compound & polish selection",
                "Swirl mark, scratch & oxidation removal",
                "Wet sanding fundamentals",
                "Paint finishing & refinement",
                "Before/after documentation for clients",
                "Certificate of completion",
              ]}
              bonuses={[
                "Paint correction compound kit ($200 value)",
                "Paint thickness gauge rental for 1 month",
              ]}
              time="Duration: 3 days (24 hours) | Calgary facility"
              isPrimary
              ctaText="Call to Enroll"
              ctaLink="tel:5875004523"
              ctaExternal={false}
              guarantee=""
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-2 sm:px-0">
            <PackageCard
              icon={<Gem className="w-8 h-8" />}
              name="Ceramic Coating Certification"
              price="$699"
              tagline="Perfect for: Detailers who want to offer premium ceramic coating services with manufacturer backing."
              features={[
                "3-day intensive hands-on training",
                "Surface preparation & decontamination",
                "Paint correction prerequisite techniques",
                "Ceramic coating application (multiple brands)",
                "Gtechniq Crystal Serum certification",
                "Curing processes & environmental controls",
                "Multi-layer coating techniques",
                "Maintenance coating applications",
                "Client consultation & expectation setting",
                "Manufacturer-backed certification",
              ]}
              bonuses={[
                "Gtechniq starter kit ($300 value)",
                "Listed as certified installer",
              ]}
              time="Duration: 3 days (24 hours) | Calgary facility"
              ctaText="Call to Enroll"
              ctaLink="tel:5875004523"
              ctaExternal={false}
              guarantee=""
            />
            <PackageCard
              icon={<Shield className="w-8 h-8" />}
              name="PPF Installation"
              price="$899"
              tagline="Perfect for: Detailers ready to master paint protection film and offer the highest-ticket service."
              features={[
                "5-day intensive hands-on training",
                "XPEL paint protection film certification",
                "DAP (Design Access Program) software training",
                "Pre-cut kit installation techniques",
                "Bulk film cutting & custom wrapping",
                "Complex curve & edge wrapping",
                "Headlight, mirror & high-impact areas",
                "Full front-end PPF installation",
                "Removal & re-application procedures",
                "XPEL certified installer status",
              ]}
              bonuses={[
                "XPEL sample roll kit ($250 value)",
                "DAP software access (3 months)",
                "Listed on XPEL installer locator",
              ]}
              time="Duration: 5 days (40 hours) | Calgary facility"
              isPrimary
              ctaText="Call to Enroll"
              ctaLink="tel:5875004523"
              ctaExternal={false}
              guarantee=""
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 bg-primary">
        <div className="container text-center">
          <ScrollReveal>
            <p className="text-primary-foreground/80 font-heading uppercase tracking-wider text-sm mb-3">Limited Spots Per Session</p>
            <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-primary-foreground mb-4">
              Ready to Level Up Your Skills?
            </h3>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-6 text-sm">
              Our next training sessions are filling up fast. Secure your spot today and start your journey toward professional-grade detailing mastery.
            </p>
            <Link
              to="/training/signup"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all group"
            >
              Reserve My Spot
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <ServiceFAQ title="Training FAQs" faqs={trainingFAQs} />

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-brand-blue-deep">
        <div className="container text-center px-4 sm:px-6">
          <ScrollReveal>
            <GraduationCap className="w-12 h-12 text-primary-foreground/80 mx-auto mb-4" />
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground mb-4">
              Invest in Yourself
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 text-sm sm:text-base max-w-2xl mx-auto">
              Our graduates go on to run successful detailing businesses, work at premium shops, and offer services that command top dollar. Your training starts here.
            </p>
            <p className="text-primary-foreground/60 text-sm mb-8">
              ✓ Hands-on with real vehicles &nbsp; ✓ Manufacturer certifications &nbsp; ✓ Small class sizes
            </p>
            <Link
              to="/training/signup"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/90 transition-all hover:shadow-lg group"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
);

export default Training;
