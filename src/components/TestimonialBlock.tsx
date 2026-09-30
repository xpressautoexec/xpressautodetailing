import { Star, Quote } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  service?: string;
}

const TestimonialBlock = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section className="py-16 bg-muted/30">
    <div className="container max-w-5xl">
      <ScrollReveal>
        <h2 className="font-heading font-semibold text-2xl md:text-3xl text-foreground text-center mb-10">
          What Our Clients Say
        </h2>
      </ScrollReveal>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 px-2 sm:px-0" staggerDelay={0.12}>
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <div className="p-6 rounded-xl border border-border bg-card h-full relative">
              <Quote className="w-8 h-8 text-primary/15 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed mb-4 text-sm">"{t.quote}"</p>
              <div>
                <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.location}{t.service ? ` • ${t.service}` : ""}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default TestimonialBlock;
