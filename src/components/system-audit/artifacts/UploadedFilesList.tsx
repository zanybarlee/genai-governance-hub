
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, Clock, FileText, Trash2 } from "lucide-react";
import { UploadedArtifact } from "./UploadedArtifact";

interface UploadedFilesListProps {
  uploadedArtifacts: UploadedArtifact[];
  onDeleteArtifact: (id: string) => void;
}

export const UploadedFilesList = ({ uploadedArtifacts, onDeleteArtifact }: UploadedFilesListProps) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'scanning':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'scanning':
        return <Badge className="bg-blue-100 text-blue-800">Scanning...</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>
        <CardDescription>
          View and manage your uploaded system artifacts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {uploadedArtifacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No files uploaded yet. Upload some files to get started.
            </div>
          ) : (
            uploadedArtifacts.map((artifact) => (
              <div key={artifact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(artifact.status)}
                  <div>
                    <h4 className="font-medium">{artifact.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{artifact.type}</span>
                      <span>•</span>
                      <span>{artifact.size}</span>
                      <span>•</span>
                      <span>{artifact.uploadDate.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(artifact.status)}
                  {artifact.score && (
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm font-semibold">{artifact.score}%</div>
                      <Progress value={artifact.score} className="w-16 h-2" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteArtifact(artifact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
