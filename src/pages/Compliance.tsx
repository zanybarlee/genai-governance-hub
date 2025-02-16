import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Activity,
  CheckCircle2,
  Download,
  Loader2,
  Calendar
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    
    // Simulate report generation with config
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Reports</CardTitle>
                      <CardDescription>
                        Generate and download compliance reports
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={() => openReportConfig('monthly')}
                        className="w-full flex items-center gap-2"
                        disabled={isGenerating !== null}
                      >
                        {isGenerating === 'monthly' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        {isGenerating === 'monthly' ? 'Generating...' : 'Generate Monthly Report'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => openReportConfig('audit')}
                        className="w-full flex items-center gap-2"
                        disabled={isGenerating !== null}
                      >
                        {isGenerating === 'audit' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Activity className="h-4 w-4" />
                        )}
                        {isGenerating === 'audit' ? 'Generating...' : 'Generate Audit Log'}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Alerts</CardTitle>
                      <CardDescription>
                        Policy breach notifications
                      </CardDescription>
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

      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
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
                  <CalendarComponent
                    mode="single"
                    selected={reportConfig.startDate}
                    onSelect={(date) => date && setReportConfig({...reportConfig, startDate: date})}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-500">End Date</Label>
                  <CalendarComponent
                    mode="single"
                    selected={reportConfig.endDate}
                    onSelect={(date) => date && setReportConfig({...reportConfig, endDate: date})}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Report Format</Label>
              <Select
                value={reportConfig.format}
                onValueChange={(value: 'pdf' | 'csv' | 'excel') => 
                  setReportConfig({...reportConfig, format: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  <SelectItem value="excel">Excel Workbook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Include Sections</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={reportConfig.includeSections.summary}
                    onCheckedChange={(checked) => 
                      setReportConfig({
                        ...reportConfig,
                        includeSections: {
                          ...reportConfig.includeSections,
                          summary: checked as boolean
                        }
                      })}
                  />
                  <label htmlFor="summary" className="text-sm">Executive Summary</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="details"
                    checked={reportConfig.includeSections.details}
                    onCheckedChange={(checked) => 
                      setReportConfig({
                        ...reportConfig,
                        includeSections: {
                          ...reportConfig.includeSections,
                          details: checked as boolean
                        }
                      })}
                  />
                  <label htmlFor="details" className="text-sm">Detailed Analysis</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="metrics"
                    checked={reportConfig.includeSections.metrics}
                    onCheckedChange={(checked) => 
                      setReportConfig({
                        ...reportConfig,
                        includeSections: {
                          ...reportConfig.includeSections,
                          metrics: checked as boolean
                        }
                      })}
                  />
                  <label htmlFor="metrics" className="text-sm">Metrics & KPIs</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommendations"
                    checked={reportConfig.includeSections.recommendations}
                    onCheckedChange={(checked) => 
                      setReportConfig({
                        ...reportConfig,
                        includeSections: {
                          ...reportConfig.includeSections,
                          recommendations: checked as boolean
                        }
                      })}
                  />
                  <label htmlFor="recommendations" className="text-sm">Recommendations</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancel
            </Button>
            <Button onClick={generateReport}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Generated Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Generated</DialogTitle>
            <DialogDescription>
              Your report has been generated successfully
            </DialogDescription>
          </DialogHeader>
          {currentReport && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="font-medium">
                    {currentReport.type === 'monthly' ? 'Monthly Compliance Report' : 'Audit Log Report'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Generated on</span>
                  <span className="font-medium">{currentReport.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Size</span>
                  <span className="font-medium">{currentReport.size}</span>
                </div>
              </div>
              <Button 
                className="w-full flex items-center justify-center gap-2"
                onClick={downloadReport}
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Compliance;
