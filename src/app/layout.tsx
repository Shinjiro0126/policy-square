"use client";

import React, {useState} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";


export default function RootLayout({children} : {children: React.ReactNode}){
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }
   
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  }

  return(
    <ThemeProvider theme={theme}>
      <html lang="ja">
        <body>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <AppBar onDrawerToggle={handleDrawerToggle} onThemeToggle={handleThemeToggle} isDarkMode={darkMode} />
            <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}>
              <Toolbar />
              {children}
            </Box>
          </Box>
        </body>
      </html>
    </ThemeProvider>
  );
}