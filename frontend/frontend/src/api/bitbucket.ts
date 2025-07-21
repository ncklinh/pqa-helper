import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "https://ngrok-free.app/bitbucket";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 1. Get all workspaces
export async function getWorkspaces() {
  const res = await api.get("/workspaces");
  return res.data;
}

// 2. Get repositories in a workspace
export async function getRepositories(workspaceSlug: string) {
  const res = await api.get(`/workspaces/${workspaceSlug}/repos`);
  return res.data;
}

// 3. Get PRs in a repository
export async function getPullRequests(workspaceSlug: string, repoSlug: string) {
  const res = await api.get(
    `/workspaces/${workspaceSlug}/repos/${repoSlug}/prs`
  );
  return res.data;
}

// 4. Get PR detail (and comments)
export async function getPullRequestDetails(
  workspaceSlug: string,
  repoSlug: string,
  prId: string
) {
  const res = await api.get(
    `/workspaces/${workspaceSlug}/repos/${repoSlug}/prs/${prId}`
  );
  return res.data;
}
