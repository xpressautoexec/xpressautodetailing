import ScrollReveal from "@/components/ScrollReveal";

interface RecentWorkImage {
  src: string;
  alt: string;
}

interface RecentWorkStripProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  images: RecentWorkImage[];
}

const RecentWorkStrip = ({ eyebrow = "Recent Work", title, highlight, description, images }: RecentWorkStripProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-primary font-heading font-bold uppercase tracking-[0.2em] text-xs text-center mb-3">
            {eyebrow}
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl uppercase text-foreground text-center mb-4">
            {title} {highlight && <span className="text-primary">{highlight}</span>}
          </h2>
          {description && (
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
              {description}
            </p>
          )}
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg group aspect-square border border-border shadow-sm">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWorkStrip;
