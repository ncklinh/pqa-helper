package model

type Workspace struct {
	UUID      string `json:"uuid"`
	Name      string `json:"name"`
	Slug      string `json:"slug"`
	IsPrivate bool   `json:"is_private"`
	Type      string `json:"type"`
	CreatedOn string `json:"created_on"`
	Links     struct {
		Avatar struct {
			Href string `json:"href"`
		} `json:"avatar"`
		HTML struct {
			Href string `json:"href"`
		} `json:"html"`
		Repositories struct {
			Href string `json:"href"`
		} `json:"repositories"`
	} `json:"links"`
}

type Repository struct {
	Slug        string `json:"slug"`
	Name        string `json:"name"`
	FullName    string `json:"full_name"`
	IsPrivate   bool   `json:"is_private"`
	Description string `json:"description"`
	CreatedOn   string `json:"created_on"`
	UpdatedOn   string `json:"updated_on"`
	MainBranch  struct {
		Name string `json:"name"`
	} `json:"mainbranch"`
	Links struct {
		HTML struct {
			Href string `json:"href"`
		} `json:"html"`
	} `json:"links"`

	Reviewers []struct {
		Username    string `json:"username"`
		DisplayName string `json:"display_name"`
		UUID        string `json:"uuid"`
	} `json:"reviewers"`

	Participants []struct {
		User struct {
			Username    string `json:"username"`
			DisplayName string `json:"display_name"`
			UUID        string `json:"uuid"`
		} `json:"user"`
		Role     string `json:"role"`
		Approved bool   `json:"approved"`
	} `json:"participants"`
}

type RepositoryListResponse struct {
	Values []Repository `json:"values"`
}

type WorkspaceListResponse struct {
	Values []Workspace `json:"values"`
}

type PullRequest struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	State       string `json:"state"`
	CreatedOn   string `json:"created_on"`
	UpdatedOn   string `json:"updated_on"`

	Author struct {
		DisplayName string `json:"display_name"`
	} `json:"author"`

	Source struct {
		Branch struct {
			Name string `json:"name"`
		} `json:"branch"`
	} `json:"source"`

	Destination struct {
		Branch struct {
			Name string `json:"name"`
		} `json:"branch"`
	} `json:"destination"`

	Reviewers []struct {
		DisplayName string `json:"display_name"`
	} `json:"reviewers"`

	Participants []struct {
		Role     string `json:"role"`
		Approved bool   `json:"approved"`
		User     struct {
			DisplayName string `json:"display_name"`
		} `json:"user"`
	} `json:"participants"`
}

type PullRequestListResponse struct {
	Values []PullRequest `json:"values"`
}
