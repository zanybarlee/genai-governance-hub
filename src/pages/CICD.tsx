import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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

const CICD = () => {
  const { toast } = useToast();
  const [githubToken, setGithubToken] = useState("");
  const [pipelineStatus, setPipelineStatus] = useState({
    linting: "success",
    testing: "running",
    security: "pending",
    deployment: "failed",
  });
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      try {
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
      } catch (error) {
        console.error("Pipeline update error:", error);
        toast({
          title: "Pipeline Error",
          description: "Failed to update pipeline status. Retrying...",
          variant: "destructive",
        });
        
        if (error instanceof Error && error.message.includes("consecutive")) {
          setAutoRefresh(false);
          toast({
            title: "Auto-refresh Disabled",
            description: "Too many errors occurred. Please check your connection and try again.",
            variant: "destructive",
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, toast]);

  const handleSaveGitHub = () => {
    toast({
      title: "GitHub Settings Saved",
      description: "Your GitHub integration settings have been updated.",
    });
  };

  const getStageDetails = (stage: string) => {
    const details = {
      linting: {
        description: "Static code analysis and style checking",
        command: "npm run lint",
        duration: "45 seconds",
        logs: [
          { timestamp: "10:15:32", level: "info", message: "Starting linting process..." },
          { timestamp: "10:15:33", level: "debug", message: "Checking code style conventions" },
          { timestamp: "10:15:34", level: "info", message: "Analyzing import statements" },
          { timestamp: "10:15:35", level: "warning", message: "Found 2 unnecessary imports" },
          { timestamp: "10:15:36", level: "info", message: "Verifying formatting rules" },
          { timestamp: "10:15:37", level: "success", message: "Linting completed successfully" }
        ],
        status: pipelineStatus.linting
      },
      testing: {
        description: "Running unit and integration tests",
        command: "npm run test",
        duration: "2 minutes",
        logs: [
          { timestamp: "10:16:00", level: "info", message: "Initiating test suite..." },
          { timestamp: "10:16:01", level: "debug", message: "Loading test configurations" },
          { timestamp: "10:16:02", level: "info", message: "Running unit tests" },
          { timestamp: "10:16:03", level: "error", message: "Test failed: Auth component" },
          { timestamp: "10:16:04", level: "info", message: "Running integration tests" },
          { timestamp: "10:16:05", level: "success", message: "Integration tests passed" }
        ],
        status: pipelineStatus.testing
      },
      security: {
        description: "Security vulnerability scanning",
        command: "npm audit",
        duration: "1 minute",
        logs: [
          { timestamp: "10:17:00", level: "info", message: "Starting security scan..." },
          { timestamp: "10:17:01", level: "debug", message: "Loading security rules" },
          { timestamp: "10:17:02", level: "warning", message: "Outdated dependency detected" },
          { timestamp: "10:17:03", level: "error", message: "Critical vulnerability found" },
          { timestamp: "10:17:04", level: "info", message: "Generating security report" },
          { timestamp: "10:17:05", level: "success", message: "Scan completed" }
        ],
        status: pipelineStatus.security
      },
      deployment: {
        description: "Deploying to production environment",
        command: "npm run deploy",
        duration: "3 minutes",
        logs: [
          { timestamp: "10:18:00", level: "info", message: "Starting deployment..." },
          { timestamp: "10:18:01", level: "debug", message: "Building production bundle" },
          { timestamp: "10:18:02", level: "info", message: "Uploading assets" },
          { timestamp: "10:18:03", level: "warning", message: "Slow network detected" },
          { timestamp: "10:18:04", level: "info", message: "Updating configurations" },
          { timestamp: "10:18:05", level: "success", message: "Deployment successful" }
        ],
        status: pipelineStatus.deployment
      },
    };
    return details[stage as keyof typeof details];
  };

  const getLogLevelStyle = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "debug":
        return "text-gray-400";
      default:
        return "text-gray-200";
    }
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
                <h1 className="text-3xl font-bold text-primary-900">CI/CD Integration</h1>
                <p className="text-gray-600 mt-2">
                  Manage your continuous integration and deployment pipeline
                </p>
              </div>

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
                          <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono max-h-80 overflow-y-auto">
                            {getStageDetails(selectedStage).logs.map((log, index) => (
                              <div key={index} className="py-1 flex items-start space-x-2">
                                <span className="text-gray-500">{log.timestamp}</span>
                                <span className={`uppercase text-xs ${getLogLevelStyle(log.level)}`}>
                                  [{log.level}]
                                </span>
                                <span>{log.message}</span>
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
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select test runner" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
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
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
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
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CICD;
