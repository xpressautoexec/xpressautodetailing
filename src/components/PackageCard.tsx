import { Check, Plus } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

interface AddOn {
  name: string;
  price: string;
}

interface PackageCardProps {
  icon: string;
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
}: PackageCardProps) => (
  <div className={`rounded-xl p-8 h-full flex flex-col ${isPrimary ? "bg-primary text-primary-foreground ring-4 ring-primary" : "bg-brand-dark-surface text-primary-foreground"}`}>
    <div className="mb-4">
      <h3 className="font-heading font-black text-xl md:text-2xl uppercase">
        {icon} {name}
      </h3>
      <p className={`font-heading font-black text-2xl md:text-3xl mt-1 ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>
        — From {price}
      </p>
    </div>
    <p className={`text-sm mb-6 ${isPrimary ? "text-primary-foreground/80" : "text-brand-gray"}`}>
      {tagline}
    </p>

    {extras && extras.length > 0 && (
      <p className={`text-sm mb-4 font-semibold ${isPrimary ? "text-primary-foreground/90" : "text-brand-gray"}`}>
        {extras[0]}
      </p>
    )}

    <ul className="space-y-2.5 mb-6 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm">
          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isPrimary ? "text-primary-foreground" : "text-primary"}`} />
          <span className={isPrimary ? "text-primary-foreground/90" : "text-brand-gray"}>{f}</span>
        </li>
      ))}
    </ul>

    {bonuses && bonuses.length > 0 && (
      <div className="mb-4 space-y-1">
        {bonuses.map((b, i) => (
          <p key={i} className={`text-sm font-semibold ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>
            {b}
          </p>
        ))}
      </div>
    )}

    {addOns && addOns.length > 0 && (
      <div className={`mb-4 p-4 rounded-lg ${isPrimary ? "bg-primary-foreground/10" : "bg-background/5"}`}>
        <p className={`text-xs font-heading font-bold uppercase tracking-wider mb-2 ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>
          Popular Add-Ons
        </p>
        <div className="space-y-1.5">
          {addOns.map((a, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Plus className={`w-3 h-3 shrink-0 ${isPrimary ? "text-primary-foreground/70" : "text-primary"}`} />
                <span className={isPrimary ? "text-primary-foreground/90" : "text-brand-gray"}>{a.name}</span>
              </span>
              <span className={`font-semibold ${isPrimary ? "text-primary-foreground" : "text-primary"}`}>{a.price}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className={`text-xs mb-4 space-y-1 ${isPrimary ? "text-primary-foreground/70" : "text-brand-gray"}`}>
      <p>{guarantee}</p>
      {surcharges?.map((s, i) => <p key={i}>{s}</p>)}
      {time && <p>{time}</p>}
    </div>

    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`block text-center font-heading font-bold uppercase tracking-wider px-6 py-3 rounded text-sm transition-colors ${
        isPrimary
          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          : "bg-primary text-primary-foreground hover:bg-brand-blue-deep"
      }`}
    >
      Schedule My Detail
    </a>
  </div>
);

export default PackageCard;
