
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";

interface AuditReport {
  id: string;
  name: string;
  framework: string;
  auditor: string;
  completedDate: string;
  status: "draft" | "review" | "final";
  findings: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  controls: {
    total: number;
    passed: number;
    failed: number;
  };
  executionResults?: any[];
  aiResponse?: string;
}

interface ReportSummaryStatsProps {
  reports: AuditReport[];
}

export const ReportSummaryStats = ({ reports }: ReportSummaryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-2xl font-bold">{reports.length}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Final Reports</p>
            <p className="text-2xl font-bold">{reports.filter(r => r.status === 'final').length}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Critical Findings</p>
            <p className="text-2xl font-bold">
              {reports.reduce((sum, r) => sum + r.findings.critical, 0)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Controls Tested</p>
            <p className="text-2xl font-bold">
              {reports.reduce((sum, r) => sum + r.controls.total, 0)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
