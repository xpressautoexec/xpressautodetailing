import brandKls from "@/assets/brand-kls.png";
import brandDirtt from "@/assets/brand-dirtt.png";
import brandSilverhillAcura from "@/assets/brand-silverhill-acura.png";
import brandLandform from "@/assets/brand-landform.png";
import brandNewWestTruck from "@/assets/brand-new-west-truck.png.asset.json";
import brandRanchmans from "@/assets/brand-ranchmans.png.asset.json";
import brandMidas from "@/assets/brand-midas.png";

/** `logo` is optional: a partner without a file yet renders as a neutral text label. */
const partners: { name: string; logo?: string }[] = [
  { name: "KLS Earthworks", logo: brandKls },
  { name: "DIRTT", logo: brandDirtt },
  { name: "Silverhill Acura", logo: brandSilverhillAcura },
  { name: "Landform", logo: brandLandform },
  { name: "New West Truck Centres", logo: brandNewWestTruck.url },
  { name: "Ranchman's", logo: brandRanchmans.url },
  { name: "Midas", logo: brandMidas },
];

const CompanyLogos = () => (
  <section className="border-y border-line bg-surface py-14 sm:py-16">
    <div className="shell">
      <h2 className="text-balance text-center font-heading text-lg font-semibold leading-snug tracking-tight text-ink">
        Trusted by Calgary builders, contractors, dealers and shops
      </h2>
      {/* One even row of seven on desktop; below that a centered wrap so a short last row sits in the middle. */}
      <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-7">
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex h-20 basis-[calc(50%-0.375rem)] items-center justify-center rounded-[8px] border border-line px-4 sm:basis-[calc(25%-0.5625rem)] md:h-24"
          >
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={`${partner.name}, commercial detailing client`}
                loading="lazy"
                className="max-h-10 w-auto max-w-[80%] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span className="font-heading text-base font-semibold uppercase tracking-[0.14em] text-muted-ink opacity-80">
                {partner.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CompanyLogos;
