import { useState, useEffect } from "react";
import { X, CalendarDays, ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "xpress_home_promo_dismissed";
const DISMISS_DAYS = 3;

const HomePromoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = new Date(dismissed).getTime();
      if (Date.now() - dismissedAt < DISMISS_DAYS * 86400000) return;
    }
    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />

            <div className="bg-brand-dark p-6 sm:p-8 text-center">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                aria-label="Close promotional popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 mb-4">
                <CalendarDays className="w-7 h-7 text-amber-400" />
              </div>

              <p className="text-amber-400 font-heading font-bold uppercase tracking-widest text-xs mb-2">
                Spring / Summer Rush
              </p>

              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground leading-tight mb-2">
                Spots Are Filling<br />
                <span className="text-primary">Fast</span>
              </h2>

              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                Every year we're fully booked by mid-June. Don't wait until it's too late — call now to lock in your detail before the spring & summer rush.
              </p>

              <a
                href="tel:5875004523"
                aria-label="Call now to claim your detailing spot"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/30 mb-3"
              >
                <Phone className="w-4 h-4" />
                Claim Your Spot
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-primary-foreground/40 text-xs">
                (587) 500-4523 · Limited availability
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePromoPopup;
