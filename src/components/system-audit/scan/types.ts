
export interface Artifact {
  id: string;
  name: string;
  type: string;
  status: 'idle' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  lastScan?: Date;
}

export interface ScanResult {
  artifactId: string;
  policyId: string;
  status: 'compliant' | 'warning' | 'failed';
  score: number;
  findings: string[];
  recommendations: string[];
}
