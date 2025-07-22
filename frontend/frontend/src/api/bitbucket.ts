import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080/bitbuckets";

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
  const res = await api.get("/api/workspace");
  console.log(res.data);
  return res.data.data;
}

// 2. Get repositories in a workspace
export async function getRepositories(workspaceSlug: string) {
  const res = await api.get(`/api/repos?workspace=${workspaceSlug}`);
  console.log(res.data);
  return res.data;
}

// 3. Get PRs in a repository
export async function getPullRequests(workspaceSlug: string, repoSlug: string) {
  const res = await api.get(
    `/api/pullrequests?workspace=${workspaceSlug}&repo=${repoSlug}`
  );
  return res.data;
}

// 4. Get PR detail (and comments)
export async function getPRComments(
  workspaceSlug: string,
  repoSlug: string,
  prId: string
) {
  const res = await api.get(
    `/bitbucket/${workspaceSlug}/${repoSlug}/pullrequests/${prId}/comments`
  );
  return res.data;
}
