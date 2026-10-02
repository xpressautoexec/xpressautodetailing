import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import ClosingCTA from "@/components/site/ClosingCTA";
import { Section, SectionHeading } from "@/components/site/Section";

import SEO from "@/components/SEO";
import galleryHero from "@/assets/gallery-hero.jpg";

import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import gallery31 from "@/assets/gallery-31.jpg";
import gallery32 from "@/assets/gallery-32.jpg";
import gallery34 from "@/assets/gallery-34.jpg";
import gallery37 from "@/assets/gallery-37.jpg";
import bmwEmblem from "@/assets/gallery-bmw-emblem.jpg";
import bmwWheelFront from "@/assets/gallery-bmw-wheel-front.jpg";
import bmwWheelRear from "@/assets/gallery-bmw-wheel-rear.jpg";
import bmwRedInterior from "@/assets/gallery-bmw-red-interior.jpg";
import rvOxidation from "@/assets/gallery-rv-oxidation-correction.jpg";
import rvSurveyorFront from "@/assets/gallery-rv-surveyor-front.jpg";
import catExcavator1 from "@/assets/gallery-cat-excavator-1.jpg";
import catExcavator2 from "@/assets/gallery-cat-excavator-2.jpg";
import catExcavator3 from "@/assets/gallery-cat-excavator-3.jpg";
import catExcavator4 from "@/assets/gallery-cat-excavator-4.jpg";
import catExcavatorExt1 from "@/assets/gallery-cat-excavator-exterior-1.jpg";
import catExcavatorExt2 from "@/assets/gallery-cat-excavator-exterior-2.jpg";
import catExcavatorPedals from "@/assets/gallery-cat-excavator-pedals.jpg";
import bmwHeadlight from "@/assets/gallery-bmw-headlight.jpg";
import bmwMirrorTop from "@/assets/gallery-bmw-mirror-top.jpg";
import bmwRear from "@/assets/gallery-bmw-rear.jpg";
import bmwRedDash from "@/assets/gallery-bmw-red-dash.jpg";
import lexusIs from "@/assets/gallery-lexus-is.jpg";
import rvSurveyorFull from "@/assets/gallery-rv-surveyor-full.jpg";
import rvPaintCloseup from "@/assets/gallery-rv-paint-correction-closeup.jpg";
import subaruWheel from "@/assets/gallery-subaru-wheel.jpg";
import rangeRoverExterior from "@/assets/gallery-range-rover-exterior.jpg";
import rangeRoverInterior from "@/assets/gallery-range-rover-interior.jpg";
import paintReflection from "@/assets/gallery-paint-reflection.jpg";
import acuraGrey from "@/assets/gallery-acura-grey.jpg";
import acuraBlue from "@/assets/gallery-acura-blue.jpg";
import hurricaneRear from "@/assets/gallery-hurricane-rear.jpg";
import hurricaneFront from "@/assets/gallery-hurricane-front.jpg";
import hurricaneHeadOn from "@/assets/gallery-hurricane-head-on.jpg";
import hurricaneSide from "@/assets/gallery-hurricane-side.jpg";
import gtiFront from "@/assets/gallery-gti-front.jpg";
import gtiRear from "@/assets/gallery-gti-rear.jpg";
import gtiInterior from "@/assets/gallery-gti-interior.jpg";
import acuraGarage from "@/assets/gallery-acura-garage.jpg";
import acuraFloormat from "@/assets/gallery-acura-floormat.jpg";
import acuraCargo from "@/assets/gallery-acura-cargo.jpg";
import newmarDutchStarFront from "@/assets/gallery-newmar-dutch-star-front.jpg";
import newmarDutchStarSide from "@/assets/gallery-newmar-dutch-star-side.jpg";
import newmarHeadlights from "@/assets/gallery-newmar-headlights.jpg";
import newmarDutchStarBadge from "@/assets/gallery-newmar-dutch-star-badge.jpg";
import flagstaffTrailerSide from "@/assets/gallery-flagstaff-trailer-side.jpg";
import flagstaffTrailerCorrection from "@/assets/gallery-flagstaff-trailer-correction.jpg";
import kodiakTrailer from "@/assets/gallery-kodiak-trailer.jpg";
import citationMotorhome from "@/assets/gallery-citation-motorhome.jpg";
import sunchaserPontoon from "@/assets/gallery-sunchaser-pontoon.jpg";
import sunchaserPontoonSide from "@/assets/gallery-sunchaser-pontoon-side.jpg";
import sunchaserPontoonInterior from "@/assets/gallery-sunchaser-pontoon-interior.jpg";
import cadillacSrxFront from "@/assets/gallery-cadillac-srx-front.jpg";
import mercedesCClass from "@/assets/gallery-mercedes-c-class.jpg";
import jeepWrangler from "@/assets/gallery-jeep-wrangler.jpg";
import audiA4 from "@/assets/gallery-audi-a4.jpg";
import audiA4Reflection from "@/assets/gallery-audi-a4-reflection.jpg";
import porscheMacan from "@/assets/gallery-porsche-macan.jpg";
import cadillacSrxInterior from "@/assets/gallery-cadillac-srx-interior.jpg";
import defenderInterior from "@/assets/gallery-defender-interior.jpg";
import mazdaCx5Interior from "@/assets/gallery-mazda-cx5-interior.jpg";
import f150Interior from "@/assets/gallery-f150-interior.jpg";
import dirttSiennaOrange from "@/assets/gallery-dirtt-sienna-orange.jpg";
import dirttSiennaBlue from "@/assets/gallery-dirtt-sienna-blue.jpg";

