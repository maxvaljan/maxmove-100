
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Report {
  id: string;
  name: string;
  description: string;
  file_path: string;
}

export const useReports = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: reports = [], isLoading: isLoadingReports } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*');
      
      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }

      return data || [];
    }
  });

  const { mutate: uploadReport } = useMutation({
    mutationFn: async ({ file, reportName }: { file: File; reportName: string }) => {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('reports')
        .upload(`reports/${reportName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('reports')
        .insert({
          name: reportName,
          file_path: uploadData.path,
          file_type: 'application/pdf',
          description: reportName
        });

      if (dbError) throw dbError;

      return uploadData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Success",
        description: "Report uploaded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message,
      });
    }
  });

  const { mutate: downloadReport } = useMutation({
    mutationFn: async (report: Report) => {
      const { data, error } = await supabase.storage
        .from('reports')
        .download(report.file_path);

      if (error) throw error;

      return { data, name: report.name };
    },
    onSuccess: ({ data, name }) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = name + '.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: error.message,
      });
    }
  });

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

  return {
    reports,
    isAdmin,
    isLoadingReports,
    uploadReport,
    downloadReport,
    checkAdminStatus
  };
};
