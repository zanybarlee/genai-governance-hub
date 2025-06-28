import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { EngagementOverview } from "@/components/external-auditor/EngagementOverview";
import { ComplianceCoverageWheel } from "@/components/external-auditor/ComplianceCoverageWheel";
import { ArtifactTracker } from "@/components/external-auditor/ArtifactTracker";
import { RemediationDashboard } from "@/components/external-auditor/RemediationDashboard";
import { AuditInsightsWidget } from "@/components/external-auditor/AuditInsightsWidget";
import { EngagementSelector } from "@/components/external-auditor/EngagementSelector";
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
              {/* Simplified Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      External Audit Dashboard
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {selectedEngagement.client} • {selectedEngagement.framework}
                    </p>
                  </div>
                  <EngagementSelector 
                    selectedEngagement={selectedEngagement}
                    onEngagementChange={setSelectedEngagement}
                  />
                </div>
              </div>

              {/* Streamlined Grid Layout */}
              <div className="space-y-6">
                {/* Top Row - Overview */}
                <EngagementOverview engagement={selectedEngagement} />
                
                {/* Middle Row - Side by Side */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ComplianceCoverageWheel engagement={selectedEngagement} />
                  <AuditInsightsWidget engagementId={selectedEngagement.id} />
                </div>

                {/* Bottom Row - Full Width */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ArtifactTracker engagementId={selectedEngagement.id} />
                  <RemediationDashboard engagementId={selectedEngagement.id} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExternalAuditorDashboard;
