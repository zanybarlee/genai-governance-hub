
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  details?: {
    description: string;
    items?: { label: string; value: string | number }[];
  };
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  className,
  details,
}: StatCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          "p-6 bg-white/50 backdrop-blur-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
          className
        )}
        onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="p-2 bg-primary-100 rounded-lg">{icon}</span>
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-primary-900">
                Current Value
              </h3>
              <p className="text-2xl font-bold text-primary-900">{value}</p>
            </div>
            
            {trend && (
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">Monthly Trend</p>
                <p className={cn(
                  "text-lg font-semibold mt-1",
                  trend.positive ? "text-success" : "text-error"
                )}>
                  {trend.positive ? "+" : "-"}{trend.value}%
                </p>
              </div>
            )}

            {details && (
              <div className="space-y-3">
                <p className="text-gray-600">{details.description}</p>
                {details.items && (
                  <div className="space-y-2">
                    {details.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
