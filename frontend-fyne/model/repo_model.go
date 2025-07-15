package model

type Repo struct {
	Name        string
	Description string
}

var MockRepos = []Repo{
	{"frontend-service", "Frontend client for user portal"},
	{"backend-api", "Main API service"},
	{"devops-scripts", "Terraform + deployment pipelines"},
}
