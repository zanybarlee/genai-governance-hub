
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FormEvent } from "react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const ChatInput = ({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) => (
  <form onSubmit={onSubmit} className="flex gap-2 p-4 border-t mt-auto no-drag">
    <Input
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Type your message..."
      disabled={isLoading}
      className="flex-1"
    />
    <Button type="submit" disabled={isLoading}>
      <Send className="h-4 w-4" />
    </Button>
  </form>
);
