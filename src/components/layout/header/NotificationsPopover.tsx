
import React, { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: number;
  title: string;
  description: string;
  type: string;
  timestamp: string;
  read: boolean;
}

export const NotificationsPopover = () => {
  const { toast } = useToast();

  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      title: "New Policy Available", 
      description: "A new GenAI policy has been published", 
      type: "policy",
      timestamp: new Date().toISOString(),
      read: false
    },
    { 
      id: 2, 
      title: "Compliance Alert", 
      description: "Monthly compliance review due in 2 days",
      type: "compliance",
      timestamp: new Date().toISOString(),
      read: false
    },
    { 
      id: 3, 
      title: "System Update", 
      description: "New security features have been implemented",
      type: "system",
      timestamp: new Date().toISOString(),
      read: false
    },
  ]);

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );

    // Show toast for the clicked notification
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      toast({
        title: notification.title,
        description: notification.description,
      });
    }
  };

  const handleDismissNotification = (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation(); // Prevent triggering the parent click
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast({
      title: "Notification Dismissed",
      description: "The notification has been removed from your list.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'policy':
        return 'bg-blue-100 text-blue-800';
      case 'compliance':
        return 'bg-yellow-100 text-yellow-800';
      case 'system':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white border shadow-lg" align="end">
        <div className="space-y-4">
          <h4 className="font-semibold">Notifications</h4>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`relative cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50 ${
                    notification.read ? 'opacity-75' : ''
                  } ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <p className="text-sm opacity-90">{notification.description}</p>
                      <span className="text-xs opacity-75">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mr-2 -mt-2"
                      onClick={(e) => handleDismissNotification(e, notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
