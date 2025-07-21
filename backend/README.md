# Bitbucket API Helper

This service provides a simple HTTP API to interact with Bitbucket repositories, pull requests, and comments using your Bitbucket credentials.

## Prerequisites

- Go installed (for running the backend)
- Bitbucket account with an [App Password](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/)
- Your Bitbucket username

## 1. Create a `.env` File

In the `backend/` directory, create a file named `.env` with the following content:

```
export BITBUCKET_USERNAME=your_bitbucket_username
export BITBUCKET_APP_PASSWORD=your_app_password
```

Replace `your_bitbucket_username` and `your_app_password` with your actual Bitbucket username and app password.

## 2. Run the Server

From the `backend/` directory, start the server:

```sh
go run main.go
```

The server will start on port `8080`.

## 3. Test the Endpoints with `curl`

### a. List Repositories

**Endpoint:**  
`GET /repos?workspace={workspace}`

**Example:**

```sh
curl "http://localhost:8080/repos?workspace=your_workspace"
```

Replace `your_workspace` with your Bitbucket workspace ID.

---

### b. List Pull Requests

**Endpoint:**  
`GET /pullrequests?workspace={workspace}&repo={repo_slug}&state={state}`

- `state` can be `OPEN`, `MERGED`, `DECLINED`, or `ALL` (optional, defaults to `ALL`).

**Example:**

```sh
curl "http://localhost:8080/pullrequests?workspace=your_workspace&repo=your_repo_slug&state=OPEN"
```

Replace `your_workspace` and `your_repo_slug` with your actual workspace and repository slug.

---

### c. List Comments on a Pull Request

**Endpoint:**  
`GET /comments?workspace={workspace}&repo={repo_slug}&pr={pr_id}`

**Example:**

```sh
curl "http://localhost:8080/comments?workspace=your_workspace&repo=your_repo_slug&pr=1"
```

Replace `your_workspace`, `your_repo_slug`, and `1` (the pull request ID) as needed.

---

## Notes

- All responses are in JSON format.
- Make sure your Bitbucket App Password has the necessary permissions for repository and pull request access.
- If you encounter errors, check your `.env` file and ensure your credentials are correct.

--- 