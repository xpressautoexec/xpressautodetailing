import {
  ShieldCheck,
  Sparkles,
  Mountain,
  Layers,
  BadgeCheck,
  Eye,
  Gem,
  Droplets,
  Sun,
  Waves,
  CalendarClock,
  Wind,
  ThermometerSnowflake,
  SunDim,
  EyeOff,
  Car,
  Truck,
  Warehouse,
  Camera,
  Wallet,
} from "lucide-react";
import type { WhyItem } from "@/components/site/WhyBand";

type Why = { subject: string; intro: string; apart: string; items: WhyItem[] };

export const WHY_XPRESS: Why = {
  subject: "Xpress",
  intro:
    "Calgary is hard on vehicles: road salt, gravel, chinook freeze-thaw and hard water. We built Xpress around protecting what you drive and making it easy, with vans that carry their own water and power and a heated shop in Airdrie for coatings and film.",
  apart:
    "We are an authorized installer of SunTek, LLumar and CARPRO, so every film and coating we install is a professional product, installed the way the manufacturer intends, with their warranty behind it.",
  items: [
    { icon: Truck, label: "Mobile To Your Driveway" },
    { icon: Warehouse, label: "Heated Airdrie Shop" },
    { icon: BadgeCheck, label: "Authorized Installer" },
    { icon: ShieldCheck, label: "Warranty Coverage" },
    { icon: Camera, label: "15-Minute Photo Quotes" },
    { icon: Wallet, label: "$2M Liability Coverage" },
  ],
};

export const WHY_PPF: Why = {
  subject: "PPF",
  intro:
    "Paint protection film is a clear, self-healing urethane layer that takes the hits so your paint does not. On Alberta highways that means rock chips, gravel, salt and sand hit the film first.",
  apart:
    "We install SunTek and LLumar film as an authorized installer, cut to your exact vehicle, with the manufacturer's warranty on the film.",
  items: [
    { icon: ShieldCheck, label: "Rock Chip Defense" },
    { icon: Sparkles, label: "Self-Healing Film" },
    { icon: Mountain, label: "Salt & Gravel Protection" },
    { icon: Layers, label: "Gloss or Matte" },
    { icon: BadgeCheck, label: "Manufacturer Warranty" },
    { icon: Eye, label: "Invisible Finish" },
  ],
};

export const WHY_CERAMIC: Why = {
  subject: "Ceramic",
  intro:
    "A professional ceramic coating bonds to your clear coat and adds a hard, glossy, water-repellent layer. Dirt, salt and slush have less to grip, so washing is faster and the paint stays protected between washes.",
  apart:
    "Our flagship is CARPRO DQUARTZ, a ceramic coating reinforced with synthetic nano-diamonds for better resistance to wash swirls, installed by an authorized CARPRO installer.",
  items: [
    { icon: Gem, label: "Swirl Resistance" },
    { icon: Sparkles, label: "Deep Gloss" },
    { icon: Droplets, label: "Hydrophobic" },
    { icon: Sun, label: "UV & Salt Resistance" },
    { icon: Waves, label: "Easier Washing" },
    { icon: CalendarClock, label: "Multi-Year Protection" },
  ],
};

export const WHY_TINT: Why = {
  subject: "Tint",
  intro:
    "Quality window film keeps your cabin cooler in summer, cuts glare off snow and low winter sun, and helps protect your interior and your skin from UV.",
  apart:
    "We install LLumar and SunTek window film as an authorized installer, with clean edges, no bubbles, and the manufacturer's warranty on the film.",
  items: [
    { icon: ThermometerSnowflake, label: "Heat Rejection" },
    { icon: Sun, label: "UV Protection" },
    { icon: SunDim, label: "Less Glare" },
    { icon: EyeOff, label: "Added Privacy" },
    { icon: Car, label: "A New Look" },
    { icon: BadgeCheck, label: "Manufacturer Warranty" },
  ],
};

/** Shown on the RV hub: same band, RV-specific benefits. */
export const WHY_RV: Why = {
  subject: "Xpress RV",
  intro:
    "Alberta sun chalks gelcoat and fibreglass fast. We remove oxidation, restore the shine and seal it, at your house, storage lot or campground.",
  apart: "We bring our own water and power, so your RV does not have to move.",
  items: [
    { icon: Truck, label: "We Come To You" },
    { icon: Sun, label: "Oxidation Removal" },
    { icon: Sparkles, label: "Restored Gloss" },
    { icon: ShieldCheck, label: "RV PPF & Coatings" },
    { icon: Wind, label: "Roof & Seal Care" },
    { icon: Camera, label: "Photo Quotes" },
  ],
};
