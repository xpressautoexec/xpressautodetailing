import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/data/copy";
import { BOOKING_URL, PHONE } from "@/data/pricing";

const telHref = `tel:${PHONE.replace(/-/g, "")}`;

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  const toggleMobileGroup = (label: string) => {
    setOpenMobile((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-dark border-b border-primary-foreground/10">
      <div className="shell flex items-center justify-between py-3">
        <Link to="/" className="shrink-0" aria-label="Xpress Auto & RV Detailing home">
          <img
            src="/xpress-logo-white.png"
            alt="Xpress Auto & RV Detailing"
            className="h-9 lg:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link: NavLink) => {
            const active = isActive(pathname, link.href);
            const hasChildren = !!link.children?.length;

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDesktop(link.label)}
                onMouseLeave={() => setOpenDesktop(null)}
              >
                <Link
                  to={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors rounded-md ${
                    active ? "text-primary-foreground" : "text-brand-gray hover:text-primary-foreground hover:bg-primary-foreground/5"
                  }`}
                >
                  {link.label}
                  {hasChildren && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDesktop === link.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {hasChildren && openDesktop === link.label && (
                  <div className="absolute left-0 top-full pt-1 min-w-[16rem]">
                    <div className="rounded-lg border border-primary-foreground/10 bg-brand-dark/95 backdrop-blur shadow-2xl overflow-hidden py-1">
                      {link.children!.map((child) => {
                        const childActive = isActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              childActive
                                ? "text-primary-foreground bg-primary-foreground/10"
                                : "text-brand-gray hover:text-primary-foreground hover:bg-primary-foreground/5"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={telHref} aria-label={`Call ${PHONE}`} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-primary-foreground hover:text-primary-foreground/80 transition-colors">
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden xl:inline">{PHONE}</span>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-md bg-electric px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-electric-2 transition-colors"
          >
            Book a detail
          </a>
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-primary-foreground p-2 -mr-2"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-primary-foreground/10 bg-brand-dark">
          <div className="shell flex flex-col py-3">
            {NAV_LINKS.map((link: NavLink) => {
              const active = isActive(pathname, link.href);
              const hasChildren = !!link.children?.length;
              const expanded = openMobile[link.label];

              return (
                <div key={link.href} className="border-b border-primary-foreground/5 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`min-h-[44px] flex-1 flex items-center text-base font-medium ${
                        active ? "text-primary-foreground" : "text-brand-gray hover:text-primary-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileGroup(link.label)}
                        className="p-2 text-brand-gray hover:text-primary-foreground"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} submenu`}
                        aria-expanded={expanded}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && expanded && (
                    <div className="pl-4 pb-2 flex flex-col">
                      {link.children!.map((child) => {
                        const childActive = isActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setIsOpen(false)}
                            aria-current={childActive ? "page" : undefined}
                            className={`min-h-[40px] flex items-center text-sm ${
                              childActive ? "text-primary-foreground" : "text-brand-gray hover:text-primary-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={telHref}
              className="min-h-[44px] flex items-center gap-2 text-base font-medium text-primary-foreground"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="my-3 min-h-[44px] flex items-center justify-center rounded-md bg-electric px-6 text-base font-semibold text-primary-foreground"
            >
              Book a detail
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
