import { Link } from "react-router-dom";
import { Section, SectionHeading, textLink } from "@/components/site/Section";
import { PhotoRail } from "@/components/site/PhotoRail";
import { VideoReel } from "@/components/site/VideoReel";
import type { Clip, Photo } from "@/data/photos";

export type Work = {
  title: string;
  intro?: string;
  photos: Photo[];
  /** Up to four 9:16 job clips shown above the photo rail. */
  clips?: Clip[];
};

/** Real job photos (and optional clips) for a service, as a swipeable rail. */
const WorkShowcase = ({
  title,
  intro,
  photos,
  clips,
  tone = "canvas",
  id,
}: Work & { tone?: "canvas" | "surface" | "dark"; id?: string }) => (
  <Section tone={tone} id={id}>
    <SectionHeading
      title={title}
      intro={intro}
      dark={tone === "dark"}
      action={
        <Link to="/gallery" className={tone === "dark" ? "text-sm font-semibold text-primary-foreground underline decoration-electric decoration-2 underline-offset-[6px]" : `text-sm ${textLink}`}>
          Full gallery
        </Link>
      }
    />
    {clips && clips.length > 0 && (
      <div className="mb-8 sm:mb-10">
        <VideoReel clips={clips} label={`${title} videos`} />
      </div>
    )}
    <PhotoRail photos={photos} label={`${title} photos`} dark={tone === "dark"} />
  </Section>
);

export default WorkShowcase;
