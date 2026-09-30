import brandAecon from "@/assets/brand-aecon.png";
import brandWoodsHomes from "@/assets/brand-woods-homes.png";
import brandTruman from "@/assets/brand-truman.png";
import brandKls from "@/assets/brand-kls.png";
import brandDirtt from "@/assets/brand-dirtt.png";
import brandShell from "@/assets/brand-shell.png";
import brandSilverhillAcura from "@/assets/brand-silverhill-acura.png";
import brandLandform from "@/assets/brand-landform.png";
import brandNewWestTruck from "@/assets/brand-new-west-truck.png.asset.json";
import brandRanchmans from "@/assets/brand-ranchmans.png.asset.json";

const partners = [
  { name: "Aecon", logo: brandAecon },
  { name: "Wood's Homes", logo: brandWoodsHomes },
  { name: "Truman Homes", logo: brandTruman },
  { name: "KLS Earthworks", logo: brandKls },
  { name: "DIRTT", logo: brandDirtt },
  { name: "Shell", logo: brandShell },
  { name: "Silverhill Acura", logo: brandSilverhillAcura },
  { name: "Landform", logo: brandLandform },
  { name: "New West Truck Centres", logo: brandNewWestTruck.url },
  { name: "Ranchman's", logo: brandRanchmans.url },
];

const CompanyLogos = () => (
  <section className="border-y border-line bg-surface py-14 sm:py-16">
    <div className="shell grid gap-8 lg:grid-cols-[14rem_1fr] lg:items-center lg:gap-12">
      <h2 className="font-heading text-lg font-semibold leading-snug tracking-tight text-ink">
        Trusted by Calgary builders, contractors and dealers
      </h2>
      <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 md:grid-cols-5">
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex h-20 items-center justify-center border-b border-r border-line px-4 md:h-24"
          >
            <img
              src={partner.logo}
              alt={`${partner.name}, commercial detailing client`}
              loading="lazy"
              className="max-h-10 w-auto max-w-[80%] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default CompanyLogos;
