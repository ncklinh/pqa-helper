package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/joho/godotenv"
)

type Repository struct {
	Slug string `json:"slug"`
	Name string `json:"name"`
}

type RepoResponse struct {
	Values []Repository `json:"values"`
}

type PullRequest struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	State string `json:"state"`
}

type PullRequestResponse struct {
	Values []PullRequest `json:"values"`
}

type Comment struct {
	Content struct {
		Raw string `json:"raw"`
	} `json:"content"`
	User struct {
		DisplayName string `json:"display_name"`
	} `json:"user"`
}

type CommentResponse struct {
	Values []Comment `json:"values"`
}

var bitbucketClient *resty.Client

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	username := os.Getenv("BITBUCKET_USERNAME")
	appPassword := os.Getenv("BITBUCKET_APP_PASSWORD")

	bitbucketClient = resty.New().SetBasicAuth(username, appPassword)
}

func getRepos(workspace string) ([]Repository, error) {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s", workspace)

	resp, err := bitbucketClient.R().SetResult(&RepoResponse{}).Get(url)
	if err != nil {
		return nil, err
	}

	if resp.IsError() {
		return nil, fmt.Errorf("Bitbucket error: %s", resp.Status())
	}

	result := resp.Result().(*RepoResponse)
	return result.Values, nil
}

func getPullRequests(workspace, repo, state string) ([]PullRequest, error) {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s/%s/pullrequests", workspace, repo)

	req := bitbucketClient.R().SetResult(&PullRequestResponse{})
	if state != "" && strings.ToUpper(state) != "ALL" {
		req.SetQueryParam("state", strings.ToUpper(state))
	} else {
		req.SetQueryParam("state", "ALL")
	}

	resp, err := req.Get(url)
	if err != nil {
		return nil, err
	}

	if resp.IsError() {
		return nil, fmt.Errorf("Bitbucket error: %s", resp.Status())
	}

	result := resp.Result().(*PullRequestResponse)
	return result.Values, nil
}

func getComments(workspace, repo string, prID int) ([]Comment, error) {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s/%s/pullrequests/%d/comments", workspace, repo, prID)

	resp, err := bitbucketClient.R().SetResult(&CommentResponse{}).Get(url)
	if err != nil {
		return nil, err
	}

	if resp.IsError() {
		return nil, fmt.Errorf("Bitbucket error: %s", resp.Status())
	}

	result := resp.Result().(*CommentResponse)
	return result.Values, nil
}

func reposHandler(w http.ResponseWriter, r *http.Request) {
	workspace := r.URL.Query().Get("workspace")
	if workspace == "" {
		http.Error(w, "Missing workspace parameter", http.StatusBadRequest)
		return
	}

	repos, err := getRepos(workspace)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(repos)
}

func pullRequestsHandler(w http.ResponseWriter, r *http.Request) {
	workspace := r.URL.Query().Get("workspace")
	repo := r.URL.Query().Get("repo")
	state := r.URL.Query().Get("state")

	if workspace == "" || repo == "" {
		http.Error(w, "Missing workspace or repo parameter", http.StatusBadRequest)
		return
	}

	prs, err := getPullRequests(workspace, repo, state)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(prs)
}

func commentsHandler(w http.ResponseWriter, r *http.Request) {
	workspace := r.URL.Query().Get("workspace")
	repo := r.URL.Query().Get("repo")
	prStr := r.URL.Query().Get("pr")

	if workspace == "" || repo == "" || prStr == "" {
		http.Error(w, "Missing workspace, repo, or pr parameter", http.StatusBadRequest)
		return
	}

	var prID int
	_, err := fmt.Sscanf(prStr, "%d", &prID)
	if err != nil {
		http.Error(w, "Invalid PR ID", http.StatusBadRequest)
		return
	}

	comments, err := getComments(workspace, repo, prID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(comments)
}

func main() {
	http.HandleFunc("/repos", reposHandler)
	http.HandleFunc("/pullrequests", pullRequestsHandler)
	http.HandleFunc("/comments", commentsHandler)

	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
