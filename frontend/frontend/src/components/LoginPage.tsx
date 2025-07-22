import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  username: string;
  appPassword: string;
  setUsername: (val: string) => void;
  setAppPassword: (val: string) => void;
  onLoginNavigate: () => void;
}

export default function LoginPage({
  username,
  appPassword,
  setUsername,
  setAppPassword,
  onLoginNavigate,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login({
        username: username,
        app_password: appPassword,
      });
      if (data.token) onLoginNavigate();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Login failed", {
        position: "bottom-right",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      justifyContent="center"
    >
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          PQA Helper
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="App Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={appPassword}
          onChange={(e) => setAppPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Paper>
      <ToastContainer aria-label={undefined} />
    </Box>
  );
}
