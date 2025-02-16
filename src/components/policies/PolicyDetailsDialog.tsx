
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Policy } from "@/types/policy";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { PolicyHeaderControls } from "./PolicyHeaderControls";
import { PolicyContent } from "./PolicyContent";
import { DeletePolicyDialog } from "./DeletePolicyDialog";

interface PolicyDetailsDialogProps {
  policy: Policy | null;
  onClose: () => void;
  onDelete?: (policy: Policy) => void;
  onStatusChange?: (policy: Policy, newStatus: "Active" | "Under Review") => void;
  onEdit?: (policy: Policy) => void;
}

export const PolicyDetailsDialog = ({ 
  policy, 
  onClose,
  onDelete,
  onStatusChange,
  onEdit 
}: PolicyDetailsDialogProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPolicy, setEditedPolicy] = useState<Policy | null>(null);
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (policy && onDelete) {
      onDelete(policy);
      toast({
        title: "Policy Deleted",
        description: `${policy.name} has been deleted.`,
      });
      setShowDeleteAlert(false);
      onClose();
    }
  };

  const handleStatusChange = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (policy && onStatusChange) {
      const newStatus = policy.status === "Active" ? "Under Review" : "Active";
      onStatusChange(policy, newStatus);
      toast({
        title: "Status Updated",
        description: `${policy.name} is now ${newStatus}.`,
      });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (policy) {
      setEditedPolicy({ ...policy });
      setIsEditing(true);
    }
  };

  const handleSaveEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editedPolicy && onEdit) {
      onEdit(editedPolicy);
      setIsEditing(false);
      toast({
        title: "Policy Updated",
        description: `${editedPolicy.name} has been updated successfully.`,
      });
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    setEditedPolicy(null);
  };

  const handlePolicyChange = (updates: Partial<Policy>) => {
    setEditedPolicy(prev => prev ? { ...prev, ...updates } : prev);
  };

  if (!policy) return null;

  return (
    <>
      <Dialog open={!!policy} onOpenChange={(open) => {
        if (!open && !showDeleteAlert) {
          setIsEditing(false);
          setEditedPolicy(null);
          onClose();
        }
      }}>
        <DialogContent 
          className="max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>
                  {isEditing ? (
                    <Input
                      value={editedPolicy?.name}
                      onChange={(e) => handlePolicyChange({ name: e.target.value })}
                      className="font-bold text-xl"
                    />
                  ) : (
                    policy.name
                  )}
                </DialogTitle>
                <DialogDescription>
                  Version {policy.version} • {policy.category}
                </DialogDescription>
              </div>
              <PolicyHeaderControls
                policy={policy}
                isEditing={isEditing}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={() => setShowDeleteAlert(true)}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </DialogHeader>
          <PolicyContent
            policy={policy}
            isEditing={isEditing}
            editedPolicy={editedPolicy}
            onPolicyChange={handlePolicyChange}
          />
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-600">
                Last updated: {policy.lastUpdated}
              </span>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DeletePolicyDialog
        policy={policy}
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={handleDelete}
      />
    </>
  );
};
