
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Report {
  id: string;
  name: string;
  description: string;
  file_path: string;
}

interface BackedByScienceProps {
  reports: Report[];
  isAdmin: boolean;
  onUpload: (file: File, reportName: string) => Promise<void>;
  onDownload: (report: Report) => Promise<void>;
}

const BackedByScience = ({ reports, isAdmin, onUpload }: BackedByScienceProps) => {
  const handleOpenReport = async (report: Report) => {
    try {
      const { data, error } = await supabase.storage
        .from('reports')
        .createSignedUrl(report.file_path, 60 * 60); // URL valid for 1 hour

      if (error) {
        toast.error("Error accessing report");
        console.error("Error accessing report:", error);
        return;
      }

      if (data?.signedUrl) {
        // Open in new window
        window.open(data.signedUrl, '_blank');
      } else {
        toast.error("Error accessing report");
      }
    } catch (error) {
      toast.error("Error accessing report");
      console.error("Error opening report:", error);
    }
  };

  const getReportPath = (reportName: string) => {
    switch (reportName) {
      case 'BMVI Report':
        return '/reports//bmvi-report-1739624146460.pdf';
      case 'Deloitte Analysis':
        return '/reports//Deloitte Consulting Global Smart Last-Mile Logistics Outlook.pdf';
      case 'McKinsey Report':
        return '/reports//Mckinsey Digitizing mid- and last-mile logistics handovers to reduce waste.pdf';
      default:
        return '';
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Backed by Science</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['BMVI Report', 'Deloitte Analysis', 'McKinsey Report'].map((reportName) => {
            const report = reports.find(r => r.name === reportName);
            const reportPath = getReportPath(reportName);
            
            return (
              <Card key={reportName} className="bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{reportName}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {reportName === 'BMVI Report' && 'Innovationsprogramm Logistik 2023: Government Report on the Future of Logistics in Germany'}
                    {reportName === 'Deloitte Analysis' && 'Global Smart Last-Mile Logistics Outlook'}
                    {reportName === 'McKinsey Report' && 'Digitizing mid- and last-mile logistics handovers to reduce waste'}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-white/5"
                    onClick={() => window.open(`https://xuehdmslktlsgpoexilo.supabase.co/storage/v1/object/public${reportPath}`, '_blank')}
                  >
                    View
                  </Button>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BackedByScience;
