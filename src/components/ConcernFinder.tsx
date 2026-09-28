import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CarFront, CheckCircle2, Clock3, HelpCircle, Sailboat, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VEHICLE_SIZES, type VehicleSizeId } from "@/data/pricing";

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
  { value: "fleet", label: "Clean a work truck", to: "/detailing?tab=work-trucks", result: "Work truck packages" },
];

type FinderVehicleId = VehicleSizeId | "truck" | "rv" | "marine" | "other";

const VEHICLE_OPTIONS: { id: FinderVehicleId; label: string; icon: LucideIcon }[] = [
  { id: "sedan", label: "Sedan / Coupe", icon: CarFront },
  { id: "suv", label: "SUV / Pickup", icon: CarFront },
  { id: "truck", label: "Truck", icon: Truck },
  { id: "minivan", label: "3-Row SUV / Minivan", icon: CarFront },
  { id: "rv", label: "RV / Trailer", icon: Truck },
  { id: "marine", label: "Boat / Marine", icon: Sailboat },
  { id: "other", label: "Other", icon: HelpCircle },
];

const ConcernFinder = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [vehicle, setVehicle] = useState<FinderVehicleId>("sedan");
  const selected = concerns.find((c) => c.value === value);
  const VehicleIcon = VEHICLE_OPTIONS.find((v) => v.id === vehicle)?.icon ?? CarFront;

  const showPackages = () => {
    if (!selected) return;
    const separator = selected.to.includes("?") ? "&" : "?";
    navigate(`${selected.to}${separator}size=${vehicle}`);
  };

  return (
    <div className="mx-auto mt-4 max-w-4xl overflow-hidden rounded-md border border-home-paper/20 bg-background text-foreground shadow-xl sm:mt-9">
      <div className="h-1 bg-primary" />
      <div className="p-3 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-4 text-left">
          <div>
            <p className="font-heading text-sm font-black uppercase text-foreground sm:text-base">
              What does your car need?
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Tell us what you drive and what it needs.
            </p>
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase text-accent-foreground sm:inline-flex">
            <Clock3 className="h-3.5 w-3.5" />
            Takes 30 seconds
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1.2fr_1.2fr_auto] sm:items-end">
          <label className="block min-w-0 text-left" htmlFor="concern-vehicle">
            <span className="mb-1.5 block text-[10px] font-bold uppercase text-muted-foreground">Your vehicle</span>
            <span className="relative block">
              <VehicleIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <select
                id="concern-vehicle"
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value as FinderVehicleId)}
                className="h-12 w-full appearance-none rounded-md border border-border bg-card pl-10 pr-8 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {VEHICLE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </span>
          </label>

          <label className="block text-left" htmlFor="concern">
            <span className="mb-1.5 block text-[10px] font-bold uppercase text-muted-foreground">Main priority</span>
            <span className="relative block">
              <Sparkles className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <select
                id="concern"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="h-12 w-full appearance-none rounded-md border border-border bg-card pl-10 pr-8 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">What does it need?</option>
                {concerns.map((concern) => (
                  <option key={concern.value} value={concern.value}>{concern.label}</option>
                ))}
              </select>
            </span>
          </label>

          <Button
            type="button"
            size="lg"
            disabled={!selected}
            onClick={showPackages}
            className="group h-12 rounded-md px-5 font-heading text-xs font-black uppercase shadow-lg shadow-primary/20"
          >
            Find My Package
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-left text-[11px] text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
          <span>{selected ? `Recommended: ${selected.result}` : "No commitment — see the right options and exact pricing."}</span>
        </div>
      </div>
    </div>
  );
};

export default ConcernFinder;
