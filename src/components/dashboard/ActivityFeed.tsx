
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Clock, User, FileText } from "lucide-react";

interface Activity {
  id: string;
  type: "policy" | "compliance" | "user";
  action: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
  details?: {
    impact?: string;
    relatedItems?: string[];
    additionalNotes?: string;
  };
}

const activities: Activity[] = [
  {
    id: "1",
    type: "policy",
    action: "Policy Updated",
    description: "Updated Data Privacy Policy v2.1",
    timestamp: "2 hours ago",
    user: {
      name: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    details: {
      impact: "Major changes to data handling procedures",
      relatedItems: ["User consent forms", "Data retention rules", "Access controls"],
      additionalNotes: "Changes implemented as per regulatory requirements",
    },
  },
  {
    id: "2",
    type: "compliance",
    action: "Compliance Check",
    description: "Completed quarterly compliance review",
    timestamp: "5 hours ago",
    user: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    details: {
      impact: "All systems found compliant",
      relatedItems: ["Risk assessment", "Security protocols", "Training records"],
      additionalNotes: "Next review scheduled for Q2",
    },
  },
  {
    id: "3",
    type: "user",
    action: "User Added",
    description: "Added new compliance officer",
    timestamp: "1 day ago",
    user: {
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    details: {
      impact: "Enhanced compliance monitoring capacity",
      relatedItems: ["Access permissions", "Training schedule", "Department assignment"],
      additionalNotes: "Full onboarding to be completed by end of week",
    },
  },
];

export const ActivityFeed = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "policy":
        return <FileText className="h-4 w-4 text-primary-500" />;
      case "compliance":
        return <Clock className="h-4 w-4 text-success" />;
      case "user":
        return <User className="h-4 w-4 text-info" />;
    }
  };

  return (
    <>
      <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Recent Activity
        </h3>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-primary-900">
                      {activity.user.name}
                    </p>
                    <span className="text-sm text-gray-500">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary-500 mt-1">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="p-2 bg-primary-100 rounded-lg">
                    {getActivityIcon(selectedActivity.type)}
                  </span>
                  {selectedActivity.action}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={selectedActivity.user.avatar}
                      alt={selectedActivity.user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-primary-900">
                      {selectedActivity.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedActivity.timestamp}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="font-medium mt-1">{selectedActivity.description}</p>
                </div>

                {selectedActivity.details && (
                  <div className="space-y-3">
                    {selectedActivity.details.impact && (
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600">Impact</p>
                        <p className="font-medium mt-1">
                          {selectedActivity.details.impact}
                        </p>
                      </div>
                    )}

                    {selectedActivity.details.relatedItems && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Related Items</p>
                        {selectedActivity.details.relatedItems.map((item, index) => (
                          <div key={index} className="p-2 rounded-lg bg-gray-50">
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedActivity.details.additionalNotes && (
                      <div className="p-4 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600">Additional Notes</p>
                        <p className="text-sm mt-1">
                          {selectedActivity.details.additionalNotes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
