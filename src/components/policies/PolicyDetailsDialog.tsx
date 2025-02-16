
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Policy } from "@/types/policy";
import { Edit, Trash, Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
    if (policy && onEdit) {
      onEdit(policy);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteAlert(true);
  };

  return (
    <>
      <Dialog open={!!policy} onOpenChange={(open) => {
        if (!open && !showDeleteAlert) {
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
                <DialogTitle>{policy?.name}</DialogTitle>
                <DialogDescription>
                  Version {policy?.version} • {policy?.category}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleStatusChange}
                >
                  {policy?.status === "Active" ? (
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
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleDeleteClick}
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
              <p className="text-gray-600">{policy?.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Content</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {policy?.content}
                </pre>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">
                  Last updated: {policy?.lastUpdated}
                </span>
              </div>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog 
        open={showDeleteAlert} 
        onOpenChange={(open) => {
          setShowDeleteAlert(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Policy</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{policy?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => {
              e.stopPropagation();
              setShowDeleteAlert(false);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