type GalleryImage = { src: string; alt: string };

const sections: { title: string; description: string; images: GalleryImage[] }[] = [
  {
    title: "Paint Correction & Ceramic",
    description: "Multi-stage polishing and ceramic coatings that restore deep gloss and long-term protection.",
    images: [
      { src: bmwEmblem, alt: "Silver BMW hood with mirror-finish reflection after paint correction" },
      { src: bmwHeadlight, alt: "BMW M-series headlight and front fender after polish and decontamination" },
      { src: gallery26, alt: "Blue BMW M340i with deep gloss under studio lighting after ceramic coating" },
      { src: gallery28, alt: "Blue BMW M340i rear view with glowing taillights after ceramic" },
      { src: rvPaintCloseup, alt: "Close-up of RV paint correction with dramatic gloss restoration" },
      { src: audiA4Reflection, alt: "Black Audi A4 taillight and quarter panel showing deep gloss after polish" },
    ],
  },
  {
    title: "Exterior Detailing",
    description: "Hand wash, decontamination, polish and sealant — paint that looks freshly delivered.",
    images: [
      { src: rangeRoverExterior, alt: "Green Range Rover SV after full exterior detail with deep gloss finish" },
      { src: lexusIs, alt: "Charcoal Lexus IS F-Sport after full exterior detail" },
      { src: gallery20, alt: "Silver Audi RS5 after full exterior detail" },
      { src: gallery29, alt: "Silver Audi RS5 freshly detailed in driveway" },
      { src: gallery21, alt: "Black Tesla Model S with mirror-like paint finish" },
      { src: gallery22, alt: "Black Audi S5 freshly detailed in driveway" },
      
      { src: gallery11, alt: "Black BMW SUV after exterior detail" },
      { src: gallery14, alt: "White Tesla Model X after exterior wash and detail" },
      { src: bmwRear, alt: "BMW 2-Series convertible rear three-quarter view freshly detailed" },
      { src: bmwMirrorTop, alt: "BMW convertible side mirror with red leather visible inside" },
      { src: gallery31, alt: "BMW convertible after professional exterior detail" },
      { src: cadillacSrxFront, alt: "White Cadillac SRX in a Calgary driveway after full exterior detail" },
      { src: mercedesCClass, alt: "White Mercedes-Benz C-Class sedan freshly detailed in underground parking" },
      { src: audiA4, alt: "Black Audi A4 with glossy finish after exterior detail" },
      { src: porscheMacan, alt: "White Porsche Macan after exterior detail in the shop" },
      { src: jeepWrangler, alt: "Green Jeep Wrangler on aftermarket wheels after exterior detail" },
    ],
  },
  {
    title: "Interior Detailing",
    description: "Steam cleans, leather conditioning and full deep-cleans that bring cabins back to like-new.",
    images: [
      { src: rangeRoverInterior, alt: "Range Rover tan leather interior after deep clean and conditioning" },
      { src: bmwRedInterior, alt: "BMW red leather interior after deep clean and conditioning" },
      { src: bmwRedDash, alt: "BMW interior with red leather seats, steering wheel and dash after deep clean" },
      { src: gallery16, alt: "Pristine Audi interior after deep cleaning and conditioning" },
      { src: gallery27, alt: "BMW interior with protective steering wheel cover after detail" },
      { src: gallery8, alt: "Audi interior after deep clean and conditioning" },
      { src: gallery9, alt: "BMW center console and dash after interior detail" },
      { src: gallery10, alt: "SUV rear seats with tan leather after interior deep clean" },
      { src: gallery12, alt: "Audi interior detail with paperwork showing completed service" },
      { src: gallery13, alt: "BMW M-series dark interior after deep clean" },
      { src: gallery18, alt: "Audi red and black interior after detail" },
      { src: gallery19, alt: "Red Ford truck interior after deep clean" },
      { src: gallery32, alt: "Audi diamond-stitched leather seats after interior detail" },
      { src: gallery37, alt: "SUV cargo area after interior deep clean" },
      { src: cadillacSrxInterior, alt: "Cadillac SRX cream leather front seats and door panel after interior detail" },
      { src: defenderInterior, alt: "Land Rover Defender tan leather front cabin after interior detail" },
      { src: mazdaCx5Interior, alt: "Mazda CX-5 brown leather seats and console after interior detail" },
      { src: f150Interior, alt: "Ford F-150 black leather cabin and floor liners after interior detail" },
    ],
  },
  {
    title: "Dealership Details",
    description: "Lot-ready prep and full details for dealership inventory — interior, exterior, and showroom-ready finish.",
    images: [
      { src: acuraGarage, alt: "Grey Acura RDX being detailed in underground parking garage" },
      { src: acuraGrey, alt: "Grey Acura RDX A-Spec detailed for dealership lot in Calgary" },
      { src: acuraBlue, alt: "Blue Acura RDX lineup freshly detailed at Acura dealership" },
      { src: acuraFloormat, alt: "Acura floor mat and pedals after deep interior clean" },
      { src: acuraCargo, alt: "Acura RDX cargo area after dealership prep detail" },
      { src: gtiFront, alt: "White Volkswagen GTI front view prepped for dealership" },
      { src: gtiRear, alt: "White Volkswagen GTI rear view after dealership detail" },
      { src: gtiInterior, alt: "Volkswagen GTI plaid interior after dealership prep detail" },
      { src: paintReflection, alt: "Mirror-like paint reflection after dealership paint correction" },
    ],
  },
  {
    title: "Wheels & Tires",
    description: "Iron-decon wheel cleans, tire dressing, and caliper detailing.",
    images: [
      { src: bmwWheelFront, alt: "BMW M-series front wheel with blue caliper after detail" },
      { src: bmwWheelRear, alt: "BMW M-series rear wheel and quarter panel freshly detailed" },
      { src: subaruWheel, alt: "Subaru wheel with Michelin X-Ice tire after wheel and tire detail" },
      { src: gallery25, alt: "Silver Audi RS5 wheel and quarter panel after detail" },
    ],
  },
  {
    title: "RV & Trailer",
    description: "Oxidation removal, full exteriors, and interior resets for trailers and motorhomes.",
    images: [
      { src: rvOxidation, alt: "RV roof oxidation removal in progress with masking tape divider" },
      { src: rvSurveyorFront, alt: "Surveyor travel trailer front cap during oxidation correction" },
      { src: rvSurveyorFull, alt: "Surveyor travel trailer front cap full view during paint correction" },
      { src: hurricaneFront, alt: "Hurricane motorhome front view after full exterior detail" },
      { src: hurricaneHeadOn, alt: "Hurricane RV head-on view after professional wash and detail" },
      { src: hurricaneRear, alt: "Hurricane motorhome rear view freshly detailed" },
      { src: hurricaneSide, alt: "Hurricane RV full side profile after oxidation removal and detail" },
      { src: newmarDutchStarFront, alt: "Newmar Dutch Star diesel pusher front view after full exterior detail" },
      { src: newmarDutchStarSide, alt: "Newmar Dutch Star motorhome three-quarter view in the service bay after detail" },
      { src: newmarHeadlights, alt: "Newmar Dutch Star headlights and front cap with mirror gloss after polish" },
      { src: newmarDutchStarBadge, alt: "Newmar Dutch Star side badge and paint after exterior polish" },
      { src: flagstaffTrailerCorrection, alt: "Flagstaff travel trailer with tape lines marking a fiberglass correction test spot" },
      { src: flagstaffTrailerSide, alt: "Flagstaff Signature travel trailer side profile after wash and polish" },
      { src: kodiakTrailer, alt: "Kodiak travel trailer front cap after exterior detail" },
      { src: citationMotorhome, alt: "Citation Class C motorhome on a Mercedes Sprinter chassis after exterior detail" },
      { src: sunchaserPontoon, alt: "SunChaser pontoon boat on its trailer after exterior detail" },
      { src: sunchaserPontoonSide, alt: "SunChaser pontoon blue side panels and logs after polish" },
      { src: sunchaserPontoonInterior, alt: "SunChaser pontoon boat deck and vinyl seating after interior detail" },
    ],
  },
  {
    title: "Fleet & Heavy Equipment",
    description: "Vans, trucks and heavy equipment kept presentable and protected.",
    images: [
      { src: gallery7, alt: "DIRTT Construction Systems fleet van after professional wash" },
      { src: gallery23, alt: "KLS fleet Ford F-150 detailed in shop" },
      { src: gallery34, alt: "Ford F-150 fleet truck after exterior detail" },
      { src: dirttSiennaOrange, alt: "DIRTT fleet Toyota Sienna minivan after fleet wash and interior clean" },
      { src: dirttSiennaBlue, alt: "Blue DIRTT fleet Toyota Sienna minivan detailed at the company lot" },
      { src: catExcavatorExt1, alt: "CAT Landform excavator on jobsite after exterior wash" },
      { src: catExcavatorExt2, alt: "CAT 320 excavator side profile freshly detailed on construction site" },
      { src: catExcavator1, alt: "CAT excavator cab interior after professional deep clean" },
      { src: catExcavator2, alt: "Detailed CAT excavator operator cabin" },
      { src: catExcavator3, alt: "CAT excavator cab with spotless seat and controls" },
      { src: catExcavator4, alt: "Heavy equipment cabin restored to like-new condition" },
      { src: catExcavatorPedals, alt: "Spotless CAT excavator floor pedals and cab interior after detail" },
    ],
  },
];

