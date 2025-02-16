import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface PolicyTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
}

const policyTemplates: PolicyTemplate[] = [
  {
    id: "1.1",
    name: "Board & Executive Oversight",
    description: "Guidelines for board and executive oversight of AI initiatives",
    content: "# Board & Executive Oversight\n\n## Purpose\nThis policy establishes the framework for board and executive oversight of AI initiatives...",
    category: "Governance & Oversight",
  },
  {
    id: "1.2",
    name: "Roles & Responsibilities (RAEW)",
    description: "Definition of roles and responsibilities in AI governance",
    content: "# Roles & Responsibilities (RAEW)\n\n## Overview\nThis document outlines the Responsible, Accountable, Expert, Worker (RAEW) matrix...",
    category: "Governance & Oversight",
  },
  {
    id: "2.1",
    name: "Data Quality & Integrity",
    description: "Standards for ensuring data quality and integrity in AI systems",
    content: "# Data Quality & Integrity\n\n## Standards\nThis policy establishes the standards for data quality and integrity...",
    category: "Data Governance & Content Management",
  },
  {
    id: "2.2",
    name: "Data Privacy & Ethical Sourcing",
    description: "Guidelines for data privacy and ethical data sourcing",
    content: "# Data Privacy & Ethical Sourcing\n\n## Guidelines\nThis policy outlines the requirements for data privacy and ethical sourcing...",
    category: "Data Governance & Content Management",
  },
  {
    id: "2.3",
    name: "Content Provenance & Copyright",
    description: "Standards for content provenance and copyright compliance",
    content: "# Content Provenance & Copyright\n\n## Requirements\nThis policy establishes the standards for content provenance...",
    category: "Data Governance & Content Management",
  },
  {
    id: "3.1",
    name: "Trusted Development",
    description: "Framework for trusted AI development practices",
    content: "# Trusted Development\n\n## Framework\nThis policy outlines the framework for trusted AI development...",
    category: "Trusted Development & Deployment",
  },
  {
    id: "3.2",
    name: "AI Model Evaluation & Testing",
    description: "Standards for AI model evaluation and testing procedures",
    content: "# AI Model Evaluation & Testing\n\n## Procedures\nThis policy establishes the standards for AI model evaluation...",
    category: "Trusted Development & Deployment",
  },
  {
    id: "3.3",
    name: "Deployment Best Practices",
    description: "Best practices for AI system deployment",
    content: "# Deployment Best Practices\n\n## Guidelines\nThis policy outlines the best practices for AI system deployment...",
    category: "Trusted Development & Deployment",
  },
  {
    id: "4.1",
    name: "AI Risk Assessment & Mitigation",
    description: "Framework for AI risk assessment and mitigation strategies",
    content: "# AI Risk Assessment & Mitigation\n\n## Framework\nThis policy establishes the framework for AI risk assessment...",
    category: "Risk Management & Incident Response",
  },
  {
    id: "4.2",
    name: "Incident Reporting & Response",
    description: "Procedures for AI incident reporting and response",
    content: "# Incident Reporting & Response\n\n## Procedures\nThis policy outlines the procedures for AI incident reporting...",
    category: "Risk Management & Incident Response",
  },
  {
    id: "5.1",
    name: "AI Cybersecurity",
    description: "Standards for AI system cybersecurity",
    content: "# AI Cybersecurity\n\n## Standards\nThis policy establishes the standards for AI system cybersecurity...",
    category: "Security & Cyber Resilience",
  },
  {
    id: "5.2",
    name: "Vulnerability & Penetration Testing",
    description: "Guidelines for vulnerability assessment and penetration testing",
    content: "# Vulnerability & Penetration Testing\n\n## Guidelines\nThis policy outlines the requirements for vulnerability assessment...",
    category: "Security & Cyber Resilience",
  },
  {
    id: "6.1",
    name: "AI Fairness, Bias & Explainability",
    description: "Framework for ensuring AI fairness and explainability",
    content: "# AI Fairness, Bias & Explainability\n\n## Framework\nThis policy establishes the framework for AI fairness...",
    category: "Ethical AI, Safety & Alignment",
  },
  {
    id: "6.2",
    name: "AI Safety & Alignment Research",
    description: "Guidelines for AI safety and alignment research",
    content: "# AI Safety & Alignment Research\n\n## Guidelines\nThis policy outlines the guidelines for AI safety research...",
    category: "Ethical AI, Safety & Alignment",
  },
  {
    id: "6.3",
    name: "Human-in-the-Loop & Red-Teaming",
    description: "Standards for human oversight and red-teaming procedures",
    content: "# Human-in-the-Loop & Red-Teaming\n\n## Standards\nThis policy establishes the standards for human oversight...",
    category: "Ethical AI, Safety & Alignment",
  },
  {
    id: "7.1",
    name: "Regulatory Compliance",
    description: "Framework for ensuring regulatory compliance",
    content: "# Regulatory Compliance\n\n## Framework\nThis policy outlines the framework for regulatory compliance...",
    category: "Regulatory Compliance & Standards",
  },
  {
    id: "7.2",
    name: "External Audit & Standards Alignment",
    description: "Guidelines for external audits and standards alignment",
    content: "# External Audit & Standards Alignment\n\n## Guidelines\nThis policy establishes the guidelines for external audits...",
    category: "Regulatory Compliance & Standards",
  },
  {
    id: "8.1",
    name: "Environmental & Resource Efficiency",
    description: "Standards for environmental impact and resource efficiency",
    content: "# Environmental & Resource Efficiency\n\n## Standards\nThis policy outlines the standards for environmental impact...",
    category: "Sustainability & Societal Impact",
  },
  {
    id: "8.2",
    name: "Social Impact & Inclusivity",
    description: "Framework for ensuring social impact and inclusivity",
    content: "# Social Impact & Inclusivity\n\n## Framework\nThis policy establishes the framework for social impact...",
    category: "Sustainability & Societal Impact",
  },
];

