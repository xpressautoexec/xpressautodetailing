import suntek from "@/assets/brand-suntek.svg.asset.json";
import carpro from "@/assets/carpro/logo-carpro.png";
import exoshield from "@/assets/brand-exoshield.svg";
import { AUTHORIZED_BRANDS } from "@/data/protection-brands";
const logos: Record<string, string> = {
  SunTek: suntek.url,
  CARPRO: carpro,
  ExoShield: exoshield,
};
export default function AuthorizedInstallers() {
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
          {AUTHORIZED_BRANDS.map((name) => (
            <div
              key={name}
              className="installer-logo flex min-h-12 items-center justify-center"
            >
              {logos[name] ? (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
