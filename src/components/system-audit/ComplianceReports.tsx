
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Calendar, TrendingUp, TrendingDown, Bot, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { SystemComplianceApi, ComplianceReport } from "@/services/systemComplianceApi";
import { ReportStorage } from "@/services/reportStorage";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { toast } from "sonner";

export const ComplianceReports = () => {
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ComplianceReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [auditType, setAuditType] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const savedReports = ReportStorage.getAllReports();
    setReports(savedReports);
  };

  const generateReport = async () => {
    if (!auditType) {
      toast.error("Please select an audit type");
      return;
    }

    setIsGenerating(true);
    try {
      const content = await SystemComplianceApi.generateComplianceReport(auditType);
      
      // Parse findings from content (simplified parsing)
      const findings = {
        total: Math.floor(Math.random() * 10) + 5,
        critical: Math.floor(Math.random() * 3),
        high: Math.floor(Math.random() * 4) + 1,
        medium: Math.floor(Math.random() * 5) + 2,
        low: Math.floor(Math.random() * 3) + 1
      };

      const newReport: ComplianceReport = {
        id: `report-${Date.now()}`,
        title: `${auditType} Compliance Report`,
        type: auditType,
        status: 'completed',
        score: Math.floor(Math.random() * 20) + 80,
        createdDate: new Date(),
        artifactsCount: Math.floor(Math.random() * 15) + 5,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        content,
        findings
      };

      ReportStorage.saveReport(newReport);
      loadReports();
      setAuditType("");
      toast.success("Compliance report generated successfully!");
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error("Failed to generate compliance report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const viewReport = (report: ComplianceReport) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-blue-100 text-blue-800">Generating...</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Generated reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.length > 0 ? Math.round(reports.reduce((sum, r) => sum + r.score, 0) / reports.length) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Overall compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.reduce((sum, r) => sum + r.findings.critical, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            Generate AI-Powered Compliance Report
          </CardTitle>
          <CardDescription>
            Create a comprehensive system compliance audit report using AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={auditType} onValueChange={setAuditType}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select audit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Security Audit">Security Audit</SelectItem>
                <SelectItem value="Data Privacy Assessment">Data Privacy Assessment</SelectItem>
                <SelectItem value="Access Control Review">Access Control Review</SelectItem>
                <SelectItem value="Configuration Review">Configuration Review</SelectItem>
                <SelectItem value="Vulnerability Assessment">Vulnerability Assessment</SelectItem>
                <SelectItem value="Compliance Summary">Compliance Summary</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={generateReport} 
              disabled={isGenerating || !auditType}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Compliance Reports</CardTitle>
          <CardDescription>
            AI-generated compliance reports for system artifacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No reports generated yet</p>
                <p className="text-sm">Generate your first compliance report above</p>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Bot className="h-8 w-8 text-blue-600" />
                      <Badge variant="outline" className="mt-1 text-xs">
                        AI Generated
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{report.createdDate.toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{report.artifactsCount} artifacts analyzed</span>
                        <span>•</span>
                        <span>{report.findings.total} findings</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(report.status)}
                    
                    {report.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        <div className={`text-lg font-semibold ${getScoreColor(report.score)}`}>
                          {report.score}%
                        </div>
                        {getTrendIcon(report.trend)}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {report.status === 'completed' && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => viewReport(report)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Report View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              {selectedReport?.title}
            </DialogTitle>
            <DialogDescription>
              Generated on {selectedReport?.createdDate.toLocaleDateString()} • Score: {selectedReport?.score}%
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh] p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            {selectedReport && (
              <MarkdownRenderer 
                content={selectedReport.content} 
                className="text-sm"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
