
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Loader2 } from "lucide-react";
import { AuditScopeSessionHistory } from "./AuditScopeSessionHistory";
import { AuditScopeForm } from "./AuditScopeForm";
import { AuditScopeProgress } from "./AuditScopeProgress";
import { AuditScopeResults } from "./AuditScopeResults";
import { useAuditScope } from "./hooks/useAuditScope";

export const AuditScopeUpload = () => {
  const {
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
  } = useAuditScope();

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
        
        <AuditScopeForm
          auditType={auditType}
          setAuditType={setAuditType}
          customAuditName={customAuditName}
          setCustomAuditName={setCustomAuditName}
          selectedFrameworks={selectedFrameworks}
          setSelectedFrameworks={setSelectedFrameworks}
          scopeText={scopeText}
          setScopeText={setScopeText}
          onAnalyze={handleScopeProcessing}
          isProcessing={isProcessing}
        />

        {isProcessing && <AuditScopeProgress progress={progress} />}

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

      <AuditScopeResults controlDomains={controlDomains} />
    </div>
  );
};
