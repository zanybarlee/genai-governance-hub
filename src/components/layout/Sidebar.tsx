
import {
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle,
  ShieldCheck,
  GitBranch,
  Bot,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const roleAccess = {
  superuser: ["dashboard", "policies", "compliance", "cicd", "settings", "agent"],
  admin: ["dashboard", "policies", "compliance", "settings", "agent"],
  developer: ["dashboard", "cicd", "agent"],
  auditor: ["dashboard", "compliance", "agent"],
  manager: ["dashboard", "policies", "agent"],
};

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();
  const [showIframe, setShowIframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasAccess = (module: string) => {
    return role === "superuser" || roleAccess[role as keyof typeof roleAccess].includes(module);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <img src="/placeholder.svg" alt="Logo" className="h-6" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
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
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      {showIframe && (
        <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-8'}`}>
          <div 
            className={`bg-white rounded-lg shadow-lg relative ${
              isFullscreen ? 'w-full h-full rounded-none' : 'w-[80vw] h-[80vh]'
            }`}
          >
            <div className="absolute top-0 right-0 flex gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-bl-lg z-10">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleFullscreen}
                className="hover:bg-gray-100 rounded-full"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowIframe(false)}
                className="hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Button>
            </div>
            <iframe
              src="http://127.0.0.1:3000/canvas/36cfa13e-643c-4d07-8777-91f21e7157ca"
              className="w-full h-full rounded-lg"
              title="AI Agent Canvas"
            />
          </div>
        </div>
      )}
    </>
  );
};
