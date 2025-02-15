
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReportsChange: () => void;
}

const REPORT_OPTIONS = [
  {
    name: 'McKinsey Report',
    description: 'The Future of Last-Mile Logistics: Latest Market Insights and Growth Projections'
  },
  {
    name: 'Deloitte Analysis',
    description: 'Underground Logistics Networks: A Revolutionary Approach to Urban Delivery'
  },
  {
    name: 'BMVI Report',
    description: 'Innovationsprogramm Logistik 2023: Future of Urban Mobility and Delivery'
  }
];

export const AddReportDialog = ({ 
  open, 
  onOpenChange, 
  onReportsChange 
}: AddReportDialogProps) => {
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleReportSelect = (reportName: string) => {
    const selectedReport = REPORT_OPTIONS.find(r => r.name === reportName);
    if (selectedReport) {
      setNewReport(prev => ({
        ...prev,
        name: selectedReport.name,
        description: selectedReport.description
      }));
    }
  };

  const handleAddReport = async () => {
    if (!newReport.file || !newReport.name) {
      toast.error("Please provide a name and file");
      return;
    }

    try {
      setIsUploading(true);

      // Create a sanitized file path
      const fileExt = newReport.file.name.split(".").pop();
      const timestamp = new Date().getTime();
      const sanitizedName = newReport.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filePath = `${sanitizedName}-${timestamp}.${fileExt}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("reports")
        .upload(filePath, newReport.file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Error uploading file");
        return;
      }

      // Insert the report metadata into the database
      const { error: dbError } = await supabase
        .from("reports")
        .insert({
          name: newReport.name,
          description: newReport.description,
          file_path: filePath,
          file_type: 'application/pdf' // Adding the required file_type field
        });

      if (dbError) {
        console.error("Database error:", dbError);
        // Clean up the uploaded file if database insert fails
        await supabase.storage.from("reports").remove([filePath]);
        toast.error("Error saving report metadata");
        return;
      }

      toast.success("Report added successfully");
      onOpenChange(false);
      onReportsChange();
      setNewReport({
        name: "",
        description: "",
        file: null,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
          <DialogDescription>Upload a new report to the system.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reportSelect">Select Report</Label>
            <Select onValueChange={handleReportSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_OPTIONS.map((report) => (
                  <SelectItem key={report.name} value={report.name}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file">PDF File</Label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setNewReport({
                  ...newReport,
                  file: e.target.files ? e.target.files[0] : null,
                })
              }
              className="border p-2 rounded"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddReport} 
            disabled={isUploading || !newReport.file || !newReport.name}
          >
            {isUploading ? "Uploading..." : "Add Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
