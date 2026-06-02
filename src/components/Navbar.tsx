import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

interface DropdownItem {
  label: string;
  href: string;
}

interface DesktopNavItem {
  label: string;
  href?: string;
  children?: DropdownItem[];
}

const desktopLinks: DesktopNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  {
    label: "Detailing",
    children: [
      { label: "Interior Detailing", href: "/interior-detailing" },
      { label: "Complete Detailing", href: "/complete-detailing" },
      { label: "Monthly Plan", href: "/monthly-plan" },
      { label: "Add-Ons", href: "/add-ons" },
    ],
  },
  {
    label: "Ceramics & PPF",
    children: [
      { label: "Paint & Ceramics", href: "/paint-ceramics" },
      { label: "Windshield PPF", href: "/windshield-ppf" },
    ],
  },
  {
    label: "Trailer & RV",
    children: [
      { label: "Trailer & RV Detailing", href: "/trailer-rv" },
      { label: "Winterization & De-Winterization", href: "/trailer-rv/winterization" },
      { label: "RV Paint Protection Film", href: "/trailer-rv/ppf" },
    ],
  },
  { label: "Fleet", href: "/corporate-fleet" },
  {
    label: "More",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

interface MobileNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const mobileLinks: MobileNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Detailing",
    href: "#",
    children: [
      { label: "Interior Detailing", href: "/interior-detailing" },
      
      { label: "Complete Detailing", href: "/complete-detailing" },
      { label: "Monthly Plan", href: "/monthly-plan" },
      { label: "Add-Ons", href: "/add-ons" },
      { label: "Trailer & RV", href: "/trailer-rv" },
    ],
  },
  {
    label: "Ceramics & PPF",
    href: "#",
    children: [
      { label: "Paint & Ceramics", href: "/paint-ceramics" },
      { label: "Windshield PPF", href: "/windshield-ppf" },
    ],
  },
  {
    label: "Trailer & RV",
    href: "#",
    children: [
      { label: "Trailer & RV Detailing", href: "/trailer-rv" },
      { label: "Winterization & De-Winterization", href: "/trailer-rv/winterization" },
      { label: "RV Paint Protection Film", href: "/trailer-rv/ppf" },
    ],
  },
  { label: "Corporate & Fleet", href: "/corporate-fleet" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

const TopBar = () => (
  <div className="bg-primary text-primary-foreground text-sm py-2">
    <div className="container flex items-center justify-between">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-heading font-bold tracking-wider uppercase text-sm hidden sm:block hover:opacity-80 transition-opacity underline underline-offset-4"
      >
        Book in 60 seconds · 14-day guarantee
      </a>
      <div className="flex items-center gap-4 ml-auto">
        <a href="mailto:support@xpressautodetail.ca" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden md:inline">support@xpressautodetail.ca</span>
        </a>
        <a href="tel:5875004523" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          <Phone className="w-3.5 h-3.5" />
          <span>587-500-4523</span>
        </a>
      </div>
    </div>
  </div>
);

const DesktopDropdown = ({ item }: { item: DesktopNavItem }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 text-brand-gray hover:text-primary-foreground transition-colors font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-brand-dark border border-brand-dark-surface rounded-md shadow-xl z-[60] py-1">
          {item.children!.map((child) => (
            <Link
              key={child.label}
              to={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-brand-gray hover:text-primary-foreground hover:bg-brand-dark-surface transition-colors font-heading text-xs font-semibold uppercase tracking-wider"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  return (
    <>
      <TopBar />
      <nav className="bg-brand-dark sticky top-0 z-50 border-b border-brand-dark-surface">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Xpress Auto Detailing home">
            <img src="/favicon-192.png" alt="Xpress Auto Detailing logo" className="h-8 w-8 lg:h-10 lg:w-10 object-contain" />
            <span className="font-heading font-black text-xl lg:text-2xl tracking-tight">
              <span className="text-primary">X</span>
              <span className="text-primary-foreground">PRESS</span>
              <span className="text-primary text-[10px] lg:text-xs font-semibold ml-1 tracking-widest">AUTO DETAILING</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {desktopLinks.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className="text-brand-gray hover:text-primary-foreground transition-colors font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="w-px h-5 bg-brand-dark-surface" />
            <a
              href="tel:5875004523"
              className="flex items-center gap-1.5 text-primary-foreground font-heading font-bold text-[11px] xl:text-xs uppercase tracking-wider hover:text-primary transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              587-500-4523
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-heading font-bold text-[11px] xl:text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-brand-blue-deep transition-colors whitespace-nowrap"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-brand-dark-surface pb-4">
            <div className="container flex flex-col gap-1 pt-4">
              {mobileLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setOpenMobile(openMobile === link.label ? null : link.label)}
                      className="flex items-center justify-between w-full text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider py-3"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openMobile === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {openMobile === link.label && (
                      <div className="pl-4 space-y-1 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={() => { setIsOpen(false); setOpenMobile(null); }}
                            className="block text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider py-2"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider py-3"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href="tel:5875004523"
                className="flex items-center justify-center gap-2 text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider py-2.5 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                587-500-4523
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wider px-6 py-2.5 rounded text-center hover:bg-brand-blue-deep transition-colors mt-2"
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
