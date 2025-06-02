
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

  const formatMarkdownContent = (text: string) => {
    const lines = text.split('\n');
    const formattedLines: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('### ')) {
        // Main heading
        formattedLines.push(
          <h3 key={index} className="text-lg font-bold text-blue-800 mt-6 mb-3 border-b border-blue-200 pb-2">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        // Sub heading
        formattedLines.push(
          <h4 key={index} className="text-base font-semibold text-blue-700 mt-4 mb-2">
            {trimmedLine.replace('#### ', '')}
          </h4>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        // Bold section headers
        formattedLines.push(
          <div key={index} className="font-semibold text-blue-900 mt-3 mb-2">
            {trimmedLine.replace(/\*\*/g, '')}
          </div>
        );
      } else if (trimmedLine.startsWith('- **') && trimmedLine.includes('**:')) {
        // Bold bullet points with descriptions
        const parts = trimmedLine.match(/^- \*\*(.*?)\*\*: (.*)$/);
        if (parts) {
          formattedLines.push(
            <div key={index} className="ml-4 mb-2">
              <span className="font-semibold text-blue-800">• {parts[1]}:</span>
              <span className="ml-2 text-gray-700">{parts[2]}</span>
            </div>
          );
        }
      } else if (trimmedLine.startsWith('- ')) {
        // Regular bullet points
        formattedLines.push(
          <div key={index} className="ml-4 mb-1 text-gray-700">
            • {trimmedLine.replace('- ', '')}
          </div>
        );
      } else if (trimmedLine && !trimmedLine.startsWith('#')) {
        // Regular text
        formattedLines.push(
          <p key={index} className="mb-2 text-gray-700 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });
    
    return formattedLines;
  };

  return (
    <div className="mt-6 pt-6 border-t">
      <h4 className="font-semibold text-primary-900 mb-4">Report Preview</h4>
      <div className="space-y-4 text-sm">
        {isAIExecutionReport(report) && report.aiResponse && (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold mb-4 text-blue-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              AI Analysis Response
            </h5>
            <div className="prose prose-sm max-w-none">
              {formatMarkdownContent(report.aiResponse)}
            </div>
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
