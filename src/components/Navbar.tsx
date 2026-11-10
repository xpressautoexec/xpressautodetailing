import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/data/copy";
import { PHONE } from "@/data/pricing";
import QuoteLink, { TEL_HREF } from "@/components/site/QuoteLink";

type NavLink = (typeof NAV_LINKS)[number];

const isActive = (pathname: string, href: string) =>
  !!href && (pathname === href || pathname.startsWith(`${href}/`));

const groupActive = (pathname: string, link: NavLink) =>
  isActive(pathname, link.href) || !!link.children?.some((c) => isActive(pathname, c.href));

/** White, slim, sticky header. Logo left, five service links + More, phone and one quote button right. */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<Record<string, boolean>>({});
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setOpenDesktop(null);
  }, [pathname]);

  const linkBase =
    "relative flex h-header items-center gap-1 whitespace-nowrap px-3 text-[14px] font-medium transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90">
      <div className="shell flex h-header items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="Xpress Auto & RV Detailing home">
          <img
            src="/xpress-logo-dark.png"
            alt="Xpress Auto & RV Detailing"
            width={476}
            height={175}
            className="h-11 w-auto object-contain lg:h-12"
          />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
          {NAV_LINKS.map((link) => {
            const active = groupActive(pathname, link);
            const hasChildren = !!link.children?.length;
            const open = openDesktop === link.label;
            const cls = `${linkBase} ${active ? "text-ink" : "text-ink-2 hover:text-ink"}`;
            const indicator = active && (
              <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-[2px] bg-electric" />
            );

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => hasChildren && setOpenDesktop(link.label)}
                onMouseLeave={() => setOpenDesktop(null)}
              >
                {link.href ? (
                  <Link to={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined} className={cls}>
                    {link.label}
                    {hasChildren && (
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    )}
                    {indicator}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cls}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenDesktop(open ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    {indicator}
                  </button>
                )}

                {hasChildren && open && (
                  <div className="absolute left-0 top-full min-w-[15rem] pt-px">
                    <div className="overflow-hidden rounded-card border border-line bg-surface py-1.5">
                      {link.children!.map((child) => {
                        const childActive = isActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              childActive ? "bg-tint font-semibold text-ink" : "text-ink-2 hover:bg-tint hover:text-ink"
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

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={TEL_HREF}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink transition-colors hover:text-electric"
          >
            <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
            {PHONE}
          </a>
          <QuoteLink className="inline-flex min-h-[40px] items-center whitespace-nowrap rounded-md bg-electric px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-electric-2" />
        </div>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <div className="shell flex flex-col pb-[calc(var(--mobile-bar-h)+1.5rem)] pt-2">
            {NAV_LINKS.map((link) => {
              const hasChildren = !!link.children?.length;
              const expanded = openMobile[link.label];
              const toggle = () => setOpenMobile((prev) => ({ ...prev, [link.label]: !prev[link.label] }));

              return (
                <div key={link.label} className="border-b border-line">
                  <div className="flex items-center justify-between">
                    {link.href ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive(pathname, link.href) ? "page" : undefined}
                        className={`flex min-h-[52px] flex-1 items-center font-heading text-xl font-bold ${
                          groupActive(pathname, link) ? "text-electric" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={toggle}
                        aria-expanded={expanded}
                        className="flex min-h-[52px] flex-1 items-center text-left font-heading text-xl font-bold text-ink"
                      >
                        {link.label}
                      </button>
                    )}
                    {hasChildren && (
                      <button
                        onClick={toggle}
                        className="p-3 text-muted-ink hover:text-ink"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} submenu`}
                        aria-expanded={expanded}
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {hasChildren && expanded && (
                    <div className="flex flex-col pb-3 pl-1">
                      {link.children!.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive(pathname, child.href) ? "page" : undefined}
                          className={`flex min-h-[42px] items-center text-[15px] ${
                            isActive(pathname, child.href) ? "font-semibold text-electric" : "text-ink-2 hover:text-ink"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <a href={TEL_HREF} className="mt-4 flex min-h-[44px] items-center gap-2 text-base font-semibold text-ink">
              <Phone className="h-4 w-4 text-electric" aria-hidden="true" />
              {PHONE}
            </a>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="flex min-h-[44px] items-center text-[15px] text-ink-2">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
