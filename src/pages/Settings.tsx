
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, XCircle, LoaderCircle } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [githubToken, setGithubToken] = useState("");
  const [selectedRole, setSelectedRole] = useState("developer");
  const [pipelineStatus, setPipelineStatus] = useState({
    linting: "success",
    testing: "running",
    security: "pending",
    deployment: "failed",
  });
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate status changes
      const stages = ['linting', 'testing', 'security', 'deployment'];
      const statuses = ['success', 'running', 'pending', 'failed'];
      const randomStage = stages[Math.floor(Math.random() * stages.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      setPipelineStatus(prev => ({
        ...prev,
        [randomStage]: randomStatus
      }));

      toast({
        title: "Pipeline Update",
        description: `${randomStage.charAt(0).toUpperCase() + randomStage.slice(1)} stage is now ${randomStatus}`,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, toast]);

  const handleSaveGitHub = () => {
    toast({
      title: "GitHub Settings Saved",
      description: "Your GitHub integration settings have been updated.",
    });
  };

  const handleSaveRole = () => {
    toast({
      title: "Role Updated",
      description: "The user role has been updated successfully.",
    });
  };

  const getStageDetails = (stage: string) => {
    const details = {
      linting: {
        description: "Static code analysis and style checking",
        command: "npm run lint",
        duration: "45 seconds",
        logs: [
          "Checking code style...",
          "Analyzing imports...",
          "Verifying formatting...",
        ],
      },
      testing: {
        description: "Running unit and integration tests",
        command: "npm run test",
        duration: "2 minutes",
        logs: [
          "Running unit tests...",
          "Testing API endpoints...",
          "Generating coverage report...",
        ],
      },
      security: {
        description: "Security vulnerability scanning",
        command: "npm audit",
        duration: "1 minute",
        logs: [
          "Scanning dependencies...",
          "Checking for vulnerabilities...",
          "Analyzing security rules...",
        ],
      },
      deployment: {
        description: "Deploying to production environment",
        command: "npm run deploy",
        duration: "3 minutes",
        logs: [
          "Building production bundle...",
          "Uploading assets...",
          "Updating configuration...",
        ],
      },
    };
    return details[stage as keyof typeof details];
  };

  const PipelineStep = ({ status, label }: { status: string; label: string }) => {
    const getIcon = () => {
      switch (status) {
        case "success":
          return <CheckCircle2 className="w-6 h-6 text-green-500" />;
        case "failed":
          return <XCircle className="w-6 h-6 text-red-500" />;
        case "running":
          return (
            <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          );
        default:
          return (
            <LoaderCircle className="w-6 h-6 text-gray-300" />
          );
      }
    };

    const getStatusColor = () => {
      switch (status) {
        case "success":
          return "bg-green-100 text-green-700";
        case "failed":
          return "bg-red-100 text-red-700";
        case "running":
          return "bg-blue-100 text-blue-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    return (
      <div 
        className="flex flex-col items-center space-y-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setSelectedStage(label.toLowerCase())}
      >
        <div className={`p-3 rounded-full ${getStatusColor()}`}>
          {getIcon()}
        </div>
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs capitalize text-gray-500">{status}</span>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-900">Settings</h1>
                <p className="text-gray-600 mt-2">
                  Manage your CI/CD integrations and user roles
                </p>
              </div>

              <Tabs defaultValue="cicd" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="cicd">CI/CD Integration</TabsTrigger>
                  <TabsTrigger value="roles">User Roles</TabsTrigger>
                </TabsList>

                <TabsContent value="cicd" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>GitHub Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Personal Access Token
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter GitHub token"
                          value={githubToken}
                          onChange={(e) => setGithubToken(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSaveGitHub}>Save GitHub Settings</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Pipeline Status</span>
                        <Button
                          variant="outline"
                          onClick={() => setAutoRefresh(!autoRefresh)}
                        >
                          {autoRefresh ? "Pause Updates" : "Resume Updates"}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="py-6">
                        <div className="flex justify-between items-center max-w-3xl mx-auto relative">
                          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200">
                            <div className="w-1/2 h-full bg-blue-500"></div>
                          </div>
                          <PipelineStep status={pipelineStatus.linting} label="Linting" />
                          <PipelineStep status={pipelineStatus.testing} label="Testing" />
                          <PipelineStep status={pipelineStatus.security} label="Security" />
                          <PipelineStep status={pipelineStatus.deployment} label="Deployment" />
                        </div>
                      </div>

                      {selectedStage && (
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                          <h3 className="text-lg font-semibold capitalize mb-4">
                            {selectedStage} Details
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                {getStageDetails(selectedStage).description}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Command</p>
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                  {getStageDetails(selectedStage).command}
                                </code>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Duration</p>
                                <p className="text-sm text-gray-600">
                                  {getStageDetails(selectedStage).duration}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">Logs</p>
                              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                                {getStageDetails(selectedStage).logs.map((log, index) => (
                                  <div key={index} className="py-1">
                                    {log}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pipeline Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Test Runner
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select test runner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jest">Jest</SelectItem>
                              <SelectItem value="mocha">Mocha</SelectItem>
                              <SelectItem value="cypress">Cypress</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Build Environment
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select environment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="node16">Node.js 16</SelectItem>
                              <SelectItem value="node18">Node.js 18</SelectItem>
                              <SelectItem value="node20">Node.js 20</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Deployment Target
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="production">Production</SelectItem>
                              <SelectItem value="staging">Staging</SelectItem>
                              <SelectItem value="development">Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="roles" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Role Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">User Role</label>
                        <Select
                          value={selectedRole}
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                            <SelectItem value="manager">Policy Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleSaveRole}>Update Role</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
