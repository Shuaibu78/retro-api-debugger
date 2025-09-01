"use client";

import { useEffect } from "react";

interface KeyboardShortcutsProps {
  onSendRequest: () => void;
  onToggleTerminal: () => void;
  onToggleMonitor: () => void;
  onToggleTheme: () => void;
  onToggleTemplates: () => void;
  onToggleCodeGenerator: () => void;
  onClearHistory: () => void;
}

export const useKeyboardShortcuts = ({
  onSendRequest,
  onToggleTerminal,
  onToggleMonitor,
  onToggleTheme,
  onToggleTemplates,
  onToggleCodeGenerator,
  onClearHistory,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isModifier = ctrlKey || metaKey;

      switch (key) {
        case "Enter":
          if (isModifier) {
            event.preventDefault();
            onSendRequest();
          }
          break;
        case "t":
          if (isModifier) {
            event.preventDefault();
            onToggleTerminal();
          }
          break;
        case "m":
          if (isModifier) {
            event.preventDefault();
            onToggleMonitor();
          }
          break;
        case "h":
          if (isModifier) {
            event.preventDefault();
            onToggleTheme();
          }
          break;
        case "r":
          if (isModifier) {
            event.preventDefault();
            onToggleTemplates();
          }
          break;
        case "g":
          if (isModifier) {
            event.preventDefault();
            onToggleCodeGenerator();
          }
          break;
        case "k":
          if (isModifier && shiftKey) {
            event.preventDefault();
            onClearHistory();
          }
          break;
        case "Escape":
          // Close any open panels
          event.preventDefault();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    onSendRequest,
    onToggleTerminal,
    onToggleMonitor,
    onToggleTheme,
    onToggleTemplates,
    onToggleCodeGenerator,
    onClearHistory,
  ]);
};
