import { useState, useEffect } from "react";
import { X, Users, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_NUMBER = "587-500-4523";
const STORAGE_KEY = "xpress_seasonal_promo_dismissed";
const DISMISS_DAYS = 3;

const SeasonalPromoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = new Date(dismissed).getTime();
      if (Date.now() - dismissedAt < DISMISS_DAYS * 86400000) return;
    }
    const timer = setTimeout(() => setOpen(true), 5000);
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
            <div className="h-1.5 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400" />

            <div className="bg-brand-dark p-6 sm:p-8 text-center">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                aria-label="Close seasonal promotion popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sky-500/20 mb-4">
                <Users className="w-7 h-7 text-sky-400" />
              </div>

              <p className="text-sky-400 font-heading font-bold uppercase tracking-widest text-xs mb-2">
                Group Discount
              </p>

              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground leading-tight mb-2">
                15% Off<br />
                <span className="text-primary">Second Vehicle</span>
              </h2>

              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
                Book with family or a friend at the same address and save 15% on the second vehicle. Same-day, same-location detail.
              </p>

              <div className="block">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`}
                  aria-label="Call to book your group discount"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/30 mb-3"
                >
                  <Phone className="w-4 h-4" />
                  Call to Book
                </a>
              </div>

              <p className="text-primary-foreground/40 text-xs">
                {PHONE_NUMBER} · Mention "FRIENDS15" when calling
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SeasonalPromoPopup;
