import { Link } from "react-router-dom";
import { Section, SectionHeading, textLink } from "@/components/site/Section";
import type { Photo } from "@/data/photos";

/**
 * Five-photo mosaic: the first photo is the large feature tile, the other four sit in a 2x2 beside it.
 * Puts real work near the top of a service page without a carousel to click through.
 */
const WorkMosaic = ({ title, intro, photos }: { title: string; intro?: string; photos: Photo[] }) => {
  const [feature, ...rest] = photos;
  return (
    <Section>
      <SectionHeading
        title={title}
        intro={intro}
        action={
          <Link to="/gallery" className={`text-sm ${textLink}`}>
            Full gallery
          </Link>
        }
      />
      <ul aria-label={`${title} photos`} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        <li className="col-span-2 lg:row-span-2">
          <img
            src={feature.src}
            alt={feature.alt}
            loading="lazy"
            className="aspect-[4/3] h-full w-full rounded-[8px] object-cover"
          />
        </li>
        {rest.slice(0, 4).map((p) => (
          <li key={p.src}>
            <img src={p.src} alt={p.alt} loading="lazy" className="aspect-square h-full w-full rounded-[8px] object-cover" />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default WorkMosaic;
