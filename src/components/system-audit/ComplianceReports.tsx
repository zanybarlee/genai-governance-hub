
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Calendar, TrendingUp, TrendingDown } from "lucide-react";

interface ComplianceReport {
  id: string;
  title: string;
  type: 'System Overview' | 'Security Audit' | 'Configuration Review' | 'Compliance Summary';
  status: 'completed' | 'generating' | 'failed';
  score: number;
  createdDate: Date;
  artifactsCount: number;
  trend: 'up' | 'down' | 'stable';
}

export const ComplianceReports = () => {
  const reports: ComplianceReport[] = [
    {
      id: '1',
      title: 'Weekly System Compliance Report',
      type: 'System Overview',
      status: 'completed',
      score: 87,
      createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      artifactsCount: 15,
      trend: 'up'
    },
    {
      id: '2',
      title: 'Security Configuration Audit',
      type: 'Security Audit',
      status: 'completed',
      score: 92,
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      artifactsCount: 8,
      trend: 'up'
    },
    {
      id: '3',
      title: 'Database Schema Compliance',
      type: 'Configuration Review',
      status: 'completed',
      score: 78,
      createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      artifactsCount: 12,
      trend: 'down'
    },
    {
      id: '4',
      title: 'Monthly Compliance Summary',
      type: 'Compliance Summary',
      status: 'generating',
      score: 0,
      createdDate: new Date(),
      artifactsCount: 23,
      trend: 'stable'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'generating':
        return <Badge className="bg-blue-100 text-blue-800">Generating...</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string, score: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-3 resolved this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                Generated compliance reports for system artifacts
              </CardDescription>
            </div>
            <Button>
              Generate New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <Badge variant="outline" className="mt-1 text-xs">
                      {report.type}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{report.createdDate.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{report.artifactsCount} artifacts</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {getStatusBadge(report.status)}
                  
                  {report.status === 'completed' && (
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-semibold ${getScoreColor(report.score)}`}>
                        {report.score}%
                      </div>
                      {getTrendIcon(report.trend, report.score)}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {report.status === 'completed' && (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
