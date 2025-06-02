
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChatSession } from './hooks/useChatSession';

export const SystemComplianceChat = () => {
  const {
    sessionId,
    messages,
    isLoading,
    sendMessage,
    clearChat,
    startNewSession,
    loadSession
  } = useChatSession();

  const handleDeleteSession = (sessionId: string) => {
    // Session deletion is handled in SessionHistory component
    // This is just a callback for any additional cleanup if needed
  };

  return (
    <Card className="h-[700px] flex flex-col">
      <CardHeader>
        <ChatHeader
          sessionId={sessionId}
          onLoadSession={loadSession}
          onDeleteSession={handleDeleteSession}
          onNewSession={startNewSession}
          onClearChat={clearChat}
        />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
