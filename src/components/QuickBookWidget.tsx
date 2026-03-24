import { useState } from "react";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const services = [
  { label: "Interior Detail", price: "$129+", time: "~2 hrs" },
  { label: "Exterior Detail", price: "$99+", time: "~1.5 hrs" },
  { label: "Complete Detail", price: "$209+", time: "~3 hrs" },
  { label: "Ceramic Coating", price: "$499+", time: "~4 hrs" },
];

const QuickBookWidget = () => {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 max-w-xl"
    >
      <p className="text-white/90 font-heading font-bold text-xs uppercase tracking-wider mb-3">
        Quick Book — Pick Your Service
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {services.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSelected(i)}
            className={`relative text-left p-3 rounded-xl border transition-all duration-200 ${
              selected === i
                ? "bg-primary/20 border-primary text-white"
                : "bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10"
            }`}
          >
            {selected === i && (
              <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-primary" />
            )}
            <span className="block font-heading font-bold text-xs sm:text-sm">{s.label}</span>
            <span className="block text-primary font-bold text-sm sm:text-base mt-0.5">{s.price}</span>
            <span className="block text-white/50 text-[10px] mt-0.5">{s.time}</span>
          </button>
        ))}
      </div>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:scale-[1.02]"
      >
        <Zap className="w-4 h-4" />
        Book {services[selected].label} Now
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
      <p className="text-white/40 text-[10px] text-center mt-2">
        Free cancellation · No payment until service · 14-day guarantee
      </p>
    </motion.div>
  );
};

export default QuickBookWidget;
