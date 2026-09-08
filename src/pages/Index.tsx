import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import FeatureRow from "@/components/FeatureRow";
import BrandPartners from "@/components/BrandPartners";
import CompanyLogos from "@/components/CompanyLogos";
import ServicesSection from "@/components/ServicesSection";
import AutoPackages from "@/components/AutoPackages";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import AboutSection from "@/components/AboutSection";
import AssessmentForm from "@/components/AssessmentForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import ScrollReveal from "@/components/ScrollReveal";
import SEO, { localBusinessJsonLd } from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS, WATER_LINE } from "@/data/copy";
import { BOOKING_URL, PHONE, SERVICE_AREAS } from "@/data/pricing";

const Index = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Mobile Car & RV Detailing Calgary"
        description="Mobile detailing in Calgary, Airdrie, Cochrane and Chestermere. Cars, RVs, boats and fleets — our vans carry their own water and power, so we work wherever you park."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <HeroSection />
      <TrustBar />
      <FeatureRow />
      <BrandPartners />
      <CompanyLogos />
      <ServicesSection />

      {/* Packages */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container px-4 sm:px-6">
          <AutoPackages
            dark
            heading="Car Detailing Packages"
            intro="Choose your vehicle size and the prices update. Full details, add-ons and everything else live on the detailing page."
          />
          <div className="mt-10 text-center">
            <a
              href="/detailing"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-background/70 transition-colors hover:text-background"
            >
              See everything included and all add-ons
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container max-w-5xl px-6">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">{WATER_LINE}</p>
            </div>
          </ScrollReveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-heading text-sm font-black text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <GoogleReviewBadge />
      <AboutSection />

      {/* Free assessment */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container grid max-w-5xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground">
              Not sure what it needs?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Send us the basics and we'll come look at the vehicle, RV or boat in person — free, with no obligation.
              You'll get a straight answer on what's worth doing and what isn't.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {area}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <AssessmentForm source="home-assessment" />
          </ScrollReveal>
        </div>
      </section>

      <FAQSection />

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-foreground">
        <div className="container px-6 text-center">
          <ScrollReveal>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background mb-4">
              Book your detail
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base text-background/60">
              We come to you anywhere in Calgary, Airdrie, Cochrane and Chestermere.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-10 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${PHONE.replace(/-/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-background/25 px-10 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:border-background/60"
              >
                Call {PHONE}
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

export default Index;
