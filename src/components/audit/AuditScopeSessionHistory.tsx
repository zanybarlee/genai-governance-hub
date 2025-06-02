
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuditScopeSession } from './types';
import { sessionStorage } from './utils/sessionStorage';
import { SaveSessionForm } from './components/SaveSessionForm';
import { SessionList } from './components/SessionList';

interface AuditScopeSessionHistoryProps {
  currentSessionId: string;
  onLoadSession: (sessionData: AuditScopeSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onSaveCurrentSession: (sessionName: string) => void;
}

export const AuditScopeSessionHistory = ({ 
  currentSessionId, 
  onLoadSession, 
  onDeleteSession,
  onSaveCurrentSession 
}: AuditScopeSessionHistoryProps) => {
  const [sessions, setSessions] = useState<AuditScopeSession[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const loadedSessions = sessionStorage.loadSessions();
    setSessions(loadedSessions);
  };

  const handleLoadSession = (session: AuditScopeSession) => {
    onLoadSession(session);
    setIsOpen(false);
    toast({
      title: "Session Loaded",
      description: `Loaded audit session: ${session.name}`,
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = sessionStorage.deleteSession(sessionId);
    setSessions(updatedSessions);
    onDeleteSession(sessionId);
    toast({
      title: "Session Deleted",
      description: "Audit session has been deleted",
    });
  };

  const handleSaveCurrentSession = (sessionName: string) => {
    onSaveCurrentSession(sessionName);
    loadSessions();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          Session History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Audit Scope Session History
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div className="space-y-6 h-full">
            <SaveSessionForm onSaveSession={handleSaveCurrentSession} />
            <SessionList
              sessions={sessions}
              currentSessionId={currentSessionId}
              onLoadSession={handleLoadSession}
              onDeleteSession={handleDeleteSession}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
