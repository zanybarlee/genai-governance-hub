
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ExecutionResult } from '../hooks/useAuditExecution';

interface AuditExecutionResultsProps {
  results: ExecutionResult[];
}

export const AuditExecutionResults = ({ results }: AuditExecutionResultsProps) => {
  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical": return <XCircle className="h-4 w-4 text-red-600" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "low": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-900">
        Audit Execution Results ({results.length} domains)
      </h3>
      
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{result.domainName}</CardTitle>
              <Badge className={getRiskColor(result.riskLevel)}>
                {getRiskIcon(result.riskLevel)}
                <span className="ml-1 capitalize">{result.riskLevel} Risk</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary-900 mb-3">Findings</h4>
                <ul className="space-y-2">
                  {result.findings.map((finding, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary-900 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
