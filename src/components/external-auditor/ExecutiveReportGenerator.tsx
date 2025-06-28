
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Bot, BarChart3, Building } from "lucide-react";
import { useState } from "react";

interface ExecutiveReportGeneratorProps {
  engagementId: string;
  clientName: string;
}

export const ExecutiveReportGenerator = ({ engagementId, clientName }: ExecutiveReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 3000);
  };

  return (
    <Card className="border-indigo-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <FileText className="h-5 w-5" />
          Executive Report Generator
        </CardTitle>
        <CardDescription>
          Generate comprehensive audit reports with KPMG branding and client customization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* AI Generation Prompt */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-medium text-indigo-900">Report Generation Request</p>
                <p className="text-sm text-indigo-700">
                  "Generate Executive Summary for {clientName} - 2025 Annual Audit"
                </p>
              </div>
            </div>
          </div>

          {/* Report Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Report Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">KPMG Branding</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">✓</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Client Logo ({clientName})</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">✓</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Risk Heatmap</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">✓</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Executive Summary</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">✓</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Report Sections</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Audit Scope & Objectives</div>
                <div>• Control Environment Assessment</div>
                <div>• Key Findings & Recommendations</div>
                <div>• Risk Heat Map</div>
                <div>• Remediation Timeline</div>
                <div>• Management Response</div>
              </div>
            </div>
          </div>

          {/* Generation Status */}
          {reportGenerated ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-900">Report Generated Successfully</p>
                  <p className="text-sm text-green-700">
                    Executive Summary for {clientName} is ready for download
                  </p>
                </div>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-blue-600 animate-pulse" />
                <div>
                  <p className="font-medium text-blue-900">Generating Executive Report...</p>
                  <p className="text-sm text-blue-700">
                    AI is compiling findings, creating visualizations, and formatting report
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Button 
                onClick={handleGenerateReport}
                className="gap-2"
                size="lg"
              >
                <FileText className="h-5 w-5" />
                Generate Executive Summary
              </Button>
            </div>
          )}

          {/* Sample Report Preview */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Sample Report Elements</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Risk Distribution:</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Critical:</span>
                    <Badge className="bg-red-100 text-red-800">1</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>High:</span>
                    <Badge className="bg-orange-100 text-orange-800">3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">5</Badge>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-700">Compliance Score:</p>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-blue-600">73%</div>
                  <div className="text-xs text-gray-500">Overall Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
