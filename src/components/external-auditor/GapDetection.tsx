
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bot, Lightbulb, Clock, Target } from "lucide-react";

interface GapItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  control: string;
  remediation: string;
  estimatedEffort: string;
}

interface GapDetectionProps {
  engagementId: string;
}

export const GapDetection = ({ engagementId }: GapDetectionProps) => {
  const gaps: GapItem[] = [
    {
      id: "1",
      title: "Missing Branch Office Firewall Logs",
      description: "Central log collection not configured for 12 branch office firewalls",
      severity: "high",
      control: "A.12.4.1",
      remediation: "Enable central log forwarding via Syslog-NG to SIEM platform",
      estimatedEffort: "2-3 weeks"
    },
    {
      id: "2", 
      title: "Outdated Password Policy",
      description: "Current password complexity requirements do not meet ISO 27001 standards",
      severity: "medium",
      control: "A.9.2.3",
      remediation: "Update Group Policy to enforce 12+ character passwords with complexity",
      estimatedEffort: "1 week"
    },
    {
      id: "3",
      title: "Incomplete Vulnerability Scanning",
      description: "Database servers excluded from quarterly vulnerability assessments",
      severity: "critical",
      control: "A.12.6.1",
      remediation: "Configure Nessus to include all database instances in scan scope",
      estimatedEffort: "3-5 days"
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

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-900">
          <AlertTriangle className="h-5 w-5" />
          Gap Detection & AI Remediation
        </CardTitle>
        <CardDescription>
          Automated gap identification with AI-generated remediation plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gap Summary */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">1</div>
              <div className="text-xs text-gray-600">Critical</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">1</div>
              <div className="text-xs text-gray-600">High</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-gray-600">Medium</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">0</div>
              <div className="text-xs text-gray-600">Low</div>
            </div>
          </div>

          {/* AI Generated Remediation */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">AI Remediation Generator</p>
                <p className="text-sm text-blue-700 mb-2">
                  "Analysis complete. Generated 3 remediation plans with implementation timelines."
                </p>
                <Button size="sm" variant="outline" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Generate Additional Plans
                </Button>
              </div>
            </div>
          </div>

          {/* Gap Items */}
          <div className="space-y-4">
            {gaps.map((gap) => (
              <div key={gap.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <h4 className="font-medium text-gray-900">{gap.title}</h4>
                      <Badge className={getSeverityColor(gap.severity)} variant="secondary">
                        {gap.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{gap.description}</p>
                    <div className="text-sm text-gray-500 mb-3">
                      Control: {gap.control}
                    </div>
                  </div>
                </div>
                
                {/* AI Remediation */}
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900 text-sm">AI Recommended Remediation:</p>
                      <p className="text-sm text-green-800 mb-2">{gap.remediation}</p>
                      <div className="flex items-center gap-4 text-xs text-green-700">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Est. Effort: {gap.estimatedEffort}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>Control: {gap.control}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Export Gap Analysis
            </Button>
            <Button size="sm" variant="outline">
              Schedule Remediation Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
