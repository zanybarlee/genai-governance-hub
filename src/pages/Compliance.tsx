
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
  CheckCircle2
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

const Compliance = () => {
  const { toast } = useToast();

  const generateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your compliance report is being generated and will be ready shortly.",
    });
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
                {/* Activity Feed */}
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
                        onClick={generateReport}
                        className="w-full flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Generate Monthly Report
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={generateReport}
                        className="w-full flex items-center gap-2"
                      >
                        <Activity className="h-4 w-4" />
                        Generate Audit Log
                      </Button>
                    </CardContent>
                  </Card>

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
    </SidebarProvider>
  );
};

export default Compliance;
