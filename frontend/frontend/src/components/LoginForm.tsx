import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  username: string;
  appPassword: string;
  setUsername: (val: string) => void;
  setAppPassword: (val: string) => void;
  onLogin: () => void;
}

export default function LoginForm({
  username,
  appPassword,
  setUsername,
  setAppPassword,
  onLogin
}: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" justifyContent="center">
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
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}
