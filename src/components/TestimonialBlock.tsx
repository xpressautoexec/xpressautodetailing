import { Star } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  service?: string;
}

const TestimonialBlock = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <section className="py-16 bg-background">
    <div className="container max-w-5xl">
      <ScrollReveal>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase text-foreground text-center mb-12">
          What Our Clients Say
        </h2>
      </ScrollReveal>
      <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.12}>
        {testimonials.map((t, i) => (
          <StaggerItem key={i}>
            <div className="p-6 rounded-lg border border-border bg-muted/30 h-full">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground italic leading-relaxed mb-4">"{t.quote}"</p>
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
