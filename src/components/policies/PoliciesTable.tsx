
import { Policy } from "@/types/policy";

interface PoliciesTableProps {
  policies: Policy[];
  onPolicyClick: (policy: Policy) => void;
}

export const PoliciesTable = ({ policies, onPolicyClick }: PoliciesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Version</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr
              key={policy.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onPolicyClick(policy)}
            >
              <td className="py-3 px-4">
                <span className="font-medium text-primary-900">{policy.name}</span>
              </td>
              <td className="py-3 px-4 text-gray-600">{policy.version}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    policy.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {policy.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{policy.category}</td>
              <td className="py-3 px-4 text-gray-600">{policy.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
