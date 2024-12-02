"use client";

import React, {useState} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LoginAppBar from "../components/LoginAppBar";

export default function RootLayout({children} : {children: React.ReactNode}){
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: '#3A833A',
        light: '#3A833A',
        dark: '#276227',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#64b5f6',
        light: '#64b5f6',
        dark: '#2384C7',
        contrastText: '#000000',
      },
    },
  });
   
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  }

  return(
    <ThemeProvider theme={theme}>
      <html lang="ja">
        <body>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <LoginAppBar onThemeToggle={handleThemeToggle} isDarkMode={darkMode} />
              <Toolbar />
              {children}
          </Box>
        </body>
      </html>
    </ThemeProvider>
  );
}