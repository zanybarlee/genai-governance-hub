
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionCard } from './SessionCard';
import { AuditScopeSession } from '../types';

interface SessionListProps {
  sessions: AuditScopeSession[];
  currentSessionId: string;
  onLoadSession: (session: AuditScopeSession) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const SessionList = ({ 
  sessions, 
  currentSessionId, 
  onLoadSession, 
  onDeleteSession 
}: SessionListProps) => {
  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader className="flex-shrink-0 pb-3">
        <CardTitle className="text-sm font-medium">
          Saved Sessions ({sessions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 p-3 pt-0">
        <ScrollArea className="h-full">
          {sessions.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground text-center text-sm">No saved sessions yet</p>
            </div>
          ) : (
            <div className="space-y-3 pr-2">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  isCurrentSession={session.id === currentSessionId}
                  onLoadSession={onLoadSession}
                  onDeleteSession={onDeleteSession}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
