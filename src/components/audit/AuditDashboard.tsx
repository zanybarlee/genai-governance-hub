
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users,
  Target,
  BarChart3,
  Play
} from "lucide-react";

interface AuditProject {
  id: string;
  name: string;
  framework: string;
  status: "planning" | "in-progress" | "review" | "completed";
  progress: number;
  controlsDomain: number;
  totalControls: number;
  completedControls: number;
  findings: number;
  criticalFindings: number;
  assignee: string;
  dueDate: string;
}

interface AuditDashboardProps {
  onSelectAudit: (auditId: string) => void;
}

const mockAudits: AuditProject[] = [
  {
    id: "1",
    name: "Q4 SOC 2 Type II Audit",
    framework: "SOC 2",
    status: "in-progress",
    progress: 65,
    controlsDomain: 5,
    totalControls: 24,
    completedControls: 16,
    findings: 3,
    criticalFindings: 1,
    assignee: "David Lim",
    dueDate: "2024-12-31"
  },
  {
    id: "2",
    name: "ISO 27001 Annual Review",
    framework: "ISO 27001",
    status: "planning",
    progress: 10,
    controlsDomain: 14,
    totalControls: 114,
    completedControls: 0,
    findings: 0,
    criticalFindings: 0,
    assignee: "Sarah Wilson",
    dueDate: "2025-02-28"
  },
  {
    id: "3",
    name: "NIST Cybersecurity Framework",
    framework: "NIST CSF",
    status: "review",
    progress: 95,
    controlsDomain: 5,
    totalControls: 23,
    completedControls: 22,
    findings: 7,
    criticalFindings: 2,
    assignee: "Mike Johnson",
    dueDate: "2024-11-30"
  }
];

export const AuditDashboard = ({ onSelectAudit }: AuditDashboardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "planning": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "review": return <AlertTriangle className="h-4 w-4" />;
      case "planning": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Audits</p>
              <p className="text-2xl font-bold">{mockAudits.filter(a => a.status !== 'completed').length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Controls Tested</p>
              <p className="text-2xl font-bold">{mockAudits.reduce((sum, a) => sum + a.completedControls, 0)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Findings</p>
              <p className="text-2xl font-bold">{mockAudits.reduce((sum, a) => sum + a.findings, 0)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical Findings</p>
              <p className="text-2xl font-bold">{mockAudits.reduce((sum, a) => sum + a.criticalFindings, 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-900">Audit Projects</h2>
        
        <div className="grid gap-4">
          {mockAudits.map((audit) => (
            <Card key={audit.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-primary-900">{audit.name}</h3>
                  <Badge className={getStatusColor(audit.status)}>
                    {getStatusIcon(audit.status)}
                    <span className="ml-1 capitalize">{audit.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
                <Button 
                  onClick={() => onSelectAudit(audit.id)}
                  size="sm"
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Continue
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Framework</p>
                  <p className="font-medium">{audit.framework}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assignee</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{audit.assignee}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium">{audit.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={audit.progress} className="flex-1" />
                    <span className="text-sm font-medium">{audit.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Control Domains</span>
                  <span className="font-semibold">{audit.controlsDomain}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Controls</span>
                  <span className="font-semibold">{audit.completedControls}/{audit.totalControls}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Findings</span>
                  <span className="font-semibold">{audit.findings}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Critical</span>
                  <span className="font-semibold text-red-600">{audit.criticalFindings}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
