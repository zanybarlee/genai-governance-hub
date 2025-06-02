
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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Save Current Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            placeholder="Enter session name..."
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveCurrentSession()}
          />
          <Button onClick={handleSaveCurrentSession}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};
