// src/pages/PullRequestDetailPage.tsx

import {
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import { PullRequest } from "../mockData";
import { exportPRDetailToCSV } from "../utils/exportCSV";
import { formatToGMT7 } from "../utils/helper";

export default function PullRequestDetailPage({
  pr,
  onBack,
}: {
  pr: PullRequest | null;
  onBack: () => void;
}) {
  return (
    <Box flex={1} p={4}>
      {" "}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {/* Left: Title */}
        <Typography variant="h4" fontWeight="bold"></Typography>

        {/* Right: Buttons */}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => pr && exportPRDetailToCSV(pr)}
          >
            Export PR Comments
          </Button>
          <Button variant="outlined" onClick={onBack}>
            ← Back
          </Button>
        </Box>
      </Box>
      {/* Path + Title */}
      {/* <Typography variant="body2" color="textSecondary" align="left">
        work-space / repo-name
      </Typography> */}
      {/* Chips */}
      <Stack direction="row" spacing={2} my={1} alignItems="center">
        <Typography variant="h6" fontWeight="bold" align="left">
          {`#${pr?.id} - ${pr?.title}`}
        </Typography>
        {""}
        {/* <Chip label={pr?.branch} color="primary" /> */}
        <Chip
          label={pr?.state}
          sx={{
            backgroundColor:
              pr?.state === "OPEN"
                ? "#1976d2"
                : pr?.state === "DRAFT"
                ? "#9e9e9e"
                : pr?.state === "MERGED"
                ? "green"
                : undefined,
            color: "white",
          }}
        />
      </Stack>
      {/* <Box textAlign="left" flex={1}>
        <Typography variant="caption" color="textSecondary" align="left">
          • Created {pr?.created_on} • Last updated {pr?.updated_on}
        </Typography>
      </Box> */}
      <Divider sx={{ my: 3 }} />
      {/* Description */}
      <Typography variant="h6" align="left">
        Description
      </Typography>
      <Typography align="left">{pr?.description}</Typography>
      <Divider sx={{ my: 3 }} />
      {/* Activity */}
      <Typography variant="h6" align="left">
        Activity
      </Typography>
      <Box mt={2}>
        {pr?.comments &&
          pr?.comments.map((comment, idx) => (
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }} key={idx}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={comment.user.links.avatar.href} />
                <Box>
                  <Typography
                    variant="subtitle2"
                    align="left"
                    sx={{ textAlign: "left" }}
                  >
                    {comment.user.display_name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    align="left"
                  >
                    {formatToGMT7(comment.created_on)} • {comment.content.raw}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
      </Box>
    </Box>
  );
}
