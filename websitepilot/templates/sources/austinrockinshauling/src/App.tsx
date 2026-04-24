import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DemolitionService from "./pages/DemolitionService";
import DirtWorkService from "./pages/DirtWorkService";
import SkidSteerService from "./pages/SkidSteerService";
import DumpTrailerService from "./pages/DumpTrailerService";
import WestValleyServiceArea from "./pages/WestValleyServiceArea";
import EastValleyServiceArea from "./pages/EastValleyServiceArea";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/demolition" element={<DemolitionService />} />
            <Route path="/demolition-services" element={<DemolitionService />} />
            <Route path="/services/dirt-work" element={<DirtWorkService />} />
            <Route path="/dirt-work-phoenix-az" element={<DirtWorkService />} />
            <Route path="/services/skid-steer" element={<SkidSteerService />} />
            <Route path="/skid-steer-services-phoenix-az" element={<SkidSteerService />} />
            <Route path="/services/dump-trailer" element={<DumpTrailerService />} />
            <Route path="/dump-trailer-rental" element={<DumpTrailerService />} />
            <Route path="/service-areas/west-valley-phoenix-az" element={<WestValleyServiceArea />} />
            <Route path="/service-areas/east-valley-phoenix-az" element={<EastValleyServiceArea />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
