package model

type Comment struct {
	Content  string
	Author   string
	Resolved bool
}

var MockCommentsByPR = map[string][]Comment{
	"Fix login issue": {
		{"Looks good to me", "alice", true},
		{"Can we rename this method?", "bob", false},
	},
	"Improve mobile layout": {
		{"Missing padding on mobile view", "carol", false},
	},
	"Add auth middleware": {
		{"Nice use of middleware!", "dave", true},
	},
	"Refactor DB layer": {
		{"Are you sure this is backwards compatible?", "eve", false},
	},
	"Update Terraform to v1.6": {
		{"Approved 👍", "alice", true},
	},
}
