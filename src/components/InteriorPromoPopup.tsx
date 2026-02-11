import { useState, useEffect } from "react";
import { X, Clock, ArrowRight, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BOOKING_URL = "https://xpressauto.fieldd.co/";
const STORAGE_KEY = "xpress_interior_promo_dismissed";
const DISMISS_DAYS = 3;

const InteriorPromoPopup = () => {
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
            <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="bg-brand-dark p-6 sm:p-8 text-center">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
                <CalendarCheck className="w-7 h-7 text-primary" />
              </div>

              <p className="text-primary font-heading font-bold uppercase tracking-widest text-xs mb-2">
                This Week Is Almost Full
              </p>

              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-primary-foreground leading-tight mb-2">
                Only a Few<br />
                <span className="text-primary">Interior Spots Left</span>
              </h2>

              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                Our interior detailing schedule fills up fast — especially during winter when salt, grime, and odors are at their worst. Don't wait until we're fully booked.
              </p>

              <div className="flex items-center justify-center gap-2 text-primary-foreground/50 text-xs mb-5">
                <Clock className="w-3.5 h-3.5" />
                <span>Average wait time when full: <strong className="text-primary-foreground">2+ weeks</strong></span>
              </div>

              <div className="block">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book your interior detail now"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/30 mb-3"
                >
                  Grab a Spot Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-primary-foreground/40 text-xs">
                Mobile service · We come to you · 60-second booking
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InteriorPromoPopup;
