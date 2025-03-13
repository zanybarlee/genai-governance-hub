
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavigateFunction } from "react-router-dom";

interface SettingsPopoverProps {
  navigate: NavigateFunction;
}

export const SettingsPopover = ({ navigate }: SettingsPopoverProps) => {
  const quickSettings = [
    { id: 1, label: "Profile Settings", action: () => navigate("/settings") },
    { id: 2, label: "Notification Preferences", action: () => navigate("/settings") },
    { id: 3, label: "Security Settings", action: () => navigate("/settings") },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-white border shadow-lg" align="end">
        <div className="space-y-1">
          {quickSettings.map((setting) => (
            <Button
              key={setting.id}
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={setting.action}
            >
              {setting.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
