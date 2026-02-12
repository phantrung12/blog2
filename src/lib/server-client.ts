import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

/**
 * Get authorization headers from cookies for server-side requests.
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Server-side API client for use in Server Components and Server Actions.
 * Reads authentication token from cookies instead of localStorage.
 *
 * Usage:
 *   const posts = await apiServer.get<Post[]>("/posts");
 *   const newPost = await apiServer.post<Post>("/posts", { title: "..." });
 */
const apiServer = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await axios.get<T>(`${API_BASE_URL}${url}`, {
      ...config,
      headers: { ...headers, ...config?.headers },
    });
    return response.data;
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await axios.post<T>(`${API_BASE_URL}${url}`, data, {
      ...config,
      headers: { ...headers, ...config?.headers },
    });
    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await axios.put<T>(`${API_BASE_URL}${url}`, data, {
      ...config,
      headers: { ...headers, ...config?.headers },
    });
    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await axios.patch<T>(`${API_BASE_URL}${url}`, data, {
      ...config,
      headers: { ...headers, ...config?.headers },
    });
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await axios.delete<T>(`${API_BASE_URL}${url}`, {
      ...config,
      headers: { ...headers, ...config?.headers },
    });
    return response.data;
  },
};

export default apiServer;
