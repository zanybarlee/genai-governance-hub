
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
    <div className="border rounded-lg p-4 hover:bg-gray-50/80 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-medium text-sm truncate">{session.name}</h4>
            {isCurrentSession && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 flex-shrink-0">
                Current
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <span className="font-medium text-xs">Audit Type:</span> 
              <span className="text-xs">{getAuditDisplayName(session)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-xs">Frameworks:</span> 
              <span className="text-xs">{session.selectedFrameworks.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="text-xs">{formatDate(session.lastUpdated)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3 flex-shrink-0" />
              <span className="text-xs">{session.controlDomains.length} domains</span>
            </div>
          </div>

          {session.selectedFrameworks.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {session.selectedFrameworks.map((framework) => (
                <Badge key={framework} variant="outline" className="text-xs px-2 py-0.5">
                  {framework}
                </Badge>
              ))}
            </div>
          )}

          {session.scopeText && (
            <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 border">
              <p className="line-clamp-2">
                {session.scopeText.length > 150 
                  ? `${session.scopeText.substring(0, 150)}...` 
                  : session.scopeText
                }
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoadSession(session)}
            disabled={isCurrentSession}
            className="w-16 text-xs"
          >
            Load
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteSession(session.id)}
            className="w-16 p-2"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
