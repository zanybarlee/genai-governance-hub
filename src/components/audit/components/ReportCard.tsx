
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  CheckCircle,
  Bot
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

interface ReportCardProps {
  report: AuditReport;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export const ReportCard = ({ report, isSelected, onToggleSelect }: ReportCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "final": return "bg-green-100 text-green-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "final": return <CheckCircle className="h-4 w-4" />;
      case "review": return <Eye className="h-4 w-4" />;
      case "draft": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "text-red-600";
      case "high": return "text-orange-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const isAIExecutionReport = (report: AuditReport) => {
    return report.framework === "AI Audit Execution";
  };

  return (
    <div 
      className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={onToggleSelect}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {isAIExecutionReport(report) && (
            <Bot className="h-5 w-5 text-blue-600" />
          )}
          <h3 className="text-lg font-semibold text-primary-900">{report.name}</h3>
          <Badge className={getStatusColor(report.status)}>
            {getStatusIcon(report.status)}
            <span className="ml-1 capitalize">{report.status}</span>
          </Badge>
          {isAIExecutionReport(report) && (
            <Badge className="bg-blue-100 text-blue-800">
              AI Generated
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Framework</p>
          <p className="font-medium">{report.framework}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Auditor</p>
          <div className="flex items-center gap-2">
            {isAIExecutionReport(report) ? (
              <Bot className="h-4 w-4 text-blue-600" />
            ) : (
              <User className="h-4 w-4 text-gray-400" />
            )}
            <span className="font-medium">{report.auditor}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Completed</p>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{report.completedDate}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">Controls</p>
          <p className="font-medium">
            {report.controls.passed}/{report.controls.total} Passed
          </p>
        </div>
      </div>

      {/* Findings Summary */}
      <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{report.findings.total}</p>
          <p className="text-xs text-gray-600">Total Findings</p>
        </div>
        
        {report.findings.critical > 0 && (
          <div className="text-center">
            <p className={`text-lg font-bold ${getRiskColor('critical')}`}>
              {report.findings.critical}
            </p>
            <p className="text-xs text-gray-600">Critical</p>
          </div>
        )}
        
        {report.findings.high > 0 && (
          <div className="text-center">
            <p className={`text-lg font-bold ${getRiskColor('high')}`}>
              {report.findings.high}
            </p>
            <p className="text-xs text-gray-600">High</p>
          </div>
        )}
        
        {report.findings.medium > 0 && (
          <div className="text-center">
            <p className={`text-lg font-bold ${getRiskColor('medium')}`}>
              {report.findings.medium}
            </p>
            <p className="text-xs text-gray-600">Medium</p>
          </div>
        )}
        
        {report.findings.low > 0 && (
          <div className="text-center">
            <p className={`text-lg font-bold ${getRiskColor('low')}`}>
              {report.findings.low}
            </p>
            <p className="text-xs text-gray-600">Low</p>
          </div>
        )}
      </div>
    </div>
  );
};
