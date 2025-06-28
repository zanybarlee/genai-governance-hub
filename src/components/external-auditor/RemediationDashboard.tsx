
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, User, Target, Calendar } from "lucide-react";

interface RemediationItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved" | "overdue";
  assignedTo: string;
  dueDate: Date;
  estimatedEffort: string;
  control: string;
  category: string;
}

interface RemediationDashboardProps {
  engagementId: string;
}

export const RemediationDashboard = ({ engagementId }: RemediationDashboardProps) => {
  const remediationItems: RemediationItem[] = [
    {
      id: "1",
      title: "Implement Multi-Factor Authentication",
      description: "MFA not enforced for all administrative accounts accessing critical systems",
      severity: "critical",
      status: "open",
      assignedTo: "John Smith (IT Manager)",
      dueDate: new Date("2024-12-30"),
      estimatedEffort: "2-3 weeks",
      control: "A.9.2.1",
      category: "Access Control"
    },
    {
      id: "2", 
      title: "Update Password Policy Enforcement",
      description: "Current password policy does not meet complexity requirements",
      severity: "high",
      status: "in-progress",
      assignedTo: "Alice Johnson (Security Admin)",
      dueDate: new Date("2025-01-15"),
      estimatedEffort: "1 week",
      control: "A.9.2.3",
      category: "Access Control"
    },
    {
      id: "3",
      title: "Backup Recovery Testing",
      description: "Quarterly backup recovery tests not documented for Q3 2024",
      severity: "medium",
      status: "overdue",
      assignedTo: "Mike Davis (Operations)",
      dueDate: new Date("2024-12-15"),
      estimatedEffort: "3-5 days",
      control: "A.12.3.1",
      category: "Operations Security"
    },
    {
      id: "4",
      title: "Vendor Security Assessment Updates",
      description: "Annual security assessments pending for 3 critical vendors",
      severity: "medium",
      status: "open",
      assignedTo: "Sarah Wilson (Procurement)",
      dueDate: new Date("2025-01-31"),
      estimatedEffort: "2 weeks",
      control: "A.15.1.1", 
      category: "Supplier Relationships"
    },
    {
      id: "5",
      title: "Incident Response Plan Review",
      description: "Annual review and testing of incident response procedures",
      severity: "low",
      status: "resolved",
      assignedTo: "Tom Brown (CISO)",
      dueDate: new Date("2024-12-10"),
      estimatedEffort: "1 week",
      control: "A.16.1.1",
      category: "Security Incident Management"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "open": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const statusCounts = {
    open: remediationItems.filter(item => item.status === "open").length,
    inProgress: remediationItems.filter(item => item.status === "in-progress").length,
    overdue: remediationItems.filter(item => item.status === "overdue").length,
    resolved: remediationItems.filter(item => item.status === "resolved").length
  };

  const totalItems = remediationItems.length;
  const resolvedPercentage = Math.round((statusCounts.resolved / totalItems) * 100);

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <AlertTriangle className="h-5 w-5" />
              Remediation Dashboard
            </CardTitle>
            <CardDescription>
              Open remediation items and progress tracking
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Remediation Progress</span>
            <span className="text-sm text-gray-600">{resolvedPercentage}% Complete</span>
          </div>
          <Progress value={resolvedPercentage} className="h-2" />
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.open}</div>
            <div className="text-xs text-gray-600">Open</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.inProgress}</div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{statusCounts.overdue}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{statusCounts.resolved}</div>
            <div className="text-xs text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Remediation Items */}
        <div className="space-y-4">
          {remediationItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(item.status)}
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <Badge className={getSeverityColor(item.severity)} variant="secondary">
                      {item.severity}
                    </Badge>
                    <Badge className={getStatusColor(item.status)} variant="outline">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{item.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{item.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{item.estimatedEffort}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span>{item.control}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
