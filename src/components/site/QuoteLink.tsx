import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { PHONE } from "@/data/pricing";

/**
 * "Get a quote" is the one primary action on every page.
 *
 * It goes to the quote form on the current page when there is one (any element marked
 * `data-quote-form`, scrolled to via its section id), otherwise to /quote.
 */
export const QUOTE_FALLBACK = "/quote";
export const QUOTE_LABEL = "Get a quote";

const SMS_BODY = "Hi Xpress, here are photos of my vehicle for a quote:";
/** `?&body=` works on both iOS and Android messaging apps. */
export const SMS_HREF = `sms:+1${PHONE.replace(/\D/g, "")}?&body=${encodeURIComponent(SMS_BODY)}`;
export const TEL_HREF = `tel:+1${PHONE.replace(/\D/g, "")}`;

/** Finds the on-page quote form's anchor, waiting briefly for lazy sections to mount. */
export const useQuoteHref = () => {
  const { pathname } = useLocation();
  const [href, setHref] = useState(QUOTE_FALLBACK);

  useEffect(() => {
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const resolve = () => {
      const form = document.querySelector<HTMLElement>("[data-quote-form]");
      const anchor = form?.closest<HTMLElement>("[id]");
      if (anchor?.id) {
        setHref(`#${anchor.id}`);
        return;
      }
      if (tries++ < 20) timer = setTimeout(resolve, 150);
      else setHref(QUOTE_FALLBACK);
    };
    setHref(QUOTE_FALLBACK);
    resolve();
    return () => clearTimeout(timer);
  }, [pathname]);

  return href;
};

const QuoteLink = ({
  className,
  children = QUOTE_LABEL,
  href,
  onClick,
}: {
  className?: string;
  children?: ReactNode;
  /** Force a target (e.g. a specific form on a page with more than one). */
  href?: string;
  onClick?: () => void;
}) => {
  const auto = useQuoteHref();
  const target = href ?? auto;
  if (target.startsWith("#")) {
    return (
      <a href={target} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={target} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

export default QuoteLink;
