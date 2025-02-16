
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { Message, ChatDimensions, Position } from './types';

export const ChatDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState<ChatDimensions>({ width: 425, height: 400 });
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 465, y: window.innerHeight - 440 });
  const [isDetached, setIsDetached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef(false);
  const draggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startDimensionsRef = useRef({ width: 425, height: 400 });
  const startDragPosRef = useRef({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const query = async (data: { question: string }) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/36cfa13e-643c-4d07-8777-91f21e7157ca",
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
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await query({ question: input });
      const botMessage: Message = {
        content: response,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to get response from the bot");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    resizingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startDimensionsRef.current = dimensions;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.no-drag')) return;
    draggingRef.current = true;
    startDragPosRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    
    const newX = e.clientX - startDragPosRef.current.x;
    const newY = e.clientY - startDragPosRef.current.y;
    
    const maxX = window.innerWidth - dimensions.width;
    const maxY = window.innerHeight - dimensions.height;
    
    setPosition({
      x: Math.min(Math.max(0, newX), maxX),
      y: Math.min(Math.max(0, newY), maxY),
    });
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    setDimensions({
      width: Math.max(375, startDimensionsRef.current.width + deltaX),
      height: Math.max(300, startDimensionsRef.current.height + deltaY)
    });
  };

  const handleMouseUp = () => {
    resizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleClose = () => {
    setIsDetached(false);
    setIsOpen(false);
  };

  const handleDetach = () => {
    setIsDetached(true);
    setIsOpen(false);
  };

  const handleAttach = () => {
    setIsDetached(false);
    setIsOpen(true);
  };

  const handleClear = () => {
    setMessages([]);
    toast.success("Chat history cleared");
  };

  const handleOpenChat = () => {
    setIsDetached(true);
  };

  const ChatContent = ({ isDetached }: { isDetached: boolean }) => (
    <div className="h-full flex flex-col">
      <ChatHeader 
        isDetached={isDetached} 
        onClear={handleClear}
        onToggleDetach={isDetached ? handleAttach : handleDetach}
        onClose={isDetached ? handleClose : undefined}
      />

      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
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

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />

      <div 
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize no-drag"
        onMouseDown={handleMouseDown}
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
        }}
      />
    </div>
  );

  return (
    <>
      <Button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isDetached ? (
        <div
          className="fixed bg-background border rounded-lg shadow-lg overflow-hidden"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 50,
          }}
          onMouseDown={handleDragStart}
        >
          <ChatContent isDetached={true} />
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent 
            className="p-0 overflow-hidden flex flex-col"
            style={{ 
              width: `${dimensions.width}px`, 
              maxWidth: '90vw',
              height: `${dimensions.height}px`,
            }}
          >
            <ChatContent isDetached={false} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
