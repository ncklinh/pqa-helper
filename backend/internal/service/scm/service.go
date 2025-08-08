package scm

import "backend/internal/model"

type SCMService interface {
	GetRepositories(workspace string) ([]model.Repository, error)
	GetPullRequests(workspace, repoSlug string) ([]model.PullRequest, error)
	GetAllWorkspaces() ([]model.Workspace, error)
	GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error)
	GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error)
}
