
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 bg-white/50 backdrop-blur-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2 text-primary-900">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-1",
                trend.positive ? "text-success" : "text-error"
              )}
            >
              {trend.positive ? "+" : "-"}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-100 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};
