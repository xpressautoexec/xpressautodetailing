import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const InteriorDetailing = lazy(() => import("./pages/InteriorDetailing"));
const ExteriorDetailing = lazy(() => import("./pages/ExteriorDetailing"));
const CompleteDetailing = lazy(() => import("./pages/CompleteDetailing"));
const PaintCeramics = lazy(() => import("./pages/PaintCeramics"));
const CorporateFleet = lazy(() => import("./pages/CorporateFleet"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const TrailerRV = lazy(() => import("./pages/TrailerRV"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const WhyChooseUs = lazy(() => import("./pages/WhyChooseUs"));
const AddOns = lazy(() => import("./pages/AddOns"));
const Training = lazy(() => import("./pages/Training"));
const TrainingSignup = lazy(() => import("./pages/TrainingSignup"));
const MotorcycleDetailing = lazy(() => import("./pages/MotorcycleDetailing"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/interior-detailing" element={<InteriorDetailing />} />
        <Route path="/exterior-detailing" element={<ExteriorDetailing />} />
        <Route path="/complete-detailing" element={<CompleteDetailing />} />
        <Route path="/paint-ceramics" element={<PaintCeramics />} />
        <Route path="/corporate-fleet" element={<CorporateFleet />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/trailer-rv" element={<TrailerRV />} />
        <Route path="/terms-conditions" element={<TermsOfService />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/why-choose-us" element={<WhyChooseUs />} />
        <Route path="/add-ons" element={<AddOns />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/signup" element={<TrainingSignup />} />
        <Route path="/motorcycle-detailing" element={<MotorcycleDetailing />} />
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
