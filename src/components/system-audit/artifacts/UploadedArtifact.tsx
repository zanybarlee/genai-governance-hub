
export interface UploadedArtifact {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  uploadDate: Date;
}
