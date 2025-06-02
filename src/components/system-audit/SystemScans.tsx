
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Play, Clock } from "lucide-react";
import { toast } from "sonner";
import { Artifact, ScanResult } from "./scan/types";
import { ScanConfiguration } from "./scan/ScanConfiguration";
import { ArtifactSelection } from "./scan/ArtifactSelection";
import { SystemArtifactsDisplay } from "./scan/SystemArtifactsDisplay";
import { runComplianceScanForArtifact } from "./scan/scanUtils";
import { DEFAULT_ARTIFACTS } from "./artifacts/types";

export const SystemScans = () => {
  // Convert managed artifacts to scan artifacts format
  const convertToScanArtifacts = (): Artifact[] => {
    return DEFAULT_ARTIFACTS.map(managedArtifact => ({
      id: managedArtifact.id,
      name: managedArtifact.name,
      type: managedArtifact.type,
      status: managedArtifact.status || 'idle',
      score: managedArtifact.score,
      lastScan: managedArtifact.lastScan
    }));
  };

  const [artifacts, setArtifacts] = useState<Artifact[]>(convertToScanArtifacts());
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);

  const handleArtifactSelection = (artifactId: string, checked: boolean) => {
    if (checked) {
      setSelectedArtifacts(prev => [...prev, artifactId]);
    } else {
      setSelectedArtifacts(prev => prev.filter(id => id !== artifactId));
    }
  };

  const handlePolicySelection = (policyId: string, checked: boolean) => {
    if (checked) {
      setSelectedPolicies(prev => [...prev, policyId]);
    } else {
      setSelectedPolicies(prev => prev.filter(id => id !== policyId));
    }
  };

  const runComplianceScan = async () => {
    if (selectedArtifacts.length === 0 || selectedPolicies.length === 0) {
      toast.error("Please select artifacts and policies to scan against");
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

      // Run scans for each artifact against each selected policy
      for (const artifactId of selectedArtifacts) {
        for (const policyId of selectedPolicies) {
          const result = await runComplianceScanForArtifact(artifactId, artifacts, policyId);
          results.push(result);

          // Add delay between scans to simulate processing
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Update artifact with aggregate scan results (using worst score)
        const artifactResults = results.filter(r => r.artifactId === artifactId);
        const worstScore = Math.min(...artifactResults.map(r => r.score));
        const worstStatus = worstScore >= 90 ? 'compliant' : worstScore >= 70 ? 'warning' : 'failed';

        setArtifacts(prev => prev.map(a => 
          a.id === artifactId 
            ? { ...a, status: worstStatus, score: worstScore, lastScan: new Date() }
            : a
        ));
      }

      setScanResults(prev => [...prev, ...results]);
      toast.success(`Compliance scan completed for ${selectedArtifacts.length} artifacts against ${selectedPolicies.length} policies`);
      
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
      setSelectedPolicies([]);
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
            selectedPolicies={selectedPolicies}
            onPolicyChange={handlePolicySelection}
          />

          <ArtifactSelection
            artifacts={artifacts}
            selectedArtifacts={selectedArtifacts}
            onArtifactSelection={handleArtifactSelection}
          />

          <Button 
            onClick={runComplianceScan}
            disabled={isScanning || selectedArtifacts.length === 0 || selectedPolicies.length === 0}
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

      <SystemArtifactsDisplay artifacts={artifacts} />
    </div>
  );
};
