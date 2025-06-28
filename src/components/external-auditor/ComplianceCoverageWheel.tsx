
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Engagement } from "@/pages/ExternalAuditorDashboard";

interface ComplianceCoverageWheelProps {
  engagement: Engagement;
}

export const ComplianceCoverageWheel = ({ engagement }: ComplianceCoverageWheelProps) => {
  const controlCategories = [
    { name: "Information Security Policy", coverage: 85, status: "good" },
    { name: "Organization Security", coverage: 92, status: "excellent" },
    { name: "Human Resource Security", coverage: 67, status: "needs-attention" },
    { name: "Asset Management", coverage: 78, status: "good" },
    { name: "Access Control", coverage: 45, status: "critical" },
    { name: "Cryptography", coverage: 88, status: "excellent" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "good": return <Shield className="h-4 w-4 text-blue-600" />;
      case "needs-attention": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "needs-attention": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5" />
          Compliance Coverage
        </CardTitle>
        <CardDescription>
          {engagement.framework} Controls Analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 mb-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">{engagement.complianceCoverage}%</div>
              <div className="text-xs text-gray-600">Overall</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {controlCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(category.status)}
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <span className={`font-semibold text-sm ${getStatusColor(category.status)}`}>
                  {category.coverage}%
                </span>
              </div>
              <Progress value={category.coverage} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Excellent (≥85%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Good (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Needs Attention (50-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Critical (&lt;50%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
