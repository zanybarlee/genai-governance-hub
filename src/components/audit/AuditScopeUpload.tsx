
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Loader2,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { policyTemplates } from "@/data/policyTemplates";

interface ControlDomain {
  id: string;
  name: string;
  description: string;
  policyReferences: string[];
  status: "identified" | "processing" | "ready";
}

export const AuditScopeUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditName, setAuditName] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [scopeText, setScopeText] = useState("");
  const [controlDomains, setControlDomains] = useState<ControlDomain[]>([]);
  const { toast } = useToast();

  // Get unique categories from policy templates
  const frameworkCategories = Array.from(new Set(policyTemplates.map(template => template.category)));

  const handleFrameworkToggle = (category: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const handleScopeProcessing = async () => {
    if (!auditName || selectedFrameworks.length === 0 || !scopeText) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including at least one compliance framework",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate AI processing
    const steps = [
      { progress: 20, message: "Analyzing scope document..." },
      { progress: 40, message: "Extracting control domains..." },
      { progress: 60, message: "Retrieving policy references..." },
      { progress: 80, message: "Generating audit questions..." },
      { progress: 100, message: "Scope analysis complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(step.progress);
      
      if (step.progress === 100) {
        // Simulate extracted control domains
        const mockDomains: ControlDomain[] = [
          {
            id: "1",
            name: "Access Control",
            description: "User access management and authentication controls",
            policyReferences: ["IAM-001", "IAM-002", "IAM-005"],
            status: "ready"
          },
          {
            id: "2",
            name: "Data Security",
            description: "Data encryption, backup, and protection controls",
            policyReferences: ["DS-001", "DS-003", "DS-007"],
            status: "ready"
          },
          {
            id: "3",
            name: "Change Management",
            description: "Software deployment and configuration controls",
            policyReferences: ["CM-001", "CM-004"],
            status: "processing"
          },
          {
            id: "4",
            name: "Monitoring & Logging",
            description: "System monitoring and audit logging controls",
            policyReferences: ["ML-001", "ML-002", "ML-008"],
            status: "identified"
          }
        ];
        setControlDomains(mockDomains);
      }
    }

    setIsProcessing(false);
    toast({
      title: "Scope Analysis Complete",
      description: `Identified ${4} control domains with automated question generation based on ${selectedFrameworks.length} framework${selectedFrameworks.length > 1 ? 's' : ''}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "identified": return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "identified": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Scope Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="auditName">Audit Name *</Label>
              <Input 
                id="auditName"
                value={auditName}
                onChange={(e) => setAuditName(e.target.value)}
                placeholder="e.g., Q4 SOC 2 Type II Audit"
              />
            </div>
            
            <div>
              <Label htmlFor="framework">Compliance Framework *</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-white"
                    id="framework"
                  >
                    <span className="text-left">
                      {selectedFrameworks.length === 0 
                        ? "Select Compliance Frameworks" 
                        : `${selectedFrameworks.length} framework${selectedFrameworks.length > 1 ? 's' : ''} selected`
                      }
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[300px] bg-white border shadow-lg z-50">
                  <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
                    {frameworkCategories.map((category) => (
                      <div 
                        key={category}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-sm cursor-pointer"
                        onClick={() => handleFrameworkToggle(category)}
                      >
                        <Checkbox 
                          id={category}
                          checked={selectedFrameworks.includes(category)}
                          onChange={() => handleFrameworkToggle(category)}
                        />
                        <label 
                          htmlFor={category} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedFrameworks.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedFrameworks.map((framework) => (
                    <Badge 
                      key={framework}
                      variant="secondary"
                      className="text-xs"
                    >
                      {framework}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="scopeText">Audit Scope Description *</Label>
            <Textarea
              id="scopeText"
              value={scopeText}
              onChange={(e) => setScopeText(e.target.value)}
              placeholder="Describe the systems, processes, and controls to be audited..."
              rows={6}
            />
          </div>
        </div>

        {isProcessing && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-blue-900">AI Processing Scope...</span>
            </div>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-blue-700">
              {progress < 20 && "Analyzing scope document..."}
              {progress >= 20 && progress < 40 && "Extracting control domains..."}
              {progress >= 40 && progress < 60 && "Retrieving policy references..."}
              {progress >= 60 && progress < 80 && "Generating audit questions..."}
              {progress >= 80 && "Scope analysis complete!"}
            </p>
          </div>
        )}

        <Button 
          onClick={handleScopeProcessing}
          disabled={isProcessing}
          className="gap-2"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isProcessing ? "Processing..." : "Analyze Scope with AI"}
        </Button>
      </Card>

      {controlDomains.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">
            Identified Control Domains ({controlDomains.length})
          </h3>
          
          <div className="grid gap-4">
            {controlDomains.map((domain) => (
              <div key={domain.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-primary-900">{domain.name}</h4>
                  <Badge className={getStatusColor(domain.status)}>
                    {getStatusIcon(domain.status)}
                    <span className="ml-1 capitalize">{domain.status}</span>
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{domain.description}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Policy References:</span>
                  {domain.policyReferences.map((ref) => (
                    <Badge key={ref} variant="outline" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
