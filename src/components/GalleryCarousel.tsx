import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";


import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import gallery30 from "@/assets/gallery-30.jpg";
import gallery31 from "@/assets/gallery-31.jpg";
import gallery32 from "@/assets/gallery-32.jpg";
import gallery33 from "@/assets/gallery-33.jpg";
import gallery34 from "@/assets/gallery-34.jpg";
import gallery35 from "@/assets/gallery-35.jpg";
import gallery36 from "@/assets/gallery-36.jpg";
import gallery37 from "@/assets/gallery-37.jpg";
import gallery38 from "@/assets/gallery-38.jpg";
import gallery39 from "@/assets/gallery-39.jpg";
import bmwEmblem from "@/assets/gallery-bmw-emblem.jpg";
import bmwWheelFront from "@/assets/gallery-bmw-wheel-front.jpg";
import bmwRedInterior from "@/assets/gallery-bmw-red-interior.jpg";
import rvSurveyorFront from "@/assets/gallery-rv-surveyor-front.jpg";
import catExcavator1 from "@/assets/gallery-cat-excavator-1.jpg";
import catExcavator3 from "@/assets/gallery-cat-excavator-3.jpg";
import catExcavatorExt1 from "@/assets/gallery-cat-excavator-exterior-1.jpg";
import bmwHeadlight from "@/assets/gallery-bmw-headlight.jpg";
import bmwRear from "@/assets/gallery-bmw-rear.jpg";
import lexusIs from "@/assets/gallery-lexus-is.jpg";
import rvSurveyorFull from "@/assets/gallery-rv-surveyor-full.jpg";
import rangeRoverExterior from "@/assets/gallery-range-rover-exterior.jpg";
import rangeRoverInterior from "@/assets/gallery-range-rover-interior.jpg";
import subaruWheel from "@/assets/gallery-subaru-wheel.jpg";
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

const images = [gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14, gallery15, gallery16, gallery17, gallery18, gallery19, gallery20, gallery21, gallery22, gallery23, gallery24, gallery25, gallery26, gallery27, gallery28, gallery29, gallery30, gallery31, gallery32, gallery33, gallery34, gallery35, gallery36, gallery37, gallery38, gallery39, bmwEmblem, bmwWheelFront, bmwRedInterior, rvSurveyorFront, catExcavator1, catExcavator3, bmwHeadlight, bmwRear, lexusIs, rvSurveyorFull, catExcavatorExt1, rangeRoverExterior, rangeRoverInterior, subaruWheel, paintReflection, acuraGrey, acuraBlue, hurricaneRear, hurricaneFront, hurricaneHeadOn, hurricaneSide, gtiFront, gtiRear, gtiInterior, acuraGarage, acuraFloormat, acuraCargo];

const GalleryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 sm:py-20 bg-muted/30 overflow-hidden">
      <div className="container max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-4">
            See the Results
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto text-sm sm:text-base">
            Real vehicles, real transformations. Swipe through some of our recent work.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_55%] min-w-0 px-2 sm:px-3"
                >
                  <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                    <img
                      src={src}
                      alt={`Detailing result ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
