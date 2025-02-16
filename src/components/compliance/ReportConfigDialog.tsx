
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportConfig {
  startDate: Date;
  endDate: Date;
  format: 'pdf' | 'csv' | 'excel';
  includeSections: {
    summary: boolean;
    details: boolean;
    metrics: boolean;
    recommendations: boolean;
  };
}

interface ReportConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportType: 'monthly' | 'audit' | null;
  config: ReportConfig;
  onConfigChange: (config: ReportConfig) => void;
  onGenerate: () => void;
}

export const ReportConfigDialog = ({
  open,
  onOpenChange,
  reportType,
  config,
  onConfigChange,
  onGenerate,
}: ReportConfigDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Report</DialogTitle>
          <DialogDescription>
            Customize your {reportType === 'monthly' ? 'monthly compliance' : 'audit log'} report
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Start Date</Label>
                <Calendar
                  mode="single"
                  selected={config.startDate}
                  onSelect={(date) => date && onConfigChange({...config, startDate: date})}
                  className="rounded-md border"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-500">End Date</Label>
                <Calendar
                  mode="single"
                  selected={config.endDate}
                  onSelect={(date) => date && onConfigChange({...config, endDate: date})}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Report Format</Label>
            <Select
              value={config.format}
              onValueChange={(value: 'pdf' | 'csv' | 'excel') => 
                onConfigChange({...config, format: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                <SelectItem value="excel">Excel Workbook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Include Sections</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'summary', label: 'Executive Summary' },
                { id: 'details', label: 'Detailed Analysis' },
                { id: 'metrics', label: 'Metrics & KPIs' },
                { id: 'recommendations', label: 'Recommendations' },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={config.includeSections[id as keyof typeof config.includeSections]}
                    onCheckedChange={(checked) => 
                      onConfigChange({
                        ...config,
                        includeSections: {
                          ...config.includeSections,
                          [id]: checked as boolean
                        }
                      })}
                  />
                  <label htmlFor={id} className="text-sm">{label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onGenerate}>
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
