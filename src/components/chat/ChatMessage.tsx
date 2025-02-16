
import { Message } from "./types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
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
  );
};
