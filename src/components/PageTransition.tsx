import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const hydrated = useHydrated();

  // Server-rendered / first paint: plain markup so crawlers read real content.
  if (!hydrated) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
