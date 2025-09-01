"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RequestTemplate {
  name: string;
  description: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

const TEMPLATES: RequestTemplate[] = [
  {
    name: "JSON PLACEHOLDER",
    description: "Test GET request to JSONPlaceholder API",
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "GITHUB API",
    description: "Get GitHub user information",
    url: "https://api.github.com/users/octocat",
    method: "GET",
    headers: { Accept: "application/vnd.github.v3+json" },
  },
  {
    name: "HTTPBIN POST",
    description: "Test POST request with JSON body",
    url: "https://httpbin.org/post",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"message": "Hello from Retro API Debugger!", "timestamp": "2024-01-01T00:00:00Z"}',
  },
  {
    name: "WEATHER API",
    description: "Get weather data (requires API key)",
    url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  },
  {
    name: "REST COUNTRIES",
    description: "Get country information",
    url: "https://restcountries.com/v3.1/name/canada",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  },
];

interface RequestTemplatesProps {
  isVisible: boolean;
  onToggle: () => void;
  onApplyTemplate: (template: RequestTemplate) => void;
}

export default function RequestTemplates({
  isVisible,
  onToggle,
  onApplyTemplate,
}: RequestTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = TEMPLATES.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-4 left-4 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        TEMPLATES
      </motion.button>

      {/* Templates Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 left-4 w-96 h-96 retro-border crt-glow bg-black bg-opacity-90 z-40"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="crt-text font-bold">REQUEST TEMPLATES</h3>
                <button
                  onClick={onToggle}
                  className="retro-button text-xs px-2"
                >
                  ×
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="retro-input w-full mb-4"
                placeholder="Search templates..."
              />

              {/* Templates List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="retro-border p-3 cursor-pointer hover:bg-green-500 hover:bg-opacity-10 transition-all duration-200"
                    onClick={() => {
                      onApplyTemplate(template);
                      onToggle();
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="crt-text font-bold text-sm">
                        {template.name}
                      </h4>
                      <span className="text-xs crt-text opacity-60 bg-green-500 bg-opacity-20 px-2 py-1">
                        {template.method}
                      </span>
                    </div>
                    <p className="text-xs crt-text opacity-80 mb-2">
                      {template.description}
                    </p>
                    <p className="text-xs crt-text opacity-60 break-all">
                      {template.url}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-green-500 border-opacity-20">
                <p className="text-xs crt-text opacity-60 text-center">
                  {filteredTemplates.length} TEMPLATES AVAILABLE
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
