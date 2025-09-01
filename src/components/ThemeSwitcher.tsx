"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = {
  // Dark Themes
  classic: {
    name: "CLASSIC GREEN",
    background: "#0a0a0a",
    foreground: "#00ff00",
    accent: "#00ff41",
    glow: "#00ff00",
    category: "dark",
  },
  amber: {
    name: "AMBER TERMINAL",
    background: "#1a1a1a",
    foreground: "#ffb000",
    accent: "#ffcc00",
    glow: "#ffb000",
    category: "dark",
  },
  blue: {
    name: "BLUE MATRIX",
    background: "#000011",
    foreground: "#00ffff",
    accent: "#0080ff",
    glow: "#00ffff",
    category: "dark",
  },
  red: {
    name: "RED ALERT",
    background: "#1a0000",
    foreground: "#ff0000",
    accent: "#ff4040",
    glow: "#ff0000",
    category: "dark",
  },
  purple: {
    name: "PURPLE HAZE",
    background: "#0a0a1a",
    foreground: "#ff00ff",
    accent: "#cc00cc",
    glow: "#ff00ff",
    category: "dark",
  },
  // Light Themes
  lightGreen: {
    name: "LIGHT GREEN",
    background: "#f0fff0",
    foreground: "#006400",
    accent: "#228b22",
    glow: "#006400",
    category: "light",
  },
  lightBlue: {
    name: "LIGHT BLUE",
    background: "#f0f8ff",
    foreground: "#000080",
    accent: "#4169e1",
    glow: "#000080",
    category: "light",
  },
  lightAmber: {
    name: "LIGHT AMBER",
    background: "#fff8dc",
    foreground: "#b8860b",
    accent: "#daa520",
    glow: "#b8860b",
    category: "light",
  },
  lightPurple: {
    name: "LIGHT PURPLE",
    background: "#f8f0ff",
    foreground: "#4b0082",
    accent: "#8a2be2",
    glow: "#4b0082",
    category: "light",
  },
  lightPink: {
    name: "LIGHT PINK",
    background: "#fff0f5",
    foreground: "#8b008b",
    accent: "#ff1493",
    glow: "#8b008b",
    category: "light",
  },
};

interface ThemeSwitcherProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function ThemeSwitcher({
  isVisible,
  onToggle,
}: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof THEMES>("classic");
  const [selectedCategory, setSelectedCategory] = useState<"dark" | "light">(
    "dark"
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "retro-api-theme"
    ) as keyof typeof THEMES;
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(THEMES[savedTheme]);
      setSelectedCategory(THEMES[savedTheme].category);
    }
  }, []);

  const applyTheme = (theme: (typeof THEMES)[keyof typeof THEMES]) => {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--glow", theme.glow);
  };

  const handleThemeChange = (themeKey: keyof typeof THEMES) => {
    setCurrentTheme(themeKey);
    applyTheme(THEMES[themeKey]);
    setSelectedCategory(THEMES[themeKey].category);
    localStorage.setItem("retro-api-theme", themeKey);
  };

  const darkThemes = Object.entries(THEMES).filter(
    ([_, theme]) => theme.category === "dark"
  );
  const lightThemes = Object.entries(THEMES).filter(
    ([_, theme]) => theme.category === "light"
  );

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed top-4 left-4 retro-button crt-glow z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        THEME
      </motion.button>

      {/* Theme Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-20 left-4 w-64 retro-border crt-glow bg-black bg-opacity-90 z-40"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="crt-text font-bold">THEME SELECTOR</h3>
                <button
                  onClick={onToggle}
                  className="retro-button text-xs px-2"
                >
                  ×
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory("dark")}
                  className={`retro-button text-xs flex-1 ${
                    selectedCategory === "dark" ? "bg-green-500 text-black" : ""
                  }`}
                >
                  DARK
                </button>
                <button
                  onClick={() => setSelectedCategory("light")}
                  className={`retro-button text-xs flex-1 ${
                    selectedCategory === "light"
                      ? "bg-green-500 text-black"
                      : ""
                  }`}
                >
                  LIGHT
                </button>
              </div>

              {/* Themes */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {(selectedCategory === "dark" ? darkThemes : lightThemes).map(
                  ([key, theme]) => (
                    <motion.button
                      key={key}
                      onClick={() =>
                        handleThemeChange(key as keyof typeof THEMES)
                      }
                      className={`w-full p-3 retro-border text-left transition-all ${
                        currentTheme === key ? "bg-green-500 bg-opacity-20" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 border-2"
                          style={{
                            backgroundColor: theme.background,
                            borderColor: theme.foreground,
                            boxShadow: `0 0 10px ${theme.glow}`,
                          }}
                        />
                        <span className="crt-text text-sm">{theme.name}</span>
                      </div>
                    </motion.button>
                  )
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-green-500 border-opacity-20">
                <p className="text-xs crt-text opacity-60 text-center">
                  CURRENT: {THEMES[currentTheme].name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
