
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { ControlDomain } from "./types";

interface AuditScopeResultsProps {
  controlDomains: ControlDomain[];
}

export const AuditScopeResults = ({ controlDomains }: AuditScopeResultsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "identified": return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "identified": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (controlDomains.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-primary-900 mb-4">
        Identified Control Domains ({controlDomains.length})
      </h3>
      
      <div className="grid gap-4">
        {controlDomains.map((domain) => (
          <div key={domain.id} className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-primary-900">{domain.name}</h4>
              <Badge className={getStatusColor(domain.status)}>
                {getStatusIcon(domain.status)}
                <span className="ml-1 capitalize">{domain.status}</span>
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{domain.description}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Policy References:</span>
              {domain.policyReferences.map((ref) => (
                <Badge key={ref} variant="outline" className="text-xs">
                  {ref}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
