import vanImage from "@/assets/xpress-van.png";
import { motion } from "framer-motion";

interface VanDividerProps {
  /** Background variant for the band behind the van. */
  variant?: "light" | "dark" | "primary";
  /** Optional headline shown next to the van. */
  headline?: string;
  /** Optional subline shown beneath the headline. */
  subline?: string;
}

/**
 * Branded van showcase band — a full-width section featuring the
 * Xpress van prominently with optional copy. Designed to break up
 * page sections with a high-impact branded moment.
 */
const VanDivider = ({
  variant = "dark",
  headline = "Our Van Comes to You",
  subline = "Calgary • Airdrie • Chestermere • Cochrane",
}: VanDividerProps) => {
  const bgClass =
    variant === "light"
      ? "bg-card"
      : variant === "primary"
      ? "bg-primary"
      : "bg-foreground";

  const headlineClass =
    variant === "light" ? "text-foreground" : "text-background";
  const sublineClass =
    variant === "light" ? "text-muted-foreground" : "text-background/60";

  return (
    <section className={`${bgClass} relative overflow-hidden py-10 sm:py-14`}>
      {/* subtle radial accent */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: variant === "light" ? "hsl(var(--foreground))" : "hsl(var(--background))",
        }}
      />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Copy */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className={`font-heading font-bold uppercase tracking-[0.2em] text-xs ${sublineClass} mb-3`}>
              Mobile Detailing Unit
            </p>
            <h2 className={`font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase leading-tight ${headlineClass} mb-3`}>
              {headline}
            </h2>
            <p className={`text-sm sm:text-base ${sublineClass}`}>
              {subline}
            </p>
          </div>

          {/* Van */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 md:order-2"
          >
            <img
              src={vanImage}
              alt="Xpress Auto Detailing branded mobile service van"
              className="w-full h-auto object-contain drop-shadow-2xl max-w-[560px] mx-auto"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VanDivider;
