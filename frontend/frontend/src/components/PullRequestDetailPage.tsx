// src/pages/PullRequestDetailPage.tsx

import {
  Box,
  Typography,
  Divider,
  Avatar,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { CommentNode, PullRequest } from "../entities";
import { exportPRDetailToCSV } from "../utils/exportCSV";
import { buildCommentTree, formatDateFromNow } from "../utils/helper";
import {
  PRStateChip,
  PRBranchChip,
  ArrowForward,
  BackButton,
} from "./UiComponents";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function PullRequestDetailPage({
  pr,
  onBack,
}: {
  pr: PullRequest | null;
  onBack: () => void;
}) {
  const commentTree = buildCommentTree(pr?.comments ?? []);

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
            onClick={() =>
              pr &&
              exportPRDetailToCSV(pr?.title, pr?.description, pr?.comments)
            }
            className="contained-button"
            size="small"
          >
            Export All Comments
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              pr && exportPRDetailToCSV(pr?.title, pr?.description, commentTree)
            }
            className="outlined-button"
            size="small"
          >
            Export Root Comments
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
              `${pr?.author.display_name} #${
                pr?.id
              } • Created ${formatDateFromNow(
                pr.created_on
              )} • Last updated ${formatDateFromNow(pr.updated_on)}`}
          </Typography>
        </Box>
      </Box>
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
        {commentTree.map((rootComment) => (
          <CommentThread key={rootComment.id} comment={rootComment} />
        ))}
      </Box>
    </Box>
  );
}

function CommentThread({ comment }: { comment: CommentNode }) {
  const [showReplies, setShowReplies] = useState(true);

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const hasReplies = comment.replies.length > 0;

  return (
    <Box ml={comment.parent ? 4 : 0} mt={2}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        key={comment.id}
        className="comment-stack"
      >
        <Box width={40}>
          <Avatar
            src={comment.user.links.avatar.href}
            sx={{ width: 36, height: 36 }}
          />
        </Box>

        <Box flex={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              className="primary-text"
              sx={{ textAlign: "left", fontSize: "0.9rem" }}
            >
              <strong>{comment.user.display_name}</strong>{" "}
              {formatDateFromNow(comment.created_on)}
            </Typography>

            {hasReplies && (
              <IconButton size="small" onClick={toggleReplies}>
                {showReplies ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </IconButton>
            )}
          </Stack>

          <Typography
            variant="caption"
            className="secondary-text"
            align="left"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {comment.content.raw}
          </Typography>
        </Box>
      </Stack>

      {showReplies &&
        comment.replies.map((child) => (
          <CommentThread key={child.id} comment={child} />
        ))}
    </Box>
  );
}
