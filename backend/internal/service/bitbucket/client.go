package bitbucket

import (
	"backend/internal/model"
	"backend/internal/repository"
)

type BitbucketService struct {
	repo repository.BitbucketRepository
}

func NewBitbucketService(repo repository.BitbucketRepository) *BitbucketService {
	return &BitbucketService{repo}
}

func (s *BitbucketService) GetRepositories(workspace string) ([]model.Repository, error) {
	return s.repo.GetRepositories(workspace)
}

func (s *BitbucketService) GetPullRequests(workspace, repoSlug string) ([]model.PullRequest, error) {
	return s.repo.GetPullRequests(workspace, repoSlug)
}

func (s *BitbucketService) GetAllWorkspaces() ([]model.Workspace, error) {
	return s.repo.GetWorkspaces()
}

func (s *BitbucketService) GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error) {
	return s.repo.GetPRComments(workspace, repoSlug, pullRequestID)
}

func (s *BitbucketService) GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error) {
	return s.repo.GetRepoComments(workspace, repoSlug)
}
