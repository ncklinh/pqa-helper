package bitbucket

import (
	"backend/internal/model"
	"backend/internal/repository"
)

type Client struct {
	repo repository.BitbucketRepository
}

func New(repo repository.BitbucketRepository) *Client {
	return &Client{repo}
}

func (c *Client) ListRepositories(workspace string) ([]model.Repository, error) {
	return c.repo.GetRepositories(workspace)
}

func (c *Client) ListPullRequests(workspace, repoSlug string) ([]model.PullRequest, error) {
	return c.repo.GetPullRequests(workspace, repoSlug)
}

func (c *Client) GetAllWorkspaces() ([]model.Workspace, error) {
	return c.repo.GetWorkspaces()
}

func (c *Client) GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error) {
	return c.repo.GetPRComments(workspace, repoSlug, pullRequestID)
}

func (c *Client) GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error) {
	return c.repo.GetRepoComments(workspace, repoSlug)
}
