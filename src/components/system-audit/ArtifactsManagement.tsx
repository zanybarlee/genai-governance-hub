
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Settings, FileText, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { ArtifactManagementDialog } from "./artifacts/ArtifactManagementDialog";
import { CategoryManagementDialog } from "./artifacts/CategoryManagementDialog";
import { ManagedArtifact, ArtifactCategory, DEFAULT_CATEGORIES, DEFAULT_ARTIFACTS } from "./artifacts/types";
import { toast } from "sonner";

export const ArtifactsManagement = () => {
  const [artifacts, setArtifacts] = useState<ManagedArtifact[]>(DEFAULT_ARTIFACTS);
  const [categories, setCategories] = useState<ArtifactCategory[]>(DEFAULT_CATEGORIES);
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Artifacts Management
          </CardTitle>
          <CardDescription>
            Manage system artifacts and categories for compliance scanning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value="artifacts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="artifacts" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search artifacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                    onSave={handleCreateArtifact}
                  >
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Artifact
                    </Button>
                  </ArtifactManagementDialog>
                </div>
              </div>

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
                    {filteredArtifacts.map((artifact) => {
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
                                onSave={(data) => handleUpdateArtifact(artifact.id, data)}
                              >
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </ArtifactManagementDialog>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteArtifact(artifact.id)}
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
                                onSave={(data) => handleUpdateCategory(category.id, data)}
                              >
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </CategoryManagementDialog>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteCategory(category.id)}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
