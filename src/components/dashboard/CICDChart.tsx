
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

const cicdData = [
  { 
    name: 'Week 1',
    successful: 45,
    failed: 3,
    total: 48
  },
  { 
    name: 'Week 2',
    successful: 52,
    failed: 2,
    total: 54
  },
  { 
    name: 'Week 3',
    successful: 48,
    failed: 4,
    total: 52
  },
  { 
    name: 'Week 4',
    successful: 55,
    failed: 1,
    total: 56
  },
];

export const CICDChart = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            CI/CD Pipeline Performance
          </h3>
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
    </Card>
  );
};
