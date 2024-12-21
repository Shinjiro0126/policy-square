"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Context の作成
const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

// Provider コンポーネントの作成とエクスポート
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if(darkMode === null){
        setDarkMode(event.matches);
      }
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);

  },[]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode: darkMode ?? false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Context の使用を簡単にするためのフックもエクスポート
export function useThemeContext() {
  return useContext(ThemeContext);
}
