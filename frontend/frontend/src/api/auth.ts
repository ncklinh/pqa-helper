import axios from "axios";

const BASE_URL = "http://localhost:8080";

export interface LoginPayload {
  username: string;
  app_password: string;
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
    const response = await api.post<LoginResponse>("/bitbucket/login", payload);

    // Optionally save token to localStorage
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data.error || "Login failed");
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
