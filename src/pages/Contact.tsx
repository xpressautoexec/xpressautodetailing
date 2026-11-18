import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import { Section } from "@/components/site/Section";
import QuoteForm from "@/components/QuoteForm";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { PASS_ADDON_DISCOUNT, XPRESS_PASS } from "@/data/pricing";
import { CANCELLATION_SUMMARY, NAP, SERVICE_AREA_SENTENCE } from "@/data/copy";

const maxPass = Math.max(...XPRESS_PASS.map((p) => p.discount));

const contactFAQs = [
  { q: "What areas do you serve?", a: `${SERVICE_AREA_SENTENCE}. Just outside those areas? Call and ask.` },
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

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-canvas">
        <SEO
          title="Contact | Xpress Auto & RV Detailing Calgary"
          description={`Call ${NAP.phone}, email ${NAP.email}, or send a message. Mobile detailing across Calgary and area, plus our Airdrie shop.`}
          canonical="/contact"
          jsonLd={buildFAQJsonLd(contactFAQs)}
        />
        <Navbar />
        <AutoBreadcrumbs />

        <section className="border-b border-line bg-surface py-14 sm:py-20">
          <div className="shell">
            <h1 className="font-heading text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">Contact</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
              Questions, quotes or bookings. Call for the fastest answer, or send the details below and we'll reply the same day.
            </p>
          </div>
        </section>

        <Section id="message">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <dl className="space-y-7 text-[15px]">
              <div>
                <dt className="text-sm text-muted-ink">Call</dt>
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
            </dl>

            <div>
              <QuoteForm source="contact" title="Send us the details" />
              <p className="mt-3 text-xs text-muted-ink">
                Need to change a booking? See our <Link to="/cancellation-policy" className="underline">cancellation policy</Link>.
              </p>
            </div>
          </div>
        </Section>

        <ServiceFAQ title="Common questions" faqs={contactFAQs} />

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
