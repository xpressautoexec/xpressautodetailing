import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { Section, SectionHeading, btnPrimary, btnSecondary, cardClass } from "@/components/site/Section";
import heroImg from "@/assets/jobs/hero-training.webp";
import { PHOTOS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import { TRAINING, TRAINING_TERMS, money } from "@/data/pricing";
import { CERAMIC_CERTIFICATIONS, NAP, TRAINING_CERTIFICATION } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const trainingFAQs = [
  {
    q: "Do I need any experience?",
    a: `No for ${TRAINING[0].name}, which is built for beginners. For the correction, coating and film courses we recommend some detailing experience or ${TRAINING[0].name} first.`,
  },
  {
    q: "What products and tools are provided?",
    a: `Everything. You train with the same professional tools and products we use on client vehicles, including ${CERAMIC_CERTIFICATIONS.join(", ")} coatings.`,
  },
  {
    q: "How many students per class?",
    a: `${TRAINING_TERMS.classSize}, so you get real time on the machine and one-on-one feedback.`,
  },
  {
    q: "Do I get certified?",
    a: `Yes. Every graduate who completes the course earns the ${TRAINING_CERTIFICATION}, with a certificate you can show clients and employers.`,
  },
  {
    q: "How do I reserve a seat?",
    a: `Request a course and a preferred month online. We confirm a date by email, and a ${money(TRAINING_TERMS.deposit)} deposit holds your seat. You can move your seat with ${TRAINING_TERMS.rescheduleDays} days' notice.`,
  },
];

const Training = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Auto Detailing Training Calgary"
        description={`Hands-on detailing, paint correction, ceramic coating and PPF courses in Calgary. Classes of ${TRAINING_TERMS.classSize}, from ${money(Math.min(...TRAINING.map((c) => c.price)))}.`}
        canonical="/training"
        jsonLd={[buildFAQJsonLd(trainingFAQs)]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Detailing training"
        subtitle={`Hands-on courses taught by the crew that does the work every day. Real vehicles, professional products, classes of ${TRAINING_TERMS.classSize}.`}
        image={heroImg}
        ctaType="call"
      />

      <Section>
        <SectionHeading
          title="Courses"
          intro="Every course is hands-on from the first hour. Prices are per student and include all tools and products used in class."
          action={
            <Link to="/training/signup" className={btnPrimary}>
              Request a seat
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {TRAINING.map((c) => (
            <article key={c.id} className={`${cardClass} flex flex-col p-6 sm:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-ink">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-ink">
                    {c.duration}, {c.hours} hours
                  </p>
                </div>
                <p className="font-heading text-3xl font-semibold tabular-nums text-ink">{money(c.price)}</p>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{c.forWho}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {c.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                    {i}
                  </li>
                ))}
                <li className="flex gap-2.5 text-sm text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                  {TRAINING_CERTIFICATION}
                </li>
              </ul>
              <Link to={`/training/signup?course=${c.id}`} className={`${btnSecondary} mt-7`}>
                Request a seat in {c.name}
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <WorkShowcase
        title="The work you'll learn"
        intro="Correction, coating and detailing on real customer vehicles, the same standard we teach."
        photos={[...PHOTOS.ceramic, ...PHOTOS.exterior.slice(0, 6), ...PHOTOS.interior.slice(0, 4)]}
        tone="surface"
      />

      <ServiceFAQ title="Training questions" faqs={trainingFAQs} />

      <Section tone="dark">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              Questions before you sign up?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] text-primary-foreground/70">
              Call or text {NAP.phone} and talk to the people who teach the course.
            </p>
          </div>
          <Link to="/training/signup" className={btnPrimary}>
            Request a seat
          </Link>
        </div>
      </Section>

      <QualityProducts
        title="The products you train on"
        intro="The same professional lines our crews use on paid jobs, so what you learn carries straight into your own work."
      />


      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Training;
