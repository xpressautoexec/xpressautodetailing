/**
 * Job receipts: real jobs written up like a work order. Only what we actually know about each
 * job goes in; optional fields stay empty rather than guessed (add time/price as they're logged).
 */
import gle from "@/assets/jobs/card-ceramic-mercedes-gle.webp";
import kodiak from "@/assets/jobs/card-rv-kodiak.webp";
import transit from "@/assets/jobs/fleet-dirtt-transit-onsite.webp";

export type JobReceipt = {
  id: string;
  photo: string;
  alt: string;
  vehicle: string;
  service: string;
  /** Where the work was done: driveway, storage lot, job site, Airdrie shop. */
  where?: string;
  products?: string[];
  timeOnJob?: string;
  link: { label: string; href: string };
};

export const JOB_RECEIPTS: JobReceipt[] = [
  {
    id: "gle",
    photo: gle,
    alt: "White Mercedes-AMG GLE headlight and hood after paint correction and ceramic coating",
    vehicle: "Mercedes-AMG GLE",
    service: "Paint correction + ceramic coating",
    products: ["System X PRO ceramic"],
    link: { label: "Ceramic & paint correction", href: "/ceramic-paint-correction" },
  },
  {
    id: "kodiak",
    photo: kodiak,
    alt: "Kodiak Ultra-Lite travel trailer after an Xpress exterior detail",
    vehicle: "Kodiak Ultra-Lite travel trailer",
    service: "RV exterior detail",
    link: { label: "RV & trailer detailing", href: "/rv-trailer" },
  },
  {
    id: "transit",
    photo: transit,
    alt: "Ford Transit fleet van during on-site cleaning",
    vehicle: "Ford Transit fleet vans",
    service: "On-site fleet cleaning",
    where: "Customer's lot",
    link: { label: "Fleet & dealership", href: "/fleet" },
  },
];
