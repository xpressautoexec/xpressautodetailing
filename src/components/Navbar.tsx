import { useState } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const TopBar = () => (
  <div className="bg-primary text-primary-foreground text-sm py-2">
    <div className="container flex items-center justify-between">
      <span className="font-heading font-bold tracking-wider uppercase text-xs hidden sm:block">
        Book in 60 seconds • 14-day make-it-right guarantee
      </span>
      <div className="flex items-center gap-4 ml-auto">
        <a href="mailto:support@xpressautodetailing.ca" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden md:inline">support@xpressautodetailing.ca</span>
        </a>
        <a href="tel:5875004523" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <Phone className="w-3.5 h-3.5" />
          <span>587-500-4523</span>
        </a>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TopBar />
      <nav className="bg-brand-dark sticky top-0 z-50 border-b border-brand-dark-surface">
        <div className="container flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl tracking-tight">
              <span className="text-primary">X</span>
              <span className="text-primary-foreground">PRESS</span>
              <span className="text-primary text-sm font-semibold ml-1 tracking-widest">AUTO DETAILING</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded hover:bg-brand-blue-deep transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-primary-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-brand-dark-surface pb-4">
            <div className="container flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded text-center hover:bg-brand-blue-deep transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
