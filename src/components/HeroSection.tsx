import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Shield, Zap } from "lucide-react";
import heroBg from "@/assets/hero-audi-rs5.png";
import vanImage from "@/assets/xpress-van.png";
import QuickBookWidget from "@/components/QuickBookWidget";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt="Professional car detailing service"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />

      <div className="container relative z-10 px-6 sm:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-urgency text-urgency-foreground font-heading font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-urgency-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-urgency-foreground"></span>
            </span>
            Only 3 Spots Left This Week
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-tight text-white mb-2"
          >
            Calgary's Mobile Detailing{" "}
            <span className="text-primary">That Comes to You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/80 text-sm sm:text-base mb-3 max-w-lg"
          >
            Calgary's top-rated mobile detailing — at your door in 24 hours. No drop-offs. No waiting. Just results.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-5 justify-center md:justify-start flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-white/80 text-sm ml-1.5 font-medium">4.9/5</span>
            </div>
            <span className="text-white/50 text-sm">•</span>
            <span className="text-white/70 text-sm font-medium">100+ 5-Star Reviews</span>
            <span className="text-white/50 text-sm">•</span>
            <span className="text-white/70 text-sm font-medium">2,000+ Cars Detailed</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule a mobile car detailing appointment"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-primary/90 transition-all text-xs sm:text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" />
              Book My Detail — Takes 60 Seconds
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:5875004523"
              aria-label="Call Xpress Auto Detailing at 587-500-4523"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-heading font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:border-white/60 hover:bg-white/10 transition-all text-xs sm:text-sm"
            >
              Call 587-500-4523
            </a>
          </motion.div>

          {/* Quick Book Widget */}
          <QuickBookWidget />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
