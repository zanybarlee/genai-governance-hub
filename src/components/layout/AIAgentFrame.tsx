
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface AIAgentFrameProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  onClose: () => void;
}

export const AIAgentFrame = ({ isFullscreen, toggleFullscreen, onClose }: AIAgentFrameProps) => {
  return (
    <div className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-8'}`}>
      <div 
        className={`bg-white rounded-lg shadow-lg relative ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-[80vw] h-[80vh]'
        }`}
      >
        <iframe
          src="http://127.0.0.1:3000/canvas/36cfa13e-643c-4d07-8777-91f21e7157ca"
          className="w-full h-full rounded-lg"
          title="AI Agent Canvas"
        />
        <div className="absolute top-0 right-0 flex gap-1 p-1 bg-white/80 backdrop-blur-sm rounded-bl-lg pointer-events-auto">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleFullscreen}
            className="hover:bg-gray-100 rounded-full h-7 w-7"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full h-7 w-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
