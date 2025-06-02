
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ControlDomain } from "../types";

export interface AuditExecutionSession {
  id: string;
  name: string;
  createdAt: Date;
  lastUpdated: Date;
  selectedDomains: ControlDomain[];
  executionResults: ExecutionResult[];
  aiResponse?: string;
}

export interface ExecutionResult {
  id: string;
  domainId: string;
  domainName: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  findings: string[];
  recommendations: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
}

const EXECUTION_SESSIONS_STORAGE_KEY = 'audit-execution-sessions';

export const useAuditExecution = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDomains, setSelectedDomains] = useState<ControlDomain[]>([]);
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => 
    'execution-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  );
  const [lastAiResponse, setLastAiResponse] = useState<string>("");
  const { toast } = useToast();

  const query = async (data: { question: string; overrideConfig?: any }) => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/37842267-0956-4f81-95d0-ba1aa4540225",
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

  const saveSessionToStorage = (sessionData: AuditExecutionSession) => {
    try {
      const saved = localStorage.getItem(EXECUTION_SESSIONS_STORAGE_KEY);
      const sessions = saved ? JSON.parse(saved) : [];
      
      const existingIndex = sessions.findIndex((s: AuditExecutionSession) => s.id === sessionData.id);
      if (existingIndex >= 0) {
        sessions[existingIndex] = sessionData;
      } else {
        sessions.push(sessionData);
      }
      
      localStorage.setItem(EXECUTION_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving execution session:', error);
    }
  };

  const handleSaveCurrentSession = (sessionName: string) => {
    const sessionData: AuditExecutionSession = {
      id: currentSessionId,
      name: sessionName,
      createdAt: new Date(),
      lastUpdated: new Date(),
      selectedDomains,
      executionResults,
      aiResponse: lastAiResponse
    };
    
    saveSessionToStorage(sessionData);
  };

  const handleLoadSession = (sessionData: AuditExecutionSession) => {
    setCurrentSessionId(sessionData.id);
    setSelectedDomains(sessionData.selectedDomains);
    setExecutionResults(sessionData.executionResults);
    setLastAiResponse(sessionData.aiResponse || "");
  };

  const handleDeleteSession = (sessionId: string) => {
    if (sessionId === currentSessionId) {
      setCurrentSessionId('execution-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9));
      setSelectedDomains([]);
      setExecutionResults([]);
      setLastAiResponse("");
    }
  };

  const handleExecuteAudit = async () => {
    if (selectedDomains.length === 0) {
      toast({
        title: "No Domains Selected",
        description: "Please select at least one control domain to execute the audit",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setProgress(0);

    try {
      const steps = [
        { progress: 20, message: "Preparing audit execution request..." },
        { progress: 40, message: "Calling AI agent for audit execution..." },
        { progress: 60, message: "Processing audit findings..." },
        { progress: 80, message: "Generating recommendations..." },
        { progress: 100, message: "Audit execution complete!" }
      ];

      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

      const question = `Please execute an IT audit for the following control domains and provide detailed findings and recommendations:

Selected Control Domains: ${selectedDomains.map(d => `${d.name} - ${d.description}`).join(', ')}

Please analyze each domain, identify findings, assess risk levels, and provide actionable recommendations for improvement.`;

      const aiResponse = await query({
        question: question,
        overrideConfig: {
          sessionId: currentSessionId,
          supervisorName: "IT Audit Executor",
          supervisorPrompt: "You are an expert IT auditor. Execute audit procedures for the specified control domains and provide structured findings and recommendations.",
          summarization: true,
          recursionLimit: 1,
        }
      });

      setLastAiResponse(aiResponse);

      for (let i = 2; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(steps[i].progress);
      }

      // Mock execution results based on selected domains
      const mockResults: ExecutionResult[] = selectedDomains.map((domain, index) => ({
        id: `result-${domain.id}`,
        domainId: domain.id,
        domainName: domain.name,
        status: "completed" as const,
        findings: [
          `Identified ${Math.floor(Math.random() * 5) + 1} policy violations in ${domain.name}`,
          `Found ${Math.floor(Math.random() * 3) + 1} configuration issues`,
          "Documentation gaps discovered in control procedures"
        ],
        recommendations: [
          `Update ${domain.name} policies to align with current standards`,
          "Implement automated monitoring for this control domain",
          "Provide additional training to relevant personnel"
        ],
        riskLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high"
      }));

      setExecutionResults(mockResults);

      console.log("AI Execution Response:", aiResponse);
      console.log("Audit Execution Request:", {
        domains: selectedDomains.map(d => d.name),
        sessionId: currentSessionId
      });

      const autoSaveSessionData: AuditExecutionSession = {
        id: currentSessionId,
        name: `Auto-saved: Audit Execution - ${new Date().toLocaleString()}`,
        createdAt: new Date(),
        lastUpdated: new Date(),
        selectedDomains,
        executionResults: mockResults,
        aiResponse
      };
      
      saveSessionToStorage(autoSaveSessionData);

    } catch (error) {
      console.error("Error executing audit:", error);
      toast({
        title: "Audit Execution Failed",
        description: "Failed to execute audit with AI agent. Please try again.",
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setIsExecuting(false);
      
      if (executionResults.length > 0 || progress === 100) {
        toast({
          title: "Audit Execution Complete",
          description: `AI agent executed audit for ${selectedDomains.length} domain${selectedDomains.length > 1 ? 's' : ''}`,
        });
      }
    }
  };

  return {
    isExecuting,
    progress,
    selectedDomains,
    setSelectedDomains,
    executionResults,
    currentSessionId,
    handleSaveCurrentSession,
    handleLoadSession,
    handleDeleteSession,
    handleExecuteAudit
  };
};
