import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import LoginForm from "./components/LoginForm";
import RepoListPage from "./components/RepoListPage";
import PRListPage from "./components/PRListPage";

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

type Screen = "login" | "repo" | "pr";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [username, setUsername] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");

  const handleLogin = () => {
    if (username && appPassword) {
      setScreen("repo");
    }
  };

  const handleSelectRepo = (repo: string) => {
    setSelectedRepo(repo);
    setScreen("pr");
  };

  const handleBackToRepo = () => {
    setScreen("repo");
    setSelectedRepo("");
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
          <PRListPage repo={selectedRepo} onBack={handleBackToRepo} />
        )}
      </Box>
    </ThemeProvider>
  );
}
