"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface RequestData {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
}

interface RequestFormProps {
  onSubmit: (data: RequestData) => void;
  loading: boolean;
}

export default function RequestForm({ onSubmit, loading }: RequestFormProps) {
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Record<string, string>>({
    "Content-Type": "application/json",
  });
  const [body, setBody] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let parsedBody;
    if (body.trim() && method !== "GET") {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        parsedBody = body;
      }
    }

    onSubmit({
      url,
      method,
      headers,
      body: parsedBody,
    });
  };

  const addHeader = () => {
    setHeaders((prev) => ({
      ...prev,
      "": "",
    }));
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const headerEntries = Object.entries(headers);
    headerEntries[index] = [key, value];
    setHeaders(Object.fromEntries(headerEntries.filter(([k, v]) => k || v)));
  };

  const removeHeader = (index: number) => {
    const headerEntries = Object.entries(headers);
    headerEntries.splice(index, 1);
    setHeaders(Object.fromEntries(headerEntries));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="retro-border p-6 crt-glow"
    >
      <h2 className="text-2xl crt-text font-bold mb-4">
        REQUEST CONFIGURATION
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div>
          <label className="block text-sm crt-text mb-2">TARGET URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="retro-input w-full"
            placeholder="https://api.example.com/endpoint"
            required
          />
        </div>

        {/* Method Selection */}
        <div>
          <label className="block text-sm crt-text mb-2">HTTP METHOD</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="retro-input w-full"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
        </div>

        {/* Advanced Options Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="retro-button text-sm"
        >
          {showAdvanced ? "HIDE" : "SHOW"} ADVANCED OPTIONS
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Headers */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm crt-text">CUSTOM HEADERS</label>
                <button
                  type="button"
                  onClick={addHeader}
                  className="retro-button text-xs"
                >
                  ADD HEADER
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(headers).map(([key, value], index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) =>
                        updateHeader(index, e.target.value, value)
                      }
                      className="retro-input flex-1"
                      placeholder="Header Name"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateHeader(index, key, e.target.value)}
                      className="retro-input flex-1"
                      placeholder="Header Value"
                    />
                    <button
                      type="button"
                      onClick={() => removeHeader(index)}
                      className="retro-button text-xs px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Body */}
            {method !== "GET" && (
              <div>
                <label className="block text-sm crt-text mb-2">
                  REQUEST BODY
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="retro-input w-full h-32 resize-none"
                  placeholder='{"key": "value"}'
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="retro-button w-full text-lg py-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? "EXECUTING..." : "SEND REQUEST"}
        </motion.button>
      </form>
    </motion.div>
  );
}
