
import React from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsPopover } from "./header/NotificationsPopover";
import { SettingsPopover } from "./header/SettingsPopover";
import { RoleSwitcher } from "./header/RoleSwitcher";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary-500">
            GenAI Governance
          </span>
        </div>

        <div className="flex items-center gap-4">
          <NotificationsPopover />
          <SettingsPopover navigate={navigate} />
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
};
