package scm

// HTTPClient defines the interface for making HTTP requests
type HTTPClient interface {
	// DoRequest performs an HTTP request with authentication
	DoRequest(method, url string) ([]byte, error)

	// SetCredentials sets the authentication credentials
	SetCredentials(username, password string)
}

// BaseHTTPClient provides common HTTP functionality
type BaseHTTPClient struct {
	Username string
	Password string
	BaseURL  string
}

// SetCredentials sets the authentication credentials
func (c *BaseHTTPClient) SetCredentials(username, password string) {
	c.Username = username
	c.Password = password
}

// GetBaseURL returns the base URL for the provider
func (c *BaseHTTPClient) GetBaseURL() string {
	return c.BaseURL
}
