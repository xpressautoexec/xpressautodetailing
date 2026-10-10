import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServiceFAQ from "@/components/ServiceFAQ";
import { Section, btnPrimary, cardClass, textLink } from "@/components/site/Section";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BOOKING_URL, PASS_ADDON_DISCOUNT, XPRESS_PASS } from "@/data/pricing";
import { CANCELLATION_SUMMARY, NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";
import { trackLead } from "@/lib/tracking";

const maxPass = Math.max(...XPRESS_PASS.map((p) => p.discount));

const contactFAQs = [
  { q: "What areas do you serve?", a: `${SERVICE_AREA_SENTENCE}. Just outside those areas? Call or text and ask.` },
  {
    q: "How far ahead should I book?",
    a: "Two to three days ahead for regular detailing, and about a week for ceramic coating, correction and RV restoration. Same-day and next-day slots sometimes open up, so it's worth asking.",
  },
  { q: "What's your cancellation policy?", a: CANCELLATION_SUMMARY },
  {
    q: "Do you offer recurring service discounts?",
    a: `Yes. The Xpress Pass saves up to ${maxPass}% on scheduled visits plus ${PASS_ADDON_DISCOUNT}% off add-ons, with no contract.`,
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash, credit and debit cards and e-Transfer. Fleet and corporate accounts can be invoiced. Payment is collected after the work is done.",
  },
];

const input =
  "mt-1.5 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-electric focus:ring-2 focus:ring-electric/20";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Add your name, email and a message.", variant: "destructive" });
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
      toast({ title: `That didn't send. Please call or text ${NAP.phone}.`, variant: "destructive" });
      return;
    }
    trackLead({ formType: "general", email: form.email.trim(), phone: form.phone.trim() });
    setDone(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
        <SEO
          title="Contact | Xpress Auto & RV Detailing Calgary"
          description={`Call or text ${NAP.phone}, email ${NAP.email}, or send a message. Mobile detailing across ${SERVICE_AREA_SENTENCE}.`}
          canonical="/contact"
          jsonLd={buildFAQJsonLd(contactFAQs)}
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="border-b border-line bg-surface py-14 sm:py-20">
          <div className="shell">
            <h1 className="font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">Contact</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
              Questions, quotes or bookings. Call or text for the fastest answer, or send a message and we'll reply the
              same day.
            </p>
          </div>
        </section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <dl className="space-y-7 text-[15px]">
              <div>
                <dt className="text-sm text-muted-ink">Call or text</dt>
                <dd className="mt-1">
                  <a href={NAP.phoneHref} className="font-heading text-2xl font-semibold text-ink hover:text-electric">
                    {NAP.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Email</dt>
                <dd className="mt-1">
                  <a href={NAP.emailHref} className="font-semibold text-ink hover:text-electric">
                    {NAP.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Hours</dt>
                <dd className="mt-1 font-semibold text-ink">{NAP.hours}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Service area</dt>
                <dd className="mt-1 font-semibold text-ink">{SERVICE_AREA_SENTENCE}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-ink">Book online</dt>
                <dd className="mt-1">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={textLink}>
                    Pick a package and a time
                  </a>
                </dd>
              </div>
            </dl>

            {done ? (
              <div className={`${cardClass} p-8`}>
                <p className="font-heading text-xl font-semibold text-ink">Message sent</p>
                <p className="mt-2 text-[15px] text-ink-2">We'll reply to {form.email} the same day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`${cardClass} p-6 sm:p-8`}>
                <h2 className="font-heading text-xl font-semibold text-ink">Send a message</h2>
                <p className="mt-1 text-sm text-muted-ink">Include your vehicle, the service and a preferred date and we can usually confirm in one reply.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink-2">
                    Name
                    <input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${input} h-11`} />
                  </label>
                  <label className="block text-sm font-medium text-ink-2">
                    Phone <span className="text-muted-ink">(optional)</span>
                    <input type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${input} h-11`} />
                  </label>
                  <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
                    Email
                    <input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${input} h-11`} />
                  </label>
                  <label className="block text-sm font-medium text-ink-2 sm:col-span-2">
                    How can we help?
                    <textarea required rows={5} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} py-2.5`} />
                  </label>
                </div>
                <button type="submit" disabled={loading} className={`${btnPrimary} mt-6 w-full disabled:opacity-50`}>
                  {loading ? "Sending…" : "Send message"}
                </button>
                <p className="mt-3 text-xs text-muted-ink">
                  Need to change a booking? See our <Link to="/cancellation-policy" className="underline">cancellation policy</Link>.
                </p>
              </form>
            )}
          </div>
        </Section>

        <ServiceFAQ title="Common questions" faqs={contactFAQs} />

        <Footer />
        <div className="h-20 lg:hidden" />
        <StickyMobileCTA />
      </div>
    </PageTransition>
  );
};

export default Contact;
