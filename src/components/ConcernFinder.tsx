import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CarFront, Caravan, CheckCircle2, HelpCircle, Sailboat, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VehicleSizeId } from "@/data/pricing";

type FinderVehicleId = VehicleSizeId | "truck" | "rv" | "marine" | "fleet" | "other";

interface Concern {
  value: string;
  label: string;
  /** Where to send them. `{size}` is replaced with the chosen vehicle size. */
  to: string;
  result: string;
}

const VEHICLE_OPTIONS: { id: FinderVehicleId; label: string; icon: LucideIcon }[] = [
  { id: "sedan", label: "Sedan / Coupe", icon: CarFront },
  { id: "suv", label: "SUV / Pickup", icon: CarFront },
  { id: "minivan", label: "3-Row SUV / Minivan", icon: CarFront },
  { id: "truck", label: "Work Truck", icon: Truck },
  { id: "fleet", label: "Fleet / Multiple Vehicles", icon: Building2 },
  { id: "rv", label: "RV / Trailer", icon: Caravan },
  { id: "marine", label: "Boat / Pontoon", icon: Sailboat },
  { id: "other", label: "Other", icon: HelpCircle },
];

const FLEET: Concern = { value: "fleet", label: "Care for a fleet of vehicles", to: "/fleet#quote", result: "Commercial Fleet quote" };

const carConcerns = (size: VehicleSizeId | ""): Concern[] => {
  const q = size ? `&size=${size}` : "";
  return [
    { value: "interior", label: "Clean or restore my interior", to: `/detailing?tab=interior${q}`, result: "Interior Detailing packages" },
    { value: "complete", label: "Detail the entire vehicle", to: `/detailing?tab=complete${q}`, result: "Complete Detailing packages" },
    { value: "paint", label: "Correct or ceramic coat the paint", to: `/ceramic-paint-correction${size ? `?size=${size}` : ""}#packages`, result: "Paint Correction and Ceramic packages" },
    FLEET,
  ];
};

const CONCERNS: Record<FinderVehicleId, Concern[]> = {
  sedan: carConcerns("sedan"),
  suv: carConcerns("suv"),
  minivan: carConcerns("minivan"),
  truck: [
    { value: "interior", label: "Clean out the cab", to: "/detailing#work-truck", result: "Work Truck Package" },
    { value: "complete", label: "Detail the whole truck", to: "/detailing#work-truck", result: "Work Truck Package" },
    { value: "paint", label: "Correct or ceramic coat the paint", to: "/ceramic-paint-correction?size=suv#packages", result: "Paint Correction and Ceramic packages" },
    FLEET,
  ],
  fleet: [
    { value: "trucks", label: "Work trucks and vans", to: "/fleet#quote", result: "Commercial Fleet quote" },
    { value: "dealer", label: "Dealership lot or inventory", to: "/fleet#quote", result: "Commercial Fleet quote" },
    { value: "equipment", label: "Heavy equipment", to: "/fleet#quote", result: "Commercial Fleet quote" },
    { value: "rv-rental", label: "RV rental fleet", to: "/rv-trailer/rental-fleet", result: "RV Rental Fleet program" },
  ],
  rv: [
    { value: "wash", label: "Wash and protect the exterior", to: "/rv-trailer#packages", result: "RV packages, priced by the foot" },
    { value: "oxidation", label: "Remove oxidation and restore shine", to: "/rv-trailer#packages", result: "RV packages, priced by the foot" },
    { value: "interior", label: "Clean the interior", to: "/rv-trailer#packages", result: "RV packages, priced by the foot" },
    { value: "ppf", label: "Protect it with paint protection film", to: "/rv-trailer/ppf", result: "RV and windshield PPF" },
    { value: "rental", label: "Care for an RV rental fleet", to: "/rv-trailer/rental-fleet", result: "RV Rental Fleet program" },
  ],
  marine: [
    { value: "wash", label: "Wash, wax or polish my boat", to: "/marine#pricing", result: "Marine pricing, per foot" },
    { value: "pontoon", label: "Restore pontoon tubes", to: "/marine#pricing", result: "Marine pricing, per foot" },
    { value: "ceramic", label: "Ceramic coat the gelcoat", to: "/marine#pricing", result: "Marine pricing, per foot" },
  ],
  other: carConcerns(""),
};

const ConcernFinder = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [vehicle, setVehicle] = useState<FinderVehicleId>("sedan");
  const concerns = CONCERNS[vehicle];
  const selected = concerns.find((c) => c.value === value);
  const VehicleIcon = VEHICLE_OPTIONS.find((v) => v.id === vehicle)?.icon ?? CarFront;

  const changeVehicle = (next: FinderVehicleId) => {
    setVehicle(next);
    // Keep the need if the new vehicle offers it, otherwise make them pick again.
    if (!CONCERNS[next].some((c) => c.value === value)) setValue("");
  };

  const showPackages = () => {
    if (selected) navigate(selected.to);
  };

  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-surface text-left shadow-[0_24px_60px_-20px_hsl(var(--brand-dark)/0.6)]">
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-heading text-xl font-semibold tracking-tight text-ink">
              Find the right package
            </p>
            <p className="mt-1 text-sm text-muted-ink">
              Tell us what you drive and what it needs.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="block min-w-0 text-left" htmlFor="concern-vehicle">
            <span className="mb-1.5 block text-sm font-medium text-ink-2">Your vehicle</span>
            <span className="relative block">
              <VehicleIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <select
                id="concern-vehicle"
                value={vehicle}
                onChange={(event) => changeVehicle(event.target.value as FinderVehicleId)}
                className="h-12 w-full appearance-none rounded-md border border-border bg-card pl-10 pr-8 text-sm font-semibold text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {VEHICLE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </span>
          </label>

          <label className="block text-left" htmlFor="concern">
            <span className="mb-1.5 block text-sm font-medium text-ink-2">What it needs most</span>
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
            className="mt-1 h-12 rounded-md bg-electric px-5 text-sm font-semibold hover:bg-electric-2"
          >
            Show my package
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-left text-xs text-muted-ink">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
          <span>{selected ? `Recommended: ${selected.result}` : "No commitment — see the right options and exact pricing."}</span>
        </div>
      </div>
    </div>
  );
};

export default ConcernFinder;
