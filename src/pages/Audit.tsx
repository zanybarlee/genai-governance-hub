
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AuditDashboard } from "@/components/audit/AuditDashboard";
import { AuditScopeUpload } from "@/components/audit/AuditScopeUpload";
import { AuditExecution } from "@/components/audit/AuditExecution";
import { AuditReports } from "@/components/audit/AuditReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Audit = () => {
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);

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
                  AI-Powered IT Audit
                </h1>
                <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                  Automate IT audits with AI agents for scope analysis, evidence collection, and report generation
                </p>
              </div>

              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="scope">Audit Scope</TabsTrigger>
                  <TabsTrigger value="execution">Execution</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <AuditDashboard onSelectAudit={setActiveAuditId} />
                </TabsContent>

                <TabsContent value="scope">
                  <AuditScopeUpload />
                </TabsContent>

                <TabsContent value="execution">
                  <AuditExecution auditId={activeAuditId} />
                </TabsContent>

                <TabsContent value="reports">
                  <AuditReports />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Audit;
