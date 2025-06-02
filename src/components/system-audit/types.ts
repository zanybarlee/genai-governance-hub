
export interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

export interface SessionData {
  id: string;
  name: string;
  createdAt: Date;
  lastUpdated: Date;
  messageCount: number;
  messages: any[];
}

export const STORAGE_KEYS = {
  MESSAGES: 'system-audit-chat-messages',
  SESSION_ID: 'system-audit-session-id'
} as const;
