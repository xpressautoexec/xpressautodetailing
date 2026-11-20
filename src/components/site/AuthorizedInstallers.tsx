import suntek from "@/assets/brand-suntek.svg.asset.json";
import carpro from "@/assets/carpro/logo-carpro.png";
import exoshield from "@/assets/brand-exoshield.svg";
import { AUTHORIZED_BRANDS } from "@/data/protection-brands";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const logos: Record<string, string> = {
  SunTek: suntek.url,
  CARPRO: carpro,
  ExoShield: exoshield,
};
/** Short brand notes shown when a logo is tapped. No links: the popover stays on the page. */
const BRAND_INFO: Record<string, { tagline: string; body: string }> = {
  SunTek: {
    tagline: "Paint protection film",
    body: "SunTek makes clear, self-healing paint protection film that guards paint against rock chips, road debris and stains. Xpress installs SunTek film on cars, trucks and SUVs.",
  },
  CARPRO: {
    tagline: "Ceramic coatings",
    body: "CARPRO makes the CQUARTZ line of professional ceramic coatings. Xpress applies CQUARTZ Professional, CQUARTZ Finest Reserve and DQUARTZ, our diamond-infused flagship built for hardness and long-term gloss.",
  },
  ExoShield: {
    tagline: "Windshield protection film",
    body: "ExoShield makes optically clear film for windshields that helps resist chips, pitting and cracks from gravel. Xpress is a certified ExoShield installer, using GT3+ on cars and trucks and ULTRA on RVs and heavy-duty equipment.",
  },
};
/** Pass `showInfo` to make logos open a brand description (homepage only). */
export default function AuthorizedInstallers({ showInfo = false }: { showInfo?: boolean }) {
  return (
    <section
      id="authorized-installers"
      className="border-y border-line bg-canvas py-8 scroll-mt-24"
    >
      <div className="shell">
        <p className="text-center text-sm text-muted-ink">
          100+ five-star Google reviews · 300+ cars this season · $2M liability
          coverage
        </p>
        <p className="eyebrow mb-6 mt-7 text-center">Authorized installer</p>
        <div className="mx-auto grid max-w-2xl grid-cols-3 items-center gap-x-8 gap-y-7">
          {AUTHORIZED_BRANDS.map((name) => {
            const info = showInfo ? BRAND_INFO[name] : undefined;
            const mark = logos[name] ? (
              <img
                src={logos[name]}
                alt={`${name} authorized installer`}
                className="max-h-10 w-auto max-w-full object-contain"
                loading="lazy"
              />
            ) : (
              <span
                className="brand-placeholder"
                title={`${name} — official logo pending`}
              >
                {name}
              </span>
            );
            if (!info)
              return (
                <div
                  key={name}
                  className="installer-logo flex min-h-12 items-center justify-center"
                >
                  {mark}
                </div>
              );
            return (
              <Popover key={name}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-label={`About ${name}`}
                    className="installer-logo flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {mark}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="center"
                  sideOffset={10}
                  className="w-72 max-w-[calc(100vw-2rem)] rounded-xl border-line p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {info.tagline}
                  </p>
                  <p className="mt-1 text-base font-semibold text-ink">{name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                    {info.body}
                  </p>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </div>
    </section>
  );
}
