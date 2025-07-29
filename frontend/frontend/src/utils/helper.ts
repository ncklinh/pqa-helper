import { CommentNode, Comment } from "../entities";

export function formatDateFromNow(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  // Convert both to milliseconds
  const diffMs = now.getTime() - date.getTime();

  // Convert to seconds
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

export function formatToGMT7(isoString: string): string {
  const date = new Date(isoString);

  // Create options for formatting
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Format date
  const formatted = new Intl.DateTimeFormat("en-GB", options).format(date);

  // Replace commas and format manually to match expected format
  const [day, month, year, time] = formatted.replace(",", "").split(/[/\s]/);
  return `${day}-${month}-${year} ${time} GMT+7`;
}


export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const map = new Map<number, CommentNode>();
  const roots: CommentNode[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  map.forEach((comment) => {
    if (comment.parent?.id) {
      const parent = map.get(comment.parent.id);
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}
