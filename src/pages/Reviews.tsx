import { REAL_REVIEWS, GOOGLE_REVIEWS_URL } from "@/data/copy";
import { SEASON_STATS, BOOKING_URL } from "@/data/pricing";
import { Link } from "react-router-dom";
import { Star, ExternalLink, ArrowRight, MapPin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ChatWidget from "@/components/ChatWidget";
import SEO from "@/components/SEO";


const reviews = REAL_REVIEWS;

const stats = [
    { value: "100+", label: "Five-star reviews" },
  { value: SEASON_STATS.cars, label: "Cars this season" },
  { value: SEASON_STATS.rvs, label: "RVs this season" },
];

const Reviews = () => (
  <PageTransition>
    <div className="min-h-screen pb-16 lg:pb-0">
      <SEO
        title="Reviews — Xpress Auto Detailing Calgary"
        description="Read real customer reviews of Xpress Auto Detailing. 100+ five-star Google reviews from Calgary, Airdrie, Cochrane, Chestermere, Okotoks and Rocky View County clients."
        canonical="/reviews"
      />
      <Navbar />
      <AutoBreadcrumbs />

      <section className="bg-brand-dark py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex gap-1 mb-4" aria-label="Five-star Google reviews">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </div>
          <h1 className="font-heading font-semibold text-3xl md:text-5xl text-primary-foreground mb-5">
            Xpress Auto Detailing Customer Reviews
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Every review below comes from a real Calgary-area customer. We have earned more than one hundred
            five-star Google reviews by doing the same thing every time: showing up when we say we
            will, doing the work properly, and not leaving until the owner has inspected it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Read Reviews On Google <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              Book My Detail <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 bg-primary">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading font-semibold text-2xl md:text-3xl text-primary-foreground">{stat.value}</p>
              <p className="text-primary-foreground/80 font-heading text-xs mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-8">
            What Calgary Drivers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <blockquote key={review.name} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{review.text}</p>
                <footer className="font-heading font-bold text-xs text-foreground">
                  {review.name}
                  <span className="block text-muted-foreground font-normal normal-case tracking-normal mt-0.5">
                    {review.service}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewBadge />

      <section className="py-14 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-5">
            See The Work Behind The Reviews
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/gallery", label: "Gallery" },
              { to: "/why-choose-us", label: "Why Choose Us" },
              { to: "/auto-detailing", label: "Auto Detailing" },
              { to: "/rv-detailing", label: "RV Detailing" },
              { to: "/ceramic-coating", label: "Ceramic Coating" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-8">
            <MapPin className="w-4 h-4 text-primary" />
            Reviewed by customers in Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.
          </p>
        </div>
      </section>

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  </PageTransition>
);

export default Reviews;
