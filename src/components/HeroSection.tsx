import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
const BOOKING_URL = "https://xpressauto.fieldd.co/";
const HeroSection = () => {
  return <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Video background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/60 to-brand-dark/40" />
      
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <svg viewBox="0 0 500 800" className="h-full w-full" preserveAspectRatio="none">
          <polygon points="200,0 500,0 500,800 200,800 350,400" fill="hsl(197 100% 50% / 0.15)" />
          <polygon points="250,0 500,0 500,800 250,800 400,400" fill="hsl(197 100% 50% / 0.08)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1]
        }} className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-primary-foreground mb-2">
            Premium Mobile <span className="text-primary">Detailing</span>
          </motion.h1>
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.25, 0.1, 0.25, 1]
        }} className="font-heading font-bold text-xl md:text-2xl lg:text-3xl uppercase text-primary-foreground/80 mb-6">
            Serving Calgary & Surrounding Areas
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="text-primary-foreground/80 text-lg mb-4 max-w-lg">The car wash that comes to you
Your Car Brand-New Again, Wherever You Are </motion.p>
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="text-primary font-heading font-bold text-sm uppercase tracking-wider mb-8">
            Limited availability — Book your spot today
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.45
        }} className="flex flex-wrap gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-blue-deep transition-colors text-sm">
              Schedule my detail  
            </a>
            <a href="tel:5875004523" className="inline-block border-2 border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-4 rounded hover:border-primary-foreground/60 transition-colors text-sm">
              Call Us
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <polygon points="0,80 1440,80 1440,0" fill="hsl(197 100% 50%)" />
        </svg>
      </div>
    </section>;
};
export default HeroSection;