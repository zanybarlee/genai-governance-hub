
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, Repeat, FileText, Eye } from "lucide-react";

interface AuditInsight {
  id: string;
  type: "high-risk-finding" | "repeat-exception" | "recommendation";
  title: string;
  description: string;
  impact: "critical" | "high" | "medium" | "low";
  category: string;
  control?: string;
}

interface AuditInsightsWidgetProps {
  engagementId: string;
}

export const AuditInsightsWidget = ({ engagementId }: AuditInsightsWidgetProps) => {
  const insights: AuditInsight[] = [
    {
      id: "1",
      type: "high-risk-finding",
      title: "Privileged Access Management Gaps",
      description: "15 admin accounts lack MFA enforcement, creating significant security risk",
      impact: "critical",
      category: "Access Control",
      control: "A.9.2.1"
    },
    {
      id: "2",
      type: "repeat-exception",
      title: "Backup Recovery Testing",
      description: "Same backup testing documentation gap identified in Q2 2024 audit",
      impact: "medium",
      category: "Operations Security",
      control: "A.12.3.1"
    },
    {
      id: "3",
      type: "recommendation",
      title: "Automated Vulnerability Scanning",
      description: "Implement continuous vulnerability assessment to reduce manual effort",
      impact: "medium",
      category: "Vulnerability Management"
    },
    {
      id: "4",
      type: "high-risk-finding",
      title: "Vendor Security Oversight",
      description: "3 critical vendors lack current security assessments beyond 12 months",
      impact: "high",
      category: "Supplier Relationships",
      control: "A.15.1.1"
    },
    {
      id: "5",
      type: "repeat-exception",
      title: "Incident Response Documentation",
      description: "Incident response plan updates delayed for 3rd consecutive quarter",
      impact: "high",
      category: "Security Incident Management",
      control: "A.16.1.1"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "high-risk-finding": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "repeat-exception": return <Repeat className="h-4 w-4 text-orange-500" />;
      case "recommendation": return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "high-risk-finding": return "bg-red-100 text-red-800";
      case "repeat-exception": return "bg-orange-100 text-orange-800";
      case "recommendation": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "high-risk-finding": return "High Risk";
      case "repeat-exception": return "Repeat Issue";
      case "recommendation": return "Recommendation";
      default: return type;
    }
  };

  const topFindings = insights.filter(i => i.type === "high-risk-finding").slice(0, 3);
  const repeatExceptions = insights.filter(i => i.type === "repeat-exception").length;
  const totalRecommendations = insights.filter(i => i.type === "recommendation").length;

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <TrendingUp className="h-5 w-5" />
          Audit Insights
        </CardTitle>
        <CardDescription>
          Key findings and recommendations summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">{topFindings.length}</div>
            <div className="text-xs text-gray-600">High Risk</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">{repeatExceptions}</div>
            <div className="text-xs text-gray-600">Repeat Issues</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{totalRecommendations}</div>
            <div className="text-xs text-gray-600">Recommendations</div>
          </div>
        </div>

        {/* Top 3 High-Risk Findings */}
        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-gray-900">Top 3 High-Risk Findings</h4>
          {topFindings.map((finding) => (
            <div key={finding.id} className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(finding.type)}
                  <span className="font-medium text-sm">{finding.title}</span>
                </div>
                <Badge className={getImpactColor(finding.impact)} variant="secondary">
                  {finding.impact}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{finding.category}</span>
                {finding.control && <span>Control: {finding.control}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* All Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">All Insights</h4>
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              View All
            </Button>
          </div>
          
          {insights.slice(0, 5).map((insight) => (
            <div key={insight.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {getTypeIcon(insight.type)}
                <div>
                  <p className="font-medium text-sm">{insight.title}</p>
                  <p className="text-xs text-gray-500">{insight.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(insight.type)} variant="outline">
                  {getTypeLabel(insight.type)}
                </Badge>
                <Badge className={getImpactColor(insight.impact)} variant="secondary">
                  {insight.impact}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
