import { useState } from "react";
import { ArrowRight, Zap, CheckCircle, Car, Truck, Bus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

type VehicleSize = "sedan" | "small_suv" | "large_suv";

const vehicleSizes: { id: VehicleSize; label: string; icon: typeof Car; desc: string }[] = [
  { id: "sedan", label: "Sedan / Coupe", icon: Car, desc: "Cars & small vehicles" },
  { id: "small_suv", label: "SUV / Pickup", icon: Truck, desc: "Mid-size SUVs & pickups" },
  { id: "large_suv", label: "3-Row SUV / Minivan", icon: Bus, desc: "Large SUVs & minivans" },
];

interface ServiceOption {
  label: string;
  base: Record<VehicleSize, string>;
  time: string;
  popular?: boolean;
}

const services: ServiceOption[] = [
  {
    label: "Upkeep",
    base: { sedan: "$149", small_suv: "$169", large_suv: "$179" },
    time: "45 min",
  },
  {
    label: "Inside & Out",
    base: { sedan: "$229", small_suv: "$279", large_suv: "$309" },
    time: "2.5–3 hrs",
  },
  {
    label: "Deep Clean & Seal",
    base: { sedan: "$379", small_suv: "$429", large_suv: "$459" },
    time: "3.5–4 hrs",
    popular: true,
  },
];

const QuickBookWidget = () => {
  const hydrated = useHydrated();
  const anim = (initial: Record<string, number>, transition?: Record<string, unknown>) =>
    hydrated ? { initial, animate: { opacity: 1, y: 0 }, transition } : {};
  const [vehicle, setVehicle] = useState<VehicleSize>("sedan");
  const [selectedService, setSelectedService] = useState(2); // default to Complete

  return (
    <motion.div
      {...anim({ opacity: 0, y: 20 }, { duration: 0.6, delay: 0.5 })}
      className="mt-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-xl"
    >
      {/* Step 1: Vehicle */}
      <p className="text-white/90 font-heading font-bold text-[10px] mb-2 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">1</span>
        Your Vehicle
      </p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {vehicleSizes.map((v) => (
          <button
            key={v.id}
            onClick={() => setVehicle(v.id)}
            className={`relative text-center p-2.5 rounded-xl border transition-all duration-200 ${
              vehicle === v.id
                ? "bg-primary/20 border-primary text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            <v.icon className={`w-5 h-5 mx-auto mb-1 ${vehicle === v.id ? "text-primary" : "text-white/50"}`} />
            <span className="block font-heading font-bold text-[10px] sm:text-xs leading-tight">{v.label}</span>
          </button>
        ))}
      </div>

      {/* Step 2: Service */}
      <p className="text-white/90 font-heading font-bold text-[10px] mb-2 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">2</span>
        Pick Your Service
      </p>
      <div className="space-y-2 mb-4">
        {services.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSelectedService(i)}
            className={`relative w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
              selectedService === i
                ? "bg-primary/20 border-primary text-white"
                : "bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              {selectedService === i && (
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              )}
              <div>
                <span className="flex items-center gap-2">
                  <span className="font-heading font-bold text-xs sm:text-sm">{s.label}</span>
                  {s.popular && (
                    <span className="bg-urgency text-urgency-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </span>
                <span className="block text-white/80 text-[10px] mt-0.5">{s.time}</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${s.label}-${vehicle}`}
                {...anim({ opacity: 0, y: -5 })}
                exit={{ opacity: 0, y: 5 }}
                className="text-primary font-bold text-sm sm:text-base"
              >
                {s.base[vehicle]}
              </motion.span>
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* CTA */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-heading font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:scale-[1.02]"
      >
        <Zap className="w-4 h-4" />
        Book Now — {services[selectedService].base[vehicle]}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
      <p className="text-white/80 text-[10px] text-center mt-2">
        Free cancellation · No payment until service · satisfaction guarantee
      </p>
    </motion.div>
  );
};

export default QuickBookWidget;
