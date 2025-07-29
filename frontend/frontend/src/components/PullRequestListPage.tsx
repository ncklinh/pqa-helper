import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
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
import { Comment, PullRequest } from "../entities";
import { exportAllCommentsToCSV, exportPRsToCSV } from "../utils/exportCSV";
import { formatDateFromNow } from "../utils/helper";
import { BackButton, PRStateChip } from "./UiComponents";
import { MyComponent } from "./DatePicker";

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
  const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const authors = Array.from(new Set(prs.map((pr) => pr.author.display_name)));
  const states = Array.from(new Set(prs.map((pr) => pr.state)));

  const filteredPRs = prs.filter((pr) => {
    return (authorFilter ? pr.author.display_name === authorFilter : true) &&
      statusFilter
      ? pr.state === statusFilter
      : true;
  });

  const prStateMap = new Map<number, string>(
    prs.map((pr) => [pr.id, pr.state])
  );

  const filteredComments = repoComments.filter((comment) => {
    const prState = prStateMap.get(comment.pullrequest.id);
    return statusFilter ? prState === statusFilter : true;
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
        <Typography variant="h6" fontWeight="bold">
          Pull Requests
        </Typography>

        {/* Filters + Actions */}
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          {/* Filters */}
          <TextField
            select
            size="small"
            label="Author"
            className="selector"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Select author"
            sx={{ minWidth: 160 }}
            slotProps={{
              inputLabel: { sx: { fontSize: "0.85rem" } },
              input: { sx: { fontSize: "0.85rem" } },
            }}
          >
            <MenuItem value="" sx={{ fontSize: "0.8rem" }}>
              All
            </MenuItem>
            {authors.map((authorName) => (
              <MenuItem
                key={authorName}
                value={authorName}
                sx={{ fontSize: "0.8rem" }}
              >
                {authorName}
              </MenuItem>
            ))}
          </TextField>
          {/* <MyComponent /> */}
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
            onClick={() => exportAllCommentsToCSV(repoName, filteredComments)}
            className="contained-button"
            size="small"
          >
            Export Repo Comments
          </Button>
          <BackButton onBack={onBack} />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="primary-text table-cell">
                <strong>Summary</strong>
              </TableCell>
              <TableCell className="primary-text table-cell">
                <strong>Created</strong>
              </TableCell>
              <TableCell className="primary-text table-cell">
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
                <TableCell
                  className="table-cell"
                  sx={{ color: "#6750A4", fontWeight: 500 }}
                >
                  <Box display="flex" alignItems="center">
                    {/* Author Avatar */}
                    <Box width={45}>
                      <Avatar
                        src={pr.author.links.avatar.href}
                        sx={{ width: 36, height: 36 }}
                      />
                    </Box>

                    {/* Title & Metadata */}
                    <Box
                      flex={1}
                      textAlign="left"
                      sx={{ margin: "2px 5px" }}
                      // gap={0.8}
                    >
                      <Box display={"flex"} alignItems="center" gap={0.8}>
                        {/* Status */}
                        {pr.state && <PRStateChip state={pr.state} />}{" "}
                        <Typography variant="body2" className="primary-text">
                          {pr.title}
                        </Typography>
                      </Box>
                      <Typography variant="caption" className="secondary-text">
                        {`${pr.author.display_name} #${
                          pr.id
                        }, updated ${formatDateFromNow(pr.updated_on)}`}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell className="table-cell">
                  {" "}
                  {formatDateFromNow(pr.updated_on)}
                </TableCell>
                <TableCell className="table-cell">
                  {/* Reviewers */}
                  {pr.reviewers && (
                    <Box width={150} display="flex" justifyContent="flex-start">
                      <Stack direction="row" spacing={1}>
                        {pr.reviewers &&
                          pr.reviewers.map((r) => (
                            <Avatar
                              key={r.name}
                              src={r.links.avatar.href}
                              alt={r.name}
                              sx={{ width: 30, height: 30 }}
                            />
                          ))}
                      </Stack>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredPRs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No pull requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* PR list */}
    </Box>
  );
}
