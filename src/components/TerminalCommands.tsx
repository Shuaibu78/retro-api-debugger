"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalCommandsProps {
  onCommand: (command: string) => void;
}

const COMMANDS = {
  help: "Available commands: help, clear, history, export, import, theme, ping",
  clear: "clear",
  history: "history",
  export: "export",
  import: "import",
  theme: "theme",
  ping: "ping",
};

export default function TerminalCommands({ onCommand }: TerminalCommandsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    setHistory((prev) => [...prev, input]);

    let response = "";
    switch (command) {
      case "help":
        response = COMMANDS.help;
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      case "history":
        response = `Command history: ${history.join(", ")}`;
        break;
      case "ping":
        response = "PONG! API Debugger is online and ready.";
        break;
      case "theme":
        response = "Current theme: Retro CRT (Green on Black)";
        break;
      default:
        response = `Unknown command: ${command}. Type 'help' for available commands.`;
    }

    setOutput((prev) => [...prev, `> ${input}`, response]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        TERMINAL
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-20 right-4 w-96 h-80 retro-border crt-glow bg-black bg-opacity-90 z-40"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="crt-text font-bold">TERMINAL</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="retro-button text-xs px-2"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-1">
                {output.map((line, index) => (
                  <div key={index} className="text-sm crt-text">
                    {line}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <span className="crt-text">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 retro-input text-sm"
                  placeholder="Enter command..."
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
