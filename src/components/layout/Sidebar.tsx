
import { HelpCircle } from "lucide-react";
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
import { useState } from "react";
import { SidebarNavItems } from "./SidebarNavItems";
import { AIAgentFrame } from "./AIAgentFrame";

export const AppSidebar = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
              <SidebarNavItems 
                showIframe={showIframe}
                setShowIframe={setShowIframe}
              />
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
        <AIAgentFrame
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          onClose={() => setShowIframe(false)}
        />
      )}
    </>
  );
};
