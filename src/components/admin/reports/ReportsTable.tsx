
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Report } from "@/types/admin";

interface ReportsTableProps {
  reports: Report[];
  onReportsChange: () => void;
}

export const ReportsTable = ({ reports, onReportsChange }: ReportsTableProps) => {
  const handleDeleteReport = async (report: Report) => {
    const { error: storageError } = await supabase.storage
      .from("reports")
      .remove([report.file_path]);

    if (storageError) {
      toast.error("Error deleting file");
      return;
    }

    const { error: dbError } = await supabase
      .from("reports")
      .delete()
      .eq("id", report.id);

    if (dbError) {
      toast.error("Error deleting report metadata");
      return;
    }

    toast.success("Report deleted successfully");
    onReportsChange();
  };

  const handleOpenReport = async (report: Report) => {
    try {
      const { data } = await supabase.storage
        .from('reports')
        .createSignedUrl(report.file_path, 60 * 60); // URL valid for 1 hour

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      } else {
        toast.error("Error accessing report");
      }
    } catch (error) {
      toast.error("Error accessing report");
      console.error("Error opening report:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.name}</TableCell>
              <TableCell>{report.description}</TableCell>
              <TableCell>
                {new Date(report.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenReport(report)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteReport(report)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
