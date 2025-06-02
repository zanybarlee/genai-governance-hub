
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Trash2 } from "lucide-react";
import { AuditScopeSession } from '../types';

interface SessionCardProps {
  session: AuditScopeSession;
  isCurrentSession: boolean;
  onLoadSession: (session: AuditScopeSession) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const SessionCard = ({ 
  session, 
  isCurrentSession, 
  onLoadSession, 
  onDeleteSession 
}: SessionCardProps) => {
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
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium">{session.name}</h4>
            {isCurrentSession && (
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
            onClick={() => onLoadSession(session)}
            disabled={isCurrentSession}
          >
            Load
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteSession(session.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
