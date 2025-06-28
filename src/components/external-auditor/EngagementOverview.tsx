
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Download, Eye } from "lucide-react";
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
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{engagement.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(engagement.status)} variant="secondary">
                {getStatusText(engagement.status)}
              </Badge>
              <span>•</span>
              <span>{engagement.daysRemaining} days remaining</span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Details
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-gray-600">{engagement.startDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Framework</p>
              <p className="text-sm text-gray-600">{engagement.framework}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Audit Lead</p>
              <p className="text-sm text-gray-600">{engagement.auditorLead}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Coverage</p>
              <p className="text-sm text-gray-600">{engagement.complianceCoverage}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{100 - progressPercentage}% Complete</span>
          </div>
          <Progress value={100 - progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-green-600">{engagement.coveredControls}</p>
            <p className="text-xs text-gray-500">Tested</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-600">{engagement.partialControls}</p>
            <p className="text-xs text-gray-500">Partial</p>
          </div>
          <div>
            <p className="text-xl font-bold text-red-600">{engagement.gapControls}</p>
            <p className="text-xs text-gray-500">Gaps</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
