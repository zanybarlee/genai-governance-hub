
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface AuditExecutionProgressProps {
  progress: number;
}

export const AuditExecutionProgress = ({ progress }: AuditExecutionProgressProps) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        <span className="text-sm font-medium text-blue-900">AI Executing Audit...</span>
      </div>
      <Progress value={progress} className="mb-2" />
      <p className="text-sm text-blue-700">
        {progress < 20 && "Preparing audit execution request..."}
        {progress >= 20 && progress < 40 && "Calling AI agent for audit execution..."}
        {progress >= 40 && progress < 60 && "Processing audit findings..."}
        {progress >= 60 && progress < 80 && "Generating recommendations..."}
        {progress >= 80 && "Audit execution complete!"}
      </p>
    </div>
  );
};
