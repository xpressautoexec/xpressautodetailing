import { Phone } from "lucide-react";
import ConcernFinder from "@/components/ConcernFinder";
import heroImg from "@/assets/jobs/hero-home.webp";
import { BOOKING_URL, PHONE } from "@/data/pricing";

/** Home hero: real job photo, left-aligned copy, package finder on the right. */
const HeroSection = () => (
  <section id="home" className="relative isolate overflow-hidden bg-brand-dark">
    <img
      src={heroImg}
      alt="Blue BMW M340i in the shop after paint correction and ceramic coating"
      width={1536}
      height={864}
      {...{ fetchpriority: "high" }}
      className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/55 to-brand-dark/10"
    />
    <div className="shell grid items-center gap-12 pb-32 pt-16 sm:pb-40 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-44 lg:pt-28">
      <div className="max-w-[38rem]">
        <h1 className="font-heading text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
          Mobile detailing for cars, RVs and fleets across Calgary.
        </h1>
        <p className="mt-6 max-w-[33rem] text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
          Our vans carry their own water and power, so we work in your driveway, storage lot or job site. Nothing to
          drop off, nothing to wait for.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-electric px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2"
          >
            Book a detail
          </a>
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-7 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/70"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE}
          </a>
        </div>
      </div>
      <ConcernFinder />
    </div>
  </section>
);

export default HeroSection;
