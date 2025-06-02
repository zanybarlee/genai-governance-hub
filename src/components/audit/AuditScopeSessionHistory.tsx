
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, Calendar, Brain, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuditScopeSession } from './types';

interface AuditScopeSessionHistoryProps {
  currentSessionId: string;
  onLoadSession: (sessionData: AuditScopeSession) => void;
  onDeleteSession: (sessionId: string) => void;
  onSaveCurrentSession: (sessionName: string) => void;
}

const AUDIT_SESSIONS_STORAGE_KEY = 'audit-scope-sessions';

export const AuditScopeSessionHistory = ({ 
  currentSessionId, 
  onLoadSession, 
  onDeleteSession,
  onSaveCurrentSession 
}: AuditScopeSessionHistoryProps) => {
  const [sessions, setSessions] = useState<AuditScopeSession[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    try {
      const saved = localStorage.getItem(AUDIT_SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsedSessions = JSON.parse(saved);
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated)
        }));
        setSessions(sessionsWithDates.sort((a: AuditScopeSession, b: AuditScopeSession) => 
          b.lastUpdated.getTime() - a.lastUpdated.getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading audit sessions:', error);
    }
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
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem(AUDIT_SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
    onDeleteSession(sessionId);
    toast({
      title: "Session Deleted",
      description: "Audit session has been deleted",
    });
  };

  const handleSaveCurrentSession = () => {
    if (!newSessionName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a session name",
        variant: "destructive",
      });
      return;
    }

    onSaveCurrentSession(newSessionName.trim());
    setNewSessionName('');
    loadSessions();
    toast({
      title: "Session Saved",
      description: "Audit session saved successfully",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAuditDisplayName = (session: AuditScopeSession) => {
    if (session.auditType === "custom" && session.customAuditName) {
      return session.customAuditName;
    }
    return session.auditType;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          Session History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Audit Scope Session History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Save Current Session */}
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

          {/* Saved Sessions */}
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
                      <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{session.name}</h4>
                              {session.id === currentSessionId && (
                                <Badge variant="secondary" className="text-xs">Current</Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                              <div>
                                <span className="font-medium">Audit Type:</span> {getAuditDisplayName(session)}
                              </div>
                              <div>
                                <span className="font-medium">Frameworks:</span> {session.selectedFrameworks.length}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(session.lastUpdated)}
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {session.controlDomains.length} domains
                              </div>
                            </div>

                            {session.selectedFrameworks.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {session.selectedFrameworks.map((framework) => (
                                  <Badge key={framework} variant="outline" className="text-xs">
                                    {framework}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {session.scopeText && (
                              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded truncate">
                                {session.scopeText.substring(0, 150)}...
                              </p>
                            )}
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadSession(session)}
                              disabled={session.id === currentSessionId}
                            >
                              Load
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteSession(session.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
