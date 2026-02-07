import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-foreground mb-6">
              High-Quality Car Detailing in{" "}
              <span className="text-primary">Calgary</span> and Surrounding Areas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Xpress Auto Detailing, we're dedicated to providing high-quality, hassle-free car detailing that saves you time, effort, and money. Our experienced team delivers expert mobile detailing services right to your doorstep, making it easy to keep your vehicle in pristine condition without any extra work on your part.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We stand behind our work with a 100% satisfaction guarantee—or your money back—because your trust matters. Count on us for dependable service, unmatched convenience, and the confidence that your car is being cared for by professionals.
            </p>
          </div>
          <div className="relative">
            <img
              src={aboutImage}
              alt="Xpress Auto Detailing mobile service van"
              className="rounded-lg shadow-2xl w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary rounded-lg hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
