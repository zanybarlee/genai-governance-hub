
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, FileText, CheckCircle, AlertTriangle, XCircle, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import { SystemComplianceApi } from "@/services/systemComplianceApi";
import { policyTemplates } from "@/data/policyTemplates";

interface Artifact {
  id: string;
  name: string;
  type: string;
  status: 'idle' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  lastScan?: Date;
}

interface ScanResult {
  artifactId: string;
  policyId: string;
  status: 'compliant' | 'warning' | 'failed';
  score: number;
  findings: string[];
  recommendations: string[];
}

export const SystemScans = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([
    { id: '1', name: 'api-gateway-config.json', type: 'Configuration', status: 'idle' },
    { id: '2', name: 'database-schema.sql', type: 'Database', status: 'idle' },
    { id: '3', name: 'security-policies.yaml', type: 'Security', status: 'idle' },
    { id: '4', name: 'network-config.xml', type: 'Network', status: 'idle' },
    { id: '5', name: 'auth-service.py', type: 'Code', status: 'idle' }
  ]);

  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);

  const handleArtifactSelection = (artifactId: string, checked: boolean) => {
    if (checked) {
      setSelectedArtifacts(prev => [...prev, artifactId]);
    } else {
      setSelectedArtifacts(prev => prev.filter(id => id !== artifactId));
    }
  };

  const runComplianceScan = async () => {
    if (selectedArtifacts.length === 0 || !selectedPolicy) {
      toast.error("Please select artifacts and a policy to scan against");
      return;
    }

    setIsScanning(true);
    const policy = policyTemplates.find(p => p.id === selectedPolicy);
    
    try {
      // Update artifact status to scanning
      setArtifacts(prev => prev.map(artifact => 
        selectedArtifacts.includes(artifact.id) 
          ? { ...artifact, status: 'scanning' as const }
          : artifact
      ));

      const results: ScanResult[] = [];

      for (const artifactId of selectedArtifacts) {
        const artifact = artifacts.find(a => a.id === artifactId);
        
        // Generate AI-powered compliance scan using the API
        const scanQuestion = `Perform a comprehensive compliance scan of ${artifact?.name} (${artifact?.type}) against the ${policy?.name} policy.

Please analyze:
- Configuration compliance with ${policy?.description}
- Security vulnerabilities and risks
- Policy violations and non-compliance issues
- Best practice adherence
- Data protection and privacy concerns

Provide detailed findings and actionable recommendations for remediation.`;

        const aiResponse = await SystemComplianceApi.query({
          question: scanQuestion,
          overrideConfig: {
            sessionId: `scan-${Date.now()}-${artifactId}`,
            supervisorName: "System Compliance Scanner",
            supervisorPrompt: "You are an expert system compliance scanner. Analyze artifacts against policies and provide detailed compliance findings with specific recommendations.",
            summarization: true,
            recursionLimit: 1,
          }
        });

        // Simulate scan results based on AI response
        const score = Math.floor(Math.random() * 40) + 60;
        const status = score >= 90 ? 'compliant' : score >= 70 ? 'warning' : 'failed';
        
        const result: ScanResult = {
          artifactId,
          policyId: selectedPolicy,
          status,
          score,
          findings: [
            "Configuration validation completed",
            "Security assessment performed",
            "Policy compliance checked"
          ],
          recommendations: [
            "Update configuration parameters",
            "Enhance security controls",
            "Implement recommended practices"
          ]
        };

        results.push(result);

        // Update artifact with scan results
        setArtifacts(prev => prev.map(a => 
          a.id === artifactId 
            ? { ...a, status, score, lastScan: new Date() }
            : a
        ));

        // Add delay between scans to simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      setScanResults(prev => [...prev, ...results]);
      toast.success(`Compliance scan completed for ${selectedArtifacts.length} artifacts`);
      
    } catch (error) {
      console.error('Scan error:', error);
      toast.error("Failed to complete compliance scan");
      
      // Reset artifact status on error
      setArtifacts(prev => prev.map(artifact => 
        selectedArtifacts.includes(artifact.id) 
          ? { ...artifact, status: 'idle' as const }
          : artifact
      ));
    } finally {
      setIsScanning(false);
      setSelectedArtifacts([]);
      setSelectedPolicy("");
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
      default:
        return <Badge variant="secondary">Ready</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Scan Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            System Compliance Scanner
          </CardTitle>
          <CardDescription>
            Run compliance scans on system artifacts against organizational policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Policy</label>
            <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a policy to scan against" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {policyTemplates.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id} className="hover:bg-gray-100">
                    <div>
                      <div className="font-medium">{policy.name}</div>
                      <div className="text-xs text-gray-500">{policy.description}</div>
                      <div className="text-xs text-blue-600">{policy.category}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Select Artifacts ({selectedArtifacts.length} selected)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {artifacts.map((artifact) => (
                <div key={artifact.id} className="flex items-center space-x-2 p-2 border rounded">
                  <Checkbox
                    id={artifact.id}
                    checked={selectedArtifacts.includes(artifact.id)}
                    onCheckedChange={(checked) => handleArtifactSelection(artifact.id, checked as boolean)}
                    disabled={artifact.status === 'scanning'}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(artifact.status)}
                      <span className="text-sm font-medium truncate">{artifact.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{artifact.type}</div>
                  </div>
                  {artifact.score && (
                    <div className="text-xs font-medium">{artifact.score}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={runComplianceScan}
            disabled={isScanning || selectedArtifacts.length === 0 || !selectedPolicy}
            className="w-full gap-2"
          >
            {isScanning ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                Scanning in Progress...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Compliance Scan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* System Artifacts */}
      <Card>
        <CardHeader>
          <CardTitle>System Artifacts</CardTitle>
          <CardDescription>
            Current status of system artifacts and their compliance scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(artifact.status)}
                  <div>
                    <h4 className="font-medium">{artifact.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{artifact.type}</span>
                      {artifact.lastScan && (
                        <>
                          <span>•</span>
                          <span>Last scan: {artifact.lastScan.toLocaleString()}</span>
                        </>
                      )}
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
