import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO from "@/components/SEO";
import ReviewsSection from "@/components/ReviewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialBlock from "@/components/TestimonialBlock";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

import { HOURS, SEASON_STATS } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS } from "@/data/copy";
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
  { icon: ShieldCheck, title: "Satisfaction guarantee", desc: "You walk the vehicle with us before we leave. If something isn't right, we fix it on the spot." },
  { icon: Award, title: "Professional product systems", desc: `Coatings and correction products from ${CERAMIC_CERTIFICATIONS.join(", ")}, applied to the manufacturer's process.` },
  { icon: Leaf, title: "Self-contained vans", desc: "Our vans carry their own water and power, so we can work in a driveway, storage lot or job site." },
  { icon: ThumbsUp, title: "Transparent pricing", desc: "Published package prices and per-foot RV rates. Quoted work is quoted in writing before we start." },
  { icon: Heart, title: "No payment until service", desc: "No deposit to book. You pay once the work is done." },
  { icon: Users, title: "Seven days a week", desc: `We work ${HOURS.replace("Monday–Sunday, ", "")}, every day of the week.` },
];

const stats = [
  { value: SEASON_STATS.cars, label: "Cars This Season" },
  { value: "100+", label: "5-Star Reviews" },
  { value: "40+", label: "RVs This Season" },
  { value: "6", label: "Communities Served" },
];

const WhyChooseUs = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pb-16 lg:pb-0">
        <SEO
      title="Why Choose Us — Calgary Detailing"
      description="100+ five-star Google reviews. Transparent pricing, mobile convenience & real results. See why Calgary trusts Xpress Auto Detailing."
          canonical="/why-choose-us"
        />
        <Navbar />
        <AutoBreadcrumbs />
        {/* Hero */}
        <section className="bg-brand-dark py-20 md:py-28">
          <div className="container text-center">
            <ScrollReveal>
              <h1 className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
                Why Choose Xpress?
              </h1>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
                We're not just another detailing company. We're Calgary's most trusted mobile detailing team — backed by hundreds of happy customers, industry certifications, and a relentless commitment to quality.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground font-heading font-bold px-10 py-4 rounded text-sm hover:bg-brand-blue-deep transition-colors"
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
                    <p className="font-heading font-semibold text-3xl md:text-4xl text-primary-foreground">{stat.value}</p>
                    <p className="text-primary-foreground/80 font-heading text-sm mt-1">{stat.label}</p>
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
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground text-center mb-4">
                Our Commitments to You
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
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
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
              <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-4">
                Proudly Serving Calgary & Beyond
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our fully equipped mobile detailing unit comes to you — wherever you are. We proudly serve Calgary and all surrounding communities, bringing dealership-quality results right to your driveway, office, or job site.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3">
                {["Calgary", "Airdrie", "Chestermere", "Cochrane", "& Surrounding Areas"].map((city) => (
                  <span key={city} className="bg-muted text-foreground font-heading font-semibold text-sm px-4 py-2 rounded-full">
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
              <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground text-center mb-12">
                Why Calgary Trusts Xpress Auto Detailing
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.08}>
              {[
                { title: "Written quotes", desc: "RV, PPF and correction work is quoted per foot or per panel, in writing, before any work starts." },
                { title: "Real product systems", desc: `We apply ${CERAMIC_CERTIFICATIONS.join(", ")} coatings and professional compounds, not retail spray-ons.` },
                { title: "You inspect before we leave", desc: "Walk around it with us. If something isn't right, we fix it before we pack up." },
                { title: "No hidden fees", desc: "The price we quote is the price you pay. Anything extra, like heavy pet hair, is agreed before we do it." },
                { title: "Flexible scheduling", desc: "Early mornings, evenings and weekends. We work around your schedule." },
                { title: "Financing on RV restoration", desc: "Spread larger RV restoration jobs over monthly payments, subject to lender approval." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-6 rounded-lg border border-border h-full">
                    <h3 className="font-heading font-bold text-foreground text-sm mb-2">{item.title}</h3>
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
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-foreground text-center mb-4">
                The Xpress Difference
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
                      <h3 className="font-heading font-bold text-foreground text-sm mb-1">{item.title}</h3>
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
              <h2 className="font-heading font-semibold text-3xl md:text-4xl text-primary-foreground mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of happy Calgary drivers. Book your mobile detail today — we come to you.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-foreground text-primary font-heading font-bold px-10 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors"
              >
                Schedule My Detail
              </a>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
        <ChatWidget />
      </div>
    </PageTransition>
  );
};

export default WhyChooseUs;
