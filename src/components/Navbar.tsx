import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";

const BOOKING_URL = "https://xpressauto.fieldd.co/";

interface DropdownItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
  children?: DropdownItem[];
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/", isRoute: true },
  {
    label: "Detailing",
    href: "#",
    children: [
      { label: "Interior Detailing", href: "/interior-detailing", isRoute: true },
      { label: "Exterior Detailing", href: "/exterior-detailing", isRoute: true },
      { label: "Complete Detailing", href: "/complete-detailing", isRoute: true },
      { label: "Trailer & RV", href: "/trailer-rv", isRoute: true },
    ],
  },
  { label: "Paint & Ceramics", href: "/paint-ceramics", isRoute: true },
  { label: "Corporate & Fleet", href: "/corporate-fleet", isRoute: true },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Gift Cards", href: "/gift-cards", isRoute: true },
      { label: "Gallery", href: "/gallery", isRoute: true },
      { label: "Contact Us", href: "/contact", isRoute: true },
      { label: "Blog", href: "/blog", isRoute: true },
    ],
  },
];

const TopBar = () => (
  <div className="bg-primary text-primary-foreground text-sm py-2">
    <div className="container flex items-center justify-between">
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-heading font-bold tracking-wider uppercase text-xs hidden sm:block hover:opacity-80 transition-opacity underline underline-offset-2">
        Book in 60 seconds • 14-day make-it-right guarantee
      </a>
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

const DesktopDropdown = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider"
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-brand-dark-surface border border-brand-dark rounded-lg shadow-xl overflow-hidden z-50">
          {item.children!.map((child) => (
            <Link
              key={child.label}
              to={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-brand-gray hover:text-primary-foreground hover:bg-brand-dark text-sm font-heading font-semibold uppercase tracking-wider transition-colors"
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
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl tracking-tight">
              <span className="text-primary">X</span>
              <span className="text-primary-foreground">PRESS</span>
              <span className="text-primary text-sm font-semibold ml-1 tracking-widest">AUTO DETAILING</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <DesktopDropdown key={link.label} item={link} />
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-brand-gray hover:text-primary-foreground transition-colors font-heading text-sm font-semibold uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              )
            )}
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
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary-foreground">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-brand-dark border-t border-brand-dark-surface pb-4">
            <div className="container flex flex-col gap-1 pt-4">
              {navLinks.map((link) =>
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
