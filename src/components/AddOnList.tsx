import { ADDONS, PET_HAIR_TIERS, money } from "@/data/pricing";

interface Props {
  dark?: boolean;
}

/** Every add-on, priced from pricing.ts. Pet hair is tiered. */
const AddOnList = ({ dark = false }: Props) => {
  const text = dark ? "text-background" : "text-foreground";
  const sub = dark ? "text-background/60" : "text-muted-foreground";
  const border = dark ? "border-background/15" : "border-border";
  const card = dark ? "bg-background/[0.04]" : "bg-card";

  return (
    <div className="space-y-8">
      <div className={`overflow-hidden rounded-2xl border ${border} ${card}`}>
        <ul className={`divide-y ${dark ? "divide-background/10" : "divide-border"}`}>
          {ADDONS.map((a) => (
            <li key={a.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div>
                <p className={`text-sm font-medium ${text}`}>{a.name}</p>
                <p className={`text-xs ${sub}`}>{a.time}</p>
              </div>
              <span className={`font-heading text-base font-bold ${text} tabular-nums`}>{money(a.price)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-2xl border ${border} ${card} p-5 sm:p-6`}>
        <h3 className={`font-heading text-base font-bold ${text}`}>Pet hair removal</h3>
        <p className={`mt-1 text-sm ${sub}`}>Priced by how much there is. We'll confirm the tier on arrival.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {PET_HAIR_TIERS.map((t) => (
            <li key={t.label} className={`rounded-xl border ${border} p-4`}>
              <span className={`font-heading text-xl font-semibold ${text}`}>{money(t.price)}</span>
              <p className={`mt-1 text-xs ${sub}`}>{t.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddOnList;
