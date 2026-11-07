import { Layers, Scissors, UserCheck } from "lucide-react";
import { Section, SectionHeading, cardClass } from "@/components/site/Section";
import { FILM_BRAND, FILM_CUT_SYSTEM } from "@/data/copy";

/**
 * Shared "how we install film" band for the car, windshield and RV PPF pages.
 * Facts only: film brand, computer cutting, in-house installers.
 */
const PPFCraft = ({ film = FILM_BRAND, filmBody }: { film?: string; filmBody?: string }) => {
  const items = [
    {
      icon: Layers,
      title: film,
      body:
        filmBody ??
        `We install ${film}: a clear, self-healing urethane film that keeps the gloss of the paint underneath and is backed by the manufacturer's warranty.`,
    },
    {
      icon: Scissors,
      title: `Computer-cut on our plotter`,
      body: `Film is cut on our plotter from ${FILM_CUT_SYSTEM} patterns made for your exact year, make and model. That means clean, consistent edges and no knife work on your paint.`,
    },
    {
      icon: UserCheck,
      title: "Installed by our own crew",
      body: "Every install is done by Xpress installers, not subcontractors. The same crew prepares the surface, fits the film and checks the edges with you before we leave.",
    },
  ];

  return (
    <Section tone="surface">
      <SectionHeading
        title="How we install film"
        intro="The film only performs as well as the install. Here's what goes into ours."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className={`${cardClass} p-6`}>
            <Icon className="h-6 w-6 text-electric" aria-hidden />
            <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default PPFCraft;
