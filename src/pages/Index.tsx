import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <Hero />
      <AppDownload />
    </div>
  );
};

export default Index;