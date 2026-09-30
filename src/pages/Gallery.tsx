import { REAL_REVIEWS, NAP } from "@/data/copy";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import AutoBreadcrumbs from "@/components/AutoBreadcrumbs";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/ServicePageHero";
import TrustStats from "@/components/TrustStats";

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
import { Star } from "lucide-react";

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
    ],
  },
  {
    title: "Fleet & Heavy Equipment",
    description: "Vans, trucks and heavy equipment kept presentable and protected.",
    images: [
      { src: gallery7, alt: "DIRTT Construction Systems fleet van after professional wash" },
      { src: gallery23, alt: "KLS fleet Ford F-150 detailed in shop" },
      { src: gallery34, alt: "Ford F-150 fleet truck after exterior detail" },
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

const Gallery = () => (
  <PageTransition><div className="min-h-screen">
    <SEO
      title="Detailing Before & After Gallery"
      description="Real before and after photos from Calgary mobile detailing jobs — interior cleans, paint corrections, ceramic coatings, RV oxidation removal & more."
      canonical="/gallery"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Xpress Auto Detailing — Before & After Gallery",
        description: "Portfolio of real Calgary mobile detailing transformations: interior deep cleans, paint corrections, ceramic coatings, and RV restorations.",
        url: "https://xpressautodetail.ca/gallery",
        about: "Mobile car detailing transformations in Calgary, Airdrie, Chestermere, Cochrane, Okotoks and Rocky View County.",
      }}
    />
    <Navbar />
        <AutoBreadcrumbs />
    <ServicePageHero title="Calgary Detailing Before & After Gallery" image={galleryHero} />
    <TrustStats />

    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground text-center mb-4">
          See the Transformation
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Browse through some of our recent projects. Every vehicle gets our full attention and the professional treatment it deserves. From quick maintenance washes to full paint corrections and ceramic coatings — these results speak for themselves.
        </p>
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-6 text-center">
                <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-2">
                  {section.description}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.images.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-lg group aspect-square relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-heading font-bold text-sm">{section.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground text-center mt-16 mb-8">
          Videos
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
              <source src="/videos/rv-video-1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-border">
            <video className="w-full aspect-video object-cover" controls muted playsInline preload="metadata">
              <source src="/videos/rv-video-3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>

    {/* Client Reactions */}
    <section className="py-16 bg-muted/30">
      <div className="container max-w-5xl">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground text-center mb-12">
          Client Reactions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REAL_REVIEWS.map((t, i) => (
            <div key={i} className="p-6 rounded-lg border border-border bg-background">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{t.text}</p>
              <p className="font-heading font-bold text-foreground text-xs">{t.name}</p>
              <p className="text-muted-foreground text-xs">{t.service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-primary">
      <div className="container text-center">
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-primary-foreground mb-4">
          Want Results Like These?
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
          Every vehicle in our gallery started just like yours. Book your detail today and your car could be our next showcase.
        </p>
        <a href={NAP.phoneHref} className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-heading font-bold px-8 py-4 rounded text-sm hover:bg-primary-foreground/90 transition-colors">
          Call Now
        </a>
      </div>
    </section>

    <Footer />
  </div></PageTransition>
);

export default Gallery;
