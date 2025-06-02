
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Message, SessionData, STORAGE_KEYS } from '../types';

export const useChatSession = () => {
  const [sessionId, setSessionId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    return saved || `system-engineer-${Date.now()}`;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (saved) {
      try {
        const parsedMessages = JSON.parse(saved);
        return parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    return [
      {
        content: "Hello! I'm your System Compliance Assistant. I can help you check system artifacts for compliance issues, review configurations, and provide recommendations. What would you like me to analyze today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ];
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Save session ID to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }, [sessionId]);

  const query = async (data: { question: string; overrideConfig?: { sessionId: string } }) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/957dc3e7-f018-454f-8655-9b1652533a0e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await query({
        question: input,
        overrideConfig: {
          sessionId: sessionId
        }
      });

      const botMessage: Message = {
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to get response from the compliance assistant");
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const initialMessage = {
      content: "Hello! I'm your System Compliance Assistant. I can help you check system artifacts for compliance issues, review configurations, and provide recommendations. What would you like me to analyze today?",
      sender: 'bot' as const,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    
    // Generate new session ID when clearing chat
    const newSessionId = `system-engineer-${Date.now()}`;
    setSessionId(newSessionId);
    
    toast.success("Chat history cleared and new session started");
  };

  const startNewSession = () => {
    const newSessionId = `system-engineer-${Date.now()}`;
    setSessionId(newSessionId);
    
    // Clear current messages and start fresh
    const initialMessage = {
      content: "Hello! I'm your System Compliance Assistant. I can help you check system artifacts for compliance issues, review configurations, and provide recommendations. What would you like me to analyze today?",
      sender: 'bot' as const,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    
    toast.success("New session started");
  };

  const loadSession = (sessionData: SessionData) => {
    setSessionId(sessionData.id);
    setMessages(sessionData.messages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })));
  };

  return {
    sessionId,
    messages,
    isLoading,
    sendMessage,
    clearChat,
    startNewSession,
    loadSession
  };
};
