
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PolicyScore {
  name: string;
  score: number;
  lastUpdated: string;
  status: "healthy" | "warning" | "critical";
  description: string;
}

interface PolicyScoreCardProps {
  scores: PolicyScore[];
}

export const PolicyScoreCard = ({ scores }: PolicyScoreCardProps) => {
  const getStatusColor = (status: PolicyScore["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      case "critical":
        return "bg-error/10 text-error";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-error";
  };

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            Policy Framework Scores
          </h3>
          <p className="text-sm text-gray-600">
            Real-time governance scoring and monitoring
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {scores.map((score, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg space-y-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary-900">{score.name}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-sm">{score.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Badge className={getStatusColor(score.status)}>
                {score.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Progress value={score.score} className="flex-1" />
              <span className={`font-semibold ${getScoreColor(score.score)}`}>
                {score.score}%
              </span>
            </div>
            
            <p className="text-xs text-gray-500">
              Last updated: {score.lastUpdated}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
