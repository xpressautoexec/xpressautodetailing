import aboutImage from "@/assets/about-image.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-2 sm:px-0">
          <ScrollReveal direction="left">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6 text-center md:text-left">
              High-Quality Car Detailing in{" "}
              <span className="text-primary">Calgary</span> and Surrounding Areas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-center md:text-left text-sm sm:text-base">
              At Xpress Auto Detailing, we're dedicated to providing high-quality, hassle-free car detailing that saves you time, effort, and money. Our experienced team delivers expert mobile detailing services right to your doorstep, making it easy to keep your vehicle in pristine condition without any extra work on your part.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-center md:text-left text-sm sm:text-base">
              We stand behind our work with a 100% satisfaction guarantee—or your money back—because your trust matters. Count on us for dependable service, unmatched convenience, and the confidence that your car is being cared for by professionals.
            </p>
            <div className="text-center md:text-left">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a mobile car detailing appointment in Calgary"
                className="inline-block bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3 rounded text-sm hover:bg-brand-blue-deep transition-colors"
              >
                Book Now
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Xpress Auto Detailing mobile service van"
                className="rounded-lg shadow-2xl w-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg hidden md:block" />
              <img
                src={gallery3}
                alt="Clean car interior"
                className="absolute -bottom-8 -right-4 w-40 h-28 rounded-lg shadow-xl object-cover hidden md:block border-4 border-background"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
