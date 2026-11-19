import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import SEO, { buildFAQJsonLd } from "@/components/SEO";
import { Section, SectionHeading, btnPrimary, btnSecondary, cardClass } from "@/components/site/Section";
import heroImg from "@/assets/jobs/hero-training-machine-polish.webp";
import { PHOTOS } from "@/data/photos";
import WorkShowcase from "@/components/site/WorkShowcase";
import { TRAINING, TRAINING_PROMO, TRAINING_TERMS, money } from "@/data/pricing";
import BookLink from "@/components/site/BookLink";
import { CERAMIC_CERTIFICATIONS, NAP, TRAINING_CERTIFICATION } from "@/data/copy";
import QualityProducts from "@/components/site/QualityProducts";

const trainingFAQs = [
  {
    q: "Do I need any experience?",
    a: `No for ${TRAINING[0].name}, which is built for beginners. For the correction and coating courses we recommend some detailing experience or ${TRAINING[0].name} first.`,
  },
  {
    q: "What products and tools are provided?",
    a: `Everything. You train with the same professional tools and products we use on client vehicles, including ${CERAMIC_CERTIFICATIONS.join(", ")} coatings.`,
  },
  {
    q: "How many students per class?",
    a: "One. Every course is 1-on-1: just you and the instructor, so the whole day is your time on the machine with direct feedback.",
  },
  {
    q: "Do I get certified?",
    a: `Yes. Every graduate who completes the course earns the ${TRAINING_CERTIFICATION}, with a certificate you can show clients and employers.`,
  },
  {
    q: "How do I book?",
    a: `Book online and pick your date. Full-day courses run 9 AM to 5 PM at our Airdrie shop. For ${TRAINING[1].name}, you book Day 1 and Day 2 runs the next day; we confirm both by email. Enter ${TRAINING_PROMO.code} at checkout for ${TRAINING_PROMO.percent}% off your first course. You can move your date with ${TRAINING_TERMS.rescheduleDays} days' notice.`,
  },
  {
    q: "Is there a discount?",
    a: `Yes. Enter ${TRAINING_PROMO.code} at online checkout for ${TRAINING_PROMO.percent}% off any course, one use per student. Taking ${TRAINING[2].name} together with ${TRAINING[1].name} also drops the coating course to ${money(TRAINING[2].addOn!.price)}.`,
  },
];

const Training = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Auto Detailing Training Calgary"
        description={`1-on-1, hands-on detailing, paint correction and ceramic coating courses in Calgary, from ${money(Math.min(...TRAINING.map((c) => c.price)))}.`}
        canonical="/training"
        jsonLd={[buildFAQJsonLd(trainingFAQs)]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        openings={false}
        eyebrow="1-on-1 · hands-on"
        title="Detailing training"
        subtitle="1-on-1, hands-on courses in Calgary, Airdrie and surrounding areas, taught by the crew that does the work every day. Real vehicles, professional products, and the instructor to yourself."
        image={heroImg}
        ctaType="call"
        quoteHref="#courses"
        quoteLabel="Book online"
        bookHref="/training/signup"
        bookLabel="Need a different date? Request one"
      />

      <Section id="courses">
        <SectionHeading
          title="Courses"
          intro="Every course is 1-on-1 and hands-on from the first hour: one student, one instructor. Prices include all tools and products used on the day. Pick a course and book your date online."
        />
        <p className="-mt-4 mb-8 rounded-card border border-electric bg-electric-soft px-5 py-4 text-[15px] text-ink">
          Book online with code <strong className="font-semibold tracking-wide">{TRAINING_PROMO.code}</strong> for{" "}
          {TRAINING_PROMO.percent}% off your course. One use per student.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {TRAINING.map((c) => (
            <article key={c.id} className={`${cardClass} flex flex-col p-6 sm:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-ink">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-ink">
                    {c.schedule}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-3xl font-semibold tabular-nums text-ink">{money(c.price)}</p>
                  {c.addOn && (
                    <p className="mt-1 text-sm text-muted-ink">
                      or {money(c.addOn.price)} added to{" "}
                      {TRAINING.find((t) => t.id === c.addOn?.courseId)?.name}
                    </p>
                  )}
                </div>
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
              <div className="mt-7 flex flex-col gap-3">
                <BookLink href={c.book} className={btnPrimary}>
                  Book {c.name}
                </BookLink>
                {c.addOn && (
                  <BookLink href={c.addOn.book} className={btnSecondary}>
                    Book with {TRAINING.find((t) => t.id === c.addOn?.courseId)?.name} ({money(
                      (TRAINING.find((t) => t.id === c.addOn?.courseId)?.price ?? 0) + c.addOn.price,
                    )})
                  </BookLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          title="How 1-on-1 training works"
          intro="There is no group to keep pace with. You work on real vehicles with the instructor beside you the whole time."
        />
        <ol className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Pick your course", b: "Choose Detailing Fundamentals, Paint Correction Mastery or Ceramic Coating." },
            { n: "02", t: "Book your date", b: `Book online and pick any open date. Full-day courses run 9 AM to 5 PM. Use ${TRAINING_PROMO.code} for ${TRAINING_PROMO.percent}% off.` },
            { n: "03", t: "Hands on the tools", b: "You do the work yourself on real vehicles with professional tools and products, with correction and feedback as you go." },
            { n: "04", t: "Leave certified", b: `Every graduate receives the ${TRAINING_CERTIFICATION}.` },
          ].map((x) => (
            <li key={x.n} className="border-t border-line pt-5">
              <span className="num text-2xl text-primary">{x.n}</span>
              <h3 className="mt-2 font-heading text-xl font-bold text-ink">{x.t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{x.b}</p>
            </li>
          ))}
        </ol>
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
          <a href="#courses" className={btnPrimary}>
            Book online
          </a>
        </div>
      </Section>

      <QualityProducts
        title="The products you train on"
        intro="The same professional lines our crews use on paid jobs, so what you learn carries straight into your own work."
      />


      <Footer />
    </div>
  </PageTransition>
);

export default Training;
