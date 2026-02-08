import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import fleetHero from "@/assets/fleet-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock } from "lucide-react";

const CorporateFleet = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", company_name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      company_name: form.company_name.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
      form_type: "fleet",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Thank you! We'll be in touch shortly." });
      setForm({ name: "", company_name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ServicePageHero title="Dealership, Fleet & Company Detailing in Calgary and Surrounding Areas" image={fleetHero} />

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">Expert Solutions for Fleet Maintenance</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Xpress Auto Detailing, we understand that your company's image rides on the condition of your fleet. Whether it's service vans, trucks, company cars, or specialty vehicles, we deliver professional mobile fleet detailing across Calgary and surrounding areas—straight to your business location, outside working hours for zero downtime.
            </p>
            <h3 className="font-heading font-bold text-xl uppercase text-foreground mb-3">Ready to Elevate Your Fleet?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Investing in fleet detailing isn't just a maintenance decision—it's a strategic investment in your company's reputation, vehicle lifespan, and employee well-being. Whether you manage a fleet of 5 or 500, we'll design a solution that fits your goals and budget.
            </p>
          </div>
          <img src={fleetHero} alt="Fleet detailing" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        </div>
      </section>

      {/* What's Included */}
      <section className="section-dark py-16">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground text-center mb-8">What's Included?</h2>
          <h3 className="font-heading font-bold text-xl text-primary text-center mb-8">Tailored Fleet Packages</h3>
          <p className="text-brand-gray text-center mb-8">We customize each plan to match your fleet size, frequency of service, and budget.</p>
          <div className="space-y-4">
            {[
              "Flexible Scheduling & No Vehicle Downtime: We clean overnight, early mornings, weekends, or during off-peak hours.",
              "Full-Mobile Convenience: No need to drive vehicles to a detailing center—we come to your site, fully equipped.",
              "Exterior wash, decontamination, clay bar treatment, waxing/sealants",
              "Multi-stage paint correction for swirl and oxidation removal",
              "Interior vacuuming, deodorizing, stain and odor removal",
              "Headlight restoration for improved driver safety",
              "Engine bay cleaning & anything you may need upon request",
              "Transparent Billing & Reporting: Clear invoicing and service reports.",
              "Scalable & Adaptable: From small teams to large commercial fleets.",
              "Quality & Consistency: Same trained detailers deliver professional-quality results every time.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-primary mt-1">»</span>
                <p className="text-brand-gray text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-8">Our Promise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: "1", title: "Reliability & Punctuality", desc: "We show up on time, every time—fully prepared to service your vehicles." },
              { n: "2", title: "Quality Results", desc: "We use only the best products and equipment to deliver consistent, showroom-level detailing." },
              { n: "3", title: "Customer-Focused Service", desc: "We listen, adapt, and tailor our offerings to fit your specific needs." },
              { n: "4", title: "Complete Satisfaction", desc: "We stand behind our work—if you're not happy, we'll make it right." },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 items-start p-5 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-primary-foreground text-sm">{item.n}</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground text-sm uppercase mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-dark py-16">
        <div className="container grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-primary-foreground mb-6">Get a Free Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
              <input type="text" placeholder="Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={100} />
              <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
              <textarea placeholder="How Can We Help? (Please mention fleet size & services required) *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required maxLength={1000} />
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors disabled:opacity-50">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-heading font-bold text-xl text-primary-foreground uppercase mb-6">We Love Talking to You!</h3>
            <p className="text-brand-gray mb-6">Feel free to contact us anytime.</p>
            <div className="space-y-4">
              <a href="tel:5875004523" className="flex items-center gap-3 text-brand-gray hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" /> 587-500-4523
              </a>
              <a href="mailto:support@xpressautodetailing.ca" className="flex items-center gap-3 text-brand-gray hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" /> support@xpressautodetailing.ca
              </a>
              <div className="flex items-center gap-3 text-brand-gray">
                <Clock className="w-5 h-5 text-primary" /> Monday – Sunday: 9:00 AM – 5:00 PM
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CorporateFleet;
