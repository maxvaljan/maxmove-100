import Navbar from "@/components/Navbar";
import { AnimatedHero } from "@/components/ui/animated-hero";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnimatedHero />
      <ServiceBanners />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Index;