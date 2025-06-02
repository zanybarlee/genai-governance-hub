
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, AlertTriangle, XCircle, Clock, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        System Artifacts *
      </label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-white"
          >
            <span className="text-left">
              {selectedArtifacts.length === 0 
                ? "Select System Artifacts" 
                : `${selectedArtifacts.length} ${selectedArtifacts.length === 1 ? 'artifact' : 'artifacts'} selected`
              }
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[500px] bg-white border shadow-lg z-50">
          <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
            {artifacts.map((artifact) => (
              <div 
                key={artifact.id}
                className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-sm cursor-pointer"
                onClick={() => !artifact.status.includes('scanning') && onArtifactSelection(artifact.id, !selectedArtifacts.includes(artifact.id))}
              >
                <Checkbox
                  id={artifact.id}
                  checked={selectedArtifacts.includes(artifact.id)}
                  onChange={() => onArtifactSelection(artifact.id, !selectedArtifacts.includes(artifact.id))}
                  disabled={artifact.status === 'scanning'}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(artifact.status)}
                    <span className="text-sm font-medium">{artifact.name}</span>
                    {artifact.score && (
                      <span className="text-xs font-medium text-gray-600">{artifact.score}%</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{artifact.type}</div>
                  {artifact.lastScan && (
                    <div className="text-xs text-blue-600 mt-1">
                      Last scan: {artifact.lastScan.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {selectedArtifacts.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedArtifacts.map((artifactId) => {
            const artifact = artifacts.find(a => a.id === artifactId);
            return (
              <Badge 
                key={artifactId}
                variant="secondary"
                className="text-xs"
              >
                {artifact?.name}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
