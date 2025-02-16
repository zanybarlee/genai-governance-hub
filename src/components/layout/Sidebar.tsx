
import { HelpCircle, ChevronsLeft, ChevronsRight } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
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
                      <ChevronsRight className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronsLeft className="h-4 w-4 text-gray-600" />
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
                      <SidebarMenuButton onClick={() => setShowHelpDialog(true)}>
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

      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Need Help?</DialogTitle>
            <DialogDescription>
              Here's how to use the GenAI Governance Hub:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Dashboard</h4>
              <p className="text-sm text-gray-600">View key metrics and insights about your GenAI governance status.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Policies</h4>
              <p className="text-sm text-gray-600">Create and manage policies for GenAI usage in your organization.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Compliance</h4>
              <p className="text-sm text-gray-600">Monitor and ensure compliance with established policies.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">CI/CD</h4>
              <p className="text-sm text-gray-600">Manage continuous integration and deployment of GenAI applications.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">AI Agent</h4>
              <p className="text-sm text-gray-600">Access and configure AI agents for various tasks.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Settings</h4>
              <p className="text-sm text-gray-600">Configure application settings and preferences.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
