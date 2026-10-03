import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { GUARANTEES } from "@/data/copy";

/** Thin band under a hero: the three booking promises, one link to the policy. */
const GuaranteeStrip = () => (
  <div className="border-b border-line bg-surface">
    <div className="shell flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <ul className="flex flex-col gap-2 sm:flex-row sm:gap-8">
        {GUARANTEES.map((g) => (
          <li key={g} className="flex items-center gap-2 text-sm text-ink-2">
            <Check className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
            {g}
          </li>
        ))}
      </ul>
      <Link to="/cancellation-policy" className="text-sm font-medium text-muted-ink underline decoration-muted-ink/40 decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">
        Cancellation policy
      </Link>
    </div>
  </div>
);

export default GuaranteeStrip;
