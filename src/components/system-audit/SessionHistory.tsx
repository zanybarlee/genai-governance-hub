import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, Trash2, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";
import { SessionData } from './types';

interface SessionHistoryProps {
  currentSessionId: string;
  onLoadSession: (sessionData: SessionData) => void;
  onDeleteSession: (sessionId: string) => void;
}

const SESSIONS_STORAGE_KEY = 'system-audit-sessions';

export const SessionHistory = ({ currentSessionId, onLoadSession, onDeleteSession }: SessionHistoryProps) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsedSessions = JSON.parse(saved);
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated)
        }));
        setSessions(sessionsWithDates.sort((a: SessionData, b: SessionData) => 
          b.lastUpdated.getTime() - a.lastUpdated.getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const saveSession = (sessionData: SessionData) => {
    try {
      const existingIndex = sessions.findIndex(s => s.id === sessionData.id);
      let updatedSessions;
      
      if (existingIndex >= 0) {
        updatedSessions = [...sessions];
        updatedSessions[existingIndex] = sessionData;
      } else {
        updatedSessions = [sessionData, ...sessions];
      }
      
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
      setSessions(updatedSessions);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleLoadSession = (session: SessionData) => {
    onLoadSession(session);
    setIsOpen(false);
    toast.success(`Loaded session: ${session.name}`);
  };

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
    onDeleteSession(sessionId);
    toast.success("Session deleted");
  };

  const handleSaveCurrentSession = () => {
    if (!newSessionName.trim()) {
      toast.error("Please enter a session name");
      return;
    }

    const currentMessages = JSON.parse(localStorage.getItem('system-audit-chat-messages') || '[]');
    
    const sessionData: SessionData = {
      id: currentSessionId,
      name: newSessionName.trim(),
      createdAt: new Date(),
      lastUpdated: new Date(),
      messageCount: currentMessages.length,
      messages: currentMessages
    };

    saveSession(sessionData);
    setNewSessionName('');
    toast.success("Session saved successfully");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          Sessions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Session History
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
              <ScrollArea className="h-[300px]">
                {sessions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No saved sessions yet</p>
                ) : (
                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{session.name}</h4>
                            {session.id === currentSessionId && (
                              <Badge variant="secondary" className="text-xs">Current</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(session.lastUpdated)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {session.messageCount} messages
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
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
