
import { Card } from "@/components/ui/card";
import { Database, Link, Shield, File, Server } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ResourceAccess {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "service";
  description: string;
  governanceRules: {
    id: string;
    name: string;
    status: "active" | "pending" | "review";
  }[];
}

const resources: ResourceAccess[] = [
  {
    id: "1",
    name: "CRM Database",
    type: "database",
    description: "Customer relationship management database access",
    governanceRules: [
      { id: "g1", name: "Data Privacy Policy", status: "active" },
      { id: "g2", name: "Access Control Protocol", status: "active" },
    ],
  },
  {
    id: "2",
    name: "External API Gateway",
    type: "api",
    description: "Third-party API integration access points",
    governanceRules: [
      { id: "g3", name: "API Security Framework", status: "active" },
      { id: "g4", name: "Rate Limiting Rules", status: "pending" },
    ],
  },
  {
    id: "3",
    name: "Document Storage",
    type: "file",
    description: "Secure document and file storage system",
    governanceRules: [
      { id: "g5", name: "Document Retention Policy", status: "active" },
      { id: "g6", name: "File Access Controls", status: "review" },
    ],
  },
  {
    id: "4",
    name: "ML Model Service",
    type: "service",
    description: "Machine learning model deployment service",
    governanceRules: [
      { id: "g7", name: "Model Governance Framework", status: "active" },
      { id: "g8", name: "Model Monitoring Protocol", status: "active" },
    ],
  },
];

const getResourceIcon = (type: ResourceAccess["type"]) => {
  switch (type) {
    case "database":
      return <Database className="h-5 w-5" />;
    case "api":
      return <Server className="h-5 w-5" />;
    case "file":
      return <File className="h-5 w-5" />;
    case "service":
      return <Link className="h-5 w-5" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success/10 text-success";
    case "pending":
      return "bg-warning/10 text-warning";
    case "review":
      return "bg-error/10 text-error";
  }
};

export const ResourceAccessMap = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            Resource Access Mapping
          </h3>
          <p className="text-sm text-gray-600">
            AI program resource access and governance rules
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Shield className="h-5 w-5 text-primary-500" />
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary-500">
                  {getResourceIcon(resource.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-primary-900">
                      {resource.name}
                    </h4>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border border-gray-200 shadow-lg">
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {resource.governanceRules.map((rule) => (
                      <Badge
                        key={rule.id}
                        className={`${getStatusColor(rule.status)}`}
                      >
                        {rule.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
