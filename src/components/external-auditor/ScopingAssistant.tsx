
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Bot, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { ScopingChat } from "./ScopingChat";
import { AssetMapping } from "./AssetMapping";

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
    <div className="space-y-8">
      {/* Chat Interface - Full Width */}
      <div className="w-full">
        <ScopingChat engagementId={engagementId} />
      </div>

      {/* Asset Mapping Section - Full Width */}
      <div className="w-full">
        <AssetMapping engagementId={engagementId} />
      </div>

      {/* Document Analysis Section - Full Width */}
      <Card className="border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900 text-lg">
            <Bot className="h-5 w-5" />
            AI Document Analysis
          </CardTitle>
          <CardDescription className="text-sm">
            Upload client documents for automated control identification and mapping
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50/50">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Upload IT Policy manual, procedures, or configuration documents
            </p>
            <Button 
              onClick={handleFileUpload}
              disabled={isProcessing}
              className="gap-2"
              size="lg"
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
                  <p className="text-sm text-blue-700 mt-1">
                    Analyzing document for control identification and compliance mapping...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Documents List */}
          {documents.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Uploaded Documents</h4>
                <Badge variant="outline" className="text-xs">
                  {documents.length} document{documents.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <span className="font-medium text-sm">{doc.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{doc.size}</Badge>
                            <span className="text-xs text-gray-500">
                              {doc.uploadedAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          doc.status === "analyzed" ? "bg-green-100 text-green-800 border-green-200" : 
                          doc.status === "failed" ? "bg-red-100 text-red-800 border-red-200" :
                          "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                        variant="secondary"
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    
                    {doc.status === "analyzed" && doc.controls.length > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-2 font-medium">Identified Controls:</p>
                        <div className="flex flex-wrap gap-2">
                          {doc.controls.map((control, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {doc.status === "failed" && (
                      <div className="pt-3 border-t border-red-100">
                        <p className="text-sm text-red-600">
                          Failed to analyze document. Please try uploading again.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
