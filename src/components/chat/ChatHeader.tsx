
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { RefreshCw, X } from "lucide-react";

interface ChatHeaderProps {
  isDetached: boolean;
  onClear: () => void;
  onToggleDetach: () => void;
  onClose?: () => void;
}

export const ChatHeader = ({ isDetached, onClear, onToggleDetach, onClose }: ChatHeaderProps) => (
  <div className="px-4 pt-4 pb-2">
    <div className="flex justify-between items-center">
      {isDetached ? (
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      ) : (
        <DialogTitle>AI Assistant</DialogTitle>
      )}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="hover:bg-gray-100 no-drag"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDetach}
          className="hover:bg-gray-100 no-drag"
        >
          {isDetached ? "□" : "⃞"}
        </Button>
        {isDetached && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 no-drag"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  </div>
);
