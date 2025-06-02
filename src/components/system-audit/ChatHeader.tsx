
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { SessionHistory } from './SessionHistory';
import { SessionData } from './types';

interface ChatHeaderProps {
  sessionId: string;
  onLoadSession: (sessionData: SessionData) => void;
  onDeleteSession: (sessionId: string) => void;
  onNewSession: () => void;
  onClearChat: () => void;
}

export const ChatHeader = ({ 
  sessionId, 
  onLoadSession, 
  onDeleteSession, 
  onNewSession, 
  onClearChat 
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          System Compliance Chat
        </CardTitle>
        <CardDescription>
          AI-powered assistant for system artifact compliance checking
        </CardDescription>
        <p className="text-xs text-muted-foreground mt-1">
          Session: {sessionId}
        </p>
      </div>
      <div className="flex gap-2">
        <SessionHistory
          currentSessionId={sessionId}
          onLoadSession={onLoadSession}
          onDeleteSession={onDeleteSession}
        />
        <Button variant="outline" size="sm" onClick={onNewSession}>
          New Session
        </Button>
        <Button variant="outline" size="sm" onClick={onClearChat}>
          Clear Chat
        </Button>
      </div>
    </div>
  );
};
