
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Building, Calendar } from "lucide-react";
import { Engagement } from "@/pages/ExternalAuditorDashboard";

interface EngagementSelectorProps {
  selectedEngagement: Engagement;
  onEngagementChange: (engagement: Engagement) => void;
}

export const EngagementSelector = ({ selectedEngagement, onEngagementChange }: EngagementSelectorProps) => {
  const engagements: Engagement[] = [
    {
      id: "1",
      name: "Q4 2024 IT General Controls Audit",
      client: "TechCorp Industries",
      status: "in-progress",
      daysRemaining: 18,
      framework: "ISO 27001",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2024-12-31"),
      auditorLead: "Sarah Chen, KPMG",
      complianceCoverage: 73,
      totalControls: 114,
      coveredControls: 83,
      gapControls: 12,
      partialControls: 19
    },
    {
      id: "2",
      name: "SOC 2 Type II Readiness Assessment",
      client: "FinanceFlow Solutions",
      status: "scoping",
      daysRemaining: 45,
      framework: "SOC 2",
      startDate: new Date("2024-12-15"),
      endDate: new Date("2025-02-15"),
      auditorLead: "Mike Johnson, KPMG",
      complianceCoverage: 12,
      totalControls: 64,
      coveredControls: 8,
      gapControls: 3,
      partialControls: 5
    },
    {
      id: "3",
      name: "NIST Cybersecurity Framework Review",
      client: "Healthcare Dynamics",
      status: "finalized",
      daysRemaining: 0,
      framework: "NIST CSF",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-11-30"),
      auditorLead: "Lisa Zhang, KPMG",
      complianceCoverage: 95,
      totalControls: 85,
      coveredControls: 81,
      gapControls: 2,
      partialControls: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "finalized": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "scoping": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between min-w-[250px]">
          <div className="text-left">
            <div className="font-medium">{selectedEngagement.name}</div>
            <div className="text-sm text-gray-500">{selectedEngagement.client}</div>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white border shadow-lg" align="end">
        <DropdownMenuLabel>Select Engagement</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {engagements.map((engagement) => (
          <DropdownMenuItem
            key={engagement.id}
            onClick={() => onEngagementChange(engagement)}
            className="p-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">{engagement.name}</div>
                <Badge className={getStatusColor(engagement.status)} variant="secondary">
                  {engagement.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {engagement.client}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {engagement.framework}
                </div>
                {engagement.daysRemaining > 0 && (
                  <div>{engagement.daysRemaining} days left</div>
                )}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
