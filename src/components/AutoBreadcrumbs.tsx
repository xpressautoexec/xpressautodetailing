import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Path prefixes that group URLs but have no page of their own; skipped in the trail. */
const NO_PAGE = new Set(["protection"]);

const ROUTE_LABELS: Record<string, string> = {
  "xpress-pass": "Xpress Pass",
  "fleet": "Fleet & Dealership",
  "ceramic-paint-correction": "Ceramic & Paint Correction",
  "cancellation-policy": "Cancellation Policy",
  "calgary-detailing-price-comparison": "Price Comparison",
  "auto-detailing": "Auto Detailing",
  "rv-detailing": "RV Detailing",
  "ceramic-coating": "Ceramic Coating",
  "paint-correction": "Paint Correction",
  "reviews": "Reviews & Why Xpress",
  "training/signup": "Request a Seat",
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
  "rv-trailer": "RV & Trailer",
  "rv-trailer/ppf": "RV PPF",
  "rv-trailer/rental-fleet": "RV Rental Fleet Care",
  "rv-rental-fleet": "RV Rental Fleet Care",
  "trailer-rv/ppf": "RV PPF",
  "terms-of-service": "Terms of Service",
  "add-ons": "Add-Ons",
  "training": "Training",
  "monthly-plan": "The Xpress Pass",
  "marine": "Marine & Pontoon Detailing",
  "exterior-detailing": "Exterior Detailing",
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
      if (NO_PAGE.has(key)) return;
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
      <div className={cn("bg-brand-dark border-b border-primary-foreground/10", className)}>
        <div className="shell">
          <nav aria-label="breadcrumb" className="flex items-center h-7 overflow-x-auto no-scrollbar">
            <ol className="flex items-center gap-1 whitespace-nowrap">
              {displaySegments.map((segment, index) => (
                <li key={segment.path} className="flex items-center">
                  {index === 0 ? (
                    <Link
                      to={segment.path}
                      className="flex items-center gap-1 text-[11px] font-medium text-brand-gray hover:text-primary-foreground transition-colors"
                    >
                      <Home className="w-3 h-3" />
                      <span>{segment.label}</span>
                    </Link>
                  ) : segment.isLast ? (
                    <span className="text-[11px] font-semibold text-primary-foreground" aria-current="page">
                      {segment.label}
                    </span>
                  ) : (
                    <Link
                      to={segment.path}
                      className="text-[11px] font-medium text-brand-gray hover:text-primary-foreground transition-colors"
                    >
                      {segment.label}
                    </Link>
                  )}
                  {index < displaySegments.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-brand-gray/40 mx-1 shrink-0" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AutoBreadcrumbs;