/** RV first: it's the largest line of work. */
const ORDERED = [...sections.filter((s) => s.title === "RV & Trailer"), ...sections.filter((s) => s.title !== "RV & Trailer")];
const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "");

const Gallery = () => (
  <PageTransition>
    <div className="min-h-screen bg-canvas pb-16 lg:pb-0">
      <SEO
        title="Detailing Before & After Gallery"
        description="Photos from real Calgary mobile detailing jobs: RV oxidation removal, paint correction, ceramic coating, interiors, dealership and fleet work."
        canonical="/gallery"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Xpress Auto & RV Detailing gallery",
          description: "Photos from real Calgary mobile detailing jobs: RV restoration, paint correction, ceramic coating, interiors and fleet work.",
          url: "https://xpressautodetail.ca/gallery",
        }}
      />
      <Navbar />
      <AutoBreadcrumbs />
      <ServicePageHero
        title="Our work"
        subtitle="Every photo is a customer vehicle, shot on site by our crew. No stock images."
        image={galleryHero}
      />

      <nav aria-label="Gallery categories" className="sticky top-[60px] z-30 border-b border-line bg-surface/95 backdrop-blur lg:top-[68px]">
        <ul className="shell no-scrollbar flex gap-6 overflow-x-auto py-3 text-sm">
          {ORDERED.map((sec) => (
            <li key={sec.title} className="shrink-0">
              <a href={`#${slug(sec.title)}`} className="font-medium text-ink-2 hover:text-ink">
                {sec.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a href="#videos" className="font-medium text-ink-2 hover:text-ink">
              Videos
            </a>
          </li>
        </ul>
      </nav>

      {ORDERED.map((sec, i) => (
        <Section key={sec.title} id={slug(sec.title)} tone={i % 2 ? "surface" : "canvas"}>
          <SectionHeading title={sec.title} intro={sec.description} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sec.images.map((img) => (
              <img key={img.alt} src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/5] w-full rounded-[4px] object-cover" />
            ))}
          </div>
        </Section>
      ))}

      <Section tone="surface" id="videos">
        <SectionHeading title="Videos" intro="RV restoration jobs, start to finish." />
        <div className="grid grid-cols-2 gap-4 sm:max-w-xl">
          {["/videos/rv-video-1.mp4", "/videos/rv-video-3.mp4"].map((v) => (
            <video key={v} className="aspect-[9/16] w-full rounded-[4px] bg-brand-dark object-cover" controls muted playsInline preload="metadata">
              <source src={v} type="video/mp4" />
            </video>
          ))}
        </div>
      </Section>

      <GoogleReviewBadge />
      <ClosingCTA title="Want results like these?" />

      <Footer />
      <div className="h-20 lg:hidden" />
      <StickyMobileCTA />
    </div>
  </PageTransition>
);

export default Gallery;
