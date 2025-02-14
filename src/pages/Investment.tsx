
import { DollarSign } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Hero from "@/components/investment/Hero";
import BackedByScience from "@/components/investment/BackedByScience";
import Info from "@/components/investment/Info";
import Future from "@/components/investment/Future";
import CTASection from "@/components/investment/CTASection";

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
      
      {/* Funding Section */}
      <section className="py-20 relative bg-[#0d0f1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Funding</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-[#1a1c2e] backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/80 transition-all duration-300">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Current Funding Round</CardTitle>
                <CardDescription className="text-gray-400">
                  We are currently in the process for EXIST grant and looking to raise €15M next year 
                  to build the first underground autonomous robots logistics pilot project. This funding will 
                  enable us to revolutionize urban logistics with cutting-edge autonomous technology.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Hyperlogistics Section */}
      <section className="py-16 relative bg-[#0d0f1a]">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-white">What is Hyperlogistics?</h2>
          <p className="text-lg text-gray-400">
            Hyperlogistics means ultra-fast delivery, where items can move across cities in minutes or even seconds, 
            at a minimal cost. This redefines how we think about and access goods.
          </p>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Investment;

