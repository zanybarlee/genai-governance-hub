
import { AuditScopeSession } from '../types';

const AUDIT_SESSIONS_STORAGE_KEY = 'audit-scope-sessions';

export const sessionStorage = {
  loadSessions: (): AuditScopeSession[] => {
    try {
      const saved = localStorage.getItem(AUDIT_SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsedSessions = JSON.parse(saved);
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated)
        }));
        return sessionsWithDates.sort((a: AuditScopeSession, b: AuditScopeSession) => 
          b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
      }
      return [];
    } catch (error) {
      console.error('Error loading audit sessions:', error);
      return [];
    }
  },

  saveSessions: (sessions: AuditScopeSession[]): void => {
    try {
      localStorage.setItem(AUDIT_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  deleteSession: (sessionId: string): AuditScopeSession[] => {
    const sessions = sessionStorage.loadSessions();
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    sessionStorage.saveSessions(updatedSessions);
    return updatedSessions;
  }
};
