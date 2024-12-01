"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Toolbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"; // アイコン名修正

import { DashboardLayout } from "./DashboardLayout";

export default function LoginPage() {

  return (
    <DashboardLayout>
      <Toolbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
    </DashboardLayout>
  );
}
