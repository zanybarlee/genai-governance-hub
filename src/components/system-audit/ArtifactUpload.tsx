
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Trash2, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Artifact {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  uploadDate: Date;
}

export const ArtifactUpload = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([
    {
      id: '1',
      name: 'api-gateway-config.json',
      type: 'Configuration',
      size: '2.3 KB',
      status: 'compliant',
      score: 95,
      uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'database-schema.sql',
      type: 'Database',
      size: '15.7 KB',
      status: 'warning',
      score: 78,
      uploadDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'security-policies.yaml',
      type: 'Security',
      size: '5.1 KB',
      status: 'failed',
      score: 45,
      uploadDate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newArtifact: Artifact = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getFileType(file.name),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        status: 'pending',
        uploadDate: new Date()
      };

      setArtifacts(prev => [newArtifact, ...prev]);
      
      // Simulate scanning process
      setTimeout(() => {
        setArtifacts(prev => prev.map(artifact => 
          artifact.id === newArtifact.id 
            ? { ...artifact, status: 'scanning' }
            : artifact
        ));
        
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 40) + 60;
          const status = randomScore >= 90 ? 'compliant' : randomScore >= 70 ? 'warning' : 'failed';
          
          setArtifacts(prev => prev.map(artifact => 
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
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

  const deleteArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(artifact => artifact.id !== id));
    toast.success("Artifact deleted");
  };

  return (
    <div className="space-y-6">
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

      {/* Artifacts List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Artifacts</CardTitle>
          <CardDescription>
            View and manage your uploaded system artifacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {artifacts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No artifacts uploaded yet. Upload some files to get started.
              </div>
            ) : (
              artifacts.map((artifact) => (
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
                      onClick={() => deleteArtifact(artifact.id)}
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
    </div>
  );
};
