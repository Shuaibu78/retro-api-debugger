"use client";

import { motion, AnimatePresence } from "framer-motion";

interface HelpPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function HelpPanel({ isVisible, onToggle }: HelpPanelProps) {
  const shortcuts = [
    { key: "Ctrl/Cmd + Enter", description: "Send request" },
    { key: "Ctrl/Cmd + T", description: "Toggle terminal" },
    { key: "Ctrl/Cmd + M", description: "Toggle monitor" },
    { key: "Ctrl/Cmd + H", description: "Toggle theme switcher" },
    { key: "Ctrl/Cmd + R", description: "Toggle templates" },
    { key: "Ctrl/Cmd + G", description: "Toggle code generator" },
    { key: "Ctrl/Cmd + Shift + K", description: "Clear history" },
    { key: "Escape", description: "Close panels" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed bottom-16 right-4 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        HELP
      </motion.button>

      {/* Help Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onToggle}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="retro-border p-6 crt-glow bg-black bg-opacity-90 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="crt-text font-bold text-xl">
                  KEYBOARD SHORTCUTS
                </h3>
                <button
                  onClick={onToggle}
                  className="retro-button text-xs px-2"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center retro-border p-3"
                  >
                    <span className="crt-text text-sm">
                      {shortcut.description}
                    </span>
                    <span className="crt-text text-xs bg-green-500 bg-opacity-20 px-2 py-1">
                      {shortcut.key}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-green-500 border-opacity-20">
                <p className="text-xs crt-text opacity-60 text-center">
                  Press Escape or click outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
