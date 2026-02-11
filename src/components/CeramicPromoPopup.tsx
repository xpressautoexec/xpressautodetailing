import { useState, useEffect } from "react";
import { X, ShieldAlert, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BOOKING_URL = "https://xpressauto.fieldd.co/";
const STORAGE_KEY = "xpress_ceramic_promo_dismissed";
const DISMISS_DAYS = 3;

const CeramicPromoPopup = () => {
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
            <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

            <div className="bg-brand-dark p-6 sm:p-8 text-center">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 mb-4">
                <ShieldAlert className="w-7 h-7 text-amber-400" />
              </div>

              <p className="text-amber-400 font-heading font-bold uppercase tracking-widest text-xs mb-2">
                High Demand Alert
              </p>

              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground leading-tight mb-2">
                Ceramic Coating<br />
                <span className="text-primary">Bookings Are Surging</span>
              </h2>

              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                Spring is peak season for paint correction & ceramic coatings. Our certified installers are booking out weeks in advance. Secure your spot before the schedule locks up.
              </p>

              <div className="flex items-center justify-center gap-2 text-primary-foreground/50 text-xs mb-5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Coating appointments up <strong className="text-amber-400">3×</strong> vs. last month</span>
              </div>

              <div className="block">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book your ceramic coating now"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/30 mb-3"
                >
                  Reserve My Coating Spot
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-primary-foreground/40 text-xs">
                XPEL & Gtechniq certified · Multi-year protection
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CeramicPromoPopup;
