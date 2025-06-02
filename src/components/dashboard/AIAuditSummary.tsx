
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AIAuditSummary = () => {
  const recentAudits = [
    {
      id: "1",
      name: "SOC 2 Compliance Check",
      status: "completed",
      completedDate: "2024-12-01",
      findings: { total: 12, critical: 2, high: 4 },
      score: 87
    },
    {
      id: "2", 
      name: "Security Framework Review",
      status: "in-progress",
      completedDate: null,
      findings: { total: 0, critical: 0, high: 0 },
      score: null
    },
    {
      id: "3",
      name: "Data Privacy Assessment", 
      status: "completed",
      completedDate: "2024-11-28",
      findings: { total: 8, critical: 1, high: 2 },
      score: 92
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-500";
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-900">AI Audit Summary</h3>
            <p className="text-sm text-gray-600">Recent automated audit executions</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link to="/audit">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {recentAudits.map((audit) => (
          <div key={audit.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-primary-900">{audit.name}</h4>
              {getStatusBadge(audit.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">
                  {audit.completedDate || "In Progress"}
                </p>
              </div>
              
              <div>
                <p className="text-gray-600">Findings</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{audit.findings.total}</span>
                  {audit.findings.critical > 0 && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span className="text-red-600 text-xs">{audit.findings.critical} critical</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-gray-600">Score</p>
                <p className={`font-medium ${getScoreColor(audit.score)}`}>
                  {audit.score ? `${audit.score}%` : "Pending"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
