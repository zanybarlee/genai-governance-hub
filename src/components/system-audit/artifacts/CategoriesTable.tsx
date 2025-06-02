
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { ArtifactCategory, ManagedArtifact } from "./types";
import { CategoryManagementDialog } from "./CategoryManagementDialog";

interface CategoriesTableProps {
  categories: ArtifactCategory[];
  artifacts: ManagedArtifact[];
  onUpdateCategory: (id: string, categoryData: Omit<ArtifactCategory, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesTable = ({ categories, artifacts, onUpdateCategory, onDeleteCategory }: CategoriesTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Artifacts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const artifactCount = artifacts.filter(a => a.categoryId === category.id).length;
            return (
              <TableRow key={category.id}>
                <TableCell>
                  <Badge className={category.color}>
                    {category.name}
                  </Badge>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{artifactCount} artifacts</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <CategoryManagementDialog
                      category={category}
                      onSave={(data) => onUpdateCategory(category.id, data)}
                    >
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CategoryManagementDialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                      disabled={artifactCount > 0}
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
