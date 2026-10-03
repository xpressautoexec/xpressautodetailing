import { useEffect, useRef } from "react";
import type { Clip } from "@/data/photos";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Muted, looping 9:16 job clip. Loads nothing until it is near the viewport, plays only
 * while visible, and stays on its poster frame for visitors who prefer reduced motion.
 */
export const JobClip = ({ clip, className = "" }: { clip: Clip; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => undefined);
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={className}>
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.label}
        className="aspect-[9/16] w-full rounded-[6px] bg-brand-dark object-cover"
      />
      <figcaption className="sr-only">{clip.label}</figcaption>
    </figure>
  );
};

/** Row of job clips: swipeable on phones, a fixed grid on desktop. */
export const VideoReel = ({ clips, label }: { clips: Clip[]; label: string }) => (
  <ul
    aria-label={label}
    className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:mx-0 sm:grid sm:gap-4 sm:overflow-visible sm:px-0"
    style={{
      // Three clips stretch to the full row so there is no empty fourth slot; one or two stay compact.
      gridTemplateColumns: clips.length === 3 ? "repeat(3, minmax(0, 1fr))" : `repeat(${clips.length}, minmax(0, 280px))`,
    }}
  >
    {clips.map((c) => (
      <li key={c.src} className="w-[58%] shrink-0 snap-start sm:w-auto">
        <JobClip clip={c} />
      </li>
    ))}
  </ul>
);

export default VideoReel;
