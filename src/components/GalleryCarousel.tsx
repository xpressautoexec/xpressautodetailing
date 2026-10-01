import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


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

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-ink-2";

  return (
    <section className="overflow-hidden border-y border-line bg-surface py-16 sm:py-24">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Recent work</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
              Customer vehicles, photographed on site by our crew.{" "}
              <Link to="/gallery" className="font-semibold text-electric hover:underline">
                Full gallery
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 text-sm tabular-nums text-muted-ink" aria-live="polite">
              {selectedIndex + 1} / {images.length}
            </span>
            <button onClick={scrollPrev} className={arrow} aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={scrollNext} className={arrow} aria-label="Next photo">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="-mx-2 overflow-hidden sm:-mx-3" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div key={i} className="min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_45%] sm:px-3 lg:flex-[0_0_33.333%]">
                <img
                  src={src}
                  alt={`Detailing result ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-[4px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
