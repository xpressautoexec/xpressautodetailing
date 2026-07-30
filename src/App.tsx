import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const InteriorDetailing = lazy(() => import("./pages/InteriorDetailing"));

const CompleteDetailing = lazy(() => import("./pages/CompleteDetailing"));
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
const AddOns = lazy(() => import("./pages/AddOns"));
const Training = lazy(() => import("./pages/Training"));
const TrainingSignup = lazy(() => import("./pages/TrainingSignup"));

const WindshieldPPF = lazy(() => import("./pages/WindshieldPPF"));
const MonthlyPlan = lazy(() => import("./pages/MonthlyPlan"));
const MarineDetailing = lazy(() => import("./pages/MarineDetailing"));
const PaintProtectionFilm = lazy(() => import("./pages/PaintProtectionFilm"));
const WindowTinting = lazy(() => import("./pages/WindowTinting"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/interior-detailing" element={<InteriorDetailing />} />
        
        <Route path="/complete-detailing" element={<CompleteDetailing />} />
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
        <Route path="/add-ons" element={<AddOns />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/signup" element={<TrainingSignup />} />
        
        <Route path="/windshield-ppf" element={<WindshieldPPF />} />
        <Route path="/monthly-plan" element={<MonthlyPlan />} />
        <Route path="/marine" element={<MarineDetailing />} />
        <Route path="/ppf" element={<PaintProtectionFilm />} />
        <Route path="/window-tinting" element={<WindowTinting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-brand-dark" />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
