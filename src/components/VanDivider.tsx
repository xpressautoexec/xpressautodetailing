import { motion } from "framer-motion";
import vanImage from "@/assets/xpress-van.png";

interface VanDividerProps {
  direction?: "left" | "right";
  duration?: number;
  distance?: number;
}

const VanDivider = ({
  direction = "left",
  duration = 1.1,
  distance = 320,
}: VanDividerProps) => {
  const fromX = direction === "left" ? -distance : distance;

  return (
    <section
      className="relative w-full overflow-hidden py-12 sm:py-16"
      aria-hidden="true"
    >
      {/* Road / horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute left-0 right-0 bottom-[38%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Dashed road line */}
      <div className="absolute left-0 right-0 bottom-[34%] h-[2px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: -40 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          className="w-[200%] h-full bg-[repeating-linear-gradient(90deg,hsl(var(--primary))_0_20px,transparent_20px_40px)] opacity-30"
        />
      </div>

      <div className="relative container">
        <motion.img
          src={vanImage}
          alt=""
          initial={{ opacity: 0, x: fromX }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          className={`w-[260px] sm:w-[380px] md:w-[480px] lg:w-[560px] mx-auto block drop-shadow-[0_25px_25px_rgba(0,0,0,0.15)] ${
            direction === "right" ? "scale-x-[-1]" : ""
          }`}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default VanDivider;
