import { CREW, type CrewMember } from "@/data/season";

const CrewCard = ({ m }: { m: CrewMember }) => (
  <figure className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
    {m.photo ? (
      <img src={m.photo} alt={`${m.name}, ${m.role} at Xpress`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
    ) : (
      <div aria-hidden="true" className="relative flex aspect-[4/5] w-full items-end overflow-hidden bg-charcoal p-5">
        <span className="absolute -right-3 -top-6 font-heading text-[11rem] font-extrabold italic leading-none text-primary-foreground/[0.06]">
          {m.name.charAt(0)}
        </span>
        <span className="font-heading text-6xl font-extrabold italic leading-none text-primary-foreground">{m.name.charAt(0)}</span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-electric" />
      </div>
    )}
    <figcaption className="flex flex-1 flex-col px-4 py-4">
      <p className="font-heading text-xl font-bold leading-none text-ink">{m.name}</p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-label text-electric">{m.role}</p>
      {m.fact && <p className="mt-2.5 text-sm leading-snug text-ink-2">{m.fact}</p>}
    </figcaption>
  </figure>
);

/** Crew grid: photo, first name, role, one-line fact. Reads CREW in data/season.ts. */
const CrewSection = ({ crew = CREW, extra }: { crew?: CrewMember[]; extra?: React.ReactNode }) => (
  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
    {crew.map((m) => (
      <li key={m.name}>
        <CrewCard m={m} />
      </li>
    ))}
    {extra && <li className="col-span-2 sm:col-span-1">{extra}</li>}
  </ul>
);

export default CrewSection;
