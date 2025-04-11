"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { ChatHistory } from "@/components/chathistory";
import { ChatInput } from "@/components/chatinput";

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      content: string;
      sender: "user" | "ai";
      timestamp: Date;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Add welcome message on initial load
  useEffect(() => {
    setMessages([
      {
        id: uuidv4(),
        content:
          "Hello! I'm Claude, an AI assistant by Anthropic. I can help with a wide range of tasks like answering questions, creative writing, coding assistance, and more. What would you like to discuss today?",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    // Add user message
    const userMessageId = uuidv4();
    const userMessage = {
      id: userMessageId,
      content: messageContent,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send request to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();

      // Add AI response message
      const aiMessage = {
        id: uuidv4(),
        content:
          data.response ||
          "I'm sorry, I couldn't process that request. Please try again.",
        sender: "ai" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        content:
          "I'm sorry, there was an error processing your request. Please try again later.",
        sender: "ai" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSettings = () => {
    // Feature coming soon
    alert("Settings functionality coming soon!");
  };

  const handleOpenInfo = () => {
    // Feature coming soon
    alert("Info panel coming soon!");
  };

  return (
    <div data-component="ChatPage" className="flex flex-col min-h-screen">
      <Header onOpenSettings={handleOpenSettings} onOpenInfo={handleOpenInfo} />

      <motion.main
        className="flex flex-col flex-grow pt-16 h-[calc(100vh-4rem)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col flex-grow overflow-hidden">
          <ChatHistory
            messages={messages}
            isLoading={isLoading}
            emptyStateMessage="Start a conversation by typing a message below. You can ask me about almost anything!"
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            maxLength={4000}
          />
        </div>
      </motion.main>
    </div>
  );
}
