import {
  LayoutDashboard,
  FileText,
  Settings,
  ShieldCheck,
  GitBranch,
  Bot,
  ChevronDown,
  LineChart,
  Search
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
  isCollapsed: boolean;
}

export const SidebarNavItems = ({ 
  showIframe, 
  setShowIframe, 
  selectedUrl, 
  setSelectedUrl,
  isCollapsed 
}: SidebarNavItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();

  const hasAccess = (module: AccessibleModule) => {
    const userRole = role as Role;
    const allowedModules = roleAccess[userRole];
    
    // Safety check to ensure allowedModules exists
    if (!allowedModules) {
      console.warn(`No access defined for role: ${userRole}`);
      return false;
    }
    
    return role === "superuser" || allowedModules.includes(module);
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
            {!isCollapsed && <span>Dashboard</span>}
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
            {!isCollapsed && <span>Policies</span>}
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
            {!isCollapsed && <span>Compliance</span>}
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
            {!isCollapsed && <span>CI/CD</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}

      {hasAccess("audit") && (
        <SidebarMenuItem>
          <SidebarMenuButton
            isActive={location.pathname === "/audit"}
            onClick={() => navigate("/audit")}
          >
            <Search className="h-4 w-4" />
            {!isCollapsed && <span>AI Audit</span>}
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
                {!isCollapsed && (
                  <>
                    <span>AI Agent</span>
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </>
                )}
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
            {!isCollapsed && <span>Monitoring</span>}
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
            {!isCollapsed && <span>Settings</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </>
  );
};
