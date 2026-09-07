import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "detailing": "Car Detailing",

  "paint-ceramics": "Paint & Ceramics",
  "corporate-fleet": "Corporate Fleet",
  "gift-cards": "Gift Cards",
  "gallery": "Gallery",
  "contact": "Contact",
  "blog": "Blog",
  "blog/ppf-vs-ceramic-coating-calgary": "PPF vs Ceramic Coating for Calgary Winters",
  "trailer-rv": "Trailer & RV Detailing",
  "rv-rental-fleet": "RV Rental Fleet Care",
  "trailer-rv/ppf": "RV PPF",
  "terms-of-service": "Terms of Service",
  "why-choose-us": "Why Choose Us",
  "add-ons": "Add-Ons",
  "training": "Training",
  "training/signup": "Training Signup",
  "windshield-ppf": "Windshield PPF",
  "monthly-plan": "The Xpress Pass",
  "marine": "Marine & Pontoon Detailing",
  "ppf": "Paint Protection Film",
  "window-tinting": "Window Tinting",
  "calgary-detailing-price-comparison": "Calgary Detailing Price Comparison",
  "exterior-detailing": "Exterior Detailing",
  "auto-detailing": "Auto Detailing",
  "rv-detailing": "RV Detailing",
  "ceramic-coating": "Ceramic Coating",
  "paint-correction": "Paint Correction",
  "reviews": "Reviews",
};


interface Props {
  className?: string;
  /** Optional override for the final crumb label (e.g. dynamic blog post titles) */
  currentLabel?: string;
}

export const useBreadcrumbSegments = () => {
  const { pathname } = useLocation();
  return useMemo(() => {
    const clean = pathname.replace(/^\/|\/$/g, "");
    if (!clean) return [{ path: "/", label: "Home", isLast: true }];

    // Build nested segments so every parent page is shown
    const parts = clean.split("/");
    const segments = [{ path: "/", label: "Home", isLast: false }];
    let accumulated = "";
    parts.forEach((part, index) => {
      accumulated += `/${part}`;
      const isLast = index === parts.length - 1;
      const key = accumulated.replace(/^\//, "");
      const label =
        ROUTE_LABELS[key] ||
        ROUTE_LABELS[accumulated] ||
        part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      segments.push({ path: accumulated, label, isLast });
    });

    return segments;
  }, [pathname]);
};


export const buildBreadcrumbJsonLd = (segments: { path: string; label: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: segments.map((segment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: segment.label,
    item: `https://xpressautodetail.ca${segment.path}`,
  })),
});

const AutoBreadcrumbs = ({ className, currentLabel }: Props) => {
  const segments = useBreadcrumbSegments();
  const displaySegments = currentLabel
    ? segments.map((s, i) => (i === segments.length - 1 ? { ...s, label: currentLabel } : s))
    : segments;

  const jsonLd = useMemo(() => buildBreadcrumbJsonLd(displaySegments), [displaySegments]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className={cn("py-4", className)}>
        <div className="container">
          <nav
            aria-label="breadcrumb"
            className="inline-flex items-center px-4 sm:px-5 py-2.5 bg-card border border-border rounded-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
          >
            <ol className="flex items-center space-x-1 sm:space-x-2">
              {displaySegments.map((segment, index) => (
                <li key={segment.path} className="flex items-center">
                  {index === 0 ? (
                    <Link
                      to={segment.path}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{segment.label}</span>
                    </Link>
                  ) : segment.isLast ? (
                    <span
                      className="text-xs sm:text-sm font-semibold text-foreground tracking-tight"
                      aria-current="page"
                    >
                      {segment.label}
                    </span>
                  ) : (
                    <Link
                      to={segment.path}
                      className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {segment.label}
                    </Link>
                  )}
                  {index < displaySegments.length - 1 && (
                    <ChevronRight
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50 ml-1.5 sm:ml-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>

            {/* Brand marker */}
            <div className="ml-5 sm:ml-6 pl-5 sm:pl-6 border-l border-border hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">
                Xpress Auto Detailing
              </span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AutoBreadcrumbs;
