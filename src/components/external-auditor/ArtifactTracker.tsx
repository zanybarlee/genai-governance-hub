
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Clock, AlertTriangle, Download } from "lucide-react";

interface ArtifactItem {
  id: string;
  name: string;
  category: string;
  status: "received" | "pending" | "review-required" | "approved";
  lastUpdated: Date;
  control: string;
  priority: "high" | "medium" | "low";
  size?: string;
}

interface ArtifactTrackerProps {
  engagementId: string;
}

export const ArtifactTracker = ({ engagementId }: ArtifactTrackerProps) => {
  const artifacts: ArtifactItem[] = [
    {
      id: "1",
      name: "Password Policy Document",
      category: "Access Control",
      status: "received",
      lastUpdated: new Date("2024-12-20"),
      control: "A.9.2.3",
      priority: "high",
      size: "245 KB"
    },
    {
      id: "2",
      name: "Access Control Matrix",
      category: "Access Control", 
      status: "pending",
      lastUpdated: new Date("2024-12-18"),
      control: "A.9.1.1",
      priority: "high"
    },
    {
      id: "3",
      name: "Backup & Recovery Procedures",
      category: "Operations Security",
      status: "review-required",
      lastUpdated: new Date("2024-12-19"),
      control: "A.12.3.1",
      priority: "medium",
      size: "1.2 MB"
    },
    {
      id: "4",
      name: "Incident Response Plan",
      category: "Security Incident Management",
      status: "approved",
      lastUpdated: new Date("2024-12-21"),
      control: "A.16.1.1",
      priority: "high",
      size: "890 KB"
    },
    {
      id: "5",
      name: "Network Security Configuration",
      category: "Network Security Management",
      status: "pending",
      lastUpdated: new Date("2024-12-15"),
      control: "A.13.1.1",
      priority: "medium"
    },
    {
      id: "6",
      name: "Vendor Risk Assessment Reports",
      category: "Supplier Relationships",
      status: "received",
      lastUpdated: new Date("2024-12-20"),
      control: "A.15.1.1",
      priority: "low",
      size: "3.4 MB"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "received": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "review-required": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "pending": return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received": return "bg-green-100 text-green-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "review-required": return "bg-yellow-100 text-yellow-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusCounts = {
    received: artifacts.filter(a => a.status === "received").length,
    pending: artifacts.filter(a => a.status === "pending").length,
    reviewRequired: artifacts.filter(a => a.status === "review-required").length,
    approved: artifacts.filter(a => a.status === "approved").length
  };

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <FileText className="h-5 w-5" />
              Artifact Tracker
            </CardTitle>
            <CardDescription>
              Evidence collection and documentation status
            </CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Request Documents
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Status Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{statusCounts.received}</div>
            <div className="text-xs text-gray-600">Received</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.reviewRequired}</div>
            <div className="text-xs text-gray-600">Review Req.</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.approved}</div>
            <div className="text-xs text-gray-600">Approved</div>
          </div>
        </div>

        {/* Artifacts List */}
        <div className="space-y-3">
          {artifacts.map((artifact) => (
            <div key={artifact.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(artifact.status)}
                  <h4 className="font-medium text-gray-900">{artifact.name}</h4>
                  <Badge className={getStatusColor(artifact.status)} variant="secondary">
                    {artifact.status.replace('-', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(artifact.priority)} variant="outline">
                    {artifact.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{artifact.category}</span>
                  <span>Control: {artifact.control}</span>
                  {artifact.size && <span>{artifact.size}</span>}
                  <span>Updated: {artifact.lastUpdated.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {artifact.status === "received" || artifact.status === "approved" ? (
                  <Button size="sm" variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
