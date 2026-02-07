import { Star } from "lucide-react";

const ReviewsSection = () => {
  return (
    <section id="reviews" className="bg-primary py-20">
      <div className="container text-center">
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-primary-foreground mb-4">
          💫 100+ 5-Star Reviews
        </h2>
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-primary-foreground text-primary-foreground" />
          ))}
        </div>
        <div className="max-w-2xl mx-auto bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8">
          <p className="text-primary-foreground/90 italic leading-relaxed mb-6">
            "Absolutely blown away by this mobile detailing service! They came right to me — super convenient, on time, and fully prepared. The team was professional, friendly, and completely customer-focused. They did an incredible job on the interior of my car — it looks and feels brand new! If you're looking for high-quality, hassle-free interior detailing — this is the one. Highly recommend!"
          </p>
          <p className="font-heading font-bold text-primary-foreground uppercase tracking-wider">
            — Debb A.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
