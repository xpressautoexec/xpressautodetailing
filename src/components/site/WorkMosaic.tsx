import type { Photo } from "@/data/photos";

/**
 * Five-photo mosaic: the first photo is the large feature tile, the other four sit in a 2x2 beside it.
 */
const WorkMosaic = ({ photos, label }: { photos: Photo[]; label: string }) => {
  const [feature, ...rest] = photos;
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
      <li className="col-span-2 lg:row-span-2">
        <img src={feature.src} alt={feature.alt} loading="lazy" className="aspect-[4/3] h-full w-full rounded-[8px] object-cover" />
      </li>
      {rest.slice(0, 4).map((p) => (
        <li key={p.src}>
          <img src={p.src} alt={p.alt} loading="lazy" className="aspect-square h-full w-full rounded-[8px] object-cover" />
        </li>
      ))}
    </ul>
  );
};

export default WorkMosaic;
