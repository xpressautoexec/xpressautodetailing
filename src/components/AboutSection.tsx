import aboutImage from "@/assets/about-image.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import vanImage from "@/assets/xpress-van.png";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-2 sm:px-0">
          <ScrollReveal direction="left">
            <p className="text-primary font-heading font-bold text-sm uppercase tracking-[0.2em] mb-2 text-center md:text-left">
              About Us
            </p>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-6 text-center md:text-left">
              High-Quality Car Detailing in{" "}
              <span className="text-gradient">Calgary</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-center md:text-left text-sm sm:text-base">
              At Xpress Auto Detailing, we're dedicated to providing high-quality, hassle-free car detailing that saves you time, effort, and money. Our experienced team delivers expert mobile detailing services right to your doorstep.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-center md:text-left text-sm sm:text-base">
              We stand behind our work with a <strong className="text-foreground">100% satisfaction guarantee — or your money back</strong> — because your trust matters.
            </p>
            <div className="text-center md:text-left">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg text-sm hover:bg-brand-blue-deep transition-all shadow-md hover:shadow-lg hover:shadow-primary/20"
              >
                Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Xpress Auto Detailing mobile service van"
                className="rounded-xl shadow-xl w-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-xl hidden md:block opacity-80" />
              <img
                src={gallery3}
                alt="Clean car interior"
                className="absolute -bottom-8 -right-4 w-40 h-28 rounded-xl shadow-xl object-cover hidden md:block border-4 border-background"
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
