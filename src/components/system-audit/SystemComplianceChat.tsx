
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

const STORAGE_KEYS = {
  MESSAGES: 'system-audit-chat-messages',
  SESSION_ID: 'system-audit-session-id'
};

export const SystemComplianceChat = () => {
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

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Save session ID to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
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

  const handleClear = () => {
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

  const handleNewSession = () => {
    const newSessionId = `system-engineer-${Date.now()}`;
    setSessionId(newSessionId);
    toast.success("New session started");
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              System Compliance Chat
            </CardTitle>
            <CardDescription>
              AI-powered assistant for system artifact compliance checking
            </CardDescription>
            <p className="text-xs text-muted-foreground mt-1">
              Session: {sessionId}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleNewSession}>
              New Session
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear Chat
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={message.sender === 'user' ? 'bg-primary-100' : 'bg-blue-100'}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-primary-500" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-500" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          code: ({ children }) => (
                            <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-200 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                              {children}
                            </pre>
                          ),
                          a: ({ href, children }) => (
                            <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100">
                    <Bot className="h-4 w-4 text-blue-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about system compliance, artifacts, or configurations..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
