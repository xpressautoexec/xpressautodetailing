import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareText } from "lucide-react";
import carImg from "@/assets/jobs/card-car-mercedes-c-class.webp";
import rvImg from "@/assets/jobs/hero-rv-trailer.webp";
import fleetImg from "@/assets/jobs/card-fleet-cat-excavator.webp";
import QuoteLink, { SMS_HREF } from "@/components/site/QuoteLink";
import Swoosh from "@/components/site/Swoosh";

const PATHS = [
  {
    label: "Car & Truck",
    href: "/detailing",
    img: carImg,
    alt: "White Mercedes-Benz C-Class after an exterior detail",
    pos: "center 55%",
  },
  {
    label: "RV & Trailer",
    href: "/rv-trailer",
    img: rvImg,
    alt: "Xpress crew washing a Class A diesel pusher on a Calgary driveway",
    pos: "center 60%",
  },
  {
    label: "Fleet & Dealership",
    href: "/fleet",
    img: fleetImg,
    alt: "CAT excavator on a Calgary job site after an on-site wash",
    pos: "center 45%",
  },
];

const VIDEO = { src: "/videos/xp-paint-correction.mp4", poster: "/videos/xp-paint-correction.jpg" };

/** Only mounts on large screens, after hydration, so phones never download the clip. */
const useDesktopVideo = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return show;
};

/** Homepage hero: the promise, three routes in, one quote action. */
const HomeHero = () => {
  const video = useDesktopVideo();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-surface">
      <div className="shell pb-24 pt-10 sm:pb-32 sm:pt-14 lg:pb-36 lg:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div>
            <h1 className="max-w-[15ch] font-heading text-[2.7rem] font-extrabold leading-[0.95] tracking-display text-ink sm:text-6xl lg:text-[5.25rem]">
              Detailing that comes to you — or a heated shop when it's -25.
            </h1>
            <p className="mt-6 max-w-[38rem] text-base leading-relaxed text-ink-2 sm:text-lg">
              Mobile vans with their own water and power across Calgary, plus our Airdrie shop for ceramic, PPF and
              paint correction.
            </p>
          </div>
          {video && (
            <video
              className="hidden aspect-[9/16] w-full rounded-card bg-tint object-cover lg:block"
              src={VIDEO.src}
              poster={VIDEO.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Paint correction on black paint with a 50/50 tape line"
            />
          )}
        </div>

        <nav aria-label="Choose your vehicle" className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className="group relative flex overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-ink sm:flex-col"
            >
              <img
                src={p.img}
                alt={p.alt}
                style={{ objectPosition: p.pos }}
                className="aspect-[4/3] w-32 shrink-0 object-cover sm:aspect-[16/10] sm:w-full"
              />
              <span className="flex flex-1 items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-5">
                <span className="font-heading text-2xl font-bold leading-none text-ink sm:text-[1.75rem]">{p.label}</span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-electric transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <QuoteLink className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-electric px-8 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-electric-2" />
          <a
            href={SMS_HREF}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-ink/20 bg-surface px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
          >
            <MessageSquareText className="h-4 w-4 text-electric" aria-hidden="true" />
            Text us photos
          </a>
        </div>
      </div>
      <Swoosh variant="hero-edge" />
    </section>
  );
};

export default HomeHero;
