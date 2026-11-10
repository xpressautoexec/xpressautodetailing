import { B2B_TESTIMONIALS, type B2BTestimonial } from "@/data/brand";

/** Client testimonial cards. Only entries with a real quote render; renders nothing otherwise. */
const B2BTestimonials = ({ items = B2B_TESTIMONIALS }: { items?: B2BTestimonial[] }) => {
  const ready = items.filter((t) => t.quote && t.name);
  if (!ready.length) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ready.map((t) => (
        <figure key={t.company} className="flex flex-col rounded-card border border-line bg-surface p-7">
          {t.logo ? (
            <img src={t.logo} alt={t.company} loading="lazy" className="h-8 w-auto self-start object-contain grayscale" />
          ) : (
            <p className="eyebrow">{t.company}</p>
          )}
          <blockquote className="mt-5 flex-1 font-heading text-2xl font-bold leading-snug text-ink">{t.quote}</blockquote>
          <figcaption className="mt-6 border-t border-line pt-4 text-sm">
            <span className="font-semibold text-ink">{t.name}</span>
            {t.title && <span className="text-muted-ink">, {t.title}</span>}
            <span className="block text-muted-ink">{t.company}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default B2BTestimonials;
