
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/investment/Hero";
import BackedByScience from "@/components/investment/BackedByScience";
import Info from "@/components/investment/Info";
import Future from "@/components/investment/Future";
import CTASection from "@/components/investment/CTASection";
import FundingSection from "@/components/investment/FundingSection";
import HyperlogisticsSection from "@/components/investment/HyperlogisticsSection";

interface Report {
  id: string;
  name: string;
  description: string;
  file_path: string;
}

const Investment = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchReports();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(data?.role === 'admin');
    }
  };

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*');
    
    if (error) {
      console.error('Error fetching reports:', error);
      return;
    }

    if (data) {
      setReports(data);
    }
  };

  const handleUpload = async (file: File, reportName: string) => {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('reports')
      .upload(`reports/${reportName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`, file);

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: uploadError.message,
      });
      return;
    }

    const { error: dbError } = await supabase
      .from('reports')
      .insert({
        name: reportName,
        file_path: uploadData.path,
        file_type: 'application/pdf',
        description: reportName
      });

    if (dbError) {
      toast({
        variant: "destructive",
        title: "Failed to save report metadata",
        description: dbError.message,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Report uploaded successfully",
    });

    fetchReports();
  };

  const handleDownload = async (report: Report) => {
    const { data, error } = await supabase.storage
      .from('reports')
      .download(report.file_path);

    if (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: error.message,
      });
      return;
    }

    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.name + '.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />
      <Hero />
      <BackedByScience 
        reports={reports}
        isAdmin={isAdmin}
        onUpload={handleUpload}
        onDownload={handleDownload}
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
