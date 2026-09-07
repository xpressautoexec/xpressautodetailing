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
  { label: "Detailing", href: "/detailing" },
  {
    label: "Protection",
    children: [
      { label: "Paint & Ceramics", href: "/paint-ceramics" },
      { label: "Paint Protection Film (PPF)", href: "/ppf" },
      { label: "Window Tinting", href: "/window-tinting" },
      { label: "Windshield PPF", href: "/windshield-ppf" },
    ],
  },
  { label: "Marine", href: "/marine" },
  {
    label: "RV & Trailer",
    children: [
      { label: "RV & Trailer Detailing", href: "/trailer-rv" },
      { label: "RV Rental Fleet Care", href: "/rv-rental-fleet" },
    ],
  },
  { label: "Fleet", href: "/corporate-fleet" },
  {
    label: "More",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Reviews", href: "/reviews" },
      { label: "The Xpress Pass", href: "/monthly-plan" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Training", href: "/training" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
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
  { label: "Detailing", href: "/detailing" },
  {
    label: "Protection",
    href: "#",
    children: [
      { label: "Paint & Ceramics", href: "/paint-ceramics" },
      { label: "Paint Protection Film (PPF)", href: "/ppf" },
      { label: "Window Tinting", href: "/window-tinting" },
      { label: "Windshield PPF", href: "/windshield-ppf" },
    ],
  },
  { label: "Marine", href: "/marine" },
  {
    label: "RV & Trailer",
    href: "#",
    children: [
      { label: "RV & Trailer Detailing", href: "/trailer-rv" },
      { label: "RV Rental Fleet Care", href: "/rv-rental-fleet" },
    ],
  },
  { label: "Fleet", href: "/corporate-fleet" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Reviews", href: "/reviews" },
      { label: "The Xpress Pass", href: "/monthly-plan" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Training", href: "/training" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
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
        Book in 60 seconds · satisfaction guarantee
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
          <Link to="/" className="flex items-center shrink-0" aria-label="Xpress Auto Detailing home">
            <img src="/xpress-logo-white.png" alt="Xpress Auto & RV Detailing" className="h-10 lg:h-12 w-auto object-contain" />
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
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary-foreground" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen}>
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
