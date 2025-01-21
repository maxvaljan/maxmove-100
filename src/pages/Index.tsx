import Navbar from "@/components/Navbar";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";
import DeliveryFeatures from "@/components/DeliveryFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <DeliveryFeatures />
      <AppDownload />
    </div>
  );
};

export default Index;