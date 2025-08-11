package scm

// Provider represents different SCM systems
type Provider string

const (
	BitBucket Provider = "bitbucket"
	GitHub    Provider = "github"
	GitLab    Provider = "gitlab"
)

// ProviderService defines the minimum interface for any SCM provider
type ProviderService interface {
	// GetProvider returns the SCM provider type
	GetProvider() Provider

	// ValidateCredentials validates the provided credentials
	ValidateCredentials(username, password string) error
}
