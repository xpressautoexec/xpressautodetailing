import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import QuoteSection from "@/components/site/QuoteSection";
import WorkShowcase from "@/components/site/WorkShowcase";
import CoatPackages from "@/components/site/CoatPackages";
import ManufacturerWarranty from "@/components/site/ManufacturerWarranty";
import FeatureRow from "@/components/site/FeatureRow";
import { Section, SectionHeading } from "@/components/site/Section";
import SEO, { buildServiceJsonLd, buildFAQJsonLd } from "@/components/SEO";
import heroImg from "@/assets/jobs/hero-ceramic-machine-polish.webp";
import wheelFace from "@/assets/jobs/ceramic-rav4-wheel-face.webp";
import kitProfessional from "@/assets/carpro/kit-cquartz-professional.webp";
import kitFinestReserve from "@/assets/carpro/kit-cquartz-finest-reserve.webp";
import kitDquartz from "@/assets/carpro/kit-dquartz.webp";
import { PHOTOS } from "@/data/photos";
import { CERAMIC_PACKAGES, money } from "@/data/pricing";
import { SHOP } from "@/data/copy";

const from = Math.min(...CERAMIC_PACKAGES.map((p) => p.price));

const STEPS = [
  {
    n: "01",
    title: "Book your tier",
    body: "Pick 2-year, 3-year or DQUARTZ and your vehicle size, then book online or call. Takes two minutes.",
  },
  {
    n: "02",
    title: "Drop off, pick your coating",
    body: `Bring it to our heated shop in ${SHOP.city}. We check the paint with you and you confirm your coating.`,
  },
  {
    n: "03",
    title: "Pick up",
    body: "Corrected, coated and registered, with a care sheet and a booster visit every 6 months to keep it performing.",
  },
];

const faqs = [
  {
    q: "Which coating do I get?",
    a: "You choose. The 2 and 3-year packages each come with two coatings at the same price. The DQUARTZ package is CARPRO DQUARTZ topped with Finest Reserve. Pick when you book or decide at drop-off once we've looked at your paint together.",
  },
  {
    q: "Is paint correction included?",
    a: "Yes. The 2-year package includes a 1-step enhancement; the 3-year and DQUARTZ packages include a 2-step cut and polish. A coating seals in whatever is on the paint, so the correction comes first.",
  },
  {
    q: "Does ceramic coating stop rock chips?",
    a: "No. A coating resists salt, bug acid, bird droppings and UV and makes washing much easier, but it won't stop gravel. For chips, add paint protection film to the front end.",
  },
  {
    q: "How do I wash a coated car?",
    a: "pH-neutral soap and a clean mitt, or a touchless wash. Skip brush washes; they put back the swirls the correction took out.",
  },
];

const CeramicCoating = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas">
      <SEO
        title="Ceramic Coating Calgary | CARPRO, Gyeon & 3M"
        description={`Ceramic coating in Calgary from ${money(from)}, paint correction included. 2-year, 3-year and DQUARTZ packages with CARPRO, Gyeon and 3M coatings. Book online.`}
        canonical="/ceramic-coating"
        jsonLd={[
          buildServiceJsonLd(
            "Ceramic Coating",
            "Ceramic coating with paint correction in Calgary and area.",
            "/ceramic-coating",
          ),
          buildFAQJsonLd(faqs),
        ]}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        eyebrow="Ceramic coating"
        title="Gloss that lasts for years."
        subtitle={`Ceramic coating in Calgary, Airdrie and surrounding areas: paint correction plus a CARPRO, Gyeon or 3M coating, from ${money(from)}. Pick a tier, book it, choose your coating at drop-off.`}
        image={heroImg}
        imageAlt="Machine polishing a black Mini Cooper fender before ceramic coating"
        imagePosition="50% 70%"
        ctaType="book"
        bookHref="#packages"
        bookLabel="See packages and book"
        openings
      />

      <CoatPackages />

      <Section id="warranty">
        <SectionHeading
          eyebrow="Manufacturer warranty"
          title="Backed by CARPRO, registered by us."
          intro="Every CARPRO coating we install is registered with CARPRO under its Real World Warranty."
        />
        <ManufacturerWarranty brand="carpro" />
      </Section>

      <FeatureRow
        title="Wheels get coated too"
        image={wheelFace}
        imageAlt="Toyota RAV4 wheel face and dressed Michelin tire after ceramic coating"
        cta={{
          label: "See what each package coats",
          href: "/ceramic-coating#packages",
        }}
        flip
      >
        <p>
          Brake dust and road salt are the hardest things to keep off a wheel.
          On the 3-year and DQUARTZ packages we coat the wheel faces along with
          the paint and glass.
        </p>
        <p>
          A coated wheel sheds brake dust and grime with a rinse instead of a
          scrub, so the finish stays clean between washes.
        </p>
      </FeatureRow>

      <Section tone="canvas">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="Three steps. That's it."
            />
            <ol className="space-y-7">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-5"
                >
                  <span className="num text-2xl text-primary">{s.n}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 items-end gap-4 rounded-card bg-tint p-6 sm:p-10">
            <img
              src={kitDquartz}
              alt="CARPRO DQUARTZ coating kit"
              className="col-span-2 mx-auto w-3/4 object-contain"
              loading="lazy"
            />
            <img
              src={kitFinestReserve}
              alt="CARPRO CQUARTZ Finest Reserve coating kit"
              className="w-full object-contain"
              loading="lazy"
            />
            <img
              src={kitProfessional}
              alt="CARPRO CQUARTZ Professional coating kit"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <WorkShowcase
        title="Recent coating work"
        intro="Real cars from our shop and vans: the gloss, the reflections and the details up close."
        photos={PHOTOS.ceramic}
        tone="surface"
      />

      <ServiceFAQ title="Ceramic coating questions" faqs={faqs} />

      <QuoteSection
        source="ceramic-coating"
        defaultNeed="Paint correction/ceramic"
        title="Not sure which tier?"
        intro="Send the vehicle and a few daylight photos. We'll tell you honestly which tier is worth it for your paint."
      />

      <Footer />
    </div>
  </PageTransition>
);

export default CeramicCoating;
