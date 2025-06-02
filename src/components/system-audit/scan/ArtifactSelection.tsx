
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Artifact } from "./types";

interface ArtifactSelectionProps {
  artifacts: Artifact[];
  selectedArtifacts: string[];
  onArtifactSelection: (artifactId: string, checked: boolean) => void;
}

export const ArtifactSelection = ({
  artifacts,
  selectedArtifacts,
  onArtifactSelection
}: ArtifactSelectionProps) => {
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

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        Select Artifacts ({selectedArtifacts.length} selected)
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="flex items-center space-x-2 p-2 border rounded">
            <Checkbox
              id={artifact.id}
              checked={selectedArtifacts.includes(artifact.id)}
              onCheckedChange={(checked) => onArtifactSelection(artifact.id, checked as boolean)}
              disabled={artifact.status === 'scanning'}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {getStatusIcon(artifact.status)}
                <span className="text-sm font-medium truncate">{artifact.name}</span>
              </div>
              <div className="text-xs text-gray-500">{artifact.type}</div>
            </div>
            {artifact.score && (
              <div className="text-xs font-medium">{artifact.score}%</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