interface Policy {
  id: number;
  name: string;
  version: string;
  status: "Active" | "Under Review";
  lastUpdated: string;
  category: string;
  description?: string;
  content?: string;
}

const policies: Policy[] = [
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

interface PolicyFormValues {
  name: string;
  description: string;
  template: string;
  content: string;
}

const Policies = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const form = useForm<PolicyFormValues>();

  const onTemplateSelect = (templateId: string) => {
    const template = policyTemplates.find((t) => t.id === templateId);
    if (template) {
      form.setValue("name", template.name);
      form.setValue("description", template.description);
      form.setValue("content", template.content);
    }
  };

  const onSubmit = (data: PolicyFormValues) => {
    console.log("Creating new policy:", data);
    setIsDialogOpen(false);
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <PlusCircle className="h-5 w-5" />
                      Create Policy
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Policy</DialogTitle>
                      <DialogDescription>
                        Create a new policy from scratch or use a template
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="template"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Select a Template</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    onTemplateSelect(value);
                                  }}
                                  className="grid grid-cols-3 gap-4"
                                >
                                  {policyTemplates.map((template) => (
                                    <FormItem key={template.id}>
                                      <FormControl>
                                        <div className="relative">
                                          <RadioGroupItem
                                            value={template.id}
                                            id={template.id}
                                            className="absolute right-4 top-4 h-4 w-4"
                                          />
                                          <label
                                            htmlFor={template.id}
                                            className="block p-4 rounded-lg border cursor-pointer hover:border-primary transition-colors"
                                          >
                                            <h4 className="font-medium text-primary-900 mb-1">
                                              {template.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                              {template.description}
                                            </p>
                                          </label>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Policy Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Policy Content</FormLabel>
                              <FormControl>
                                <Textarea {...field} className="min-h-[200px] font-mono" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Create Policy</Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
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
                      {filteredPolicies.map((policy) => (
                        <tr
                          key={policy.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedPolicy(policy)}
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

              <Dialog open={!!selectedPolicy} onOpenChange={(open) => !open && setSelectedPolicy(null)}>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{selectedPolicy?.name}</DialogTitle>
                    <DialogDescription>
                      Version {selectedPolicy?.version} • {selectedPolicy?.category}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                      <p className="text-gray-600">{selectedPolicy?.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Content</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap font-mono text-sm">
                          {selectedPolicy?.content}
                        </pre>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">
                          Last updated: {selectedPolicy?.lastUpdated}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPolicy(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Policies;
