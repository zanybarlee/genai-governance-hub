
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuditExecutionSession } from './hooks/useAuditExecution';
import { executionSessionStorage } from './utils/executionSessionStorage';
import { SaveSessionForm } from './components/SaveSessionForm';

interface AuditExecutionSessionHistoryProps {
  currentSessionId: string;
  onLoadSession: (sessionData: AuditExecutionSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onSaveCurrentSession: (sessionName: string) => void;
}

export const AuditExecutionSessionHistory = ({ 
  currentSessionId, 
  onLoadSession, 
  onDeleteSession,
  onSaveCurrentSession 
}: AuditExecutionSessionHistoryProps) => {
  const [sessions, setSessions] = useState<AuditExecutionSession[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const loadedSessions = executionSessionStorage.loadSessions();
    setSessions(loadedSessions);
  };

  const handleLoadSession = (session: AuditExecutionSession) => {
    onLoadSession(session);
    setIsOpen(false);
    toast({
      title: "Session Loaded",
      description: `Loaded execution session: ${session.name}`,
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = executionSessionStorage.deleteSession(sessionId);
    setSessions(updatedSessions);
    onDeleteSession(sessionId);
    toast({
      title: "Session Deleted",
      description: "Execution session has been deleted",
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
          Execution History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Audit Execution Session History
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div className="space-y-6 h-full">
            <SaveSessionForm onSaveSession={handleSaveCurrentSession} />
            
            <div className="flex-1 min-h-0">
              {sessions.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground text-center text-sm">No execution sessions yet</p>
                </div>
              ) : (
                <div className="space-y-3 pr-2 max-h-96 overflow-y-auto">
                  {sessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50/80 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-2">{session.name}</h4>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Domains: {session.selectedDomains.length}</p>
                            <p>Results: {session.executionResults.length}</p>
                            <p>Updated: {session.lastUpdated.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleLoadSession(session)}
                            className="text-xs"
                          >
                            Load
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSession(session.id)}
                            className="text-xs"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
