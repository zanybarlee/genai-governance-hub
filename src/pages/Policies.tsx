
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Policy, PolicyFormValues } from "@/types/policy";
import { CreatePolicyDialog } from "@/components/policies/CreatePolicyDialog";
import { PolicyDetailsDialog } from "@/components/policies/PolicyDetailsDialog";
import { PoliciesTable } from "@/components/policies/PoliciesTable";
import { policyTemplates } from "@/data/policyTemplates";
import { useToast } from "@/components/ui/use-toast";

const initialPolicies: Policy[] = [
  {
    id: 1,
    name: "Data Privacy Policy",
    version: "2.1",
    status: "Active",
    lastUpdated: "2024-03-15",
    category: "Privacy",
    description: "Comprehensive data privacy guidelines for AI systems",
    content: "# Data Privacy Policy\n\nThis policy outlines the requirements for handling data in AI systems...",
  },
  {
    id: 2,
    name: "Model Development Guidelines",
    version: "1.3",
    status: "Under Review",
    lastUpdated: "2024-03-14",
    category: "Development",
    description: "Guidelines for developing and deploying AI models",
    content: "# Model Development Guidelines\n\nThese guidelines ensure consistent and secure AI model development...",
  },
  {
    id: 3,
    name: "AI Ethics Framework",
    version: "1.0",
    status: "Active",
    lastUpdated: "2024-03-10",
    category: "Ethics",
    description: "Framework for ethical AI development and deployment",
    content: "# AI Ethics Framework\n\nOur ethical principles for AI development and deployment...",
  },
];

const Policies = () => {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const onSubmit = (data: PolicyFormValues) => {
    const template = policyTemplates.find(t => t.id === data.template);
    const newPolicy: Policy = {
      id: policies.length + 1,
      name: data.name,
      version: "1.0",
      status: "Under Review",
      lastUpdated: new Date().toISOString().split('T')[0],
      category: template?.category || "Uncategorized",
      description: data.description,
      content: data.content,
    };

    setPolicies([...policies, newPolicy]);
    toast({
      title: "Policy Created",
      description: `${newPolicy.name} has been created successfully.`,
    });
  };

  const filteredPolicies = policies.filter((policy) =>
    policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <CreatePolicyDialog templates={policyTemplates} onSubmit={onSubmit} />
              </div>

              <Card className="p-6 bg-white/50 backdrop-blur-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search policies..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <PoliciesTable
                  policies={filteredPolicies}
                  onPolicyClick={setSelectedPolicy}
                />
              </Card>

              <PolicyDetailsDialog
                policy={selectedPolicy}
                onClose={() => setSelectedPolicy(null)}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Policies;
