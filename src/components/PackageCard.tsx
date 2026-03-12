import { Check, Plus, ArrowRight, Phone } from "lucide-react";
import { type ReactNode } from "react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

interface AddOn {
  name: string;
  price: string;
}

interface PackageCardProps {
  icon: ReactNode;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  extras?: string[];
  bonuses?: string[];
  addOns?: AddOn[];
  guarantee?: string;
  surcharges?: string[];
  time?: string;
  isPrimary?: boolean;
  ctaText?: string;
  ctaLink?: string;
  ctaExternal?: boolean;
}

const PackageCard = ({
  icon,
  name,
  price,
  tagline,
  features,
  extras,
  bonuses,
  addOns,
  guarantee = "14-Day Guarantee: Not clean enough? We'll redo it free.",
  surcharges,
  time,
  isPrimary = false,
  ctaText = "Call Now",
  ctaLink = "tel:5875004523",
  ctaExternal = false,
}: PackageCardProps) => (
  <div
    className={`relative rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
      isPrimary
        ? "bg-gradient-to-br from-primary to-brand-blue-deep text-primary-foreground ring-2 ring-primary/50 shadow-xl shadow-primary/20"
        : "bg-brand-dark-surface text-primary-foreground border border-brand-dark-surface hover:border-primary/30"
    }`}
  >
    {/* Popular badge */}
    {isPrimary && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
        Most Popular
      </div>
    )}

    <div className="mb-5">
      <p className="text-3xl mb-2 text-primary">{icon}</p>
      <h3 className="font-heading font-black text-xl md:text-2xl uppercase leading-tight">
        {name}
      </h3>
      <p className={`font-heading font-black text-3xl md:text-4xl mt-2 ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>
        {price}
      </p>
    </div>

    <p className={`text-sm leading-relaxed mb-6 ${isPrimary ? "text-primary-foreground/80" : "text-brand-gray"}`}>
      {tagline}
    </p>

    {extras && extras.length > 0 && (
      <p className={`text-sm mb-4 font-semibold ${isPrimary ? "text-primary-foreground" : "text-brand-gray"}`}>
        {extras[0]}
      </p>
    )}

    <ul className="space-y-3 mb-6 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isPrimary ? "bg-primary-foreground/20" : "bg-primary/15"}`}>
            <Check className={`w-3 h-3 ${isPrimary ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <span className={isPrimary ? "text-primary-foreground/90" : "text-brand-gray"}>{f}</span>
        </li>
      ))}
    </ul>

    {bonuses && bonuses.length > 0 && (
      <div className={`mb-5 p-4 rounded-xl ${isPrimary ? "bg-primary-foreground/10 border border-primary-foreground/10" : "bg-primary/5 border border-primary/10"}`}>
        <p className={`text-[10px] font-heading font-bold uppercase tracking-widest mb-2 ${isPrimary ? "text-primary-foreground/60" : "text-primary/60"}`}>
          Included Bonuses
        </p>
        {bonuses.map((b, i) => (
          <p key={i} className={`text-sm font-semibold ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>
            {b}
          </p>
        ))}
      </div>
    )}

    {addOns && addOns.length > 0 && (
      <div className={`mb-5 p-4 rounded-xl ${isPrimary ? "bg-primary-foreground/[0.06]" : "bg-background/[0.04]"}`}>
        <p className={`text-[10px] font-heading font-bold uppercase tracking-widest mb-3 ${isPrimary ? "text-primary-foreground/60" : "text-primary/60"}`}>
          Popular Add-Ons
        </p>
        <div className="space-y-2">
          {addOns.map((a, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Plus className={`w-3.5 h-3.5 shrink-0 ${isPrimary ? "text-primary-foreground/50" : "text-primary/50"}`} />
                <span className={isPrimary ? "text-primary-foreground/80" : "text-brand-gray"}>{a.name}</span>
              </span>
              <span className={`font-bold text-xs ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>{a.price}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className={`text-xs mb-5 space-y-1 ${isPrimary ? "text-primary-foreground/60" : "text-brand-gray/70"}`}>
      <p className="font-medium">{guarantee}</p>
      {surcharges?.map((s, i) => <p key={i}>{s}</p>)}
      {time && <p className="font-medium">{time}</p>}
    </div>

    <a
      href={ctaLink}
      target={ctaExternal ? "_blank" : undefined}
      rel={ctaExternal ? "noopener noreferrer" : undefined}
      className={`group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg text-sm transition-all duration-300 ${
        isPrimary
          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:shadow-lg"
          : "bg-primary text-primary-foreground hover:bg-brand-blue-deep hover:shadow-lg hover:shadow-primary/20"
      }`}
    >
      {ctaText}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
);

export default PackageCard;
