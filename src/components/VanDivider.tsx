import { motion } from "framer-motion";
import vanImage from "@/assets/xpress-van.png";

interface VanDividerProps {
  direction?: "left" | "right";
  duration?: number;
  distance?: number;
}

const VanDivider = ({
  direction = "left",
  duration = 0.9,
  distance = 220,
}: VanDividerProps) => {
  const fromX = direction === "left" ? -distance : distance;

  return (
    <div
      className="relative w-full overflow-hidden py-8 sm:py-12 pointer-events-none"
      aria-hidden="true"
    >
      <motion.img
        src={vanImage}
        alt=""
        initial={{ opacity: 0, x: fromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        className={`w-[220px] sm:w-[320px] md:w-[400px] lg:w-[460px] mx-auto block drop-shadow-2xl ${
          direction === "right" ? "scale-x-[-1]" : ""
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default VanDivider;
