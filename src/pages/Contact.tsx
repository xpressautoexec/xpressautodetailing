import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import TrustStats from "@/components/TrustStats";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";


const contactFAQs = [
  { q: "What areas do you serve?", a: "We serve Calgary and all surrounding communities including Airdrie, Cochrane, Chestermere, Okotoks, Strathmore, High River, Crossfield, Langdon, and Bearspaw. If you're within 30 minutes of Calgary, we can likely come to you." },
  { q: "How far in advance should I book?", a: "We recommend booking 2–3 days in advance for regular services. For ceramic coating and paint correction, we suggest booking at least a week ahead. Same-day and next-day availability is sometimes possible — just ask!" },
  { q: "What's your cancellation policy?", a: "We understand plans change. We ask for at least 24 hours' notice for cancellations. Late cancellations (under 24 hours) may incur a 25% fee to cover our scheduling costs." },
  { q: "Do you offer recurring service discounts?", a: "Yes! Clients who book monthly or bi-weekly receive preferential pricing and priority scheduling. Contact us for a custom recurring plan." },
  { q: "What payment methods do you accept?", a: "We accept cash, credit/debit cards, e-Transfer, and can arrange invoicing for corporate/fleet clients. Payment is collected after the service is complete and you're satisfied." },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
      form_type: "general",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Thank you! We'll be in touch shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <PageTransition><div className="min-h-screen">
      <SEO
        title="Contact Us | Xpress Auto Detailing Calgary"
        description="Get a free car detailing quote in Calgary. Call 587-500-4523 or send a message — we reply within 2 hours. Serving Calgary, Airdrie, Cochrane & Chestermere."
        canonical="/contact"
        jsonLd={buildFAQJsonLd(contactFAQs)}
      />
      <Navbar />

      {/* Hero */}
      <section className="py-20 bg-background">
        <div className="container text-center">
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question, need a quote, or ready to book? We'd love to hear from you. Reach out and we'll get back to you within a few hours.
          </p>
        </div>
      </section>

      <TrustStats />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground uppercase mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
                <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
                <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
                <textarea placeholder="How can we help? *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required maxLength={1000} />
                <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors disabled:opacity-50">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground uppercase mb-2">Get In Touch</h3>
                <p className="text-muted-foreground">We love our customers, so feel free to contact us anytime. We typically respond within 1–2 hours during business hours.</p>
              </div>
              <div className="space-y-4">
                <a href="tel:5875004523" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary" /> 587-500-4523
                </a>
                <a href="mailto:support@xpressautodetail.ca" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary" /> support@xpressautodetail.ca
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" /> Monday – Sunday: 9:00 AM – 5:00 PM
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" /> Serving Calgary & Surrounding Areas
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MessageCircle className="w-5 h-5 text-primary" /> Average response time: under 2 hours
                </div>
              </div>

              <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
                <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">💡 Quick Tip</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  For the fastest service, include your vehicle type, preferred date/time, and the service you're interested in. We'll get back to you with a confirmed booking right away!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ title="Frequently Asked Questions" faqs={contactFAQs} />

      {/* CTA */}
      <section className="py-12 bg-primary">
        <div className="container text-center">
          <h2 className="font-heading font-black text-xl uppercase text-primary-foreground mb-4">Prefer to Book Online?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
            Skip the form and book your detail instantly through our online booking system. Choose your package, pick a time, and we'll be there.
          </p>
          <a href="https://xpressauto.fieldd.co/" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-foreground text-primary font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
            Book Online Now
          </a>
        </div>
      </section>

      <Footer />
    </div></PageTransition>
  );
};

export default Contact;
