
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { policyTemplates } from "@/data/policyTemplates";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ScanConfigurationProps {
  selectedPolicies: string[];
  onPolicyChange: (policyId: string, checked: boolean) => void;
}

export const ScanConfiguration = ({
  selectedPolicies,
  onPolicyChange
}: ScanConfigurationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Compliance Policies *
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between bg-white"
            >
              <span className="text-left">
                {selectedPolicies.length === 0 
                  ? "Select Compliance Policies" 
                  : `${selectedPolicies.length} ${selectedPolicies.length === 1 ? 'policy' : 'policies'} selected`
                }
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[500px] bg-white border shadow-lg z-50">
            <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
              {policyTemplates.map((policy) => (
                <div 
                  key={policy.id}
                  className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-sm cursor-pointer"
                  onClick={() => onPolicyChange(policy.id, !selectedPolicies.includes(policy.id))}
                >
                  <Checkbox 
                    id={policy.id}
                    checked={selectedPolicies.includes(policy.id)}
                    onChange={() => onPolicyChange(policy.id, !selectedPolicies.includes(policy.id))}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{policy.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{policy.description}</div>
                    <div className="text-xs text-blue-600 mt-1">{policy.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {selectedPolicies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedPolicies.map((policyId) => {
              const policy = policyTemplates.find(p => p.id === policyId);
              return (
                <Badge 
                  key={policyId}
                  variant="secondary"
                  className="text-xs"
                >
                  {policy?.name}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
