import ServicePageHero from "@/components/ServicePageHero";
import heroImg from "@/assets/jobs/hero-home.webp";

/** Home hero: real job photo, left-aligned copy, one quote action. The package finder sits just below. */
const HeroSection = () => (
  <div id="home">
    <ServicePageHero
      title="Mobile detailing for cars, RVs and fleets across Calgary."
      subtitle="Our vans carry their own water and power, so we work in your driveway, storage lot or job site. Nothing to drop off, nothing to wait for."
      image={heroImg}
      imageAlt="Black Audi A4 in a Calgary driveway after a complete detail"
      width={1536}
      height={864}
      bookLabel="Book a detail online"
    />
  </div>
);

export default HeroSection;
