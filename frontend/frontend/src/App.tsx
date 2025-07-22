import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
} from "@mui/material";
import LoginPage from "./components/LoginPage";
import RepoListPage from "./components/RepoListPage";
import PRListPage from "./components/PullRequestListPage";
import PullRequestDetailPage from "./components/PullRequestDetailPage";
import { PullRequest, Comment, Repo } from "./mockData";
import {
  getWorkspaces,
  getPullRequests,
  getPRComments,
  getRepositories,
} from "./api/bitbucket";
import { logout } from "./api/auth";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
    },
    primary: {
      main: "#6750A4",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

type Screen = "login" | "repo" | "pr" | "pr-detail";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [username, setUsername] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedPr, setSelectedPr] = useState<PullRequest | null>(null);
  const [workspaces, setWorkspaces] = useState<string[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  const handleLoginNavigate = async () => {
    const result = await getWorkspaces();
    setWorkspaces(result);
    setScreen("repo");
  };

  const handleBackToRepo = () => {
    setScreen("repo");
    // setSelectedRepo("");
  };
  const handleSelectWorkspace = async (workspaceName: string) => {
    setSelectedWorkspace(workspaceName);

    if (workspaceName) {
      const repos: Repo[] = await getRepositories(workspaceName); // 👈 use the argument, not stale state
      setRepos(repos);
    } else {
      setRepos([]);
    }
  };

  const handleSelectRepo = async (repoName: string) => {
    const result = await getPullRequests(selectedWorkspace, repoName);
    setPullRequests(result);
    // setSelectedWorkspace(workspaceName);
    setSelectedRepo(repoName);
    setScreen("pr");
  };

  const handleLogout = () => {
    logout();
    setScreen("login");
  };

  const handleViewPrDetail = async (pr: PullRequest) => {
    const result = await getPRComments(
      selectedWorkspace,
      selectedRepo,
      pr.id?.toString()
    );
    setComments(result);
    setSelectedPr({ ...pr, comments: result });
    setScreen("pr-detail");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        minHeight="100vh"
        bgcolor="background.default"
        display="flex"
        flexDirection="column"
      >
        {screen === "login" && (
          <LoginPage
            username={username}
            appPassword={appPassword}
            setUsername={setUsername}
            setAppPassword={setAppPassword}
            onLoginNavigate={handleLoginNavigate}
          />
        )}
        {screen === "repo" && (
          <RepoListPage
            onSelectRepo={handleSelectRepo}
            workspaces={workspaces}
            repos={repos}
            selectedWorkspace={selectedWorkspace}
            handleSelectWorkspace={handleSelectWorkspace}
            onLogout={handleLogout}
          />
        )}{" "}
        {screen === "pr" && (
          <PRListPage
            repoName={selectedRepo}
            prs={pullRequests}
            onBack={handleBackToRepo}
            onSelectPR={handleViewPrDetail}
          />
        )}
        {screen === "pr-detail" && (
          <PullRequestDetailPage
            pr={selectedPr}
            onBack={() => setScreen("pr")}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
