import { useState, useEffect } from "react";
import { X, CalendarDays, ArrowRight, Phone, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "xpress_home_promo_dismissed";
const DISMISS_DAYS = 3;
const BOOKING_URL = "https://xpressauto.fieldd.co/";

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
            {/* Urgency bar */}
            <div className="bg-urgency text-urgency-foreground py-2 px-4 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urgency-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-urgency-foreground"></span>
              </span>
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest">
                Only 3 spots left this week
              </span>
            </div>

            <div className="bg-card p-6 sm:p-8 text-center">
              <button
                onClick={dismiss}
                className="absolute top-10 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close promotional popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <CalendarDays className="w-7 h-7 text-primary" />
              </div>

              <p className="text-primary font-heading font-bold uppercase tracking-widest text-xs mb-2">
                Spring / Summer Rush
              </p>

              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-foreground leading-tight mb-2">
                Don't Get Left<br />
                <span className="text-primary">Waiting</span>
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                Every year we're fully booked by mid-June. Secure your spot now — takes just 60 seconds.
              </p>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-muted-foreground text-xs ml-1.5">4.9/5 · 100+ reviews</span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book your detailing appointment online"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 group"
                >
                  <Clock className="w-4 h-4" />
                  Book Now — 60 Seconds
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:5875004523"
                  aria-label="Call to book"
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded-xl text-xs hover:bg-muted transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Or Call (587) 500-4523
                </a>
              </div>

              <p className="text-muted-foreground text-[10px] mt-4 uppercase tracking-wider">
                satisfaction guarantee · Free cancellation
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePromoPopup;
