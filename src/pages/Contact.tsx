import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

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
    <div className="min-h-screen">
      <Navbar />

      <section className="section-dark py-20">
        <div className="container">
          <h1 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground text-center mb-12">
            Contact Us
          </h1>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={100} />
              <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" required maxLength={255} />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" maxLength={20} />
              <textarea placeholder="How can we help? *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full bg-brand-dark-surface border border-brand-dark-surface text-primary-foreground rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" required maxLength={1000} />
              <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="flex flex-col justify-center space-y-6">
              <h3 className="font-heading font-bold text-xl text-primary-foreground uppercase">Get In Touch</h3>
              <p className="text-brand-gray">We love our customers, so feel free to contact us anytime.</p>
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
                <div className="flex items-center gap-3 text-brand-gray">
                  <MapPin className="w-5 h-5 text-primary" /> Serving Calgary & Surrounding Areas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
