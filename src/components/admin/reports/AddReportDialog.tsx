
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      await supabase.storage.from("reports").remove([filePath]);
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
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
            <Input
              id="description"
              value={newReport.description}
              onChange={(e) =>
                setNewReport({ ...newReport, description: e.target.value })
              }
              readOnly
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddReport}>Add Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
