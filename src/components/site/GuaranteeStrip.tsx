import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { GUARANTEES } from "@/data/copy";
import { AUTHORIZED_BRANDS } from "@/data/protection-brands";
import suntek from "@/assets/brand-suntek.svg.asset.json";
import carpro from "@/assets/carpro/logo-carpro.png";
import exoshield from "@/assets/brand-exoshield.svg";

const LOGOS: Record<string, string> = { SunTek: suntek.url, CARPRO: carpro, ExoShield: exoshield };

/** Thin band under a hero: the booking promises, the policy link and the authorized-installer logos. */
const GuaranteeStrip = () => (
  <div className="border-b border-line bg-surface">
    <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
        {GUARANTEES.map((g) => (
          <li key={g} className="flex items-center gap-2 text-sm text-ink-2">
            <Check className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
            {g}
          </li>
        ))}
        <li>
          <Link
            to="/cancellation-policy"
            className="text-sm font-medium text-muted-ink underline decoration-muted-ink/40 decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Cancellation policy
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4 border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <span className="shrink-0 text-[11px] font-semibold uppercase leading-tight tracking-label text-muted-ink">
          Authorized
          <br />
          installer
        </span>
        <ul className="flex items-center gap-5">
          {AUTHORIZED_BRANDS.map((b) => (
            <li key={b}>
              <img src={LOGOS[b]} alt={`${b} authorized installer`} className="h-5 w-auto max-w-[110px] object-contain" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default GuaranteeStrip;
