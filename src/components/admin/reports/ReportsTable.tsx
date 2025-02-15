
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download } from "lucide-react";
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

  const handleDownload = async (report: Report) => {
    const { data, error } = await supabase.storage
      .from("reports")
      .download(report.file_path);

    if (error) {
      toast.error("Error downloading file");
      return;
    }

    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name}.${report.file_path.split(".").pop()}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
                    onClick={() => handleDownload(report)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteReport(report)}
                  >
                    Delete
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
