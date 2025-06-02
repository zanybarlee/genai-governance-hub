
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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Saved Sessions ({sessions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No saved sessions yet</p>
          ) : (
            <div className="space-y-3">
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
