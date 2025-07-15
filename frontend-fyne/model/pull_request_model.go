package model

type PullRequest struct {
	Title    string
	Author   string
	IsMerged bool
}

var MockPRsByRepo = map[string][]PullRequest{
	"frontend-service": {
		{"Fix login issue", "alice", true},
		{"Improve mobile layout", "bob", false},
	},
	"backend-api": {
		{"Add auth middleware", "carol", true},
		{"Refactor DB layer", "dave", false},
	},
	"devops-scripts": {
		{"Update Terraform to v1.6", "eve", true},
	},
}
