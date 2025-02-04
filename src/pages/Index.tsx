import Navbar from "@/components/Navbar";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";
import DeliveryFeatures from "@/components/DeliveryFeatures";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <DeliveryFeatures />
      <AppDownload />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;