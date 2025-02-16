
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("http://127.0.0.1:3000/canvas/36cfa13e-643c-4d07-8777-91f21e7157ca");

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Collapsible open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
        <div className="relative">
          <Sidebar className={cn(
            "transition-all duration-300",
            isCollapsed ? "w-16" : "w-64"
          )}>
            <SidebarHeader>
              <div className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "justify-between px-4"
              )}>
                {!isCollapsed && <img src="/placeholder.svg" alt="Logo" className="h-6" />}
                <CollapsibleTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronLeft className="h-4 w-4" />
                    )}
                  </button>
                </CollapsibleTrigger>
              </div>
            </SidebarHeader>
            <CollapsibleContent forceMount className="transition-all duration-300">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarNavItems 
                      showIframe={showIframe}
                      setShowIframe={setShowIframe}
                      selectedUrl={selectedUrl}
                      setSelectedUrl={setSelectedUrl}
                      isCollapsed={isCollapsed}
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
                        {!isCollapsed && <span>Help</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarFooter>
            </CollapsibleContent>
          </Sidebar>
        </div>
      </Collapsible>

      {showIframe && (
        <AIAgentFrame
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          onClose={() => setShowIframe(false)}
          url={selectedUrl}
        />
      )}
    </>
  );
};
