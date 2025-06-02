
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SystemAuditDashboard } from "@/components/system-audit/SystemAuditDashboard";
import { SystemComplianceChat } from "@/components/system-audit/SystemComplianceChat";
import { ComplianceReports } from "@/components/system-audit/ComplianceReports";
import { SystemScans } from "@/components/system-audit/SystemScans";
import { ArtifactsManagement } from "@/components/system-audit/ArtifactsManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SystemAudit = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-900 animate-fade-in">
                  System Compliance Audit
                </h1>
                <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                  AI-powered system artifact compliance checking and reporting
                </p>
              </div>

              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="scans">System Scans</TabsTrigger>
                  <TabsTrigger value="artifacts-mgmt">Artifacts Mgmt</TabsTrigger>
                  <TabsTrigger value="chat">Compliance Chat</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <SystemAuditDashboard />
                </TabsContent>

                <TabsContent value="scans">
                  <SystemScans />
                </TabsContent>

                <TabsContent value="artifacts-mgmt">
                  <ArtifactsManagement />
                </TabsContent>

                <TabsContent value="chat">
                  <SystemComplianceChat />
                </TabsContent>

                <TabsContent value="reports">
                  <ComplianceReports />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SystemAudit;
