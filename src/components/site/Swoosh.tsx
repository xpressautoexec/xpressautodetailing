import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The van-wrap swoosh: one sweeping blue stripe that starts hairline-thin on the left
 * and thickens as it rises to the right. It is the only gradient on the site.
 *
 * Use it sparingly — never more than one per screen:
 *   hero-edge    along the bottom edge of a hero photo
 *   divider      between two light sections
 *   card-accent  slides in along the bottom of a card on hover (parent needs `group relative overflow-hidden`)
 */
type Variant = "hero-edge" | "divider" | "card-accent";

/* Top edge sweeps from bottom-left to top-right; bottom edge returns slightly lower, so the
   band is ~3px at the left and ~50px at the right of a 1440-wide box. */
const PATH = "M0 151 C 430 149 930 119 1440 18 L 1440 68 C 950 152 440 160 0 154 Z";

const variantClass: Record<Variant, string> = {
  "hero-edge": "pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(40px,7vw,104px)] w-full",
  divider: "block h-10 w-full sm:h-14",
  "card-accent":
    "pointer-events-none absolute inset-x-0 bottom-0 h-7 w-full translate-y-2 opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
};

const Swoosh = ({ variant = "divider", className }: { variant?: Variant; className?: string }) => {
  const id = useId().replace(/:/g, "");
  const grad = `swoosh-${id}`;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={cn("swoosh-art", variantClass[variant], className)}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "hsl(var(--electric))", stopOpacity: 0.35 }} />
          <stop offset="0.45" style={{ stopColor: "hsl(var(--electric))", stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: "hsl(var(--electric))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d={PATH} fill={`url(#${grad})`} />
    </svg>
  );
};

export default Swoosh;
