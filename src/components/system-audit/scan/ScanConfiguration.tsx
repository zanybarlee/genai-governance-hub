
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import { policyTemplates } from "@/data/policyTemplates";

interface ScanConfigurationProps {
  selectedPolicy: string;
  onPolicyChange: (value: string) => void;
  selectedArtifacts: string[];
  isScanning: boolean;
  onRunScan: () => void;
}

export const ScanConfiguration = ({
  selectedPolicy,
  onPolicyChange,
  selectedArtifacts,
  isScanning,
  onRunScan
}: ScanConfigurationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Select Policy</label>
        <Select value={selectedPolicy} onValueChange={onPolicyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a policy to scan against" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
            {policyTemplates.map((policy) => (
              <SelectItem key={policy.id} value={policy.id} className="hover:bg-gray-100">
                <div>
                  <div className="font-medium">{policy.name}</div>
                  <div className="text-xs text-gray-500">{policy.description}</div>
                  <div className="text-xs text-blue-600">{policy.category}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={onRunScan}
        disabled={isScanning || selectedArtifacts.length === 0 || !selectedPolicy}
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
