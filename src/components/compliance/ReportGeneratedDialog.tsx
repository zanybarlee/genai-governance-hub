
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";

interface ReportGeneratedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    type: 'monthly' | 'audit';
    date: string;
    size: string;
  } | null;
  onDownload: () => void;
}

export const ReportGeneratedDialog = ({
  open,
  onOpenChange,
  report,
  onDownload,
}: ReportGeneratedDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Generated</DialogTitle>
          <DialogDescription>
            Your report has been generated successfully
          </DialogDescription>
        </DialogHeader>
        {report && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type</span>
                <span className="font-medium">
                  {report.type === 'monthly' ? 'Monthly Compliance Report' : 'Audit Log Report'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Generated on</span>
                <span className="font-medium">{report.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Size</span>
                <span className="font-medium">{report.size}</span>
              </div>
            </div>
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={onDownload}
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
