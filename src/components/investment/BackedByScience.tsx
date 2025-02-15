
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BackedByScience = () => {
  const getReportUrl = (reportName: string) => {
    switch (reportName) {
      case 'BMVI Report':
        return 'https://xuehdmslktlsgpoexilo.supabase.co/storage/v1/object/public/reports//BMVI%20Innovationsprogramm%20Logistik%202030.pdf';
      case 'Deloitte Analysis':
        return 'https://xuehdmslktlsgpoexilo.supabase.co/storage/v1/object/public/reports//Deloitte Consulting Global Smart Last-Mile Logistics Outlook.pdf';
      case 'McKinsey Report':
        return 'https://xuehdmslktlsgpoexilo.supabase.co/storage/v1/object/public/reports//Mckinsey Digitizing mid- and last-mile logistics handovers to reduce waste.pdf';
      default:
        return '';
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Backed by Science</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['BMVI Report', 'Deloitte Analysis', 'McKinsey Report'].map((reportName) => (
            <Card key={reportName} className="bg-white/5 backdrop-blur-sm border-gray-800">
              <CardHeader className="flex flex-col flex-1">
                <div className="flex-1">
                  <CardTitle className="text-white">{reportName}</CardTitle>
                  <CardDescription className="text-gray-400 min-h-[3rem]">
                    {reportName === 'BMVI Report' && 'Innovationsprogramm Logistik 2023: Government Report on the Future of Logistics in Germany'}
                    {reportName === 'Deloitte Analysis' && 'Global Smart Last-Mile Logistics Outlook'}
                    {reportName === 'McKinsey Report' && 'Digitizing mid- and last-mile logistics handovers to reduce waste'}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-700 text-[#1A1F2C] hover:bg-white/5 hover:text-white hover:border-transparent transition-all duration-300"
                  onClick={() => window.open(getReportUrl(reportName), '_blank')}
                >
                  View
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackedByScience;
