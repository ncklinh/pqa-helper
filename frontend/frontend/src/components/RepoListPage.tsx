// src/components/RepoListPage.tsx
import React, { useState } from "react";
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
  TextField,
  MenuItem, // 👈 Add this
} from "@mui/material";
import { Repo, mockRepos } from "../mockData";
import { getRepositories } from "../api/bitbucket";

interface Props {
  onSelectRepo: (repoName: string) => void;
  workspaces: string[];
  repos: Repo[];
  selectedWorkspace: string;
  handleSelectWorkspace: (workspaceName: string) => void;
  onLogout: () => void;
}

export default function RepoListPage({
  onSelectRepo,
  workspaces,
  repos,
  selectedWorkspace,
  handleSelectWorkspace,
  onLogout,
}: Props) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedWorkspace, setSelectedWorkspace] = useState("");

  const filteredRepos = repos.filter((repo: Repo) => {
    const term = searchTerm && searchTerm.toLowerCase();
    return (
      (repo.name && repo.name.toLowerCase().includes(term)) ||
      (repo.description && repo.description.toLowerCase().includes(term))
    );
  });

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  return (
    <Box flex={1} p={4}>
      {/* Header Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          Repositories
        </Typography>

        {/*Selector + Search + Logout */}
        <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
          {/* Workspace Selector */}
          <TextField
            select
            size="small"
            label="Workspace"
            placeholder="Select workspace"
            sx={{ minWidth: 200 }}
            value={selectedWorkspace}
            slotProps={{
              inputLabel: { sx: { fontSize: "0.9rem" } },
              input: { sx: { fontSize: "0.9rem" } },
            }}
            onChange={(e) => {
              // const currentWorkspace = e.target.value;
              handleSelectWorkspace(e.target.value);
            }}
          >
            <MenuItem value="">Select</MenuItem>
            {workspaces.map((ws) => (
              <MenuItem key={ws} value={ws}>
                {ws}
              </MenuItem>
            ))}
          </TextField>

          {/* Search */}
          <TextField
            label="Search repositories"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              console.log(`e: ${e}`);
              setSearchTerm(e.target.value);
            }}
            placeholder="Search by name or description"
            sx={{ minWidth: 240 }}
            InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
            inputProps={{ sx: { fontSize: "0.9rem" } }}
          />

          {/* Logout Button */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ fontSize: "0.9rem", textTransform: "none" }}
          >
            Log out
          </Button>
        </Box>
      </Box>

      {/* Repo Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Repository</strong>
              </TableCell>
              <TableCell>
                <strong>Last updated</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRepos.map((repo: Repo) => (
              <TableRow
                key={repo.name}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => onSelectRepo(repo.name)}
              >
                <TableCell sx={{ color: "#6750A4", fontWeight: 500 }}>
                  {repo.name}
                </TableCell>
                <TableCell>{repo.lastUpdated}</TableCell>
                <TableCell>{repo.description}</TableCell>
              </TableRow>
            ))}
            {filteredRepos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Select a workspace to view repos
                </TableCell>
              </TableRow>
            )}
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
