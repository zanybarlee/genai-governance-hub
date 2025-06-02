
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, CheckCircle, AlertTriangle, XCircle, Clock, FileText } from "lucide-react";
import { ManagedArtifact, ArtifactCategory } from "./types";
import { ArtifactManagementDialog } from "./ArtifactManagementDialog";

interface ArtifactsTableProps {
  artifacts: ManagedArtifact[];
  categories: ArtifactCategory[];
  onUpdateArtifact: (id: string, artifactData: Omit<ManagedArtifact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onDeleteArtifact: (id: string) => void;
}

export const ArtifactsTable = ({ artifacts, categories, onUpdateArtifact, onDeleteArtifact }: ArtifactsTableProps) => {
  const getCategoryById = (id: string) => categories.find(cat => cat.id === id);

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

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Paths</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artifacts.map((artifact) => {
            const category = getCategoryById(artifact.categoryId);
            return (
              <TableRow key={artifact.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{artifact.name}</div>
                    <div className="text-sm text-muted-foreground">{artifact.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {category && (
                    <Badge className={category.color}>
                      {category.name}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{artifact.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    {artifact.paths.slice(0, 2).map((path, index) => (
                      <div key={index} className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {path}
                      </div>
                    ))}
                    {artifact.paths.length > 2 && (
                      <div className="text-muted-foreground">
                        +{artifact.paths.length - 2} more
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(artifact.status)}
                    {artifact.score && (
                      <span className="text-sm font-medium">{artifact.score}%</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ArtifactManagementDialog
                      artifact={artifact}
                      categories={categories}
                      onSave={(data) => onUpdateArtifact(artifact.id, data)}
                    >
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </ArtifactManagementDialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteArtifact(artifact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
