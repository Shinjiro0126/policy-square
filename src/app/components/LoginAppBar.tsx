"use client";

import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
// import { inherits } from "util";

interface AppBarProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export default function AppBar({onThemeToggle, isDarkMode} : AppBarProps){
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>

          <IconButton color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}