
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string | null;
  file_path: string;
  created_at: string;
}

interface ReportsSectionProps {
  reports: Report[];
  onReportsChange: () => void;
}

export const ReportsSection = ({ reports, onReportsChange }: ReportsSectionProps) => {
  const [isAddReportOpen, setIsAddReportOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    file: null as File | null,
  });

  const handleAddReport = async () => {
    if (!newReport.file || !newReport.name) {
      toast.error("Please provide a name and file");
      return;
    }

    const fileExt = newReport.file.name.split(".").pop();
    const filePath = `reports/${newReport.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(filePath, newReport.file);

    if (uploadError) {
      toast.error("Error uploading file");
      return;
    }

    const { error: dbError } = await supabase
      .from("reports")
      .insert({
        name: newReport.name,
        description: newReport.description || null,
        file_path: filePath,
        file_type: newReport.file.type,
      });

    if (dbError) {
      toast.error("Error saving report metadata");
      // Clean up the uploaded file
      await supabase.storage.from("reports").remove([filePath]);
      return;
    }

    toast.success("Report added successfully");
    setIsAddReportOpen(false);
    onReportsChange();
    setNewReport({
      name: "",
      description: "",
      file: null,
    });
  };

  const handleDeleteReport = async (report: Report) => {
    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from("reports")
      .remove([report.file_path]);

    if (storageError) {
      toast.error("Error deleting file");
      return;
    }

    // Delete the database record
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

      <Dialog open={isAddReportOpen} onOpenChange={setIsAddReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Report</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Report Name</Label>
              <Input
                id="name"
                value={newReport.name}
                onChange={(e) =>
                  setNewReport({ ...newReport, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={newReport.description}
                onChange={(e) =>
                  setNewReport({ ...newReport, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">PDF File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    file: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReport}>Add Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
