
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface AuditScopeProgressProps {
  progress: number;
}

export const AuditScopeProgress = ({ progress }: AuditScopeProgressProps) => {
  return (
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
  );
};
