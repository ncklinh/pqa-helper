// src/components/PRListPage.tsx
import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { mockPRs, PullRequest } from "../mockData";
import { exportPRsToCSV } from "../utils/exportCSV";

interface Props {
  repo: string;
  onSelectPR(pr: PullRequest): void;
  onBack: () => void;
}

export default function PRListPage({ repo, onSelectPR, onBack }: Props) {
  const prs = mockPRs || [];

  return (
    <Box flex={1} p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {/* Left: Title */}
        <Typography variant="h4" fontWeight="bold">
          Pull Requests
        </Typography>

        {/* Right: Buttons */}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportPRsToCSV(repo, prs)}
          >
            Export CSV
          </Button>
          <Button variant="outlined" onClick={onBack}>
            ← Back
          </Button>
        </Box>
      </Box>

      {prs.map((pr: PullRequest) => (
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
            {/* Column 1: Author Avatar */}
            <Box width={80} display="flex" justifyContent="center">
              <Avatar src={pr.authorAvatar} alt={pr.author} />
            </Box>

            {/* Column 2: Title + Metadata */}
            <Box flex={1} textAlign="left">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: "#6750A4" }}
              >
                {`#${pr.id} - ${pr.title}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${pr.author} – last updated ${pr.updatedAt}`}
              </Typography>
            </Box>

            {/* Column 3: Status */}
            <Box width={100} display="flex" justifyContent="center">
              {/* <Chip label={pr.branch} variant="outlined" /> */}
              <Chip
                label={pr?.status}
                sx={{
                  backgroundColor:
                    pr?.status === "OPEN"
                      ? "#1976d2"
                      : pr?.status === "DRAFT"
                      ? "#9e9e9e"
                      : pr?.status === "MERGED"
                      ? "green"
                      : undefined,
                  color: "white",
                }}
              />
            </Box>

            {/* Column 4: Reviewers */}
            <Box width={150} display="flex" justifyContent="flex-start">
              <Stack direction="row" spacing={1}>
                {pr.reviewers.map((r) => (
                  <Avatar
                    key={r.name}
                    src={r.avatar}
                    alt={r.name}
                    sx={{ width: 30, height: 30 }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
