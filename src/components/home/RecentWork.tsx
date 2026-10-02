import { Link } from "react-router-dom";
import { PhotoMarquee } from "@/components/site/PhotoRail";
import { VideoReel } from "@/components/site/VideoReel";
import { PHOTOS, CLIPS, type Photo } from "@/data/photos";

/** Interleave categories so the filmstrip alternates RVs, cars, boats and fleet. */
const mix = (() => {
  const lists = [PHOTOS.rv, PHOTOS.exterior, PHOTOS.ceramic, PHOTOS.marine, PHOTOS.interior, PHOTOS.fleet, PHOTOS.dealership];
  const out: Photo[] = [];
  for (let i = 0; i < 4; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
})();

/** Home: a moving filmstrip of recent jobs plus short clips from the crew. */
const RecentWork = () => (
  <section className="overflow-hidden border-y border-line bg-surface py-16 sm:py-24">
    <div className="shell flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Recent work
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
          Customer vehicles, photographed on site by our crew. No stock images.
        </p>
      </div>
      <Link
        to="/gallery"
        className="text-sm font-semibold text-electric hover:underline hover:underline-offset-4"
      >
        See the full gallery
      </Link>
    </div>

    <div className="mt-10 sm:mt-12">
      <PhotoMarquee photos={mix} label="Recent job photos" />
    </div>

    <div className="shell mt-12 sm:mt-16">
      <VideoReel
        clips={[CLIPS.rvCrewWash, CLIPS.paintCorrection, CLIPS.trailerPolish, CLIPS.teslaDetail]}
        label="Job videos"
      />
    </div>
  </section>
);

export default RecentWork;
