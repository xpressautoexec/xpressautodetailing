import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { trackMeta } from "@/lib/metaPixel";

const Detailing = lazy(() => import("./pages/Detailing"));

const PaintCeramics = lazy(() => import("./pages/PaintCeramics"));
const CorporateFleet = lazy(() => import("./pages/CorporateFleet"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const Gallery = lazy(() => import("./pages/Gallery"));

const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPPFvsCeramic = lazy(() => import("./pages/BlogPPFvsCeramic"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TrailerRV = lazy(() => import("./pages/TrailerRV"));
const RVRentalFleet = lazy(() => import("./pages/RVRentalFleet"));
const RVPPF = lazy(() => import("./pages/RVPPF"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Training = lazy(() => import("./pages/Training"));
const TrainingSignup = lazy(() => import("./pages/TrainingSignup"));

const MonthlyPlan = lazy(() => import("./pages/MonthlyPlan"));
const MarineDetailing = lazy(() => import("./pages/MarineDetailing"));
const PriceComparison = lazy(() => import("./pages/PriceComparison"));

/* Dedicated, individually prerendered landing routes */
const AutoDetailing = lazy(() => import("./pages/AutoDetailing"));
const RVDetailing = lazy(() => import("./pages/RVDetailing"));
const CeramicCoating = lazy(() => import("./pages/CeramicCoating"));
const PaintCorrection = lazy(() => import("./pages/PaintCorrection"));
const HeadlightRestoration = lazy(() => import("./pages/HeadlightRestoration"));
const Reviews = lazy(() => import("./pages/Reviews"));
const CancellationPolicyPage = lazy(() => import("./pages/CancellationPolicyPage"));

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

/** Sends a Meta Pixel PageView on client-side navigation (index.html covers the first load). */
const MetaPixelPageView = () => {
  const { pathname } = useLocation();
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/ppf-vs-ceramic-coating-calgary" element={<BlogPPFvsCeramic />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/trailer-rv" element={<Navigate to="/rv-trailer" replace />} />
        <Route path="/rv-rental-fleet" element={<Navigate to="/rv-trailer/rental-fleet" replace />} />
        <Route path="/trailer-rv/ppf" element={<Navigate to="/rv-trailer/ppf" replace />} />
        <Route path="/terms-conditions" element={<Navigate to="/terms-of-service" replace />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/why-choose-us" element={<Navigate to="/reviews" replace />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/signup" element={<TrainingSignup />} />

        <Route path="/windshield-ppf" element={<Navigate to="/rv-trailer/ppf" replace />} />
        <Route path="/monthly-plan" element={<Navigate to="/xpress-pass" replace />} />
        <Route path="/marine" element={<MarineDetailing />} />
        <Route path="/ppf" element={<Navigate to="/ceramic-paint-correction" replace />} />
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

        {/* New URL structure */}
        <Route path="/rv-trailer" element={<TrailerRV />} />
        <Route path="/rv-trailer/ppf" element={<RVPPF />} />
        <Route path="/rv-trailer/rental-fleet" element={<RVRentalFleet />} />
        <Route path="/ceramic-paint-correction" element={<PaintCeramics />} />
        <Route path="/protection/ppf" element={<Navigate to="/ceramic-paint-correction" replace />} />
        <Route path="/protection/window-tint" element={<Navigate to="/ceramic-paint-correction" replace />} />
        <Route path="/protection/windshield-ppf" element={<Navigate to="/rv-trailer/ppf" replace />} />
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

export const RouteFallback = () => <div className="min-h-screen bg-brand-dark" />;

const App = () => (
  <HelmetProvider>
    <AppProviders>
      <BrowserRouter>
        <ScrollToTop />
        <MetaPixelPageView />
        <Suspense fallback={<RouteFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  </HelmetProvider>
);

export default App;
