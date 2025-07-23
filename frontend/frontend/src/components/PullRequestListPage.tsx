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
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { Comment, PullRequest } from "../mockData";
import { exportAllCommentsToCSV, exportPRsToCSV } from "../utils/exportCSV";

interface Props {
  repoName: string;
  prs: PullRequest[];
  repoComments: Comment[];
  onSelectPR(pr: PullRequest): void;
  onBack: () => void;
}

export default function PRListPage({
  repoName,
  prs,
  repoComments: repoComments,
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
            className="selector"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Select status"
            sx={{ minWidth: 130 }}
            slotProps={{
              inputLabel: { sx: { fontSize: "0.8rem" } },
              input: { sx: { fontSize: "0.8rem" } },
            }}
          >
            <MenuItem value="" sx={{ fontSize: "0.8rem" }}>
              All
            </MenuItem>
            {states.map((status) => (
              <MenuItem key={status} value={status} sx={{ fontSize: "0.8rem" }}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {/* Actions */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportAllCommentsToCSV(repoName, repoComments)}
            className="contained-button"
            size="small"
          >
            Export Repo Comments
          </Button>
          <Button
            variant="outlined"
            onClick={onBack}
            className="outlined-button"
            size="small"
          >
            ← Back
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="primary-text">
                <strong>Summary</strong>
              </TableCell>
              <TableCell>
                <strong>Created</strong>
              </TableCell>
              <TableCell>
                <strong>Reviewers</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPRs.map((pr: PullRequest) => (
              <TableRow
                hover
                sx={{ cursor: "pointer" }}
                key={pr.id}
                onClick={() => onSelectPR(pr)}
              >
                <TableCell sx={{ color: "#6750A4", fontWeight: 500 }}>
                  <Box display="flex" alignItems="center">
                    {/* Author Avatar */}
                    <Box width={50}>
                      <Avatar src={pr.authorAvatar} alt={pr.author} />
                    </Box>

                    {/* Title & Metadata */}
                    <Box flex={1} textAlign="left">
                      <Box display={"flex"} alignItems="center" gap={0.3}>
                        {/* Status */}
                        {pr.state && (
                          <Chip
                            label={pr.state}
                            sx={{
                              backgroundColor:
                                pr.state === "OPEN"
                                  ? "#0C66E4"
                                  : pr.state === "DRAFT"
                                  ? "#44546F"
                                  : pr.state === "MERGED"
                                  ? "#1F845A"
                                  : pr.state === "DECLINED"
                                  ? "#C9372C"
                                  : undefined,
                              color: "white",
                              padding: "0px",
                              margin: "5px",
                              minWidth: "unset",
                              height: "20px",
                              borderRadius: "5px",
                            }}
                          />
                        )}{" "}
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          className="primary-text"
                        >
                          {`#${pr.id} - ${pr.title}`}
                        </Typography>
                      </Box>
                      <Typography variant="body2" className="primary-text">
                        {pr.description}
                        {/* {`${pr.author} – last updated ${pr.updatedAt}`} */}
                      </Typography>
                    </Box>

                    {/* Reviewers */}
                    {pr.reviewers && (
                      <Box
                        width={150}
                        display="flex"
                        justifyContent="flex-start"
                      >
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
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
            {/* {filteredRepos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Select a workspace to view repos
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* PR list */}
    </Box>
  );
}
