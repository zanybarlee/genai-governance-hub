
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Search } from "lucide-react";
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
    id: "data-privacy",
    name: "Data Privacy Policy",
    description: "Template for organizational data privacy standards",
    content: "# Data Privacy Policy\n\n## Purpose\nThis policy outlines...",
    category: "Privacy",
  },
  {
    id: "model-dev",
    name: "Model Development Guidelines",
    description: "Standards for AI model development and testing",
    content: "# Model Development Guidelines\n\n## Overview\nThese guidelines...",
    category: "Development",
  },
  {
    id: "ethics",
    name: "AI Ethics Framework",
    description: "Framework for ethical AI development and deployment",
    content: "# AI Ethics Framework\n\n## Principles\nOur ethical principles...",
    category: "Ethics",
  },
];

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

interface PolicyFormValues {
  name: string;
  description: string;
  template: string;
  content: string;
}

const Policies = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    // Here we would typically save the policy to the backend
  };

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
