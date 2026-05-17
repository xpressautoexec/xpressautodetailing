import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import SEO from "@/components/SEO";
import giftcardHero from "@/assets/gallery-26.jpg";
import { Gift, Heart, Car, Sparkles, Star, Calendar, CreditCard } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const GiftCards = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Car Detailing Gift Cards Calgary | From $75"
      description="Car detailing gift cards in Calgary from $75. Instant digital delivery — perfect for birthdays, holidays & thank-yous. Redeemable for any detailing service."
      canonical="/gift-cards"
    />
    <Navbar />
    <ServicePageHero title="Car Detailing Gift Cards Calgary" image={giftcardHero} />

    <section className="py-16 bg-background">
      <div className="container max-w-4xl text-center">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Give the Gift of a <span className="text-primary">Clean Ride</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Know someone whose car could use some love? Our gift cards make the perfect present for birthdays, holidays, or just because. Let them choose their perfect detailing package — from a quick interior refresh to a full ceramic coating transformation.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          There's nothing quite like surprising someone with a gift they'd never buy themselves — but absolutely love once they experience it. A professional detail transforms their daily commute into something they look forward to.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Gift, title: "Any Amount", desc: "Choose any value that fits your budget — from $50 to $500+. Custom amounts available for corporate gifts." },
            { icon: Heart, title: "Perfect Gift", desc: "Great for birthdays, holidays, Father's Day, Mother's Day, graduations, or any occasion worth celebrating." },
            { icon: Car, title: "Any Service", desc: "Redeemable for any of our detailing packages and services — they choose what they need most." },
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

    {/* Popular Gift Options */}
    <section className="py-16 bg-muted/30">
      <div className="container max-w-4xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
          Popular Gift Options
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Quick Refresh", amount: "$80 – $100", desc: "Perfect for a maintenance wash or quick interior cleanup. Great entry-level gift.", icon: Sparkles },
            { title: "Full Detail", amount: "$200 – $250", desc: "Covers a complete inside-and-out detail. The most popular gift card amount.", icon: Star },
            { title: "Premium Package", amount: "$400+", desc: "Enough for paint correction or ceramic coating. The ultimate gift for car lovers.", icon: CreditCard },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-lg border border-border bg-background text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-bold text-foreground uppercase text-sm mb-1">{item.title}</h3>
              <p className="font-heading font-black text-primary text-xl mb-2">{item.amount}</p>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Perfect For */}
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-8">
          Perfect For Every Occasion
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Birthdays" },
            { icon: Heart, label: "Valentine's Day" },
            { icon: Gift, label: "Christmas" },
            { icon: Star, label: "Father's Day" },
            { icon: Heart, label: "Mother's Day" },
            { icon: Car, label: "New Car Gift" },
            { icon: Gift, label: "Graduation" },
            { icon: Sparkles, label: "Just Because" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border text-center">
              <item.icon className="w-6 h-6 text-primary" />
              <span className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonial */}
    <section className="py-12 bg-muted/30">
      <div className="container max-w-3xl text-center">
        <div className="flex justify-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="text-muted-foreground italic text-lg leading-relaxed mb-4">
          "My husband is impossible to buy for. I got him a $250 gift card for Xpress Auto Detailing and he was SO excited. His truck looked brand new after the complete detail. Best gift I've ever given him — he won't stop talking about it."
        </blockquote>
        <p className="text-sm text-muted-foreground font-semibold">— Lisa M., Calgary</p>
      </div>
    </section>

    <section className="py-16 bg-muted/30">
      <div className="container max-w-2xl text-center">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">
          Purchase a <span className="text-primary">Gift Card</span>
        </h2>
        <p className="text-muted-foreground mb-8">
          Select your amount and checkout instantly. Digital delivery available.
        </p>
        <iframe
          src="https://xpressauto.fieldd.co/gift-cards/purchase"
          title="Purchase Xpress Auto Detailing Gift Card"
          className="w-full max-w-[500px] mx-auto block rounded-2xl border border-border"
          style={{ height: "max(800px, 80vh)" }}
        />
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default GiftCards;
