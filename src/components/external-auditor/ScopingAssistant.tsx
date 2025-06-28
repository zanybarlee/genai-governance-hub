
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Bot, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ScopingAssistantProps {
  engagementId: string;
}

interface UploadedDocument {
  id: string;
  name: string;
  status: "processing" | "analyzed" | "failed";
  controls: string[];
  size: string;
  uploadedAt: Date;
}

export const ScopingAssistant = ({ engagementId }: ScopingAssistantProps) => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: "1",
      name: "NeoPacific_IT_Policies_v3.pdf",
      status: "analyzed",
      controls: ["Access Control", "Encryption Standards", "Network Security", "Backup Procedures"],
      size: "2.4 MB",
      uploadedAt: new Date("2024-12-20")
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      const newDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: "Sample_Document.pdf",
        status: "analyzed",
        controls: ["Data Protection", "Incident Response"],
        size: "1.2 MB",
        uploadedAt: new Date()
      };
      setDocuments(prev => [...prev, newDoc]);
      setIsProcessing(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Bot className="h-5 w-5" />
          AI Scoping Assistant
        </CardTitle>
        <CardDescription>
          Upload client documents for automated control identification and mapping
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-4">
              Upload IT Policy manual, procedures, or configuration documents
            </p>
            <Button 
              onClick={handleFileUpload}
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {isProcessing ? "Processing..." : "Upload Documents"}
            </Button>
          </div>

          {/* AI Prompt */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">GenAI Assistant</p>
                <p className="text-sm text-blue-700">
                  "Please upload the client's latest IT Policy manual for control mapping and gap analysis."
                </p>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(doc.status)}
                    <span className="font-medium">{doc.name}</span>
                    <Badge variant="outline">{doc.size}</Badge>
                  </div>
                  <Badge 
                    className={doc.status === "analyzed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    variant="secondary"
                  >
                    {doc.status}
                  </Badge>
                </div>
                {doc.status === "analyzed" && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Identified Controls:</p>
                    <div className="flex flex-wrap gap-1">
                      {doc.controls.map((control, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {control}
                        </Badge>
                      ))}
                    </div>
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
