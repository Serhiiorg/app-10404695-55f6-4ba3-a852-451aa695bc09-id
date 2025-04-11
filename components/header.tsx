"use client";
import React from "react";
import { Bot, InfoIcon, Settings } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenSettings?: () => void;
  onOpenInfo?: () => void;
}

export function Header({
  onOpenSettings = () => {},
  onOpenInfo = () => {},
}: HeaderProps) {
  return (
    <div
      data-component="Header"
      className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary p-1.5 rounded-md text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-medium md:text-xl">
            <span className="hidden sm:inline">Anthropic</span> AI Chat
          </h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenInfo}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Information"
                >
                  <InfoIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenSettings}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </div>
  );
}
