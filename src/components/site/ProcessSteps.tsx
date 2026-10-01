/**
 * Numbered process steps, joined by a hairline. Only for content that really is a sequence.
 * Lays out in one row on desktop (up to 5 steps), stacked on mobile.
 */
const ProcessSteps = ({ steps, dark = false }: { steps: { title: string; body: string }[]; dark?: boolean }) => {
  const cols = steps.length >= 5 ? "md:grid-cols-5" : steps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const text = dark ? "text-primary-foreground" : "text-ink";
  const sub = dark ? "text-primary-foreground/65" : "text-ink-2";
  const ring = dark ? "border-primary-foreground" : "border-ink";
  const line = dark ? "bg-primary-foreground/15" : "bg-line";

  return (
    <ol className={`grid gap-y-10 gap-x-6 ${cols}`}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-heading text-sm font-semibold tabular-nums ${ring} ${text}`}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && <span aria-hidden="true" className={`hidden h-px flex-1 md:block ${line}`} />}
          </div>
          <h3 className={`mt-5 font-heading text-lg font-semibold ${text}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${sub}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
};

export default ProcessSteps;
