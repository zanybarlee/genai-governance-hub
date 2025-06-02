
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ControlDomain } from "./types";
import { useAuditExecution } from "./hooks/useAuditExecution";
import { AuditScopeSelector } from "./components/AuditScopeSelector";
import { AuditExecutionProgress } from "./components/AuditExecutionProgress";
import { AuditExecutionResults } from "./components/AuditExecutionResults";
import { AuditExecutionSessionHistory } from "./AuditExecutionSessionHistory";

interface AuditExecutionProps {
  auditId: string | null;
}

export const AuditExecution = ({ auditId }: AuditExecutionProps) => {
  const [availableDomains, setAvailableDomains] = useState<ControlDomain[]>([]);
  const { toast } = useToast();

  const {
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
  } = useAuditExecution();

  useEffect(() => {
    // Load available domains from the scope analysis
    // In a real app, this would come from the scope analysis results
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
        status: "ready"
      },
      {
        id: "4",
        name: "Monitoring & Logging",
        description: "System monitoring and audit logging controls",
        policyReferences: ["ML-001", "ML-002", "ML-008"],
        status: "ready"
      }
    ];
    setAvailableDomains(mockDomains);
  }, [auditId]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-primary-900 flex items-center gap-2">
              <Play className="h-5 w-5" />
              Execute Audit Process
            </CardTitle>
            
            <AuditExecutionSessionHistory
              currentSessionId={currentSessionId}
              onLoadSession={handleLoadSession}
              onDeleteSession={handleDeleteSession}
              onSaveCurrentSession={handleSaveCurrentSession}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <AuditScopeSelector
              availableDomains={availableDomains}
              selectedDomains={selectedDomains}
              onDomainsChange={setSelectedDomains}
            />

            {isExecuting && <AuditExecutionProgress progress={progress} />}

            <div className="flex justify-center">
              <Button 
                onClick={handleExecuteAudit}
                disabled={isExecuting || selectedDomains.length === 0}
                className="gap-2 px-8"
                size="lg"
              >
                {isExecuting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isExecuting ? "Executing Audit..." : "Execute Audit Process"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuditExecutionResults results={executionResults} />
    </div>
  );
};
