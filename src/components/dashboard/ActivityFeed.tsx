
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  },
];

export const ActivityFeed = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-primary-900 mb-4">
        Recent Activity
      </h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
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
  );
};
