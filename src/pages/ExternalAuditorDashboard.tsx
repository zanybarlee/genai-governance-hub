
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-indigo-900 animate-fade-in">
                      KPMG External Audit Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                      AI-powered IT audit management and compliance tracking
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Current Engagement</p>
                      <EngagementSelector 
                        selectedEngagement={selectedEngagement}
                        onEngagementChange={setSelectedEngagement}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Panels */}
                <div className="lg:col-span-2 space-y-6">
                  <EngagementOverview engagement={selectedEngagement} />
                  <ArtifactTracker engagementId={selectedEngagement.id} />
                  <RemediationDashboard engagementId={selectedEngagement.id} />
                </div>

                {/* Right Column - Insights & Coverage */}
                <div className="space-y-6">
                  <ComplianceCoverageWheel engagement={selectedEngagement} />
                  <AuditInsightsWidget engagementId={selectedEngagement.id} />
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
