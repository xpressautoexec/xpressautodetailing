import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const arrow =
  "flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-line";

/**
 * Horizontal rail: swipe on touch, arrows + progress on desktop, snaps to each item.
 * `itemClass` sets item widths per breakpoint.
 */
const ScrollRail = ({
  label,
  children,
  itemClass = "w-[82%] sm:w-[46%] lg:w-[31.5%]",
  meta,
  rows = 1,
}: {
  /** Accessible name for the scroll region. */
  label: string;
  children: ReactNode;
  itemClass?: string;
  /** Left side of the control bar, e.g. "16 jobs". */
  meta?: ReactNode;
  /** 2 = two-row photo wall that scrolls sideways. */
  rows?: 1 | 2;
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: false, progress: 0 });
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      start: el.scrollLeft < 8,
      end: el.scrollLeft > max - 8,
      progress: max > 0 ? el.scrollLeft / max : 1,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, count]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const showControls = !(state.start && state.end);

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className={`no-scrollbar -mx-[var(--shell-pad)] snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--shell-pad)] px-[var(--shell-pad)] outline-none sm:gap-4 ${
          rows === 2 ? "grid grid-flow-col grid-rows-2" : "flex"
        }`}
      >
        {Children.map(children, (child) => (
          <li className={`shrink-0 snap-start ${itemClass}`}>{child}</li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-5">
        {meta && <div className="shrink-0 text-sm text-muted-ink">{meta}</div>}
        <div className="relative h-px flex-1 bg-line" aria-hidden="true">
          {showControls && (
            <span
              className="absolute inset-y-[-1px] left-0 h-[3px] bg-electric transition-[width] duration-150"
              style={{ width: `${Math.max(8, state.progress * 100)}%` }}
            />
          )}
        </div>
        {showControls && (
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button type="button" onClick={() => page(-1)} disabled={state.start} className={arrow} aria-label="Scroll back">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => page(1)} disabled={state.end} className={arrow} aria-label="Scroll forward">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollRail;
