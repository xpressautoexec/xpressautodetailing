import { useId, useState } from "react";

/** Drag slider: before on the left, after on the right. Keyboard and touch friendly (native range). */
const BeforeAfter = ({
  before,
  after,
  alt,
  className = "aspect-[4/3]",
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
}) => {
  const id = useId();
  const [pos, setPos] = useState(50);
  return (
    <div className={`relative select-none overflow-hidden bg-tint ${className}`}>
      <img src={after} alt={`After: ${alt}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={`Before: ${alt}`}
        loading="lazy"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-surface" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-[11px] font-bold text-ink">
          ‹›
        </span>
      </span>
      <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-charcoal/80 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-electric px-2 py-0.5 text-[11px] font-semibold uppercase tracking-label text-primary-foreground">
        After
      </span>
      <label htmlFor={id} className="sr-only">
        Drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
};

export default BeforeAfter;
