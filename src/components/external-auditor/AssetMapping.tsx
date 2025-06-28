
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Cloud, Upload, CheckCircle } from "lucide-react";

interface AssetMappingProps {
  engagementId: string;
}

interface AssetSummary {
  servers: number;
  databases: number;
  cloudPlatforms: string[];
  totalAssets: number;
}

export const AssetMapping = ({ engagementId }: AssetMappingProps) => {
  const assetData: AssetSummary = {
    servers: 127,
    databases: 34,
    cloudPlatforms: ["Azure", "GCP", "Private Cloud"],
    totalAssets: 164
  };

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Database className="h-5 w-5" />
          Asset Mapping & CMDB Integration
        </CardTitle>
        <CardDescription>
          Import and analyze client IT infrastructure inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Upload Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">CMDB Export Processed</p>
                <p className="text-sm text-green-700">
                  NeoPacific_CMDB_Export.csv successfully imported and analyzed
                </p>
              </div>
            </div>
          </div>

          {/* Asset Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Server className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{assetData.servers}</div>
              <div className="text-sm text-gray-600">Servers</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{assetData.databases}</div>
              <div className="text-sm text-gray-600">Databases</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Cloud className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{assetData.cloudPlatforms.length}</div>
              <div className="text-sm text-gray-600">Cloud Platforms</div>
            </div>
          </div>

          {/* Cloud Platforms Detail */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Detected Cloud Platforms</h4>
            <div className="flex gap-2">
              {assetData.cloudPlatforms.map((platform, idx) => (
                <Badge key={idx} variant="outline" className="gap-1">
                  <Cloud className="h-3 w-3" />
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Risk Assessment</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Multi-cloud environment requires enhanced security controls</li>
              <li>• Large server inventory ({assetData.servers}) needs systematic audit approach</li>
              <li>• Database security controls critical for {assetData.databases} instances</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload New CMDB
            </Button>
            <Button size="sm" variant="outline">
              Generate Asset Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
