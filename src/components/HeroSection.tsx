import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConcernFinder from "@/components/ConcernFinder";
import { BOOKING_URL, REVIEW_COUNT, REVIEW_SCORE } from "@/data/pricing";
import completeImg from "@/assets/gallery-range-rover-exterior.jpg";
import interiorImg from "@/assets/gallery-range-rover-interior.jpg";
import ceramicImg from "@/assets/gallery-21.jpg";
import truckImg from "@/assets/fleet-kls-truck.jpg";
import rvImg from "@/assets/rv-hero.jpg";

const work = [
  { src: completeImg, alt: "Detailed Range Rover exterior in Calgary" },
  { src: interiorImg, alt: "Freshly detailed Range Rover interior" },
  { src: ceramicImg, alt: "Ceramic-coated vehicle after mobile detailing" },
  { src: truckImg, alt: "Work truck ready for on-site detailing" },
  { src: rvImg, alt: "RV detailing at a customer's property" },
];

const HeroSection = () => {
  return (
    <section id="home" className="overflow-hidden bg-home-ink text-home-paper">
      <div className="container px-5 pb-10 pt-10 text-center sm:pb-14 sm:pt-20 lg:pt-24">
        <p className="mb-5 text-xs font-bold uppercase text-primary">Calgary & surrounding communities · Mobile detailing</p>
        <h1 className="mx-auto max-w-4xl font-heading text-3xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
          Xpress Auto Detailing.<br /> <span className="text-home-paper/65">We come to you.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-home-paper/75 sm:text-lg">
          Cars, work trucks, RVs and fleets — detailed where you park. We bring our own water and power.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
          <Button asChild size="lg" className="w-full px-8 font-bold sm:w-auto"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book your detail <ArrowRight /></a></Button>
          <span className="flex items-center gap-2 text-sm text-home-paper/75"><Star className="h-4 w-4 fill-primary text-primary" /> {REVIEW_SCORE}/5 · {REVIEW_COUNT} Google reviews</span>
        </div>
        <ConcernFinder />
      </div>
      <div className="grid h-40 grid-cols-3 gap-1 px-1 pb-1 sm:h-52 sm:grid-cols-5 lg:h-60" aria-label="Recent detailing work">
        {work.map((item, i) => <img key={item.alt} src={item.src} alt={item.alt} loading={i < 3 ? "eager" : "lazy"} className={`h-full w-full object-cover ${i > 2 ? "hidden sm:block" : ""}`} />)}
      </div>
    </section>
  );
};

export default HeroSection;
