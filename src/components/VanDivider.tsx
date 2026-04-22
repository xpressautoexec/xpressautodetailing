import { motion } from "framer-motion";
import { MapPin, Clock, Sparkles } from "lucide-react";
import vanImage from "@/assets/xpress-van.png";

interface VanDividerProps {
  direction?: "left" | "right";
  duration?: number;
  distance?: number;
}

const VanDivider = ({
  direction = "left",
  duration = 1.2,
  distance = 400,
}: VanDividerProps) => {
  const fromX = direction === "left" ? -distance : distance;

  return (
    <section
      className="relative w-full overflow-hidden bg-foreground py-16 sm:py-20 md:py-24"
      aria-label="We come to you"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),transparent_70%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary font-heading font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            On The Way
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-background leading-tight">
            We Come To <span className="text-primary">You</span>
          </h2>
          <p className="text-background/60 text-sm sm:text-base mt-3 max-w-md mx-auto">
            Calgary's fully equipped mobile detailing unit — at your driveway in 24 hours.
          </p>
        </motion.div>

        {/* Van + road */}
        <div className="relative">
          {/* Glow under van */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[70%] h-12 bg-primary/30 blur-3xl rounded-full" />

          {/* Animated road */}
          <div className="absolute left-0 right-0 bottom-4 sm:bottom-6 h-[3px] flex items-center overflow-hidden">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -60 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              className="w-[200%] h-full bg-[repeating-linear-gradient(90deg,hsl(var(--primary))_0_30px,transparent_30px_60px)] opacity-50"
            />
          </div>

          {/* Van */}
          <motion.img
            src={vanImage}
            alt="Xpress Auto Detailing mobile service van"
            initial={{ opacity: 0, x: fromX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-[280px] sm:w-[420px] md:w-[540px] lg:w-[620px] mx-auto block drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] mix-blend-screen ${
              direction === "right" ? "scale-x-[-1]" : ""
            }`}
            style={{ filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.6))" }}
            loading="lazy"
          />
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
        >
          {[
            { icon: MapPin, label: "Calgary & Area" },
            { icon: Clock, label: "24hr Booking" },
            { icon: Sparkles, label: "Pro Equipment" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-background/70"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span className="font-heading font-semibold uppercase tracking-wider text-[10px] sm:text-xs text-center">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VanDivider;
