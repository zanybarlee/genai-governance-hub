
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { ManagedArtifact, ArtifactCategory } from "./types";
import { toast } from "sonner";

interface ArtifactManagementDialogProps {
  artifact?: ManagedArtifact;
  categories: ArtifactCategory[];
  onSave: (artifact: Omit<ManagedArtifact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  children: React.ReactNode;
}

export const ArtifactManagementDialog = ({
  artifact,
  categories,
  onSave,
  children
}: ArtifactManagementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(artifact?.name || '');
  const [categoryId, setCategoryId] = useState(artifact?.categoryId || '');
  const [description, setDescription] = useState(artifact?.description || '');
  const [type, setType] = useState(artifact?.type || 'Configuration');
  const [paths, setPaths] = useState<string[]>(artifact?.paths || ['']);

  const handleAddPath = () => {
    setPaths([...paths, '']);
  };

  const handleRemovePath = (index: number) => {
    setPaths(paths.filter((_, i) => i !== index));
  };

  const handlePathChange = (index: number, value: string) => {
    const newPaths = [...paths];
    newPaths[index] = value;
    setPaths(newPaths);
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Artifact name is required");
      return;
    }
    
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    const validPaths = paths.filter(path => path.trim() !== '');
    if (validPaths.length === 0) {
      toast.error("At least one path is required");
      return;
    }

    onSave({
      name: name.trim(),
      categoryId,
      description: description.trim(),
      type,
      paths: validPaths,
      status: artifact?.status || 'idle',
      score: artifact?.score,
      lastScan: artifact?.lastScan
    });

    setOpen(false);
    toast.success(artifact ? "Artifact updated successfully" : "Artifact created successfully");
  };

  const resetForm = () => {
    setName(artifact?.name || '');
    setCategoryId(artifact?.categoryId || '');
    setDescription(artifact?.description || '');
    setType(artifact?.type || 'Configuration');
    setPaths(artifact?.paths || ['']);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {artifact ? 'Edit Artifact' : 'Create New Artifact'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Artifact Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter artifact name"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <Badge className={category.color}>{category.name}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Configuration">Configuration</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Network">Network</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Code">Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>File Paths *</Label>
            <div className="space-y-2">
              {paths.map((path, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={path}
                    onChange={(e) => handlePathChange(index, e.target.value)}
                    placeholder="/etc/example/file"
                  />
                  {paths.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemovePath(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddPath}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Path
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter artifact description"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              {artifact ? 'Update Artifact' : 'Create Artifact'}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
