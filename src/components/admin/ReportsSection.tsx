
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ReportsTable } from "./reports/ReportsTable";
import { AddReportDialog } from "./reports/AddReportDialog";
import { Report } from "@/types/admin";

interface ReportsSectionProps {
  reports: Report[];
  onReportsChange: () => void;
}

export const ReportsSection = ({ reports, onReportsChange }: ReportsSectionProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Report
        </Button>
      </div>

      <ReportsTable reports={reports} onReportsChange={onReportsChange} />

      <AddReportDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onReportsChange={onReportsChange}
      />
    </div>
  );
};
