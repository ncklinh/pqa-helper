package model

type Repository struct {
	Slug string `json:"slug"`
	Name string `json:"name"`
}

type RepositoryListResponse struct {
	Values []Repository `json:"values"`
}

type PullRequest struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	State       string `json:"state"`
}

type PullRequestListResponse struct {
	Values []PullRequest `json:"values"`
}
