
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash, X } from "lucide-react";
import { Policy } from "@/types/policy";

interface PolicyHeaderControlsProps {
  policy: Policy;
  isEditing: boolean;
  onStatusChange: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onSaveEdit: (e: React.MouseEvent) => void;
  onCancelEdit: (e: React.MouseEvent) => void;
}

export const PolicyHeaderControls = ({
  policy,
  isEditing,
  onStatusChange,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
}: PolicyHeaderControlsProps) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2"
          onClick={onSaveEdit}
        >
          <Check className="h-4 w-4" />
          Save Changes
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={onCancelEdit}
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={onStatusChange}
      >
        {policy.status === "Active" ? (
          <>
            <X className="h-4 w-4" />
            Set Under Review
          </>
        ) : (
          <>
            <Check className="h-4 w-4" />
            Set Active
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="flex items-center gap-2"
        onClick={onDelete}
      >
        <Trash className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};
