"use client";

import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
// import { inherits } from "util";

interface AppBarProps {
  onDrawerToggle: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export default function AppBar({onDrawerToggle, onThemeToggle, isDarkMode} : AppBarProps){
  // const theme = useTheme();

  return (
    <MuiAppBar 
      position="fixed" 
      sx={{ 
        width: { sm: `100%` },
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        ml: { sm: `240px` } 
      }}
    >
      <Toolbar>
        {/* アイコンボタンが常に表示されるように修正 */}
        <IconButton 
          color="inherit" 
          aria-label="open drawer" 
          edge="start" 
          onClick={onDrawerToggle} 
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <Box 
          component="img"
          src="/logo.svg"
          alt="ロゴ"
          sx={{height: 36}}
        >
        </Box>

          <IconButton color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}