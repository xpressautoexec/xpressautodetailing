import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquareText, Phone } from "lucide-react";
import QuoteLink, { SMS_HREF, TEL_HREF } from "@/components/site/QuoteLink";

/**
 * The one mobile call-to-action: pinned to the bottom of every page on phones.
 * [Get a quote] [Call] [text icon]. It steps out of the way while a quote form is on screen.
 */
const MobileQuoteBar = ({ quoteLabel }: { quoteLabel?: string }) => {
  const { pathname } = useLocation();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setFormVisible(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    const watched = new Set<Element>();
    const watch = () =>
      document.querySelectorAll("[data-quote-form]").forEach((el) => {
        if (!watched.has(el)) {
          watched.add(el);
          io.observe(el);
        }
      });
    watch();
    // Forms in lazy sections (and the success state that replaces them) mount later.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      setFormVisible(false);
    };
  }, [pathname]);

  const pill = "flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-bold uppercase tracking-[0.04em] transition-colors";

  return (
    <div
      role="region"
      aria-label="Quick contact"
      aria-hidden={formVisible || undefined}
      className={`contact-bar fixed inset-x-0 bottom-0 z-40 px-3 pt-3 transition-transform duration-200 lg:hidden pb-[calc(0.75rem+env(safe-area-inset-bottom))] ${
        formVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-2">
        <QuoteLink className={`${pill} bg-primary-foreground text-action hover:bg-primary-foreground/90`}>{quoteLabel}</QuoteLink>
        <a
          href={TEL_HREF}
          tabIndex={formVisible ? -1 : undefined}
          className={`${pill} border-2 border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/10`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a
          href={SMS_HREF}
          tabIndex={formVisible ? -1 : undefined}
          aria-label="Text us photos"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary-foreground/50 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
        >
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default MobileQuoteBar;
