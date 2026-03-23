import { useState } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import TestimonialBlock from "@/components/TestimonialBlock";
import TrustStats from "@/components/TrustStats";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import fleetHero from "@/assets/fleet-kls-truck.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, TrendingUp, Shield, Users, Wrench, Check } from "lucide-react";

const fleetFAQs = [
  { q: "How many vehicles can you service at once?", a: "We can typically service 3–5 vehicles per visit depending on the package. For larger fleets, we'll create a rotation schedule that covers your entire fleet within a set timeframe." },
  { q: "Do you offer monthly or quarterly contracts?", a: "Yes! We offer flexible contract options including weekly, bi-weekly, monthly, and quarterly service schedules. Volume discounts are available for recurring contracts." },
  { q: "Can you work outside of business hours?", a: "Absolutely. We specialize in after-hours service — evenings, early mornings, and weekends — so your fleet stays operational during business hours with zero downtime." },
  { q: "Do you provide service reports and invoicing?", a: "Yes. Every service includes a detailed report with before/after notes, and we provide clear, itemized invoicing that's easy for your accounting team to process." },
  { q: "What industries do you serve?", a: "We serve all industries including construction, real estate, delivery services, dealerships, property management, healthcare, and more. If you have vehicles, we can keep them clean." },
];

const fleetTestimonials = [
  { quote: "We have 12 service vans and Xpress keeps them all spotless. They come on weekends so there's zero disruption. Our clients notice the difference — it projects professionalism.", name: "Mark T.", location: "Calgary", service: "Fleet of 12 Vans" },
  { quote: "As a dealership, presentation is everything. Xpress handles our inventory detailing and they're always reliable, thorough, and on time. Couldn't run our lot without them.", name: "Pacific Auto Group", location: "Airdrie", service: "Dealership Partner" },
  { quote: "Our real estate team has 8 company SUVs. Monthly detailing from Xpress keeps them looking sharp for client showings. The convenience of mobile service is a game-changer.", name: "Horizon Realty", location: "Calgary SW", service: "8-Vehicle Fleet" },
];

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
    <PageTransition><div className="min-h-screen">
      <SEO
         title="Fleet & Corporate Vehicle Detailing Calgary"
         description="On-site mobile fleet detailing for Calgary businesses. Volume discounts, after-hours scheduling & zero downtime. Trusted by Shell, Aecon & more. Get a free quote."
        canonical="/corporate-fleet"
        jsonLd={[
          buildServiceJsonLd("Corporate & Fleet Detailing", "Professional fleet and corporate vehicle detailing in Calgary.", "/corporate-fleet"),
          buildFAQJsonLd(fleetFAQs),
        ]}
      />
      <Navbar />
      <ServicePageHero title="Dealership, Fleet & Company Detailing in Calgary and Surrounding Areas" image={fleetHero} ctaType="call" />
      <TrustStats />

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-4">Expert Solutions for Fleet Maintenance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Xpress Auto Detailing, we understand that your company's image rides on the condition of your fleet. Whether it's service vans, trucks, company cars, or specialty vehicles, we deliver professional mobile fleet detailing across Calgary and surrounding areas—straight to your business location, outside working hours for zero downtime.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A clean fleet isn't just about aesthetics — it's about projecting professionalism, extending vehicle lifespan, and protecting your investment. Clients, partners, and employees all notice the difference. Let us handle the details so you can focus on running your business.
            </p>
            <h3 className="font-heading font-bold text-xl uppercase text-foreground mb-3">Ready to Elevate Your Fleet?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Investing in fleet detailing isn't just a maintenance decision—it's a strategic investment in your company's reputation, vehicle lifespan, and employee well-being. Whether you manage a fleet of 5 or 500, we'll design a solution that fits your goals and budget.
            </p>
          </div>
          <img src={fleetHero} alt="Fleet detailing" className="rounded-lg shadow-xl w-full object-cover aspect-video" />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-5xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">Why Fleet Detailing Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: TrendingUp, title: "Boost Brand Perception", desc: "Clean vehicles signal reliability and professionalism. Clients and prospects notice when your fleet is well-maintained — it builds trust before a word is spoken." },
              { icon: Shield, title: "Extend Vehicle Lifespan", desc: "Regular detailing prevents rust, corrosion, and interior degradation. Protecting your fleet's surfaces today saves thousands in repairs and replacements tomorrow." },
              { icon: Users, title: "Improve Employee Morale", desc: "Employees who drive clean, well-maintained vehicles feel more professional and take better care of company assets. It's a small investment with big cultural impact." },
              { icon: Wrench, title: "Reduce Maintenance Costs", desc: "Contaminants like salt, brake dust, and road grime accelerate wear on paint, wheels, and underbodies. Regular detailing catches these issues early." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-6 rounded-lg border border-border bg-background">
                <item.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-4">What's Included?</h2>
          <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">Tailored Fleet Packages</h3>
          <p className="text-muted-foreground text-center mb-8">We customize each plan to match your fleet size, frequency of service, and budget.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Flexible Scheduling & No Vehicle Downtime",
              "Full-Mobile Convenience — we come to your site",
              "Exterior wash, decontamination & waxing/sealants",
              "Multi-stage paint correction for swirl removal",
              "Interior vacuuming, deodorizing & stain removal",
              "Headlight restoration for improved safety",
              "Engine bay cleaning upon request",
              "Transparent Billing & Service Reporting",
              "Scalable from small teams to large fleets",
              "Consistent quality from trained detailers",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-lg border border-border">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-8">Our Promise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: "1", title: "Reliability & Punctuality", desc: "We show up on time, every time—fully prepared to service your vehicles." },
              { n: "2", title: "Quality Results", desc: "We use only the best products and equipment to deliver consistent, showroom-level detailing." },
              { n: "3", title: "Customer-Focused Service", desc: "We listen, adapt, and tailor our offerings to fit your specific needs." },
              { n: "4", title: "Complete Satisfaction", desc: "We stand behind our work—if you're not happy, we'll make it right." },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 items-start p-5 rounded-lg border border-border bg-background">
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

      <TestimonialBlock testimonials={fleetTestimonials} />

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-6">Get a Free Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
              <input type="text" placeholder="Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={100} />
              <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
              <textarea placeholder="How Can We Help? (Please mention fleet size & services required) *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-background border border-border text-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required maxLength={1000} />
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors disabled:opacity-50">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-heading font-bold text-xl text-foreground uppercase mb-6">We Love Talking to You!</h3>
            <p className="text-muted-foreground mb-6">Feel free to contact us anytime.</p>
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
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ title="Fleet Detailing FAQs" faqs={fleetFAQs} />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div></PageTransition>
  );
};

export default CorporateFleet;
