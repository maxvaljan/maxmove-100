import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <Hero />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Index;