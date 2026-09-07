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
  { value: "interior", label: "Clean or restore my interior", to: "/detailing?tab=interior", result: "Interior Detailing packages" },
  { value: "complete", label: "Detail the entire vehicle", to: "/detailing?tab=complete", result: "Complete Detailing packages" },
  { value: "paint", label: "Improve or protect the paint", to: "/paint-correction", result: "Paint Correction and Protection options" },
  { value: "rv-marine", label: "Detail an RV, trailer or boat", to: "/trailer-rv", result: "RV, Trailer and Marine services" },
  { value: "fleet", label: "Care for work trucks or a fleet", to: "/corporate-fleet", result: "Commercial Fleet options" },
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
