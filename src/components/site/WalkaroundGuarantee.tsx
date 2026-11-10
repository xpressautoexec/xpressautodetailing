import { ShieldCheck } from "lucide-react";

export const WALKAROUND = {
  name: "The Walkaround Guarantee",
  promise:
    "We don't leave until you've walked around it with us and signed off. If something isn't right, we fix it on the spot.",
};

/**
 * Named guarantee badge.
 *   card    full block (homepage crew section)
 *   inline  compact seal + text (service pages, quote confirmation)
 *   dark    inline, on a charcoal band
 */
const WalkaroundGuarantee = ({ variant = "inline", className = "" }: { variant?: "card" | "inline" | "dark"; className?: string }) => {
  const seal = (size: string, tone: string) => (
    <span className={`flex shrink-0 items-center justify-center rounded-md ${size} ${tone}`} aria-hidden="true">
      <ShieldCheck className="h-1/2 w-1/2" strokeWidth={1.75} />
    </span>
  );

  if (variant === "card") {
    return (
      <div className={`relative overflow-hidden rounded-card border border-line bg-surface p-7 sm:p-9 ${className}`}>
        <div className="flex items-center gap-4">
          {seal("h-14 w-14", "bg-charcoal text-primary-foreground")}
          <p className="font-heading text-sm font-bold uppercase italic tracking-label text-electric">{WALKAROUND.name}</p>
        </div>
        <p className="mt-6 font-heading text-3xl font-bold leading-[1.1] text-ink">{WALKAROUND.promise}</p>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-electric" />
      </div>
    );
  }

  const dark = variant === "dark";
  return (
    <div
      className={`flex items-start gap-4 rounded-card border p-4 ${
        dark ? "border-primary-foreground/15 bg-charcoal-2" : "border-line bg-surface"
      } ${className}`}
    >
      {seal("h-11 w-11", dark ? "bg-electric text-primary-foreground" : "bg-charcoal text-primary-foreground")}
      <div>
        <p className={`font-heading text-[15px] font-bold uppercase italic tracking-label ${dark ? "text-primary-foreground" : "text-ink"}`}>
          {WALKAROUND.name}
        </p>
        <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-primary-foreground/70" : "text-ink-2"}`}>{WALKAROUND.promise}</p>
      </div>
    </div>
  );
};

export default WalkaroundGuarantee;
