
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const cicdData = [
  { 
    name: 'Week 1',
    successful: 45,
    failed: 3,
    total: 48,
    details: [
      { stage: "Build", success: 47, failed: 1 },
      { stage: "Test", success: 46, failed: 2 },
      { stage: "Deploy", success: 45, failed: 3 }
    ]
  },
  { 
    name: 'Week 2',
    successful: 52,
    failed: 2,
    total: 54,
    details: [
      { stage: "Build", success: 53, failed: 1 },
      { stage: "Test", success: 52, failed: 2 },
      { stage: "Deploy", success: 52, failed: 2 }
    ]
  },
  { 
    name: 'Week 3',
    successful: 48,
    failed: 4,
    total: 52,
    details: [
      { stage: "Build", success: 50, failed: 2 },
      { stage: "Test", success: 49, failed: 3 },
      { stage: "Deploy", success: 48, failed: 4 }
    ]
  },
  { 
    name: 'Week 4',
    successful: 55,
    failed: 1,
    total: 56,
    details: [
      { stage: "Build", success: 56, failed: 0 },
      { stage: "Test", success: 55, failed: 1 },
      { stage: "Deploy", success: 55, failed: 1 }
    ]
  },
];

export const CICDChart = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100 mt-6">
      <div 
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-primary-900">
              CI/CD Pipeline Performance
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <p className="text-sm text-gray-600">
            Last 4 weeks deployment statistics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Successful</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Failed</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cicdData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{
                background: "white",
                border: "1px solid #E6E8EC",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            />
            <Bar 
              dataKey="successful" 
              fill="#22C55E" 
              radius={[4, 4, 0, 0]}
              name="Successful Deployments"
            />
            <Bar 
              dataKey="failed" 
              fill="#EF4444" 
              radius={[4, 4, 0, 0]}
              name="Failed Deployments"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isExpanded && (
        <div className="mt-6 border-t pt-4">
          <div className="space-y-4">
            {cicdData.map((week, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-primary-900 mb-3">{week.name}</h4>
                <div className="space-y-2">
                  {week.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-gray-600">{detail.stage}</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-success/10 text-success">
                          {detail.success} success
                        </Badge>
                        {detail.failed > 0 && (
                          <Badge className="bg-error/10 text-error">
                            {detail.failed} failed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Success Rate: {((week.successful / week.total) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
