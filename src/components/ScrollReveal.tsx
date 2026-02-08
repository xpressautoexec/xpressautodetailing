import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: Direction, duration: number): Variants => {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = offsets[direction];

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) => (
  <motion.div
    variants={getVariants(direction, duration)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;

/* Stagger wrapper for grids / lists */
export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    transition={{ staggerChildren: staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) => (
  <motion.div variants={getVariants(direction, 0.5)} className={className}>
    {children}
  </motion.div>
);
