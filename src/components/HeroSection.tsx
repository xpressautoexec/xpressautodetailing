import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt="Professional car detailing service"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />

      <div className="container relative z-10 px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-urgency/90 text-urgency-foreground font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
          >
            <Clock className="w-3.5 h-3.5" />
            Limited Spots This Week — Book Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-primary-foreground mb-3"
          >
            The Car Wash That{" "}
            <span className="text-primary">Comes to You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-primary-foreground/80 text-base sm:text-lg mb-4 max-w-lg"
          >
            Calgary's top-rated mobile detailing — at your door in 24 hours. No drop-offs. No waiting. Just results.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mb-8 justify-center md:justify-start flex-wrap"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-primary-foreground/80 text-sm ml-1.5 font-medium">4.9/5</span>
            </div>
            <span className="text-primary-foreground/50 text-sm">•</span>
            <span className="text-primary-foreground/70 text-sm font-medium">100+ 5-Star Reviews</span>
            <span className="text-primary-foreground/50 text-sm">•</span>
            <span className="text-primary-foreground/70 text-sm font-medium">2,000+ Cars Detailed</span>
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
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-brand-blue-deep transition-all text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            >
              Book My Detail — Takes 60 Seconds
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:5875004523"
              aria-label="Call Xpress Auto Detailing at 587-500-4523"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:border-primary-foreground/60 transition-colors text-sm"
            >
              Call 587-500-4523
            </a>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mt-5 justify-center md:justify-start text-primary-foreground/50 text-xs"
          >
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 14-Day Guarantee</span>
            <span>•</span>
            <span>No Hidden Fees</span>
            <span>•</span>
            <span>Fully Insured</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
