import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceBanners from "@/components/ServiceBanners";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ServiceBanners />
      <Hero />
    </div>
  );
};

export default Index;