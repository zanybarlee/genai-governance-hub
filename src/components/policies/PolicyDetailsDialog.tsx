
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Policy } from "@/types/policy";

interface PolicyDetailsDialogProps {
  policy: Policy | null;
  onClose: () => void;
}

export const PolicyDetailsDialog = ({ policy, onClose }: PolicyDetailsDialogProps) => {
  return (
    <Dialog open={!!policy} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{policy?.name}</DialogTitle>
          <DialogDescription>
            Version {policy?.version} • {policy?.category}
          </DialogDescription>
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
  );
};
