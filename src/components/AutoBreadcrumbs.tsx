import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "interior-detailing": "Interior Detailing",
  "complete-detailing": "Complete Detailing",
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
      <Breadcrumb className={cn("py-4 bg-background border-b border-border", className)}>
        <BreadcrumbList className="container text-xs sm:text-sm text-muted-foreground">
          {displaySegments.map((segment, index) => (
            <BreadcrumbItem key={segment.path}>
              {segment.isLast ? (
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={segment.path}>{segment.label}</Link>
                </BreadcrumbLink>
              )}
              {index < displaySegments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default AutoBreadcrumbs;

