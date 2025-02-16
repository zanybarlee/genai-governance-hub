import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertTriangle, FileText, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ReportConfigDialog } from "@/components/compliance/ReportConfigDialog";
import { ReportGeneratedDialog } from "@/components/compliance/ReportGeneratedDialog";
import { ReportsSection } from "@/components/compliance/ReportsSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  recommendations: string[];
  affectedSystems: string[];
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Policy Breach Alert",
    description: "Data privacy policy violation detected in AI Model X",
    timestamp: "2 hours ago",
    severity: "high",
    impact: "Potential exposure of sensitive data patterns in model outputs",
    recommendations: [
      "Review model training data for sensitive information",
      "Implement additional data sanitization steps",
      "Update data privacy compliance checks"
    ],
    affectedSystems: [
      "AI Model X",
      "Data Processing Pipeline",
      "Output Validation System"
    ]
  },
  {
    id: "2",
    title: "Performance Alert",
    description: "Model accuracy dropped below threshold",
    timestamp: "5 hours ago",
    severity: "medium",
    impact: "Reduced prediction accuracy affecting service quality",
    recommendations: [
      "Analyze recent model inputs for anomalies",
      "Review model retraining schedule",
      "Check for data drift patterns"
    ],
    affectedSystems: [
      "Model Performance Monitoring",
      "Prediction Service",
      "Quality Assurance System"
    ]
  }
];

const defaultConfig: ReportConfig = {
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  endDate: new Date(),
  format: 'pdf',
  includeSections: {
    summary: true,
    details: true,
    metrics: true,
    recommendations: true,
  },
};

const Compliance = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [reportType, setReportType] = useState<'monthly' | 'audit' | null>(null);
  const [reportConfig, setReportConfig] = useState<ReportConfig>(defaultConfig);
  const [currentReport, setCurrentReport] = useState<{
    type: 'monthly' | 'audit';
    date: string;
    size: string;
  } | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const openReportConfig = (type: 'monthly' | 'audit') => {
    setReportType(type);
    setReportConfig(defaultConfig);
    setShowConfigDialog(true);
  };

  const generateReport = () => {
    if (!reportType) return;
    
    setShowConfigDialog(false);
    setIsGenerating(reportType);
    
    setTimeout(() => {
      setIsGenerating(null);
      
      const report = {
        type: reportType,
        date: new Date().toLocaleDateString(),
        size: '2.4 MB'
      };
      
      setCurrentReport(report);
      setShowReportDialog(true);
      
      toast({
        title: "Report Generated Successfully",
        description: `Your ${reportType === 'monthly' ? 'monthly compliance' : 'audit log'} report is ready to download.`,
      });
    }, 2000);
  };

  const downloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your report download will begin shortly.",
    });
    setShowReportDialog(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl space-y-8">
              {/* Header Section */}
              <div>
                <h1 className="text-3xl font-bold text-primary-900">Compliance Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Monitor and manage AI governance compliance
                </p>
              </div>

              {/* KPI Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Compliance Score"
                  value="94%"
                  icon={<ShieldCheck className="h-6 w-6 text-primary-600" />}
                  trend={{ value: 2.5, positive: true }}
                />
                <StatCard
                  title="Active Policies"
                  value="12"
                  icon={<FileText className="h-6 w-6 text-primary-600" />}
                />
                <StatCard
                  title="Open Incidents"
                  value="3"
                  icon={<AlertTriangle className="h-6 w-6 text-warning" />}
                  trend={{ value: 1, positive: false }}
                />
                <StatCard
                  title="Audits Completed"
                  value="28"
                  icon={<CheckCircle2 className="h-6 w-6 text-success" />}
                  trend={{ value: 12, positive: true }}
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ActivityFeed />
                </div>

                {/* Reports & Actions */}
                <div className="space-y-6">
                  <ReportsSection
                    isGenerating={isGenerating}
                    onGenerateReport={openReportConfig}
                  />

                  {/* Recent Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="border rounded-lg p-4 bg-warning/10 border-warning cursor-pointer hover:bg-warning/20 transition-colors"
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <p className="text-sm font-medium text-warning">{alert.title}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ReportConfigDialog
        open={showConfigDialog}
        onOpenChange={setShowConfigDialog}
        reportType={reportType}
        config={reportConfig}
        onConfigChange={setReportConfig}
        onGenerate={generateReport}
      />

      <ReportGeneratedDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        report={currentReport}
        onDownload={downloadReport}
      />

      {/* Alert Details Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={(open) => !open && setSelectedAlert(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAlert && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <DialogTitle>{selectedAlert.title}</DialogTitle>
                </div>
                <DialogDescription>
                  Reported {selectedAlert.timestamp}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                  <p className="text-sm">{selectedAlert.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Severity</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAlert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    selectedAlert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedAlert.severity.charAt(0).toUpperCase() + selectedAlert.severity.slice(1)}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Impact</h4>
                  <p className="text-sm">{selectedAlert.impact}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Affected Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedSystems.map((system, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Recommendations</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedAlert.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Compliance;
