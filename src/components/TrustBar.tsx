import { Star, MessageSquare, MapPin, Droplets } from "lucide-react";
import { TRUST_CLAIMS } from "@/data/copy";

const ICONS = [Star, MessageSquare, MapPin, Droplets];

/** Four verified claims. Nothing else goes in here. */
const TrustBar = () => (
  <div className="bg-brand-dark-surface border-y border-white/10">
    <div className="container py-3">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
        {TRUST_CLAIMS.map((claim, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={claim} className="flex items-center justify-center gap-2 text-center">
              <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-brand-gray">{claim}</span>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default TrustBar;
