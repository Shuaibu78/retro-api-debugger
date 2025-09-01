"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RequestForm from "@/components/RequestForm";
import ResponsePanel from "@/components/ResponsePanel";
import HistoryPanel from "@/components/HistoryPanel";
import TerminalCommands from "@/components/TerminalCommands";
import MonitoringDashboard from "@/components/MonitoringDashboard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import RequestTemplates from "@/components/RequestTemplates";
import MatrixBackground from "@/components/MatrixBackground";
import HelpPanel from "@/components/HelpPanel";
import CodeGenerator from "@/components/CodeGenerator";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface RequestData {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
}

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  url: string;
  type: string;
}

interface HistoryItem {
  id: string;
  timestamp: number;
  request: RequestData;
  response: ResponseData;
}

export default function Home() {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<RequestData | null>(
    null
  );
  const { playSuccess, playError, playClick } = useSoundEffects();

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSendRequest: () => {
      // This would trigger the form submission
      const form = document.querySelector("form");
      if (form) form.requestSubmit();
    },
    onToggleTerminal: () => setShowTerminal(!showTerminal),
    onToggleMonitor: () => setShowMonitor(!showMonitor),
    onToggleTheme: () => setShowTheme(!showTheme),
    onToggleTemplates: () => setShowTemplates(!showTemplates),
    onToggleCodeGenerator: () => setShowCodeGenerator(!showCodeGenerator),
    onClearHistory: () => {
      setHistory([]);
      setResponse(null);
      playClick();
    },
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("retro-api-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("retro-api-history", JSON.stringify(history));
  }, [history]);

  const handleRequest = async (requestData: RequestData) => {
    setLoading(true);
    setResponse(null);
    setCurrentRequest(requestData);
    const startTime = Date.now();

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await res.json();
      const responseTime = Date.now() - startTime;

      if (res.ok) {
        setResponse(responseData);
        playSuccess();

        // Add to history
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          request: requestData,
          response: responseData,
        };

        setHistory((prev) => {
          const newHistory = [historyItem, ...prev].slice(0, 5); // Keep only last 5
          return newHistory;
        });
      } else {
        setResponse({
          status: res.status,
          statusText: res.statusText,
          headers: {},
          data: responseData,
          url: requestData.url,
          type: "error",
        });
        playError();
      }
    } catch (error) {
      setResponse({
        status: 0,
        statusText: "Network Error",
        headers: {},
        data: {
          error: "Failed to make request",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        url: requestData.url,
        type: "error",
      });
      playError();
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResponse(item.response);
    playClick();
  };

  const handleApplyTemplate = (template: any) => {
    // This would be handled by the RequestForm component
    playClick();
  };

  const handleTerminalCommand = (command: string) => {
    playClick();
    // Handle terminal commands
    switch (command) {
      case "clear":
        setHistory([]);
        setResponse(null);
        break;
      case "export":
        // Export functionality
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen crt-screen crt-flicker relative">
      <MatrixBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl crt-text font-bold mb-2">
            RETRO API DEBUGGER
          </h1>
          <p className="text-lg crt-text opacity-80">
            TERMINAL-STYLE API TESTING INTERFACE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Request Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <RequestForm
              onSubmit={handleRequest}
              loading={loading}
              onApplyTemplate={handleApplyTemplate}
            />
          </motion.div>

          {/* History Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HistoryPanel history={history} onSelect={handleHistorySelect} />
          </motion.div>
        </div>

        {/* Response Panel */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <ResponsePanel response={response} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Panels */}
        <TerminalCommands onCommand={handleTerminalCommand} />
        <MonitoringDashboard
          isVisible={showMonitor}
          onToggle={() => setShowMonitor(!showMonitor)}
        />
        <ThemeSwitcher
          isVisible={showTheme}
          onToggle={() => setShowTheme(!showTheme)}
        />
        <RequestTemplates
          isVisible={showTemplates}
          onToggle={() => setShowTemplates(!showTemplates)}
          onApplyTemplate={handleApplyTemplate}
        />
        <HelpPanel
          isVisible={showHelp}
          onToggle={() => setShowHelp(!showHelp)}
        />
        <CodeGenerator
          isVisible={showCodeGenerator}
          onToggle={() => setShowCodeGenerator(!showCodeGenerator)}
          response={response}
          request={currentRequest}
        />
      </div>
    </div>
  );
}
