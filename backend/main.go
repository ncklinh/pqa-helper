package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

type Repo struct {
	Slug string `json:"slug"`
	Name string `json:"name"`
}

type ReposResponse struct {
	Values []Repo `json:"values"`
}

type PullRequest struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	State string `json:"state"`
}

type PRResponse struct {
	Values []PullRequest `json:"values"`
}

type Comment struct {
	Content struct {
		Raw string `json:"raw"`
	} `json:"content"`
	User struct {
		DisplayName string `json:"display_name"`
	} `json:"user"`
	CreatedOn string `json:"created_on"`
}

type CommentResponse struct {
	Values []Comment `json:"values"`
}

var username string
var appPassword string

func main() {
	// Load .env if exists
	godotenv.Load()

	username = os.Getenv("BITBUCKET_USERNAME")
	appPassword = os.Getenv("BITBUCKET_APP_PASSWORD")

	if username == "" || appPassword == "" {
		fmt.Println("Error: Please set BITBUCKET_USERNAME and BITBUCKET_APP_PASSWORD in your environment or .env file")
		return
	}

	reader := bufio.NewReader(os.Stdin)

	// Step 1: Ask for workspace
	fmt.Print("Enter your workspace name: ")
	workspace, _ := reader.ReadString('\n')
	workspace = strings.TrimSpace(workspace)

	// Step 2: List repositories
	repos := getRepos(workspace)
	if len(repos) == 0 {
		fmt.Println("No repositories found.")
		return
	}

	fmt.Println("\nRepositories:")
	for i, repo := range repos {
		fmt.Printf("%d) %s (%s)\n", i+1, repo.Name, repo.Slug)
	}

	fmt.Print("\nEnter the number of the repository: ")
	repoChoiceStr, _ := reader.ReadString('\n')
	repoChoice, _ := strconv.Atoi(strings.TrimSpace(repoChoiceStr))
	if repoChoice < 1 || repoChoice > len(repos) {
		fmt.Println("Invalid choice.")
		return
	}
	selectedRepo := repos[repoChoice-1].Slug

	// Step 3: List pull requests
	prs := getPullRequests(workspace, selectedRepo)
	if len(prs) == 0 {
		fmt.Println("No pull requests found.")
		return
	}

	fmt.Println("\nPull Requests:")
	for i, pr := range prs {
		fmt.Printf("%d) #%d - %s [%s]\n", i+1, pr.ID, pr.Title, pr.State)
	}

	fmt.Print("\nEnter the number of the PR to export comments (or 0 for all): ")
	prChoiceStr, _ := reader.ReadString('\n')
	prChoice, _ := strconv.Atoi(strings.TrimSpace(prChoiceStr))

	var prIDs []int
	if prChoice == 0 {
		for _, pr := range prs {
			prIDs = append(prIDs, pr.ID)
		}
	} else if prChoice >= 1 && prChoice <= len(prs) {
		prIDs = append(prIDs, prs[prChoice-1].ID)
	} else {
		fmt.Println("Invalid choice.")
		return
	}

	// Step 4: Export comments to file
	outputFile := "comments.txt"
	file, err := os.Create(outputFile)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	for _, prID := range prIDs {
		comments := getComments(workspace, selectedRepo, prID)
		if len(comments) == 0 {
			file.WriteString(fmt.Sprintf("PR #%d - No comments found\n", prID))
			continue
		}
		file.WriteString(fmt.Sprintf("PR #%d:\n", prID))
		for _, c := range comments {
			file.WriteString(fmt.Sprintf("[%s] %s: %s\n", c.CreatedOn, c.User.DisplayName, c.Content.Raw))
		}
		file.WriteString("\n")
	}

	fmt.Printf("\nComments exported to %s\n", outputFile)
}

func getRepos(workspace string) []Repo {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s", workspace)
	req, _ := http.NewRequest("GET", url, nil)
	req.SetBasicAuth(username, appPassword)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error fetching repos:", err)
		return nil
	}
	defer resp.Body.Close()

	var repos ReposResponse
	if err := json.NewDecoder(resp.Body).Decode(&repos); err != nil {
		fmt.Println("Error decoding repos:", err)
		return nil
	}
	return repos.Values
}

func getPullRequests(workspace, repo string) []PullRequest {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s/%s/pullrequests?state=OPEN&state=MERGED&state=DECLINED", workspace, repo)
	req, _ := http.NewRequest("GET", url, nil)
	req.SetBasicAuth(username, appPassword)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error fetching pull requests:", err)
		return nil
	}
	defer resp.Body.Close()

	var prs PRResponse
	if err := json.NewDecoder(resp.Body).Decode(&prs); err != nil {
		fmt.Println("Error decoding pull requests:", err)
		return nil
	}
	return prs.Values
}

func getComments(workspace, repo string, prID int) []Comment {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s/%s/pullrequests/%d/comments", workspace, repo, prID)
	req, _ := http.NewRequest("GET", url, nil)
	req.SetBasicAuth(username, appPassword)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error fetching comments:", err)
		return nil
	}
	defer resp.Body.Close()

	var comments CommentResponse
	if err := json.NewDecoder(resp.Body).Decode(&comments); err != nil {
		fmt.Println("Error decoding comments:", err)
		return nil
	}
	return comments.Values
}
