
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, CheckCircle, AlertTriangle, XCircle, FileText } from "lucide-react";

export const SystemAuditDashboard = () => {
  const stats = [
    {
      title: "Artifacts Scanned",
      value: "247",
      change: "+12% from last week",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Compliance Score",
      value: "87%",
      change: "+3% improvement",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Critical Issues",
      value: "5",
      change: "-2 resolved",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Failed Checks",
      value: "12",
      change: "-8 from last scan",
      icon: XCircle,
      color: "text-red-600"
    }
  ];

  const recentScans = [
    { name: "API Gateway Config", status: "Compliant", score: 95, timestamp: "2 hours ago" },
    { name: "Database Schema", status: "Warning", score: 78, timestamp: "4 hours ago" },
    { name: "Security Policies", status: "Compliant", score: 92, timestamp: "6 hours ago" },
    { name: "Network Configuration", status: "Failed", score: 45, timestamp: "8 hours ago" },
    { name: "Authentication Service", status: "Compliant", score: 88, timestamp: "1 day ago" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case "Warning":
        return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent System Scans
          </CardTitle>
          <CardDescription>
            Latest compliance checks performed on system artifacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentScans.map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{scan.name}</h4>
                    {getStatusBadge(scan.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{scan.timestamp}</p>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="text-lg font-semibold">{scan.score}%</div>
                  <Progress value={scan.score} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
