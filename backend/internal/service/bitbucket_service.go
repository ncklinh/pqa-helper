package service

import (
	"backend/internal/model"
	"backend/internal/repository"
)

type BitbucketService interface {
	ListRepositories(workspace string) ([]model.Repository, error)
	ListPullRequests(workspace, repoSlug string) ([]model.PullRequest, error)
	GetAllWorkspaces() ([]model.Workspace, error)
	GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error)
	GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error)
}

type bitbucketService struct {
	repo repository.BitbucketRepository
}

func NewBitbucketService(repo repository.BitbucketRepository) BitbucketService {
	return &bitbucketService{repo}
}

func (s *bitbucketService) ListRepositories(workspace string) ([]model.Repository, error) {
	return s.repo.GetRepositories(workspace)
}

func (s *bitbucketService) ListPullRequests(workspace, repoSlug string) ([]model.PullRequest, error) {
	return s.repo.GetPullRequests(workspace, repoSlug)
}

func (s *bitbucketService) GetAllWorkspaces() ([]model.Workspace, error) {
	return s.repo.GetWorkspaces()
}

func (s *bitbucketService) GetPRComments(workspace, repoSlug, pullRequestID string) ([]map[string]interface{}, error) {
	return s.repo.GetPRComments(workspace, repoSlug, pullRequestID)
}

func (s *bitbucketService) GetRepoComments(workspace, repoSlug string) ([]map[string]interface{}, error) {
	return s.repo.GetRepoComments(workspace, repoSlug)
}
