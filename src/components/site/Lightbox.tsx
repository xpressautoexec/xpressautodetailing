import { useCallback, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: string; alt: string; caption?: string; detail?: string };

/**
 * Full-screen viewer. Arrow keys, swipe, Esc to close, thumbnail strip on desktop.
 * Controlled: pass `index` (null = closed) and `onIndex`.
 */
const Lightbox = ({
  items,
  index,
  onIndex,
  label = "Photo viewer",
}: {
  items: LightboxItem[];
  index: number | null;
  onIndex: (i: number | null) => void;
  label?: string;
}) => {
  const open = index !== null && items.length > 0;
  const i = open ? Math.min(Math.max(index!, 0), items.length - 1) : 0;
  const item = items[i];
  const touch = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (d: 1 | -1) => {
      if (index === null || !items.length) return;
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [i]);

  // Preload neighbours so arrowing feels instant.
  useEffect(() => {
    if (!open) return;
    [1, -1].forEach((d) => {
      const n = items[(i + d + items.length) % items.length];
      if (n) new Image().src = n.src;
    });
  }, [open, i, items]);

  const nav =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-primary-foreground/20 bg-charcoal/60 text-primary-foreground transition-colors hover:border-primary-foreground/60 sm:flex";

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndex(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] data-[state=open]:animate-in data-[state=open]:fade-in-0" style={{ background: "hsl(216 14% 7% / 0.97)" }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[61] flex flex-col text-primary-foreground outline-none"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <p className="num text-sm tracking-label text-primary-foreground/60">
              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <Dialog.Close
              className="flex h-11 w-11 items-center justify-center rounded-md border border-primary-foreground/20 transition-colors hover:border-primary-foreground/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
            {item && <img key={item.src} src={item.src} alt={item.alt} className="max-h-full max-w-full animate-in fade-in-0 object-contain duration-200" />}
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} className={`${nav} left-4`} aria-label="Previous photo">
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} className={`${nav} right-4`} aria-label="Next photo">
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
            <div className="mx-auto max-w-5xl">
              {item?.caption && <p className="font-heading text-xl font-bold leading-tight sm:text-2xl">{item.caption}</p>}
              <p className="mt-1 text-sm text-primary-foreground/60">{item?.detail ?? item?.alt}</p>
            </div>
            {items.length > 1 && (
              <div ref={strip} className="no-scrollbar mx-auto mt-4 hidden max-w-5xl gap-2 overflow-x-auto sm:flex">
                {items.map((t, n) => (
                  <button
                    key={t.src + n}
                    data-i={n}
                    type="button"
                    onClick={() => onIndex(n)}
                    aria-label={`Show photo ${n + 1}`}
                    aria-current={n === i || undefined}
                    className={`h-14 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition-opacity ${
                      n === i ? "border-electric opacity-100" : "border-transparent opacity-45 hover:opacity-80"
                    }`}
                  >
                    <img src={t.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Lightbox;
