
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Shield, Book, Users, AlertTriangle, GitBranch } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
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

const cicdData = [
  { 
    name: 'Week 1',
    successful: 45,
    failed: 3,
    total: 48
  },
  { 
    name: 'Week 2',
    successful: 52,
    failed: 2,
    total: 54
  },
  { 
    name: 'Week 3',
    successful: 48,
    failed: 4,
    total: 52
  },
  { 
    name: 'Week 4',
    successful: 55,
    failed: 1,
    total: 56
  },
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
                  details={{
                    description: "Overview of currently active AI governance policies",
                    items: [
                      { label: "New this month", value: "3" },
                      { label: "Under review", value: "5" },
                      { label: "Recently updated", value: "8" }
                    ]
                  }}
                />
                <StatCard
                  title="Compliance Score"
                  value="98%"
                  icon={<Shield className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 3, positive: true }}
                  className="animate-fade-in delay-200"
                  details={{
                    description: "Overall compliance score across all policies",
                    items: [
                      { label: "Critical policies", value: "100%" },
                      { label: "Standard policies", value: "96%" },
                      { label: "Guidelines", value: "98%" }
                    ]
                  }}
                />
                <StatCard
                  title="Active Users"
                  value="156"
                  icon={<Users className="h-6 w-6 text-primary-500" />}
                  trend={{ value: 8, positive: true }}
                  className="animate-fade-in delay-250"
                  details={{
                    description: "Users actively engaged with AI governance policies",
                    items: [
                      { label: "Administrators", value: "12" },
                      { label: "Policy makers", value: "34" },
                      { label: "Reviewers", value: "110" }
                    ]
                  }}
                />
                <StatCard
                  title="Pending Issues"
                  value="5"
                  icon={<AlertTriangle className="h-6 w-6 text-error" />}
                  trend={{ value: 2, positive: false }}
                  className="animate-fade-in delay-300"
                  details={{
                    description: "Outstanding issues requiring attention",
                    items: [
                      { label: "High priority", value: "2" },
                      { label: "Medium priority", value: "1" },
                      { label: "Low priority", value: "2" }
                    ]
                  }}
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

                  <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900">
                          CI/CD Pipeline Performance
                        </h3>
                        <p className="text-sm text-gray-600">
                          Last 4 weeks deployment statistics
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Successful</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>Failed</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[300px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cicdData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{
                              background: "white",
                              border: "1px solid #E6E8EC",
                              borderRadius: "6px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                          />
                          <Bar 
                            dataKey="successful" 
                            fill="#22C55E" 
                            radius={[4, 4, 0, 0]}
                            name="Successful Deployments"
                          />
                          <Bar 
                            dataKey="failed" 
                            fill="#EF4444" 
                            radius={[4, 4, 0, 0]}
                            name="Failed Deployments"
                          />
                        </BarChart>
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
