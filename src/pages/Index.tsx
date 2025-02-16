
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PolicyScoreCard } from "@/components/dashboard/PolicyScoreCard";
import { ChatDialog } from "@/components/chat/ChatDialog";
import { PolicyDetailsDialog } from "@/components/policies/PolicyDetailsDialog";
import { useState } from "react";
import { Policy } from "@/types/policy";
import { ComplianceChart } from "@/components/dashboard/ComplianceChart";
import { CICDChart } from "@/components/dashboard/CICDChart";
import { StatCards } from "@/components/dashboard/StatCards";
import { ResourceAccessMap } from "@/components/dashboard/ResourceAccessMap";
import { policyScores } from "@/data/policyScores";

const Index = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handlePolicyClick = (policy: typeof policyScores[0]) => {
    const policyData: Policy = {
      ...policy,
      status: "Active",
      content: "This is a sample content for " + policy.name + ". The actual content would be loaded from the backend."
    };
    setSelectedPolicy(policyData);
  };

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
                  AI Governance Dashboard
                </h1>
                <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                  Monitor and manage your AI governance policies and compliance
                </p>
              </div>

              <StatCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ComplianceChart />
                  <CICDChart />
                  <div className="mt-6">
                    <ResourceAccessMap />
                  </div>
                </div>
                <div className="space-y-6">
                  <PolicyScoreCard 
                    scores={policyScores} 
                    onPolicyClick={handlePolicyClick}
                  />
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ChatDialog />
      <PolicyDetailsDialog
        policy={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
    </SidebarProvider>
  );
};

export default Index;
