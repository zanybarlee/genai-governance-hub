
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { policyTemplates } from "@/data/policyTemplates";

const auditTypeOptions = [
  { value: "annually", label: "Annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
  { value: "ad-hoc", label: "Ad-hoc" },
  { value: "custom", label: "Custom" }
];

interface AuditScopeFormProps {
  auditType: string;
  setAuditType: (value: string) => void;
  customAuditName: string;
  setCustomAuditName: (value: string) => void;
  selectedFrameworks: string[];
  setSelectedFrameworks: (frameworks: string[]) => void;
  scopeText: string;
  setScopeText: (text: string) => void;
  onAnalyze: () => void;
  isProcessing: boolean;
}

export const AuditScopeForm = ({
  auditType,
  setAuditType,
  customAuditName,
  setCustomAuditName,
  selectedFrameworks,
  setSelectedFrameworks,
  scopeText,
  setScopeText,
  onAnalyze,
  isProcessing
}: AuditScopeFormProps) => {
  const frameworkCategories = Array.from(new Set(policyTemplates.map(template => template.category)));

  const handleFrameworkToggle = (category: string) => {
    setSelectedFrameworks(
      selectedFrameworks.includes(category) 
        ? selectedFrameworks.filter(f => f !== category)
        : [...selectedFrameworks, category]
    );
  };

  return (
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
  );
};
