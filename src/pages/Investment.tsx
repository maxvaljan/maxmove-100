
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
  const { 
    reports, 
    isAdmin, 
    isLoadingReports,
    uploadReport, 
    downloadReport, 
    checkAdminStatus 
  } = useReports();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleUpload = (file: File, reportName: string) => {
    uploadReport({ file, reportName });
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />
      <Hero />
      <BackedByScience 
        reports={reports}
        isAdmin={isAdmin}
        onUpload={handleUpload}
        onDownload={downloadReport}
        isLoading={isLoadingReports}
      />
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
