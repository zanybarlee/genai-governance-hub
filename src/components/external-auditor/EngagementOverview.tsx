
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, Download, Eye } from "lucide-react";
import { Engagement } from "@/pages/ExternalAuditorDashboard";

interface EngagementOverviewProps {
  engagement: Engagement;
}

export const EngagementOverview = ({ engagement }: EngagementOverviewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "finalized": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "scoping": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "finalized": return "Finalized";
      case "in-progress": return "In Progress";
      case "scoping": return "Scoping";
      default: return status;
    }
  };

  const progressPercentage = Math.round(((engagement.endDate.getTime() - Date.now()) / (engagement.endDate.getTime() - engagement.startDate.getTime())) * 100);

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl text-indigo-900">
              {engagement.name}
            </CardTitle>
            <Badge className={getStatusColor(engagement.status)}>
              {getStatusText(engagement.status)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <CardDescription className="text-gray-600">
          {engagement.client} • {engagement.framework} Compliance Audit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
            <Calendar className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-indigo-900">Start Date</p>
              <p className="text-sm text-gray-600">{engagement.startDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Days Remaining</p>
              <p className="text-sm text-gray-600">{engagement.daysRemaining} days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <User className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Audit Lead</p>
              <p className="text-sm text-gray-600">{engagement.auditorLead}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <FileText className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-900">Framework</p>
              <p className="text-sm text-gray-600">{engagement.framework}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Engagement Progress</span>
            <span className="text-sm text-gray-500">{100 - progressPercentage}% Complete</span>
          </div>
          <Progress value={100 - progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{engagement.coveredControls}</p>
            <p className="text-xs text-gray-500">Controls Tested</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{engagement.partialControls}</p>
            <p className="text-xs text-gray-500">Partial Coverage</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{engagement.gapControls}</p>
            <p className="text-xs text-gray-500">Control Gaps</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
