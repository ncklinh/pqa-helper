import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import LoginPage from "./components/LoginPage";
import RepoListPage from "./components/RepoListPage";
import PRListPage from "./components/PullRequestListPage";
import PullRequestDetailPage from "./components/PullRequestDetailPage";
import { PullRequest, Comment, Repo, WorkSpace } from "./mockData";
import {
  getWorkspaces,
  getPullRequests,
  getPRComments,
  getRepositories,
  getRepoComments,
} from "./api/bitbucket";
import { logout } from "./api/auth";
import { CircularProgress, Backdrop } from "@mui/material";

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
  const [workspaces, setWorkspaces] = useState<WorkSpace[]>([]);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [repoComments, setRepoComments] = useState<Comment[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      setSelectedWorkspace(workspaceName);
      if (workspaceName) {
        const repos: Repo[] = await getRepositories(workspaceName);
        setRepos(repos);
      } else {
        setRepos([]);
      }
    } catch (err) {
      console.error("Error loading workspace data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRepo = async (repoName: string) => {
    setLoading(true);

    try {
      const result = await getPullRequests(selectedWorkspace, repoName);
      setPullRequests(result);

      const commentsFromRepo = await getRepoComments(
        selectedWorkspace,
        repoName
      );
      setRepoComments(commentsFromRepo);

      setSelectedRepo(repoName);
      setScreen("pr");
    } catch (err) {
      console.error("Error loading repo data", err);
    } finally {
      setLoading(false);
    }
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
          <>
            {loading && (
              <Backdrop
                open={true}
                sx={{ color: "#fff", zIndex: 9999, opacity: 0 }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            <RepoListPage
              onSelectRepo={handleSelectRepo}
              workspaces={workspaces}
              repos={repos}
              selectedWorkspace={selectedWorkspace}
              handleSelectWorkspace={handleSelectWorkspace}
              onLogout={handleLogout}
            />
          </>
        )}
        {screen === "pr" && (
          <PRListPage
            repoName={selectedRepo}
            prs={pullRequests}
            repoComments={repoComments}
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
