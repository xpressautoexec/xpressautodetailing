import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PHOTOS } from "@/data/photos";

/** Car work only (this carousel sits on the auto detailing page), alternating categories. */
const images = (() => {
  const lists = [PHOTOS.exterior, PHOTOS.interior, PHOTOS.ceramic, PHOTOS.wheels, PHOTOS.dealership];
  const out: typeof PHOTOS.exterior = [];
  const longest = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < longest; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
})();

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
            {images.map((photo, i) => (
              <div key={i} className="min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_45%] sm:px-3 lg:flex-[0_0_33.333%]">
                <img
                  src={photo.src}
                  alt={photo.alt}
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
