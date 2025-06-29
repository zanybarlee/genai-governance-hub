
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Bot, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { ScopingChat } from "./ScopingChat";

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

  const query = async (data: { question: string; overrideConfig?: any }) => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/ac822a35-d21c-4141-a0b3-e516a51917ee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  };

  const handleFileUpload = async () => {
    setIsProcessing(true);
    
    try {
      // Call the AI endpoint for document analysis
      const response = await query({
        question: "Please analyze the uploaded IT policy document and identify relevant controls for audit scoping. Focus on Access Control, Data Protection, Network Security, and Compliance requirements.",
        overrideConfig: {
          sessionId: `scoping-${engagementId}`,
          startInputType: "document_analysis",
          formTitle: "IT Policy Analysis",
          formDescription: "Analyzing uploaded policy document for control identification",
          formInputTypes: "policy_document"
        }
      });

      console.log("AI Response:", response);

      // Simulate processing time for UI feedback
      setTimeout(() => {
        const newDoc: UploadedDocument = {
          id: Date.now().toString(),
          name: "Client_Policy_Document.pdf",
          status: "analyzed",
          controls: ["Data Protection", "Incident Response", "Access Management", "Audit Logging"],
          size: "1.8 MB",
          uploadedAt: new Date()
        };
        
        setDocuments(prev => [...prev, newDoc]);
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      console.error("Error calling AI endpoint:", error);
      
      // Add failed document on error
      const failedDoc: UploadedDocument = {
        id: Date.now().toString(),
        name: "Failed_Document.pdf",
        status: "failed",
        controls: [],
        size: "Unknown",
        uploadedAt: new Date()
      };
      
      setDocuments(prev => [...prev, failedDoc]);
      setIsProcessing(false);
    }
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Document Upload Section */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Bot className="h-5 w-5" />
            AI Document Analysis
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

            {/* AI Processing Status */}
            {isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                  <div>
                    <p className="font-medium text-blue-900">AI Analysis in Progress</p>
                    <p className="text-sm text-blue-700">
                      Analyzing document for control identification and compliance mapping...
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                      className={
                        doc.status === "analyzed" ? "bg-green-100 text-green-800" : 
                        doc.status === "failed" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }
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
                  {doc.status === "failed" && (
                    <div className="mt-3">
                      <p className="text-sm text-red-600">
                        Failed to analyze document. Please try uploading again.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <ScopingChat engagementId={engagementId} />
    </div>
  );
};
