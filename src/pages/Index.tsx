import { lazy, Suspense, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load sections
const ClientShowcase = lazy(() => import("@/components/ClientShowcase"));
const VideoShowcase = lazy(() => import("@/components/VideoShowcase"));
const WorkSection = lazy(() => import("@/components/WorkSection"));
const PersonalProjectsSection = lazy(() => import("@/components/PersonalProjectsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const [loadSections, setLoadSections] = useState(false);

  useEffect(() => {
    // Start loading other sections after hero is mounted
    const timer = setTimeout(() => {
      setLoadSections(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <Hero />
        {loadSections && (
          <>
            <Suspense fallback={<Skeleton className="h-32 w-full" />}>
              <ClientShowcase />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <VideoShowcase />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <WorkSection />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <PersonalProjectsSection />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <ServicesSection />
            </Suspense>
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <ContactSection />
            </Suspense>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
