import { PullRequest, Comment } from "../entities";
import { formatDateFromNow, formatToGMT7 } from "./helper";

function escapeCSVValue(value: any): string {
  if (value == null) return "";
  const str = String(value);
  // Escape double quotes by doubling them
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`; // Wrap in quotes
}

export function exportPRsToCSV(repo: string, prs: PullRequest[]) {
  const rows = prs.map((pr) =>
    [
      escapeCSVValue(`#${pr.id}`),
      escapeCSVValue(pr.title),
      escapeCSVValue(pr.author),
      escapeCSVValue(pr.branch),
      escapeCSVValue(pr.reviewers.map((r) => r.name).join("; ")),
    ].join(",")
  );

  const csv = ["ID,Title,Author,Branch,UpdatedAt,Reviewers", ...rows].join(
    "\n"
  );

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${repo}-pull-requests.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAllCommentsToCSV(repoName: String, comments: Comment[]) {
  if (!comments) return;

  const lines: string[] = [];

  lines.push(`Repo: ${repoName},,`);
  // lines.push(`Description: ${pr.description},,`);
  // lines.push(",,");

  lines.push("Username,Comment,Time,PR Type,PR");

  const commentLines = comments.map((comment) =>
    [
      escapeCSVValue(comment.user.display_name),
      escapeCSVValue(comment.content.raw),
      escapeCSVValue(formatToGMT7(comment.created_on)),
      escapeCSVValue(comment.pullrequest.type),
      escapeCSVValue(comment.pullrequest.title),
    ].join(",")
  );

  lines.push(...commentLines);

  // Create and trigger CSV download
  const csvContent = lines.join("\n");
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${repoName}_detail.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPRDetailToCSV(
  title: string,
  description: string,
  comments: Comment[]
) {
  // if (!pr) return;

  const lines: string[] = [];

  lines.push(`${escapeCSVValue("Title: " + title)},,`);
  lines.push(`${escapeCSVValue("Description: " + description)},,`);

  lines.push(",,");

  lines.push("Username,Comment,Time");
  const commentLines = comments.map((comment) =>
    [
      escapeCSVValue(comment.user.display_name),
      escapeCSVValue(comment.content.raw),
      escapeCSVValue(formatToGMT7(comment.created_on)),
    ].join(",")
  );
  lines.push(...commentLines);

  // Create and trigger CSV download
  const csvContent = lines.join("\n");
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pr_detail.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
