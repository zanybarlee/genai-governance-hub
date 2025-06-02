
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { ArtifactCategory, ManagedArtifact } from "./types";
import { ArtifactManagementDialog } from "./ArtifactManagementDialog";

interface ArtifactsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: ArtifactCategory[];
  onCreateArtifact: (artifactData: Omit<ManagedArtifact, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const ArtifactsFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onCreateArtifact
}: ArtifactsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <ArtifactManagementDialog
          categories={categories}
          onSave={onCreateArtifact}
        >
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Artifact
          </Button>
        </ArtifactManagementDialog>
      </div>
    </div>
  );
};
