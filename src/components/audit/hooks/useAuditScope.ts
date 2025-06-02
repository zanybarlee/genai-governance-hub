
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuditScopeSession, ControlDomain } from "../types";

const AUDIT_SESSIONS_STORAGE_KEY = 'audit-scope-sessions';

export const useAuditScope = () => {
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

  const getAuditName = () => {
    if (auditType === "custom") {
      return customAuditName;
    }
    const auditTypeOptions = [
      { value: "annually", label: "Annually" },
      { value: "quarterly", label: "Quarterly" },
      { value: "monthly", label: "Monthly" },
      { value: "ad-hoc", label: "Ad-hoc" },
      { value: "custom", label: "Custom" }
    ];
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
      const steps = [
        { progress: 20, message: "Preparing audit scope request..." },
        { progress: 40, message: "Calling AI agent for scope analysis..." },
        { progress: 60, message: "Processing AI response..." },
        { progress: 80, message: "Extracting control domains..." },
        { progress: 100, message: "Scope analysis complete!" }
      ];

      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

      const question = `Please analyze the following IT audit scope and provide detailed control domains:

Audit Type: ${auditName}
Compliance Frameworks: ${selectedFrameworks.join(', ')}
Audit Scope Description: ${scopeText}

Please identify and return specific control domains with their descriptions and relevant policy references that should be included in this ${auditName} audit for the specified compliance frameworks.`;

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

      for (let i = 2; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

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

  return {
    isProcessing,
    progress,
    auditType,
    setAuditType,
    customAuditName,
    setCustomAuditName,
    selectedFrameworks,
    setSelectedFrameworks,
    scopeText,
    setScopeText,
    controlDomains,
    currentSessionId,
    handleSaveCurrentSession,
    handleLoadSession,
    handleDeleteSession,
    handleScopeProcessing
  };
};
