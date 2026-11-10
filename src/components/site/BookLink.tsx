import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Booking link that works for every kind of target a page can point at:
 * a Fieldd URL (new tab), an on-page anchor ("#quote") or a site route ("/detailing#packages").
 */
const BookLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

export default BookLink;
