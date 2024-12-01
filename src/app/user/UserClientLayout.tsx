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
    },
  })
   
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