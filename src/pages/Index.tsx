import Navbar from "@/components/Navbar";
import ServiceBanners from "@/components/ServiceBanners";
import AppDownload from "@/components/AppDownload";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <AppDownload />
    </div>
  );
};

export default Index;