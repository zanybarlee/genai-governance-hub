
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const policies = [
  {
    id: 1,
    name: "Data Privacy Policy",
    version: "2.1",
    status: "Active",
    lastUpdated: "2024-03-15",
    category: "Privacy",
  },
  {
    id: 2,
    name: "Model Development Guidelines",
    version: "1.3",
    status: "Under Review",
    lastUpdated: "2024-03-14",
    category: "Development",
  },
  {
    id: 3,
    name: "AI Ethics Framework",
    version: "1.0",
    status: "Active",
    lastUpdated: "2024-03-10",
    category: "Ethics",
  },
];

const Policies = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary-900">Policies</h1>
                  <p className="text-gray-600 mt-2">
                    Manage and monitor your AI governance policies
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create Policy
                </Button>
              </div>

              <Card className="p-6 bg-white/50 backdrop-blur-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search policies..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Version</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map((policy) => (
                        <tr
                          key={policy.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span className="font-medium text-primary-900">{policy.name}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{policy.version}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                policy.status === "Active"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              }`}
                            >
                              {policy.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{policy.category}</td>
                          <td className="py-3 px-4 text-gray-600">{policy.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Policies;
