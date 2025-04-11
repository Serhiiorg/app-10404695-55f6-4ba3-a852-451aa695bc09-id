"use client";
import React, { useRef, useEffect } from "react";
import { ChatMessage } from "@/components/chatmessage";
import { Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatHistoryProps {
  messages: Message[];
  isLoading?: boolean;
  emptyStateMessage?: string;
}

export function ChatHistory({
  messages = [],
  isLoading = false,
  emptyStateMessage = "Start a conversation by typing a message below.",
}: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div
      data-component="ChatHistory"
      className="flex flex-col flex-grow overflow-y-auto px-4 py-6 space-y-2"
      ref={containerRef}
    >
      {messages.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10">
          <div className="bg-muted inline-flex rounded-full p-3 mb-4">
            <Bot className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg mb-2">
            Welcome to Anthropic AI Chat
          </h3>
          <p className="text-muted-foreground max-w-md">{emptyStateMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2 animate-pulse">
              <div className="rounded-full p-2 bg-muted text-secondary">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
