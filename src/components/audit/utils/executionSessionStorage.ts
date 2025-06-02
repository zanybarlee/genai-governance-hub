
import { AuditExecutionSession } from '../hooks/useAuditExecution';

const EXECUTION_SESSIONS_STORAGE_KEY = 'audit-execution-sessions';

export const executionSessionStorage = {
  loadSessions: (): AuditExecutionSession[] => {
    try {
      const saved = localStorage.getItem(EXECUTION_SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsedSessions = JSON.parse(saved);
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated)
        }));
        return sessionsWithDates.sort((a: AuditExecutionSession, b: AuditExecutionSession) => 
          b.lastUpdated.getTime() - a.lastUpdated.getTime()
        );
      }
      return [];
    } catch (error) {
      console.error('Error loading execution sessions:', error);
      return [];
    }
  },

  saveSessions: (sessions: AuditExecutionSession[]): void => {
    try {
      localStorage.setItem(EXECUTION_SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving execution sessions:', error);
    }
  },

  deleteSession: (sessionId: string): AuditExecutionSession[] => {
    const sessions = executionSessionStorage.loadSessions();
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    executionSessionStorage.saveSessions(updatedSessions);
    return updatedSessions;
  }
};
