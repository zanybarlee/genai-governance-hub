
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArtifactCategory } from "./types";
import { toast } from "sonner";

interface CategoryManagementDialogProps {
  category?: ArtifactCategory;
  onSave: (category: Omit<ArtifactCategory, 'id'>) => void;
  children: React.ReactNode;
}

const COLOR_OPTIONS = [
  { value: 'bg-blue-100 text-blue-800', label: 'Blue', preview: 'bg-blue-100' },
  { value: 'bg-green-100 text-green-800', label: 'Green', preview: 'bg-green-100' },
  { value: 'bg-purple-100 text-purple-800', label: 'Purple', preview: 'bg-purple-100' },
  { value: 'bg-orange-100 text-orange-800', label: 'Orange', preview: 'bg-orange-100' },
  { value: 'bg-red-100 text-red-800', label: 'Red', preview: 'bg-red-100' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow', preview: 'bg-yellow-100' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'Indigo', preview: 'bg-indigo-100' },
  { value: 'bg-pink-100 text-pink-800', label: 'Pink', preview: 'bg-pink-100' },
  { value: 'bg-teal-100 text-teal-800', label: 'Teal', preview: 'bg-teal-100' },
  { value: 'bg-gray-100 text-gray-800', label: 'Gray', preview: 'bg-gray-100' }
];

export const CategoryManagementDialog = ({
  category,
  onSave,
  children
}: CategoryManagementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [color, setColor] = useState(category?.color || COLOR_OPTIONS[0].value);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      color
    });

    setOpen(false);
    toast.success(category ? "Category updated successfully" : "Category created successfully");
  };

  const resetForm = () => {
    setName(category?.name || '');
    setDescription(category?.description || '');
    setColor(category?.color || COLOR_OPTIONS[0].value);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edit Category' : 'Create New Category'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${option.preview}`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              {category ? 'Update Category' : 'Create Category'}
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
