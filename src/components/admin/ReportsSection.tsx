
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Report } from "@/types/admin";
import { AddReportDialog } from "./reports/AddReportDialog";
import { ReportsTable } from "./reports/ReportsTable";

interface ReportsSectionProps {
  reports: Report[];
  onReportsChange: () => void;
}

export const ReportsSection = ({ reports, onReportsChange }: ReportsSectionProps) => {
  const [isAddReportOpen, setIsAddReportOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Reports</h3>
        <Button
          variant="default"
          className="bg-maxmove-500 hover:bg-maxmove-600"
          onClick={() => setIsAddReportOpen(true)}
        >
          Add Report
        </Button>
      </div>

      <ReportsTable reports={reports} onReportsChange={onReportsChange} />

      <AddReportDialog
        open={isAddReportOpen}
        onOpenChange={setIsAddReportOpen}
        onReportsChange={onReportsChange}
      />
    </div>
  );
};
