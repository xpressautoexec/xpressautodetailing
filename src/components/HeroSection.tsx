import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import ConcernFinder from "@/components/ConcernFinder";
import { useHydrated } from "@/hooks/use-hydrated";
import { BOOKING_URL, PHONE, FIVE_STAR_REVIEWS } from "@/data/pricing";

const STATS = [
  { value: "2,000+", label: "Vehicles detailed" },
  { value: FIVE_STAR_REVIEWS, label: "Five-star Google reviews" },
  { value: "6", label: "Communities served" },
];

const HeroSection = () => {
  const hydrated = useHydrated();
  const anim = (initial: Record<string, number>, transition: Record<string, unknown>) =>
    hydrated ? { initial, animate: { opacity: 1, y: 0 }, transition } : {};

  return (
    <section id="home" className="relative overflow-hidden bg-brand-dark">
      <img
        src="/hero-audi-rs5.webp"
        alt="Detailer applying ceramic coating to a black Audi RS5 at a Calgary customer's driveway"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        width={682}
        height={678}
        fetchPriority="high"
        decoding="sync"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/90 to-brand-dark" />

      <div className="container relative z-10 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...anim({ opacity: 0, y: 12 }, { duration: 0.5 })}
            className="font-heading text-[11px] font-black uppercase tracking-[0.22em] text-primary sm:text-xs"
          >
            Calgary's most reviewed mobile detailer
          </motion.p>

          <motion.h1
            {...anim({ opacity: 0, y: 24 }, { duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] })}
            className="mt-4 font-heading text-3xl font-black uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            Mobile car &amp; RV detailing
            <br className="hidden sm:block" />{" "}
            <span className="text-primary">that comes to you</span>
          </motion.h1>

          <motion.p
            {...anim({ opacity: 0, y: 16 }, { duration: 0.5, delay: 0.15 })}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-lg"
          >
            Cars, trucks, RVs and boats detailed where they sit. Our vans carry their own water and power,
            so there's nothing to drop off and nothing to wait for.
          </motion.p>

          <motion.div
            {...anim({ opacity: 0, y: 16 }, { duration: 0.5, delay: 0.25 })}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a mobile detailing appointment online"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary px-8 font-heading text-sm font-black uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Book my detail
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              aria-label={`Call Xpress Auto Detailing at ${PHONE}`}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 font-heading text-sm font-black uppercase tracking-wider text-white transition-colors hover:border-white/60 hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
          </motion.div>

          <motion.dl
            {...anim({ opacity: 0, y: 16 }, { duration: 0.5, delay: 0.35 })}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-heading text-xl font-black text-white sm:text-3xl">{stat.value}</dt>
                <dd className="mt-1 text-[11px] leading-tight text-white/55 sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>

          <div className="mx-auto mt-10 w-full">
            <ConcernFinder />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
