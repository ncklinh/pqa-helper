package scm

import "backend/internal/model"

type SCMService interface {
	ListRepositories(workspace string) ([]model.Repository, error)
	ListPullRequests(workspace, repoSlug string) ([]model.PullRequest, error)
	GetAllWorkspaces() ([]model.Workspace, error)
	GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error)
	GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error)
}
