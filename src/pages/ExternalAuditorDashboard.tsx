
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EngagementOverview } from "@/components/external-auditor/EngagementOverview";
import { ComplianceCoverageWheel } from "@/components/external-auditor/ComplianceCoverageWheel";
import { ArtifactTracker } from "@/components/external-auditor/ArtifactTracker";
import { RemediationDashboard } from "@/components/external-auditor/RemediationDashboard";
import { AuditInsightsWidget } from "@/components/external-auditor/AuditInsightsWidget";
import { EngagementSelector } from "@/components/external-auditor/EngagementSelector";
import { ScopingAssistant } from "@/components/external-auditor/ScopingAssistant";
import { AssetMapping } from "@/components/external-auditor/AssetMapping";
import { EvidenceCollection } from "@/components/external-auditor/EvidenceCollection";
import { GapDetection } from "@/components/external-auditor/GapDetection";
import { ExecutiveReportGenerator } from "@/components/external-auditor/ExecutiveReportGenerator";
import { useState } from "react";

export interface Engagement {
  id: string;
  name: string;
  client: string;
  status: "scoping" | "in-progress" | "finalized";
  daysRemaining: number;
  framework: string;
  startDate: Date;
  endDate: Date;
  auditorLead: string;
  complianceCoverage: number;
  totalControls: number;
  coveredControls: number;
  gapControls: number;
  partialControls: number;
}

const ExternalAuditorDashboard = () => {
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement>({
    id: "1",
    name: "Q4 2024 IT General Controls Audit",
    client: "TechCorp Industries",
    status: "in-progress",
    daysRemaining: 18,
    framework: "ISO 27001",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    auditorLead: "Sarah Chen, KPMG",
    complianceCoverage: 73,
    totalControls: 114,
    coveredControls: 83,
    gapControls: 12,
    partialControls: 19
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <div className="mx-auto max-w-7xl">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      KPMG External Audit Dashboard
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {selectedEngagement.client} • {selectedEngagement.framework} • 2025 Annual Audit
                    </p>
                  </div>
                  <EngagementSelector 
                    selectedEngagement={selectedEngagement}
                    onEngagementChange={setSelectedEngagement}
                  />
                </div>
              </div>

              {/* Engagement Overview - Always Visible */}
              <div className="mb-6">
                <EngagementOverview engagement={selectedEngagement} />
              </div>

              {/* Tab Navigation */}
              <Tabs defaultValue="planning" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="planning">Planning & Scoping</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence Collection</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis & Insights</TabsTrigger>
                  <TabsTrigger value="remediation">Remediation</TabsTrigger>
                  <TabsTrigger value="reporting">Reporting</TabsTrigger>
                </TabsList>

                {/* Planning & Scoping Tab */}
                <TabsContent value="planning" className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <ScopingAssistant engagementId={selectedEngagement.id} />
                    <AssetMapping engagementId={selectedEngagement.id} />
                  </div>
                  <ComplianceCoverageWheel engagement={selectedEngagement} />
                </TabsContent>

                {/* Evidence Collection Tab */}
                <TabsContent value="evidence" className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <EvidenceCollection engagementId={selectedEngagement.id} />
                    <ArtifactTracker engagementId={selectedEngagement.id} />
                  </div>
                </TabsContent>

                {/* Analysis & Insights Tab */}
                <TabsContent value="analysis" className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <GapDetection engagementId={selectedEngagement.id} />
                    <AuditInsightsWidget engagementId={selectedEngagement.id} />
                  </div>
                </TabsContent>

                {/* Remediation Tab */}
                <TabsContent value="remediation" className="space-y-6">
                  <RemediationDashboard engagementId={selectedEngagement.id} />
                </TabsContent>

                {/* Reporting Tab */}
                <TabsContent value="reporting" className="space-y-6">
                  <ExecutiveReportGenerator 
                    engagementId={selectedEngagement.id} 
                    clientName={selectedEngagement.client}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExternalAuditorDashboard;
