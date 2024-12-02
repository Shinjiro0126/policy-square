"use client";

import React, {useState, useRef, useLayoutEffect} from "react";
import {
  Box
} from "@mui/material";

import AppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import { useThemeContext } from "./ThemeContext";


export function DashboardLayout({children}: {children: React.ReactNode}){
  const [mobileOpen, setMobileOpen] = useState(false);
  const {darkMode, toggleTheme} = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return(
    <Box sx={{ display: "flex" }}>
    {/* AppBar */}
    <AppBar
      onDrawerToggle={handleDrawerToggle}
      onThemeToggle={toggleTheme}
      isDarkMode={darkMode}
    />
    {/* Sidebar */}
    <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
    {/* メインコンテンツ */}
    <Box component="main" 
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, marginTop: '64px' }}
      >
      {children}
    </Box>
  </Box>
  );
}