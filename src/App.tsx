import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, type ComponentType, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

type PageModule = { default: ComponentType };
/**
 * Lazy page that can be loaded ahead of hydration. Once preloaded it renders synchronously,
 * so hydrating prerendered HTML doesn't suspend, flash the fallback and re-render.
 */
const lazyPage = (loader: () => Promise<PageModule>) => {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(loader);
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = () =>
    loader().then((m) => {
      Loaded = m.default;
      return m;
    });
  return Page;
};

const Detailing = lazyPage(() => import("./pages/Detailing"));

const PaintCeramics = lazyPage(() => import("./pages/PaintCeramics"));
const CorporateFleet = lazyPage(() => import("./pages/CorporateFleet"));
const GiftCards = lazyPage(() => import("./pages/GiftCards"));
const Gallery = lazyPage(() => import("./pages/Gallery"));

const Contact = lazyPage(() => import("./pages/Contact"));
const Quote = lazyPage(() => import("./pages/Quote"));
const Blog = lazyPage(() => import("./pages/Blog"));
const BlogPPFvsCeramic = lazyPage(() => import("./pages/BlogPPFvsCeramic"));
const BlogPost = lazyPage(() => import("./pages/BlogPost"));
const TrailerRV = lazyPage(() => import("./pages/TrailerRV"));
const RVRentalFleet = lazyPage(() => import("./pages/RVRentalFleet"));
const RVPPF = lazyPage(() => import("./pages/RVPPF"));
const TermsOfService = lazyPage(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazyPage(() => import("./pages/PrivacyPolicy"));
const Training = lazyPage(() => import("./pages/Training"));
const TrainingSignup = lazyPage(() => import("./pages/TrainingSignup"));

const MonthlyPlan = lazyPage(() => import("./pages/MonthlyPlan"));
const MarineDetailing = lazyPage(() => import("./pages/MarineDetailing"));
const PriceComparison = lazyPage(() => import("./pages/PriceComparison"));

/* Dedicated, individually prerendered landing routes */
const AutoDetailing = lazyPage(() => import("./pages/AutoDetailing"));
const RVDetailing = lazyPage(() => import("./pages/RVDetailing"));
const CeramicCoating = lazyPage(() => import("./pages/CeramicCoating"));
const PaintCorrection = lazyPage(() => import("./pages/PaintCorrection"));
const HeadlightRestoration = lazyPage(() => import("./pages/HeadlightRestoration"));
const WindshieldPPF = lazyPage(() => import("./pages/WindshieldPPF"));
const CarPPF = lazyPage(() => import("./pages/CarPPF"));
const Reviews = lazyPage(() => import("./pages/Reviews"));
const Warranty = lazyPage(() => import("./pages/Warranty"));
const LeaseReturn = lazyPage(() => import("./pages/LeaseReturn"));
const InteriorLp = lazyPage(() => import("./pages/lp/InteriorLp"));
const CeramicPpfLp = lazyPage(() => import("./pages/lp/CeramicPpfLp"));
const FleetLp = lazyPage(() => import("./pages/lp/FleetLp"));
const CancellationPolicyPage = lazyPage(() => import("./pages/CancellationPolicyPage"));

const queryClient = new QueryClient();

/** Resets scroll to the top on every route change (hash links keep their target). */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    const changedPage = prevPath.current !== pathname;
    prevPath.current = pathname;
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
    // Lazy routes and page transitions mount late, so wait for the target section.
    // The outgoing page can share the same section id while it fades out, so ignore
    // anything that was already on screen when the navigation happened.
    const id = decodeURIComponent(hash.slice(1));
    const stale = changedPage ? document.getElementById(id) : null;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const seek = () => {
      const el = document.getElementById(id);
      if (el && el !== stale) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 40) timer = setTimeout(seek, 75);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
};

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/detailing" element={<Detailing />} />
        <Route path="/interior-detailing" element={<Navigate to="/detailing?tab=interior" replace />} />
        <Route path="/exterior-detailing" element={<Navigate to="/detailing?tab=exterior" replace />} />
        <Route path="/complete-detailing" element={<Navigate to="/detailing?tab=complete" replace />} />
        <Route path="/add-ons" element={<Navigate to="/detailing?tab=add-ons" replace />} />
        <Route path="/paint-ceramics" element={<Navigate to="/ceramic-paint-correction" replace />} />
        <Route path="/corporate-fleet" element={<Navigate to="/fleet" replace />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/ppf-vs-ceramic-coating-calgary" element={<BlogPPFvsCeramic />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/trailer-rv" element={<Navigate to="/rv-trailer" replace />} />
        <Route path="/rv-rental-fleet" element={<Navigate to="/rv-trailer/rental-fleet" replace />} />
        <Route path="/trailer-rv/ppf" element={<Navigate to="/rv-trailer/ppf" replace />} />
        <Route path="/terms-conditions" element={<Navigate to="/terms-of-service" replace />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/why-choose-us" element={<Navigate to="/reviews" replace />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/signup" element={<TrainingSignup />} />

        <Route path="/windshield-ppf" element={<WindshieldPPF />} />
        <Route path="/paint-protection-film" element={<CarPPF />} />
        <Route path="/monthly-plan" element={<Navigate to="/xpress-pass" replace />} />
        <Route path="/marine" element={<MarineDetailing />} />
        <Route path="/ppf" element={<Navigate to="/paint-protection-film" replace />} />
        <Route path="/window-tinting" element={<Navigate to="/ceramic-paint-correction" replace />} />
        <Route path="/calgary-detailing-price-comparison" element={<PriceComparison />} />

        {/* Dedicated landing routes */}
        <Route path="/auto-detailing" element={<AutoDetailing />} />
        <Route path="/rv-detailing" element={<RVDetailing />} />
        <Route path="/ceramic-coating" element={<CeramicCoating />} />
        <Route path="/paint-correction" element={<PaintCorrection />} />
        <Route path="/headlight-restoration" element={<HeadlightRestoration />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />

        <Route path="/warranty" element={<Warranty />} />
        <Route path="/lease-return" element={<LeaseReturn />} />

        {/* Paid-ad landing pages (noindex, no site nav) */}
        <Route path="/lp/interior-detailing" element={<InteriorLp />} />
        <Route path="/lp/ceramic-ppf" element={<CeramicPpfLp />} />
        <Route path="/lp/fleet" element={<FleetLp />} />

        {/* New URL structure */}
        <Route path="/rv-trailer" element={<TrailerRV />} />
        <Route path="/rv-trailer/ppf" element={<RVPPF />} />
        <Route path="/rv-trailer/rental-fleet" element={<RVRentalFleet />} />
        <Route path="/ceramic-paint-correction" element={<PaintCeramics />} />
        <Route path="/protection/ppf" element={<Navigate to="/paint-protection-film" replace />} />
        <Route path="/protection/window-tint" element={<Navigate to="/ceramic-paint-correction" replace />} />
        <Route path="/protection/windshield-ppf" element={<Navigate to="/windshield-ppf" replace />} />
        <Route path="/fleet" element={<CorporateFleet />} />
        <Route path="/xpress-pass" element={<MonthlyPlan />} />
        <Route path="/pricing" element={<Navigate to="/detailing" replace />} />
        <Route path="/detailing/interior" element={<Navigate to="/detailing?tab=interior" replace />} />
        <Route path="/detailing/exterior" element={<Navigate to="/detailing?tab=exterior" replace />} />
        <Route path="/detailing/complete" element={<Navigate to="/detailing?tab=complete" replace />} />
        <Route path="/detailing/add-ons" element={<Navigate to="/detailing?tab=add-ons" replace />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

/** Providers shared by the browser entry and the prerender (SSR) entry. */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export const RouteFallback = () => <div className="min-h-screen bg-canvas" />;

/** Lazy pages by path, for preloading the current page before hydration. */
const PRELOAD: [string, { preload: () => Promise<unknown> }][] = [
  ["/warranty", Warranty],
  ["/lease-return", LeaseReturn],
  ["/lp/interior-detailing", InteriorLp],
  ["/lp/ceramic-ppf", CeramicPpfLp],
  ["/lp/fleet", FleetLp],
  ["/detailing", Detailing],
  ["/gift-cards", GiftCards],
  ["/gallery", Gallery],
  ["/contact", Contact],
  ["/quote", Quote],
  ["/blog", Blog],
  ["/blog/ppf-vs-ceramic-coating-calgary", BlogPPFvsCeramic],
  ["/blog/:slug", BlogPost],
  ["/terms-of-service", TermsOfService],
  ["/privacy-policy", PrivacyPolicy],
  ["/training", Training],
  ["/training/signup", TrainingSignup],
  ["/windshield-ppf", WindshieldPPF],
  ["/paint-protection-film", CarPPF],
  ["/marine", MarineDetailing],
  ["/calgary-detailing-price-comparison", PriceComparison],
  ["/auto-detailing", AutoDetailing],
  ["/rv-detailing", RVDetailing],
  ["/ceramic-coating", CeramicCoating],
  ["/paint-correction", PaintCorrection],
  ["/headlight-restoration", HeadlightRestoration],
  ["/reviews", Reviews],
  ["/cancellation-policy", CancellationPolicyPage],
  ["/rv-trailer", TrailerRV],
  ["/rv-trailer/ppf", RVPPF],
  ["/rv-trailer/rental-fleet", RVRentalFleet],
  ["/ceramic-paint-correction", PaintCeramics],
  ["/fleet", CorporateFleet],
  ["/xpress-pass", MonthlyPlan],
];

/** Loads the current route's page module (no-op for eager pages). Call before hydrateRoot. */
export const preloadRoute = (pathname: string) => {
  const hit = PRELOAD.find(([path]) => matchPath(path, pathname));
  return hit ? hit[1].preload().catch(() => undefined) : Promise.resolve();
};

const App = () => (
  <HelmetProvider>
    <AppProviders>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  </HelmetProvider>
);

export default App;
