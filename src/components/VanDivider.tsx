import vanImage from "@/assets/xpress-van.png";
import { motion } from "framer-motion";

interface VanDividerProps {
  /** Which side the van sits on. Default 'right'. */
  align?: "left" | "right";
  /** Tailwind class for max width of the van image. Default 'max-w-[420px]'. */
  sizeClass?: string;
}

/**
 * Branded van that visually overlaps the seam between two sections —
 * mimics the reference where the van appears to drive across the divider.
 * Place this directly between two <section> elements.
 */
const VanDivider = ({ align = "right", sizeClass = "max-w-[420px] sm:max-w-[520px]" }: VanDividerProps) => {
  return (
    <div className="relative h-0 z-20 pointer-events-none" aria-hidden="true">
      <motion.img
        src={vanImage}
        alt=""
        initial={{ opacity: 0, x: align === "right" ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`absolute ${align === "right" ? "right-2 sm:right-8" : "left-2 sm:left-8"} -top-1/2 -translate-y-1/2 w-[60vw] ${sizeClass} drop-shadow-2xl`}
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default VanDivider;
