import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Phone } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const StickyBookingBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="fixed top-0 left-0 right-0 z-[55] hidden lg:block"
        >
          <div className="bg-foreground/95 backdrop-blur-md border-b border-border/20 py-2.5">
            <div className="container flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
                </span>
                <span className="text-background/90 text-sm font-medium">
                  <span className="text-urgency font-bold">Only 3 spots left this week</span>
                  {" "}— Book your mobile detail now before we're fully booked
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:5875004523"
                  className="flex items-center gap-1.5 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  587-500-4523
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider text-xs px-5 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 group"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Book Now — 60 Sec
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBookingBar;
