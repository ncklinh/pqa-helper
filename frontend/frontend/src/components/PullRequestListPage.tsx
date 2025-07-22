import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Paper,
  Stack,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { PullRequest } from "../mockData";
import { exportPRsToCSV } from "../utils/exportCSV";

interface Props {
  // workspaceName: string;
  repoName: string;
  prs: PullRequest[];
  onSelectPR(pr: PullRequest): void;
  onBack: () => void;
}

export default function PRListPage({
  // workspaceName,
  repoName,
  prs,
  onSelectPR,
  onBack,
}: Props) {
  // const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // const authors = Array.from(new Set(prs.map((pr) => pr.author)));
  const states = Array.from(new Set(prs.map((pr) => pr.state)));

  const filteredPRs = prs.filter((pr) => {
    return (
      // (authorFilter ? pr.author === authorFilter : true) &&
      statusFilter ? pr.state === statusFilter : true
    );
  });

  return (
    <Box flex={1} p={4}>
      {/* Top Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Pull Requests
        </Typography>

        {/* Filters + Actions */}
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          {/* Filters */}
          {/* <TextField
            select
            size="small"
            label="Author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Select author"
            sx={{ minWidth: 160 }}
            slotProps={{
              inputLabel: { sx: { fontSize: "0.85rem" } },
              input: { sx: { fontSize: "0.85rem" } },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {authors.map((author) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))}
          </TextField> */}

          <TextField
            select
            size="small"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Select status"
            sx={{ minWidth: 160 }}
            slotProps={{
              inputLabel: { sx: { fontSize: "0.85rem" } },
              input: { sx: { fontSize: "0.85rem" } },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {states.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {/* Actions */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportPRsToCSV(repoName, filteredPRs)}
          >
            Export CSV
          </Button>
          <Button variant="outlined" onClick={onBack}>
            ← Back
          </Button>
        </Box>
      </Box>

      {/* PR list */}
      {filteredPRs.map((pr: PullRequest) => (
        <Paper
          key={pr.id}
          variant="outlined"
          onClick={() => onSelectPR(pr)}
          sx={{
            p: 2,
            mb: 2,
            "&:hover": { borderColor: "#6750A4" },
          }}
        >
          <Box display="flex" alignItems="center">
            {/* Author Avatar */}
            <Box width={80} display="flex" justifyContent="center">
              <Avatar src={pr.authorAvatar} alt={pr.author} />
            </Box>

            {/* Title & Metadata */}
            <Box flex={1} textAlign="left">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: "#6750A4" }}
              >
                {`#${pr.id} - ${pr.title}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pr.description}
                {/* {`${pr.author} – last updated ${pr.updatedAt}`} */}
              </Typography>
            </Box>

            {/* Status */}
            {pr.state && (
              <Box width={100} display="flex" justifyContent="center">
                <Chip
                  label={pr.state}
                  sx={{
                    backgroundColor:
                      pr.state === "OPEN"
                        ? "#1976d2"
                        : pr.state === "DRAFT"
                        ? "#9e9e9e"
                        : pr.state === "MERGED"
                        ? "green"
                        : undefined,
                    color: "white",
                  }}
                />
              </Box>
            )}

            {/* Reviewers */}
            {pr.reviewers && (
              <Box width={150} display="flex" justifyContent="flex-start">
                <Stack direction="row" spacing={1}>
                  {pr.reviewers &&
                    pr.reviewers.map((r) => (
                      <Avatar
                        key={r.name}
                        src={r.avatar}
                        alt={r.name}
                        sx={{ width: 30, height: 30 }}
                      />
                    ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
