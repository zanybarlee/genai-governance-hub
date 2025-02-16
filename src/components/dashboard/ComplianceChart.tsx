
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const complianceData = [
  { month: "Jan", score: 92 },
  { month: "Feb", score: 94 },
  { month: "Mar", score: 91 },
  { month: "Apr", score: 95 },
  { month: "May", score: 93 },
  { month: "Jun", score: 98 },
];

export const ComplianceChart = () => {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            Compliance Trends
          </h3>
          <p className="text-sm text-gray-600">
            6-month compliance score overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-primary-500/20"></div>
            <span>Compliance Score</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={complianceData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="colorScore"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#2D3648"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="#2D3648"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E6E8EC"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#9BA3B5"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9BA3B5"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[85, 100]}
              ticks={[85, 90, 95, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #E6E8EC",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#2D3648"
              fill="url(#colorScore)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
