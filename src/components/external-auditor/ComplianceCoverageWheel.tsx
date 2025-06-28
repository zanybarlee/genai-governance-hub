
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
    { 
      name: "Information Security Policy", 
      coverage: 85, 
      status: "good",
      controls: "A.5.1 - A.5.3",
      count: "3/3"
    },
    { 
      name: "Organization of Information Security", 
      coverage: 92, 
      status: "excellent",
      controls: "A.6.1 - A.6.2", 
      count: "12/13"
    },
    { 
      name: "Human Resource Security", 
      coverage: 67, 
      status: "needs-attention",
      controls: "A.7.1 - A.7.3",
      count: "8/12"
    },
    { 
      name: "Asset Management", 
      coverage: 78, 
      status: "good",
      controls: "A.8.1 - A.8.3",
      count: "14/18"
    },
    { 
      name: "Access Control", 
      coverage: 45, 
      status: "critical",
      controls: "A.9.1 - A.9.4",
      count: "18/40"
    },
    { 
      name: "Cryptography", 
      coverage: 88, 
      status: "excellent",
      controls: "A.10.1",
      count: "7/8"
    }
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
    <Card className="border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Shield className="h-5 w-5" />
          Compliance Coverage Wheel
        </CardTitle>
        <CardDescription>
          {engagement.framework} Controls Coverage Analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-center">
          <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-900">{engagement.complianceCoverage}%</div>
              <div className="text-sm text-gray-600">Overall</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {controlCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(category.status)}
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                  <span className={`font-semibold text-sm ${getStatusColor(category.status)}`}>
                    {category.coverage}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={category.coverage} 
                  className="flex-1 h-2"
                />
                <span className="text-xs text-gray-500 min-w-[60px]">{category.controls}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Excellent (≥85%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Good (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Needs Attention (50-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Critical (<50%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
