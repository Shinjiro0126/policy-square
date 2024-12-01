"use client";

import React, { useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProfiver } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider, useThemeContext } from "./ThemeContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { darkMode } = useThemeContext();

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

    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: ({theme}) => ({
            '&.Mui-selected': theme.palette.mode === 'light' && {
              backgroundColor: '#E5F4E4',
              '& .MuiListItemIcon-root': {
                color: '#3A833A',
              }
            }
          })
        }
      }
    }

  });

  return (
    <MuiThemeProfiver theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProfiver>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <LayoutContent>
            {/* 子コンポーネントを表示 */}
            {children}
          </LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
