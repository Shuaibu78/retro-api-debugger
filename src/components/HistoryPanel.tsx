"use client";

import { motion, AnimatePresence } from "framer-motion";

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

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export default function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400";
    if (status >= 300 && status < 400) return "text-yellow-400";
    if (status >= 400 && status < 500) return "text-orange-400";
    if (status >= 500) return "text-red-400";
    return "text-gray-400";
  };

  const truncateUrl = (url: string, maxLength: number = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="retro-border p-6 crt-glow"
    >
      <h2 className="text-2xl crt-text font-bold mb-4">REQUEST HISTORY</h2>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <p className="crt-text opacity-60">NO REQUESTS YET</p>
          <p className="text-sm crt-text opacity-40 mt-2">
            Make your first API call to see history
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelect(item)}
                className="retro-border p-3 cursor-pointer hover:bg-green-500 hover:bg-opacity-10 transition-all duration-200 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs crt-text opacity-60">
                      {item.request.method}
                    </span>
                    <span
                      className={`text-sm font-bold ${getStatusColor(
                        item.response.status
                      )}`}
                    >
                      {item.response.status}
                    </span>
                  </div>
                  <span className="text-xs crt-text opacity-40">
                    {formatTime(item.timestamp)}
                  </span>
                </div>

                <div className="text-sm crt-text opacity-80 break-all">
                  {truncateUrl(item.request.url)}
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs crt-text opacity-60">
                    {item.response.statusText}
                  </span>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-xs crt-text">CLICK TO VIEW</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-green-500 border-opacity-20">
          <p className="text-xs crt-text opacity-40 text-center">
            SHOWING LAST {history.length} REQUESTS
          </p>
        </div>
      )}
    </motion.div>
  );
}
