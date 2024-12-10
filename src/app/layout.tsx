"use client";

import React, { useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProfiver } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, useThemeContext } from "./ThemeContext";

import '@fontsource/open-sans';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/comic-neue';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    rank: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    rank?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    rank: true;
  }
}

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

    typography: {
      fontFamily: `'Open Sans', sans-serif`,
      h1: { fontSize: "48px", lineHeight: 1.5, fontWeight: 700 },
      h2: { fontSize: "40px", lineHeight: 1.5, fontWeight: 700 },
      h3: { fontSize: "32px", lineHeight: 1.5, fontWeight: 700 },
      h4: { fontSize: "24px", lineHeight: 1.5, fontWeight: 700 },
      h5: { fontSize: "24px", lineHeight: 1.5, fontWeight: 400 },
      h6: { fontSize: "20px", lineHeight: 1.5, fontWeight: 400 },
      subtitle1: { fontSize: "20px", fontWeight: 700 },
      subtitle2: { fontSize: "16px", fontWeight: 700 },
      body1: { fontSize: "16px", fontWeight: 400 },
      body2: { fontSize: "12px", fontWeight: 400 },
      caption: { fontSize: "12px", fontWeight: 300 },
      button: { fontWeight: 600, textTransform: 'none' },
      overline: { fontSize: "12px", fontWeight: 600 },
      rank: {
        fontFamily: "'Comic Neue', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: "0.05rem",
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
      },
    }
  });

  useEffect(() => {
    if (theme.palette.mode === "light") {
      document.body.style.backgroundColor = "#f7f7f7";
    } else {
      document.body.style.backgroundColor = "#121212";
    }
  }, [theme.palette.mode]);


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
