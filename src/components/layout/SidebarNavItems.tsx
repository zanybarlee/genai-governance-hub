
import {
  LayoutDashboard,
  FileText,
  Settings,
  ShieldCheck,
  GitBranch,
  Bot,
} from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { roleAccess } from "@/constants/roleAccess";

interface SidebarNavItemsProps {
  showIframe: boolean;
  setShowIframe: (show: boolean) => void;
}

export const SidebarNavItems = ({ showIframe, setShowIframe }: SidebarNavItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();

  const hasAccess = (module: string) => {
    const hasAccess = role === "superuser" || roleAccess[role as keyof typeof roleAccess].includes(module);
    console.log(`Checking access for ${role} to ${module}: ${hasAccess}`);
    return hasAccess;
  };

  return (
    <>
      {hasAccess("dashboard") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/"}
            onClick={() => navigate("/")}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      
      {hasAccess("policies") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/policies"}
            onClick={() => navigate("/policies")}
          >
            <FileText className="h-4 w-4" />
            <span>Policies</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      
      {hasAccess("compliance") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/compliance"}
            onClick={() => navigate("/compliance")}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Compliance</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      
      {hasAccess("cicd") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/cicd"}
            onClick={() => navigate("/cicd")}
          >
            <GitBranch className="h-4 w-4" />
            <span>CI/CD</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      
      {hasAccess("settings") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/settings"}
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}

      {hasAccess("agent") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={showIframe}
            onClick={() => setShowIframe(!showIframe)}
          >
            <Bot className="h-4 w-4" />
            <span>AI Agent</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
};
