
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Settings, FileText, CheckCircle, AlertTriangle, XCircle, Clock, Upload } from "lucide-react";
import { ArtifactManagementDialog } from "./artifacts/ArtifactManagementDialog";
import { CategoryManagementDialog } from "./artifacts/CategoryManagementDialog";
import { ManagedArtifact, ArtifactCategory, DEFAULT_CATEGORIES, DEFAULT_ARTIFACTS } from "./artifacts/types";
import { toast } from "sonner";

interface UploadedArtifact {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  uploadDate: Date;
}

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
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

            <TabsContent value="upload" className="space-y-4">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload System Artifacts
                  </CardTitle>
                  <CardDescription>
                    Upload configuration files, schemas, policies, and other system artifacts for compliance checking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="artifacts">Select Files</Label>
                    <Input
                      id="artifacts"
                      type="file"
                      multiple
                      accept=".json,.yaml,.yml,.sql,.xml,.tf,.py,.js,.ts,.txt,.md"
                      onChange={handleFileUpload}
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: JSON, YAML, SQL, XML, Terraform, Python, JavaScript, TypeScript
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Uploaded Files List */}
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files</CardTitle>
                  <CardDescription>
                    View and manage your uploaded system artifacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {uploadedArtifacts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No files uploaded yet. Upload some files to get started.
                      </div>
                    ) : (
                      uploadedArtifacts.map((artifact) => (
                        <div key={artifact.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(artifact.status)}
                            <div>
                              <h4 className="font-medium">{artifact.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{artifact.type}</span>
                                <span>•</span>
                                <span>{artifact.size}</span>
                                <span>•</span>
                                <span>{artifact.uploadDate.toLocaleString()}</span>
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
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteUploadedArtifact(artifact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
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
