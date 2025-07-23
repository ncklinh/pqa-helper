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
import { formatDate } from "../utils/helper";

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
        <Typography variant="h6" fontWeight="bold"></Typography>

        {/* Right: Buttons */}
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => pr && exportPRDetailToCSV(pr)}
            className="contained-button"
            size="small"
          >
            Export PR Comments
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
      {/* Path + Title */}
      {/* <Typography variant="body2" color="textSecondary" align="left">
        work-space / repo-name
      </Typography> */}
      {/* Chips */}
      <Stack direction="row" spacing={2} my={1} alignItems="center">
        <Typography variant="body1" fontWeight="bold" align="left">
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
            padding: "5px",
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
      <Typography variant="body2" fontWeight="bold" align="left">
        Description
      </Typography>
      <Typography variant="body2" align="left">
        {pr?.description}
      </Typography>
      <Divider sx={{ my: 3 }} />
      {/* Activity */}
      <Typography variant="body2" fontWeight="bold" align="left">
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
                    {" "}
                    <span style={{ fontSize: "0.8rem" }}>
                      <strong>{comment.user.display_name}</strong>{" "}
                      {formatDate(comment.created_on)}
                    </span>
                  </Typography>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    align="left"
                  >
                    {comment.content.raw}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
      </Box>
    </Box>
  );
}
