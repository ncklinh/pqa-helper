// src/components/RepoListPage.tsx
import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Repo, mockRepos } from '../mockData';

interface Props {
  onSelectRepo: (repoName: string) => void;
  onLogout: () => void; // 👈 handle navigation back to login
}

export default function RepoListPage({ onSelectRepo, onLogout }: Props) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    onLogout(); // 👈 Navigate back to login
  };

  return (
    <Box flex={1} p={4}>
      {/* Header Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">Repositories</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Log out
        </Button>
      </Box>

      {/* Repo Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Repository</strong></TableCell>
              <TableCell><strong>Last updated</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockRepos.map((repo: Repo) => (
              <TableRow
                key={repo.name}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onSelectRepo(repo.name)}
              >
                <TableCell sx={{ color: '#6750A4', fontWeight: 500 }}>
                  {repo.name}
                </TableCell>
                <TableCell>{repo.lastUpdated}</TableCell>
                <TableCell>{repo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Logout Confirm Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out and return to the login screen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmLogout} color="error" variant="contained">
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
