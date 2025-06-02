
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SaveSessionFormProps {
  onSaveSession: (sessionName: string) => void;
}

export const SaveSessionForm = ({ onSaveSession }: SaveSessionFormProps) => {
  const [newSessionName, setNewSessionName] = useState('');
  const { toast } = useToast();

  const handleSaveCurrentSession = () => {
    if (!newSessionName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a session name",
        variant: "destructive",
      });
      return;
    }

    onSaveSession(newSessionName.trim());
    setNewSessionName('');
    toast({
      title: "Session Saved",
      description: "Audit session saved successfully",
    });
  };

  return (
    <Card className="flex-shrink-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Save Current Session</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-3">
          <Input
            placeholder="Enter session name..."
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveCurrentSession()}
            className="flex-1"
          />
          <Button 
            onClick={handleSaveCurrentSession}
            className="flex-shrink-0 px-6"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
