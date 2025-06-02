import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Bot
} from "lucide-react";
import { useState, useEffect } from "react";
import { executionSessionStorage } from "./utils/executionSessionStorage";
import { AuditExecutionSession } from "./hooks/useAuditExecution";

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

// Keep existing mock reports
const mockReports: AuditReport[] = [
  {
    id: "1",
    name: "Q3 SOC 2 Type II Audit Report",
    framework: "SOC 2",
    auditor: "David Lim",
    completedDate: "2024-10-15",
    status: "final",
    findings: { total: 5, critical: 1, high: 2, medium: 2, low: 0 },
    controls: { total: 24, passed: 19, failed: 5 }
  },
  {
    id: "2",
    name: "NIST Cybersecurity Framework Assessment",
    framework: "NIST CSF",
    auditor: "Mike Johnson",
    completedDate: "2024-11-20",
    status: "review",
    findings: { total: 7, critical: 2, high: 3, medium: 2, low: 0 },
    controls: { total: 23, passed: 16, failed: 7 }
  },
  {
    id: "3",
    name: "ISO 27001 Quarterly Review",
    framework: "ISO 27001",
    auditor: "Sarah Wilson",
    completedDate: "2024-11-25",
    status: "draft",
    findings: { total: 12, critical: 0, high: 4, medium: 6, low: 2 },
    controls: { total: 45, passed: 33, failed: 12 }
  }
];

export const AuditReports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [executionSessions, setExecutionSessions] = useState<AuditExecutionSession[]>([]);
  const [allReports, setAllReports] = useState<AuditReport[]>(mockReports);

  useEffect(() => {
    // Load execution sessions and convert them to reports
    const sessions = executionSessionStorage.loadSessions();
    setExecutionSessions(sessions);

    // Convert execution sessions to audit reports
    const executionReports: AuditReport[] = sessions
      .filter(session => session.executionResults && session.executionResults.length > 0)
      .map(session => {
        const findings = session.executionResults.reduce((acc, result) => {
          acc.total += result.findings.length;
          switch (result.riskLevel) {
            case 'critical': acc.critical += result.findings.length; break;
            case 'high': acc.high += result.findings.length; break;
            case 'medium': acc.medium += result.findings.length; break;
            case 'low': acc.low += result.findings.length; break;
          }
          return acc;
        }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });

        return {
          id: `execution-${session.id}`,
          name: session.name,
          framework: "AI Audit Execution",
          auditor: "AI Agent",
          completedDate: session.lastUpdated.toLocaleDateString(),
          status: "final" as const,
          findings,
          controls: {
            total: session.selectedDomains.length,
            passed: session.executionResults.filter(r => r.status === 'completed').length,
            failed: session.executionResults.filter(r => r.status === 'failed').length
          },
          executionResults: session.executionResults,
          aiResponse: session.aiResponse
        };
      });

    // Combine mock reports with execution reports
    setAllReports([...executionReports, ...mockReports]);
  }, []);

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
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold">{allReports.length}</p>
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
              <p className="text-2xl font-bold">{allReports.filter(r => r.status === 'final').length}</p>
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
                {allReports.reduce((sum, r) => sum + r.findings.critical, 0)}
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
                {allReports.reduce((sum, r) => sum + r.controls.total, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-6">Audit Reports</h2>
        
        <div className="space-y-4">
          {allReports.map((report) => (
            <div 
              key={report.id} 
              className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
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

              {/* Expanded Details */}
              {selectedReport === report.id && (
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
                                  {result.findings.map((finding, idx) => (
                                    <li key={idx}>• {finding}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-medium text-sm mb-1">Recommendations:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {result.recommendations.map((rec, idx) => (
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
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
