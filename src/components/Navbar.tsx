import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft, Search, Phone, ArrowRight } from "lucide-react";
import { MEGA_NAV, type NavGroup } from "@/data/navigation";
import { PHONE } from "@/data/pricing";
import QuoteLink, { TEL_HREF } from "@/components/site/QuoteLink";
import SiteSearch from "@/components/site/SiteSearch";

const strip = (href: string) => href.split(/[?#]/)[0];
const isActive = (pathname: string, href: string) => {
  if (href.includes("#")) return false;
  const h = strip(href);
  return !!h && h !== "/" && (pathname === h || pathname.startsWith(`${h}/`));
};
const groupActive = (pathname: string, g: NavGroup) =>
  g.columns.some((c) => isActive(pathname, c.href) || c.links.some((l) => isActive(pathname, l.href)));

/**
 * LLumar-style header: white bar, uppercase items with chevrons, search, one pill "Get a quote".
 * Each item opens a full-width gradient panel whose angled bottom edge slides over the hero.
 */
const Navbar = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<NavGroup | null>(null);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setSearchOpen(false);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const active = MEGA_NAV.find((g) => g.label === open);

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 bg-canvas">
      <div className="shell flex h-header items-center justify-between gap-4">
        <Link to="/" className="shrink-0" aria-label="Xpress Auto & RV Detailing home">
          <img
            src="/xpress-logo-dark.png"
            alt="Xpress Auto & RV Detailing"
            width={546}
            height={180}
            className="h-11 w-auto object-contain xl:h-12"
          />
        </Link>

        <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
          {MEGA_NAV.map((g) => {
            const isOpen = open === g.label;
            const current = groupActive(pathname, g);
            return (
              <button
                key={g.label}
                type="button"
                aria-expanded={isOpen}
                aria-controls="mega-panel"
                onClick={() => {
                  setSearchOpen(false);
                  setOpen(isOpen ? null : g.label);
                }}
                onMouseEnter={() => open && setOpen(g.label)}
                className={`nav-item relative flex h-full items-center gap-1 px-2.5 xl:gap-1.5 xl:px-4 ${isOpen ? "nav-item-open" : ""} ${
                  current ? "text-action" : "text-ink"
                }`}
              >
                {g.label}
                <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            aria-label="Search the site"
            aria-expanded={searchOpen}
            onClick={() => {
              setOpen(null);
              setSearchOpen((v) => !v);
            }}
            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:text-action"
          >
            <Search className="h-6 w-6" aria-hidden="true" />
          </button>
          <QuoteLink className="pill-action inline-flex items-center gap-2 bg-action px-7 text-primary-foreground transition-colors hover:bg-ink" />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a href={TEL_HREF} aria-label={`Call ${PHONE}`} className="flex h-11 w-11 items-center justify-center text-action">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {active && (
        <div id="mega-panel" className="mega-panel absolute inset-x-0 top-full hidden lg:block" onMouseLeave={() => setOpen(null)}>
          <div className="shell grid grid-cols-[1fr_300px] gap-12 pb-28 pt-12">
            <div>
              <Link to={active.headingHref ?? active.columns[0].href} className="mega-heading inline-block">
                {active.heading}
              </Link>
              <div className={`mt-9 grid gap-10 ${active.columns.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
                {active.columns.map((c) => (
                  <div key={c.title}>
                    <Link to={c.href} className="mega-col-title inline-flex flex-wrap items-center gap-2">
                      {c.title}
                      {c.badge && <span className="nav-badge">{c.badge}</span>}
                    </Link>
                    <ul className="mt-5 space-y-4">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link to={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined} className="mega-link">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <Link to={active.featured.href} className="group block self-start">
              <div className="slanted-photo aspect-[4/3] overflow-hidden bg-tint">
                <img src={active.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mega-col-title mt-5 flex items-center gap-2">
                {active.featured.label}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </p>
              <p className="mt-2 text-[15px] leading-snug text-muted-ink">{active.featured.body}</p>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop search */}
      {searchOpen && (
        <div className="mega-panel absolute inset-x-0 top-full hidden lg:block">
          <div className="shell pb-24 pt-10">
            <p className="mega-heading">Search</p>
            <div className="mt-6">
              <SiteSearch onSelect={() => setSearchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile full-screen drill-down */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="mega-panel-mobile fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto lg:hidden"
        >
          <div className="shell pb-[calc(var(--mobile-bar-h)+2rem)] pt-4">
            {!mobileGroup ? (
              <>
                <ul>
                  {MEGA_NAV.map((g) => (
                    <li key={g.label} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setMobileGroup(g)}
                        className="mega-col-title flex min-h-[60px] w-full items-center justify-between text-left text-lg"
                      >
                        {g.label}
                        <ChevronRight className="h-5 w-5 text-primary" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <SiteSearch onSelect={() => setMobileOpen(false)} />
                </div>
                <QuoteLink className="pill-action mt-6 flex w-full items-center justify-center gap-2 bg-action text-primary-foreground" />
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMobileGroup(null)}
                  className="flex min-h-[48px] items-center gap-1 text-sm font-semibold uppercase tracking-[0.12em] text-action"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
                <p className="mega-heading mt-2">{mobileGroup.heading}</p>
                {mobileGroup.columns.map((c) => (
                  <div key={c.title} className="mt-8">
                    <Link to={c.href} className="mega-col-title inline-flex flex-wrap items-center gap-2">
                      {c.title}
                      {c.badge && <span className="nav-badge">{c.badge}</span>}
                    </Link>
                    <ul className="mt-3">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link to={l.href} className="mega-link flex min-h-[46px] items-center">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
