import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import giftcardHero from "@/assets/giftcard-hero.jpg";
import { Gift, Heart, Car, Sparkles } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const GiftCards = () => (
  <div className="min-h-screen">
    <Navbar />
    <ServicePageHero title="Gift Cards" image={giftcardHero} />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Give the Gift of a <span className="text-primary">Clean Ride</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Know someone whose car could use some love? Our gift cards make the perfect present for birthdays, holidays, or just because. Let them choose their perfect detailing package — from a quick interior refresh to a full ceramic coating transformation.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Gift, title: "Any Amount", desc: "Choose any value that fits your budget — from $50 to $500+." },
            { icon: Heart, title: "Perfect Gift", desc: "Great for birthdays, holidays, Father's Day, or any occasion." },
            { icon: Car, title: "Any Service", desc: "Redeemable for any of our detailing packages and services." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-lg border border-border text-center">
              <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-blue py-16">
      <div className="container text-center">
        <Sparkles className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-4">
          Ready to Purchase?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Contact us to purchase a gift card for any amount. We'll send you a digital or physical card that's ready to gift.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Now
          </a>
          <a href="tel:5875004523" className="inline-block border-2 border-primary-foreground text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded text-sm hover:bg-primary-foreground/10 transition-colors">
            Call Us: 587-500-4523
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default GiftCards;
