import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import LoginForm from "./components/LoginForm";
import RepoListPage from "./components/RepoListPage";
import PRListPage from "./components/PRListPage";
import PullRequestDetailPage from "./components/PullRequestDetailPage";
import { PullRequest } from "./mockData";

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
  const [selectedPr, setSelectedPr] = useState<PullRequest | null>(null);

  const handleLogin = () => {
    if (username && appPassword) {
      setScreen("repo");
    }
  };

  const handleBackToRepo = () => {
    setScreen("repo");
    setSelectedRepo("");
  };

  const handleSelectRepo = (repo: string) => {
    setSelectedRepo(repo);
    setScreen("pr");
  };

  const handleViewPrDetail = (pr: PullRequest) => {
    setSelectedPr(pr);
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
          <LoginForm
            username={username}
            appPassword={appPassword}
            setUsername={setUsername}
            setAppPassword={setAppPassword}
            onLogin={handleLogin}
          />
        )}
        {screen === "repo" && (
          <RepoListPage
            onSelectRepo={handleSelectRepo}
            onLogout={() => setScreen("login")}
          />
        )}{" "}
        {screen === "pr" && (
          <PRListPage
            repo={selectedRepo}
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
