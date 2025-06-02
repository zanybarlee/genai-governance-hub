
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { ControlDomain } from '../types';

interface AuditScopeSelectorProps {
  availableDomains: ControlDomain[];
  selectedDomains: ControlDomain[];
  onDomainsChange: (domains: ControlDomain[]) => void;
}

export const AuditScopeSelector = ({ 
  availableDomains, 
  selectedDomains, 
  onDomainsChange 
}: AuditScopeSelectorProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "identified": return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default: return null;
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

  const handleDomainToggle = (domain: ControlDomain, checked: boolean) => {
    if (checked) {
      onDomainsChange([...selectedDomains, domain]);
    } else {
      onDomainsChange(selectedDomains.filter(d => d.id !== domain.id));
    }
  };

  if (availableDomains.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>No control domains available.</p>
            <p className="text-sm mt-2">Please analyze the audit scope first to identify control domains.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Select Control Domains for Execution ({selectedDomains.length}/{availableDomains.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableDomains.map((domain) => {
            const isSelected = selectedDomains.some(d => d.id === domain.id);
            return (
              <div 
                key={domain.id} 
                className={`p-4 border rounded-lg transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={domain.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleDomainToggle(domain, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <label 
                        htmlFor={domain.id}
                        className="font-medium text-primary-900 cursor-pointer"
                      >
                        {domain.name}
                      </label>
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
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
