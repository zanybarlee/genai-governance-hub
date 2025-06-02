
import { Badge } from "@/components/ui/badge";

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

interface ReportDetailsProps {
  report: AuditReport;
}

export const ReportDetails = ({ report }: ReportDetailsProps) => {
  const isAIExecutionReport = (report: AuditReport) => {
    return report.framework === "AI Audit Execution";
  };

  return (
    <div className="mt-6 pt-6 border-t">
      <h4 className="font-semibold text-primary-900 mb-4">Report Preview</h4>
      <div className="space-y-4 text-sm">
        {isAIExecutionReport(report) && report.aiResponse && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h5 className="font-medium mb-2 text-blue-900">AI Analysis Response</h5>
            <p className="text-blue-800 whitespace-pre-wrap">{report.aiResponse}</p>
          </div>
        )}
        
        <div className="p-4 bg-white border rounded">
          <h5 className="font-medium mb-2">Executive Summary</h5>
          <p className="text-gray-600">
            This {report.framework} audit assessed {report.controls.total} controls across multiple domains. 
            {report.controls.passed} controls passed testing while {report.controls.failed} controls 
            required remediation. {report.findings.total} findings were identified, including 
            {report.findings.critical} critical and {report.findings.high} high-risk items requiring 
            immediate attention.
          </p>
        </div>
        
        {isAIExecutionReport(report) && report.executionResults && (
          <div className="space-y-4">
            <h5 className="font-medium">Detailed Findings by Domain</h5>
            {report.executionResults.map((result, index) => (
              <div key={index} className="p-4 bg-white border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-medium">{result.domainName}</h6>
                  <Badge className={`${
                    result.riskLevel === 'critical' ? 'bg-red-100 text-red-800' :
                    result.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                    result.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {result.riskLevel} Risk
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-sm mb-1">Findings:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {result.findings.map((finding: string, idx: number) => (
                        <li key={idx}>• {finding}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Recommendations:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {result.recommendations.map((rec: string, idx: number) => (
                        <li key={idx}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isAIExecutionReport(report) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded">
              <h5 className="font-medium mb-2">Key Findings</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• User access review process gaps</li>
                <li>• Encryption policy compliance issues</li>
                <li>• Incident response documentation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white border rounded">
              <h5 className="font-medium mb-2">Recommendations</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Implement automated access reviews</li>
                <li>• Update encryption standards</li>
                <li>• Enhance monitoring controls</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
