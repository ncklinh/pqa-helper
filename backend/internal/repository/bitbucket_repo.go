package repository

import (
	"backend/config"
	"backend/internal/model"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
)

type BitbucketRepository interface {
	GetRepositories(workspace string) ([]model.Repository, error)
	GetPullRequests(workspace, repoSlug string) ([]model.PullRequest, error)
	GetWorkspaces() ([]model.Workspace, error)
	GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error)
	GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error)
}

type bitbucketRepo struct {
	cfg *config.BitbucketConfig
}

func NewBitbucketRepo(cfg *config.BitbucketConfig) BitbucketRepository {
	return &bitbucketRepo{cfg}
}

func (r *bitbucketRepo) doRequest(method string, url string) ([]byte, error) {
	if method == "" {
		method = "GET"
	}
	req, _ := http.NewRequest(method, url, nil)

	fmt.Println("doRequest get munual r.cfg.Username: ", r.cfg.Username, " r.cfg.AppPassword: ", r.cfg.AppPassword)

	req.SetBasicAuth(r.cfg.Username, r.cfg.AppPassword)

	username, password := r.cfg.GetCredential()

	fmt.Println("doRequest get throught get Username: ", username, " AppPassword: ", password)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed: %v\nBody: %s", resp.Status, string(body))
	}

	return io.ReadAll(resp.Body)
}

func (r *bitbucketRepo) GetRepositories(workspace string) ([]model.Repository, error) {
	url := fmt.Sprintf("%s/repositories/%s", r.cfg.BaseURL, workspace)
	data, err := r.doRequest("GET", url)
	if err != nil {
		return nil, err
	}

	var res model.RepositoryListResponse
	if err := json.Unmarshal(data, &res); err != nil {
		return nil, err
	}
	return res.Values, nil
}

func (r *bitbucketRepo) GetPullRequests(workspace, repoSlug string) ([]model.PullRequest, error) {
	url := fmt.Sprintf("%s/repositories/%s/%s/pullrequests?state=MERGED&state=DECLINED&state=SUPERSEDED&state=OPEN&state=DRAFT", r.cfg.BaseURL, workspace, repoSlug)
	data, err := r.doRequest("GET", url)
	if err != nil {
		return nil, err
	}

	var res model.PullRequestListResponse
	if err := json.Unmarshal(data, &res); err != nil {
		return nil, err
	}

	// Với mỗi PR, gọi API chi tiết để lấy reviewers và avatar
	for i, pr := range res.Values {
		detailURL := fmt.Sprintf("%s/repositories/%s/%s/pullrequests/%d", r.cfg.BaseURL, workspace, repoSlug, pr.ID)
		detailData, err := r.doRequest("GET", detailURL)
		if err != nil {
			// Nếu lỗi, bỏ qua PR này
			continue
		}

		var detailedPR model.PullRequest
		if err := json.Unmarshal(detailData, &detailedPR); err != nil {
			continue
		}

		// Cập nhật reviewers và author.avatar
		res.Values[i].Reviewers = detailedPR.Reviewers
		res.Values[i].Participants = detailedPR.Participants
		res.Values[i].Author.Links = detailedPR.Author.Links
	}

	return res.Values, nil
}

func (r *bitbucketRepo) GetWorkspaces() ([]model.Workspace, error) {
	url := fmt.Sprintf("%s/workspaces", r.cfg.BaseURL)
	data, err := r.doRequest("GET", url)

	if err != nil {
		return nil, err
	}

	var res model.WorkspaceListResponse
	if err := json.Unmarshal(data, &res); err != nil {
		return nil, err
	}

	return res.Values, nil
}

func (r *bitbucketRepo) GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("https://api.bitbucket.org/2.0/repositories/%s/%s/pullrequests/%s/comments", workspace, repoSlug, pullRequestID)
	body, err := r.doRequest("GET", url)
	if err != nil {
		return nil, err
	}
	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}
	comments, _ := result["values"].([]interface{})
	var parsed []map[string]interface{}
	for _, c := range comments {
		parsed = append(parsed, c.(map[string]interface{}))
	}
	return parsed, nil
}

func (r *bitbucketRepo) GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error) {
	listPR, err := r.GetPullRequests(workspace, repoSlug)
	fmt.Println("listPR listPR: ", listPR)
	if err != nil {
		fmt.Println("listPR error: ", err)
	}

	var listComment []map[string]interface{}

	for i := 0; i < len(listPR); i++ {
		fmt.Println("list PR: ", i)
		fmt.Println("list PR with i: ", strconv.Itoa(listPR[i].ID))
		comments, err := r.GetPRComments(workspace, repoSlug, strconv.Itoa(listPR[i].ID))
		if err != nil {
			fmt.Println("error when get list comment: ", err)
		}

		fmt.Println("list PR comments: ", comments)

		listComment = append(listComment, comments...)
	}

	return listComment, nil
}
