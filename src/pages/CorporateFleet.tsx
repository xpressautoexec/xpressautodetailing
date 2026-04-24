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
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

import fleetHero from "@/assets/fleet-kls-truck.jpg";
import RecentWorkStrip from "@/components/RecentWorkStrip";
import catExcavator1 from "@/assets/gallery-cat-excavator-1.jpg";
import catExcavatorExt1 from "@/assets/gallery-cat-excavator-exterior-1.jpg";
import catExcavatorExt2 from "@/assets/gallery-cat-excavator-exterior-2.jpg";
import catExcavator3 from "@/assets/gallery-cat-excavator-3.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, TrendingUp, Shield, Users, Wrench, Check, ArrowRight, CheckCircle } from "lucide-react";

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
        title="Fleet & Corporate Vehicle Detailing Calgary — On-Site"
        description="On-site mobile fleet detailing for Calgary businesses. Volume pricing, after-hours service & zero downtime. Trusted by Shell, Aecon & more. Get a free fleet quote."
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
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-heading font-bold uppercase tracking-[0.15em] text-xs px-5 py-2 rounded-full mb-8 border border-primary/20">
                <Shield className="w-3.5 h-3.5" />
                Enterprise Solutions
              </div>
              <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-foreground mb-6">Expert Solutions for Fleet Maintenance</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Xpress Auto Detailing, we understand that your company's image rides on the condition of your fleet. Whether it's service vans, trucks, company cars, or specialty vehicles, we deliver professional mobile fleet detailing across Calgary and surrounding areas—straight to your business location, outside working hours for zero downtime.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A clean fleet isn't just about aesthetics — it's about projecting professionalism, extending vehicle lifespan, and protecting your investment. Clients, partners, and employees all notice the difference.
              </p>
              <a
                href="tel:5875004523"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all group"
              >
                <Phone className="w-4 h-4" />
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <img src={fleetHero} alt="Fleet detailing" className="rounded-2xl shadow-xl w-full object-cover aspect-video border border-border" />
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container max-w-5xl">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Maximize Your ROI</p>
            <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-foreground text-center mb-14">Why Fleet Detailing <span className="text-primary">Matters</span></h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {[
              { icon: TrendingUp, title: "Boost Brand Perception", desc: "Clean vehicles signal reliability and professionalism. Clients and prospects notice when your fleet is well-maintained — it builds trust before a word is spoken." },
              { icon: Shield, title: "Extend Vehicle Lifespan", desc: "Regular detailing prevents rust, corrosion, and interior degradation. Protecting your fleet's surfaces today saves thousands in repairs and replacements tomorrow." },
              { icon: Users, title: "Improve Employee Morale", desc: "Employees who drive clean, well-maintained vehicles feel more professional and take better care of company assets. It's a small investment with big cultural impact." },
              { icon: Wrench, title: "Reduce Maintenance Costs", desc: "Contaminants like salt, brake dust, and road grime accelerate wear on paint, wheels, and underbodies. Regular detailing catches these issues early." },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="group flex gap-4 items-start p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground uppercase text-sm mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Comprehensive Service</p>
            <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-foreground text-center mb-4">What's <span className="text-primary">Included</span>?</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">We customize each plan to match your fleet size, frequency of service, and budget.</p>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-4" staggerDelay={0.05}>
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
              <StaggerItem key={i}>
                <div className="flex gap-3 items-start p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">Our Commitment</p>
            <h2 className="font-heading font-black text-2xl md:text-3xl lg:text-4xl uppercase text-foreground text-center mb-14">Our <span className="text-primary">Promise</span></h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {[
              { n: "1", title: "Reliability & Punctuality", desc: "We show up on time, every time—fully prepared to service your vehicles." },
              { n: "2", title: "Quality Results", desc: "We use only the best products and equipment to deliver consistent, showroom-level detailing." },
              { n: "3", title: "Customer-Focused Service", desc: "We listen, adapt, and tailor our offerings to fit your specific needs." },
              { n: "4", title: "Complete Satisfaction", desc: "We stand behind our work—if you're not happy, we'll make it right." },
            ].map((item) => (
              <StaggerItem key={item.n}>
                <div className="flex gap-4 items-start p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-primary-foreground text-sm">{item.n}</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm uppercase mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <TestimonialBlock testimonials={fleetTestimonials} />

      {/* Contact Form */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div>
              <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs mb-3">Start Today</p>
              <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground mb-8">Get a Free Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
                <input type="text" placeholder="Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={100} />
                <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
                <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
                <textarea placeholder="How Can We Help? (Please mention fleet size & services required) *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-card border border-border text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required maxLength={1000} />
                <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all disabled:opacity-50">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center h-full">
              <h3 className="font-heading font-bold text-xl text-foreground uppercase mb-6">We Love Talking to You!</h3>
              <p className="text-muted-foreground mb-8">Feel free to contact us anytime.</p>
              <div className="space-y-5">
                <a href="tel:5875004523" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  587-500-4523
                </a>
                <a href="mailto:support@xpressautodetail.ca" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  support@xpressautodetail.ca
                </a>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  Monday – Sunday: 9:00 AM – 5:00 PM
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RecentWorkStrip
        eyebrow="Heavy Equipment Detailing"
        title="Recent"
        highlight="Fleet Work"
        description="From construction excavators to delivery vans — we restore operator cabins and exteriors to like-new condition."
        images={[
          { src: catExcavator1, alt: "CAT excavator cab interior after professional deep clean" },
          { src: catExcavator2, alt: "Detailed CAT excavator operator cabin" },
          { src: catExcavator3, alt: "CAT excavator cab with spotless seat and controls" },
          { src: catExcavator4, alt: "Heavy equipment cabin restored to like-new condition" },
        ]}
      />

      <ServiceFAQ title="Fleet Detailing FAQs" faqs={fleetFAQs} />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div></PageTransition>
  );
};

export default CorporateFleet;
