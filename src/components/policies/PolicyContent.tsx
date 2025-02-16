
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Policy } from "@/types/policy";

interface PolicyContentProps {
  policy: Policy;
  isEditing: boolean;
  editedPolicy: Policy | null;
  onPolicyChange: (updates: Partial<Policy>) => void;
}

export const PolicyContent = ({
  policy,
  isEditing,
  editedPolicy,
  onPolicyChange,
}: PolicyContentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
        {isEditing ? (
          <Textarea
            value={editedPolicy?.description}
            onChange={(e) => onPolicyChange({ description: e.target.value })}
            className="w-full"
          />
        ) : (
          <p className="text-gray-600">{policy.description}</p>
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-1">Content</h4>
        <div className="bg-gray-50 p-4 rounded-lg">
          {isEditing ? (
            <Textarea
              value={editedPolicy?.content}
              onChange={(e) => onPolicyChange({ content: e.target.value })}
              className="font-mono text-sm min-h-[200px] w-full"
            />
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {policy.content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
