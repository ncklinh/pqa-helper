package config

type BitbucketConfig struct {
	BaseURL     string
	Username    string
	AppPassword string
}

// Hàm khởi tạo config ban đầu (thường với BaseURL mặc định, chưa có username/password)
func NewBitbucketConfig() *BitbucketConfig {
	return &BitbucketConfig{
		BaseURL: GetDefaultBaseURL(),
	}
}

// BaseURL mặc định
func GetDefaultBaseURL() string {
	return "https://api.bitbucket.org/2.0"
}

// Set username và app password sau khi user login thành công
func (cfg *BitbucketConfig) SetBitbucketCredential(username, appPassword string) {
	cfg.Username = username
	cfg.AppPassword = appPassword
}

// Lấy thông tin username và app password (nếu cần)
func (cfg *BitbucketConfig) GetCredential() (string, string) {
	return cfg.Username, cfg.AppPassword
}
