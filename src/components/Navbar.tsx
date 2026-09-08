import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/copy";
import { BOOKING_URL, PHONE } from "@/data/pricing";

const telHref = `tel:${PHONE.replace(/-/g, "")}`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-brand-dark border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="shrink-0" aria-label="Xpress Auto & RV Detailing home">
          <img
            src="/xpress-logo-white.png"
            alt="Xpress Auto & RV Detailing"
            className="h-9 lg:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-brand-gray hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={telHref} className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors">
            <Phone className="w-4 h-4" aria-hidden="true" />
            {PHONE}
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-brand-blue-deep transition-colors"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-white/10 bg-brand-dark">
          <div className="container flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] flex items-center text-base font-medium text-brand-gray hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={telHref}
              className="min-h-[44px] flex items-center gap-2 text-base font-medium text-white"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="my-3 min-h-[44px] flex items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
            >
              Book Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
