
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
                      <div className="border rounded-lg p-4 bg-warning/10 border-warning">
                        <p className="text-sm font-medium text-warning">Policy Breach Alert</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Data privacy policy violation detected in AI Model X
                        </p>
                        <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                      </div>
                      <div className="border rounded-lg p-4 bg-warning/10 border-warning">
                        <p className="text-sm font-medium text-warning">Performance Alert</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Model accuracy dropped below threshold
                        </p>
                        <p className="text-xs text-gray-500 mt-2">5 hours ago</p>
                      </div>
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
    </SidebarProvider>
  );
};

export default Compliance;
