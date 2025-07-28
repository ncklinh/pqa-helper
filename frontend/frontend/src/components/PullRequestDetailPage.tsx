// src/pages/PullRequestDetailPage.tsx

import { Box, Typography, Divider, Avatar, Stack, Button } from "@mui/material";
import { PullRequest } from "../entities";
import { exportPRDetailToCSV } from "../utils/exportCSV";
import { formatDate } from "../utils/helper";
import {
  PRStateChip,
  PRBranchChip,
  ArrowForward,
  BackButton,
} from "./UiComponents";

export default function PullRequestDetailPage({
  pr,
  onBack,
}: {
  pr: PullRequest | null;
  onBack: () => void;
}) {
  return (
    <Box flex={1} p={4} color={"white"}>
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
          <BackButton onBack={onBack} />
        </Box>
      </Box>
      {/* Path + Title */}
      {/* <Typography variant="body2" color="textSecondary" align="left">
        work-space / repo-name
      </Typography> */}
      {/* Chips */}
      <Stack direction="row" spacing={2} my={1} alignItems="center">
        <Typography
          variant="h6"
          fontWeight="bold"
          align="left"
          className="primary-text"
        >
          {pr?.title}
        </Typography>
        {""}
        {/* <Chip label={pr?.branch} color="primary" /> */}
        {/* {pr?.state && <PRStateChip state={pr?.state} />}{" "} */}
      </Stack>
      <Box display="flex" alignItems="center">
        {/* Author Avatar */}
        <Box width={45}>
          <Avatar
            src={pr?.author.links.avatar.href}
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
            {pr?.source.branch.name && (
              <PRBranchChip state={pr?.source.branch.name} />
            )}{" "}
            <ArrowForward />
            {pr?.destination.branch.name && (
              <PRBranchChip state={pr?.destination.branch.name} />
            )}{" "}
            {pr?.state && <PRStateChip state={pr?.state} />}{" "}
          </Box>
          <Typography variant="caption" className="secondary-text">
            {pr &&
              `${pr?.author.display_name} #${pr?.id} • Created ${formatDate(
                pr.created_on
              )} • Last updated ${formatDate(pr.updated_on)}`}
          </Typography>
        </Box>
      </Box>
      {/* <Box textAlign="left" flex={1}>
        <Typography variant="caption" color="textSecondary" align="left">
          • Created {pr?.created_on} • Last updated {pr?.updated_on}
        </Typography>
      </Box> */}
      <Divider sx={{ my: 3 }} />
      {/* Description */}
      <Typography
        variant="body2"
        fontWeight="bold"
        align="left"
        className="primary-text"
      >
        Description
      </Typography>
      <Typography variant="body2" align="left" className="primary-text">
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
            <Stack
              direction="row"
              spacing={2}
              alignItems="top"
              key={idx}
              className="comment-stack"
            >
              <Box width={40}>
                <Avatar
                  src={comment.user.links.avatar.href}
                  sx={{ width: 36, height: 36 }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  className="primary-text"
                  align="left"
                  sx={{ textAlign: "left" }}
                >
                  {" "}
                  <span style={{ fontSize: "0.9rem" }}>
                    <strong>{comment.user.display_name}</strong>{" "}
                    {formatDate(comment.created_on)}
                  </span>
                </Typography>

                <Typography
                  variant="caption"
                  className="secondary-text"
                  align="left"
                >
                  {comment.content.raw}
                </Typography>
              </Box>
            </Stack>
          ))}
      </Box>
    </Box>
  );
}
