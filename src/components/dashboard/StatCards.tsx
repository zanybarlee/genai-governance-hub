
import { StatCard } from "@/components/dashboard/StatCard";
import { Shield, Book, Users, AlertTriangle } from "lucide-react";

export const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Active Policies"
        value="24"
        icon={<Book className="h-6 w-6 text-primary-500" />}
        trend={{ value: 12, positive: true }}
        className="animate-fade-in delay-150"
        details={{
          description: "Overview of currently active AI governance policies",
          items: [
            { label: "New this month", value: "3" },
            { label: "Under review", value: "5" },
            { label: "Recently updated", value: "8" }
          ]
        }}
      />
      <StatCard
        title="Compliance Score"
        value="98%"
        icon={<Shield className="h-6 w-6 text-primary-500" />}
        trend={{ value: 3, positive: true }}
        className="animate-fade-in delay-200"
        details={{
          description: "Overall compliance score across all policies",
          items: [
            { label: "Critical policies", value: "100%" },
            { label: "Standard policies", value: "96%" },
            { label: "Guidelines", value: "98%" }
          ]
        }}
      />
      <StatCard
        title="Active Users"
        value="156"
        icon={<Users className="h-6 w-6 text-primary-500" />}
        trend={{ value: 8, positive: true }}
        className="animate-fade-in delay-250"
        details={{
          description: "Users actively engaged with AI governance policies",
          items: [
            { label: "Administrators", value: "12" },
            { label: "Policy makers", value: "34" },
            { label: "Reviewers", value: "110" }
          ]
        }}
      />
      <StatCard
        title="Pending Issues"
        value="5"
        icon={<AlertTriangle className="h-6 w-6 text-error" />}
        trend={{ value: 2, positive: false }}
        className="animate-fade-in delay-300"
        details={{
          description: "Outstanding issues requiring attention",
          items: [
            { label: "High priority", value: "2" },
            { label: "Medium priority", value: "1" },
            { label: "Low priority", value: "2" }
          ]
        }}
      />
    </div>
  );
};
