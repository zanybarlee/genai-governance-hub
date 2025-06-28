
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle, AlertTriangle, Clock, Bot } from "lucide-react";
import { useState } from "react";

interface EvidenceItem {
  id: string;
  name: string;
  type: "policy" | "log" | "configuration" | "certificate";
  status: "received" | "pending" | "validated" | "non-compliant";
  control: string;
  standard: string;
  lastUpdated: Date;
}

interface EvidenceCollectionProps {
  engagementId: string;
}

export const EvidenceCollection = ({ engagementId }: EvidenceCollectionProps) => {
  const [evidenceItems] = useState<EvidenceItem[]>([
    {
      id: "1",
      name: "EncryptionPolicy.pdf",
      type: "policy",
      status: "validated",
      control: "A.10.1.1",
      standard: "ISO 27001",
      lastUpdated: new Date("2024-12-21")
    },
    {
      id: "2",
      name: "Firewall_Branch_Logs.zip",
      type: "log",
      status: "pending",
      control: "A.13.1.1",
      standard: "ISO 27001",
      lastUpdated: new Date("2024-12-18")
    },
    {
      id: "3",
      name: "Access_Control_Matrix.xlsx",
      type: "configuration",
      status: "non-compliant",
      control: "A.9.1.1",
      standard: "ISO 27001",
      lastUpdated: new Date("2024-12-20")
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "non-compliant": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated": return "bg-green-100 text-green-800";
      case "non-compliant": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "received": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "policy": return "📋";
      case "log": return "📊";
      case "configuration": return "⚙️";
      case "certificate": return "🔐";
      default: return "📄";
    }
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <FileText className="h-5 w-5" />
          Evidence Collection & Validation
        </CardTitle>
        <CardDescription>
          Collect and validate audit evidence with AI-powered compliance checking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* AI Prompt */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">GenAI Assistant</p>
                <p className="text-sm text-green-700">
                  "Please provide encryption-at-rest policy documentation for compliance validation."
                </p>
              </div>
            </div>
          </div>

          {/* Evidence Status Summary */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">1</div>
              <div className="text-xs text-gray-600">Validated</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">0</div>
              <div className="text-xs text-gray-600">Received</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">1</div>
              <div className="text-xs text-gray-600">Non-Compliant</div>
            </div>
          </div>

          {/* Evidence Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Evidence Items</h4>
              <Button size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Request Evidence
              </Button>
            </div>
            
            {evidenceItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    {getStatusIcon(item.status)}
                    <div>
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-sm text-gray-600">
                        Control: {item.control} • {item.standard}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)} variant="secondary">
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                
                {item.status === "validated" && item.name === "EncryptionPolicy.pdf" && (
                  <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm text-green-800">
                      ✓ Agent confirmed match to ISO 27001 A.10.1.1 - Encryption at rest requirements met
                    </p>
                  </div>
                )}
                
                {item.status === "pending" && item.name === "Firewall_Branch_Logs.zip" && (
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Missing firewall logs for branch offices - Evidence collection in progress
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
