import { Check, Plus, ArrowRight, CalendarCheck, Clock, Shield } from "lucide-react";
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
  featureGroups?: { label: string; items: string[] }[];
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
  featureGroups,
  extras,
  bonuses,
  addOns,
  guarantee = "Satisfaction Guarantee: Not satisfied? We redo it free.",
  surcharges,
  time,
  isPrimary = false,
  ctaText = "Book Now",
  ctaLink = "https://xpressauto.fieldd.co/",
  ctaExternal = true,
}: PackageCardProps) => (
  <div
    className={`relative rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
      isPrimary
        ? "ring-2 ring-primary/40 shadow-xl shadow-primary/10"
        : "border border-border hover:border-primary/30 hover:shadow-lg"
    }`}
  >
    {/* Popular badge */}
    {isPrimary && (
      <div className="absolute top-0 right-0 bg-urgency text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl z-10">
        Most Popular
      </div>
    )}

    {/* Header section */}
    <div className={`px-6 sm:px-8 pt-7 pb-5 ${isPrimary ? "bg-primary" : "bg-card"}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          isPrimary ? "bg-primary-foreground/15" : "bg-primary/10"
        }`}>
          <span className={isPrimary ? "text-primary-foreground" : "text-primary"}>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-heading font-black text-lg md:text-xl uppercase leading-tight ${
            isPrimary ? "text-primary-foreground" : "text-foreground"
          }`}>
            {name}
          </h3>
          <p className={`font-heading font-black text-3xl md:text-4xl mt-1 ${
            isPrimary ? "text-primary-foreground" : "text-primary"
          }`}>
            {price}
          </p>
        </div>
      </div>
      <p className={`text-sm leading-relaxed mt-3 ${
        isPrimary ? "text-primary-foreground/75" : "text-muted-foreground"
      }`}>
        {tagline}
      </p>
    </div>

    {/* Body section */}
    <div className={`px-6 sm:px-8 py-6 flex-1 flex flex-col ${isPrimary ? "bg-card" : "bg-card"}`}>
      {extras && extras.length > 0 && (
        <p className="text-sm mb-4 font-semibold text-muted-foreground">
          {extras[0]}
        </p>
      )}

      {/* Features */}
      {featureGroups && featureGroups.length > 0 ? (
        <div className={`mb-5 ${featureGroups.length > 1 ? "grid sm:grid-cols-2 gap-x-6 gap-y-5" : "space-y-5"}`}>
          {featureGroups.map((group, gi) => (
            <div key={gi}>
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {group.label}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-success/15">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-5">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground mb-3">
            What's Included
          </p>
          <ul className="space-y-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-success/15">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="text-foreground/80">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bonuses */}
      {bonuses && bonuses.length > 0 && (
        <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-2 text-primary/60">
            Included Bonuses
          </p>
          {bonuses.map((b, i) => (
            <p key={i} className="text-sm font-semibold text-primary">
              {b}
            </p>
          ))}
        </div>
      )}

      {/* Add-ons */}
      {addOns && addOns.length > 0 && (
        <div className="mb-5 p-4 rounded-xl bg-muted/40 border border-border/50">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-3 text-muted-foreground">
            Popular Add-Ons
          </p>
          <div className="space-y-2">
            {addOns.map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 shrink-0 text-primary/40" />
                  <span className="text-muted-foreground">{a.name}</span>
                </span>
                <span className="font-bold text-xs text-foreground">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Time & guarantee */}
      <div className="text-xs space-y-1.5 text-muted-foreground mb-3">
        {time && (
          <p className="flex items-center gap-1.5 font-medium text-muted-foreground">
            <Clock className="w-3 h-3" /> {time}
          </p>
        )}
        <p className="flex items-center gap-1.5">
          <Shield className="w-3 h-3" /> {guarantee}
        </p>
      </div>

      {/* Surcharges — high visibility */}
      {surcharges && surcharges.length > 0 && (
        <div className="mb-5 p-3 rounded-lg bg-urgency/10 border border-urgency/30">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest mb-1.5 text-urgency">
            Vehicle Size Pricing
          </p>
          <ul className="space-y-1">
            {surcharges.map((s, i) => (
              <li key={i} className="text-sm font-semibold text-foreground flex items-start gap-2">
                <Plus className="w-3.5 h-3.5 mt-0.5 shrink-0 text-urgency" />
                <span>{s.replace(/^Add\s*/i, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <a
        href={ctaLink}
        target={ctaExternal ? "_blank" : undefined}
        rel={ctaExternal ? "noopener noreferrer" : undefined}
        className="group flex items-center justify-center gap-2 font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
      >
        <CalendarCheck className="w-4 h-4" />
        {ctaText}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

export default PackageCard;
