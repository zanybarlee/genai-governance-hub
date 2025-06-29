
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, MessageCircle, Save, RefreshCcw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface ScopingChatProps {
  engagementId: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'scoping-chat-messages';
const SESSION_KEY = 'scoping-chat-session-id';

export const ScopingChat = ({ engagementId }: ScopingChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => 
    localStorage.getItem(`${SESSION_KEY}-${engagementId}`) || `session-${Date.now()}`
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`${STORAGE_KEY}-${engagementId}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error loading messages from localStorage:', error);
      }
    }
  }, [engagementId]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`${STORAGE_KEY}-${engagementId}`, JSON.stringify(messages));
      localStorage.setItem(`${SESSION_KEY}-${engagementId}`, sessionId);
    }
  }, [messages, engagementId, sessionId]);

  const query = async (data: { question: string; overrideConfig?: any }) => {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/ac822a35-d21c-4141-a0b3-e516a51917ee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call AI endpoint
      const response = await query({
        question: inputMessage,
        overrideConfig: {
          sessionId: sessionId,
          startInputType: "audit_scoping",
          formTitle: "IT Audit Scoping Chat",
          formDescription: "Interactive audit scoping conversation",
          formInputTypes: "scoping_query"
        }
      });

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text || "I'm here to help you with audit scoping. Please provide more details about your audit requirements.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI endpoint:", error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveSession = () => {
    if (messages.length === 0) {
      toast({
        title: "No messages to save",
        description: "Start a conversation first to save the session.",
        variant: "destructive",
      });
      return;
    }

    // Force save to localStorage
    localStorage.setItem(`${STORAGE_KEY}-${engagementId}`, JSON.stringify(messages));
    localStorage.setItem(`${SESSION_KEY}-${engagementId}`, sessionId);
    
    toast({
      title: "Session saved",
      description: `Chat session with ${messages.length} messages has been saved.`,
    });
  };

  const handleReloadSession = () => {
    // Clear current session
    setMessages([]);
    setInputMessage("");
    
    // Generate new session ID
    const newSessionId = `session-${Date.now()}`;
    setSessionId(newSessionId);
    
    // Clear localStorage
    localStorage.removeItem(`${STORAGE_KEY}-${engagementId}`);
    localStorage.removeItem(`${SESSION_KEY}-${engagementId}`);
    
    toast({
      title: "Session cleared",
      description: "Started a new chat session.",
    });
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Card className="border-green-200 h-[600px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-900" />
            <CardTitle className="text-green-900">AI Scoping Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveSession}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={handleReloadSession}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
        <CardDescription>
          Interactive conversation for audit planning and scoping guidance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Messages Area */}
        <ScrollArea className="flex-1 mb-4 h-0">
          <div className="space-y-4 pr-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Start a conversation about audit scoping</p>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-green-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2 flex-shrink-0">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about audit scoping, controls, or requirements..."
            disabled={isLoading}
            className="flex-1 min-h-[40px] max-h-[120px] resize-y"
            rows={2}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="sm"
            className="gap-2 self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
