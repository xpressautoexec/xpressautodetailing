import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronDown, Instagram, ArrowUpRight } from "lucide-react";
import { NAP, SHOP } from "@/data/copy";
import { PROTECTION_LINKS } from "@/data/navigation";
import MobileQuoteBar from "@/components/MobileQuoteBar";
import SiteSearch from "@/components/site/SiteSearch";

const SOCIALS = [{ label: "Instagram", href: "https://www.instagram.com/xpressautodetailingyyc", icon: Instagram }];
const GOOGLE_PROFILE = "https://www.google.com/maps/search/Xpress+Auto+%26+RV+Detailing+Calgary";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Car detailing", href: "/detailing" },
      { label: "Paint correction", href: "/paint-correction" },
      { label: "RV & trailer detailing", href: "/rv-trailer" },
      { label: "Fleet & dealership", href: "/fleet" },
      { label: "Marine & pontoon", href: "/marine" },
      { label: "Headlight restoration", href: "/headlight-restoration" },
      { label: "Xpress Pass", href: "/xpress-pass" },
    ],
  },
  { title: "Protection", links: PROTECTION_LINKS },
  {
    title: "Service areas",
    links: ["Calgary", "Airdrie", "Cochrane", "Chestermere", "Okotoks", "Rocky View County"].map((c) => ({
      label: c,
      href: "/contact",
    })),
  },
  {
    title: "Company",
    links: [
      { label: "Reviews", href: "/reviews" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Warranty & care", href: "/warranty" },
      { label: "Gift cards", href: "/gift-cards" },
      { label: "Training", href: "/training" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** LLumar-style footer: big search prompt, logo + socials, four link columns (accordions on phones), legal strip. */
const Footer = () => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <footer className="border-t border-line bg-canvas">
        <div className="shell pb-14 pt-16 sm:pt-20">
          <p className="site-footer-search font-medium leading-tight text-ink-2" style={{ fontFamily: "Unbounded, sans-serif" }}>
            Still looking for something?
          </p>
          <div className="mt-8 max-w-4xl [&>div]:max-w-none">
            <SiteSearch label="Search the site" />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_2.4fr] lg:gap-16">
            <div>
              <Link to="/" aria-label="Xpress Auto & RV Detailing home">
                <img src="/xpress-logo-dark.png" alt="Xpress Auto & RV Detailing" width={546} height={180} className="h-14 w-auto object-contain" loading="lazy" />
              </Link>
              <div className="mt-6 flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-action text-primary-foreground transition-colors hover:bg-ink"
                  >
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
                <a
                  href={GOOGLE_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google reviews"
                  className="flex h-11 items-center gap-1.5 rounded-[10px] bg-action px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink"
                >
                  Google
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-8 space-y-3 text-base">
                <li>
                  <a href={NAP.phoneHref} className="flex items-center gap-2 font-semibold text-ink hover:text-action">
                    <Phone className="h-4 w-4 text-action" aria-hidden="true" /> {NAP.phone}
                  </a>
                </li>
                <li>
                  <a href={NAP.emailHref} className="flex items-center gap-2 text-ink-2 hover:text-action">
                    <Mail className="h-4 w-4 text-action" aria-hidden="true" /> {NAP.email}
                  </a>
                </li>
                <li>
                  <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-ink-2 hover:text-action">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                    <span>
                      {SHOP.street}, {SHOP.city}, {SHOP.region} {SHOP.postal}
                      <span className="block text-sm text-muted-ink">Heated shop. Mobile everywhere else.</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
              {COLUMNS.map((c) => {
                const isOpen = open === c.title;
                return (
                  <nav key={c.title} aria-label={c.title} className="border-b border-line sm:border-0">
                    <h3 className="m-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : c.title)}
                        className="mega-col-title flex min-h-[56px] w-full items-center justify-between text-left sm:pointer-events-none sm:min-h-0"
                      >
                        {c.title}
                        <ChevronDown className={`h-5 w-5 text-primary transition-transform sm:hidden ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <ul className={`${isOpen ? "block" : "hidden"} space-y-3 pb-6 sm:mt-5 sm:block sm:pb-0`}>
                      {c.links.map((l) => (
                        <li key={l.label}>
                          <Link to={l.href} className="text-base text-ink-2 transition-colors hover:text-action">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-tint">
          <div className="shell flex flex-col gap-3 pb-[calc(var(--mobile-bar-h)+1.5rem+env(safe-area-inset-bottom))] pt-6 text-sm text-muted-ink lg:flex-row lg:items-center lg:justify-between lg:pb-6">
            <div>
              <p>
                © {new Date().getFullYear()} {NAP.name}, a trade name of Alberta Keystone Solutions Ltd. All rights reserved.
              </p>
              <p className="mt-1">SunTek®, LLumar® and CARPRO® are trademarks of their respective owners.</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link to="/terms-of-service" className="hover:text-action">
                Terms of service
              </Link>
              <Link to="/cancellation-policy" className="hover:text-action">
                Cancellation policy
              </Link>
              <Link to="/privacy-policy" className="hover:text-action">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <MobileQuoteBar />
    </>
  );
};

export default Footer;
