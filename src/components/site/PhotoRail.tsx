import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/data/photos";

const arrow =
  "flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-ink-2 disabled:cursor-default disabled:opacity-35 disabled:hover:border-line";

/**
 * Horizontal photo rail: swipe on touch, arrows on desktop, snap to each photo.
 * Replaces long photo grids so a page shows many jobs without endless scrolling.
 */
export const PhotoRail = ({
  photos,
  label,
  dark = false,
}: {
  photos: Photo[];
  /** Accessible name for the scroll region, e.g. "RV and trailer photos". */
  label: string;
  dark?: boolean;
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:-mx-0 sm:gap-4 sm:scroll-px-0 sm:px-0"
      >
        {photos.map((p) => (
          <li key={p.src} className="w-[78%] shrink-0 snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[4px] bg-line object-cover"
            />
          </li>
        ))}
      </ul>
      <div className="mt-5 hidden items-center justify-end gap-3 sm:flex">
        <span className={`mr-2 text-sm tabular-nums ${dark ? "text-primary-foreground/60" : "text-muted-ink"}`}>
          {photos.length} photos
        </span>
        <button type="button" onClick={() => page(-1)} disabled={atStart} className={arrow} aria-label="Previous photos">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => page(1)} disabled={atEnd} className={arrow} aria-label="Next photos">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

/**
 * Slow, continuous filmstrip of job photos (pauses on hover). With reduced motion it
 * becomes a plain horizontal scroller.
 */
export const PhotoMarquee = ({ photos, label }: { photos: Photo[]; label: string }) => (
  <div className="group relative overflow-hidden motion-reduce:overflow-x-auto" aria-label={label} role="region">
    <ul
      style={{ animationDuration: `${photos.length * 6}s` }}
      className="no-scrollbar flex w-max gap-3 motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] sm:gap-4">
      {[...photos, ...photos].map((p, i) => (
        <li key={`${p.src}-${i}`} aria-hidden={i >= photos.length} className="w-[62vw] shrink-0 sm:w-[300px] lg:w-[340px]">
          <img
            src={p.src}
            alt={i >= photos.length ? "" : p.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[4px] bg-line object-cover"
          />
        </li>
      ))}
    </ul>
  </div>
);

export default PhotoRail;
