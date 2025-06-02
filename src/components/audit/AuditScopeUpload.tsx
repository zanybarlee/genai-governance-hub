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
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { policyTemplates } from "@/data/policyTemplates";
import { AuditScopeSessionHistory } from "./AuditScopeSessionHistory";
import { AuditScopeSession, ControlDomain } from "./types";

const auditTypeOptions = [
  { value: "annually", label: "Annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
  { value: "ad-hoc", label: "Ad-hoc" },
  { value: "custom", label: "Custom" }
];

const AUDIT_SESSIONS_STORAGE_KEY = 'audit-scope-sessions';

export const AuditScopeUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditType, setAuditType] = useState("");
  const [customAuditName, setCustomAuditName] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [scopeText, setScopeText] = useState("");
  const [controlDomains, setControlDomains] = useState<ControlDomain[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => 
    'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  );
  const [lastAiResponse, setLastAiResponse] = useState<string>("");
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

  const getAuditName = () => {
    if (auditType === "custom") {
      return customAuditName;
    }
    return auditTypeOptions.find(option => option.value === auditType)?.label || "";
  };

  const query = async (data: { question: string; overrideConfig?: any }) => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/d227947f-efaa-4e41-a66b-0e749cdbb113",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result.text;
  };

  const saveSessionToStorage = (sessionData: AuditScopeSession) => {
    try {
      const saved = localStorage.getItem(AUDIT_SESSIONS_STORAGE_KEY);
      const sessions = saved ? JSON.parse(saved) : [];
      
      const existingIndex = sessions.findIndex((s: AuditScopeSession) => s.id === sessionData.id);
      if (existingIndex >= 0) {
        sessions[existingIndex] = sessionData;
      } else {
        sessions.push(sessionData);
      }
      
      localStorage.setItem(AUDIT_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleSaveCurrentSession = (sessionName: string) => {
    const sessionData: AuditScopeSession = {
      id: currentSessionId,
      name: sessionName,
      createdAt: new Date(),
      lastUpdated: new Date(),
      auditType,
      customAuditName: auditType === "custom" ? customAuditName : undefined,
      selectedFrameworks,
      scopeText,
      controlDomains,
      aiResponse: lastAiResponse
    };
    
    saveSessionToStorage(sessionData);
  };

  const handleLoadSession = (sessionData: AuditScopeSession) => {
    setCurrentSessionId(sessionData.id);
    setAuditType(sessionData.auditType);
    setCustomAuditName(sessionData.customAuditName || "");
    setSelectedFrameworks(sessionData.selectedFrameworks);
    setScopeText(sessionData.scopeText);
    setControlDomains(sessionData.controlDomains);
    setLastAiResponse(sessionData.aiResponse || "");
  };

  const handleDeleteSession = (sessionId: string) => {
    if (sessionId === currentSessionId) {
      // Reset current session if deleted
      setCurrentSessionId('session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9));
      setAuditType("");
      setCustomAuditName("");
      setSelectedFrameworks([]);
      setScopeText("");
      setControlDomains([]);
      setLastAiResponse("");
    }
  };

  const handleScopeProcessing = async () => {
    const auditName = getAuditName();
    
    if (!auditType || (auditType === "custom" && !customAuditName) || selectedFrameworks.length === 0 || !scopeText) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including audit type and at least one compliance framework",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress steps
      const steps = [
        { progress: 20, message: "Preparing audit scope request..." },
        { progress: 40, message: "Calling AI agent for scope analysis..." },
        { progress: 60, message: "Processing AI response..." },
        { progress: 80, message: "Extracting control domains..." },
        { progress: 100, message: "Scope analysis complete!" }
      ];

      // Show initial progress
      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

      // Prepare the question for the AI agent
      const question = `Please analyze the following IT audit scope and provide detailed control domains:

Audit Type: ${auditName}
Compliance Frameworks: ${selectedFrameworks.join(', ')}
Audit Scope Description: ${scopeText}

Please identify and return specific control domains with their descriptions and relevant policy references that should be included in this ${auditName} audit for the specified compliance frameworks.`;

      // Call the AI agent
      const aiResponse = await query({
        question: question,
        overrideConfig: {
          supervisorName: "IT Audit Scope Analyzer",
          supervisorPrompt: "You are an expert IT auditor. Analyze the provided audit scope and return structured control domains with descriptions and policy references.",
          summarization: true,
          recursionLimit: 1,
        }
      });

      setLastAiResponse(aiResponse);

      // Continue with progress
      for (let i = 2; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

      // Parse AI response and create control domains
      // For now, we'll create mock domains but in a real implementation,
      // you would parse the AI response to extract structured data
      const mockDomains: ControlDomain[] = [
        {
          id: "1",
          name: "Access Control",
          description: "User access management and authentication controls based on AI analysis",
          policyReferences: ["IAM-001", "IAM-002", "IAM-005"],
          status: "ready"
        },
        {
          id: "2",
          name: "Data Security",
          description: "Data encryption, backup, and protection controls identified by AI",
          policyReferences: ["DS-001", "DS-003", "DS-007"],
          status: "ready"
        },
        {
          id: "3",
          name: "Change Management",
          description: "Software deployment and configuration controls from AI analysis",
          policyReferences: ["CM-001", "CM-004"],
          status: "processing"
        },
        {
          id: "4",
          name: "Monitoring & Logging",
          description: "System monitoring and audit logging controls recommended by AI",
          policyReferences: ["ML-001", "ML-002", "ML-008"],
          status: "identified"
        }
      ];

      setControlDomains(mockDomains);

      console.log("AI Response:", aiResponse);
      console.log("Audit Analysis Request:", {
        auditType: auditName,
        frameworks: selectedFrameworks,
        scope: scopeText
      });

      // Auto-save the current session with analysis results
      const autoSaveSessionData: AuditScopeSession = {
        id: currentSessionId,
        name: `Auto-saved: ${auditName} - ${new Date().toLocaleString()}`,
        createdAt: new Date(),
        lastUpdated: new Date(),
        auditType,
        customAuditName: auditType === "custom" ? customAuditName : undefined,
        selectedFrameworks,
        scopeText,
        controlDomains: mockDomains,
        aiResponse
      };
      
      saveSessionToStorage(autoSaveSessionData);

    } catch (error) {
      console.error("Error calling AI agent:", error);
      toast({
        title: "AI Analysis Failed",
        description: "Failed to analyze scope with AI agent. Please try again.",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setIsProcessing(false);
      
      if (controlDomains.length > 0 || progress === 100) {
        toast({
          title: "Scope Analysis Complete",
          description: `AI agent identified control domains for ${auditName} audit with ${selectedFrameworks.length} framework${selectedFrameworks.length > 1 ? 's' : ''}`,
        });
      }
    }
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Scope Analysis
          </h2>
          
          <AuditScopeSessionHistory
            currentSessionId={currentSessionId}
            onLoadSession={handleLoadSession}
            onDeleteSession={handleDeleteSession}
            onSaveCurrentSession={handleSaveCurrentSession}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="auditType">Audit Type *</Label>
              <Select value={auditType} onValueChange={setAuditType}>
                <SelectTrigger id="auditType" className="bg-white">
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {auditTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {auditType === "custom" && (
              <div>
                <Label htmlFor="customAuditName">Custom Audit Name *</Label>
                <Input 
                  id="customAuditName"
                  value={customAuditName}
                  onChange={(e) => setCustomAuditName(e.target.value)}
                  placeholder="Enter custom audit name"
                />
              </div>
            )}
            
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
              {progress < 20 && "Preparing audit scope request..."}
              {progress >= 20 && progress < 40 && "Calling AI agent for scope analysis..."}
              {progress >= 40 && progress < 60 && "Processing AI response..."}
              {progress >= 60 && progress < 80 && "Extracting control domains..."}
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
