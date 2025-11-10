import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ClientShowcase from "@/components/ClientShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import WorkSection from "@/components/WorkSection";
import PersonalProjectsSection from "@/components/PersonalProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <Hero />
        <ClientShowcase />
        <VideoShowcase />
        <WorkSection />
        <PersonalProjectsSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
