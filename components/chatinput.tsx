"use client";
import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  maxLength?: number;
}

export function ChatInput({
  onSendMessage = () => {},
  isLoading = false,
  maxLength = 4000,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set the height to the scrollHeight to expand the textarea
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-resize when message changes
  useEffect(() => {
    handleInput();
  }, [message]);

  const remainingChars = maxLength - message.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div
      data-component="ChatInput"
      className="w-full bg-card border-t border-border py-4 px-4 sm:px-6"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Type your message here..."
            disabled={isLoading}
            maxLength={maxLength}
            rows={1}
            className="pr-16 resize-none min-h-[60px] max-h-[200px] shadow-sm"
            aria-label="Chat message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !message.trim() || isOverLimit}
            className="absolute right-2 bottom-2 h-10 w-10 rounded-full"
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
          <span
            className={`transition-colors ${
              isOverLimit
                ? "text-destructive font-medium"
                : remainingChars < 100
                  ? "text-warning font-medium"
                  : ""
            }`}
          >
            {remainingChars} characters remaining
          </span>
        </div>
      </form>
    </div>
  );
}
