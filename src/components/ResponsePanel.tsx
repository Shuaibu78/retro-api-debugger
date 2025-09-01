"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  url: string;
  type: string;
}

interface ResponsePanelProps {
  response: ResponseData;
}

export default function ResponsePanel({ response }: ResponsePanelProps) {
  const [activeTab, setActiveTab] = useState<"response" | "headers">(
    "response"
  );

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400";
    if (status >= 300 && status < 400) return "text-yellow-400";
    if (status >= 400 && status < 500) return "text-orange-400";
    if (status >= 500) return "text-red-400";
    return "text-gray-400";
  };

  const getStatusGlow = (status: number) => {
    if (status >= 200 && status < 300) return "shadow-green";
    if (status >= 300 && status < 400) return "shadow-yellow";
    if (status >= 400 && status < 500) return "shadow-orange";
    if (status >= 500) return "shadow-red";
    return "shadow-gray";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="retro-border p-6 crt-glow"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl crt-text font-bold">RESPONSE DATA</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("response")}
            className={`retro-button text-sm ${
              activeTab === "response" ? "bg-green-500 text-black" : ""
            }`}
          >
            RESPONSE
          </button>
          <button
            onClick={() => setActiveTab("headers")}
            className={`retro-button text-sm ${
              activeTab === "headers" ? "bg-green-500 text-black" : ""
            }`}
          >
            HEADERS
          </button>
        </div>
      </div>

      {/* Status and URL */}
      <div className="mb-4 p-4 retro-border bg-black bg-opacity-20">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm crt-text">STATUS:</span>
            <span
              className={`text-lg font-bold crt-text ${getStatusColor(
                response.status
              )}`}
            >
              {response.status} {response.statusText}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm crt-text">URL:</span>
            <span className="text-sm crt-text opacity-80 break-all">
              {response.url}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm crt-text">TYPE:</span>
            <span className="text-sm crt-text opacity-80">{response.type}</span>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-[300px]"
      >
        {activeTab === "response" ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg crt-text font-bold">RESPONSE BODY</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formatJson(response.data));
                }}
                className="retro-button text-xs"
              >
                COPY
              </button>
            </div>
            <div className="retro-border p-4 bg-black bg-opacity-20 min-h-[200px] overflow-auto">
              <pre className="text-sm crt-text whitespace-pre-wrap break-words">
                {formatJson(response.data)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg crt-text font-bold">RESPONSE HEADERS</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formatJson(response.headers));
                }}
                className="retro-button text-xs"
              >
                COPY
              </button>
            </div>
            <div className="retro-border p-4 bg-black bg-opacity-20 min-h-[200px] overflow-auto">
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex flex-wrap gap-2">
                    <span className="text-sm crt-text font-bold min-w-[150px]">
                      {key}:
                    </span>
                    <span className="text-sm crt-text opacity-80 break-all">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
