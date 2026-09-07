import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

interface Concern {
  value: string;
  label: string;
  to: string;
  result: string;
}

const concerns: Concern[] = [
  { value: "interior", label: "My interior is dirty, stained or smells", to: "/detailing?tab=interior", result: "Interior Detailing packages" },
  { value: "complete", label: "I want the whole car cleaned inside & out", to: "/detailing?tab=complete", result: "Complete Detailing packages" },
  { value: "exterior", label: "The paint looks dull and dirty", to: "/detailing?tab=exterior", result: "Exterior Detailing packages" },
  { value: "correction", label: "There are swirls, scratches or oxidation", to: "/paint-correction", result: "Paint Correction packages" },
  { value: "ceramic", label: "I want long-term gloss & easier washing", to: "/ceramic-coating", result: "Ceramic Coating packages" },
  { value: "ppf", label: "I'm worried about rock chips on the highway", to: "/ppf", result: "Paint Protection Film packages" },
  { value: "tint", label: "Too much sun, heat or not enough privacy", to: "/window-tinting", result: "Window Tinting packages" },
  { value: "marine", label: "My boat or pontoon needs work", to: "/marine", result: "Marine & Pontoon packages" },
  { value: "rv", label: "My RV or trailer needs a detail", to: "/trailer-rv", result: "RV & Trailer packages" },
  { value: "fleet", label: "I have work trucks or a company fleet", to: "/corporate-fleet", result: "Corporate Fleet options" },
];

const ConcernFinder = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const selected = concerns.find((c) => c.value === value);

  return (
    <div className="mt-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-xl">
      <p className="text-white/90 font-heading font-bold text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-primary" />
        What's your main concern?
      </p>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <label className="sr-only" htmlFor="concern">Choose your main concern</label>
        <select
          id="concern"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-xl bg-white text-foreground text-sm px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select what's bothering you…</option>
          {concerns.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && navigate(selected.to)}
          className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Show Packages
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-white/70 text-[11px] mt-2.5">
        {selected ? `We'll take you to our ${selected.result}.` : "Answer one question and we'll point you to the right packages."}
      </p>
    </div>
  );
};

export default ConcernFinder;
