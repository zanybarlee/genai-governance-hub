
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { UploadedArtifact } from "./UploadedArtifact";

interface UploadSectionProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadSection = ({ onFileUpload }: UploadSectionProps) => {
  return (
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
            onChange={onFileUpload}
          />
          <p className="text-sm text-muted-foreground">
            Supported formats: JSON, YAML, SQL, XML, Terraform, Python, JavaScript, TypeScript
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
