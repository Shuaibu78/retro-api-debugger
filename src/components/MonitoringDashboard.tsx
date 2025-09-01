"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RequestStats {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  lastRequestTime: number;
  errorCount: number;
}

interface MonitoringDashboardProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function MonitoringDashboard({
  isVisible,
  onToggle,
}: MonitoringDashboardProps) {
  const [stats, setStats] = useState<RequestStats>({
    totalRequests: 0,
    successRate: 0,
    averageResponseTime: 0,
    lastRequestTime: 0,
    errorCount: 0,
  });

  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem("retro-api-stats");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    }
  }, []);

  const updateStats = (responseTime: number, isSuccess: boolean) => {
    setResponseTimes((prev) => [...prev.slice(-9), responseTime]); // Keep last 10

    setStats((prev) => {
      const newStats = {
        totalRequests: prev.totalRequests + 1,
        successRate: isSuccess
          ? (prev.totalRequests * prev.successRate + 100) /
            (prev.totalRequests + 1)
          : (prev.totalRequests * prev.successRate) / (prev.totalRequests + 1),
        averageResponseTime:
          responseTimes.length > 0
            ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
            : responseTime,
        lastRequestTime: Date.now(),
        errorCount: isSuccess ? prev.errorCount : prev.errorCount + 1,
      };

      localStorage.setItem("retro-api-stats", JSON.stringify(newStats));
      return newStats;
    });
  };

  const formatTime = (timestamp: number) => {
    if (!timestamp) return "Never";
    return new Date(timestamp).toLocaleTimeString();
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-400";
    if (rate >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed top-4 right-4 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        MONITOR
      </motion.button>

      {/* Dashboard */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-20 right-4 w-80 retro-border crt-glow bg-black bg-opacity-90 z-40"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="crt-text font-bold">API MONITOR</h3>
              <button onClick={onToggle} className="retro-button text-xs px-2">
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Total Requests */}
              <div className="retro-border p-3">
                <div className="text-sm crt-text opacity-60">
                  TOTAL REQUESTS
                </div>
                <div className="text-2xl crt-text font-bold">
                  {stats.totalRequests}
                </div>
              </div>

              {/* Success Rate */}
              <div className="retro-border p-3">
                <div className="text-sm crt-text opacity-60">SUCCESS RATE</div>
                <div
                  className={`text-2xl font-bold ${getSuccessRateColor(
                    stats.successRate
                  )}`}
                >
                  {stats.successRate.toFixed(1)}%
                </div>
              </div>

              {/* Average Response Time */}
              <div className="retro-border p-3">
                <div className="text-sm crt-text opacity-60">
                  AVG RESPONSE TIME
                </div>
                <div className="text-2xl crt-text font-bold">
                  {stats.averageResponseTime.toFixed(0)}ms
                </div>
              </div>

              {/* Last Request */}
              <div className="retro-border p-3">
                <div className="text-sm crt-text opacity-60">LAST REQUEST</div>
                <div className="text-sm crt-text">
                  {formatTime(stats.lastRequestTime)}
                </div>
              </div>

              {/* Error Count */}
              <div className="retro-border p-3">
                <div className="text-sm crt-text opacity-60">ERRORS</div>
                <div className="text-2xl crt-text font-bold text-red-400">
                  {stats.errorCount}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
