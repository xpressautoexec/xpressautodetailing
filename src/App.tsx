import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Detailing = lazy(() => import("./pages/Detailing"));

const PaintCeramics = lazy(() => import("./pages/PaintCeramics"));
const CorporateFleet = lazy(() => import("./pages/CorporateFleet"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const Gallery = lazy(() => import("./pages/Gallery"));

const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPPFvsCeramic = lazy(() => import("./pages/BlogPPFvsCeramic"));
const TrailerRV = lazy(() => import("./pages/TrailerRV"));
const RVRentalFleet = lazy(() => import("./pages/RVRentalFleet"));
const RVPPF = lazy(() => import("./pages/RVPPF"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const Training = lazy(() => import("./pages/Training"));
const TrainingSignup = lazy(() => import("./pages/TrainingSignup"));

const WindshieldPPF = lazy(() => import("./pages/WindshieldPPF"));
const MonthlyPlan = lazy(() => import("./pages/MonthlyPlan"));
const MarineDetailing = lazy(() => import("./pages/MarineDetailing"));
const PaintProtectionFilm = lazy(() => import("./pages/PaintProtectionFilm"));
const WindowTinting = lazy(() => import("./pages/WindowTinting"));
const PriceComparison = lazy(() => import("./pages/PriceComparison"));

/* Dedicated, individually prerendered landing routes */
const AutoDetailing = lazy(() => import("./pages/AutoDetailing"));
const RVDetailing = lazy(() => import("./pages/RVDetailing"));
const CeramicCoating = lazy(() => import("./pages/CeramicCoating"));
const PaintCorrection = lazy(() => import("./pages/PaintCorrection"));
const Reviews = lazy(() => import("./pages/Reviews"));

const queryClient = new QueryClient();

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
        <Route path="/paint-ceramics" element={<PaintCeramics />} />
        <Route path="/corporate-fleet" element={<CorporateFleet />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/ppf-vs-ceramic-coating-calgary" element={<BlogPPFvsCeramic />} />
        <Route path="/trailer-rv" element={<TrailerRV />} />
        <Route path="/rv-rental-fleet" element={<RVRentalFleet />} />
        <Route path="/trailer-rv/ppf" element={<RVPPF />} />
        <Route path="/terms-conditions" element={<Navigate to="/terms-of-service" replace />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/signup" element={<TrainingSignup />} />

        <Route path="/windshield-ppf" element={<WindshieldPPF />} />
        <Route path="/monthly-plan" element={<MonthlyPlan />} />
        <Route path="/marine" element={<MarineDetailing />} />
        <Route path="/ppf" element={<PaintProtectionFilm />} />
        <Route path="/window-tinting" element={<WindowTinting />} />
        <Route path="/calgary-detailing-price-comparison" element={<PriceComparison />} />

        {/* Dedicated landing routes */}
        <Route path="/auto-detailing" element={<AutoDetailing />} />
        <Route path="/rv-detailing" element={<RVDetailing />} />
        <Route path="/ceramic-coating" element={<CeramicCoating />} />
        <Route path="/paint-correction" element={<PaintCorrection />} />
        <Route path="/reviews" element={<Reviews />} />

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
        <Suspense fallback={<RouteFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  </HelmetProvider>
);

export default App;
