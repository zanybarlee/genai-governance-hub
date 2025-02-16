
import {
  LayoutDashboard,
  FileText,
  Settings,
  ShieldCheck,
  GitBranch,
  Bot,
  ChevronDown,
  LineChart
} from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { roleAccess, AccessibleModule, Role } from "@/constants/roleAccess";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarNavItemsProps {
  showIframe: boolean;
  setShowIframe: (show: boolean) => void;
  selectedUrl: string;
  setSelectedUrl: (url: string) => void;
}

export const SidebarNavItems = ({ 
  showIframe, 
  setShowIframe, 
  selectedUrl, 
  setSelectedUrl 
}: SidebarNavItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();

  const hasAccess = (module: AccessibleModule) => {
    const userRole = role as Role;
    const hasAccess = role === "superuser" || roleAccess[userRole].includes(module as any);
    return hasAccess;
  };

  const monitoringUrl = "https://smith.langchain.com/o/a7cdf746-3eb8-5ac4-bcdd-cb25ca509502/projects/p/8a2435d0-9902-491d-a2ca-f24d45ca5150?timeModel=%7B%22duration%22%3A%227d%22%7D";

  const agentUrls = [
    {
      name: "Tool Agent",
      url: "http://127.0.0.1:3000/canvas/36cfa13e-643c-4d07-8777-91f21e7157ca"
    },
    {
      name: "Multi Agent",
      url: "http://127.0.0.1:3000/agentcanvas/4d1ca9ff-9090-4b34-a15a-6f9d4f1a1835"
    }
  ];

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

      {hasAccess("agent") && (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                isActive={showIframe}
              >
                <Bot className="h-4 w-4" />
                <span>AI Agent</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg">
              {agentUrls.map((agent) => (
                <DropdownMenuItem
                  key={agent.url}
                  onClick={() => {
                    setSelectedUrl(agent.url);
                    setShowIframe(true);
                  }}
                  className="hover:bg-gray-100"
                >
                  {agent.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}

      {hasAccess("agent") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => window.open(monitoringUrl, '_blank')}
          >
            <LineChart className="h-4 w-4" />
            <span>Monitoring</span>
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
    </>
  );
};
