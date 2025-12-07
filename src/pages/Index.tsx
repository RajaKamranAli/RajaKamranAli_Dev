import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechStackSection from "@/components/TechStackSection";
import LiveDemoSection from "@/components/LiveDemoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <LiveDemoSection />
        <PortfolioSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
