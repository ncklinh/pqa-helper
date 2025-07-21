import axios from "axios";

const BASE_URL = "https://e6dbcc51766a.ngrok-free.app/bitbucket";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  //   user: {
  //     name: string;
  //     email: string;
  //   };
  message: string;
}

// Set up axios instance if needed
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Call login API
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>("/login", payload);

    // Optionally save token to localStorage
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
}

/**
 * Get current token
 */
export function getToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * Clear token on logout
 */
export function logout() {
  localStorage.removeItem("token");
}
