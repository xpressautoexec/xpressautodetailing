import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";

const names = ["Sarah", "Mike", "Jordan", "Priya", "Dave", "Amanda", "Chris", "Natalie", "Brandon", "Jessica", "Omar", "Ashley", "Tyler", "Kayla", "Marcus"];
const services = ["Interior Detail", "Complete Detail", "Exterior Detail", "Ceramic Coating", "Paint Correction", "Deep Clean + Shield"];
const locations = ["Calgary SW", "Airdrie", "Calgary NW", "Cochrane", "Chestermere", "Calgary SE"];
const times = ["2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago", "15 minutes ago", "Just now"];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState({ name: "", service: "", location: "", time: "" });

  useEffect(() => {
    const show = () => {
      setNotification({
        name: names[Math.floor(Math.random() * names.length)],
        service: services[Math.floor(Math.random() * services.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: times[Math.floor(Math.random() * times.length)],
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    };

    // First show after 15s, then every 25-45s
    const firstTimer = setTimeout(show, 15000);
    const interval = setInterval(show, 25000 + Math.random() * 20000);
    return () => { clearTimeout(firstTimer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-24 lg:bottom-6 left-4 z-[60] max-w-[320px]"
        >
          <div className="bg-card border border-border rounded-xl shadow-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-foreground text-sm font-semibold leading-tight">
                {notification.name} just booked
              </p>
              <p className="text-primary text-xs font-heading font-bold uppercase tracking-wider mt-0.5">
                {notification.service}
              </p>
              <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {notification.location} · {notification.time}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;
