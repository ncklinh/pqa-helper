import { PullRequest } from "../mockData";

export function exportPRsToCSV(repo: string, prs: PullRequest[]) {
  const rows = prs.map((pr) =>
    [
      `#${pr.id}`,
      pr.title,
      pr.author,
      pr.branch,
      pr.updatedAt,
      pr.reviewers.map((r) => r.name).join("; "),
    ].join(",")
  );

  const csv = ["ID,Title,Author,Branch,UpdatedAt,Reviewers", ...rows].join(
    "\n"
  );

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${repo}_pull_requests.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPRDetailToCSV(pr: PullRequest) {
  const rows = pr.comments.map((comment) =>
    [comment.name, comment.content, comment.time].join(",")
  );
  const csv = ["Username,Comment,Time", ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${pr.id}_detail.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
