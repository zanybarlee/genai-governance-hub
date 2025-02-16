
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Shield, Book, Users, AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const complianceData = [
  { month: "Jan", score: 92 },
  { month: "Feb", score: 94 },
  { month: "Mar", score: 91 },
  { month: "Apr", score: 95 },
  { month: "May", score: 93 },
  { month: "Jun", score: 98 },
];

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
                <h1 className="text-3xl font-bold text-primary-900 animate-fade-in">
                  AI Governance Dashboard
                </h1>
                <p className="text-gray-600 mt-2 animate-fade-in delay-100">
                  Monitor and manage your AI governance policies and compliance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Active Policies"
                  value="24"
                  icon={<Book className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 12, positive: true }}
                  className="animate-fade-in delay-150"
                />
                <StatCard
                  title="Compliance Score"
                  value="98%"
                  icon={<Shield className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 3, positive: true }}
                  className="animate-fade-in delay-200"
                />
                <StatCard
                  title="Active Users"
                  value="156"
                  icon={<Users className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 8, positive: true }}
                  className="animate-fade-in delay-250"
                />
                <StatCard
                  title="Pending Issues"
                  value="5"
                  icon={<AlertTriangle className="h-6 w-6 text-error" />}
                  trend={{ value: 2, positive: false }}
                  className="animate-fade-in delay-300"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900">
                          Compliance Trends
                        </h3>
                        <p className="text-sm text-gray-600">
                          6-month compliance score overview
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-3 h-3 rounded-full bg-primary-500/20"></div>
                          <span>Compliance Score</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[300px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={complianceData}
                          margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorScore"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#2D3648"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="#2D3648"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E6E8EC"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#9BA3B5"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#9BA3B5"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[85, 100]}
                            ticks={[85, 90, 95, 100]}
                          />
                          <Tooltip
                            contentStyle={{
                              background: "white",
                              border: "1px solid #E6E8EC",
                              borderRadius: "6px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#2D3648"
                            fill="url(#colorScore)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
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
