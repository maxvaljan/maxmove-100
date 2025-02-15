
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/investment/Hero";
import BackedByScience from "@/components/investment/BackedByScience";
import Info from "@/components/investment/Info";
import Future from "@/components/investment/Future";
import CTASection from "@/components/investment/CTASection";
import FundingSection from "@/components/investment/FundingSection";
import HyperlogisticsSection from "@/components/investment/HyperlogisticsSection";
import { useReports } from "@/hooks/useReports";

const Investment = () => {
  const { checkAdminStatus } = useReports();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />
      <Hero />
      <BackedByScience />
      <Info />
      <Future />
      <FundingSection />
      <HyperlogisticsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Investment;
