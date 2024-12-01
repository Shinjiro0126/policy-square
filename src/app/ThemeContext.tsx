"use client";

import React, { createContext, useContext, useState } from "react";

// Context の作成
const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

// Provider コンポーネントの作成とエクスポート
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Context の使用を簡単にするためのフックもエクスポート
export function useThemeContext() {
  return useContext(ThemeContext);
}
