
import {
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle,
  ShieldCheck,
  GitBranch,
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

const roleAccess = {
  superuser: ["dashboard", "policies", "compliance", "cicd", "settings"],
  admin: ["dashboard", "policies", "compliance", "settings"],
  developer: ["dashboard", "cicd"],
  auditor: ["dashboard", "compliance"],
  manager: ["dashboard", "policies"],
};

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useRole();

  const hasAccess = (module: string) => {
    return role === "superuser" || roleAccess[role as keyof typeof roleAccess].includes(module);
  };

  return (
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
  );
};
