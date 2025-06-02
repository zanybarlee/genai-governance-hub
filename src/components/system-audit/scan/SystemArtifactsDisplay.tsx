
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Artifact } from "./types";

interface SystemArtifactsDisplayProps {
  artifacts: Artifact[];
}

export const SystemArtifactsDisplay = ({ artifacts }: SystemArtifactsDisplayProps) => {
  const getStatusIcon = (status: string) => {
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
      default:
        return <Badge variant="secondary">Ready</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Artifacts</CardTitle>
        <CardDescription>
          Current status of system artifacts and their compliance scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {artifacts.map((artifact) => (
            <div key={artifact.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(artifact.status)}
                <div>
                  <h4 className="font-medium">{artifact.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{artifact.type}</span>
                    {artifact.lastScan && (
                      <>
                        <span>•</span>
                        <span>Last scan: {artifact.lastScan.toLocaleString()}</span>
                      </>
                    )}
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
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
