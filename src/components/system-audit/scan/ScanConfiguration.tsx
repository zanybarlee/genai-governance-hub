
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import { policyTemplates } from "@/data/policyTemplates";

interface ScanConfigurationProps {
  selectedPolicies: string[];
  onPolicyChange: (policyId: string, checked: boolean) => void;
  selectedArtifacts: string[];
  isScanning: boolean;
  onRunScan: () => void;
}

export const ScanConfiguration = ({
  selectedPolicies,
  onPolicyChange,
  selectedArtifacts,
  isScanning,
  onRunScan
}: ScanConfigurationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Select Policies ({selectedPolicies.length} selected)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
          {policyTemplates.map((policy) => (
            <div key={policy.id} className="flex items-start space-x-2 p-2 border rounded">
              <Checkbox
                id={policy.id}
                checked={selectedPolicies.includes(policy.id)}
                onCheckedChange={(checked) => onPolicyChange(policy.id, checked as boolean)}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{policy.name}</div>
                <div className="text-xs text-gray-500">{policy.description}</div>
                <div className="text-xs text-blue-600">{policy.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button 
        onClick={onRunScan}
        disabled={isScanning || selectedArtifacts.length === 0 || selectedPolicies.length === 0}
        className="w-full gap-2"
      >
        {isScanning ? (
          <>
            <Clock className="h-4 w-4 animate-spin" />
            Scanning in Progress...
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            Run Compliance Scan
          </>
        )}
      </Button>
    </div>
  );
};
