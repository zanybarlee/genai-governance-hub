
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary-500">
            GenAI Governance
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full"
          >
            <div className="h-8 w-8 rounded-full bg-primary-100">
              <img
                alt="User"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                className="h-full w-full rounded-full"
              />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};
