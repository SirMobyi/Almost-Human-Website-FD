import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollProgressBar from "./components/ScrollProgressBar";
import CustomCursor from "./components/CustomCursor";
import PullToRefreshIndicator from "./components/PullToRefreshIndicator";
import LoadingScreen from "./components/LoadingScreen";
import { usePullToRefresh } from "./hooks/usePullToRefresh";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pullDistance, isRefreshing } = usePullToRefresh({
    onRefresh: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollProgressBar />
      <PullToRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
