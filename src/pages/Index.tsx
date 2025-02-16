
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Shield, Book, Users, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-900">
                  AI Governance Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Monitor and manage your AI governance policies and compliance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
                <StatCard
                  title="Active Policies"
                  value="24"
                  icon={<Book className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 12, positive: true }}
                />
                <StatCard
                  title="Compliance Score"
                  value="98%"
                  icon={<Shield className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 3, positive: true }}
                />
                <StatCard
                  title="Active Users"
                  value="156"
                  icon={<Users className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 8, positive: true }}
                />
                <StatCard
                  title="Pending Issues"
                  value="5"
                  icon={<AlertTriangle className="h-6 w-6 text-error" />}
                  trend={{ value: 2, positive: false }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slideUp">
                <div className="lg:col-span-2">
                  {/* Chart component will go here in the next iteration */}
                  <div className="h-[400px] bg-white/50 backdrop-blur-lg rounded-lg border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-primary-900">
                      Compliance Trends
                    </h3>
                  </div>
                </div>
                <ActivityFeed />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
