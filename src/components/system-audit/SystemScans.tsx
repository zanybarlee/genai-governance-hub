
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { toast } from "sonner";
import { Artifact, ScanResult } from "./scan/types";
import { ScanConfiguration } from "./scan/ScanConfiguration";
import { ArtifactSelection } from "./scan/ArtifactSelection";
import { SystemArtifactsDisplay } from "./scan/SystemArtifactsDisplay";
import { runComplianceScanForArtifact } from "./scan/scanUtils";

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
    
    try {
      // Update artifact status to scanning
      setArtifacts(prev => prev.map(artifact => 
        selectedArtifacts.includes(artifact.id) 
          ? { ...artifact, status: 'scanning' as const }
          : artifact
      ));

      const results: ScanResult[] = [];

      for (const artifactId of selectedArtifacts) {
        const result = await runComplianceScanForArtifact(artifactId, artifacts, selectedPolicy);
        results.push(result);

        // Update artifact with scan results
        setArtifacts(prev => prev.map(a => 
          a.id === artifactId 
            ? { ...a, status: result.status, score: result.score, lastScan: new Date() }
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
          <ScanConfiguration
            selectedPolicy={selectedPolicy}
            onPolicyChange={setSelectedPolicy}
            selectedArtifacts={selectedArtifacts}
            isScanning={isScanning}
            onRunScan={runComplianceScan}
          />

          <ArtifactSelection
            artifacts={artifacts}
            selectedArtifacts={selectedArtifacts}
            onArtifactSelection={handleArtifactSelection}
          />
        </CardContent>
      </Card>

      <SystemArtifactsDisplay artifacts={artifacts} />
    </div>
  );
};
