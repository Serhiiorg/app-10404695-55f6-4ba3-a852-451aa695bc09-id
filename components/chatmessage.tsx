"use client";
import React from "react";
import { UserIcon, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "date-fns";

interface ChatMessageProps {
  content: string;
  sender: "user" | "ai";
  timestamp?: Date;
}

export function ChatMessage({
  content = "",
  sender = "user",
  timestamp = new Date(),
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      data-component="ChatMessage"
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`flex items-start justify-center p-2 ${
            isUser ? "ml-2" : "mr-2"
          }`}
        >
          <div
            className={`rounded-full p-2 ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-secondary"
            }`}
            aria-hidden="true"
          >
            {isUser ? (
              <UserIcon className="h-5 w-5" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </div>
        </div>

        <div
          className={`flex flex-col ${
            isUser ? "items-end mr-2" : "items-start ml-2"
          }`}
        >
          <div
            className={`px-4 py-3 rounded-lg ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border shadow-sm"
            }`}
          >
            {isUser ? (
              <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                {content}
              </p>
            ) : (
              <div className="markdown-content text-sm md:text-base text-card-foreground">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={atomDark}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-md text-xs md:text-sm my-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-muted px-1 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    p({ children }) {
                      return <p className="mb-4 last:mb-0">{children}</p>;
                    },
                    ul({ children }) {
                      return (
                        <ul className="list-disc pl-5 mb-4 last:mb-0">
                          {children}
                        </ul>
                      );
                    },
                    ol({ children }) {
                      return (
                        <ol className="list-decimal pl-5 mb-4 last:mb-0">
                          {children}
                        </ol>
                      );
                    },
                    li({ children }) {
                      return <li className="mb-1">{children}</li>;
                    },
                    h1({ children }) {
                      return (
                        <h1 className="text-xl font-bold mb-2">{children}</h1>
                      );
                    },
                    h2({ children }) {
                      return (
                        <h2 className="text-lg font-bold mb-2">{children}</h2>
                      );
                    },
                    h3({ children }) {
                      return (
                        <h3 className="text-base font-bold mb-2">{children}</h3>
                      );
                    },
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-2">
                          {children}
                        </blockquote>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <span
            className="text-xs text-muted-foreground mt-1"
            title={timestamp.toLocaleString()}
          >
            {format(timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
}
