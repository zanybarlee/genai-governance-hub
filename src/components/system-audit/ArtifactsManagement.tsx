
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings } from "lucide-react";
import { CategoryManagementDialog } from "./artifacts/CategoryManagementDialog";
import { ManagedArtifact, ArtifactCategory, DEFAULT_CATEGORIES, DEFAULT_ARTIFACTS } from "./artifacts/types";
import { UploadedArtifact } from "./artifacts/UploadedArtifact";
import { UploadSection } from "./artifacts/UploadSection";
import { UploadedFilesList } from "./artifacts/UploadedFilesList";
import { ArtifactsTable } from "./artifacts/ArtifactsTable";
import { CategoriesTable } from "./artifacts/CategoriesTable";
import { ArtifactsFilters } from "./artifacts/ArtifactsFilters";
import { toast } from "sonner";

export const ArtifactsManagement = () => {
  const [artifacts, setArtifacts] = useState<ManagedArtifact[]>(DEFAULT_ARTIFACTS);
  const [categories, setCategories] = useState<ArtifactCategory[]>(DEFAULT_CATEGORIES);
  const [uploadedArtifacts, setUploadedArtifacts] = useState<UploadedArtifact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artifact.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateArtifact = (artifactData: Omit<ManagedArtifact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArtifact: ManagedArtifact = {
      ...artifactData,
      id: `artifact-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setArtifacts([...artifacts, newArtifact]);
  };

  const handleUpdateArtifact = (id: string, artifactData: Omit<ManagedArtifact, 'id' | 'createdAt' | 'updatedAt'>) => {
    setArtifacts(artifacts.map(artifact => 
      artifact.id === id 
        ? { ...artifact, ...artifactData, updatedAt: new Date() }
        : artifact
    ));
  };

  const handleDeleteArtifact = (id: string) => {
    if (confirm('Are you sure you want to delete this artifact?')) {
      setArtifacts(artifacts.filter(artifact => artifact.id !== id));
      toast.success('Artifact deleted successfully');
    }
  };

  const handleCreateCategory = (categoryData: Omit<ArtifactCategory, 'id'>) => {
    const newCategory: ArtifactCategory = {
      ...categoryData,
      id: `category-${Date.now()}`
    };
    setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = (id: string, categoryData: Omit<ArtifactCategory, 'id'>) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, ...categoryData } : category
    ));
  };

  const handleDeleteCategory = (id: string) => {
    const hasArtifacts = artifacts.some(artifact => artifact.categoryId === id);
    if (hasArtifacts) {
      toast.error('Cannot delete category with existing artifacts');
      return;
    }
    
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newArtifact: UploadedArtifact = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getFileType(file.name),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        status: 'pending',
        uploadDate: new Date()
      };

      setUploadedArtifacts(prev => [newArtifact, ...prev]);
      
      // Simulate scanning process
      setTimeout(() => {
        setUploadedArtifacts(prev => prev.map(artifact => 
          artifact.id === newArtifact.id 
            ? { ...artifact, status: 'scanning' }
            : artifact
        ));
        
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 40) + 60;
          const status = randomScore >= 90 ? 'compliant' : randomScore >= 70 ? 'warning' : 'failed';
          
          setUploadedArtifacts(prev => prev.map(artifact => 
            artifact.id === newArtifact.id 
              ? { ...artifact, status, score: randomScore }
              : artifact
          ));
          
          toast.success(`Artifact ${file.name} scanned successfully`);
        }, 3000);
      }, 1000);
    });

    toast.success(`${files.length} artifact(s) uploaded for scanning`);
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'json': return 'Configuration';
      case 'yaml': case 'yml': return 'Configuration';
      case 'sql': return 'Database';
      case 'xml': return 'Configuration';
      case 'tf': return 'Infrastructure';
      case 'py': return 'Code';
      case 'js': case 'ts': return 'Code';
      default: return 'Document';
    }
  };

  const deleteUploadedArtifact = (id: string) => {
    setUploadedArtifacts(prev => prev.filter(artifact => artifact.id !== id));
    toast.success("Artifact deleted");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Artifacts Management
          </CardTitle>
          <CardDescription>
            Manage system artifacts, upload files for scanning, and organize categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="artifacts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="artifacts" className="space-y-4">
              <ArtifactsFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                onCreateArtifact={handleCreateArtifact}
              />

              <ArtifactsTable
                artifacts={filteredArtifacts}
                categories={categories}
                onUpdateArtifact={handleUpdateArtifact}
                onDeleteArtifact={handleDeleteArtifact}
              />
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <UploadSection onFileUpload={handleFileUpload} />
              <UploadedFilesList
                uploadedArtifacts={uploadedArtifacts}
                onDeleteArtifact={deleteUploadedArtifact}
              />
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="flex justify-end">
                <CategoryManagementDialog onSave={handleCreateCategory}>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </CategoryManagementDialog>
              </div>

              <CategoriesTable
                categories={categories}
                artifacts={artifacts}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
